import React, { useState } from "react";

import {
  Alert,
  Button,
  FormControl,
  Grid,
  TextField,
  Typography,
  Box,
  InputAdornment,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";

import Img from "../../assest/pic/login-form.png";
import logo from "../../assest/pic/logo1 1.png";
import { useNavigate } from "react-router-dom";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function LoginComponent({
  title,
  discription,
  subTitle,
  handleSubmit,
  err,
  formValue,
  handleChange,
}) {
  const { password, username, role } = formValue;

  const options = ["Admin", "Senior Manager", "Manager", "Operations"];

  const [showPassword, setShowPassword] = useState(false);

  const passwordToggle = () => setShowPassword((show) => !show);

  const naviagte = useNavigate();

  const resetPassword = () => {
    naviagte("/resetPassword");
  };

  return (
    <Grid container sx={{ height: "100vh" }}>
      <Grid
        item
        md={6}
        xs={12}
        sx={{
          height: "100%",
          background: `url(${Img})`,
          backgroundSize: "100% 100%",
          position: "relative",
          "@media(max-width:900px)": {
            height: "45vh !important",
          },
        }}
      >
        <Grid
          container
          sx={{ justifyContent: "center", alignItems: "center" }}
          className="loginOverlay"
        >
          <Grid item sx={{ justifyContent: "center" }}>
            <Box component="img" src={logo} height="180px" />
            <Typography
              variant="body1"
              color="white"
              textAlign="center"
              mt="-25px"
              sx={{}}
            >
              Rental Portal
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid
        item
        container
        md={6}
       xs={12}
        sx={{ justifyContent: "center", alignItems: "center" }}
      >
        <Grid item md={7} xs={11} sx={{ "@media(max-width:900px)": { mb: 2 } }}>
          <Typography
            variant="body1"
            fontSize="55px"
            lineHeight="80px"
            color="var(--main-color)"
            textAlign={"center"}
            sx={{ "@media(max-width:900px)": { textAlign: "center" } }}
          >
            {title}
          </Typography>
          <Typography
            variant="body1"
            fontSize="25px"
            lineHeight="30px"
            color="var(--main-color)"
            textAlign={"center"}
            sx={{ "@media(max-width:900px)": { textAlign: "center" } }}
          >
            {subTitle}
          </Typography>
          <Typography
            variant="body1"
            fontSize="16px"
            lineHeight="24px"
            color="#C8C8C8"
            sx={{
              "@media(max-width:900px)": {
                textAlign: "center",
              },
            }}
          >
            {discription}
          </Typography>

          <Box component="form" sx={{ mt: 2 }} onSubmit={handleSubmit}>
            {err.open ? <Alert severity={err.type}>{err.msg}</Alert> : ""}

            <Grid container sx={{ justifyContent: "center" }} spacing={2}>
              <Grid item xs={12}>
                <FormControl sx={{ my: 1 }} fullWidth className="LoginInput">
                  <TextField
                    variant="outlined"
                    placeholder="Enter Email Adress"
                    label="Email Address"
                    value={username}
                    name="username"
                    onChange={handleChange}
                    required
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth className="LoginInput">
                  <TextField
                    type={showPassword ? "text" : "password"}
                    variant="outlined"
                    placeholder="********"
                    label={"Password"}
                    value={password}
                    required
                    name="password"
                    onChange={handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end" onClick={passwordToggle}>
                          {!showPassword ? <Visibility /> : <VisibilityOff />}
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Role</InputLabel>
                  <Select
                    name={"role"}
                    onChange={handleChange}
                    variant="outlined"
                    labelId="demo-simple-select-label"
                    value={role}
                    required
                    label={"Role"}
                    sx={{
                      mt: "0px !important",
                      color: "rgba(16, 99, 173, 0.47)",
                      width: "100%",
                      height: "50px !important",
                      boxShadow: "none",
                    }}
                  >
                    {options.map((item, i) => {
                      return <MenuItem value={item}>{item}</MenuItem>;
                    })}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body">
                  Forgot Password ?{" "}
                  <Button
                    variant="text"
                    sx={{ textTransform: "capitalize" }}
                    onClick={resetPassword}
                  >
                    Reset Now
                  </Button>
                </Typography>
              </Grid>

              <Grid item sx={{ mt: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    height: "60px",
                    width: "160px",
                    background: "primary",
                    borderRadius: "20px",
                    fontSize: "25px",
                    lineHeight: "37px",
                    color: "white",
                    "@media(max-width:900px)": {
                      width: "150px",
                      height: "40px",
                    },
                  }}
                >
                  <Typography
                    variant="body1"
                    color="white"
                    lineHeight="37px"
                    fontSize="25px"
                    textTransform={"capitalize"}
                  >
                    Login
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default LoginComponent;
