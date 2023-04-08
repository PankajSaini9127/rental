import { Grid } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";
import HamburgerMenu from "../HamburgerMenu";
import { DashboardItem, MyHeader } from "../StyledComponent";

const data = [
  { service: "Total Approval Pending", value: 10 },
  { service: "Send Back To Manager", value: 5 },
  { service: "Approved Agreement", value: 5 },
  { service: "Rejected Agreements", value: 0 },
  { service: "Renewal Agreements", value: 4 },
];

function FinanceDashboard() {
  const navigate = useNavigate();

  return (
    <>
      <Stack sx={{ flexWrap: "noWrap", flexDirection: "row" }}>
        <HamburgerMenu
          navigateHome={"finance-dashboard"}
          handleListing={() => navigate("/finance-listing")}
        />

        {/* dashboard content */}
        <Grid container sx={{ justifyContent: "center" }}>
          <Grid item xs={12}>
            <MyHeader>Rental Management System</MyHeader>
          </Grid>
          <Grid item xs={10} sx={{ mt: 2 }}>
            <Grid container spacing={4}>
              {data.map((item, index) => {
                return (
                  <DashboardItem
                    service={item.service}
                    value={item.value}
                    key={index}
                  />
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </Stack>
    </>
  );
}

export default FinanceDashboard;
