import { Grid, Stack } from "@mui/material";
import React from "react";


//css
import "../../assest/CSS/hamburgerMenu.css";

import HamburgerMenu from "../HamburgerMenu";
import { DashboardItem, MyHeader } from "../StyledComponent";

function Dashboard() {

  const data = [ 
    {service:"Total Agreement", value:10},
    {service:"Pending Approval", value:5},
    {service:"Approved Agreement", value:5},
    {service:"Rejected Agreements", value:0},
    {service:"Renewal Agreements", value:4}
  ]

  return (
    <>
      <MyHeader>Dashboard</MyHeader>

      <Stack sx={{ flexWrap: "noWrap", flexDirection: "row" }}>
        <HamburgerMenu  navigateTo={'listing'} />

        {/* dashboard content */}
        <Grid container sx={{ justifyContent: "center" }}>
          <Grid item xs={10}>
            <Grid
              container
              spacing={3}
            >
            {
              data.map((item,index)=>{
                return(
                  <DashboardItem service={item.service} value={item.value} key={index}/>
                )
              })
            }
            </Grid>
          </Grid>
        </Grid>
      </Stack>
    </>
  );
}

export default Dashboard;
