//header

import { FormControl, FormLabel, Grid, MenuItem, Select, TextField, Typography } from "@mui/material";
import { styled } from "@mui/system";

const MyHeader = styled('h5')({
    fontSize:"31px",
    fontWeight:"700",
    lineHeight:"48px", 
    color:"#03C1F3",
    marginLeft:"55px",
    '@media(max-width:600px)':{fontSize:"25px",ml:'40px'}
})


const labelStyle = {
  fontSize:"20px",
  color:"#03C1F3",
  fontWeight:"600",
  '@media(max-width:900px)':{fontSize:"10px"}
}

const fieldStyle ={
  border: "1px solid #03C1F3",
  borderRadius: "20px",
  height: "66px",
  width:"100%",
  p: 2,
  color:"rgba(16, 99, 173, 0.47)",
  '@media(max-width:900px)':{height:"46px",p:1}
}

const TextFieldWrapper = ({ label, placeHolder, value, name, onChange }) => {

    return (
      <Grid item md={4} xs={6}>
        <FormControl fullWidth>
          <FormLabel>
            <Typography
              variant="body1"
              sx={labelStyle}
            >
              {label}
            </Typography>
          </FormLabel>
          <TextField
            variant="standard"
            name={name}
            onChange={e=>onChange(e)}
            InputProps={{
              disableUnderline: true,
              style:{
                color:"rgba(16, 99, 173, 0.47);"
              }
            }}
            placeholder={placeHolder}
            value={value}
            fullWidth
            sx={fieldStyle}
          />
        </FormControl>
      </Grid>
    );
  };

  const DocumentUpload = ({ label, placeHolder }) => {
    return (
      <Grid item md={5} xs={6}>
        {/* <MyTextfield /> */}
        <FormControl fullWidth>
          <FormLabel>
            <Typography
              variant="body1"
              sx={labelStyle}
            >
              {label}
            </Typography>
          </FormLabel>
          <TextField
            variant="standard"
            InputProps={{
              disableUnderline: true,
            }}
            placeholder={placeHolder}
            type="file"
            hidden
            sx={fieldStyle}
          />
        </FormControl>
      </Grid>
    );
  };

  const SelectComponent = ({label,value,name, onChange})=>{
    return (
      <Grid item md={4} xs={6} >
        <FormControl fullWidth>
          <FormLabel>
            <Typography
              variant="body1"
              sx={labelStyle}
            >
              {label}
            </Typography>
          </FormLabel>
          <Select
          name={name}
          onChange={e=>onChange(e)}
          variant="standard"
          disableUnderline
    value={value}
    sx={{
      border: "1px solid #03C1F3",
      borderRadius: "20px",
      height: "66px",
      mt:"0px !important",
      color:"rgba(16, 99, 173, 0.47)",
      p: 2,
      width:"100%",
      px: 2,
      boxShadow: 'none',
      '.MuiOutlinedInput-notchedOutline': { border: 0 },
      '@media(max-width:900px)':{height:"46px",width:"35vw"}
    }}
  >
    <MenuItem value="1">Select Increment Type</MenuItem>
    <MenuItem value="percentage">Percentage</MenuItem>
    <MenuItem value="value">Value</MenuItem>
  </Select>
        </FormControl>
      </Grid>
    )
  }  

export {MyHeader,TextFieldWrapper,DocumentUpload,SelectComponent}