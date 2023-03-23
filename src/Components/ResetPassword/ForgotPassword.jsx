import {
  Button,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useState} from "react";

import Img from "../../assest/pic/login-form.png";
import logo from "../../assest/pic/logo1 1.png";
import config from '../../config.json'

import { useDispatch } from "react-redux";
import { setAlert } from "../../store/action/action";

function ForgotPassword({ history }) {
  const dispatch = useDispatch();

  const [value, setValue] = useState({ email: undefined });

  const handleChange = (e) => {
    setValue({ [e.target.name]: e.target.value });
  };

  // add by Yashwant
  async function handleSubmit() {
    try {
      const user = await axios.get(
        `${config.API_LIVE}/api/resetPassword?email=${value.email}`
      );

      if (user.status === 200) {
        history("/");

        dispatch(
          setAlert({
            open: true,
            variant: "success",
            message: user.data.message || "Email Sent",
          })
        );
      } else {
        dispatch(
          setAlert({
            open: true,
            variant: "warning",
            message: user.data.message || "Email Sent",
          })
        );
      }
    } catch (error) {
      console.log(error);
      dispatch(
        setAlert({
          open: true,
          variant: "error",
          message: "Something Went Wrong !!!",
        })
      );
    }
  }

  const handleBack = () => {
    history(-1);
  };

  return (
    <>
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
            sx={{ alignItems: "center", justifyContent: "space-evenly" }}
            className="loginOverlay"
          >
            <Grid item sx={{ justifyContent: "center" }}>
              <Box component="img" src={logo} height="250px" />
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
          sx={{ justifyContent: "center", alignItems: "center" }}
        >
          <Grid item md={8}>
            <Typography variant="body1" color={"black"} fontSize={"40px"}>
              Forgot Password
            </Typography>
            <Typography variant="body1" color={"#C8C8C8"} fontSize={"20px"}>
              Your email associate with account and we'll send you a link to
              reset your password.
            </Typography>
            <Box component={"form"} sx={{ mt: 2 }}>
              <Grid
                container
                spacing={3}
                sx={{ justifyContent: "space-evenly" }}
              >
                <Grid item md={10}>
                  <FormControl fullWidth className="textFieldWrapper">
                    <TextField
                      variant="outlined"
                      label={"Email Address"}
                      onChange={handleChange}
                      name="email"
                      type="email"
                    />
                  </FormControl>
                </Grid>
                <Grid item md={10}>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      textTransform: "capitalize",
                      color: "white",
                      fontSize: "16px",
                    }}
                    onClick={handleSubmit}
                  >
                    Send Email
                  </Button>
                </Grid>
                <Grid item md={10}>
                  <Button
                    variant="text"
                    fullWidth
                    sx={{ textTransform: "capitalize", fontSize: "16px" }}
                    onClick={handleBack}
                  >
                    Back To Login
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default ForgotPassword;
