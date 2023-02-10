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
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

import SearchIcon from "@mui/icons-material/Search";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DataTable from "./DataTable";

function Listing() {
  return (
    <>
      <Typography
        variant="body1"
        fontSize="31px"
        fontWeight="700"
        lineHeight="48px"
        ml="55px"
        color="#03C1F3"
      >
        Rental Agreement
      </Typography>

      <Divider />

      <Grid container sx={{ px: 2, justifyContent: "space-between", my: 1 }}>
        <Typography
          variant="body1"
          color="black"
          fontSize="20px"
          fontWeight="600"
          alignSelf="center"
          lineHeight="30px"
        >
          Rental Agreement
        </Typography>
        <Box sx={{ minWidth: "100px" }}>
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
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Grid>
      <Divider />

      <Grid container sx={{ justifyContent: "space-between", p: 4 }}>
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

    </>
  );
}

export default Listing;
