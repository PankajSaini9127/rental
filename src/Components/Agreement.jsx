import {
  Box,
  Button,
  Grid,
  Typography,
} from "@mui/material";
import { Stack} from "@mui/system";
import React from "react";
import { useState } from "react";
import DialogBox from "./DialogBox";
import HamburgerMenu from "./HamburgerMenu";
import YearlyIncrement from "./IncrementType";
import { DocumentUpload, MyHeader, SelectComponent } from "./StyledComponent";
import {TextFieldWrapper} from './StyledComponent'

const initialState={
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
  diposite:"",
  monthalyRent:"",
  yearlyIncrement:"1",
  bankName:"",
  benificiaryName:"",
  accountNo:"",
  ifscCode:""

}




function Agreement() {
const [Value, setValue] = useState(initialState)

 const handleChange = (e)=>{
  setValue({
    ...Value,
    [e.target.name]:e.target.value
  })
}

const handleSubmit =(e)=>{
  e.preventDefault()
  console.log(Value)
}

  return (
    <>
    <DialogBox/>
      <Stack sx={{ flexWrap: "nowrap", flexDirection: "row" }}>
        <HamburgerMenu />

        <Box sx={{flexGrow:1}}>
          <MyHeader>New Agreement</MyHeader>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              py: 5,
              backgroundColor: "white",
              mx: 3,
              borderRadius: "15px",
              maxWidth:"1050px"
            }}
          >
              <Grid container sx={{px:3 }} spacing={4}>
                <TextFieldWrapper
                  label="Code"
                  placeHolder=""
                  backgroundColor="rgba(3, 193, 243, 0.2);"
                  value="NA000001"
                />
                <TextFieldWrapper
                  label="Name Of Lesse"
                  placeHolder="Enter Name Of Lesse"
                  name='leeseName'
                  onChange={e=>handleChange(e)}
                />
                <TextFieldWrapper 
                label="State"
                placeHolder="Enter State"
                name='state'
                onChange={e=>handleChange(e)}
                 />

                <TextFieldWrapper 
                label="City" 
                placeHolder="Enter City"
                name='city'
                onChange={e=>handleChange(e)}
                />
                <TextFieldWrapper
                  label="Location"
                  placeHolder="Enter Location"
                  name='location'
                onChange={e=>handleChange(e)}
                />
                <TextFieldWrapper 
                label="Pincode" 
                placeHolder="Enter Pincode" 
                name='pincode'
                onChange={e=>handleChange(e)}
                />
                <TextFieldWrapper 
                label="Address" 
                placeHolder="Enter Address"
                name='address'
                onChange={e=>handleChange(e)}
                />
                <TextFieldWrapper
                  label="Aadhar Number"
                  placeHolder="Enter Aadhar No."
                  name='aadharNo'
                onChange={e=>handleChange(e)}
                />
                <TextFieldWrapper
                  label="Pan Number"
                  placeHolder="Enter Pan No."
                  name='panNo'
                onChange={e=>handleChange(e)}
                />

                <TextFieldWrapper
                  label="GST Number"
                  placeHolder="Enter GST No."
                  name='gstNo'
                onChange={e=>handleChange(e)}
                />
                <TextFieldWrapper
                  label="Mobile Number"
                  placeHolder="Enter Mobile No."
                  name='mobileNo'
                onChange={e=>handleChange(e)}
                />
                <TextFieldWrapper
                  label="Alternate Number"
                  placeHolder="Enter Alternate No."
                  name='alternateMobile'
                onChange={e=>handleChange(e)}
                />

                <TextFieldWrapper 
                label="Email" 
                placeHolder="Enter Email" 
                name='email'
                onChange={e=>handleChange(e)}
                />
                <TextFieldWrapper
                  label='Lock In Year(If Applicable)'
                  placeHolder="Enter Lock in Year"
                  name='lockInYear'
                onChange={e=>handleChange(e)}
                />
                <TextFieldWrapper
                  label="Notice Period In Month"
                  placeHolder="Enter Notice Period"
                  name='noticePeriod'
                onChange={e=>handleChange(e)}
                />
                <TextFieldWrapper
                  label="Deposite Amount"
                  placeHolder="Enter Deposite Amount"
                  name='diposite'
                onChange={e=>handleChange(e)}
                />
                <TextFieldWrapper
                  label="Monthaly Rental"
                  placeHolder="Enter Rental"
                  name='monthalyRent'
                onChange={e=>handleChange(e)}
                />
                <SelectComponent
                  label="Yearly Increment"
                  placeHolder="Select Increment Type"
                  name='yearlyIncrement'
                  value={Value.yearlyIncrement}
                onChange={e=>handleChange(e)}
                />
              </Grid>
   
           {/* Increment Yearly */}
          <YearlyIncrement value={Value.yearlyIncrement}/>

          {/* Bank Details */}
            <Typography
              variant="body1"
              color="#03C1F3"
              fontSize="25px"
              lineHeight="28px"
              fontWeight="600"
              my="20px"
            >
              Bank Detail
            </Typography>
              <Grid container sx={{px:3}} spacing={2}>
                <TextFieldWrapper
                  label="Bank Name"
                  placeHolder="Enter Bank Name"
                  name='bankName'
                onChange={e=>handleChange(e)}
                />
                <TextFieldWrapper
                  label="Benificiary Name"
                  placeHolder="Enter Benificiary Name"
                  name='benificiaryName'
                onChange={e=>handleChange(e)}
                />
                <TextFieldWrapper
                  label="Bank A/C Number "
                  placeHolder="Enter Account No."
                  name='accountNo'
                onChange={e=>handleChange(e)}
                />
                <TextFieldWrapper
                  label="Bank IFSC Code"
                  placeHolder="Enter IFSC Code"
                  name='ifscCode'
                onChange={e=>handleChange(e)}
                />
              </Grid>

            {/* Document */}
            <Typography
              variant="body1"
              color="#03C1F3"
              fontSize="25px"
              lineHeight="28px"
              fontWeight="600"
              my="20px"
            >
              Upload Document
            </Typography>
          
              <Grid
                container
                spacing={4}
                sx={{ px:1, justifyContent:"space-evenly"}}
              >
                <DocumentUpload label="Upload Aadhar Card" />
                <DocumentUpload
                  label="Upload GST Certificate"
                  placeHolder="Upload GST Certificate"
                />
                <DocumentUpload label="Upload Pan Card" />
                <DocumentUpload
                  label="Upload Draft Agreement"
                  placeHolder="Upload Draft Agreement"
                />
                <DocumentUpload label="Upload Electricity Bill" />
                <DocumentUpload
                  label="Upload POA(If Applicable)"
                  placeHolder="Upload POA"
                />
                <DocumentUpload label="Upload Maintaince Bill" />
                <DocumentUpload
                  label="Upload Cencel Bank Cheque"
                  placeHolder="Upload Cencel Bank Cheque"
                />
                <DocumentUpload label="Upload Property Tax Receipt" />
                <DocumentUpload
                  label="Upload Noc(If Mutiple Oweners)"
                  placeHolder="Upload GST Certificate"
                />
              </Grid>


            {/* Button */}
              <Grid
                container
                sx={{ justifyContent: "center" ,mt:2}}
                spacing={4}
              >
                <Grid item md={4} xs={8}>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{
                    height: "80px",
                    width: "100%",
                    borderRadius: "20px",
                    backgroundColor: "#03C1F3",
                    fontSize: "20px",
                    color: "#FFFFFF",
                    lineHeight: "32px",
                    textTransform: "capitalize",
                    '@media(max-width:900px)':{fontSize:"10px",lineHeight:"20px",height:"40px"}
                  }}
                >
                  Submit To Sr Manager
                </Button>
                </Grid>

                <Grid item md={4} xs={8}>
                <Button
                  variant="outlined"
                  sx={{
                    height: "80px",
                    width: "100%",
                    borderRadius: "20px",
                    fontSize: "20px",
                    color: "#03C1F3",
                    lineHeight: "32px",
                    textTransform: "capitalize",
                    '@media(max-width:900px)':{fontSize:"10px",lineHeight:"20px",height:"40px"}
                  }}
                >
                  Hold
                </Button>
                </Grid>
            </Grid>

          </Box>
        </Box>
      </Stack>
    </>
  );
}

export default Agreement;
