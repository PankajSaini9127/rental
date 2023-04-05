import { Grid, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//css
import "../../assest/CSS/hamburgerMenu.css";

import HamburgerMenu from "../HamburgerMenu";
import { DashboardItem, MyHeader } from "../StyledComponent";
import { getMetaData } from "../../Services/Services";

function Dashboard() {
  const navigate = useNavigate();
  const [meta, setMeta] = useState({
    totalAgreement: 0,
    Pending: 0,
    Approved: 0,
    Rejected: 0,
    Renewal: 0,
  });

  async function getMetaDatas() {
    const metaData = await getMetaData();
    // console.log(metaData)
    setMeta(metaData.data);
  }
  console.log(meta);

  // console.log("dashboars")

  useEffect(() => {
    getMetaDatas();
  }, []);

  const data = [
    { service: "Total Agreement", value: meta.totalAgreement },
    { service: "Pending Approval", value: meta.Pending },
    { service: "Approved Agreement", value: meta.Approved },
    { service: "Rejected Agreements", value: meta.Rejected },
    { service: "Renewal Agreements", value: meta.Renewal },
  ];

  return (
    <>
      

      <Stack sx={{ flexWrap: "noWrap", flexDirection: "row" }}>
        <HamburgerMenu
          navigateHome={"dashboard"}
          handleListing={() => navigate("/listing")}
          monthlyRent={() => navigate("/monthly-payment")}
          renewal={() => navigate(`/renewal`)}
          monthlyBtn="true"
        />

        {/* dashboard content */}
        <Grid container sx={{ justifyContent: "center" }}>
          <Grid item xs={12}>

        <MyHeader>Dashboard</MyHeader>
          </Grid>
          <Grid item xs={10} sx={{mt:4}}>
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

export default Dashboard;
