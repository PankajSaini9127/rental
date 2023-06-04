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
  send_to_bhu,
} from "../../Services/Services";
import { setAlert } from "../../store/action/action";
import { useDispatch, useSelector } from "react-redux";
import HamburgerManager from "./HamburgerManager";

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

function ManagerApproval() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { auth } = useSelector((s) => s);
  const login_manager_id = auth.id;

  const [agreement, setAgreement] = useState({});
  const [ids, setIds] = useState([]);

  const dispatch = useDispatch();

  const [recovery, setRecovery] = useState({});

  //renewal recovery data
  const [renewalRecovery, setRenewalRecovery] = useState({});

  console.log(renewalRecovery);

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

  console.log(partLabel);

  async function get_recovery_data(id) {
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

  async function get_old_data(code) {
    try {
      const oldvalue = await get_old_agreement(code);
      console.log(oldvalue.data);
      oldvalue.status === 200 && setPartLabel(oldvalue.data.agreement);
      oldvalue.status === 200 && setOldIds(oldvalue.data.ids);
    } catch (error) {
      console.log(error);
    }
  }

  async function get_renewal_recovery(id) {
    try {
      const renewalRecovery = await get_renewal_recovery_data(id);
      console.log(renewalRecovery.data);
      renewalRecovery.status === 200 &&
        setRenewalRecovery(renewalRecovery.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getData(id) {
    try {
      const agreement = await get_agreement_id(id);
      console.log(agreement.data);
      if (agreement.data.success) {
        console.log(
          agreement.data.agreement[agreement.data.ids[0]].type === "Renewed"
        );
        if (
          agreement.data.agreement[agreement.data.ids[0]].type === "Renewed"
        ) {
          get_old_data(agreement.data.agreement[agreement.data.ids[0]].code);
          get_renewal_recovery(id);
        }
        setAgreement(agreement.data.agreement);
        console.log(agreement.data);
        setIds(agreement.data.ids);
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
  }

  console.log(agreement);

  useEffect(() => {
    getData(id);
  }, []);

  const handleSubmit = async (e) => {
    const response = await send_to_bhu(
      {
        status: "Sent To Sr Manager",
        manager_id: login_manager_id,
        modify_date: new Date(),
      },
      id
    );
    if (response.data.success) {
      dispatch(
        setAlert({
          variant: "success",
          open: true,
          message: "Agreement Sent To Sr Manager",
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
        ids.length > 0 &&
        (agreement[ids[0]].type === "Renewed" ? oldIds.length > 0 : true) && (
          <Stack sx={{ flexDirection: "row", mb: 4 }}>
            {/* <a id="button"></a> */}

            <HamburgerManager />

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

              <Grid
                container
                sx={{ alignItems: "baseline", justifyContent: "center", mt: 3 }}
              >
                {/* Basic Details */}
                <Grid item md={10}>
                  <Grid container sx={{ alignItems: "baseline" }}>
                    {agreement[ids[0]].status === "Deposited" && (
                      <>
                        <Grid container sx={{ alignItems: "baseline" }}>
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
                        <Grid container sx={{ alignItems: "baseline" }}>
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
                  </Grid>

                  <Grid container sx={{ alignItems: "baseline", mt: 2 }}>
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
                        <Grid
                          container
                          sx={{ alignItems: "baseline", mt: 4 }}
                          spacing={2}
                        >
                          <Grid
                            item
                            xs={12}
                            container
                            sx={{ alignItems: "baseline" }}
                          >
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
                          <Grid
                            container
                            sx={{ alignItems: "baseline", mt: 3 }}
                          >
                            <Heading heading={`Landlord Personal Details`} />
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
                              partLabel={
                                agreement[ids[0]].type === "Renewed" &&
                                "Old Agreement Value: " +
                                  partLabel[oldIds[0]].gstNo[id]
                              }
                            />
                            {console.log(partLabel[oldIds[0]])}
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
                          {agreement[ids[0]].utr_number && (
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
                          )}
                        </>
                      )
                    )}
                  </Grid>
                </Grid>

                {/* Bank Details start here */}
                {/* <Heading heading={"Bank Details"} /> */}

                <Grid item md={10}>
                  <Grid container sx={{ alignItems: "baseline" }}>
                    {Array.from(
                      { length: agreement[ids[0]].leeseName.length },
                      (row, id) => (
                        <Grid container sx={{ alignItems: "baseline" }}>
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
                            value={agreement[ids[0]].ifscCode[id]}
                            // partLabel={agreement[ids[0]].branchName[id]}
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
                  <Grid
                    container
                    spacing={4}
                    sx={{ alignItems: "baseline", mt: 1 }}
                  >
                    <Grid item xs={12}>
                      <Heading heading={"Document View/Download"} />
                    </Grid>
                    <DocumentView
                      title={"draft agreement"}
                      img={agreement[ids[0]].draft_agreement}
                      partLabel={
                        agreement[ids[0]].type === "Renewed" &&
                        partLabel[oldIds[0]].draft_agreement
                      }
                    />
                    {console.log(agreement[ids[0]].type === "Renewed")}
                    <DocumentView
                      title={"electricity bill"}
                      img={agreement[ids[0]].electricity_bill}
                      partLabel={
                        agreement[ids[0]].type === "Renewed" &&
                        partLabel[oldIds[0]].electricity_bill
                      }
                    />
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

                {agreement[ids[0]].renewal_status ===
                  "Sent For Termination" && (
                  <Grid
                    item
                    container
                    sx={{ alignItems: "baseline", mt: 5 }}
                    xs={10}
                  >
                    <DocumentView
                      title={"Termination File"}
                      img={agreement[ids[0]].file}
                    />
                  </Grid>
                )}

                {agreement[ids[0]].assets && (
                  <Grid
                    item
                    container
                    sx={{ alignItems: "baseline", mt: 5 }}
                    xs={10}
                  >
                    <DataFieldStyle
                      field={"Landlord Assets"}
                      value={agreement[ids[0]].assets}
                    />
                  </Grid>
                )}
                {/* document section ends here */}

                {agreement[ids[0]].remark && (
                  <Grid
                    item
                    container
                    sx={{ alignItems: "baseline", mt: 5 }}
                    xs={10}
                  >
                    <DataFieldStyle
                      field={"Remark"}
                      href={agreement[ids[0]].remark}
                    />
                  </Grid>
                )}

                {agreement[ids[0]].type === "Renewed" && (
                  <>
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
                {/* Buttons start here*/}

                {/* Buttons start here*/}

                {agreement[ids[0]].status === "Hold" && (
                  <Grid item md={8} sx={{ mt: 4, mb: 2 }}>
                    <Grid
                      container
                      spacing={2}
                      sx={{ alignItems: "baseline", justifyContent: "center" }}
                    >
                      <Grid item>
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
                          }}
                          onClick={handleSubmit}
                        >
                          Send to Sr Manager
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                )}

                {/* buttons end here */}
              </Grid>
            </Box>
          </Stack>
        )}
    </>
  );
}

export default ManagerApproval;
