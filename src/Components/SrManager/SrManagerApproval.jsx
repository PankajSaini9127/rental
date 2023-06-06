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
  get_agreement_id,
  get_data_recovery,
  get_old_agreement,
  get_renewal_recovery_data,
  send_back_to_manager,
  send_to_bhu,
} from "../../Services/Services";
import { setAlert } from "../../store/action/action";
import { useDispatch, useSelector } from "react-redux";
import { get_deposit_amount } from "../../Services/Services";
import SRMHamburger from "./SRMHAmburger";

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

function SrManagerApproval() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { auth } = useSelector((s) => s);
  const login_manager_id = auth.id;

  const [agreement, setAgreement] = useState({});
  const [ids, setIds] = useState([]);

  const [recovery, setRecovery] = useState({unpaid_months : []});

  const dispatch = useDispatch();

  const [remark, setRemark] = useState("");

  const [deposit, setDeposit] = useState("");

  console.log(deposit);

  const [oldIds, setOldIds] = useState([]);

  const [partLabel, setPartLabel] = useState({
    landlord: [
      {
        accountNo: "",
        alternateMobile: "",
        area: "",
        bankName: "",
        benificiaryName: "",
        branchName: "",
        cheque: "",
        email: "",
        gst: null,
        gstNo: null,
        ifscCode: "",
      },
    ],
  });

  async function get_deposit(code) {
    try {
      const deposit_amount = await get_deposit_amount(code);
      console.log(deposit_amount);
      if (deposit_amount.data.success) {
        setDeposit(deposit_amount.data.deposit);
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
  }

  //renewal recovery data
  const [renewalRecovery, setRenewalRecovery] = useState({unpaid_months : []});

  async function get_old_data(code) {
    try {
      console.log(code)
      const oldvalue = await get_old_agreement(code);
      console.log(oldvalue);
      oldvalue.status === 200 && setPartLabel(oldvalue.data.agreement);
      oldvalue.status === 200 && setOldIds(oldvalue.data.ids);
    } catch (error) {
      console.log(error);
    }
  }

  async function get_renewal_recovery(code) {
    try {
      const renewalRecovery = await get_renewal_recovery_data(code);
      // console.log(renewalRecovery.data.data.unpaid_months);
      if(renewalRecovery.data.data.unpaid_months)
      renewalRecovery.data.data.unpaid_months = JSON.parse(renewalRecovery.data.data.unpaid_months)
      else renewalRecovery.data.data.unpaid_months = []
      renewalRecovery.status === 200 &&
        setRenewalRecovery(renewalRecovery.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  const getData = async (id) => {
    try {
      const agreement = await get_agreement_id(id);
      console.log(agreement.data);
      if (agreement.data.success) {
        console.log(agreement.data.agreement[agreement.data.ids[0]].id);
        get_recovery_data(agreement.data.agreement[agreement.data.ids[0]].id);
        setAgreement(agreement.data.agreement);
        console.log(agreement.data.ids);
        if (
          agreement.data.agreement[agreement.data.ids[0]].type === "Renewed"
        ) {
          get_old_data(agreement.data.agreement[agreement.data.ids[0]].code);
          get_renewal_recovery(id);
        }
        setIds(agreement.data.ids);
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

  async function get_recovery_data(id) {
    try {
      const recovery = await get_data_recovery(id);
      if (recovery.status === 200) {
        console.log(recovery.data);
        if(recovery.data.data[0].unpaid_months) recovery.data.data[0].unpaid_months = JSON.parse(recovery.data.data[0].unpaid_months)
        else recovery.data.data[0].unpaid_months = []
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

  useEffect(() => {
    getData(id);
  }, []);

  async function handleSendBack() {
    console.log(
      agreement[ids[0]].status === "Terminated By Manager"
        ? "Sent Back From Sr Manager Termination"
        : "Sent Back From Sr Manager"
    );
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
          status:
            agreement[ids[0]].status === "Terminated By Manager"
              ? "Sent Back From Sr Manager Termination"
              : "Sent Back From Sr Manager",
          remark: remark,
        },
        id
      );
      if (response.data.success) {
        dispatch(
          setAlert({
            variant: "success",
            open: true,
            message: "Send back From Sr Manager",
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

  const handleSubmit = async (e) => {
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
          status:
            agreement[ids[0]].op_id === 0 ||
            (agreement[ids[0]].op_id === null &&
              agreement[ids[0]].deposit - deposit !== 0)
              ? "Sent To BUH"
              : "Sent To Operations",
          srm_id: login_manager_id,
          remark: remark,
        },
        id
      );
      if (response.data.success) {
        dispatch(
          setAlert({
            variant: "success",
            open: true,
            message:
              agreement[ids[0]].op_id === 0 ||
              agreement[ids[0]].op_id === null
              // &&
              // agreement[ids[0]].deposit - deposit !== 0
                ? "Agreement Sent To BUH"
                : "Agreement Sent To Operations ",
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
  };

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
          status: "Terminated By Sr Manager",
        },
        id
      );
      if (response.data.success) {
        dispatch(
          setAlert({
            variant: "success",
            open: true,
            message: "Agreement Sent to Operations For Termination.",
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
      {ids &&
        (ids.length > 0 &&
        (agreement[ids[0]].type === "Renewed" ? oldIds.length > 0 : true) )&& (

          <Stack sx={{ flexDirection: "row", mb: 4 }}>

            {/* <a id="button"></a> */}
            {console.log(agreement[ids[0]].op_id)};
            <SRMHamburger />
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
                    </>
                  )}

                  {agreement[ids[0]].site_visit_date !== null && (
                    <>
                      <Grid container>
                        <DataFieldStyle
                          field={"Site Visit date"}
                          value={agreement[ids[0]].site_visit_date}
                        />
                        <DataFieldStyle
                          field={"Site Visit Remark"}
                          value={agreement[ids[0]].site_visit_remark}
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
                      partLabel={
                        agreement[ids[0]].type === "Renewed" &&
                        "Old Agreement Value: " + partLabel[oldIds[0]].area
                      }
                    />
                    <DataFieldStyle
                      field={"lock in Month"}
                      value={agreement[ids[0]].lockInYear}
                      partLabel={
                        agreement[ids[0]].type === "Renewed" &&
                        "Old Agreement Value: " +
                          partLabel[oldIds[0]].lockInYear
                      }
                    />
                    <DataFieldStyle
                      field={"notice period in month"}
                      value={agreement[ids[0]].noticePeriod}
                      partLabel={
                        agreement[ids[0]].type === "Renewed" &&
                        "Old Agreement Value: " +
                          partLabel[oldIds[0]].noticePeriod
                      }
                    />
                    <DataFieldStyle
                      field={"deposit"}
                      value={agreement[ids[0]].deposit}
                      partLabel={
                        agreement[ids[0]].type === "Renewed" &&
                        "Old Agreement Value: " + partLabel[oldIds[0]].deposit
                      }
                    />
                    <DataFieldStyle
                      field={"monthly rental"}
                      value={agreement[ids[0]].monthlyRent}
                      partLabel={
                        agreement[ids[0]].type === "Renewed" &&
                        "Old Agreement Value: " +
                          partLabel[oldIds[0]].monthlyRent
                      }
                    />
                    <DataFieldStyle
                      field={"tenure"}
                      value={agreement[ids[0]].tenure}
                      partLabel={
                        agreement[ids[0]].type === "Renewed" &&
                        "Old Agreement Value: " + partLabel[oldIds[0]].tenure
                      }
                    />
                    {agreement[ids[0]].tenure > 12 && (
                      <>
                        <Grid container sx={{ mt: 6 }}>
                          <Grid item xs={12} sx={{ mb: 1 }}>
                            <DataFieldStyle
                              field={"yearly Increment"}
                              value={agreement[ids[0]].yearlyIncrement}
                              partLabel={
                                agreement[ids[0]].type === "Renewed" &&
                                "Old Agreement Value: " +
                                  partLabel[oldIds[0]].yearlyIncrement
                              }
                            />
                          </Grid>
                          <YearField
                            year={"Year 1"}
                            incrementType={agreement[ids[0]].yearlyIncrement}
                            Increment={0}
                            amount={agreement[ids[0]].year1}
                            partLabel={
                              agreement[ids[0]].type === "Renewed" &&
                              "Old Agreement Value: " +
                                partLabel[oldIds[0]].year1
                            }
                          />
                          {console.log(partLabel, agreement)}
                          <YearField
                            year={"Year 2"}
                            incrementType={agreement[ids[0]].yearlyIncrement}
                            amount={agreement[ids[0]].year2}
                            Increment={getIncrement(
                              agreement[ids[0]].year1,
                              agreement[ids[0]].year2,
                              agreement[ids[0]].yearlyIncrement
                            )}
                            partLabel={
                              agreement[ids[0]].type === "Renewed" &&
                              getIncrement(
                                partLabel[oldIds[0]].year1,
                                partLabel[oldIds[0]].year2,
                                partLabel[oldIds[0]].yearlyIncrement
                              )
                            }
                          />
                          {agreement[ids[0]].tenure > 24 && (
                            <YearField
                              year={"Year 3"}
                              incrementType={agreement[ids[0]].yearlyIncrement}
                              amount={agreement[ids[0]].year3}
                              Increment={getIncrement(
                                agreement[ids[0]].year2,
                                agreement[ids[0]].year3,
                                agreement[ids[0]].yearlyIncrement
                              )}
                              partLabel={
                                agreement[ids[0]].type === "Renewed" &&
                                getIncrement(
                                  partLabel[oldIds[0]].year2,
                                  partLabel[oldIds[0]].year3,
                                  partLabel[oldIds[0]].yearlyIncrement
                                )
                              }
                            />
                          )}
                          {agreement[ids[0]].tenure > 36 && (
                            <YearField
                              year={"Year 4"}
                              incrementType={agreement[ids[0]].yearlyIncrement}
                              amount={agreement[ids[0]].year4}
                              Increment={getIncrement(
                                agreement[ids[0]].year3,
                                agreement[ids[0]].year4,
                                agreement[ids[0]].yearlyIncrement
                              )}
                              partLabel={
                                agreement[ids[0]].type === "Renewed" &&
                                getIncrement(
                                  partLabel[oldIds[0]].year3,
                                  partLabel[oldIds[0]].year4,
                                  partLabel[oldIds[0]].yearlyIncrement
                                )
                              }
                            />
                          )}
                          {agreement[ids[0]].tenure > 48 && (
                            <YearField
                              year={"Year 5"}
                              incrementType={agreement[ids[0]].yearlyIncrement}
                              amount={agreement[ids[0]].year5}
                              Increment={getIncrement(
                                agreement[ids[0]].year4,
                                agreement[ids[0]].year5,
                                agreement[ids[0]].yearlyIncrement
                              )}
                              partLabel={
                                agreement[ids[0]].type === "Renewed" &&
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

                    {Array.from(
                      { length: agreement[ids[0]].leeseName.length },
                      (row, id) => (
                        <>
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
                              field={"Name of Lessor"}
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
                              partLabel={
                                agreement[ids[0]].type === "Renewed" &&
                                "Old Agreement Value: " +
                                  partLabel[oldIds[0]].gstNo[id]
                              }
                            />

                            <DataFieldStyle
                              field={"mobile number"}
                              value={agreement[ids[0]].mobileNo[id]}
                              partLabel={
                                agreement[ids[0]].type === "Renewed" &&
                                "Old Agreement Value: " +
                                  partLabel[oldIds[0]].mobileNo[id]
                              }
                            />
                            <DataFieldStyle
                              field={"alternate mobile"}
                              value={agreement[ids[0]].alternateMobile[id]}
                              partLabel={
                                agreement[ids[0]].type === "Renewed" &&
                                "Old Agreement Value: " +
                                  partLabel[oldIds[0]].alternateMobile[id]
                              }
                            />
                            <DataFieldStyle
                              field={"email"}
                              value={agreement[ids[0]].email[id]}
                              partLabel={
                                agreement[ids[0]].type === "Renewed" &&
                                "Old Agreement Value: " +
                                  partLabel[oldIds[0]].email[id]
                              }
                            />
                            <DataFieldStyle
                              field={"Percentage Share"}
                              value={`${agreement[ids[0]].percentage[id]}%`}
                              partLabel={
                                agreement[ids[0]].type === "Renewed" &&
                                "Old Agreement Value: " +
                                  partLabel[oldIds[0]].percentage[id]
                              }
                            />
                          </Grid>
                          <Grid
                            container
                            sx={{ alignItems: "baseline", mt: 1 }}
                          >
                            <DataFieldStyle
                              field={"Deposit UTR Number"}
                              value={agreement[ids[0]].utr_number[id]}
                            />
                            <DataFieldStyle
                              field={"Deposit Payment Date"}
                              value={agreement[ids[0]].payment_date[id]}
                            />
                          </Grid>
                        </>
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
                          {/* <Grid item xs={12} sx={{ mt: 2, mb: 1 }}>
                          <Typography variant="body1" fontWeight="600">
                            Landlord {id + 1} Details
                          </Typography>
                        </Grid> */}
                          <Heading
                            heading={`Landlord ${id + 1} Bank Details`}
                          />
                          <DataFieldStyle
                            field={"bank name"}
                            value={agreement[ids[0]].bankName[id]}
                            partLabel={
                              agreement[ids[0]].type === "Renewed" &&
                              "Old Agreement Value: " +
                                partLabel[oldIds[0]].bankName[id]
                            }
                          />
                          <DataFieldStyle
                            field={"beneficiary name"}
                            value={agreement[ids[0]].benificiaryName[id]}
                            partLabel={
                              agreement[ids[0]].type === "Renewed" &&
                              "Old Agreement Value: " +
                                partLabel[oldIds[0]].benificiaryName[id]
                            }
                          />
                          <DataFieldStyle
                            field={"bank A/c number"}
                            value={agreement[ids[0]].accountNo[id]}
                            href={agreement[ids[0]].cheque[id]}
                            name={"cheque"}
                            bold={true}
                            cursor={true}
                            partLabel={
                              agreement[ids[0]].type === "Renewed" &&
                              "Old Agreement Value: " +
                                partLabel[oldIds[0]].accountNo[id]
                            }
                          />
                          <DataFieldStyle
                            field={"Bank IFSC"}
                            // partLabel={agreement[ids[0]].branchName[id]}
                            value={agreement[ids[0]].ifscCode[id]}
                            partLabel={
                              agreement[ids[0]].type === "Renewed" &&
                              "Old Agreement Value: " +
                                partLabel[oldIds[0]].ifscCode[id]
                            }
                          />
                        </Grid>
                      )
                    )}
                  </Grid>
                </Grid>

                {/* Bank Details Ends here */}

                {/* Bank Details Ends here */}

                {/* Document Section start here */}

                <Grid item md={10}>
                  <Grid container spacing={4} sx={{ mt: 1 }}>
                    <Heading heading={"Document View/Download"} />
                    <DocumentView
                      title={"draft agreement"}
                      img={agreement[ids[0]].draft_agreement}
                      partLabel={
                        agreement[ids[0]].type === "Renewed" &&
                        partLabel[oldIds[0]].draft_agreement
                      }
                    />
                    <DocumentView
                      title={"electricity bill"}
                      img={agreement[ids[0]].electricity_bill}
                      partLabel={
                        agreement[ids[0]].type === "Renewed" &&
                        partLabel[oldIds[0]].electricity_bill
                      }
                    />
                    {/* <DocumentView
                    title={"Cancel bank cheque"}
                    img={agreement[ids[0]].cheque}
                  /> */}
                    <DocumentView
                      title={"maintaince bill"}
                      img={agreement[ids[0]].maintaince_bill}
                      partLabel={
                        agreement[ids[0]].type === "Renewed" &&
                        partLabel[oldIds[0]].maintaince_bill
                      }
                    />
                    <DocumentView
                      title={"POA"}
                      img={agreement[ids[0]].poa}
                      partLabel={
                        agreement[ids[0]].type === "Renewed" &&
                        partLabel[oldIds[0]].poa
                      }
                    />
                    <DocumentView
                      title={"Property tax receipt"}
                      img={agreement[ids[0]].tax_receipt}
                      partLabel={
                        agreement[ids[0]].type === "Renewed" &&
                        partLabel[oldIds[0]].tax_receipt
                      }
                    />
                    {agreement[ids[0]].leeseName.length > 1 && (
                      <DocumentView
                        title={"NOC (if multiple owner)"}
                        img={agreement[ids[0]].noc}
                        partLabel={
                          agreement[ids[0]].type === "Renewed" &&
                          partLabel[oldIds[0]].noc
                        }
                      />
                    )}
                    <DocumentView
                      title={"Property Picture"}
                      img={agreement[ids[0]].property_pic}
                    />
                  </Grid>
                </Grid>

                {/* // Landlord assets */}
                <Grid item container xs={10} sx={{ mt: 3 }}>
                  <DataFieldStyle
                    field={"Landlord Assets"}
                    value={agreement[ids[0]].assets}
                  />
                </Grid>
                {/* document section ends here */}

                {/* // termination  points */}
                {/* // Landlord assets */}
                {agreement[ids[0]].remark !== null && (
                  <Grid item container xs={10} sx={{ mt: 2 }}>
                    <DataFieldStyle
                      field={"Remark"}
                      value={agreement[ids[0]].remark}
                    />
                  </Grid>
                )}

                {agreement[ids[0]].type === "Renewed" && (
                  <>
                  {console.log(renewalRecovery.unpaid_months)}
                        {/* // unpaid months details here */}
                      {/* {recovery.unpaid_months.length > 0 &&<> */}
                      {/* <Typography color = 'primary' sx = {{fontWeight : 600}} variant = 'h6'>Unpaid Months</Typography> */}

                        {renewalRecovery.unpaid_months.map(row=><Grid
                      item
                      container
                      sx={{ alignItems: "baseline", mt: 5 }}
                      xs={10}><Grid container sx={{ gap: "2rem", mt: 2 }}>
                        <DataFieldStyle
                          field="Unpaid Month"
                          value={row.month}
                        />
                        <DataFieldStyle
                          field="Rent Amount"
                          value={row.rent}
                        />
                        <DataFieldStyle
                          field="Status"
                          value={row.status}
                        />
                        </Grid>
                        </Grid>
                        )}

                        {/* </>} */}
                    <Grid
                      item
                      container
                      sx={{ alignItems: "baseline", mt: 5 }}
                      xs={10}
                    >
                      <DataFieldStyle
                        field={"Old Deposited Amount"}
                        value={renewalRecovery.deposited}
                      />

                      <DataFieldStyle
                        field={"Unpaid Monthly Rental"}
                        value={renewalRecovery.unpaid_amount}
                      />

                      <DataFieldStyle
                        field={"New Deposit Amount"}
                        value={renewalRecovery.new_deposit}
                      />
                      <DataFieldStyle
                        field={"New Deposit AmountReceivable/Payable"}
                        value={renewalRecovery.receivable}
                      />
                      {/* <DataFieldStyle
                        field={"Deposit Amount"}
                        value={renewalRecovery.balance_amount}
                      /> */}
                    </Grid>
                  </>
                )}

                {(agreement[ids[0]].status === "Terminated By Manager" ||
                  agreement[ids[0]].status === "Terminated" ||
                  agreement[ids[0]].renewal_status ===
                    "Sent For Termination") && (
                  <>
                    <Grid item container xs={10} sx={{ mt: 2 }}>
                      <DataFieldStyle
                        field={"Termination Remark"}
                        value={agreement[ids[0]].termination_remark}
                      />
                    </Grid>
                    {/* document section ends here */}

                    {/* Buttons start here*/}
                    <Grid item xs={10} sx={{ mt: 2 }}>
                      <Grid container sx={{ gap: "2rem" }}>
                        <DataFieldStyle
                          field="Deposit Amount (Paid)"
                          value={recovery.depositedAmount}
                        />
                      </Grid>

                      {/* // unpaid months details here */}
                      {console.log(recovery.unpaid_months)}
                      {/* {recovery.unpaid_months.length > 0 &&<> */}
                      {/* <Typography color = 'primary' sx = {{fontWeight : 600}} variant = 'h6'>Unpaid Months</Typography> */}
                        {recovery.unpaid_months.map(row=><Grid container sx={{ gap: "2rem", mt: 2 }}>
                        <DataFieldStyle
                          field="Unpaid Month"
                          value={row.month}
                        />
                        <DataFieldStyle
                          field="Rent Amount"
                          value={parseFloat(row.rent).toFixed(2)}
                        />
                        <DataFieldStyle
                          field="Status"
                          value={row.status}
                        />
                        </Grid>
                        )}
                        {/* </>} */}
                      

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
                          value={recovery.adjustmentAmountRemark  !== `'""'` && recovery.adjustmentAmountRemark }
                        />
                        {console.log(recovery.adjustmentAmountRemark)}
                      </Grid>

                      <Grid container sx={{ gap: "2rem", mt: 2 }}>
                        <DataFieldStyle
                          field="Expenses Amount"
                          value={recovery.expenses}
                        />
                        <DataFieldStyle
                          field="Remark"
                          value={recovery.expansesRemark !== '""' && recovery.expansesRemark }
                        />
                      </Grid>

                      <Grid item xs={12} container sx={{ gap: "2rem", mt: 2 }}>
                        <DataFieldStyle
                          field="Other Adjustments"
                          value={recovery.otherAdjustments}
                        />
                        <DataFieldStyle
                          field="Remark"
                          value={recovery.otherRemark  !== '""' && recovery.otherRemark}
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
                          img={agreement[ids[0]].file}
                        />
                      </Grid>
                    </Grid>
                  </>
                )}

                {agreement[ids[0]].status === "Sent To Sr Manager" && (
                  <>
                    <Grid
                      item
                      xs={10}
                      sx={{ mt: 5, gap: "2rem" }}
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
                            onClick={handleSubmit}
                          >
                            {console.log(agreement[ids[0]].deposit - deposit)}
                            {agreement[ids[0]].op_id === 0 ||
                            agreement[ids[0]].op_id === null
                              ? //  &&
                                //   agreement[ids[0]].deposit - deposit !== 0
                                " Send to BUH"
                              : " Send To Operations"}
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

                {/* termonation */}
                {agreement[ids[0]].status === "Terminated By Manager" && (
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
                            Send To Operations
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

                {/* buttons end here */}
              </Grid>
            </Box>
          </Stack>
        )
        }
    </>
  );
}

export default SrManagerApproval;
