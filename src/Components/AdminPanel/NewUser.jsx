import { Alert, Autocomplete, Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, Snackbar, Stack, TextField } from "@mui/material";

import React, { startTransition, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MyHeader,
  SelectComponent,
  TextFieldWrapper,
} from "../StyledComponent";

import AdminHamburgerMenu from "./AdminHamburgerMenu";
import { AddUser, GetSupervisor, GetSupervisorSRM, getCityList, getStateList, get_emp_code } from "../../Services/Services";
import AddUserCheckBox from "../StyleComponents/AddUserCheckBox";
import HamburgerMenu from "../HamburgerMenu";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../../store/action/action";

const initialState = {
  code: "",
  name: "",
  email: "",
  role: [],
  mobile: "",
  supervisor: "",
  state:"",
  city:""
};

function NewUser() {
  const navigate = useNavigate();
  const [randomPassword, setRandomPassword] = useState("");

  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([])


const dispatch = useDispatch()



  const superVisor = [
    "Admin",
    "Finance",
    "BUH",
    "Operations",
    "Senior_Manager",
    "Manager",
  ];

  const [loading, setLoading] = useState(false);
  // Disable Role CheckBox Base On Condition
  const [disable, setDisable] = useState({});
  const [formData, setFormData] = useState(initialState);
  const [formError, setformError] = useState({});

  function validate(e) {
   const error = {};
   if(e.target.value < 1 && e.target.name === "code"){
    error.code = "Emp.code Required!"
  }else
    if (
      e.target.value.length !== 0 &&
      e.target.value.length < 4 &&
      e.target.name === "name"
    ) {
      error.name = "Name must be of 4 character.";
    }else if(!e.target.value.match(  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) && e.target.value.length > 0 && e.target.name === "email")
    {
      
      error.email = "Please Enter Valid Email !!"
    } else if (
      e.target.value.length !== 0 &&
      e.target.value.length < 10 &&
      e.target.name === "mobile"
    ) {
      error.mobile = "Mobile Number Not Valid.";
    }
    setformError(error);
  }

  function handleChange(e) {
    if (e.target.name === "role") {
      setFormData((old) => ({
        ...old,
        role: old.role.includes(e.target.value)
          ? old.role.filter((row) => row !== e.target.value)
          : [...old.role, e.target.value],
      }));
    } else if (e.target.name === "name") {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    } else if (e.target.name == "mobile") {
      const re = /^[0-9\b]+$/;
      if (e.target.value === "" || re.test(e.target.value)) {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      }
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formError)
   
    if (Object.keys(formError).length < 1) {
      if (role.length < 1) {
        dispatch(setAlert({
          open: true,
          variant: "error",
          message: "Please Select Role",
        }))
      } else {
        apiCall(formData, randomPassword);
      }
    }
  };

  //distructring elements from values
  const {code, name, email, role, mobile, supervisor,state,city } = formData;

  // state for set supervisor value
  const [supervisorArray, setsupervisorArray] = useState([]);

  // Supervisor value
  async function getSupervisor(role) {
    let superVisor1 = [
      "Finance",
      "Operations",
      "BUH",
      "Senior_Manager",
      "Manager",
      "Role",
    ];

    var finalQuerry = [];
    if (role.includes("Manager")) {
      finalQuerry = ["Senior_Manager"];
    } else if (role.includes("Senior_Manager")) {
      finalQuerry = ["BUH"];
    } else if (role.includes("BUH")) {
      finalQuerry = ["Operations"];
    } else if (role.includes("Operations")) {
      finalQuerry = ["Finance"];
    } else if (role.includes("Finance")) {
      finalQuerry = ["Role"];
    }
    superVisor1 = superVisor1.filter((row) => {
      return finalQuerry.includes(row);
    });

    console.log(role)
    if(role.includes("Manager")){
      const supervisor = await GetSupervisor({role:superVisor1,state,city});
      setsupervisorArray(supervisor.data);
    }else if(role.includes("Senior_Manager") ||  role.includes("Operations")
    || role.includes("BUH") ){
      console.log("first")
      const supervisor = await GetSupervisorSRM(superVisor1);
      setsupervisorArray(supervisor.data);
    }
    
  }

  // Role Check Box Disable Manage
  function manageRole(role) {
    console.log(role);
    let setVal = {};
    if (role.includes("Manager") || role.includes("Operations") && role.length > 0) {
      superVisor.map(
        (row) =>
          (setVal = {
            ...setVal,
            [row]: true,
            Admin: false,
            [role[0] === "Senior Manager" ? "Senior_Manager" : role[0]]: false,
          })
      );
      setDisable(setVal);
    }else if(role.includes('Admin') && role.length === 1){
      superVisor.map((row)=>(
        setVal={
          ...setVal,
          [row]:true,
          Operations:false,
          Manager:false
        }
      ));
      setDisable(setVal);
    }else if(role.includes("Senior_Manager")){
      superVisor.map((row)=>(
        setVal={
          ...setVal,
          [row]:true,
          Senior_Manager:false
        }
      ));
      setDisable(setVal);
    }
    else if(role.includes("Finance")){
      superVisor.map((row)=>(
        setVal={
          ...setVal,
          [row]:true,
          Finance:false
        }
      ));
      setDisable(setVal);
    }
    else if(role.includes("BUH")){
      superVisor.map((row)=>(
        setVal={
          ...setVal,
          [row]:true,
          BUH:false
        }
      ));
      setDisable(setVal);
    }
     else if (role.length < 2) {
      superVisor.map((row) => (setVal = { ...setVal, [row]: false }));
      setDisable(setVal);
    }
     else if (role.includes("Admin") && role.length === 2) {
      superVisor.map(
        (row) =>
          (setVal = {
            ...setVal,
            [row]: true,
            Admin: false,
            [role[1] === "Senior Manager" ? "Senior_Manager" : role[1]]: false,
          })
      );
      setDisable(setVal);
    }
  }

  const passwordGenerate = () => {
    var length = 6,
      charset =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      random = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
      random += charset.charAt(Math.floor(Math.random() * n));
      setRandomPassword(random);
    }
  };

  useEffect(() => {
    passwordGenerate();
  }, []);

  useEffect(() => {
    manageRole(role);
    getSupervisor(role);
    // auth_flag(role)
  }, [role]);


  // For save data in DB
  const apiCall = async (values, randomPassword) => {
    values = { ...values, password: randomPassword };
    setLoading(true);
    const result = await AddUser(values);
    // console.log(result)
    if (result.status === 201) {
      dispatch(setAlert({
        open: true,
        variant: "success",
        message: result.data.message,
      }))
     navigate('/userManagement')
    }else {
      dispatch(setAlert({
        open: true,
        variant: "error",
        message: "Something Went Wrong ! Please Try Again Later.",
      }))
    }
    setLoading(false);
  };



   // funciton for fetching state list
   async function handleStateSearch(e, i) {
    let response = await getStateList(e.target.value);

    if (response.status === 200) {
      setStateList(response.data);
    } else setStateList([]);
  }

  useEffect(() => {
    handleCitySearch();
  }, [state]);

  // funciton for fetching state list
  async function handleCitySearch() {
    // console.log(i);
    console.log(state);
    let search = stateList.filter((row) => row.name === state && row.id);

    // console.log(search);
    let response = await getCityList(search[0].id);
    // console.log(response)

    if (response.status === 200) {
      // console.log(city)
      setCityList(response.data);
    } else setCityList([]);
  }

  const {auth} = useSelector(s=>s)
  return (
    <>
      <Stack sx={{ flexWrap: "nowrap", flexDirection: "row" }}>
      <HamburgerMenu
          navigateHome={
            auth.role.includes("Manager")
              ? "dashboard"
              : auth.role.includes("Operations")
              ? "operationsDashboard"
              : auth.role.includes("BUH")
              ? "BHUdashboard"
              : auth.role.includes("Admin") ? "userDashboard":""
          }
          handleListing={() =>
            navigate(
              auth.role.includes("Manager")
                ? "/listing"
                : auth.role.includes("Operations")
                ? "/operationsListing"
                : auth.role.includes("BUH")
                ? "/BHUListing"
                : ""
            )
          }
        />
        <Box sx={{ flexGrow: 1 }}>
          <MyHeader>New User</MyHeader>

          <Grid container sx={{ justifyContent: "center" }}>
            <Grid item>
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
                    value={code}
                    onChange={handleChange}
                    error={formError.code}
                    onBlur={(e)=>validate(e)}
                  />
                  <TextFieldWrapper
                    label="Full Name"
                    placeHolder="Full Name"
                    value={name}
                    name="name"
                    onBlur={(e)=>validate(e)}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    required={true}
                    error={formError.name}
                    //onBlur={validate}
                  />
                  <TextFieldWrapper
                    label="Email"
                    placeHolder="Email"
                    value={email}
                    name="email"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    onBlur={(e)=>validate(e)}
                    required={true}
                    type={"email"}
                    error={formError.email}
                  />
                  <TextFieldWrapper
                    label="Mobile Number"
                    placeHolder="Mobile Number"
                    value={mobile}
                    name="mobile"
                    required={true}
                    error={formError.mobile}
                    maxLength={10}
                    onBlur={(e)=>validate(e)}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                  <Grid
                    item
                    md={4}
                    xs={6}
                    sx={{
                      mb: "0px !important",
                      "@media(max-width:900px)": { my: 1 },
                    }}
                  >
                    <FormControl fullWidth className="textFieldWrapper">
                      <Autocomplete
                        freeSolo
                        fullWidth
                        id="free-solo-2-demo"
                        disableClearable
                        onChange={(e, val) => {
                          setFormData((old) => ({ ...old, state: val }));
                        }}
                        options={stateList.map((option) => option.name)}
                        renderInput={(params) => (
                          <TextField
                            fullWidth
                            name="state"
                            value={state}
                            {...params}
                            label="State"
                            required
                            onBlur={(e)=>validate(e)}
                            onChange={(e) => {
                              handleStateSearch(e);
                            }}
                            InputProps={{
                              ...params.InputProps,
                              type: "search",
                            }}
                          />
                        )}
                      />
                    </FormControl>
                  </Grid>

                  <Grid
                    item
                    md={4}
                    xs={6}
                    sx={{
                      mb: "0px !important",
                      "@media(max-width:900px)": { my: 1 },
                    }}
                  >
                    <FormControl fullWidth className="textFieldWrapper">
                      <TextField
                        label="City"
                        placeHolder="Enter City"
                        select
                        fullWidth
                        name="city"
                        // required={true}
                        value={city || ""}
                        onChange={handleChange}
                        required
                      >
                        {cityList &&
                          cityList.map((item) => {
                            return (
                              <MenuItem value={item.city}>{item.city}</MenuItem>
                            );
                          })}
                      </TextField>
                    </FormControl>
                  </Grid>
                  <AddUserCheckBox
                    handleChange={handleChange}
                    disable={disable}
                    setDisable={setDisable}
                    required={true}
                    error={formError.name}
                    //onBlur={validate}
                  />

<Grid item md={4} xs={6} sx={{mb:'0px !important','@media(max-width:900px)':{my:1}}}>
      <FormControl fullWidth className="textFieldWrapper">
      <InputLabel id="demo-simple-select-label">{"Supervisor"}</InputLabel>
        <Select
          name={"supervisor"}
          onChange={(e) => handleChange(e)}
          variant="outlined"
          labelId="demo-simple-select-label"
          value={supervisor}
          label={"Supervisor"}
          sx={{
            mt: "0px !important",
            color: "rgba(16, 99, 173, 0.47)",
            width: "100%",
            height:'50px !important',
            boxShadow: "none",
            
          }}
        >
          {
            supervisorArray.map((item,i)=>{
              return <MenuItem value={item.id} key={item.id} >{item.name}</MenuItem>
            })
          }
        </Select>
      </FormControl>
    </Grid>

                </Grid>
                <Grid container sx={{ justifyContent: "space-evenly", mt: 3 }}>
                  <Grid item sm={3.0}>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{
                        height: "65px",
                        width: "100%",
                        borderRadius: "9px",
                        fontSize: "16px",
                        color: "#FFFFFF",
                        lineHeight: "32px",
                        textTransform: "capitalize",
                      }}
                      type="submit"
                      disabled={loading ? true : false}
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
