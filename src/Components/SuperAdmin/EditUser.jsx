import {
  Alert,
  Autocomplete,
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Stack,
  TextField,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  MyHeader,
  SelectComponent,
  TextFieldWrapper,
} from "../StyledComponent";

import AdminCheckBox from "../StyleComponents/AdminCheckBox";
import { EditUserInfo, GetSupervisor, GetSupervisorSRM, getCityList, getStateList, get_user } from "../../Services/Services";

import { useDispatch } from "react-redux";
import { setAlert } from "../../store/action/action";
import AdminHamburgerMenu from "../AdminPanel/AdminHamburgerMenu";
const initialState = {
  code: "123456",
  name: "",
  email: "",
  role: [],
  mobile: "",
  supervisor: "",
  state: "",
  city: "",
};

function SuperAdminUserEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formVal, setFormVal] = useState(initialState);
  const dispatch = useDispatch();

  
  const [stateList,setStateList] = useState([])
  const [cityList,setCityList] = useState([])

  const [disable, setDisable] = useState({
    manager: false,
    srManager: false,
    admin: false,
    BUH: false,
    finance: false,
  });
  const superVisor = [
    "Admin",
    "Finance",
    "BUH",
    "Operations",
    "Senior_Manager",
    "Manager",
  ];

  const [supervisorArray, setsupervisorArray] = useState([]);

  const [msg, setMsg] = useState({
    open: false,
    type: "",
    message: "",
  });

  const [formError, setformError] = useState({});

  function validate(e) {
    const rejexEmail =  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const error = {};
    console.log(e.target.name, e.target.value);
    if (
      e.target.value.length !== 0 &&
      e.target.value.length < 4 &&
      e.target.name === "name"
    ) {
      error.name = "Name must be of 4 character.";
    } else if (
      e.target.value.length !== 0 &&
      e.target.value.length < 10 &&
      e.target.name === "mobile"
    ) {
      error.mobile = "Mobile Number Not Valid.";
    }else if( e.target.value.length !== 0 && 
      e.target.name === "email" &&
      (e.target.value.match(rejexEmail))?false :true
      ){
      error.email = "Please Enter Valid Email !!"
    }

    setformError((old) => ({ ...old, [e.target.name]: error[e.target.name] }));
  }

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
      finalQuerry = ["BUH"];
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
    }else if(role.includes("Senior_Manager") || role.includes("Operations")|| role.includes("BUH")){
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

  const { name, email, role, mobile, code, supervisor, city, state } =
    formVal;

  useEffect(() => {
    manageRole(role);
    getSupervisor(role);
  }, [role]);

  const { open, type, message } = msg;

  const getData = async (id) => {
    const data = await get_user(id);
    data.data[0].role = JSON.parse(data.data[0].role)
    setFormVal(data.data[0]);
  };

  const handleClose = () => {
    if (msg.type === "success") {
      navigate(-1);
    }
    setMsg({
      open: false,
      type: "",
      message: "",
    });
  };

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      if (role.length < 1) {
        setMsg({
          open: true,
          type: "error",
          message: "Please Select Role",
        });
      } else {
      const response = await EditUserInfo(id, {...formVal,modify:new Date().toISOString().slice(0, 10)});

      if (response.status === 200) {
        dispatch(
          setAlert({
            open: true,
            variant: "success",
            message: response.data.message,
          })
        );
        navigate('/super-admin-listing')
      } else {
        dispatch(
          setAlert({
            open: true,
            variant: "error",
            message: response.data.message,
          })
        );
      }
    }
    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = (e) => {
    if (e.target.type === "checkbox") {
      const { value, checked } = e.target;

      if (checked) {
        setFormVal({
          ...formVal,
          role: [...role, value],
        });
      } else {
        setFormVal({
          ...formVal,
          role: role.filter((e) => e !== value),
        });
      }
    } else {
      setFormVal({
        ...formVal,
        [e.target.name]: e.target.value,
      });
    }
  };

  useEffect(() => {
    getData(id);
  }, []);

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

  return (
    <>
      <Stack sx={{ flexWrap: "nowrap", flexDirection: "row" }}>
        <AdminHamburgerMenu
          navigateListing={"/super-admin-listing"}
          navigateHome={"/super-admin-dashboard"}
        />

        <Box sx={{ flexGrow: 1 }}>
          <MyHeader>Update User</MyHeader>

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
                    onChange={handleChange}
                    required={true}
                  />
                  <TextFieldWrapper
                    label="Full Name"
                    required={true}
                    placeHolder="Full Name"
                    value={name}
                    name="name"
                    error={formError.name}
                    onChange={(e) => {
                      validate(e);
                      handleChange(e);
                    }}
                  />
                  <TextFieldWrapper
                    label="Email"
                    placeHolder="Email"
                    value={email}
                    name="email"
                    onChange={handleChange}
                    required={true}
                    onChange={(e) => {
                      validate(e);
                      handleChange(e);
                    }}
                    error={formError.email}
                  />
                  <TextFieldWrapper
                    label="Mobile Number"
                    placeHolder="Mobile Number"
                    value={mobile}
                    name="mobile"
                    maxLength={10}
                    error={formError.mobile}
                    required={true}
                    onChange={(e) => {
                      validate(e);
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
                        value={state || formVal.state}
                        onChange={(e, val) => {
                          setFormVal((old) => ({ ...old, state: val }));
                        }}
                        options={stateList.map((option) => option.name)}
                        renderInput={(params) => (
                          <TextField
                            fullWidth
                            name="state"
                            value={state || formVal.state}
                            {...params}
                            label="State"
                            required
                            onChange={(e) => {
                              handleChange(e);
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
                        required
                        // required={true}
                        value={formVal.city || city}
                        onChange={handleChange}
                      >
                        {cityList &&
                          cityList.map((item) => {
                            return (
                              <MenuItem value={item.city}>{item.city}</MenuItem>
                            );
                          })}
                           <MenuItem value={formVal.city}>{formVal.city}</MenuItem>
                      </TextField>
                    </FormControl>
                  </Grid>

                  <AdminCheckBox
                    handleChange={handleChange}
                    disable={disable}
                    value={role}
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
                      <InputLabel id="demo-simple-select-label">
                        {"Supervisor"}
                      </InputLabel>
                      <Select
                        name={"supervisor"}
                        onChange={(e) => handleChange(e)}
                        variant="outlined"
                        labelId="demo-simple-select-label"
                        value={supervisor}
                        label={"Supervisor"}
                        disabled={role[0] === "Admin"? true : false}  
                        sx={{
                          mt: "0px !important",
                          color: "rgba(16, 99, 173, 0.47)",
                          width: "100%",
                          height: "50px !important",
                          boxShadow: "none",
                        }}
                      >
                        {supervisorArray.map((item, i) => {
                          return (
                            <MenuItem value={item.id} key={item.id}>
                              {item.name}
                            </MenuItem>
                          );
                        })}
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

export default SuperAdminUserEdit;
