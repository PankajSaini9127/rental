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

const [formData, setFormData] = useState([])


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
} = formData;



// upload document
const handleChangeFile = (e)=>{
console.log(e.target.files)

}


//handle Change
function handleChange(e,i){
  if(formData[i]){
    setFormData(old=>(
      old.map((row,id)=>{
        if(i===id){
          return{
            ...row,
            [e.target.name]:e.target.value
          }
        }
        return row
      })
    ))
  }else{
    setFormData(old=>([
      ...old,
      {
        [e.target.name]:e.target.value
      }
    ]))
  }
}

// on form submit

const handleSubmit = (e)=>{
  e.preventDefault()
  console.log(formData)
  
}


const APICall = async(values)=>{
  const agreement = await axios.post('http://localhost:8080/api/newAgreement',values);
  console.log(agreement)
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

              <Grid container sx={{px:3 }} spacing={isSmall? 2 :4}>
                <TextFieldWrapper
                  label="Code"
                  placeHolder=""
                  backgroundColor="rgba(3, 193, 243, 0.2);"
                  value={code}
                  onChange={e=>(e)=>handleChange(e)}
                />

{
  Array.from({length:arrlenght},(_,i)=>{
    return (<>
       <TextFieldWrapper
                  label="Name Of Lesse"
                  placeHolder="Enter Name Of Lesse"
                  name='leeseName'
                  value={leeseName}
                  onChange={(e)=>handleChange(e,i)}
                />
                <TextFieldWrapper 
                label="State"
                placeHolder="Enter State"
                name='state'
                value={state}
                onChange={(e)=>handleChange(e,i)}
                index={i}
                 />

                <TextFieldWrapper 
                label="City" 
                placeHolder="Enter City"
                name='city'
                value={city}
                onChange={(e)=>handleChange(e,i)}
                index={i}
                />
                <TextFieldWrapper
                  label="Location"
                  placeHolder="Enter Location"
                  name='location'
                  value={location}
                  onChange={(e)=>handleChange(e,i)}
                  index={i}
                />
                <TextFieldWrapper 
                label="Pincode" 
                placeHolder="Enter Pincode" 
                name='pincode'
                value={pincode}
                onChange={(e)=>handleChange(e,i)}
                index={i}
                />
                <TextFieldWrapper 
                label="Address" 
                placeHolder="Enter Address"
                name='address'
                value={address}
                onChange={(e)=>handleChange(e,i)}
                index={i}
                />
                <TextFieldWrapper
                  label="Aadhar Number"
                  placeHolder="Enter Aadhar No."
                  name='aadharNo'
                  value={aadharNo}
                  onChange={(e)=>handleChange(e,i)}
                  index={i}
                />
                <TextFieldWrapper
                  label="Pan Number"
                  placeHolder="Enter Pan No."
                  name='panNo'
                  value={panNo}
                  onChange={(e)=>handleChange(e,i)}
                  index={i}
                />

                <TextFieldWrapper
                  label="GST Number"
                  placeHolder="Enter GST No."
                  name='gstNo'
                  value={gstNo}
                  onChange={(e)=>handleChange(e,i)}
                  index={i}
                />
                <TextFieldWrapper
                  label="Mobile Number"
                  placeHolder="Enter Mobile No."
                  name='mobileNo'
                  value={mobileNo}
                  onChange={(e)=>handleChange(e,i)}
                  index={i}
                />
                <TextFieldWrapper
                  label="Alternate Number"
                  placeHolder="Enter Alternate No."
                  name='alternateMobile'
                  value={alternateMobile}
                  onChange={(e)=>handleChange(e,i)}
                  index={i}
                />

                <TextFieldWrapper 
                label="Email" 
                placeHolder="Enter Email" 
                name='email'
                value={email}
                onChange={(e)=>handleChange(e,i)}
                index={i}
                  />
    </>)
  })
}
        
                <TextFieldWrapper
                  label='Lock In Year(If Applicable)'
                  placeHolder="Enter Lock in Year"
                  name='lockInYear'
                  value={lockInYear}
                  onChange={(e)=>handleChange(e)}
                            />
                <TextFieldWrapper
                  label="Notice Period In Month"
                  placeHolder="Enter Notice Period"
                  name='noticePeriod'
                  value={noticePeriod}
                  onChange={(e)=>handleChange(e)}
                                />
                <TextFieldWrapper
                  label="Deposite Amount"
                  placeHolder="Enter Deposite Amount"
                  name='deposite'
                  value={deposite}
                  onChange={(e)=>handleChange(e)}
                        />
                <TextFieldWrapper
                  label="Monthly Rental"
                  placeHolder="Enter Rental"
                  name='monthlyRent'
                  value={monthlyRent}
                  onChange={(e)=>handleChange(e)}
                              />
                <SelectComponent
                  label={'Yearly Increment'}
                  name='yearlyIncrement'
                  options={incrementType}
                  value={yearlyIncrement}
                  onChange={(e)=>handleChange(e)}
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
                  onChange={(e)=>handleChange(e,i)}
                        />
                <TextFieldWrapper
                  label="Benificiary Name"
                  placeHolder="Enter Benificiary Name"
                  name='benificiaryName'
                  value={benificiaryName}
                  onChange={(e)=>handleChange(e,i)}
                />
                <TextFieldWrapper
                  label="Bank A/C Number "
                  placeHolder="Enter Account No."
                  name='accountNo'
                  value={accountNo}
                  onChange={(e)=>handleChange(e,i)}
                          />
                <TextFieldWrapper
                  label="Bank IFSC Code"
                  placeHolder="Enter IFSC Code"
                  name='ifscCode'
                  value={ifscCode}
                  onChange={(e)=>handleChange(e,i)}
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
