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
import React, { useState } from "react";

import SearchIcon from "@mui/icons-material/Search";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DataTable from "./DataTable";

import HamburgerMenu from "./HamburgerMenu";
import { MyHeader } from "./StyledComponent";
import ListingComponent from "./StyleComponents/ListingComponent";

const options = ["New Agreement","Approved Agreement"];

function Listing() {

  const [Select, setSelect] = useState('New Agreement')

  const handleChange = (e)=>{
     setSelect(e.target.value)
  }
  

  return (
    <>
      <Stack sx={{flexWrap:"wap",flexDirection:"row"}}>

<HamburgerMenu/>

      <ListingComponent
        title="Rental Agreement"
        buttonText="Upload"
        options={options}
        value={Select}
        Table={DataTable}
        onChange={handleChange}
      />

</Stack>

     
    </>
  );
}

export default Listing;
