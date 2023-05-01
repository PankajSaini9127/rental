import { Alert, Box, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//css
import "../../assest/CSS/hamburgerMenu.css";

import HamburgerMenu from "../HamburgerMenu";
import { DashboardItem, MyHeader } from "../StyledComponent";
import { getMetaData } from "../../Services/Services";
import { useSelector } from "react-redux";
import HamburgerManager from "./HamburgerManager";

function Dashboard() {
  const navigate = useNavigate();
  const [meta, setMeta] = useState({
    totalAgreement: 0,
    Pending: 0,
    Approved: 0,
    Renewal: 0,
  });

  const { auth } = useSelector((s) => s);

  async function getMetaDatas() {
    const metaData = await getMetaData();
    // console.log(metaData)
    setMeta(metaData.data);
  }

  // console.log("dashboars")

  useEffect(() => {
    getMetaDatas();
  }, []);

  const data = [
    {
      service: "Total Agreement",
      value: meta.totalAgreement,
      onClick: () => navigate("/listing/total-ag"),
    },
    {
      service: "Pending Approval",
      value: meta.Pending,
      onClick: () => navigate("/listing/in-procces-ag"),
    },
    {
      service: "Approved Agreement",
      value: meta.Approved,
      onClick: () => navigate("/listing/approved-ag"),
    },
    {
      service: "Renewal Agreements",
      value: meta.Renewal,
      onClick: () => navigate("/renewal"),
    },
  ];

  return (
    <>
      <Stack sx={{ flexWrap: "noWrap", flexDirection: "row" }}>
        {/* <HamburgerMenu
          navigateHome={"dashboard"}
          handleListing={() => navigate("/listing")}
          monthlyRent={() => navigate("/monthly-payment")}
          renewal={() => navigate(`/renewal`)}
          monthlyBtn="true"
        /> */}
        <HamburgerManager />
        {/* dashboard content */}
        {/* <ManagerHome/> */}
        <Grid container sx={{ justifyContent: "center" }}>
          {/* ??manager home */}

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
                    onClick={item.onClick}
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

export default Dashboard;
