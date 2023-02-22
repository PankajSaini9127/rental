import {
  Alert,
  Button,
  FormControl,
  FormLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Img from "../assest/pic/login-form.png";
import logo from "../assest/pic/logo1 1.png";

export default function Login() {
  const navigate = useNavigate();

  const data = { username: "bitwit", password: "Bitwit" };

  const [formValue, setFormValue] = useState({ username: "", password: "" });

  const [err, setErr] = useState(false);

  const { password, username } = formValue;

  const handleChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    
    e.preventDefault();
    if (
      formValue.username.toLowerCase() === data.username &&
      formValue.password === data.password
    ) {
      setErr(false);
      navigate("/dashboard");
    } else {
      setErr(true);
    }
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
            sx={{ justifyContent: "center", alignItems: "center" }}
            className="loginOverlay"
          >
            <Grid item sm={6}>
              <Box component="img" src={logo} height="180px" />
              <Typography
                variant="body1"
                color="white"
                textAlign="center"
                mt="-25px"
                ml="-122px"
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
          <Grid item md={7} xs={11} sx={{'@media(max-width:900px)':{mb:1}}}>
            <Typography
              variant="body1"
              fontSize="55px"
              lineHeight="80px"
              color="#03C1F3"
              sx={{ "@media(max-width:900px)": { textAlign: "center" } }}
            >
              Hello,
            </Typography>
            <Typography
              variant="body1"
              fontSize="16px"
              lineHeight="24px"
              color="#C8C8C8"
              sx={{'@media(max-width:900px)':{
                textAlign:"center"
              }}}
            >
              Enter Your Details To Process Further
            </Typography>

            <Box component="form" sx={{ mt: 2 }} onSubmit={handleSubmit}>
              {err ? <Alert severity="error">Invalid Credentials !</Alert> : ""}

              <Grid container sx={{ justifyContent: "center" }} spacing={1}>
                <Grid item xs={12}>
                  <FormControl sx={{ my: 1 }} fullWidth>
                    <FormLabel>
                      <Typography variant="body1">Username/Email</Typography>
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
                      <Typography variant="body1">Password</Typography>
                    </FormLabel>
                    <TextField
                      type="password"
                      variant="outlined"
                      placeholder="********"
                      value={password}
                      name="password"
                      onChange={handleChange}
                    />
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
                      '@media(max-width:900px)':{width:'150px',height:"40px"}
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
