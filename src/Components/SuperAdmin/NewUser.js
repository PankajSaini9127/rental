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
import { useNavigate } from "react-router-dom";
import { MyHeader, TextFieldWrapper } from "../StyledComponent";

import {
  AddUser,
  GetSupervisor,
  getCityList,
  getStateList,
} from "../../Services/Services";
import AddUserCheckBox from "../StyleComponents/AddUserCheckBox";
import AdminHamburgerMenu from "../AdminPanel/AdminHamburgerMenu";

const initialState = {
  code: "",
  name: "",
  email: "",
  role: [],
  mobile: "",
  supervisor: "",
  city: "",
  state: "",
};

function SuperAdminNewUser() {
  const navigate = useNavigate();
  const [randomPassword, setRandomPassword] = useState("");
  const superVisor = [
    "Admin",
    "Finance",
    "BHU",
    "Operations",
    "Senior_Manager",
    "Manager",
  ];

  const [loading, setLoading] = useState(false);
  // Disable Role CheckBox Base On Condition
  const [disable, setDisable] = useState({});
  const [formData, setFormData] = useState(initialState);
  const [formError, setformError] = useState({});

  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);

  function validate(e) {
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
    }

    setformError(error);
  }

  function handleChange(e) {
    //     if(validate()){
    // console.log("aa")
    //     }else{
    //       console.log("bb")
    //     }
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

    console.log(formError);

    if (Object.keys(formError).length < 1) {
      if (role.length < 1) {
        setMsg({
          open: true,
          type: "error",
          message: "Please Select Role",
        });
      } else {
        apiCall(formData, randomPassword);
      }
    }
  };

  //distructring elements from values
  const { name, email, role, mobile, code, supervisor, city, state } =
    formData;

  // state for set supervisor value
  const [supervisorArray, setsupervisorArray] = useState([]);

  // Supervisor value
  async function getSupervisor(role) {
    let superVisor1 = [
      "Finance",
      "Operations",
      "BHU",
      "Senior_Manager",
      "Manager",
      "Role",
    ];

    var finalQuerry = [];
    if (role.includes("Manager")) {
      finalQuerry = ["Senior_Manager"];
    } else if (role.includes("Senior_Manager")) {
      finalQuerry = ["BHU"];
    } else if (role.includes("BHU")) {
      finalQuerry = ["Operations"];
    } else if (role.includes("Operations")) {
      finalQuerry = ["Finance"];
    } else if (role.includes("Finance")) {
      finalQuerry = ["Role"];
    }
    superVisor1 = superVisor1.filter((row) => {
      return finalQuerry.includes(row);
    });

    const supervisor = await GetSupervisor(superVisor1);
    setsupervisorArray(supervisor.data);
  }

  // Role Check Box Disable Manage
  function manageRole(role) {
    console.log(role);
    let setVal = {};
    if (!role.includes("Admin") && role.length > 0) {
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
    } else if (role.length < 2) {
      superVisor.map((row) => (setVal = { ...setVal, [row]: false }));
      setDisable(setVal);
    } else if (role.includes("Admin") && role.length === 2) {
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

  const [msg, setMsg] = useState({
    open: false,
    type: "",
    message: "",
  });

  const { open, type, message } = msg;

  // For save data in DB
  const apiCall = async (values, randomPassword) => {
    values = { ...values, password: randomPassword };
    setLoading(true);
    const result = await AddUser(values);
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
    setLoading(false);
  };

  // on Alert close
  const handleClose = () => {
    if (msg.type === "success") {
      navigate("/super-admin-listing");
    }
    setMsg({
      open: false,
      type: "",
      message: "",
    });
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

  return (
    <>
      <Stack sx={{ flexWrap: "nowrap", flexDirection: "row" }}>
        <AdminHamburgerMenu
          navigateListing={"/super-admin-listing"}
          navigateHome={"/super-admin-dashboard"}
        />

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
                    onChange={(e) => {
                      validate(e);
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
                    onChange={handleChange}
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
                        // required={true}
                        value={city || ""}
                        onChange={handleChange}
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
                        disabled={role[0] === "Admin" ? true : false}
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
                        height: "40px",
                        width: "100%",
                        borderRadius: "20px",
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

export default SuperAdminNewUser;
