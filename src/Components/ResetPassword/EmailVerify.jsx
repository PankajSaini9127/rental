import { Box, Button, Grid,  Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

import Img from "../../assest/pic/login-form.png";
import logo from "../../assest/pic/logo1 1.png";

function EmailVerify() {

  const navigate =useNavigate()

  const handleBack = ()=>{
    navigate(-2)
  }

  const handleReset = ()=>{
    navigate('/newPassword')
  }

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
           
          <Grid item container md={8} spacing={3}>
            <Grid item md={10}>
            <Typography variant="body1" color={"black"} textAlign={'center'} fontSize={"40px"}>
              Email Sent
            </Typography>
            </Grid>
            <Grid item md={10}>
            <Typography variant="body1" color={"#C8C8C8"} textAlign={'center'} fontSize={"20px"}>
              We've sent a reset password link to associate email.
            </Typography>
            </Grid>
            <Grid item md={10}>
            <Typography variant="body1" color={"#C8C8C8"} textAlign={'center'} fontSize={"20px"}>
             Did't receive email ? <Button variant="text" >Resend</Button>
            </Typography>
            </Grid>
            <Grid item md={10} sx={{justifyContent:"center",display:'flex'}}>
            <Button variant="text" onClick={handleBack}>Back to login</Button>
            </Grid>          
          </Grid>
        </Grid>

      </Grid>
    </>
  );
}

export default EmailVerify;
