import React from "react";

import {
  Alert,
  Button,
  FormControl,
  FormLabel,
  Grid,
  TextField,
  Typography,
  Box,
} from "@mui/material";

import Img from "../../assest/pic/login-form.png";
import logo from "../../assest/pic/logo1 1.png";
import { useNavigate } from "react-router-dom";
import { CustomTextField } from "../StyledComponent";

function LoginComponent({
  title,
  discription,
  subTitle,
  handleSubmit,
  err,
  formValue,
  handleChange,
}) {
  const { password, username } = formValue;

  const naviagte = useNavigate();

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
        sm={6}
        sx={{ justifyContent: "center", alignItems: "center" }}
      >
        <Button
          variant="contained"
          sx={{ color: "#FFFFFF", textTransform: "capitalize" }}
          onClick={() => naviagte("/srManagerLogin")}
        >
          Sr Manager Login
        </Button>
        <Button
          variant="contained"
          sx={{ color: "#FFFFFF", textTransform: "capitalize", mx: 2 }}
          onClick={() => naviagte("/operationsLogin")}
        >
          Opertions Login
        </Button>
        <Button
          variant="contained"
          sx={{ color: "#FFFFFF", textTransform: "capitalize" }}
          onClick={() => naviagte("/adminLogin")}
        >
          Admin Login
        </Button>

        <Grid item md={7} xs={11} sx={{ "@media(max-width:900px)": { mb: 2 } }}>
          <Typography
            variant="body1"
            fontSize="55px"
            lineHeight="80px"
            color="#03C1F3"
            textAlign={"center"}
            sx={{ "@media(max-width:900px)": { textAlign: "center" } }}
          >
            {title}
          </Typography>
          <Typography
            variant="body1"
            fontSize="25px"
            lineHeight="30px"
            color="#03C1F3"
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
            {err ? <Alert severity="error">Invalid Credentials !</Alert> : ""}

            <Grid container sx={{ justifyContent: "center" }} spacing={1}>
              <Grid item xs={12}>
                <FormControl sx={{ my: 1 }} fullWidth>
                  {/* <FormLabel>
                    <Typography variant="body1">Username/Email</Typography>
                  </FormLabel> */}
                  <CustomTextField
                    variant="outlined"
                    placeholder="Enter Username/Email"
                    label="Username/Email"
                    value={username}
                    name="username"
                    onChange={handleChange}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  {/* <FormLabel>
                    <Typography variant="body1">Password</Typography>
                  </FormLabel> */}
                  <CustomTextField
                    type="password"
                    variant="outlined"
                    placeholder="********"
                    label={"Password"}
                    value={password}
                    name="password"
                    onChange={handleChange}
                  />
                </FormControl>
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
