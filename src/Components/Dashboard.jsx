import { Grid, Stack, Typography } from "@mui/material";
import React from "react";

//css
import "../assest/CSS/dashboard.css";


import HamburgerMenu from "./HamburgerMenu";
import { MyHeader } from "./StyledComponent";

function Dashboard() {



  const Item = ({ service, value }) => {
    return (
      <Grid item md={3.5} container sx={{justifyContent:"space-evenly"}}>
        <Grid
          container
          sx={{
            height: "181px",
            // maxWidth:"356px",
            backgroundColor: "#03C1F3",
            borderRadius: "20px",
            justifyContent: "center",
            alignItems: "center",
            boxShadow:"0px 10px 10px rgba(0, 0, 0, 0.25);"
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
<MyHeader>Dashboard</MyHeader>

      <Stack sx={{flexWrap:"noWrap",flexDirection:"row" }}>


       <HamburgerMenu />

        {/* dashboard content */}
          <Grid container spacing={3} sx={{ pl: 2, pr: 1,backgroundColor:"#FFFFF"}} >
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
