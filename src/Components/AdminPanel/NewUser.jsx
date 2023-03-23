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
  PasswordField,
  SelectComponent,
  TextFieldWrapper,
} from "../StyledComponent";

import AdminHamburgerMenu from "./AdminHamburgerMenu";

import { useFormik } from "formik";
import { AddUserSchema } from "../ValidationSchema/Admin";
import AdminCheckBox from "../StyleComponents/AdminCheckBox";
import { AddUser, GetSupervisor } from "../../Services/Services";

const initialState = {
  code: "123456",
  name: "",
  email: "",
  password: "",
  role: [],
  mobile: "",
  supervisor: "",
};



function NewUser() {
  const navigate = useNavigate();

// Disable Role CheckBox Base On Condition
  const [disable, setDisable] = useState({ manager: false, srManager: false,admin:false,finance:false,bhu:false,operations:false });

 // form handling and validate
  const { values, handleChange, handleSubmit, handleBlur, errors, touched } =
    useFormik({
      initialValues: initialState,
      validationSchema: AddUserSchema,
      onSubmit: (values) => {
        apiCall(values);
      },
    });

  //distructring elements from values
  const { name, email, role, mobile, code, supervisor } = values;

// state for set supervisor value  
  const [supervisorArray, setsupervisorArray] = useState([]);

// Supervisor value  
  async function getSupervisor(role) {
    const supervisor = await GetSupervisor(role);
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
  }


  useEffect(() => {
    manageRole(role);
    getSupervisor(role);
  }, [role]);


 const [msg, setMsg] = useState({
    open: false,
    type: "",
    message: "",
  });

  const { open, type, message } = msg;

// For save data in DB   
 const apiCall = async (values) => {
    const result = await AddUser(values)
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
  };

// on Alert close
  const handleClose = () => {
    if (msg.type === "success") {
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
                    onBlur={handleBlur}
                    errMsg={errors.name}
                    touched={touched.name}
                  />
                  <TextFieldWrapper
                    label="Email"
                    placeHolder="Email"
                    value={email}
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errMsg={errors.email}
                    touched={touched.email}
                  />
                  <TextFieldWrapper
                    label="Mobile Number"
                    placeHolder="Mobile Number"
                    value={mobile}
                    name="mobile"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errMsg={errors.mobile}
                    touched={touched.mobile}
                  />
                  <AdminCheckBox
                    handleChange={handleChange}
                    disable={disable}
                  />

                  <SelectComponent
                    value={supervisor}
                    name="supervisor"
                    label={"Supervisor"}
                    options={supervisorArray}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errMsg={errors.supervisor}
                    touched={touched.supervisor}
                  />

                  {/* <PasswordField
                    label="Password"
                    name="password"
                    type={"password"}
                    placeHolder="Password"
                    value={password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errMsg={errors.password}
                    touched={touched.password}
                  />
                   */}
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
                      type={"submit"}
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
