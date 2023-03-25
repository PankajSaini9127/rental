
import { Alert, Box, Button, Grid,  Snackbar,  Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MyHeader, SelectComponent, TextFieldWrapper } from "../StyledComponent";
import AdminHamburgerMenu from "./AdminHamburgerMenu";
import AdminCheckBox from "../StyleComponents/AdminCheckBox";
import { EditUserInfo, GetSupervisor, get_user } from "../../Services/Services";

import { useDispatch } from "react-redux";
import {setAlert} from "../../store/action/action"
const initialState ={
  code:"123456",
    name:"",
    email:"",
    role:[],
    mobile:"",
    supervisor:""
}




function EditUser() {
  const navigate =useNavigate()
  const { id } = useParams();
    const [formVal, setFormVal]= useState(initialState)
    const dispatch = useDispatch();

    const [disable, setDisable] = useState({manager:false,srManager:false,admin:false,bhu:false,finance:false})
  const  superVisor = ['Admin','Finance','BHU','Operations','Senior_Manager','Manager'];
    
const [supervisorArray, setsupervisorArray] = useState([])

    const [msg, setMsg]= useState({
      open:false,
      type:"",
      message:""
    })


    async function getSupervisor (role){
      let superVisor1 = ['Finance','BHU','Operations','Senior Manager','Manager'];
 
      var finalQuerry = []
      if (role.includes("Manager")) {
        finalQuerry = ['Manager']
      }
      else if (role.includes("Senior Manager")) {
        finalQuerry = ['Manager','Senior Manager']
      } else if (role.includes("BHU")) {
        finalQuerry = ['Manager','Senior Manager']
      } else if (role.includes("Operations")) {
        finalQuerry = ["Manager", "Senior Manager", "BHU"];
      }
      

    superVisor1 = superVisor1.filter(row=>!finalQuerry.includes(row))

      const supervisor = await GetSupervisor(superVisor1)
      setsupervisorArray(supervisor.data.map((item)=>item.name))
    }

// Role Check Box Disable Manage  
function manageRole(role) {
  console.log(role)
  let setVal = {}
   if(!role.includes("Admin") && role.length > 0)
   {
    superVisor.map(row=>setVal = {...setVal,[row] : true, Admin : false, [role[0] === "Senior Manager" ? "Senior_Manager" : role[0]] : false })
    setDisable(setVal)
   }
   else if (role.length < 2)
   {
    superVisor.map(row=>setVal = {...setVal,[row] : false })
    setDisable(setVal)
   }
   else if (role.includes("Admin") && role.length === 2)
   {
    superVisor.map(row=>setVal = {...setVal,[row] : true, Admin : false,[role[1] === "Senior Manager" ? "Senior_Manager" : role[1]] : false  })
    setDisable(setVal)
   }
  }
    
    const {name,email,role,mobile,code,supervisor} = formVal;


    useEffect(()=>{
      manageRole(role)
      getSupervisor(role)
    },[role])

    const {open,type,message} = msg;


const getData = async(id)=>{
     const data = await get_user(id);

     const {name,code,password,email,role,supervisor,mobile} = data.data[0];


     setFormVal({
      ...formVal,
      name,code,password,email,
      role:JSON.parse(role)
      ,supervisor,mobile

     })
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


    async function handleSubmit (e){

      try {
        e.preventDefault()
        const response = await EditUserInfo(id,formVal)

        if(response.status === 200)
        { 
          dispatch(setAlert({
            open : true,
            variant : 'success',
            message : response.data.message 
          }))
        }
        else {
          dispatch(setAlert({
            open : true,
            variant : 'error',
            message : response.data.message 
          }))
        }
      } catch (error) {
        console.log(error)
      }

    }


    

const handleChange = (e)=>{
  if(e.target.type === 'checkbox'){
    const { value,checked} = e.target;

    if(checked){
      setFormVal({
        ...formVal,
       role: [...role,value]
      })
    }else{
      setFormVal({
        ...formVal,
        role:role.filter((e)=>e !== value)
      })
    }
    
  }else{
    setFormVal({
      ...formVal,
      [e.target.name] : e.target.value
     })
  }
     
}

useEffect(()=>{
  getData(id)
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

<AdminCheckBox handleChange={handleChange} disable={disable} value={role}/>

   <SelectComponent 
   value={supervisor} 
   name='supervisor' 
   label={'Supervisor'} 
   options={supervisorArray} 
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
