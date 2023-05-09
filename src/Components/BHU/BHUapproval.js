import {
  Alert,
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
import { DataFieldStyle, YearField } from "../StyleComponents/Rental";
import { MyHeader, TextFieldWrapper } from "../StyledComponent";
import { useEffect, useState } from "react";
import {
  get_agreement_buh_id,
  get_agreement_id,
  get_old_agreement,
  get_renewal_recovery_data,
  send_back_to_manager,
} from "../../Services/Services";
import DialogBoxSBM from "../RentalPortal/DialogBoxSBM";
import { useDispatch, useSelector } from "react-redux";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

import { send_to_operations } from "../../Services/Services";

//download file
import { setAlert } from "../../store/action/action";
import BUH_Hamburger from "./BUH_Hamburger";

// import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

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

  const [agreement, setAgreement] = useState({});
  const [ids, setIds] = useState([]);

  const [sendBackMsg, setSendBackMsg] = useState("");

  //renewal recovery data
  const [renewalRecovery, setRenewalRecovery] = useState({});

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

  const { auth } = useSelector((s) => s);

  const srm_id = auth.id;

  const dispatch = useDispatch();

  const [oldIds, setOldIds] = useState([]);

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

  async function get_renewal_recovery(code) {
    try {
      const renewalRecovery = await get_renewal_recovery_data(code);
      console.log(renewalRecovery.data);
      renewalRecovery.status === 200 &&
        setRenewalRecovery(renewalRecovery.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  const getData = async (id) => {
    const agreement = await get_agreement_buh_id(id);
    setAgreement(agreement.data[0]);
    // setIds(agreement.data.ids);
    // setSendBackMsg(agreement.data.agreement.remark);
    console.log(agreement.data[0]);
    if (agreement.data[0].type === "Renewed") {
      get_old_data(agreement.data[0].code);
      get_renewal_recovery(id);
    }
    console.log(agreement);
  };

  useEffect(() => {
    getData(id);
  }, []);

  const handleSubmit = async (e) => {
    if (sendBackMsg.length <= 0) {
      dispatch(
        setAlert({
          variant: "error",
          open: true,
          message: "Remark Required !.",
        })
      );
    } else {
      const response = await send_to_operations(
        { status: "Sent To Operations", buh_id: srm_id, remark: sendBackMsg },
        id
      );
      if (response.data.success) {
        dispatch(
          setAlert({
            vatiant: "success",
            open: true,
            message: "Approved And Sent To Operations",
          })
        );
        navigate(-1);
      } else {
        dispatch(
          setAlert({
            vatiant: "error",
            open: true,
            message: "Something went wrong! Please again later.",
          })
        );
      }
    }
  };

  //Send Back to manager
  async function handleSendBack() {
    if (sendBackMsg.length <= 0) {
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
          status: "Sent Back From BUH",
          remark: sendBackMsg,
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
      {(agreement.type === "Renewed" ? oldIds.length > 0 : true) && (
        <Stack sx={{ flexDirection: "row", mb: 4 }}>
          <BUH_Hamburger />
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
          <Box sx={{ flexGrow: 1 }}>
            <Grid container sx={{ justifyContent: "center", mt: 2 }}>
              <Grid item xs={12}>
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
              </Grid>

              {/* Basic Details */}
              <Grid item md={10} sx={{ mt: 2 }}>
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
                    field={"manager"}
                    value={agreement.manager_name}
                  />
                  <DataFieldStyle
                    field={"Senior manager"}
                    value={agreement.srm_name}
                  />
                </Grid>
                <Grid container sx={{ mt: 2 }}>
                  <DataFieldStyle field={"code"} value={agreement.code} />

                  <DataFieldStyle field={"state"} value={agreement.state} />
                  <DataFieldStyle field={"city"} value={agreement.city} />
                  <DataFieldStyle
                    field={"location"}
                    value={agreement.location}
                  />

                  <DataFieldStyle field={"pincode"} value={agreement.pincode} />
                  <DataFieldStyle field={"address"} value={agreement.address} />
                  <DataFieldStyle
                    field={"area"}
                    value={agreement.area + " sq. ft"}
                    partLabel={
                      agreement.type === "Renewed" &&
                      "Old Agreement Value: " + partLabel[oldIds[0]].area
                    }
                  />
                  <DataFieldStyle
                    field={"lock in month"}
                    value={agreement.lockInYear}
                    partLabel={
                      agreement.type === "Renewed" &&
                      "Old Agreement Value: " + partLabel[oldIds[0]].lockInYear
                    }
                  />
                  <DataFieldStyle
                    field={"notice period in month"}
                    value={agreement.noticePeriod}
                    partLabel={
                      agreement.type === "Renewed" &&
                      "Old Agreement Value: " +
                        partLabel[oldIds[0]].noticePeriod
                    }
                  />
                  <DataFieldStyle
                    field={"deposit"}
                    value={agreement.deposit}
                    partLabel={
                      agreement.type === "Renewed" &&
                      "Old Agreement Value: " + partLabel[oldIds[0]].deposit
                    }
                  />
                  <DataFieldStyle
                    field={"monthly rental"}
                    value={agreement.monthlyRent}
                    partLabel={
                      agreement.type === "Renewed" &&
                      "Old Agreement Value: " + partLabel[oldIds[0]].monthlyRent
                    }
                  />
                  <DataFieldStyle
                    field={"tenure"}
                    value={agreement.tenure}
                    partLabel={
                      agreement.type === "Renewed" &&
                      "Old Agreement Value: " + partLabel[oldIds[0]].tenure
                    }
                  />

                  {agreement.tenure > 12 && (
                    <>
                      <Grid container spacing={1} sx={{ mt: 6 }}>
                        <Grid item xs={12} sx={{ mb: 1 }}>
                          <DataFieldStyle
                            field={"yearly Increment"}
                            value={agreement.yearlyIncrement}
                            partLabel={
                              agreement.type === "Renewed" &&
                              "Old Agreement Value: " +
                                partLabel[oldIds[0]].yearlyIncrement
                            }
                          />
                        </Grid>
                        <YearField
                          year={"Year 1"}
                          incrementType={agreement.yearlyIncrement}
                          Increment={0}
                          amount={agreement.year1}
                          partLabel={
                            agreement.type === "Renewed" &&
                            partLabel[oldIds[0]].year1
                          }
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
                            agreement.type === "Renewed" &&
                            getIncrement(
                              partLabel[oldIds[0]].year1,
                              partLabel[oldIds[0]].year2,
                              partLabel[oldIds[0]].yearlyIncrement
                            )
                          }
                        />
                        {agreement.tenure > 24 && (
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
                        {agreement.tenure > 36 && (
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
                </Grid>
              </Grid>

              <Grid item xs={10} sx={{ mt: 5 }}>
                <DataFieldStyle field={"Remark"} value={agreement.remark} />
              </Grid>

              {agreement.type === "Renewed" && (
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

              {agreement.status === "Sent To BUH" && (
                <>
                  <Grid item container xs={10} sx={{ mt: 5 }}>
                    <Grid item xs={8} className="textFieldWrapper">
                      <TextField
                        type="text"
                        multiline
                        rows={3}
                        fullWidth
                        variant="outlined"
                        label="Remark *"
                        placeholder="Remark *"
                        value={sendBackMsg}
                        onChange={(e) => setSendBackMsg(e.target.value)}
                      />
                    </Grid>
                  </Grid>
                  <Grid item md={8} sx={{ mt: 4, mb: 2 }}>
                    <Grid
                      container
                      spacing={1}
                      sx={{ justifyContent: "space-evenly" }}
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
                          Send To Operations
                        </Button>
                      </Grid>
                      <Grid item md={4} xs={11}>
                        <Button
                          variant="outlined"
                          sx={{
                            color: "var(--main-color)",
                            height: "55px",
                            borderRadius: "12px",
                            backgroundColor: "primary",
                            width: "100%",
                            textTransform: "capitalize",
                            fontSize: "18px",
                            lineHeight: "20px",
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

export default SrManagerApproval;
