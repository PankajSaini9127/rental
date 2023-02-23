import { Grid, Stack, Typography } from "@mui/material";
import React from "react";

//css
import "../assest/CSS/dashboard.css";

import HamburgerMenu from "./HamburgerMenu";
import { DashboardItem, MyHeader } from "./StyledComponent";

function Dashboard() {
  return (
    <>
      <MyHeader>Dashboard</MyHeader>

      <Stack sx={{ flexWrap: "noWrap", flexDirection: "row" }}>
        <HamburgerMenu />

        {/* dashboard content */}
        <Grid container sx={{ justifyContent: "center" }}>
          <Grid item xs={10}>
            <Grid
              container
              spacing={4}
            >
              <DashboardItem service="Total Agreement" value="10" />
              <DashboardItem service="Pending Approval" value="5" />
              <DashboardItem service="Approved Agreement" value="5" />
              <DashboardItem service="Rejected Agreements" value="0" />
              <DashboardItem service="Renewal Agreements" value="4" />
            </Grid>
          </Grid>
        </Grid>
      </Stack>
    </>
  );
}

export default Dashboard;
