
import { Alert, Box, Button, Grid,  Snackbar,  Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MyHeader, SelectComponent, TextFieldWrapper } from "../StyledComponent";
import AdminHamburgerMenu from "./AdminHamburgerMenu";
import AdminCheckBox from "../StyleComponents/AdminCheckBox";
import { EditUserInfo, GetSupervisor, get_user } from "../../Services/Services";

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
    

    const [disable, setDisable] = useState({manager:false,srManager:false,admin:false,bhu:false,finance:false})
    
const [supervisorArray, setsupervisorArray] = useState([])

    const [msg, setMsg]= useState({
      open:false,
      type:"",
      message:""
    })


    async function getSupervisor (role){
      const supervisor = await GetSupervisor(role)
      setsupervisorArray(supervisor.data.map((item)=>item.name))
    }

// Role Check Box Disable Manage  
function manageRole(role) {
  console.log(role)
  if(role.includes("Admin") && role.length == 1){
    setDisable({
      srManager:false,
        manager:false,
        bhu:false,
        operations:false,
        finance:false,
        admin:false
    })
  }
  if(role.includes("Admin") && role.includes("Senior Manager") && role.length == 2){
    setDisable({
      srManager:false,
        manager:true,
        bhu:true,
        operations:true,
        finance:true,
        admin:false
    })
  }
  if(role.includes("Admin") && role.includes("Manager") && role.length == 2){
    setDisable({
      srManager:true,
        manager:false,
        bhu:true,
        operations:true,
        finance:true,
        admin:false
    })
  }  
  if(role.includes("Admin") && role.includes("Operations") && role.length == 2){
    setDisable({
      srManager:true,
        manager:true,
        bhu:true,
        operations:false,
        finance:true,
        admin:false
    })
  } 
  if(role.includes("Admin") && role.includes("Finance") && role.length == 2){
    setDisable({
      srManager:true,
        manager:true,
        bhu:true,
        operations:true,
        finance:false,
        admin:false
    })
  }
  if(role.includes("Admin") && role.includes("BHU") && role.length == 2){
    setDisable({
      srManager:true,
        manager:true,
        bhu:false,
        operations:true,
        finance:true,
        admin:false
    })
  }
  if(role.includes("Senior Manager") && role.length == 1){
    setDisable({
      srManager:false,
        manager:true,
        bhu:true,
        operations:true,
        finance:true,
        admin:false
    })
  }
  if(role.includes("Manager") && role.length == 1){
    setDisable({
      srManager:true,
        manager:false,
        bhu:true,
        operations:true,
        finance:true,
        admin:false
    })
  }
  if(role.includes("Operations") && role.length == 1){
    setDisable({
      srManager:true,
        manager:true,
        bhu:true,
        operations:false,
        finance:true,
        admin:false
    })
  }
  if(role.includes("BHU") && role.length == 1){
    setDisable({
      srManager:true,
        manager:true,
        bhu:false,
        operations:true,
        finance:true,
        admin:false
    })
  }
  if(role.includes("Finance") && role.length == 1){
    setDisable({
      srManager:true,
        manager:true,
        bhu:true,
        operations:true,
        finance:false,
        admin:false
    })
  }
  if(role.length == 0){
    setDisable({
      srManager:false,
        manager:false,
        bhu:false,
        operations:false,
        finance:false,
        admin:false
    })
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

const updateData = async(id,formVal)=>{
  const data = await EditUserInfo(id,formVal)
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
      updateData(id,formVal)
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
