
import { Alert, Box, Button, Grid,  Select,  Snackbar,  Stack } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HamburgerMenu from "../HamburgerMenu";
import { MyHeader, SelectComponent, TextFieldWrapper } from "../StyledComponent";
import AdminHamburgerMenu from "./AdminHamburgerMenu";

import axios, {Axios} from 'axios'

const initialState ={
  code:"123456",
    fullName:"",
    email:"",
    password:"",
    role:"",
    mobileNo:"",
    supervisor:""
}

const Role = [
  "Manager",
  "Senior Manager",
  "BHU",
  "Operations",
  "Finance"
]

const Supervisor = [
  "Nilesh",
  "Yashwant",
  "Pankaj"
]



function NewUser() {

  const navigate =useNavigate()

    const [formVal, setFormVal]= useState(initialState)
    const [msg, setMsg]= useState({
      open:false,
      type:"",
      message:""
    })

    const {open,type,message} = msg;

    const {fullName,email,password,role,mobileNo,code,supervisor} = formVal;


    const apiCall = async()=>{
      const result = await axios.post('http://localhost:8080/api/admin/userRegistration',formVal)
      console.warn(result)
      if(result.status === 201){
        setMsg({
          open:true,
          type:'success',
          message:result.data.message
        })
      }
      if(result.status === 208){
        setMsg({
          open:true,
          type:"error",
          message:result.data.message
        })
      }

    }


    const handleClose = ()=>{
      if(msg.type === "success"){
        setFormVal(initialState)
      }
       setMsg({
        open:false,
        type:"",
        message:""
       })
    }

    const handleSubmit =(e)=>{
      e.preventDefault()
      // apiCall()
      // console.log(formVal)
    }

    

const handleChange = (e)=>{
     setFormVal({
      ...formVal,
      [e.target.name] : e.target.value
     })
}

  return (
    <>
      <Stack sx={{ flexWrap: "nowrap", flexDirection: "row" }}>
        <AdminHamburgerMenu/>

        <Box sx={{flexGrow:1}}>

        <MyHeader>New User</MyHeader>

        <Grid container sx={{ justifyContent: "center" }}>
          <Grid item >

          {
            open? 
            <Snackbar open={open} anchorOrigin={{ vertical:"top", horizontal:'center' }} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
              {message}
            </Alert>
                    </Snackbar>
                    :
                    ''
          }
         

        <Box
          component="form"
          sx={{
            py: 5,
            backgroundColor: "white",
            mx: 3,
            borderRadius: "15px",
            maxWidth: "1050px",
          }}
          onSubmit={handleSubmit}
        >
          <Grid
            container
            sx={{ px: 3}}
            spacing={4}
          >
            <TextFieldWrapper
              label="Code"
              placeHolder=""
              value={code}
              onChange={handleChange}
            />
            <TextFieldWrapper
              label="Full Name"
              placeHolder="Full Name"
              value={fullName}
              name='fullName'
              onChange={handleChange}
            />
            <TextFieldWrapper
              label="Email"
              placeHolder="Email"
              value={email}
              name='email'
              onChange={handleChange}
            />
            <TextFieldWrapper
              label="Mobile Number"
              placeHolder="Mobile Number"
              value={mobileNo}
              name='mobileNo'
              onChange={handleChange}
            />
            <TextFieldWrapper
              label="Password"
              name='password'
              placeHolder="Password"
              value={password}
              onChange={handleChange}
            />

   <SelectComponent value={role} name='role' label={'Role'} options={Role} onChange={handleChange}/>
   <SelectComponent value={supervisor} name='supervisor' label={'Supervisor'} options={Supervisor} onChange={handleChange}/>


          


          </Grid>
          <Grid container sx={{justifyContent:"space-evenly",mt:3}}>
          <Grid item sm={3.0}>
            <Button variant="contained" color='primary' sx={{
               height: "40px",
               width: "100%",
               borderRadius: "20px",
               fontSize: "16px",
               color: "#FFFFFF",
               lineHeight: "32px",
               textTransform: "capitalize",
            }}
             type={'submit'}
            >Submit</Button>
          </Grid>
          </Grid>
        </Box>
        
        </Grid>
        </Grid>


        </Box>
      </Stack>
    </>
  );
}

export default NewUser;
