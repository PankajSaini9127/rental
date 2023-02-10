import styled from "@emotion/styled";
import {
  Button,
  FormControl,
  FormLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";

import Img from "../assest/pic/login-form.png";
import logo from "../assest/pic/logo1 1.png";

export default function Login() {
  const textField = {
    borderRadious: "35px",
  };

  const [formValue, setFormValue] = useState({ username: "", password: "" });

  const { password, username } = formValue;

  const handleChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValue);
  };

  return (
    <>
      <Grid item container sx={{ height: "100vh", border: "1px solid red" }}>
        <Grid
          item
          md={6}
          sx={{
            height: "100%",
            background: `url(${Img})`,
            backgroundSize: "100% 100%",
            position: "relative",
          }}
        >
          <Grid
            container
            sx={{ justifyContent: "center", alignItems: "center" }}
            className="loginOverlay"
          >
            <Grid>
              <Box component="img" src={logo} height="180px" />
              <Typography
                variant="body1"
                color="white"
                textAlign="center"
                mt="-25px"
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
          <Grid item xs={7}>
            <Typography variant="body1" fontSize="55px" lineHeight="80px"  color="#03C1F3">
              Hello,
            </Typography>
            <Typography
              variant="body1"
              fontSize="16px"
              lineHeight="24px"
              color="#C8C8C8"
            >
              Enter Your Details To Process Further
            </Typography>

            <Box component="form" sx={{ mt: 2 }} onSubmit={handleSubmit}>
              <Grid container sx={{ justifyContent: "center" }} spacing={1}>
                <Grid item xs={12}>
                  <FormControl sx={{ my: 1 }} fullWidth>
                    <FormLabel>
                      <Typography
                        variant="body1"
                       
                      >
                        Username/Email
                      </Typography>
                    </FormLabel>
                    <TextField
                      variant="outlined"
                      placeholder="Enter Username/Email"
                      value={username}
                      name="username"
                      onChange={handleChange}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <FormLabel>
                      <Typography
                        variant="body1"                      >
                        Password
                      </Typography>
                    </FormLabel>
                    <TextField 
                       variant="outlined"
                       placeholder="********" 
                        value={password}
                        name="password"
                        onChange={handleChange}/>
                  </FormControl>
                </Grid>

                <Grid item xs={3} sx={{ mt: 2 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      height: "40px",
                      width: "100px",
                      background: "#03C1F3",
                      borderRadius: "20px",
                      fontSize: "25px",
                      lineHeight: "37px",
                      color: "white",
                    }}
                  >
                    <Typography
                      variant="body1"
                      color="white"
                      lineHeight="30px"
                      fontSize="15px"
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
    </>
  );
}
