import { useTheme } from '@emotion/react';
import { Alert, Box, Button, Grid, Snackbar, Stack, Typography, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import HamburgerMenu from '../HamburgerMenu';
import { MyHeader, SelectComponent, TextFieldWrapper } from '../StyledComponent';
import YearlyIncrement from './IncrementType';
import config from '../../config.json'

import axios from 'axios'
import { get_agreement_id } from '../../Services/Services';

const initialState={
    code:"",
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

  const incrementType = [
    "Percentage",
    "Value"
  ]




function EditAgreement() {
      const navigate = useNavigate();
    const { id } = useParams();

    // get data by id
const getData = async(id)=>{
    const agreement = await get_agreement_id(id)
    // setValue(agreement.data[0])
    console.log(agreement)
}

useEffect(()=>{
    getData()
},[])

    const [Value, setValue] = useState(initialState);

    const [err,setErr] = useState({
        open:false,
        type:"",
        message:''
      })
    
      //altet close 
      const handleClose = ()=>{
        navigate(-1)
          setErr(
            {
              open:false,
              type:"",
              message:''
            }
          )
          
      }

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
        } = Value;


 //Update API
 const updateAPI = async()=>{
    const updateAPI = await axios.put(`${config.API_LIVE}/api/updateAgreement/${id}`,Value)
      
    if(updateAPI.data.success){
        setErr({
            open:true,
            type:'success',
            message:updateAPI.data.message
        })
    }
 }
 
 
        // on field state change
 const handleChange = (e)=>{
    setValue({
      ...Value,
      [e.target.name]:e.target.value
    })
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    updateAPI()
    // navigate('/srManagerLogin')
    
  }

    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
  return (
    <>
      <Stack sx={{ flexWrap: "nowrap", flexDirection: "row" }}>

    {/* side nav     */}
        <HamburgerMenu />

        <Box sx={{flexGrow:1}}>
          <MyHeader>Edit Agreement</MyHeader>


          <Grid container sx={{ justifyContent: "center" }}>
          <Grid item xs={12} md={10}>

          <Snackbar open={err.open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical:"top", horizontal:"center" }}>
  <Alert onClose={handleClose} severity={err.type} sx={{ width: '100%' }}>
    {err.message}
  </Alert>
</Snackbar>

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


       <TextFieldWrapper
                  label="Name Of Lesse"
                  placeHolder="Enter Name Of Lesse"
                  name='leeseName'
                  onChange={e=>handleChange(e)}
                  value={leeseName}
                />
                <TextFieldWrapper 
                label="State"
                placeHolder="Enter State"
                name='state'
                onChange={e=>handleChange(e)}
                value={state}
                 />

                <TextFieldWrapper 
                label="City" 
                placeHolder="Enter City"
                name='city'
                onChange={e=>handleChange(e)}
                value={city}
                />
                <TextFieldWrapper
                  label="Location"
                  placeHolder="Enter Location"
                  name='location'
                  value={location}
                onChange={e=>handleChange(e)}
                />
                <TextFieldWrapper 
                label="Pincode" 
                placeHolder="Enter Pincode" 
                name='pincode'
                value={pincode}
                onChange={e=>handleChange(e)}
                />
                <TextFieldWrapper 
                label="Address" 
                placeHolder="Enter Address"
                name='address'
                value={address}
                onChange={e=>handleChange(e)}
                />
                <TextFieldWrapper
                  label="Aadhar Number"
                  placeHolder="Enter Aadhar No."
                  name='aadharNo'
                  value={aadharNo}
                onChange={e=>handleChange(e)}
                />
                <TextFieldWrapper
                  label="Pan Number"
                  placeHolder="Enter Pan No."
                  name='panNo'
                  value={panNo}
                onChange={e=>handleChange(e)}
                />

                <TextFieldWrapper
                  label="GST Number"
                  placeHolder="Enter GST No."
                  name='gstNo'
                  value={gstNo}
                onChange={e=>handleChange(e)}
                />
                <TextFieldWrapper
                  label="Mobile Number"
                  placeHolder="Enter Mobile No."
                  name='mobileNo'
                  value={mobileNo}
                onChange={e=>handleChange(e)}
                />
                <TextFieldWrapper
                  label="Alternate Number"
                  placeHolder="Enter Alternate No."
                  name='alternateMobile'
                  value={alternateMobile}
                onChange={e=>handleChange(e)}
                />

                <TextFieldWrapper 
                label="Email" 
                placeHolder="Enter Email" 
                name='email'
                value={email}
                onChange={e=>handleChange(e)}
                />
  
        
                <TextFieldWrapper
                  label='Lock In Year(If Applicable)'
                  placeHolder="Enter Lock in Year"
                  name='lockInYear'
                  value={lockInYear}
                onChange={e=>handleChange(e)}
                />
                <TextFieldWrapper
                  label="Notice Period In Month"
                  placeHolder="Enter Notice Period"
                  name='noticePeriod'
                  value={noticePeriod}
                onChange={e=>handleChange(e)}
                />
                <TextFieldWrapper
                  label="Deposite Amount"
                  placeHolder="Enter Deposite Amount"
                  name='deposite'
                  value={deposite}
                onChange={e=>handleChange(e)}
                />
                <TextFieldWrapper
                  label="Monthly Rental"
                  placeHolder="Enter Rental"
                  name='monthlyRent'
                  value={monthlyRent}
                onChange={e=>handleChange(e)}
                />
                <SelectComponent
                  label={'Yearly Increment'}
                  name='yearlyIncrement'
                  options={incrementType}
                  value={yearlyIncrement}
                onChange={e=>handleChange(e)}
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
              

                    <Grid container sx={{px:3}} spacing={isSmall?2:4}>
                    <TextFieldWrapper
                  label="Bank Name"
                  placeHolder="Enter Bank Name"
                  name='bankName'
                  value={bankName}
                onChange={e=>handleChange(e)}
                />
                <TextFieldWrapper
                  label="Benificiary Name"
                  placeHolder="Enter Benificiary Name"
                  name='benificiaryName'
                  value={benificiaryName}
                onChange={e=>handleChange(e)}
                />
                <TextFieldWrapper
                  label="Bank A/C Number "
                  placeHolder="Enter Account No."
                  name='accountNo'
                  value={accountNo}
                onChange={e=>handleChange(e)}
                />
                <TextFieldWrapper
                  label="Bank IFSC Code"
                  placeHolder="Enter IFSC Code"
                  name='ifscCode'
                  value={ifscCode}
                onChange={e=>handleChange(e)}
                />
                
              </Grid>
                

              {/* Bank Details ends here*/}

           
          

          {/* Document upload section start here */}

 {/* Document */}
 {/* <Typography
              variant="body1"
              color="var(--main-color)"
              fontSize="25px"
              lineHeight="28px"
              fontWeight="600"
              my="20px"
            >
              Upload Document
            </Typography> */}


{/* {
  Array.from({length:arrlenght},(_,i)=>{
    return(<>
    {arrlenght > 1?<Typography>Landlord Name</Typography>:''}
      <Grid
      container
      spacing={isSmall?2:4}
      sx={{ px:1, justifyContent:"space-evenly"}}
    >

      <DocumentUpload 
      label="Upload Aadhar Card" 
      placeHolder="Upload Aadhar Card" 
      handleChange={handleChangeFile}
      />

      <DocumentUpload
        label="Upload GST Certificate"
        placeHolder="Upload GST Certificate"
      />

      <DocumentUpload 
      label="Upload Pan Card" 
      placeHolder={'Upload Pan Card'}
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
    </>
    )
  })
} */}
              

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
                  Update
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
                  onClick={()=>navigate(-1)}
                >
                  Cancel
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
  )
}

export default EditAgreement