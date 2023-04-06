import {
  Alert,
  Box,
  Button,
  Grid,
  Link,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import HamburgerMenu from "../HamburgerMenu";
import { DataFieldStyle, YearField } from "../StyleComponents/Rental";
import { MyHeader } from "../StyledComponent";
import { useEffect, useState } from "react";
import {
  get_agreement_id,
  send_back_to_manager,
  send_to_bhu,
} from "../../Services/Services";
import DialogBoxSBM from "../RentalPortal/DialogBoxSBM";

//download file
import { saveAs } from "file-saver";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../../store/action/action";

const DocumentView = ({ title, img }) => {
  return (
    <Grid item xs={6}>
      <Typography
        variant="body1"
        fontSize={"18px"}
        color={"primary"}
        textTransform={"capitalize"}
        sx={{ "@media(max-width:900px)": { fontSize: "16px" } }}
      >
        {" "}
        {title}
      </Typography>
      <Box
        sx={{
          height: "150px",
          border: "1px solid var(--main-color)",
          borderRadius: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          variant="text"
          sx={{
            textTransform: "capitalize",
            color: "rgba(16, 99, 173, 0.47)",
            height: "100%",
            width: "50%",
          }}
        >
          <Link
            sx={{
              height: "100%",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textDecoration: "none",
            }}
            href={img}
            target="_blank"
          >
            View
          </Link>
        </Button>
        <Button
          variant="text"
          sx={{
            textTransform: "capitalize",
            color: "rgba(16, 99, 173, 0.47)",
            height: "100%",
            width: "50%",
          }}
        >
          <Link
            sx={{
              height: "100%",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textDecoration: "none",
            }}
            onClick={() => saveAs(img, title)}
          >
            Download
          </Link>
        </Button>
      </Box>
    </Grid>
  );
};

const Heading = ({ heading }) => {
  return (
    <Grid item xs={11} sx={{ mt: 6, mb: 2 }}>
      <Typography variant="body1" fontSize={"22px"} color={"primary"}>
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
    setAgreement({});
    const agreement = await get_agreement_id(id);
    setAgreement(agreement.data.agreement);
    setIds(agreement.data.ids);
  };

  useEffect(() => {
    getData(id);
  }, []);

  const handleSubmit = async (e) => {
    const response = await send_to_bhu({ status: "Sent To BHU", srm_id }, id);
    if (response.data.success) {
      dispatch(
        setAlert({
          variant: "success",
          open: true,
          message: "Agreement Sent To BHU",
        })
      );
      navigate('/srManagerListing')
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
          status: "Sent Back For Rectification",
          remark: sendBackMsg
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
        // navigate('/srManagerListing')
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

  return (
    <>
      {ids.length > 0 && (
        <Stack sx={{ flexDirection: "row" ,mb:4}}>
          <HamburgerMenu
            handleListing={() => navigate("/srManagerListing")}
            navigateHome={"srManagerDashboard"}
          />

          <Box sx={{ flexGrow: 1 }}>
            <MyHeader>New Agreement Approval</MyHeader>

            <Grid container sx={{ justifyContent: "center", mt: 2 }}>
              {/* Basic Details */}
              <Grid item md={10}>
                <Grid container spacing={2}>
                  <DataFieldStyle
                    field={"code"}
                    value={agreement[ids[0]].code}
                  />

                  <DataFieldStyle
                    field={"state"}
                    value={agreement[ids[0]].state}
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
                    field={"lock in year"}
                    value={agreement[ids[0]].lockInYear}
                  />
                  <DataFieldStyle
                    field={"notice period in month"}
                    value={agreement[ids[0]].noticePeriod}
                  />
                  <DataFieldStyle
                    field={"deposit"}
                    value={agreement[ids[0]].deposite}
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
                          amount={agreement[ids[0]].year1}
                        />
                        <YearField
                          year={"Year 2"}
                          amount={agreement[ids[0]].year2}
                        />
                        {(agreement[ids[0]].tenure === "3 Year" ||
                          agreement[ids[0]].tenure === "4 Year" ||
                          agreement[ids[0]].tenure === "5 Year") && (
                          <YearField
                            year={"Year 3"}
                            amount={agreement[ids[0]].year3}
                          />
                        )}
                        {(agreement[ids[0]].tenure === "4 Year" ||
                          agreement[ids[0]].tenure === "5 Year") && (
                          <YearField
                            year={"Year 4"}
                            amount={agreement[ids[0]].year4}
                          />
                        )}
                        {agreement[ids[0]].tenure === "5 Year" && (
                          <YearField
                            year={"Year 5"}
                            amount={agreement[ids[0]].year5}
                          />
                        )}
                      </Grid>
                    </>
                  )}

                  {Array.from(
                    { length: agreement[ids[0]].leeseName.length },
                    (row, id) => (
                      <Grid container sx={{ mt: 3 }} spacing={2}>
                        <Grid item xs={12}>
                          <Typography variant="body1">
                            Landlord {id + 1} Details
                          </Typography>
                        </Grid>
                        <DataFieldStyle
                          field={"name of leese"}
                          value={agreement[ids[0]].name[id]}
                        />
                        <DataFieldStyle
                          field={"aadhar number"}
                          value={agreement[ids[0]].aadharNo[0]}
                        />
                        <DataFieldStyle
                          field={"pan number"}
                          value={agreement[ids[0]].panNo[id]}
                        />
                        <DataFieldStyle
                          field={"gst number"}
                          value={agreement[ids[0]].gstNo[id]}
                        />
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
                          value={agreement[ids[0]].percentage[id]}
                        />
                      </Grid>
                    )
                  )}
                </Grid>
              </Grid>

              {/* Bank Details start here */}
              <Heading heading={"Bank Details"} />

              <Grid item md={10}>
                <Grid container spacing={2}>
                  {Array.from(
                    { length: agreement[ids[0]].leeseName.length },
                    (row, id) => (
                      <Grid container spacing={2}>
                        <Grid item xs={12} sx={{ mt: 2, mb: 1 }}>
                          <Typography variant="body1">
                            Landlord {id + 1} Details
                          </Typography>
                        </Grid>
                        <DataFieldStyle
                          field={"bank name"}
                          value={agreement[ids[0]].bankName[id]}
                        />
                        <DataFieldStyle
                          field={"benicifiary name"}
                          value={agreement[ids[0]].benificiaryName[id]}
                        />
                        <DataFieldStyle
                          field={"bank A/C number"}
                          value={agreement[ids[0]].accountNo[id]}
                        />
                        <DataFieldStyle
                          field={"bank ifsc code"}
                          value={agreement[ids[0]].ifscCode[id]}
                        />
                      </Grid>
                    )
                  )}
                </Grid>
              </Grid>

              {/* Bank Details Ends here */}

              {/* Document Section start here */}
              <Heading heading={"Document View/Download"} />

              <Grid item md={8}>
                {Array.from(
                  { length: agreement[ids[0]].leeseName.length },
                  (row, id) => (
                    <Grid container spacing={2}>
                      <Grid item xs={12} sx={{ mt: 2, mb: 1 }}>
                        <Typography variant="body1">
                          Landlord {id + 1} Details
                        </Typography>
                      </Grid>
                      <DocumentView
                        title={"aadhar Card"}
                        img={agreement[ids[0]].aadhar_card[id]}
                      />
                      <DocumentView
                        title={"pan card"}
                        img={agreement[ids[0]].pan_card[id]}
                      />
                    </Grid>
                  )
                )}
                <Grid container spacing={2}>
                  <DocumentView
                    title={"GST Certificate"}
                    img={agreement[ids[0]].gst_certificate}
                  />
                  <DocumentView
                    title={"draft agreement"}
                    img={agreement[ids[0]].draft_agreement}
                  />
                  <DocumentView
                    title={"electricity bill"}
                    img={agreement[ids[0]].electricity_bill}
                  />
                  <DocumentView
                    title={"Cancel bank cheque"}
                    img={agreement[ids[0]].cheque}
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
                  <DocumentView
                    title={"noc (if multiple owner)"}
                    img={agreement[ids[0]].noc}
                  />
                </Grid>
              </Grid>

              {/* document section ends here */}

              {/* Remark Section Starts here */}
              {
                agreement[ids[0]].remark.length > 0 &&
                <Grid
                    item
                    container
                    xs={12}
                    sx={{ mt: 5, justifyContent: "space-around" }}
                  >
                    
                    <Grid item xs={8}>
                    <DataFieldStyle
                    field={'Remark !'}
                    value={agreement[ids[0]].remark}
                    />
                    </Grid>
                  </Grid>
              }
              
              {/* Remark Section Ends here */}


              {/* Buttons start here*/}

              {agreement[ids[0]].status === "Sent To Sr Manager" && (
                <>
                  <Grid
                    item
                    container
                    xs={12}
                    sx={{ mt: 5, justifyContent: "space-around" }}
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
                        value={sendBackMsg}
                        onChange={(e) => setSendBackMsg(e.target.value)}
                      />
                    </Grid>
                  </Grid>

                  <Grid item md={8} sx={{ mt: 4, mb: 2 }}>
                    <Grid
                      container
                      spacing={2}
                      sx={{ justifyContent: "space-evenly" }}
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
                          Approved And Send To BHU
                        </Button>
                      </Grid>
                      <Grid item md={6} xs={11}>
                        <Button
                          variant="outlined"
                          sx={{
                            color: "var(--main-color)",
                            height: "65px",
                            borderRadius: "12px",
                            backgroundColor: "primary",
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

export default SrManagerApproval;
