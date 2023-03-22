
import { Alert, Box, Button, Grid,  Select,  Snackbar,  Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MyHeader, PasswordField, SelectComponent, TextFieldWrapper } from "../StyledComponent";
import AdminHamburgerMenu from "./AdminHamburgerMenu";

import axios, {Axios} from 'axios'
import AdminCheckBox from "../StyleComponents/AdminCheckBox";

const initialState ={
  code:"123456",
    name:"",
    email:"",
    password:"",
    role:[],
    mobile:"",
    supervisor:""
}

const Supervisor = [
  "Nilesh",
  "Yashwant",
  "Pankaj"
]



function EditUser() {
  const navigate =useNavigate()
  const { id } = useParams();
    const [formVal, setFormVal]= useState(initialState)


    const [disable, setDisable] = useState({manager:false,srManager:false})
    
const [supervisorArray, setsupervisorArray] = useState([])

    const [msg, setMsg]= useState({
      open:false,
      type:"",
      message:""
    })


    async function getSupervisor (role){
      const supervisor = await axios.post('http://localhost:8080/api/admin/selectRole',role)
      setsupervisorArray(supervisor.data.map((item)=>item.name))
    }

    function manageRole (role){
      if(role[0] === "Manager"){
        setDisable({
          ...disable,
          manager:true
        })
      }else{
        setDisable({
          manager:false,
          srManager:false
        })
      }
    }

    
    const {name,email,password,role,mobile,code,supervisor} = formVal;


    useEffect(()=>{
      manageRole(role)
      getSupervisor(role)
    },[role])

    const {open,type,message} = msg;


const getData = async()=>{
     const data = await axios.post(`http://localhost:8080/api/admin/user`
     ,{id})

     const {name,code,password,email,role,supervisor,mobile} = data.data[0];

     setFormVal({
      ...formVal,
      name,code,password,email,
      role:JSON.parse(role)
      ,supervisor,mobile

     })
}

const updateData = async()=>{
  const data = await axios.put(`http://localhost:8080/api/admin/edit/${id}`,formVal)
  if(data.data.success){
    setMsg({
      open:"true",
      type:"success",
      message:data.data.message
    })
  }
}

    const handleClose = ()=>{
      if(msg.type === "success"){
       navigate(-1)
      }
       setMsg({
        open:false,
        type:"",
        message:""
       })
    }


    const handleSubmit =(e)=>{
      e.preventDefault()
      updateData()
    }

    

const handleChange = (e)=>{
     setFormVal({
      ...formVal,
      [e.target.name] : e.target.value
     })
}

useEffect(()=>{
  getData()
},[])

  return (
    <>
      <Stack sx={{ flexWrap: "nowrap", flexDirection: "row" }}>
        <AdminHamburgerMenu/>

        <Box sx={{flexGrow:1}}>

        <MyHeader>Update User</MyHeader>

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
            sx={{ p: 3}}
            spacing={4}
          >
            <TextFieldWrapper
              label="Emp.Code"
              placeHolder=""
              value={code}
              onChange={handleChange}
            />
          </Grid>
          <Grid
            container
            sx={{ px: 3}}
            spacing={4}
          >
            
            <TextFieldWrapper
              label="Full Name"
              placeHolder="Full Name"
              value={name}
              name='name'
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
              value={mobile}
              name='mobile'
              onChange={handleChange}
            />
           

   {/* <SelectComponent 
   multiple={true}
   value={role} 
   name='role' 
   label={'Role'} 
   options={Role} 
   onChange={handleChange}
   /> */}

<AdminCheckBox handleChange={handleChange} disable={disable}/>

   <SelectComponent 
   value={supervisor} 
   name='supervisor' 
   label={'Supervisor'} 
   options={supervisorArray} 
   onChange={handleChange}
   />

   <PasswordField
              label="Password"
              name='password'
              placeHolder="Password"
              value={password}
              onChange={handleChange}
            />
          


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
            >
              Update
              </Button>
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

export default EditUser;
