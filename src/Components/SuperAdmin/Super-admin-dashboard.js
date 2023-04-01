import { Box, Grid, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { meta } from "../../Services/Services";
import { DashboardItem, MyHeader } from "../StyledComponent";
import AdminHamburgerMenu from "../AdminPanel/AdminHamburgerMenu";

function SuperAdminDashboard() {
  const [metaData, setMeta] = useState({});

  useEffect(() => {
    getMetaData();
  }, []);

  async function getMetaData() {
    let response = await meta();

    if (response) {
      setMeta(response.data);
    }
  }

  return (
    <>
      <MyHeader>User Dashboard</MyHeader>
      <Stack sx={{ flexWrap: "nowrap", flexDirection: "row" }}>
      <AdminHamburgerMenu
          navigateListing={"/super-admin-listing"}
          navigateHome={"/super-admin-dashboard"}
        />

        <Box sx={{ flexGrow: 1 }}>
          <Grid container sx={{ justifyContent: "center" }}>
            <Grid item md={10}>
              <Grid container spacing={3}>
                <DashboardItem
                  service="Total Sr Manager"
                  value={metaData.Senior_Manager}
                />
                <DashboardItem
                  service="Total Manager"
                  value={metaData.Manager}
                />
                <DashboardItem
                  service="Total Operation"
                  value={metaData.Operations}
                />
                <DashboardItem service="Total BHU" value={metaData.BHU} />
                <DashboardItem
                  service="Total Finance"
                  value={metaData.Finance}
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </>
  );
}

export default SuperAdminDashboard;
