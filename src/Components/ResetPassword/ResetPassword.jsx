import { Box, Button, FormControl, Grid, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'

import Img from "../../assest/pic/login-form.png";
import logo from "../../assest/pic/logo1 1.png";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import {useDispatch} from 'react-redux';
import {setAlert} from '../../store/action/action';


import config from '../../config.json'

function ResetPassword({history}) {

  const {email} = useParams()
const dispatch = useDispatch()

  const [showPassword, setShowPassword] = useState(false);

  const [value, setValue] = useState({password:"",cPassword:""}) 

  const passwordToggle = () => setShowPassword((show) => !show);

  const handleChange = (e)=>{
    setValue({
     ...value,
     [e.target.name]:e.target.value
    })
  }


  const handleSubmit = async (e)=>{
    e.preventDefault()
    if(value.password !== value.cPassword){
      dispatch(setAlert({
        open : true,
        message : "Password doesn't match.",
        variant : 'warning'
      }))
    }
    else {
      const resetPassword = await axios.patch(`${config.API_LIVE}/api/reset`,{email,password : value.password})

      if(resetPassword.status === 200)
      {
        history('/')
        dispatch(setAlert({
          open : true,
          variant : 'success',
          message : "Password reset successfully.",
        }))
      }
    }
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
        <Grid item md={8}>
          <Typography variant="body1" color={"black"} fontSize={"40px"}>
               Reset Password
          </Typography>
          <Typography variant="body1" color={"#C8C8C8"} fontSize={"20px"}>
            Set a new password
          </Typography>
          <Box component={'form'} sx={{mt:2}} onSubmit={handleSubmit}>
              <Grid container spacing={3} sx={{justifyContent:"space-evenly"}} >
                  <Grid item md={12}>
                      <FormControl fullWidth>
                         <TextField
                          variant="outlined"
                          label={'New password'}
                          onChange={handleChange}
                          value={value.password}
                          name={'password'}
                          type={showPassword? 'text' :'password'}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end" onClick={passwordToggle}>
                               {!showPassword? <Visibility />: <VisibilityOff/> } 
                              </InputAdornment>
                            ),
                          }}
                         />
                      </FormControl>
                  </Grid>
                  <Grid item md={12}>
                      <FormControl fullWidth >
                         <TextField
                          variant="outlined"
                          label={'Confirm New password'}
                          onChange={handleChange}
                          value={value.cPassword}
                          name="cPassword"
                          type={showPassword? 'text' :'password'}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end" onClick={passwordToggle}>
                                {!showPassword? <Visibility />:<VisibilityOff/>}
                              </InputAdornment>
                            ),
                          }}
                          
                         />
                      </FormControl>
                  </Grid>
                  <Grid item md={12}>
                      <Button variant="contained" type='submit' fullWidth sx={{textTransform:"capitalize",color:"white",fontSize:"16px"}}>Reset Password</Button>
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