
import { Box, Button, Grid,  Select,  Stack } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HamburgerMenu from "../HamburgerMenu";
import { MyHeader, SelectComponent, TextFieldWrapper } from "../StyledComponent";
import AdminHamburgerMenu from "./AdminHamburgerMenu";

const initialState ={
    name:"",
    email:"",
    password:"",
    role:"",
    mobile:""
}

const Role = [
  "Manager",
  "Senior Manager",
  "BHU",
  "Operations",
  "Finance"
]



function NewUser() {

  const navigate =useNavigate()

    const [formVal, setFormVal]= useState(initialState)
    const [SelectRole, setSelectRole]= useState("")

    const {name,email,password,role,mobile} = formVal;


    const handleAddUser =()=>{
      navigate('/userManagement')
    }

    const handleSelect =(e)=>{
      setSelectRole(e.target.value)
    }

  return (
    <>
      <Stack sx={{ flexWrap: "nowrap", flexDirection: "row" }}>
        <AdminHamburgerMenu/>

        <Box sx={{flexGrow:1}}>

        <MyHeader>New User</MyHeader>

        <Grid container sx={{ justifyContent: "center" }}>
          <Grid item >

        <Box
          component="form"
          sx={{
            py: 5,
            backgroundColor: "white",
            mx: 3,
            borderRadius: "15px",
            maxWidth: "1050px",
          }}
        >
          <Grid
            container
            sx={{ px: 3, justifyContent: "space-evenly" }}
            spacing={4}
          >
            <TextFieldWrapper
              label="Code"
              placeHolder=""
              value="NA000001"
            />
            <TextFieldWrapper
              label="Full Name"
              placeHolder="Full Name"
              value={name}
            />
            <TextFieldWrapper
              label="Email"
              placeHolder="Email"
              value={email}
            />
            <TextFieldWrapper
              label="Mobile Number"
              placeHolder="Mobile Number"
              value={mobile}
            />
            <TextFieldWrapper
              label="Password"
              placeHolder="Password"
              value={password}
            />

   <SelectComponent value={SelectRole} label={'Role'} options={Role} onChange={handleSelect}/>


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
            onClick={handleAddUser}
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
