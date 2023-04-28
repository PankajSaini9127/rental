import {
  Alert,
  Box,
  Button,
  Grid,
  IconButton,
  Link,
  Snackbar,
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
  send_back_to_manager,
} from "../../Services/Services";
import DialogBoxSBM from "../RentalPortal/DialogBoxSBM";
import { useDispatch, useSelector } from "react-redux";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

import { send_to_operations } from "../../Services/Services";

//download file
import { setAlert } from "../../store/action/action";

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

  const { auth } = useSelector((s) => s);

  const srm_id = auth.id;

  const dispatch = useDispatch();

  const getData = async (id) => {
    const agreement = await get_agreement_buh_id(id);
    setAgreement(agreement.data[0]);
    // setIds(agreement.data.ids);
    // setSendBackMsg(agreement.data.agreement.remark);
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
        navigate("/BHUListing");
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
        navigate("/BHUListing");
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
      <Stack sx={{ flexDirection: "row", mb: 4 }}>
        <HamburgerMenu
          navigateHome={"BHUDashboard"}
          handleListing={() => navigate("/BHUListing")}
          // monthlyRent={() => navigate("/buh-monthly-rent")}
          // renewal={() => navigate("/buh-monthly-rent")}
          // monthlyBtn="true"
        />
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
                <DataFieldStyle field={"location"} value={agreement.location} />

                <DataFieldStyle field={"pincode"} value={agreement.pincode} />
                <DataFieldStyle field={"address"} value={agreement.address} />
                <DataFieldStyle
                  field={"area"}
                  value={agreement.area + " sq. ft"}
                />
                <DataFieldStyle
                  field={"lock in month"}
                  value={agreement.lockInYear}
                />
                <DataFieldStyle
                  field={"notice period in month"}
                  value={agreement.noticePeriod}
                />
                <DataFieldStyle field={"deposit"} value={agreement.deposit} />
                <DataFieldStyle
                  field={"monthly rental"}
                  value={agreement.monthlyRent}
                />
                <DataFieldStyle field={"tenure"} value={agreement.tenure} />
                {agreement.tenure !== "11 Month" && (
                  <>
                    <Grid container spacing={1} sx={{ mt: 6 }}>
                      <Grid item xs={12} sx={{ mb: 1 }}>
                        <DataFieldStyle
                          field={"yearly Increment"}
                          value={agreement.yearlyIncrement}
                        />
                      </Grid>
                      <YearField
                        year={"Year 1"}
                        incrementType={agreement.yearlyIncrement}
                        Increment={0}
                        amount={agreement.year1}
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
                      />
                      {(agreement.tenure === "3 Year" ||
                        agreement.tenure === "4 Year" ||
                        agreement.tenure === "5 Year") && (
                        <YearField
                          year={"Year 3"}
                          incrementType={agreement.yearlyIncrement}
                          amount={agreement.year3}
                          Increment={getIncrement(
                            agreement.year2,
                            agreement.year3,
                            agreement.yearlyIncrement
                          )}
                        />
                      )}
                      {(agreement.tenure === "4 Year" ||
                        agreement.tenure === "5 Year") && (
                        <YearField
                          year={"Year 4"}
                          incrementType={agreement.yearlyIncrement}
                          amount={agreement.year4}
                          Increment={getIncrement(
                            agreement.year3,
                            agreement.year4,
                            agreement.yearlyIncrement
                          )}
                        />
                      )}
                      {agreement.tenure === "5 Year" && (
                        <YearField
                          year={"Year 5"}
                          incrementType={agreement.yearlyIncrement}
                          amount={agreement.year5}
                          Increment={getIncrement(
                            agreement.year4,
                            agreement.year5,
                            agreement.yearlyIncrement
                          )}
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
    </>
  );
}

export default SrManagerApproval;
