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
import UploadFileIcon from "@mui/icons-material/UploadFile";
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
}) {

  const navigate = useNavigate()
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

        <Grid xs={6} md={2}>
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
      </Grid>
      <Divider />

      <Grid
        container
        sx={{
          justifyContent: "space-between",
          p: 4,
          "@media(max-width:600px)": { p: 2 },
        }}
      >
        <Grid item sx={{flexGrow:1}}>
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

{
  addbtn? <Button
  variant="contained"
  sx={{
    borderRadius: "15px",
    color: "white",
    backgroundColor: "#03C1F3",
    textTransform: "capitalize",
    mr:3
  }}
  startIcon={<AddCircleOutlineIcon />}
  onClick={()=>navigate('/newAgreement')}
>
  {buttonText1}
</Button>
:''
}
       

        <Button
          variant="contained"
          sx={{
            borderRadius: "15px",
            color: "white",
            backgroundColor: "#03C1F3",
            textTransform: "capitalize",
          }}
          startIcon={<UploadFileIcon />}
          onClick={onButtonClick}
        >
          {buttonText}
        </Button>
      </Grid>

      <Table rows={rows} />
    </Box>
  );
}

export default ListingComponent;
