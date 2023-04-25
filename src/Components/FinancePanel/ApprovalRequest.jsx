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
  get_data_recovery,
  get_deposit_amount,
  send_back_to_manager,
  send_to_bhu,
} from "../../Services/Services";
import { setAlert } from "../../store/action/action";
import { useDispatch, useSelector } from "react-redux";
import DialogBoxSBM from "../RentalPortal/DialogBoxSBM";

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

  const [recovery,setRecovery] = useState({});


  async function get_recovery_data (id){
    try {
     const recovery = await get_data_recovery(id)
     if(recovery.status === 200){
       console.log(recovery.data)
       setRecovery(recovery.data.data[0])
     }
    } catch (error) {
     console.log(error)
     dispatch(setAlert({open:true,variant:"error",message:"Something Went Wrong!!"}))
    }
 }

 //termination
 async function handleTerminate () {
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
        finance_id:auth.id,
        renewal_status:"Approved Termination",
        modify_date: new Date()
      },
      id
    );
    if (response.data.success) {
      dispatch(
        setAlert({
          variant: "success",
          open: true,
          message:"Agreement Approved For Termination."
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
    try {
      const deposit_amount = await get_deposit_amount(code);
      console.log(deposit_amount);
      if (deposit_amount.data.success) {
        setDeposit(deposit_amount.data.deposit);
      } else {
        setDeposit(0);
      }
    } catch (error) {
      console.log(error);
      dispatch(
        setAlert({
          open: true,
          variant: "success",
          message: "Something Went Wrong Please Try Again Later.",
        })
      );
    }
  }

  const getData = async (id) => {
    try {
      const agreement = await get_agreement_id(id);
      console.log(agreement.data);
      if (agreement.data.success) {
        setAgreement(agreement.data.agreement);
        console.log(agreement.data.ids);
        setIds(agreement.data.ids);
        get_recovery_data(agreement.data.agreement[agreement.data.ids[0]].id)
        get_deposit(agreement.data.agreement[agreement.data.ids[0]].code);
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
      dispatch(
        setAlert({
          open: true,
          variant: "error",
          message: "Something Went Wrong Please Try Again Later.",
        })
      );
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
          status: "Sent Back From Finance",
          remark: remark,
          modify_date: new Date()
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
        navigate("/finance-listing");
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
        modify_date: new Date()
      },
      id
    );
    if (response.data.success) {
      dispatch(
        setAlert({
          variant: "success",
          open: true,
          message: "Agreement Approved.",
        })
      );
      navigate("/finance-listing");
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

  console.log(new Date())

  async function handleSubmit() {
    console.log(remark)
    // console.log(agreement[ids[0]].deposit-deposit === 0 ? "Deposited" : "Approved")
    if(remark.length > 0){
    const response = await ApprovedByFinance(
      {
        status:
        agreement[ids[0]].deposit - deposit === 0 ? "Deposited" : "Approved",
        finance_id: "",
        utr_number: "",
        payment_date: "",
        modify_date: new Date()
      },
      id
    );
    if (response.data.success) {
      dispatch(
        setAlert({
          variant: "success",
          open: true,
          message: "Agreement Approved.",
        })
      );
      navigate("/finance-listing");
    } else {
      dispatch(
        setAlert({
          variant: "error",
          open: true,
          message: "Something went wrong! Please again later.",
        })
      );
    }
  }else{
    dispatch(setAlert({open:true,variant:"error",message:"Remark Required !"}))
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
      {ids && ids.length > 0 && (
        <Stack sx={{ flexDirection: "row", mb: 4 }}>
          {/* <a id="button"></a> */}
          <DialogBoxSBM
            open={open}
            handleClose={() => setopen(false)}
            handleConfirm={handleConfirm}
            value={utr}
            setValue={setUtr}
          />

          <HamburgerMenu
            navigateHome={"finance-dashboard"}
            handleListing={() => navigate("/finance-listing")}
            monthlyRent={() => navigate("/finance-monthly-rent")}
            renewal={() => navigate("/finance-monthly-rent")}
            monthlyBtn="true"
            renewalBTN="false"
          />

          <Box sx={{ flexGrow: 1 }}>
            <MyHeader>Rental Management System</MyHeader>
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
              <Grid
                item
                xs={12}
                sx={{ justifyContent: "flex-end", display: "flex" }}
              ></Grid>
              {/* Basic Details */}
              <Grid item md={10}>
                {agreement[ids[0]].status === "Deposited" && (
                  <>
                    <Grid container>
                      <DataFieldStyle
                        field={"Final Agreement"}
                        href={agreement[ids[0]].final_agreement}
                        name={"Final Agreement"}
                        bold={true}
                        cursor={true}
                      />
                      <DataFieldStyle
                        field={"Final Agreement Date"}
                        value={agreement[ids[0]].final_agreement_date}
                      />
                      <DataFieldStyle
                        field={"Monthly Rent Start Date"}
                        value={agreement[ids[0]].rent_start_date}
                      />
                    </Grid>
                    <Grid container sx={{ mt: 1 }}>
                      <DataFieldStyle
                        field={"Deposit UTR Number"}
                        value={agreement[ids[0]].utr_number}
                      />
                      <DataFieldStyle
                        field={"Deposit Payment Date"}
                        value={agreement[ids[0]].rent_start_date}
                      />
                    </Grid>
                  </>
                )}
                <Grid container sx={{ mt: 2 }}>
                  <DataFieldStyle
                    field={"code"}
                    value={agreement[ids[0]].code}
                  />

                  <DataFieldStyle
                    field={"state"}
                    value={agreement[ids[0]].state}
                  />
                  <DataFieldStyle
                    field={"city"}
                    value={agreement[ids[0]].city}
                  />
                  <DataFieldStyle
                    field={"location"}
                    value={agreement[ids[0]].location}
                  />

                  <DataFieldStyle
                    field={"pincode"}
                    value={agreement[ids[0]].pincode}
                  />
                  <DataFieldStyle
                    field={"address"}
                    value={agreement[ids[0]].address}
                  />
                  <DataFieldStyle
                    field={"area"}
                    value={agreement[ids[0]].area + " sq. ft"}
                  />
                  <DataFieldStyle
                    field={"lock in Month"}
                    value={agreement[ids[0]].lockInYear}
                  />
                  <DataFieldStyle
                    field={"notice period in month"}
                    value={agreement[ids[0]].noticePeriod}
                  />
                  <DataFieldStyle
                    field={"deposit"}
                    value={agreement[ids[0]].deposit}
                  />
                  <DataFieldStyle
                    field={"monthly rental"}
                    value={agreement[ids[0]].monthlyRent}
                  />
                  <DataFieldStyle
                    field={"tenure"}
                    value={agreement[ids[0]].tenure}
                  />
                  {agreement[ids[0]].tenure !== "11 Month" && (
                    <>
                      <Grid container sx={{ mt: 6 }}>
                        <Grid item xs={12} sx={{ mb: 1 }}>
                          <DataFieldStyle
                            field={"yearly Increment"}
                            value={agreement[ids[0]].yearlyIncrement}
                          />
                        </Grid>
                        <YearField
                          year={"Year 1"}
                          incrementType={agreement[ids[0]].yearlyIncrement}
                          Increment={0}
                          amount={agreement[ids[0]].year1}
                        />
                        <YearField
                          year={"Year 2"}
                          incrementType={agreement[ids[0]].yearlyIncrement}
                          amount={agreement[ids[0]].year2}
                          Increment={getIncrement(
                            agreement[ids[0]].year1,
                            agreement[ids[0]].year2,
                            agreement[ids[0]].yearlyIncrement
                          )}
                        />
                        {(agreement[ids[0]].tenure === "3 Year" ||
                          agreement[ids[0]].tenure === "4 Year" ||
                          agreement[ids[0]].tenure === "5 Year") && (
                          <YearField
                            year={"Year 3"}
                            incrementType={agreement[ids[0]].yearlyIncrement}
                            amount={agreement[ids[0]].year3}
                            Increment={getIncrement(
                              agreement[ids[0]].year2,
                              agreement[ids[0]].year3,
                              agreement[ids[0]].yearlyIncrement
                            )}
                          />
                        )}
                        {(agreement[ids[0]].tenure === "4 Year" ||
                          agreement[ids[0]].tenure === "5 Year") && (
                          <YearField
                            year={"Year 4"}
                            incrementType={agreement[ids[0]].yearlyIncrement}
                            amount={agreement[ids[0]].year4}
                            Increment={getIncrement(
                              agreement[ids[0]].year3,
                              agreement[ids[0]].year4,
                              agreement[ids[0]].yearlyIncrement
                            )}
                          />
                        )}
                        {agreement[ids[0]].tenure === "5 Year" && (
                          <YearField
                            year={"Year 5"}
                            incrementType={agreement[ids[0]].yearlyIncrement}
                            amount={agreement[ids[0]].year5}
                            Increment={getIncrement(
                              agreement[ids[0]].year4,
                              agreement[ids[0]].year5,
                              agreement[ids[0]].yearlyIncrement
                            )}
                          />
                        )}
                      </Grid>
                    </>
                  )}

                  {Array.from(
                    { length: agreement[ids[0]].leeseName.length },
                    (row, id) => (
                      <Grid container sx={{ mt: 3 }}>
                        {/* <Grid item xs={12}>
                          <Typography variant="body1" fontWeight="600">
                            Landlord {id + 1} Details
                          </Typography>
                        </Grid> */}
                        <Heading
                          heading={`Landlord ${id + 1} Personal Details`}
                        />
                        <DataFieldStyle
                          field={"name of lessor"}
                          value={agreement[ids[0]].name[id]}
                        />
                        <DataFieldStyle
                          field={"aadhaar number"}
                          value={agreement[ids[0]].aadharNo[id]}
                          href={agreement[ids[0]].aadhar_card[id]}
                          name={"AadharCard"}
                          bold={true}
                          cursor={true}
                        />
                        <DataFieldStyle
                          field={"PAN number"}
                          value={agreement[ids[0]].panNo[id]}
                          href={agreement[ids[0]].pan_card[id]}
                          name={"pan_certicate"}
                          bold={true}
                          cursor={true}
                        />
                        <DataFieldStyle
                          field={"GST number"}
                          value={agreement[ids[0]].gstNo[id]}
                          href={agreement[ids[0]].gst[id]}
                          name={"gst"}
                          bold={true}
                          cursor={true}
                        />
                        {/* <DataFieldStyle
                          field={"Cancel Cheque"}
                          value={agreement[ids[0]].accountNo[id]}
                          href={agreement[ids[0]].cheque[id]}
                          name={"cheque"}
                          bold={true}
                          cursor={true}
                        /> */}

                        <DataFieldStyle
                          field={"mobile number"}
                          value={agreement[ids[0]].mobileNo[id]}
                        />
                        <DataFieldStyle
                          field={"alternate mobile"}
                          value={agreement[ids[0]].alternateMobile[id]}
                        />
                        <DataFieldStyle
                          field={"email"}
                          value={agreement[ids[0]].email[id]}
                        />
                        <DataFieldStyle
                          field={"Percentage Share"}
                          value={`${agreement[ids[0]].percentage[id]}%`}
                        />
                      </Grid>
                    )
                  )}
                </Grid>
              </Grid>

              {/* Bank Details start here */}
              {/* <Heading heading={"Bank Details"} /> */}

              <Grid item md={10}>
                <Grid container>
                  {Array.from(
                    { length: agreement[ids[0]].leeseName.length },
                    (row, id) => (
                      <Grid container>
                        <Heading heading={`Landlord ${id + 1} Bank Details`} />
                        <DataFieldStyle
                          field={"bank name"}
                          value={agreement[ids[0]].bankName[id]}
                          
                        />
                        <DataFieldStyle
                          field={"beneficiary name"}
                          value={agreement[ids[0]].benificiaryName[id]}
                        />
                        <DataFieldStyle
                          field={"bank A/C number"}
                          value={agreement[ids[0]].accountNo[id]}
                          href={agreement[ids[0]].cheque[id]}
                          name={"cheque"}
                          bold={true}
                          cursor={true}
                        />
                        <DataFieldStyle
                          field={"Bank IFSC"}
                          value={agreement[ids[0]].ifscCode[id]}
                          partLabel={agreement[ids[0]].branchName[id]}
                        />
                      </Grid>
                    )
                  )}
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
                    img={agreement[ids[0]].draft_agreement}
                  />
                  <DocumentView
                    title={"electricity bill"}
                    img={agreement[ids[0]].electricity_bill}
                  />
                  <DocumentView
                    title={"maintaince bill"}
                    img={agreement[ids[0]].maintaince_bill}
                  />
                  <DocumentView title={"POA"} img={agreement[ids[0]].poa} />
                  <DocumentView
                    title={"Property tax receipt"}
                    img={agreement[ids[0]].tax_receipt}
                  />
                  {agreement[ids[0]].leeseName.length > 1 && (
                    <DocumentView
                      title={"NOC (if multiple owner)"}
                      img={agreement[ids[0]].noc}
                    />
                  )}
                   <DocumentView
                    title={"Property Picture"}
                    img={agreement[ids[0]].property_pic}
                  />
                </Grid>
              </Grid>
                {/* document section ends here */}
              <Grid item container xs={10} sx={{ mt: 5 }}>
                  <DataFieldStyle
                    field={"Landlord Assets"}
                    value={agreement[ids[0]].assets}
                  />  
                  </Grid>


{(agreement[ids[0]].status === "Terminated By Operations" ) && <>
              <Grid item container xs={10} sx={{ mt: 2 }}>
                <DataFieldStyle
                  field={"Termination Remark"}
                  value={agreement[ids[0]].termination_remark}
                />
              </Grid>
              {/* document section ends here */}

              {agreement[ids[0]].remark !== null && (
                <Grid item container xs={10} sx={{ mt: 2 }}>
                  <DataFieldStyle
                    field={"Remark !"}
                    value={agreement[ids[0]].remark}
                  />
                </Grid>
              )}

              {/* Buttons start here*/}
              <Grid item xs={10} sx={{ mt: 2 }}>
 
             <Grid container sx={{ gap : '2rem'}}>
             <DataFieldStyle
                    field="Deposit Amount (Paid)"
                    value={recovery.depositedAmount}
                  />
             </Grid>
             <Grid container sx={{ gap : '2rem',mt: 2 }}>
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

             <Grid container sx={{ gap : '2rem' ,mt: 2 }}>
             <DataFieldStyle
                    field="Expenses Amount"
                    value={recovery.expenses}
                  />
            <DataFieldStyle
                    field="Remark"
                    value={recovery.expansesRemark}
                  />
             </Grid>

             <Grid item xs={12} container  sx={{ gap : '2rem',mt: 2 }}>
                  <DataFieldStyle
                    field="Other Adjustments"
                    value={recovery.otherAdjustments}
                  />
               <DataFieldStyle
                    field="Remark"
                    value={recovery.otherRemark}
                  />
                  </Grid>
                  <Grid item xs={12} container sx={{ gap : '2rem',mt: 2 }} >
                  <DataFieldStyle
                    field="Total Adjustment Amount "
                    value={recovery.totalAdjustmentAmount}
                  />
                  <DataFieldStyle
                    field="Balance Deposit "
                    value={recovery.balanceDeposit}
                  />
                  </Grid>

              </Grid>
              </> }

              {/* Buttons start here*/}

                {/* termination */}
   {agreement[ids[0]].status === "Terminated By Operations" && (
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

              {agreement[ids[0]].status === "Sent To Finance Team" && (
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
      )}
    </>
  );
}

export default FinanceApproval;
