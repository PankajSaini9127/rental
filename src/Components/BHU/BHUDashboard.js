import { Grid, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../App";
import HamburgerMenu from "../HamburgerMenu";
import { DashboardItem, MyHeader } from "../StyledComponent";
import { useSelector } from "react-redux";
import { getMetaData_BUH } from "../../Services/Services";

const data = [
  { service: "Total Approval Pending", value: 10 },
  { service: "Send Back To Manager", value: 5 },
  { service: "Approved Agreement", value: 5 },
  { service: "Rejected Agreements", value: 0 },
  { service: "Renewal Agreements", value: 4 },
];

function SrManagerDashboard() {
  const navigate = useNavigate();

  const { auth } = useSelector((s) => s);

  const [meta, setMeta] = useState({
    totalAgreement: 0,
    Pending: 0,
    Approved: 0,
    Renewal: 0,
    Send_Back:0
  });

  const data = [
    { service: "Total Agreement", value: meta.totalAgreement },
    { service: "Pending Approval", value: meta.Pending },
    { service: "Approved Agreement", value: meta.Approved },
    { service: "Renewal Agreements", value: meta.Renewal },
    { service: "Send Back Agreements", value: meta.Send_Back },
  ];


  async function getMetaDatas(id) {
    const metaData = await getMetaData_BUH(id);
    // console.log(metaData)
    setMeta(metaData.data);
  }

  // console.log("dashboars")

  useEffect(() => {
    getMetaDatas(auth.id);
  }, []);

  return (
    <>
      <Stack sx={{ flexWrap: "noWrap", flexDirection: "row" }}>
        <HamburgerMenu
          navigateHome={"BHUDashboard"}
          handleListing={() => navigate("/BHUListing")}
          // monthlyRent={() => navigate("/buh-monthly-rent")}
          // renewal={() => navigate("/buh-monthly-rent")}
          // monthlyBtn="true"
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
          <Grid item xs={10} sx={{ mt: 4 }}>
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

export default SrManagerDashboard;
