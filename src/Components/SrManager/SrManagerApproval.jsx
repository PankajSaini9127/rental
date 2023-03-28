import {
  Alert,
  Box,
  Button,
  Grid,
  Link,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import HamburgerMenu from "../HamburgerMenu";
import { DataFieldStyle, YearField } from "../StyleComponents/Rental";
import { MyHeader } from "../StyledComponent";
import { useEffect, useState } from "react";
import { get_agreement_id } from "../../Services/Services";
import DialogBoxSBM from "../RentalPortal/DialogBoxSBM";

//download file
import {saveAs} from "file-saver";

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
              textDecoration:"none"
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
              textDecoration:"none"
            }}
            onClick={()=>saveAs(img,title)}
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

  const [msg, setMsg] = useState({
    open: false,
    type: "",
    message: "",
  });

  const handleClose = () => {
    if (msg.type === "success") {
      navigate("/listing");
      setMsg({
        open: false,
        type: "",
        message: "",
      });
    } else {
      setMsg({
        open: false,
        type: "",
        message: "",
      });
    }
  };

  const getData = async (id) => {
    const agreement = await get_agreement_id(id)
    setAgreement(agreement.data.agreement);
    setIds(agreement.data.ids)
  };

console.log(agreement)
  
  const [open, setOpen] = useState(false)

  //dialog box
  const handleCancel = ()=>{
       setOpen(false)
  }

  const handleReject = ()=>{
    setOpen(true)
  }



  useEffect(() => {
    getData(id);
  }, []);

  const handleSubmit = (e) => {};

  return (
    <>
      {ids.length > 0 && (
        <Stack sx={{ flexDirection: "row" }}>
          <DialogBoxSBM open={open} handleClose={handleCancel} sendBack={'send back to manager'} navigate={''}/>
         <HamburgerMenu
          handleListing={()=>navigate('/srManagerListing')}
          navigateHome={"srManagerDashboard"}
        />

          <Box sx={{ flexGrow: 1 }}>
            <MyHeader>New Agreement Approval</MyHeader>

            <Grid container sx={{ justifyContent: "center",mt:2 }}>
              {msg.open ? (
                <Snackbar
                  open={msg.open}
                  anchorOrigin={{ vertical: "top", horizontal: "center" }}
                  autoHideDuration={6000}
                  onClose={handleClose}
                >
                  <Alert
                    onClose={handleClose}
                    severity={msg.type}
                    sx={{ width: "100%" }}
                  >
                    {msg.message}
                  </Alert>
                </Snackbar>
              ) : (
                ""
              )}
              {/* Basic Details */}
              <Grid item md={10}>
                <Grid container spacing={2}>
                  <DataFieldStyle
                    field={"code"}
                    value={agreement[ids[0]].code}
                  />
                  {
                  Array.from({length:agreement[ids[0]].leeseName.length},(row,id)=>(
                
                    <>
                      <DataFieldStyle
                        field={"name of leese"}
                        value={agreement[ids[0]].leeseName[id]}
                      />
                      <DataFieldStyle
                        field={"state"}
                        value={agreement[ids[0]].state[id]}
                      />
                      <DataFieldStyle
                        field={"location"}
                        value={agreement[ids[0]].location[id]}
                      />
                      <DataFieldStyle
                        field={"pincode"}
                        value={agreement[ids[0]].pincode[id]}
                      />
                      <DataFieldStyle
                        field={"address"}
                        value={agreement[ids[0]].address[id]}
                      />
                      <DataFieldStyle
                        field={"aadhar number"}
                        value={agreement[ids[0]].aadharNo[id]}
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
                    </>
                  ))}

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

                  <Grid container spacing={1} sx={{ mt: 6 }}>
                    <YearField year={"year 1"} amount={3000} />
                    <YearField year={"year 2"} amount={3000} />
                    <YearField year={"year 3"} amount={3000} />
                    <YearField year={"year 4"} amount={3000} />
                    <YearField year={"year 5"} amount={3000} />
                  </Grid>
                </Grid>
              </Grid>

              {/* Bank Details start here */}
              <Heading heading={"Bank Details"} />

              <Grid item md={10}>
                <Grid container spacing={2} >
                  {
                  Array.from({length:agreement[ids[0]].leeseName.length},(row,id)=>(
                    <>
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
                    </>
                  ))}
                </Grid>
              </Grid>

              {/* Bank Details Ends here */}

              {/* Document Section start here */}
              <Heading heading={"Document View/Download"} />

              <Grid item md={8}>
                <Grid container spacing={2}>
                  {
                  Array.from({length:agreement[ids[0]].leeseName.length},(row,id)=>(
                    <>
                      <DocumentView
                        title={"aadhar Card"}
                        img={agreement[ids[0]].aadhar_card[id]}
                      />
                      <DocumentView
                        title={"pan card"}
                        img={agreement[ids[0]].pan_card[id]}
                      />
                    </>
                  ))}

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
                  <DocumentView
                    title={"POA"}
                    img={agreement[ids[0]].poa}
                  />
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

              {/* Buttons start here*/}

              {/* {agreement[ids[0]].status == "Hold" && ( */}
              
                <Grid item md={8} sx={{ mt: 4, mb: 2 }}>
                  <Grid container spacing={2} sx={{ justifyContent: "space-evenly" }}>
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
                          color:'var(--main-color)',
                          height: "65px",
                          borderRadius: "12px",
                          backgroundColor: "primary",
                          width: "100%",
                          textTransform: "capitalize",
                          fontSize: "18px",
                        }}
                        onClick={handleReject}
                      >
                        Send Back To Manager
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>

               
             

              {/* )} */}

              {/* buttons end here */}
            </Grid>
          </Box>
        </Stack>
      )}
    </>
  );
}

export default SrManagerApproval;
