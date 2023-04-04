import { Alert, Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, Snackbar, Stack } from "@mui/material";

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  MyHeader,
  SelectComponent,
  TextFieldWrapper,
} from "../StyledComponent";
import AdminHamburgerMenu from "./AdminHamburgerMenu";
import AdminCheckBox from "../StyleComponents/AdminCheckBox";
import { EditUserInfo, GetSupervisor, get_user } from "../../Services/Services";

import { useDispatch } from "react-redux";
import { setAlert } from "../../store/action/action";
const initialState = {
  code: "123456",
  name: "",
  email: "",
  role: [],
  mobile: "",
  supervisor: "",
  state:"",
  city:""
};

function EditUser() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formVal, setFormVal] = useState(initialState);
  const dispatch = useDispatch();

  const [disable, setDisable] = useState({
    manager: false,
    srManager: false,
    admin: false,
    bhu: false,
    finance: false,
  });

  const superVisor = [
    "Admin",
    "Finance",
    "BHU",
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

    setformError((old) => ({ ...old, [e.target.name]: error[e.target.name] }));
  }

  async function getSupervisor(role) {
    let superVisor1 = [
      "Finance",
      "BHU",
      "Operations",
      "Senior Manager",
      "Manager",
    ];

    var finalQuerry = [];
    if (role.includes("Manager")) {
      finalQuerry = ["Senior Manager"];
    } else if (role.includes("Senior Manager")) {
      finalQuerry = ["BHU"];
    } else if (role.includes("BHU")) {
      finalQuerry = [ "Operations"];
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

  const { name, email, role, mobile, code, supervisor } = formVal;

  useEffect(() => {
    manageRole(role);
    getSupervisor(role);
  }, [role]);

  const { open, type, message } = msg;

  const getData = async (id) => {
    const data = await get_user(id);

    const { name, code, password, email, role, supervisor, mobile,state,city } =
      data.data[0];

    setFormVal({
      ...formVal,
      name,
      code,
      password,
      email,
      role: JSON.parse(role),
      supervisor,
      mobile,state,city
    });
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
      const response = await EditUserInfo(id, formVal);

      if (response.status === 200) {
        dispatch(
          setAlert({
            open: true,
            variant: "success",
            message: response.data.message,
          })
        );
      } else {
        dispatch(
          setAlert({
            open: true,
            variant: "error",
            message: response.data.message,
          })
        );
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

  return (
    <>
      <Stack sx={{ flexWrap: "nowrap", flexDirection: "row" }}>
      <AdminHamburgerMenu
        navigateListing={'/userManagement'}
        navigateHome={'/userDashboard'}
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
                  />
                </Grid>
                <Grid container sx={{ px: 3 }} spacing={4}>
                  <TextFieldWrapper
                    label="Full Name"
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
                  />
                  <TextFieldWrapper
                    label="Mobile Number"
                    placeHolder="Mobile Number"
                    value={mobile}
                    name="mobile"
                    maxLength={10}
                    error={formError.mobile}
                    onChange={(e) => {
                      validate(e);
                      handleChange(e);
                    }}
                  />

                  <AdminCheckBox
                    handleChange={handleChange}
                    disable={disable}
                    value={role}
              
                  />

                  {/* <SelectComponent
                    value={supervisor}
                    name="supervisor"
                    label={"Supervisor"}
                    options={supervisorArray}
                    onChange={handleChange}
                  /> */}

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
