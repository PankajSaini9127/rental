import {
  Alert,
  Box,
  Button,
  Grid,
  Snackbar,
  Stack,
} from "@mui/material";
import React, { useEffect, useState } from "react";
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
  code: "0",
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
  const [disable, setDisable] = useState({ manager: false, srManager: false,admin:false,finance:false,bhu:false,operations:false });

 // form handling and validate
  // const { values, handleChange, handleBlur, errors, touched } =
  //   useFormik({
  //     initialValues: initialState,
  //     validationSchema: AddUserSchema
  //   });


  const [formData, setFormData] = useState(initialState)
  // console.log(formData.role)

  const [formError,setformError] = useState({})
  // console.log(formError)


  const [isSubmit, setIsSubmit] = useState(false)

 


function validate (e){
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
          [e.target.name]: old.role.includes(e.target.value)? old.role.filter(row=>(row !== e.target.value)):[...old.role,e.target.value]
        }
      ))
    }else{
      setFormData({
        ...formData,
        [e.target.name]:e.target.value
      })
    }
    
  }

 async function emp_code_generator (){
  // console.log('function')
     let code = await get_emp_code()
     setFormData({
      ...formData,
      code:code.data.code
     })
  }


  useEffect(()=>{
     emp_code_generator()
  },[])

    const handleSubmit = (e)=>{
      e.preventDefault()
        if(Object.keys(formError).length < 1){
          setIsSubmit(true)
        }
      if(isSubmit){
        apiCall(formData,randomPassword)
      }
    }

  //distructring elements from values
  const { name, email, role, mobile, code, supervisor } = formData;

// state for set supervisor value  
  const [supervisorArray, setsupervisorArray] = useState([]);

// Supervisor value  
  async function getSupervisor(role) {

    let superVisor1 = ['Admin','Finance','BHU','Operatins','Senior Manager','Manager'];

    superVisor1 = superVisor1.filter(row=>!role.includes(row))

    const supervisor = await GetSupervisor(superVisor1);
    setsupervisorArray(supervisor.data.map((item) => item.name));
  }



// Role Check Box Disable Manage  
 function manageRole(role) {
    if (role.includes("Admin")) {
      setDisable({
        srManager:false,
        manager:false,
        bhu:false,
        operations:false,
        finance:false
      });
    }else 
    if(role.includes("Senior Manager")){
      setDisable({
        admin:false,
        bhu:true,
        manager:true,
        operations:true,
        finance:true
      })
    }else if(role.includes('Manager')){
      setDisable({
        admin:false,
        bhu:true,
        srManager:true,
        operations:true,
        finance:true
      })
    }else if(role.includes("Operations")){
      setDisable({
        admin:false,
        bhu:true,
        srManager:true,
        manager:true,
        finance:true
      })
    }else if(role.includes("Finance")){
      setDisable({
        admin:false,
        bhu:true,
        srManager:true,
        manager:true,
        operations:true
      })
    }else if(role.includes("BHU")){
      setDisable({
        admin:false,
        operations:true,
        srManager:true,
        manager:true,
        finance:true
      })
    }
    else{
      setDisable({
        admin:false,
        operations:false,
        srManager:false,
        manager:false,
        finance:false
      })
    }
  }


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
    manageRole(role);
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
                    placeHolder=""
                    value={code}
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
