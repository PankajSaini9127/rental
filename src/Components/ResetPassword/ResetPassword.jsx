import { Box, Button, FormControl, Grid, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'

import Img from "../../assest/pic/login-form.png";
import logo from "../../assest/pic/logo1 1.png";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';



function ResetPassword() {

  const [showPassword, setShowPassword] = useState(false);

  const passwordToggle = () => setShowPassword((show) => !show);

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
               Reset Password
          </Typography>
          <Typography variant="body1" color={"#C8C8C8"} fontSize={"20px"}>
            Set a new password
          </Typography>
          <Box component={'form'} sx={{mt:2}}>
              <Grid container spacing={3} sx={{justifyContent:"space-evenly"}} >
                  <Grid item md={12}>
                      <FormControl fullWidth>
                         <TextField
                          variant="outlined"
                          label={'New password'}
                          name={'password'}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end" onClick={passwordToggle}>
                               {showPassword? <Visibility />:<VisibilityOff/>} 
                              </InputAdornment>
                            ),
                          }}
                         />
                      </FormControl>
                  </Grid>
                  <Grid item md={12}>
                      <FormControl fullWidth >
                         <TextField
                         error
                         helperText={'requierd'}
                          variant="outlined"
                          label={'Confirm New password'}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                {showPassword? <Visibility />:<VisibilityOff/>}
                              </InputAdornment>
                            ),
                          }}
                          
                         />
                      </FormControl>
                  </Grid>
                  <Grid item md={12}>
                      <Button variant="contained" fullWidth sx={{textTransform:"capitalize",color:"white",fontSize:"16px"}}>Reset</Button>
                  </Grid>
              </Grid>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  </>
  )
}

export default ResetPassword