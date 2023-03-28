import React from "react";
import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import { MyHeader } from "../StyledComponent";

import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useNavigate } from "react-router-dom";

function ListingComponent({
  title,
  title1,
  buttonText,
  buttonText1,
  addbtn,
  options,
  Table,
  value,
  onChange,
  rows,
  onButtonClick,
  addUserBtn,
  dropDown,
  serachValue,
  setsearchValue,
  check,
  setCheck
}) {

  const navigate = useNavigate()

  function handleChange (e){
    setsearchValue(e.target.value)
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <MyHeader>{title1?title1:title}</MyHeader>
      <Divider />
      <Grid
        container
        sx={{
          px: 1,
          justifyContent: "space-between",
          my: 1,
          alignItems: "center",
        }}
      >
        <Grid item xs={6}>
          <Typography
            variant="body1"
            color="black"
            fontSize="20px"
            fontWeight="600"
            alignSelf="center"
            lineHeight="30px"
            sx={{
              "@media(max-width:600px)": {
                fontSize: "17px",
                lineHeight: "25px",
              },
            }}
          >
            {title}
          </Typography>
        </Grid>

{
  dropDown === false ?"":<Grid xs={6} md={2}>
  <FormControl fullWidth>
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      label="Age"
      value={value}
      size="small"
      onChange={onChange}
      sx={{ border: "1px solid #CACACA" }}
    >
      {options.map((elem, i) => {
        return (
          <MenuItem value={elem} key={i}>
            {elem}
          </MenuItem>
        );
      })}
    </Select>
  </FormControl>
</Grid>
}
      
      </Grid>
      <Divider />

      <Grid
        container
        sx={{
          justifyContent: "space-between",
          p: 4,
          "@media(max-width:600px)": { p: 2 },
        }}
        spacing={2}
      >
        <Grid item md={8} xs={7} sx={{flexGrow:1}}>
          <TextField
            placeholder="Search By Field Name..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          value={serachValue}
          onChange={handleChange}
            size="small"
          />
        </Grid>

{
  addbtn? 
  <Grid item md={4} xs={5} sx={{display:'flex',justifyContent:'flex-end'}}>
  <Button
  variant="contained"
  color="primary"
  sx={{
    borderRadius: "15px",
    color: "white",
    textTransform: "capitalize",
    // mr:3
    '@media(maxwidth:900px)':{
      fontSize:'12px',
      lineHeight:'12px'
    }
  }}
  startIcon={<AddCircleOutlineIcon />}
  onClick={()=>navigate('/newAgreement')}
>
  {buttonText1}
</Button>
</Grid>
:''
}
       
       {/* upload button */}
  {
    addUserBtn? <Button
    variant="contained"
    sx={{
      borderRadius: "15px",
      color: "white",
      backgroundColor: "var(--main-color)",
      textTransform: "capitalize",
    }}
    startIcon={<AddCircleOutlineIcon />}
    onClick={onButtonClick}
  >
    {buttonText}
  </Button>
  :''
  }
       

      </Grid>

      <Table rows={rows} setCheck={setCheck} check={check}/>
    </Box>
  );
}

export default ListingComponent;
