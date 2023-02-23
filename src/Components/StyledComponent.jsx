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
} from "@mui/material";

// header
const MyHeader = styled("h5")({
  fontSize: "31px",
  fontWeight: "700",
  lineHeight: "48px",
  color: "#03C1F3",
  marginLeft: "55px",
  "@media(max-width:600px)": { fontSize: "25px", ml: "40px" },
});

// CSS Style for Label for Text field etc.
const labelStyle = {
  fontSize: "20px",
  color: "#03C1F3",
  fontWeight: "600",
  "@media(max-width:900px)": { fontSize: "10px" },
};

// textfield & select CSS style
const fieldStyle = {
  border: "1px solid #03C1F3",
  borderRadius: "20px",
  height: "50px",
  width: "100%",
  p: "8px",
  pl:"13px",
  input: { color: "#03C1F3",'&::placeholder':{color:"rgba(16, 99, 173, 0.47)"} },
  "@media(max-width:900px)": { height: "35px",p:0 , px:'10px'},
};






// Text Field Style

const TextFieldWrapper = ({ label, placeHolder, value, name, onChange }) => {
  return (
    <Grid item md={3.1} xs={6}>
      <FormControl fullWidth>
        <FormLabel>
          <Typography variant="body1" sx={labelStyle}>
            {label}
          </Typography>
        </FormLabel>
        <TextField
          variant="standard"
          name={name}
          onChange={(e) => onChange(e)}
          InputProps={{
            disableUnderline: true,
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
      </FormControl>
    </Grid>
  );
};

// Document Upload
const DocumentUpload = ({ label, placeHolder }) => {
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
            border: "1px solid #03C1F3",
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
         
          <input hidden accept="image/*" multiple type="file" />
        </Button>

        {/* <TextField
          variant="standard"
          component={'button'}
          InputProps={{
            disableUnderline: true,
          }}
          placeholder={placeHolder}
          type="file"
          hidden
          sx={fieldStyle}
        /> */}
      </FormControl>
    </Grid>
  );
};

// Select Field
const SelectComponent = ({ label, value, name, onChange }) => {
  return (
    <Grid item md={3.1} xs={6}>
      <FormControl fullWidth>
        <FormLabel>
          <Typography variant="body1" sx={labelStyle}>
            {label}
          </Typography>
        </FormLabel>
        <Select
          name={name}
          onChange={(e) => onChange(e)}
          variant="standard"
          disableUnderline
          value={value}
          sx={{
            border: "1px solid #03C1F3",
            borderRadius: "20px",
            height: "50px",
            mt: "0px !important",
            color: "rgba(16, 99, 173, 0.47)",
            p: "8px",
            width: "100%",
            px: "13px",
            boxShadow: "none",
            input: { '&::placeholder':{color:"rgba(16, 99, 173, 0.47)"} },
            ".MuiOutlinedInput-notchedOutline": { border: 0 },
            "@media(max-width:900px)": { height: "35px", width: "35vw" },
            
          }}
        >
          <MenuItem value="1">Select Increment Type</MenuItem>
          <MenuItem value="percentage">Percentage</MenuItem>
          <MenuItem value="value">Value</MenuItem>
        </Select>
      </FormControl>
    </Grid>


  );
};



// native select in user dashboard
const SelectNative = ({value,names,label})=>{
  return(
    <Grid item md={3.1} xs={6}>
    <FormControl fullWidth>
      <FormLabel>
        <Typography variant="body1" sx={labelStyle}>
          {label}
        </Typography>
      </FormLabel>
      <Select
      disableUnderline
      variant="standard"
      multiple
       native
      sx={{
        border: "1px solid #03C1F3",
        borderRadius: "20px",
        // height: "50px",
        mt: "0px !important",
        color: "rgba(16, 99, 173, 0.47)",
        p: 2,
        width: "100%",
        px: 2,
        boxShadow: "none",
        input: { fontSize:"20px",'&::placeholder':{color:"rgba(16, 99, 173, 0.47)"} },
        ".MuiOutlinedInput-notchedOutline": { border: 0 },
        
      }}

value={value}
// @ts-ignore Typings are not considering `native`
// onChange={handleChangeMultiple}
label={label}

>
{names.map((name) => (
  <option key={name} value={name}>
    {name}
  </option>
))}
</Select>
    </FormControl>
  </Grid>
  )
}



//dashboard 

const DashboardItem = ({ service, value }) => {
  return (
    <Grid item md={4} xs={6} container sx={{justifyContent:"space-evenly"}}>
      <Grid
        container
        sx={{
          height: "181px",
          // maxWidth:"356px",
          backgroundColor: "#03C1F3",
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




export { MyHeader, TextFieldWrapper, DocumentUpload, SelectComponent,SelectNative,DashboardItem };
