import {
  Box,
  Button,
  Grid,
  IconButton,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import HamburgerMenu from "../HamburgerMenu";
import {
  DataFieldStyle,
  DocumentView,
  YearField,
} from "../StyleComponents/Rental";
import { MyHeader } from "../StyledComponent";
import { useEffect, useState } from "react";

import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

//download file
import { saveAs } from "file-saver";
import {
  ApprovedByFinance,
  get_agreement_id,
  get_agreement_id_finance,
  get_data_recovery,
  get_deposit_amount,
  get_old_agreement,
  send_back_to_manager,
  send_to_bhu,
} from "../../Services/Services";
import { setAlert } from "../../store/action/action";
import { useDispatch, useSelector } from "react-redux";
import DialogBoxSBM from "../RentalPortal/DialogBoxSBM";
import FinanceHamburger from "./FinanceHamburger";

const Heading = ({ heading }) => {
  return (
    <Grid item xs={11} sx={{ mt: 6, mb: 2 }}>
      <Typography
        variant="body1"
        fontSize={"20px"}
        color={"primary"}
        fontWeight={"600"}
        sx={{ textDecoration: "underline" }}
      >
        {heading}
      </Typography>
    </Grid>
  );
};

function FinanceApproval() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { auth } = useSelector((s) => s);
  const login_manager_id = auth.id;

  const [remark, setRemark] = useState("");

  const [agreement, setAgreement] = useState({});
  const [ids, setIds] = useState([]);

  const [open, setopen] = useState(false);

  const [utr, setUtr] = useState({ utr: "", paymentDate: "" });

  const dispatch = useDispatch();

  const [deposit, setDeposit] = useState("");

  console.log(deposit);

  const [recovery, setRecovery] = useState({});

  const [oldIds, setOldIds] = useState([]);

  const [partLabel,setPartLabel] = useState({
    landlord:[{
    accountNo: "",
    alternateMobile: "",
    area:"",
    bankName:"",
    benificiaryName: "",
    branchName:"",
    cheque:"",
    email: "",
    gst:null,
    gstNo: null,
    ifscCode: "",
      }]});


  console.log("Recovery >>>>" ,recovery)

  async function get_recovery_data(id) {
    console.log("function called")
    try {
      const recovery = await get_data_recovery(id);
      if (recovery.status === 200) {
        console.log(recovery.data);
        setRecovery(recovery.data.data[0]);
      }
    } catch (error) {
      console.log(error);
      dispatch(
        setAlert({
          open: true,
          variant: "error",
          message: "Something Went Wrong!!",
        })
      );
    }
  }

  //termination
  async function handleTerminate() {
    if (remark.length <= 0) {
      dispatch(
        setAlert({
          variant: "error",
          open: true,
          message: "Remark Required !.",
        })
      );
    } else {
      const response = await send_to_bhu(
        {
          status: "Approved for Termination",
          finance_id: auth.id,
          renewal_status: "Approved Termination",
          modify_date: new Date(),
        },
        agreement.agreement_id
      );
      if (response.data.success) {
        dispatch(
          setAlert({
            variant: "success",
            open: true,
            message: "Agreement Approved For Termination.",
          })
        );
        navigate(-1);
      } else {
        dispatch(
          setAlert({
            variant: "error",
            open: true,
            message: "Something went wrong! Please again later.",
          })
        );
      }
    }
  }

  async function get_deposit(code) {
    console.log("function called")
    try {
      const deposit_amount = await get_deposit_amount(code);
      console.log(deposit_amount);
      if (deposit_amount.data.success) {
        setDeposit(deposit_amount.data.deposit[0].deposit);
      } else {
        setDeposit(0);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function get_old_data (code){
    try {
      const oldvalue = await get_old_agreement(code)
      console.log(oldvalue.data)
     oldvalue.status === 200 &&  setPartLabel(oldvalue.data.agreement);
     oldvalue.status === 200 && setOldIds(oldvalue.data.ids)
    } catch (error) {
      console.log(error)
    }
  }

  const getData = async (id) => {
    try {
      const agreement = await get_agreement_id_finance(id);
      console.log(agreement.data);
      if (agreement.data.success) {
        setAgreement(agreement.data.agreement[0]);
        if(agreement.data.agreement[0].type === "Renewed"){
          get_old_data(agreement.data.agreement[0].code)
        }
        // console.log(agreement.data.ids);
        // setIds(agreement.data.ids);
        await get_recovery_data(agreement.data.agreement[0].agreement_id);
       await get_deposit(agreement.data.agreement[0].code);
      } else {
        dispatch(
          setAlert({
            open: true,
            variant: "error",
            message: "Something Went Wrong Please Try Again Later.",
          })
        );
      }
    } catch (error) {
      console.log(error);
      // dispatch(
      //   setAlert({
      //     open: true,
      //     variant: "error",
      //     message: "Something Went Wrong Please Try Again Later.",
      //   })
      // );
    }
  };

  console.log(agreement);

  useEffect(() => {
    getData(id);
  }, []);

  async function handleSendBack() {
    if (remark.length <= 0) {
      dispatch(
        setAlert({
          variant: "error",
          open: true,
          message: "Remark Required !.",
        })
      );
    } else {
      const response = await send_back_to_manager(
        {
          status:agreement.status === "Terminated By Operations"? "Sent Back From Finance Team Termination" : "Sent Back From Finance",
          remark: remark,
          modify_date: new Date(),
        },
        id
      );
      if (response.data.success) {
        dispatch(
          setAlert({
            variant: "success",
            open: true,
            message: "Send back For Rectification",
          })
        );
        navigate(-1);
      } else {
        dispatch(
          setAlert({
            variant: "error",
            open: true,
            message: "Something went wrong! Please again later.",
          })
        );
      }
    }
  }

  const handleConfirm = async (e) => {
    console.log(utr);
    const response = await ApprovedByFinance(
      {
        status: "Approved",
        finance_id: login_manager_id,
        utr_number: utr.utr,
        payment_date: utr.paymentDate,
        modify_date: new Date(),
      },
      agreement.agreement_id
    );
    if (response.data.success) {
      dispatch(
        setAlert({
          variant: "success",
          open: true,
          message: "Agreement Approved.",
        })
      );
      navigate(-1);
    } else {
      dispatch(
        setAlert({
          variant: "error",
          open: true,
          message: "Something went wrong! Please again later.",
        })
      );
    }
  };


  async function handleSubmit() {
    console.log(remark);
    // console.log(agreement.deposit-deposit === 0 ? "Deposited" : "Approved")
    if (remark.length > 0) {
      const response = await ApprovedByFinance(
        {
          status:
            agreement.deposit - deposit === 0
              ? "Deposited"
              : "Approved",
          finance_id: "",
          modify_date: new Date(),
        },
        agreement.agreement_id
      );
      if (response.data.success) {
        dispatch(
          setAlert({
            variant: "success",
            open: true,
            message: "Agreement Approved.",
          })
        );
        navigate(-1);
      } else {
        dispatch(
          setAlert({
            variant: "error",
            open: true,
            message: "Something went wrong! Please again later.",
          })
        );
      }
    } else {
      dispatch(
        setAlert({ open: true, variant: "error", message: "Remark Required !" })
      );
    }
  }

  function getIncrement(rent, value, type) {
    let incrementType;
    rent = Number(rent);
    value = Number(value);
    if (type === "Percentage") {
      incrementType = `${parseInt(((value - rent) / rent) * 100)}%`;
    } else if (type === "Value") {
      incrementType = value - rent;
    }
    return incrementType;
  }

  return (
    <>
     {(agreement.type === "Renewed" ? oldIds.length > 0 : true)&&
        <Stack sx={{ flexDirection: "row", mb: 4 }}>
          {/* <a id="button"></a> */}
          <DialogBoxSBM
            open={open}
            handleClose={() => setopen(false)}
            handleConfirm={handleConfirm}
            value={utr}
            setValue={setUtr}
          />

          <FinanceHamburger />
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              item
              xs={12}
              sx={{ justifyContent: "space-between", display: "flex" }}
            >
              <MyHeader>Rental Management System</MyHeader>
              <Typography mt="15px" mr="15px" fontWeight="600">
                Welcome {auth.name}
              </Typography>
            </Grid>
            <Box className="backButton">
              <IconButton
                variant="contained"
                color="primary"
                onClick={() => navigate(-1)}
                size={"large"}
              >
                <ArrowCircleLeftIcon
                  sx={{ fontSize: "3rem" }}
                  color="#FFFFF !important"
                />
              </IconButton>
            </Box>

            <Grid container sx={{ justifyContent: "center", mt: 3 }}>
            
              {/* Basic Details */}
              <Grid item md={10}>
                {agreement.status === "Deposited" && (
                  <>
                    <Grid container>
                      <DataFieldStyle
                        field={"Final Agreement"}
                        href={agreement.final_agreement}
                        name={"Final Agreement"}
                        bold={true}
                        cursor={true}
                      />
                      <DataFieldStyle
                        field={"Final Agreement Date"}
                        value={agreement.final_agreement_date}
                      />
                      <DataFieldStyle
                        field={"Monthly Rent Start Date"}
                        value={agreement.rent_start_date}
                      />
                    </Grid>
                    <Grid container sx={{ mt: 1 }}>
                      <DataFieldStyle
                        field={"Deposit UTR Number"}
                        value={agreement.utr_number}
                      />
                      <DataFieldStyle
                        field={"Deposit Payment Date"}
                        value={agreement.rent_start_date}
                      />
                    </Grid>
                  </>
                )}

                {agreement.site_visit_date !== null && (
                  <>
                    <Grid container sx={{ alignItems: "baseline" }}>
                      <DataFieldStyle
                        field={"Site Visit date"}
                        value={agreement.site_visit_date}
                      />
                      <DataFieldStyle
                        field={"Site Visit Remark"}
                        value={agreement.site_visit_remark}
                      />
                    </Grid>
                  </>
                )}

                <Grid container sx={{ mt: 2 }}>
                  <DataFieldStyle
                    field={"code"}
                    value={agreement.code}
                  />

                  <DataFieldStyle
                    field={"state"}
                    value={agreement.state}
                  />
                  <DataFieldStyle
                    field={"city"}
                    value={agreement.city}
                  />
                  <DataFieldStyle
                    field={"location"}
                    value={agreement.location}
                  />

                  <DataFieldStyle
                    field={"pincode"}
                    value={agreement.pincode}
                  />
                  <DataFieldStyle
                    field={"address"}
                    value={agreement.address}
                  />
                  <DataFieldStyle
                    field={"area"}
                    value={agreement.area + " sq. ft"}
                    partLabel={agreement.type === "Renewed" && "Old Agreement Value: " + partLabel[oldIds[0]].area}
                  />
                  <DataFieldStyle
                    field={"lock in Month"}
                    value={agreement.lockInYear}
                    partLabel={agreement.type === "Renewed" && "Old Agreement Value: " + partLabel[oldIds[0]].lockInYear}
                  />
                  <DataFieldStyle
                    field={"notice period in month"}
                    value={agreement.noticePeriod}
                    partLabel={agreement.type === "Renewed" && "Old Agreement Value: " + partLabel[oldIds[0]].noticePeriod}
                  />
                  <DataFieldStyle
                    field={"deposit"}
                    value={agreement.deposit}
                    partLabel={agreement.type === "Renewed" && "Old Agreement Value: " + partLabel[oldIds[0]].deposit}
                  />
                  <DataFieldStyle
                    field={"monthly rental"}
                    value={agreement.monthlyRent}
                    partLabel={agreement.type === "Renewed" && "Old Agreement Value: " + partLabel[oldIds[0]].monthlyRent}
                  />
                  <DataFieldStyle
                    field={"tenure"}
                    value={agreement.tenure}
                    partLabel={agreement.type === "Renewed" && "Old Agreement Value: " + partLabel[oldIds[0]].tenure}
                  />
                  {agreement.tenure > 12&& (
                    <>
                      <Grid container sx={{ mt: 6 }}>
                        <Grid item xs={12} sx={{ mb: 1 }}>
                          <DataFieldStyle
                            field={"yearly Increment"}
                            value={agreement.yearlyIncrement}
                            partLabel={agreement.type === "Renewed" && "Old Agreement Value: " + partLabel[oldIds[0]].yearlyIncrement}
                          />
                        </Grid>
                        <YearField
                          year={"Year 1"}
                          incrementType={agreement.yearlyIncrement}
                          Increment={0}
                          amount={agreement.year1}
                          partLabel={agreement.type === "Renewed" && "Old Agreement Value: " + partLabel[oldIds[0]].year1}
                        />
                        <YearField
                          year={"Year 2"}
                          incrementType={agreement.yearlyIncrement}
                          amount={agreement.year2}
                          Increment={getIncrement(
                            agreement.year1,
                            agreement.year2,
                            agreement.yearlyIncrement
                          )}
                          partLabel={
                            getIncrement(
                              partLabel[oldIds[0]].year1,
                              partLabel[oldIds[0]].year2,
                              partLabel[oldIds[0]].yearlyIncrement
                            )
                          }
                        />
                        {(agreement.tenure  > 24) && (
                          <YearField
                            year={"Year 3"}
                            incrementType={agreement.yearlyIncrement}
                            amount={agreement.year3}
                            Increment={getIncrement(
                              agreement.year2,
                              agreement.year3,
                              agreement.yearlyIncrement
                            )}
                            partLabel={
                              agreement.type === "Renewed" &&
                              getIncrement(
                                partLabel[oldIds[0]].year2,
                                partLabel[oldIds[0]].year3,
                                partLabel[oldIds[0]].yearlyIncrement
                              )
                            }
                          />
                        )}
                        {(agreement.tenure > 36) && (
                          <YearField
                            year={"Year 4"}
                            incrementType={agreement.yearlyIncrement}
                            amount={agreement.year4}
                            Increment={getIncrement(
                              agreement.year3,
                              agreement.year4,
                              agreement.yearlyIncrement
                            )}
                            partLabel={
                              agreement.type === "Renewed" &&
                              getIncrement(
                                partLabel[oldIds[0]].year3,
                                partLabel[oldIds[0]].year4,
                                partLabel[oldIds[0]].yearlyIncrement
                              )
                            }
                          />
                        )}
                        {agreement.tenure > 48 && (
                          <YearField
                            year={"Year 5"}
                            incrementType={agreement.yearlyIncrement}
                            amount={agreement.year5}
                            Increment={getIncrement(
                              agreement.year4,
                              agreement.year5,
                              agreement.yearlyIncrement
                            )}
                            partLabel={
                              agreement.type === "Renewed" &&
                              getIncrement(
                                partLabel[oldIds[0]].year4,
                                partLabel[oldIds[0]].year5,
                                partLabel[oldIds[0]].yearlyIncrement
                              )
                            }
                          />
                        )}
                      </Grid>
                    </>
                  )}

                  
                      <Grid container sx={{ mt: 3 }}>
                        {/* <Grid item xs={12}>
                          <Typography variant="body1" fontWeight="600">
                            Landlord {id + 1} Details
                          </Typography>
                        </Grid> */}
                        <Heading
                          heading={`Landlord Personal Details`}
                        />
                        <DataFieldStyle
                          field={"name of lessor"}
                          value={agreement.name}
                        />
                        <DataFieldStyle
                          field={"aadhaar number"}
                          value={agreement.aadharNo}
                          href={agreement.aadhar_card}
                          name={"AadharCard"}
                          bold={true}
                          cursor={true}
                        />
                        <DataFieldStyle
                          field={"PAN number"}
                          value={agreement.panNo}
                          href={agreement.pan_card}
                          name={"pan_certicate"}
                          bold={true}
                          cursor={true}
                        />
                        <DataFieldStyle
                          field={"GST number"}
                          value={agreement.gstNo}
                          href={agreement.gst}
                          name={"gst"}
                          bold={true}
                          cursor={true}
                          partLabel={agreement.type === "Renewed" && "Old Agreement Value: " + partLabel[oldIds[0]].gstNo[id]}
                        />

                        <DataFieldStyle
                          field={"mobile number"}
                          value={agreement.mobileNo}
                          partLabel={agreement.type === "Renewed" && "Old Agreement Value: " + partLabel[oldIds[0]].mobileNo[id]}
                        />
                        <DataFieldStyle
                          field={"alternate mobile"}
                          value={agreement.alternateMobile}
                          partLabel={agreement.type === "Renewed" && "Old Agreement Value: " + partLabel[oldIds[0]].alternateMobile[id]}
                        />
                        <DataFieldStyle
                          field={"email"}
                          value={agreement.email}
                          partLabel={agreement.type === "Renewed" && "Old Agreement Value: " + partLabel[oldIds[0]].email[id]}
                        />
                        <DataFieldStyle
                          field={"Percentage Share"}
                          value={`${agreement.percentage}%`}
                          partLabel={agreement.type === "Renewed" && "Old Agreement Value: " + partLabel[oldIds[0]].percentage[id]}
                        />
                        {console.log((agreement.deposit - deposit )/ 100 * parseInt(agreement.percentage))}
                        <DataFieldStyle
                          field={"Deposit Payable Amount"}
                          value={((agreement.deposit - deposit )/ 100 * parseInt(agreement.percentage)) }
                        />
                      </Grid>

                      
                      <Grid  container sx = {{alignItems : "baseline",mt: 1 }} >
                      <DataFieldStyle
                        field={"Deposit UTR Number"}
                        value={agreement.utr_number}
                      />
                      <DataFieldStyle
                        field={"Deposit Payment Date"}
                        value={agreement.payment_date}
                      />
                    </Grid>
                </Grid>
              </Grid>

              {/* Bank Details start here */}
              {/* <Heading heading={"Bank Details"} /> */}

              <Grid item md={10}>
                <Grid container>
                      <Grid container>
                        <Heading heading={`Landlord Bank Details`} />
                        <DataFieldStyle
                          field={"bank name"}
                          value={agreement.bankName}
                          partLabel={agreement.type === "Renewed" && "Old Agreement Value: " + partLabel[oldIds[0]].bankName[id]}
                        />
                        <DataFieldStyle
                          field={"beneficiary name"}
                          value={agreement.benificiaryName}
                          partLabel={agreement.type === "Renewed" && "Old Agreement Value: " + partLabel[oldIds[0]].benificiaryName[id]}
                        />
                        <DataFieldStyle
                          field={"bank A/c number"}
                          value={agreement.accountNo}
                          href={agreement.cheque}
                          name={"cheque"}
                          bold={true}
                          cursor={true}
                          partLabel={agreement.type === "Renewed" && "Old Agreement Value: " + partLabel[oldIds[0]].accountNo[id]}
                        />
                        <DataFieldStyle
                          field={"Bank IFSC"}
                          value={agreement.ifscCode}
                          // partLabel={agreement.branchName}
                          partLabel={agreement.type === "Renewed" && "Old Agreement Value: " + partLabel[oldIds[0]].branchName[id]}
                        />
                      </Grid>
                </Grid>
              </Grid>

              {/* Bank Details Ends here */}

              {/* Document Section start here */}

              <Grid item md={10}>
                <Grid container spacing={4} sx={{ mt: 1 }}>
                  <Grid item xs={12}>
                    <Heading heading={"Document View/Download"} />
                  </Grid>
                  <DocumentView
                    title={"draft agreement"}
                    img={agreement.draft_agreement}
                    partLabel={agreement.type === "Renewed" && "Old Agreement Value: " + partLabel[oldIds[0]].draft_agreement}
                  />
                  <DocumentView
                    title={"electricity bill"}
                    img={agreement.electricity_bill}
                    partLabel={agreement.type === "Renewed" && "Old Agreement Value: " + partLabel[oldIds[0]].electricity_bill}
                  />
                  <DocumentView
                    title={"maintaince bill"}
                    img={agreement.maintaince_bill}
                    partLabel={agreement.type === "Renewed" && "Old Agreement Value: " + partLabel[oldIds[0]].maintaince_bill}
                  />
                  <DocumentView 
                  title={"POA"} 
                  img={agreement.poa}
                  partLabel={agreement.type === "Renewed" && "Old Agreement Value: " + partLabel[oldIds[0]].poa}
                  />
                  <DocumentView
                    title={"Property tax receipt"}
                    img={agreement.tax_receipt}
                    partLabel={agreement.type === "Renewed" && "Old Agreement Value: " + partLabel[oldIds[0]].tax_receipt}
                  />
                  {/* {agreement.leeseName.length > 1 && (
                    <DocumentView
                      title={"NOC (if multiple owner)"}
                      img={agreement.noc}
                    />
                  )} */}
                  <DocumentView
                    title={"Property Picture"}
                    img={agreement.property_pic}
                  />
                </Grid>
              </Grid>
              {/* document section ends here */}
              <Grid item container xs={10} sx={{ mt: 5 }}>
                <DataFieldStyle
                  field={"Landlord Assets"}
                  value={agreement.assets}
                />
              </Grid>

              {agreement.status === "Terminated By Operations" && (
                <>
                  <Grid item container xs={10} sx={{ mt: 2 }}>
                    <DataFieldStyle
                      field={"Termination Remark"}
                      value={agreement.termination_remark}
                    />
                  </Grid>
                  {/* document section ends here */}

                  {agreement.remark !== null && (
                    <Grid item container xs={10} sx={{ mt: 2 }}>
                      <DataFieldStyle
                        field={"Remark !"}
                        value={agreement.remark}
                      />
                    </Grid>
                  )}

                  {/* Buttons start here*/}
                  <Grid item xs={10} sx={{ mt: 2 }}>
                    <Grid container sx={{ gap: "2rem" }}>
                      <DataFieldStyle
                        field="Deposit Amount (Paid)"
                        value={recovery.depositedAmount}
                      />
                    </Grid>
                    <Grid container sx={{ gap: "2rem", mt: 2 }}>
                      <DataFieldStyle
                        field="Remaining Months"
                        value={recovery.remainingMonth}
                      />
                      <DataFieldStyle
                        field="Adjustment Amount"
                        value={recovery.adjustmentAmount}
                      />
                      <DataFieldStyle
                        field="Remark"
                        value={recovery.adjustmentAmountRemark}
                      />
                    </Grid>

                    <Grid container sx={{ gap: "2rem", mt: 2 }}>
                      <DataFieldStyle
                        field="Expenses Amount"
                        value={recovery.expenses}
                      />
                      <DataFieldStyle
                        field="Remark"
                        value={recovery.expansesRemark}
                      />
                    </Grid>

                    <Grid item xs={12} container sx={{ gap: "2rem", mt: 2 }}>
                      <DataFieldStyle
                        field="Other Adjustments"
                        value={recovery.otherAdjustments}
                      />
                      <DataFieldStyle
                        field="Remark"
                        value={recovery.otherRemark}
                      />
                    </Grid>
                    <Grid item xs={12} container sx={{ gap: "2rem", mt: 2 }}>
                      <DataFieldStyle
                        field="Total Adjustment Amount "
                        value={recovery.totalAdjustmentAmount}
                      />
                      <DataFieldStyle
                        field="Balance Deposit "
                        value={recovery.balanceDeposit}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <DocumentView
                        title={"Termination File"}
                        img={agreement.file}
                      />
                    </Grid>
                  </Grid>
                </>
              )}

              {/* Buttons start here*/}

              {/* termination */}
              {agreement.status === "Terminated By Operations" && (
                <>
                  <Grid
                    item
                    xs={10}
                    sx={{ mt: 5 }}
                    className={"textFieldWrapper"}
                  >
                    <Grid item xs={8}>
                      <TextField
                        type="text"
                        multiline
                        rows={3}
                        required
                        fullWidth
                        variant="outlined"
                        label="Remark "
                        placeholder="Remark *"
                        value={remark}
                        onChange={(e) => setRemark(e.target.value)}
                      />
                    </Grid>
                  </Grid>

                  <Grid item md={8} sx={{ mt: 4, mb: 2 }}>
                    <Grid
                      container
                      spacing={2}
                      sx={{ justifyContent: "center" }}
                    >
                      <Grid item md={6} xs={11}>
                        <Button
                          variant="contained"
                          sx={{
                            height: "55px",
                            borderRadius: "12px",
                            backgroundColor: "primary",
                            width: "100%",
                            color: "#FFFFFF",
                            textTransform: "capitalize",
                            fontSize: "18px",
                            lineHeight: "20px",
                          }}
                          onClick={handleTerminate}
                        >
                          Accept For Termination
                        </Button>
                      </Grid>
                      <Grid item md={6} xs={11}>
                        <Button
                          variant="outlined"
                          sx={{
                            height: "55px",
                            borderRadius: "12px",
                            width: "100%",
                            textTransform: "capitalize",
                            fontSize: "18px",
                          }}
                          onClick={handleSendBack}
                        >
                          Send Back To Manager
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </>
              )}

              {agreement.status === "Sent To Finance Team" && (
                <>
                  <Grid
                    item
                    xs={10}
                    sx={{ mt: 5 }}
                    className={"textFieldWrapper"}
                  >
                    <Grid item xs={8}>
                      <TextField
                        type="text"
                        multiline
                        rows={3}
                        fullWidth
                        variant="outlined"
                        label="Remark *"
                        placeholder="Remark *"
                        value={remark}
                        onChange={(e) => setRemark(e.target.value)}
                      />
                    </Grid>
                  </Grid>

                  <Grid item md={8} sx={{ mt: 4, mb: 2 }}>
                    <Grid
                      container
                      spacing={1}
                      sx={{ justifyContent: "center" }}
                    >
                      <Grid item md={4} xs={11}>
                        <Button
                          variant="contained"
                          sx={{
                            height: "55px",
                            borderRadius: "12px",
                            backgroundColor: "primary",
                            width: "100%",
                            color: "#FFFFFF",
                            textTransform: "capitalize",
                            fontSize: "18px",
                            lineHeight: "20px",
                          }}
                          onClick={handleSubmit}
                        >
                          Approve
                        </Button>
                      </Grid>
                      <Grid item md={4} xs={11}>
                        <Button
                          variant="outlined"
                          sx={{
                            height: "55px",
                            borderRadius: "12px",
                            width: "100%",
                            textTransform: "capitalize",
                            fontSize: "18px",
                          }}
                          onClick={handleSendBack}
                        >
                          Send Back To Manager
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </>
              )}

              {/* buttons end here */}
            </Grid>
          </Box>
        </Stack>
}
    </>
  );
}

export default FinanceApproval;
