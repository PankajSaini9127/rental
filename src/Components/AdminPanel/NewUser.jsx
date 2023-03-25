import {
  Alert,
  Box,
  Button,
  Grid,
  Snackbar,
  Stack,
} from "@mui/material";
import React, { startTransition, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MyHeader,
  SelectComponent,
  TextFieldWrapper,
} from "../StyledComponent";

import AdminHamburgerMenu from "./AdminHamburgerMenu";
import { AddUser, GetSupervisor, get_emp_code } from "../../Services/Services";
import AddUserCheckBox from "../StyleComponents/AddUserCheckBox";

const initialState = {
  code: "",
  name: "",
  email: "",
  role: [],
  mobile: "",
  supervisor: ""
};



function NewUser() {
  const navigate = useNavigate();
  const [randomPassword, setRandomPassword] = useState("");


const [loading,setLoading] =useState(false)
// Disable Role CheckBox Base On Condition
const [disable, setDisable] = useState({})
const [formData, setFormData] = useState(initialState);
const [formError,setformError] = useState({});



 


function validate (e,role){
   const error = {};
   if(!name){
    error.name= "Required ! Please Enter User's Name."
   }else if(name.length < 4){
    error.name = "Name Atleast 4 Character."
   }
   if(!mobile){
    error.mobile = "Required ! Please Enter User's Mobile Number."
   } else if(mobile.length < 10){
    error.mobile = "Mobile Number Not Valid."
   }
   if(!email){
    error.email = "Required ! Please Enter User's Email Address."
   }


   setformError(error)
}  

  function handleChange (e){
   
    if(e.target.name === "role"){
    
      setFormData(old=>(
        {
          ...old,
          role : old.role.includes(e.target.value)? old.role.filter(row=>(row !== e.target.value)):[...old.role,e.target.value]
        }
      ))
    }else{
      setFormData({
        ...formData,
        [e.target.name]:e.target.value
      })
    }
    
  }

  console.log(role)

    const handleSubmit = (e)=>{
      e.preventDefault()
        if(Object.keys(formError).length < 1){
        
      if(role.length == 0){
        setMsg({
          open:true,
          type:'error',
          message:"Please Select Role"
        })
      }else{
          apiCall(formData,randomPassword)
        
      }
    }
    }

  //distructring elements from values
  const { name, email, role, mobile, code, supervisor } = formData;

// state for set supervisor value  
  const [supervisorArray, setsupervisorArray] = useState([]);

// Supervisor value  
  async function getSupervisor(role) {

    let superVisor1 = ['Finance','BHU','Operations','Senior Manager','Manager'];
    if(role == "Senior Manager"){
   role.push("Manager")
    }
    if(role == 'BHU'){
      role.push("Manager",'Senior Manager')
    }
    if(role == 'Operations'){
      role.push("Manager",'Senior Manager','BHU')
    }
    

    superVisor1 = superVisor1.filter(row=>!role.includes(row))

    const supervisor = await GetSupervisor(superVisor1);
    setsupervisorArray(supervisor.data.map((item) => item.name));
  }



// Role Check Box Disable Manage  
// function manageRole(role) {
//   console.log(role)
//   if(role.includes("Admin") && role.length == 1){
//     setDisable({
//       srManager:false,
//         manager:false,
//         bhu:false,
//         operations:false,
//         finance:false,
//         admin:false
//     })
//   }
//   if(role.includes("Admin") && role.includes("Senior Manager") && role.length == 2){
//     setDisable({
//       srManager:false,
//         manager:true,
//         bhu:true,
//         operations:true,
//         finance:true,
//         admin:false
//     })
//   }
//   if(role.includes("Admin") && role.includes("Manager") && role.length == 2){
//     setDisable({
//       srManager:true,
//         manager:false,
//         bhu:true,
//         operations:true,
//         finance:true,
//         admin:false
//     })
//   }  
//   if(role.includes("Admin") && role.includes("Operations") && role.length == 2){
//     setDisable({
//       srManager:true,
//         manager:true,
//         bhu:true,
//         operations:false,
//         finance:true,
//         admin:false
//     })
//   } 
//   if(role.includes("Admin") && role.includes("Finance") && role.length == 2){
//     setDisable({
//       srManager:true,
//         manager:true,
//         bhu:true,
//         operations:true,
//         finance:false,
//         admin:false
//     })
//   }
//   if(role.includes("Admin") && role.includes("BHU") && role.length == 2){
//     setDisable({
//       srManager:true,
//         manager:true,
//         bhu:false,
//         operations:true,
//         finance:true,
//         admin:false
//     })
//   }
//   if(role.includes("Senior Manager") && role.length == 1){
//     setDisable({
//       srManager:false,
//         manager:true,
//         bhu:true,
//         operations:true,
//         finance:true,
//         admin:false
//     })
//   }
//   if(role.includes("Manager") && role.length == 1){
//     setDisable({
//       srManager:true,
//         manager:false,
//         bhu:true,
//         operations:true,
//         finance:true,
//         admin:false
//     })
//   }
//   if(role.includes("Operations") && role.length == 1){
//     setDisable({
//       srManager:true,
//         manager:true,
//         bhu:true,
//         operations:false,
//         finance:true,
//         admin:false
//     })
//   }
//   if(role.includes("BHU") && role.length == 1){
//     setDisable({
//       srManager:true,
//         manager:true,
//         bhu:false,
//         operations:true,
//         finance:true,
//         admin:false
//     })
//   }
//   if(role.includes("Finance") && role.length == 1){
//     setDisable({
//       srManager:true,
//         manager:true,
//         bhu:true,
//         operations:true,
//         finance:false,
//         admin:false
//     })
//   }
//   if(role.length == 0){
//     setDisable({
//       srManager:false,
//         manager:false,
//         bhu:false,
//         operations:false,
//         finance:false,
//         admin:false
//     })
//   } 
// }



  const passwordGenerate = ()=>{
    var length = 6,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        random = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        random += charset.charAt(Math.floor(Math.random() * n));
        setRandomPassword(random)
    }
    
  }



useEffect(()=>{
  passwordGenerate()
},[])

  useEffect(() => {
    // manageRole(role);
    getSupervisor(role);
    // auth_flag(role)
  }, [role]);


 const [msg, setMsg] = useState({
    open: false,
    type: "",
    message: "",
  });

  const { open, type, message } = msg;

// For save data in DB   
 const apiCall = async (values,randomPassword) => {
  values = {...values, password:randomPassword}
  setLoading(true)
    const result = await AddUser(values)
    // console.log(result)
    if (result.status === 201) {
      setMsg({
        open: true,
        type: "success",
        message: result.data.message,
      });
    }
    if (result.status === 208) {
      setMsg({
        open: true,
        type: "error",
        message: result.data.message,
      });
    }
    setLoading(false)
  };

// on Alert close
  const handleClose = () => {
    if (msg.type === "success") {
       navigate('/userManagement')
    }
    setMsg({
      open: false,
      type: "",
      message: "",
    });
  };

  return (
    <>
      <Stack sx={{ flexWrap: "nowrap", flexDirection: "row" }}>
        <AdminHamburgerMenu />

        <Box sx={{ flexGrow: 1 }}>
          <MyHeader>New User</MyHeader>

          <Grid container sx={{ justifyContent: "center" }}>
            <Grid item>
              {open ? (
                <Snackbar
                  open={open}
                  anchorOrigin={{ vertical: "top", horizontal: "center" }}
                  autoHideDuration={6000}
                  onClose={handleClose}
                >
                  <Alert
                    onClose={handleClose}
                    severity={type}
                    sx={{ width: "100%" }}
                  >
                    {message}
                  </Alert>
                </Snackbar>
              ) : (
                ""
              )}

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
                <Grid container sx={{ p: 3 }} spacing={4}>
                  <TextFieldWrapper
                    label="Emp.Code"
                    placeHolder="Employee Code"
                    name="code"
                    required={true}
                    value={formError.code}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid container sx={{ px: 3 }} spacing={4}>
                  <TextFieldWrapper
                    label="Full Name"
                    placeHolder="Full Name"
                    value={name}
                    name="name"
                    onChange={handleChange}
                    required={true}
                    error={formError.name}
                    onBlur={validate}
                  />
                  <TextFieldWrapper
                    label="Email"
                    placeHolder="Email"
                    value={email}
                    name="email"
                    onChange={handleChange}
                    required={true}
                    onBlur={validate}
                    error={formError.email}
                  />
                  <TextFieldWrapper
                    label="Mobile Number"
                    placeHolder="Mobile Number"
                    value={mobile}
                    name="mobile"
                    onChange={handleChange}
                    required={true}
                    onBlur={validate}
                    error={formError.mobile}
                    maxLength={10}
                  />
                  <AddUserCheckBox
                    handleChange={handleChange}
                    disable={disable}
                    setDisable={setDisable}
                    required={true}
                    error={formError.name}
                    onBlur={validate}
                  />

                  <SelectComponent
                    value={supervisor}
                    name="supervisor"
                    label={"Supervisor"}
                    options={supervisorArray}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid container sx={{ justifyContent: "space-evenly", mt: 3 }}>
                  <Grid item sm={3.0}>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{
                        height: "40px",
                        width: "100%",
                        borderRadius: "20px",
                        fontSize: "16px",
                        color: "#FFFFFF",
                        lineHeight: "32px",
                        textTransform: "capitalize",
                      }}
                      type='submit'
                      disabled={loading?true:false}
                    >
                      Submit
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

export default NewUser;
