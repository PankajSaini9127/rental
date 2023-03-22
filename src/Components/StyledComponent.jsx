// MUI Components

import {
  FormControl,
  FormLabel,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
  styled,
  Button,
  InputLabel,
  InputAdornment
} from "@mui/material";

//icons
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from "react";


// header
const MyHeader = styled("h5")({
  fontSize: "31px",
  fontWeight: "700",
  lineHeight: "48px",
  marginLeft: "55px",
  color:'var(--main-color)',
  "@media(max-width:600px)": { fontSize: "20px", ml: "20px" },
});

// CSS Style for Label for Text field etc.
const labelStyle = {
  fontSize: "20px",
  color: "var(--main-color)",
  fontWeight: "600",
  "@media(max-width:900px)": { fontSize: "10px" },
};

// textfield & select CSS style
const fieldStyle = {
  // border: "1px solid #03C1F3",
  // borderRadius: "20px",
  height: "50px",
  width: "100%",
  // p: "8px",
  // pl:"13px",
  // input: { color: "#03C1F3",'&::placeholder':{color:"rgba(16, 99, 173, 0.47)"} },
  "@media(max-width:900px)": { height: "35px",p:0 , px:'10px'},
};


// Text Field Style
const TextFieldWrapper = ({ label, placeHolder, value, name, onChange,errMsg,onBlur, touched}) => {
  return (
    <Grid item md={4} xs={6} sx={{'@media(max-width:900px)':{my:1}}}>
      <FormControl fullWidth sx={{p:'0px !important'}}>
       
        <TextField
          variant="outlined"
          name={name}
          // color='secodary'
          onChange={(e) => onChange(e)}
          error={errMsg && touched ? true : false}
          label={label}
          onBlur={onBlur}
          InputProps={{
            style: {
              color: "rgba(16, 99, 173, 0.47) !important/",
              '@media(max-width:900px)':{fontSize:'10px !important'}
            },
            
          }}
          placeholder={placeHolder}
          value={value}
          fullWidth
          sx={fieldStyle}
        />
        { errMsg && touched? <Typography variant="body1" color="red" mt={1}>{errMsg}</Typography>:null}
      </FormControl>
    </Grid>
  );
};



const PasswordField = ({label, placeHolder, value, name, onChange,errMsg,onBlur, touched})=>{
  
  const [showPassword, setShowPassword] = useState(false);

  const passwordToggle = () => setShowPassword((show) => !show);
  return(
    <Grid item md={4} xs={6} sx={{'@media(max-width:900px)':{my:1}}}>
    <FormControl fullWidth sx={{p:'0px !important'}}>
     
      <TextField
        variant="outlined"
        name={name}
        // color='secodary'
        type={showPassword?'text':'password'}
        onChange={(e) => onChange(e)}
        error={errMsg && touched ? true : false}
        label={label}
        onBlur={onBlur}
        InputProps={{
          style: {
            color: "rgba(16, 99, 173, 0.47) !important/",
            '@media(max-width:900px)':{fontSize:'10px !important'}
          },
          endAdornment: (
            <InputAdornment position="end" onClick={passwordToggle}>
             {showPassword? <VisibilityOff/>:<Visibility />} 
            </InputAdornment>
          ),
        }}
        placeholder={placeHolder}
        value={value}
        fullWidth
        sx={fieldStyle}
      />
      { errMsg && touched? <Typography variant="body1" color="red" mt={1}>{errMsg}</Typography>:null}
    </FormControl>
  </Grid>
  )
}

// Document Upload
const DocumentUpload = ({ label, placeHolder,handleChange }) => {
  return (
    <Grid item md={4.1} xs={6}>
      {/* <MyTextfield /> */}
      <FormControl fullWidth>
        <FormLabel>
          <Typography variant="body1" sx={labelStyle}>
            {label}
          </Typography>
        </FormLabel>

        <Button
          variant="outlined"
          sx={{
            border: "1px solid #C8C8C8",
            borderRadius: "20px",
            height: "50px",
            // width: "100%",
            p: 2,
            color:"rgba(16, 99, 173, 0.47)",
            textTransform:"capitalize",
            '@media(max-width:900px)':{height:'35px'}
          }}
          component="label"
        >
          <Typography sx={{fontSize:"16px", textAlign:"left",width:"100%",'@media(max-width:900px)':{fontSize:'10px'}}}> {placeHolder}</Typography>
         
          <input hidden accept="image/*" multiple type="file" onChange={handleChange}/>
        </Button>

        
      </FormControl>
    </Grid>
  );
};

// Select Field


const SelectComponent = ({ label, value, name, onChange ,options,errMsg,onBlur,touched ,multiple}) => {
  return (
    <Grid item md={4} xs={6} sx={{mb:'0px !important','@media(max-width:900px)':{my:1}}}>
      <FormControl fullWidth >
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          name={name}
          multiple={multiple}
          onChange={(e) => onChange(e)}
          variant="outlined"
          labelId="demo-simple-select-label"
          value={value}
          label={label}
          onBlur={onBlur}
          error={errMsg && touched ? true : false}
          sx={{
            mt: "0px !important",
            color: "rgba(16, 99, 173, 0.47)",
            width: "100%",
            height:'50px !important',
            boxShadow: "none",
            
          }}
        >
          {
            options.map((item,i)=>{
              return <MenuItem value={item}>{item}</MenuItem>
            })
          }
        </Select>
        { errMsg && touched? <Typography variant="body1" color="red" mt={1}>{errMsg}</Typography>:null}
      </FormControl>
    </Grid>


  );
};


//dashboard 

const DashboardItem = ({ service, value }) => {
  return (
    <Grid item md={4} xs={6} container sx={{justifyContent:"space-evenly"}}>
      <Grid
        container
        sx={{
          height: "181px",
          // maxWidth:"356px",
          backgroundColor: "var(--main-color)",
          borderRadius: "20px",
          justifyContent: "center",
          alignItems: "center",
          boxShadow:"0px 10px 10px rgba(0, 0, 0, 0.25);",
          '@media(max-width:900px)':{height:'130px'}
        }}
      >
        <Grid item>
          <Typography
            variant="body1"
            fontSize="60px"
            color="white"
            textAlign="center"
            fontWeight="600"
            lineHeight="65px"
            sx={{'@media(max-width:900px)':{fontSize:"35px",lineHeight:'50px'}}}
          >
            {value}
          </Typography>
          <Typography
            variant="body1"
            fontSize="18px"
            color="white"
            textAlign="center"
            mt="-10px"
            sx={{'@media(max-width:900px)':{fontSize:"11px"}}}
          >
            {service}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};




export { MyHeader, TextFieldWrapper, DocumentUpload, SelectComponent,DashboardItem,PasswordField };
