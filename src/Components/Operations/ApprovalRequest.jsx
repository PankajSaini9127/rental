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
  send_back_to_manager,
  send_to_bhu,
} from "../../Services/Services";
import { setAlert } from "../../store/action/action";
import { useDispatch, useSelector } from "react-redux";

const Heading = ({ heading }) => {
  return (
    <Grid item xs={11} sx={{ mt: 6, mb: 2 }}>
      <Typography
        variant="body1"
        fontSize={"20px"}
        color={"primary"}
        fontWeight={"600"}
        sx={{textDecoration:"underline"}}
      >
        {heading}
      </Typography>
    </Grid>
  );
};
function ApprovalRequest() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { auth } = useSelector((s) => s);
  const login_manager_id = auth.id;

  const [agreement, setAgreement] = useState({});
  const [ids, setIds] = useState([]);

  const dispatch = useDispatch();

  const getData = async (id) => {
    const agreement = await get_agreement_id(id);
    setAgreement(agreement.data.agreement);
    console.log(agreement.data.ids);
    setIds(agreement.data.ids);
  };

  console.log(agreement);

  useEffect(() => {
    getData(id);
  }, []);

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
        { status: "Sent To Finance Team", op_id: login_manager_id },
        id
      );
      if (response.data.success) {
        dispatch(
          setAlert({
            variant: "success",
            open: true,
            message: "Agreement Sent To Finance Team.",
          })
        );
        navigate("/operationsListing");
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

  const [remark, setRemark] = useState("");

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
          status: "Sent Back Form Operations",
          remark: remark,
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
        navigate("/operationsListing");
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
      incrementType = parseInt(((value - rent) / rent) * 100);
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

          <HamburgerMenu
            navigateHome={"operationsDashboard"}
            handleListing={() => navigate("/operationsListing")}
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
                    <Grid container >
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
                <Grid container sx={{ mt: 1 }}>
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
                      <DataFieldStyle
                        field={"yearly Increment"}
                        value={agreement[ids[0]].yearlyIncrement}
                      />
                      <Grid container spacing={1} sx={{ mt: 6 }}>
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
                        <Heading heading={`Landlord ${id + 1} Personal Details`} />
                        <DataFieldStyle
                          field={"name of lessee"}
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
              {/* */}

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
                          field={"bank IFSC code"}
                          value={agreement[ids[0]].ifscCode[id]}
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
                  {/* <DocumentView
                    title={"Cancel bank cheque"}
                    img={agreement[ids[0]].cheque}
                  /> */}
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
                </Grid>
              </Grid>

              {/* document section ends here */}

              {agreement[ids[0]].remark.length > 0 && (
                <Grid item xs={10}>
                  <DataFieldStyle
                    field={"Remark !"}
                    value={agreement[ids[0]].remark}
                  />
                </Grid>
              )}

              {/* Buttons start here*/}

              {agreement[ids[0]].status === "Sent To Operations" && (
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
                    
                      sx={{ justifyContent: "center" }}
                    >
                      <Grid item md={6} xs={11}>
                        <Button
                          variant="contained"
                          sx={{
                            height: "65px",
                            borderRadius: "12px",
                            backgroundColor: "primary",
                            width: "100%",
                            color: "#FFFFFF",
                            textTransform: "capitalize",
                            fontSize: "18px",
                          }}
                          onClick={handleSubmit}
                        >
                          Approve And Send To Finance
                        </Button>
                      </Grid>
                      <Grid item md={6} xs={11}>
                        <Button
                          variant="outlined"
                          sx={{
                            height: "65px",
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

export default ApprovalRequest;
