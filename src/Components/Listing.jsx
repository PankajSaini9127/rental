import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

import SearchIcon from "@mui/icons-material/Search";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DataTable from "./DataTable";

import HamburgerMenu from './HamburgerMenu'

function Listing() {
  return (
    <>
    <Stack sx={{flexWrap:"wap",flexDirection:"row"}}>

      <HamburgerMenu/>

    <Box sx={{ flexGrow: 1 }}>

      <Typography
        variant="body1"
        fontSize="31px"
        fontWeight="700"
        lineHeight="48px"
        ml="55px"
        color="#03C1F3"
        sx={{'@media(max-width:600px)':{ml:"20px",fontSize:"25px",lineHeight:"40px"}}}
      >
        Rental Agreement
      </Typography>

      <Divider />

      <Grid container sx={{ px: 1, justifyContent: "space-between", my: 1 ,alignItems:"center"}}>
        <Grid item xs={6}>
        <Typography
          variant="body1"
          color="black"
          fontSize="20px"
          fontWeight="600"
          alignSelf="center"
          lineHeight="30px"
          sx={{'@media(max-width:600px)':{fontSize:"17px",lineHeight:"25px"}}}
        >
          Rental Agreement
        </Typography>
        </Grid>

        <Grid xs={6} md={2}>
          <FormControl fullWidth>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Age"
              value={10}
              size="small"
              sx={{ border: "1px solid #CACACA" }}
            >
              <MenuItem value={10}>New Agreement</MenuItem>
              <MenuItem value={20}>50</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Divider />

      <Grid container sx={{ justifyContent: "space-between", p: 4, '@media(max-width:600px)':{p:2} }}> 
        <Grid item xs={7}>
        <TextField
          placeholder="Search By Field Name..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          size="small"
        />
         </Grid>

        <Button
          variant="contained"
          sx={{
            borderRadius: "15px",
            color: "white",
            backgroundColor: "#03C1F3",
          }}
          startIcon={<UploadFileIcon />}
        >
          Upload
        </Button>
      </Grid>

      {/* //table */}

      
     <DataTable/>
     </Box>

     </Stack>


    </>
  );
}

export default Listing;
