import React from 'react'
import { Box, Button, Divider, FormControl, Grid, InputAdornment, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import HamburgerMenu from '../HamburgerMenu'
import { MyHeader } from '../StyledComponent'

import SearchIcon from "@mui/icons-material/Search";
import UploadFileIcon from "@mui/icons-material/UploadFile";



function ListingComponent({title,buttonText,options,Table,value,onChange,rows,onButtonClick}) {
  return (
   

  <Box sx={{ flexGrow: 1 }}>

    <MyHeader>{title}</MyHeader>
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
              {
                options.map((elem,i)=>{
                  return <MenuItem value={elem} key={i}>{elem}</MenuItem>
                })
              }
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Divider />

      <Grid container sx={{ justifyContent: "space-between", p: 4, '@media(max-width:600px)':{p:2} }}> 
        <Grid item xs={6}>
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
            textTransform:'capitalize'
          }}
          startIcon={<UploadFileIcon />}
          onClick={onButtonClick}
        >
   {buttonText}
        </Button>
      </Grid>

      <Table rows={rows}/>

    </Box>
  )
}

export default ListingComponent