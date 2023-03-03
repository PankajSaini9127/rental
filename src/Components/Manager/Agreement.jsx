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


// Components

import HamburgerMenu from "../HamburgerMenu";
import YearlyIncrement from "./IncrementType";
import DialogBox from "./DialogBox";
import { useNavigate } from "react-router-dom";


// form initial state

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
  deposite:"",
  monthalyRent:"",
  yearlyIncrement:"1",
  bankName:"",
  benificiaryName:"",
  accountNo:"",
  ifscCode:""

}


function Agreement() {
  const navigate = useNavigate()

  const [landblord, setLandblord] = useState('');

  const [arrlenght,setArrLength] = useState(1)

  useEffect(() => {
    if(landblord !== ''){
      setArrLength(landblord)
    }
  }, [landblord])
  

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'))

  // state management form

const [Value, setValue] = useState(initialState)



// on field state change
 const handleChange = (e)=>{
  setValue({
    ...Value,
    [e.target.name]:e.target.value
  })
}


// upload document
const handleChangeFile = (e)=>{
console.log(e.target.files)

}


// on form submit

const handleSubmit = (e)=>{
  e.preventDefault()
  navigate('/srManagerLogin')
}


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

              <Grid container sx={{px:3, justifyContent:"space-evenly" }} spacing={isSmall? 1 :4}>
                <TextFieldWrapper
                  label="Code"
                  placeHolder=""
                  backgroundColor="rgba(3, 193, 243, 0.2);"
                  value="NA000001"
                />

{
  Array.from({length:arrlenght},(_,i)=>{
    return (<>
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
    </>)
  })
}
        
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
                  name='deposite'
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

              {/* basic details end here */}
   
           {/* Increment Yearly */}
          <YearlyIncrement value={Value.yearlyIncrement}/>



          {/* Bank Details start here*/}
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
              

                {
                  Array.from({length:arrlenght},(_,i)=>{
                    return(<>
                    {arrlenght > 1?<Typography>Landblord Name</Typography>:''}
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
                                          </>)
                  })
                }
                

              {/* Bank Details ends here*/}

           
          

          {/* Document upload section start here */}

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


{
  Array.from({length:arrlenght},(_,i)=>{
    return(<>
    {arrlenght > 1?<Typography>Landblord Name</Typography>:''}
      <Grid
      container
      spacing={4}
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
}
              

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
