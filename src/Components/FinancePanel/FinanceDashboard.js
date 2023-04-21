import { Grid, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";
import HamburgerMenu from "../HamburgerMenu";
import { DashboardItem, MyHeader } from "../StyledComponent";
import { useSelector } from "react-redux";

const data = [
  { service: "Total Approval Pending", value: 10 },
  { service: "Send Back To Manager", value: 5 },
  { service: "Approved Agreement", value: 5 },
  { service: "Rejected Agreements", value: 0 },
  { service: "Renewal Agreements", value: 4 },
];

function FinanceDashboard() {
  const navigate = useNavigate();
  const { auth } = useSelector((s) => s);

  return (
    <>
      <Stack sx={{ flexWrap: "noWrap", flexDirection: "row" }}>
        <HamburgerMenu
          navigateHome={"finance-dashboard"}
          handleListing={() => navigate("/finance-listing")}
          monthlyRent={() => navigate("/finance-monthly-rent")}
          renewal={() => navigate("/finance-monthly-rent")}
          monthlyBtn="true"
          renewalBTN="false"
        />

        {/* dashboard content */}
        <Grid container sx={{ justifyContent: "center" }}>
          <Grid
            item
            xs={12}
            sx={{ justifyContent: "space-between", display: "flex" }}
          >
            <MyHeader>Rental Management System</MyHeader>
            <Typography mt="15px" mr="15px" fontWeight="600">
              Welcome {auth.name}
            </Typography>
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
