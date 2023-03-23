import { Alert, Box, Button, Grid, Snackbar, Stack, Typography } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../App";
import HamburgerMenu from "../HamburgerMenu";
import { DataFieldStyle, YearField } from "../StyleComponents/Rental";
import { MyHeader } from "../StyledComponent";
import config from '../../config.json'

const documentView = [
  "aadhar card",
  "GST Certificate",
  "pan card",
  "draft agreement",
  "electricity bill",
  "cencil bank cheque",
  "maintaince bill",
  "POA",
  "Property tax receipt",
  "noc (if multiple owner)",
];

const DocumentView = ({ title }) => {
  return (
    <Grid item xs={6}>
      <Typography
        variant="body1"
        fontSize={"20px"}
        color={"primary"}
        textTransform={"capitalize"}
        sx={{ "@media(max-width:900px)": { fontSize: "18px" } }}
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
            width: "100%",
          }}
        >
          view/Download
        </Button>
      </Box>
    </Grid>
  );
};

const Heading = ({ heading }) => {
  return (
    <Grid item xs={12} sx={{ mt: 6, mb: 2 }}>
      <Typography variant="body1" fontSize={"25px"} color={"primary"}>
        {heading}
      </Typography>
    </Grid>
  );
};

const initialState = {
  code: "NA000001",
  leeseName: "",
  state: "",
  city: "",
  location: "",
  pincode: "",
  address: "",
  aadharNo: "",
  panNo: "",
  gstNo: "",
  mobileNo: "",
  alternateMobile: "",
  email: "",
  lockInYear: "",
  noticePeriod: "",
  deposite: "",
  monthlyRent: "",
  yearlyIncrement: "",
  bankName: "",
  benificiaryName: "",
  accountNo: "",
  ifscCode: "",
};

function SrManagerApproval() {
  const { id } = useParams();

  const value = useContext(AuthContext)
  // console.log(value.state.login.name)

  const [msg, setMsg] = useState({
    open: false,
    type: "",
    message: "",
  });

  const [agreement, setAgreement] = useState(initialState);
  const {
    leeseName,
    code,
    state,
    city,
    pincode,
    location,
    address,
    panNo,
    aadharNo,
    gstNo,
    mobileNo,
    alternateMobile,
    email,
    lockInYear,
    noticePeriod,
    deposite,
    monthlyRent,
    bankName,
    benificiaryName,
    accountNo,
    ifscCode,
    manager
  } = agreement;

console.log(agreement)

  const getData = async () => {
    console.log(id)
    const agreement = await axios.get(
      `${config.API_LIVE}/api/srmanager/agreement/${id}`
    );
  
    setAgreement(agreement.data.agreements[0]);
  };

  const data = {
    leeseName,
    code,
    state,
    city,
    pincode,
    location,
    address,
    panNo,
    aadharNo,
    gstNo,
    mobileNo,
    alternateMobile,
    email,
    lockInYear,
    noticePeriod,
    deposite,
    monthlyRent,
    bankName,
    benificiaryName,
    accountNo,
    ifscCode,
    manager,
    srmanager:value.state.login.name
  }
  

  useEffect(() => {
    getData();
  }, []);

  const navigate = useNavigate();

  const handleApprove = () => {
        PostData(data)
  };

  const PostData = async()=>{
     const agreement = await axios.post(`${config.API_LIVE}/api/operations/agreement/${id}`,data)
     SetAlert(agreement)
  }

const SetAlert = (response)=>{
    if(response.data.success){
      setMsg({
        open:true,
        type:"success",
        message:response.data.message
      })
    }else{
      setMsg({
        open:true,
        type:"error",
        message:response.data.message
      })
    }
}

const handleClose = ()=>{
  if(msg.type === 'success'){
    navigate("/srManagerListing")
    setMsg({
      open:false,
      type:"",
      message:""
    })
  }else{
    setMsg({
      open:false,
      type:"",
      message:""
    })
  }
  
}

  const handleSendManager = () => {

  };


  return (
    <>
      <Stack sx={{ flexDirection: "row" }}>
        <HamburgerMenu />

        <Box sx={{ flexGrow: 1 }}>
          <MyHeader>New Agreement Approval</MyHeader>

          <Grid container sx={{ justifyContent: "center" }}>

          {
            msg.open? <Snackbar
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
          </Snackbar>:''
           }
            {/* Basic Details */}
            <Grid item md={10}>
              <Grid container spacing={2}>
                <DataFieldStyle field={"code"} value={code} />
                <DataFieldStyle field={"name of leese"} value={leeseName} />
                <DataFieldStyle field={"state"} value={state} />
                <DataFieldStyle field={"city"} value={city} />
                <DataFieldStyle field={"location"} value={location} />
                <DataFieldStyle field={"pincode"} value={pincode} />
                <DataFieldStyle field={"address"} value={address} />
                <DataFieldStyle field={"aadhar number"} value={aadharNo} />
                <DataFieldStyle field={"pan number"} value={panNo} />
                <DataFieldStyle field={"gst number"} value={gstNo} />
                <DataFieldStyle field={"mobile number"} value={mobileNo} />
                <DataFieldStyle field={"alternate mobile"} value={alternateMobile} />
                <DataFieldStyle field={"email"} value={email} />
                <DataFieldStyle field={"lock in year"} value={lockInYear} />
                <DataFieldStyle
                  field={"notice period in month"}
                  value={noticePeriod}
                />
                <DataFieldStyle field={"deposit"} value={deposite} />
                <DataFieldStyle field={"monthly rental"} value={monthlyRent} />

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
              <Grid container spacing={2}>
                <DataFieldStyle field={"bank name"} value={bankName} />
                <DataFieldStyle field={"benicifiary name"} value={benificiaryName} />
                <DataFieldStyle field={"bank A/C number"} value={accountNo} />
                <DataFieldStyle field={"bank ifsc code"} value={ifscCode} />
              </Grid>
            </Grid>

            {/* Bank Details Ends here */}

            {/* Document Section start here */}
            <Heading heading={"Document Download"} />

            <Grid item md={8}>
              <Grid container spacing={2}>
                {documentView.map((item, i) => {
                  return <DocumentView title={item} />;
                })}
              </Grid>
            </Grid>

            {/* document section ends here */}

            {/* Buttons start here*/}

            <Grid item md={8} sx={{ mt: 4, mb: 2 }}>
              <Grid container spacing={2}>
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
                    onClick={handleApprove}
                  >
                    Approved And Send to Operations
                  </Button>
                </Grid>
                <Grid item md={6} xs={11}>
                  <Button
                    variant="outlined"
                    sx={{
                      height: "65px",
                      borderRadius: "12px",
                      width: "100%",
                      color: "var(--main-color)",
                      textTransform: "capitalize",
                      fontSize: "18px",
                    }}
                    onClick={handleSendManager}
                  >
                    Send Back To Manager
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            {/* buttons end here */}
          </Grid>
        </Box>
      </Stack>
    </>
  );
}

export default SrManagerApproval;
