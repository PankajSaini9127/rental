import React, { useEffect, useState } from "react";

// MUI Components
import {
  Box,
  Button,
  Grid,
  Typography,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";

// Custom Style Component

import {
  DocumentUpload,
  MyHeader,
  SelectComponent,
  TextFieldWrapper,
} from "../StyledComponent";


// Components

import HamburgerMenu from "../HamburgerMenu";
import YearlyIncrement from "./IncrementType";
import DialogBox from "./DialogBox";
import {
  add_agreement,
  add_landlord,
  uploadDoc,
} from "../../Services/Services";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../../store/action/action";
import PermissionAlert from "./Alert";




function Agreement() {
  const { landloard } = useSelector((state) => state);
  const dispatch = useDispatch();

  const codeGenerater = ()=>{
    var length = 6,
    charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    random = "";
for (var i = 0, n = charset.length; i < length; ++i) {
    random += charset.charAt(Math.floor(Math.random() * n));
    setData({...data,code:random})
}
  }

  useEffect(()=>{
    codeGenerater()
  },[])

  const [document, setDocuments] = useState({});
  const [data, setData] = useState({
    landlord: [],
    code: "",
    lockInYear: "",
    noticePeriod: "",
    deposite: "",
    monthlyRent: '',
    yearlyIncrement: "",
    tenure:""
  });

  const [landblord, setLandblord] = useState([1]);

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const [formError, setFormError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const [increment, setIncrement] = useState({year1:"",year2:"",year3:"",year4:"",year5:""})
  const [yearValue, setYearValue] = useState({year1:1,year2:10,year3:12,year4:12,year5:15})


  // upload document
  async function handleChangeFile(e) {

  


    const FD = new FormData();
    FD.append("photo", e.target.files[0]);
    let response = await uploadDoc(FD);

    if (response.status === 200) {
      setData((old) => ({ ...old, [e.target.name]: response.data.link }));
      dispatch(
        setAlert({
          open: true,
          variant: "success",
          message: response.data.message,
        })
      );
    } else {
      dispatch(
        setAlert({
          open: true,
          variant: "error",
          message: response.data.message || "Something went wrong !!!",
        })
      );
    }
  }

  //handle Change for uncommon feilds
  function handleChange(e, i) {
    // console.log(data)
    if (data.landlord[i]) {
      setData((old) => ({
        ...old,
        landlord: old.landlord.map((row, id) => {
          if (i === id) {
            return {
              ...row,
              [e.target.name]: e.target.value,
            };
          }
          return row;
        }),
      }));
    } else {
      setData((old) => ({
        ...old,
        landlord: [
          ...old.landlord,
          {
            [e.target.name]: e.target.value,
          },
        ],
      }));
    }
  }

  // handle Change for common feilds
  function handleCommonChange(e, i) {
    setData((old) => ({ ...old, [e.target.name]: e.target.value }));
  }

  // on form submit

  const handleConfirm = () => {
    setOpen(false)
    // console.log(data)
    const {
      code,
      lockInYear,
      monthlyRent,
      noticePeriod,
      yearlyIncrement,
      deposite,
      gst_certificate,
      draft_agreement,
      electricity_bill,
      poa,
      maintaince_bill,
      cheque,
      tax_receipt,
      noc,
      tenure
    } = data;
    const { landlord } = data;

    APICall(
      {
        code,
        lockInYear,
        monthlyRent,
        noticePeriod,
        yearlyIncrement,
        deposite,
        gst_certificate,
        draft_agreement,
        electricity_bill,
        poa,
        maintaince_bill,
        cheque,
        tax_receipt,
        noc,
        tenure
      },
      landlord
    );
  };


  



  const APICall = async (values, landlordData) => {
    
    const agreement = await add_agreement(values);

    if (agreement.data.success) {
      const agreement_id = agreement.data.agreement[0];

      landlordData = landlordData.map((row, index) => {
        let aadhar_card = `${(landloard[index].name + "@aadhar_card").replace(
          " ",
          ""
        )}`;
        let pan_card = `${(landloard[index].name + "@pan_card").replace(
          " ",
          ""
        )}`;
        return {
          ...row,
          percentageShare: landloard[index].percentage,
          name: landloard[index].name,
          agreement_id,
          aadhar_card: data[aadhar_card],
          pan_card: data[pan_card],
        };
      });
      const result = await add_landlord(landlordData);

      if(result)
      {
        dispatch(setAlert({
          open : true,
          variant : 'success',
          message : 'Agrement submited.'
        }))
      }
    }
  };

useEffect(()=>{
  // console.log(formError)
   if(Object.keys(formError).length === 0 && isSubmit){
    setOpen(true)
   }
},[formError])

  // form validation
  function validate(data){
    const regexEmail = "^[a-zA-Z0-9]+@[a-zA-Z0-9.-]+$";
    const error = {};
    if(!data.landlord[0].pincode){
      error.pincode = "Please Enter Pincode"
    }else 
    if(data.landlord[0].pincode.length < 6 || data.landlord[0].pincode.length > 6){
      error.pincode = "Please Enter Valid Pincode"
    }
    if(!data.landlord[0].aadharNo){
       error.aadharNo = "Please Enter Aadhar Number !"
    }else
    if(data.landlord[0].aadharNo.length < 12 || data.landlord[0].aadharNo.length > 12){
       error.aadharNo = "Aadhar Number Must be 12 Digit"
    }
    if(!data.landlord[0].mobileNo.length){
      error.mobileNo = "Please Enter Mobile Number !"
    }else 
    if(data.landlord[0].mobileNo.length < 10 || data.landlord[0].mobileNo.length > 12){
      error.mobileNo = "Please Enter Valid Mobile Number !"
    } 
    if(data.landlord[0].alternateMobile.length < 10 || data.landlord[0].alternateMobile.length > 12){
      error.alternateMobile = "Please Enter Valid Mobile Number !"
    }
    
    if(!data.landlord[0].email){
      error.email = "Please Enter Email Address !"
    } 
    
    setFormError(error)


  } 

  //confirmation alert
  const [open,setOpen]= useState(false)

  const handleSubmit = (e)=>{
    e.preventDefault();
    validate(data)
    setIsSubmit(true)
    // setOpen(true)
  }

  const handleCancel = ()=>{
    setOpen(false)
  }

  return (
    <>

     {/* alert for submit form */}
     <PermissionAlert handleClose={handleCancel} handleConfirm={handleConfirm} open={open} message={"Before Final Submission Please Check Carefully ."}/>

      {/* dialog box ( popup box ) */}
      <DialogBox value={landblord} setValue={setLandblord} />
      {/* {console.log(landblord)} */}
      <Stack sx={{ flexWrap: "nowrap", flexDirection: "row" }}>
        {/* side nav     */}
        <HamburgerMenu  navigateTo={'listing'} />

        <Box sx={{ flexGrow: 1 }}>
          <MyHeader>New Agreement</MyHeader>

          <Grid container sx={{ justifyContent: "center" }}>
            <Grid item xs={12} md={10}>
              {/* agreement form start here */}
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                  py: 5,
                  backgroundColor: "white",
                  mx: 3,
                  borderRadius: "15px",
                  maxWidth: "1050px",
                  "@media(max-width:900px)": { mx: 0 },
                }}
              >
                {/* Basic details start here */}

                <Grid container sx={{ px: 3 }} spacing={isSmall ? 2 : 4}>
                  <TextFieldWrapper
                    label="Code"
                    placeHolder=""
                    backgroundColor="rgba(3, 193, 243, 0.2);"
                    value={data.code}
                    name="code"
                  
                  />

                  {landblord.map((row, i) => (
                    <>
                      {/* {console.log(landblord)} */}
                      <TextFieldWrapper
                        label="Name Of Lesse"
                        placeHolder="Enter Name Of Lesse"
                        name="leeseName"
                        required={true}
                        value={
                          data.landlord[i] && data.landlord[i].leeseName
                            ? data.landlord[i].leeseName
                            : ""
                        }
                        onChange={(e) => handleChange(e, i)}
                      />
                      <TextFieldWrapper
                        label="State"
                        placeHolder="Enter State"
                        name="state"
                        required={true}
                        value={
                          data.landlord[i] && data.landlord[i].state
                            ? data.landlord[i].state
                            : ""
                        }
                        onChange={(e) => handleChange(e, i)}
                        index={i}
                      />

                      <TextFieldWrapper
                        label="City"
                        placeHolder="Enter City"
                        name="city"
                        required={true}
                        value={
                          data.landlord[i] && data.landlord[i].city
                            ? data.landlord[i].city
                            : ""
                        }
                        onChange={(e) => handleChange(e, i)}
                        index={i}
                      />
                      <TextFieldWrapper
                        label="Location"
                        placeHolder="Enter Location"
                        name="location"
                        value={
                          data.landlord[i] && data.landlord[i].location
                            ? data.landlord[i].location
                            : ""
                        }
                        onChange={(e) => handleChange(e, i)}
                        index={i}
                      />
                      <TextFieldWrapper
                        label="Pincode"
                        placeHolder="Enter Pincode"
                        name="pincode"
                        required={true}
                        maxLength={6}
                        value={
                          data.landlord[i] && data.landlord[i].pincode
                            ? data.landlord[i].pincode
                            : ""
                        }
                        onChange={(e) => handleChange(e, i)}
                        index={i}
                        error={formError.pincode}
                      />
                      <TextFieldWrapper
                        label="Address"
                        placeHolder="Enter Address"
                        required={true}
                        name="address"
                        value={
                          data.landlord[i] && data.landlord[i].address
                            ? data.landlord[i].address
                            : ""
                        }
                        onChange={(e) => handleChange(e, i)}
                        index={i}
                      />
                      <TextFieldWrapper
                        label="Aadhar Number"
                        placeHolder="Enter Aadhar No."
                        required={true}
                        name="aadharNo"
                        maxLength={12}
                        value={
                          data.landlord[i] && data.landlord[i].aadharNo
                            ? data.landlord[i].aadharNo
                            : ""
                        }
                        onChange={(e) => handleChange(e, i)}
                        index={i}
                        error={formError.aadharNo}
                      />
                      <TextFieldWrapper
                        label="Pan Number"
                        placeHolder="Enter Pan No."
                        name="panNo"
                        maxLength={10}
                        value={
                          data.landlord[i] && data.landlord[i].panNo
                            ? data.landlord[i].panNo
                            : ""
                        }
                        onChange={(e) => handleChange(e, i)}
                        index={i}
                      />

                      <TextFieldWrapper
                        label="GST Number"
                        placeHolder="Enter GST No."
                        required={true}
                        name="gstNo"
                        maxLength={15}
                        value={
                          data.landlord[i] && data.landlord[i].gstNo
                            ? data.landlord[i].gstNo
                            : ""
                        }
                        onChange={(e) => handleChange(e, i)}
                        index={i}
                      />
                      <TextFieldWrapper
                        label="Mobile Number"
                        placeHolder="Enter Mobile No."
                        required={true}
                        name="mobileNo"
                        maxLength={10}
                        error={formError.mobileNo}
                        value={
                          data.landlord[i] && data.landlord[i].mobileNo
                            ? data.landlord[i].mobileNo
                            : ""
                        }
                        onChange={(e) => handleChange(e, i)}
                        index={i}
                      />
                      <TextFieldWrapper
                        label="Alternate Number"
                        placeHolder="Enter Alternate No."
                        name="alternateMobile"
                        maxLength={10}
                        value={
                          data.landlord[i] && data.landlord[i].alternateMobile
                            ? data.landlord[i].alternateMobile
                            : ""
                        }
                        error={formError.alternateMobile}
                        onChange={(e) => handleChange(e, i)}
                        index={i}
                      />

                      <TextFieldWrapper
                        label="Email"
                        placeHolder="Enter Email"
                        required={true}
                        name="email"
                        value={
                          data.landlord[i] && data.landlord[i].email
                            ? data.landlord[i].email
                            : ""
                        }
                        onChange={(e) => handleChange(e, i)}
                        index={i}
                        error={formError.email}
                      />
                    </>
                  ))}

                  <TextFieldWrapper
                    label="Lock In Year(If Applicable)"
                    placeHolder="Enter Lock in Year"
                    name="lockInYear"
                    value={data.lockInYear}
                    onChange={handleCommonChange}
                  />
                  <TextFieldWrapper
                    label="Notice Period In Month"
                    placeHolder="Enter Notice Period"
                    name="noticePeriod"
                    value={data.noticePeriod}
                    onChange={handleCommonChange}
                  />
                  <TextFieldWrapper
                    label="Deposite Amount"
                    placeHolder="Enter Deposite Amount"
                    name="deposite"
                    value={data.deposite}
                    onChange={handleCommonChange}
                  />
                  <TextFieldWrapper
                    label="Monthly Rental"
                    placeHolder="Enter Rental"
                    required={true}
                    name="monthlyRent"
                    value={data.monthlyRent}
                    onChange={handleCommonChange}
                  />

                   <SelectComponent
                    label={"Agreement Tenure"}
                    required={true}
                    name="tenure"
                    options={["11 Month","3 Year", "5 Year"]}
                    value={data.tenure}
                    onChange={handleCommonChange}
                   />
                   {
                    data.tenure === ""?null
                    :
                    data.tenure === "11 Month"?null:
                  <SelectComponent
                    label={"Yearly Increment"}
                    required={true}
                    name="yearlyIncrement"
                    options={["Percentage","Value"]}
                    value={data.yearlyIncrement}
                    onChange={handleCommonChange}
                  />
                   }
                </Grid>

                {/* basic details end here */}

                {/* Increment Yearly */}
                <YearlyIncrement yearValue={yearValue} setYearValue={setYearValue} tenure={data.tenure} value={data.yearlyIncrement} rent={data.monthlyRent} increment={increment} setIncrement={setIncrement} />

                {/* Bank Details start here*/}
                <Typography
                  variant="body1"
                  color="var(--main-color)"
                  fontSize="25px"
                  lineHeight="28px"
                  fontWeight="600"
                  my="20px"
                >
                  Bank Detail
                </Typography>

                {landblord.map((_, i) => (
                  <>
                    
                    <Grid container sx={{ px: 3,mb:"25px" }} spacing={isSmall ? 2 : 4}>
                      <Grid item xs={12}>
                      {landblord.length > 0 ? (
                      <Typography color={'var( --main-color)'}>  {landloard.length > 0 ? landloard[i].name : ""}</Typography>
                    ) : (
                      ""
                    )}
                      </Grid>
                      <TextFieldWrapper
                        label="Bank Name"
                        placeHolder="Enter Bank Name"
                        name="bankName"
                        required={true}
                        value={data.bankName}
                        onChange={(e) => handleChange(e, i)}
                      />
                      <TextFieldWrapper
                        label="Benificiary Name"
                        placeHolder="Enter Benificiary Name"
                        name="benificiaryName"
                        value={data.benificiaryName}
                        required={true}
                        onChange={(e) => handleChange(e, i)}
                      />
                      <TextFieldWrapper
                        label="Bank A/C Number "
                        placeHolder="Enter Account No."
                        name="accountNo"
                        required={true}
                        value={data.accountNo}
                        onChange={(e) => handleChange(e, i)}
                      />
                      <TextFieldWrapper
                        label="Bank IFSC Code"
                        placeHolder="Enter IFSC Code"
                        name="ifscCode"
                        required={true}
                        value={data.ifscCode}
                        onChange={(e) => handleChange(e, i)}
                      />
                    </Grid>
                  </>
                ))}

                {/* Bank Details ends here*/}

                {/* Document upload section start here */}

                {/* Document */}
                <Typography
                  variant="body1"
                  color="var(--main-color)"
                  fontSize="25px"
                  lineHeight="28px"
                  fontWeight="600"
                  my="20px"
                >
                  Upload Document
                </Typography>
                {landblord.map((_, i) => (
                  <>
                    
                    <Grid
                      container
                      spacing={isSmall ? 2 : 4}
                      sx={{ px: 1, justifyContent: "space-evenly", mb: 3 }}
                    >
                      <Grid item xs={12}>
                      <Typography  color={'var( --main-color)'}>
                      {landloard.length > 0 ? landloard[i].name : ""}
                    </Typography>
                      </Grid>
                      <DocumentUpload
                        label="Upload Aadhar Card"
                        placeHolder="Upload Aadhar Card"
                        handleChange={handleChangeFile}
                        name={
                          landloard[i]
                            ? `${(landloard[i].name + "@aadhar_card").replace(
                                " ",
                                ""
                              )}`
                            : "adhar"
                        }
                      />

                      <DocumentUpload
                        label="Upload Pan Card"
                        placeHolder={"Upload Pan Card"}
                        handleChange={handleChangeFile}
                        name={
                          landloard[i]
                            ? `${(landloard[i].name + "@pan_card").replace(
                                " ",
                                ""
                              )}`
                            : "pan"
                        }
                      />
                    </Grid>
                  </>
                ))}

                {landblord.length > 0 ? (
                  <Typography
                    variant="body1"
                    color="var(--main-color)"
                    fontSize="25px"
                    lineHeight="28px"
                    fontWeight="600"
                    my="20px"
                  >
                    Upload Document
                  </Typography>
                ) : (
                  ""
                )}

                <Grid
                  container
                  spacing={isSmall ? 2 : 4}
                  sx={{ px: 1, justifyContent: "space-evenly" }}
                >
                  <DocumentUpload
                    label="Upload GST Certificate"
                    placeHolder="Upload GST Certificate"
                    handleChange={handleChangeFile}
                    name={"gst_certificate"}
                  />
                  <DocumentUpload
                    label="Upload Draft Agreement"
                    placeHolder="Upload Draft Agreement"
                    handleChange={handleChangeFile}
                    name={"draft_agreement"}
                  />
                  <DocumentUpload
                    label="Upload Electricity Bill"
                    placeHolder={"Upload Electricity Bill"}
                    handleChange={handleChangeFile}
                    name={"electricity_bill"}
                  />

                  <DocumentUpload
                    label="Upload POA(If Applicable)"
                    placeHolder="Upload POA"
                    handleChange={handleChangeFile}
                    name={"poa"}
                  />

                  <DocumentUpload
                    label="Upload Maintaince Bill"
                    placeHolder={"Upload Maintaince Bill"}
                    handleChange={handleChangeFile}
                    name={"maintaince_bill"}
                  />

                  <DocumentUpload
                    label="Upload Cencel Bank Cheque"
                    placeHolder="Upload Cencel Bank Cheque"
                    handleChange={handleChangeFile}
                    name={"cheque"}
                  />
                  <DocumentUpload
                    label="Upload Property Tax Receipt"
                    placeHolder={"Upload Property Tax Receipt"}
                    handleChange={handleChangeFile}
                    name={"tax_receipt"}
                  />
                  <DocumentUpload
                    label="Upload Noc(If Mutiple Oweners)"
                    placeHolder="NOC"
                    handleChange={handleChangeFile}
                    name={"noc"}
                  />
                </Grid>

                {/* Document upload section end here */}

                {/* Button Start from here */}
                <Grid
                  container
                  sx={{ justifyContent: "center", mt: 2 }}
                  spacing={4}
                >
                  <Grid item md={3} xs={6}>
                    <Button
                      variant="contained"
                      type="submit"
                      color="primary"
                      sx={{
                        height: "60px",
                        width: "100%",
                        borderRadius: "20px",
                        fontSize: "16px",
                        color: "#FFFFFF",
                        lineHeight: "32px",
                        textTransform: "capitalize",
                        "@media(max-width:900px)": {
                          fontSize: "11px",
                          lineHeight: "12px",
                          height: "40px",
                        },
                      }}
                    >
                      Submit To Sr Manager
                    </Button>
                  </Grid>

                  <Grid item md={3} xs={6}>
                    <Button
                      variant="outlined"
                      color="primary"
                      sx={{
                        height: "60px",
                        width: "100%",
                        borderRadius: "20px",
                        fontSize: "16px",
                        lineHeight: "32px",
                        textTransform: "capitalize",
                        "@media(max-width:900px)": {
                          fontSize: "10px",
                          lineHeight: "20px",
                          height: "40px",
                        },
                      }}
                    >
                      Hold
                    </Button>
                  </Grid>
                </Grid>

                {/* Button Ends Here */}
              </Box>

              {/* agreemenet from end here */}
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </>
  );
}

export default Agreement;
