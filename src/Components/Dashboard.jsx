import { Box, Grid, Stack, Typography } from "@mui/material";
import React, { useState } from "react";

//css
import "../assest/CSS/dashboard.css";


import HamburgerMenu from "./HamburgerMenu";

function Dashboard() {
  const Item = ({ service, value }) => {
    return (
      <Grid item md={4} xs={6}>
        <Grid
          container
          sx={{
            height: "150px",
            width: "100%",
            backgroundColor: "#03C1F3",
            borderRadius: "20px",
            justifyContent: "center",
            alignItems: "center",
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
              sx={{'@media(max-width:600px)':{fontSize:"40px"}}}
            >
              {value}
            </Typography>
            <Typography
              variant="body1"
              fontSize="18px"
              color="white"
              textAlign="center"
              mt="-10px"
              sx={{'@media(max-width:600px)':{fontSize:"12px"}}}
            >
              {service}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    );
  };


  

  return (
    <>
      <Typography
        variant="body1"
        fontSize="31px"
        fontWeight="700"
        lineHeight="48px" 
        color="#03C1F3"
        ml="55px"
        sx={{'@media(max-width:600px)':{fontSize:"25px",ml:'40px'}}}
      >
        Dashboard
      </Typography>
      <Stack sx={{flexDirection:"row"}}>


       <HamburgerMenu/>

        {/* dashboard content */}
          <Grid container spacing={2} sx={{ pl: 2, pr: 1 }}>
            <Item service="Total Agreement" value="10" />
            <Item service="Pending Approval" value="5" />
            <Item service="Approved Agreement" value="5" />
            <Item service="Rejected Agreements" value="0" />
            <Item service="Renewal Agreements" value="4" />
          </Grid>
      </Stack>
    </>
  );
}

export default Dashboard;
