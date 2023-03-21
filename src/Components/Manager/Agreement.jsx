import React,{ useEffect, useState } from "react";

// MUI Components
import {
  Box,
  Button,
  Grid,
  Typography,
  Stack,
  useTheme,
  useMediaQuery
} from "@mui/material";


// Custom Style Component

import { 
  DocumentUpload, 
  MyHeader, 
  SelectComponent,
  TextFieldWrapper 
} from "../StyledComponent";

import axios from 'axios'

// Components

import HamburgerMenu from "../HamburgerMenu";
import YearlyIncrement from "./IncrementType";
import DialogBox from "./DialogBox";
import { useNavigate } from "react-router-dom";

import {useFormik} from 'formik'
import { agreementSchema } from "../ValidationSchema/Manager";

const incrementType = [
  "Percentage",
  "Value"
]


// form initial state

const initialState={
  code:"NA000001",
  leeseName:"",
  state:"",
  city:"",
  location:"",
  pincode:"",
  address:"",
  aadharNo:"",
  panNo:"",
  gstNo:"",
  mobileNo:"",
  alternateMobile:"",
  email:"",
  lockInYear:"",
  noticePeriod:"",
  deposite:"",
  monthlyRent:"",
  yearlyIncrement:"",
  bankName:"",
  benificiaryName:"",
  accountNo:"",
  ifscCode:""
}


function Agreement() {

  const navigate = useNavigate()


  // form handling using formik

  const {values, handleChange, handleSubmit, handleBlur, errors, touched } = useFormik({
        initialValues:initialState,
        validationSchema:agreementSchema,
        onSubmit:(values,action)=>{
          // APICall(values)
        }
  })

// console.log("Agreement Component")

  const [landblord, setLandblord] = useState('');

  const [arrlenght,setArrLength] = useState(1)

  useEffect(() => {
    if(landblord !== ''){
      setArrLength(landblord)
    }
  }, [landblord])
  

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'))


const { code,
leeseName,
state,
city,
location,
pincode,
address,
aadharNo,
panNo,
gstNo,
mobileNo,
alternateMobile,
email,
lockInYear,
noticePeriod,
deposite,
monthlyRent,
yearlyIncrement,
bankName,
benificiaryName,
accountNo,
ifscCode
} = values;



// upload document
const handleChangeFile = (e)=>{
console.log(e.target.files)

}


// on form submit

// const handleSubmit = (e)=>{
//   e.preventDefault()
//   // navigate('/srManagerLogin')
  
//   APICall()
// }


// const APICall = async(values)=>{
//   const agreement = await axios.post('http://localhost:8080/api/newAgreement',values);
//    navigate('/listing')
// }

  return (
    <>

    {/* dialog box ( popup box ) */}
    <DialogBox value={landblord} setValue={setLandblord}/>


      <Stack sx={{ flexWrap: "nowrap", flexDirection: "row" }}>

    {/* side nav     */}
        <HamburgerMenu />

        <Box sx={{flexGrow:1}}>
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
              maxWidth:"1050px",
              '@media(max-width:900px)':{mx:0}
            }}
          >

{/* Basic details start here */}

              <Grid container sx={{px:3 }} spacing={isSmall? 2 :4}>
                <TextFieldWrapper
                  label="Code"
                  placeHolder=""
                  backgroundColor="rgba(3, 193, 243, 0.2);"
                  value={code}
                  onChange={e=>handleChange(e)}
                />

{
  Array.from({length:arrlenght},(_,i)=>{
    return (<>
       <TextFieldWrapper
                  label="Name Of Lesse"
                  placeHolder="Enter Name Of Lesse"
                  name='leeseName'
                  value={leeseName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errMsg={errors.leeseName}
                  touched={touched.leeseName}
                />
                <TextFieldWrapper 
                label="State"
                placeHolder="Enter State"
                name='state'
                value={state}
                onChange={handleChange}
                  onBlur={handleBlur}
                  errMsg={errors.state}
                  touched={touched.state}
                 />

                <TextFieldWrapper 
                label="City" 
                placeHolder="Enter City"
                name='city'
                value={city}
                onChange={handleChange}
                  onBlur={handleBlur}
                  errMsg={errors.city}
                  touched={touched.city}
                />
                <TextFieldWrapper
                  label="Location"
                  placeHolder="Enter Location"
                  name='location'
                  value={location}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errMsg={errors.location}
                  touched={touched.location}
                />
                <TextFieldWrapper 
                label="Pincode" 
                placeHolder="Enter Pincode" 
                name='pincode'
                value={pincode}
                onChange={handleChange}
                  onBlur={handleBlur}
                  errMsg={errors.pincode}
                  touched={touched.pincode}
                />
                <TextFieldWrapper 
                label="Address" 
                placeHolder="Enter Address"
                name='address'
                value={address}
                onChange={handleChange}
                  onBlur={handleBlur}
                  errMsg={errors.address}
                  touched={touched.address}
                />
                <TextFieldWrapper
                  label="Aadhar Number"
                  placeHolder="Enter Aadhar No."
                  name='aadharNo'
                  value={aadharNo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errMsg={errors.aadharNo}
                  touched={touched.aadharNo}
                />
                <TextFieldWrapper
                  label="Pan Number"
                  placeHolder="Enter Pan No."
                  name='panNo'
                  value={panNo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errMsg={errors.panNo}
                  touched={touched.panNo}
                />

                <TextFieldWrapper
                  label="GST Number"
                  placeHolder="Enter GST No."
                  name='gstNo'
                  value={gstNo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errMsg={errors.gstNo}
                  touched={touched.gstNo}
                />
                <TextFieldWrapper
                  label="Mobile Number"
                  placeHolder="Enter Mobile No."
                  name='mobileNo'
                  value={mobileNo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errMsg={errors.mobileNo}
                  touched={touched.mobileNo}
                />
                <TextFieldWrapper
                  label="Alternate Number"
                  placeHolder="Enter Alternate No."
                  name='alternateMobile'
                  value={alternateMobile}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errMsg={errors.alternateMobile}
                  touched={touched.alternateMobile}
                />

                <TextFieldWrapper 
                label="Email" 
                placeHolder="Enter Email" 
                name='email'
                value={email}
                onChange={handleChange}
                  onBlur={handleBlur}
                  errMsg={errors.email}
                  touched={touched.email}
                />
    </>)
  })
}
        
                <TextFieldWrapper
                  label='Lock In Year(If Applicable)'
                  placeHolder="Enter Lock in Year"
                  name='lockInYear'
                  value={lockInYear}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errMsg={errors.lockInYear}
                  touched={touched.lockInYear}
                />
                <TextFieldWrapper
                  label="Notice Period In Month"
                  placeHolder="Enter Notice Period"
                  name='noticePeriod'
                  value={noticePeriod}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errMsg={errors.noticePeriod}
                  touched={touched.noticePeriod}
                />
                <TextFieldWrapper
                  label="Deposite Amount"
                  placeHolder="Enter Deposite Amount"
                  name='deposite'
                  value={deposite}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errMsg={errors.deposite}
                  touched={touched.deposite}
                />
                <TextFieldWrapper
                  label="Monthly Rental"
                  placeHolder="Enter Rental"
                  name='monthlyRent'
                  value={monthlyRent}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errMsg={errors.monthlyRent}
                  touched={touched.monthlyRent}
                />
                <SelectComponent
                  label={'Yearly Increment'}
                  name='yearlyIncrement'
                  options={incrementType}
                  value={yearlyIncrement}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errMsg={errors.yearlyIncrement}
                  touched={touched.yearlyIncrement}
                />
              </Grid>

              {/* basic details end here */}
   
           {/* Increment Yearly */}
          <YearlyIncrement value={yearlyIncrement}/>



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
              

                {
                  Array.from({length:arrlenght},(_,i)=>{
                    return(<>
                    {arrlenght > 1?<Typography>Landlord Name</Typography>:''}
                    <Grid container sx={{px:3}} spacing={isSmall?2:4}>
                    <TextFieldWrapper
                  label="Bank Name"
                  placeHolder="Enter Bank Name"
                  name='bankName'
                  value={bankName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errMsg={errors.bankName}
                  touched={touched.bankName}
                />
                <TextFieldWrapper
                  label="Benificiary Name"
                  placeHolder="Enter Benificiary Name"
                  name='benificiaryName'
                  value={benificiaryName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errMsg={errors.benificiaryName}
                  touched={touched.benificiaryName}
                />
                <TextFieldWrapper
                  label="Bank A/C Number "
                  placeHolder="Enter Account No."
                  name='accountNo'
                  value={accountNo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errMsg={errors.accountNo}
                  touched={touched.accountNo}
                />
                <TextFieldWrapper
                  label="Bank IFSC Code"
                  placeHolder="Enter IFSC Code"
                  name='ifscCode'
                  value={ifscCode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errMsg={errors.ifscCode}
                  touched={touched.ifscCode}
                />
                
              </Grid>      
                                          </>)
                  })
                }
                

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

            {
  Array.from({length:arrlenght},(_,i)=>{
    return(<>
    {arrlenght > 1?<Typography>Landlord Name</Typography>:''}
      <Grid
      container
      spacing={isSmall?2:4}
      sx={{ px:1, justifyContent:"space-evenly",mb:3}}
    >

      <DocumentUpload 
      label="Upload Aadhar Card" 
      placeHolder="Upload Aadhar Card" 
      handleChange={handleChangeFile}
      />

      <DocumentUpload 
      label="Upload Pan Card" 
      placeHolder={'Upload Pan Card'}
      />


    </Grid>
    </>
    )
  })
}

{arrlenght > 1?
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
            :""}

            
            <Grid
      container
      spacing={isSmall?2:4}
      sx={{ px:1, justifyContent:"space-evenly"}}
    >

            <DocumentUpload
        label="Upload GST Certificate"
        placeHolder="Upload GST Certificate"
      />
      <DocumentUpload
        label="Upload Draft Agreement"
        placeHolder="Upload Draft Agreement"
      />
      <DocumentUpload 
      label="Upload Electricity Bill" 
      placeHolder={'Upload Electricity Bill'} 
      />

      <DocumentUpload
        label="Upload POA(If Applicable)"
        placeHolder="Upload POA"
      />

      <DocumentUpload 
      label="Upload Maintaince Bill" 
      placeHolder={'Upload Maintaince Bill'}
      />

      <DocumentUpload
        label="Upload Cencel Bank Cheque"
        placeHolder="Upload Cencel Bank Cheque"
      />
      <DocumentUpload 
      label="Upload Property Tax Receipt" 
      placeHolder={'Upload Property Tax Receipt'}
      />
      <DocumentUpload
        label="Upload Noc(If Mutiple Oweners)"
        placeHolder="Upload GST Certificate"
      />
      </Grid>


              

              {/* Document upload section end here */}


            {/* Button Start from here */}
              <Grid
                container
                sx={{ justifyContent: "center" ,mt:2}}
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
                    '@media(max-width:900px)':{fontSize:"11px",lineHeight:"12px",height:"40px"}
                  }}
                >
                 Add Agreement
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
                    '@media(max-width:900px)':{fontSize:"10px",lineHeight:"20px",height:"40px"}
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
