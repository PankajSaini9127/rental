import { Grid, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HamburgerMenu from "../HamburgerMenu";
import { DashboardItem, MyHeader } from "../StyledComponent";
import { useSelector } from "react-redux";
import { getMetaData_SRM } from "../../Services/Services";
import SRMHamburger from "./SRMHAmburger";

function SrManagerDashboard() {
  const navigate = useNavigate();
  const { auth } = useSelector((s) => s);

  const [meta, setMeta] = useState({
    totalAgreement: 0,
    Pending: 0,
    Approved: 0,
    Renewal: 0,
    Send_Back: 0,
  });

  const data = [
    {
      service: "Total Agreement",
      value: meta.totalAgreement,
      onClick: () => navigate("/srManagerListing/total-ag"),
    },
    {
      service: "Pending Approval",
      value: meta.Pending,
      onClick: () => navigate("/srManagerListing/in-procces-ag"),
    },
    {
      service: "Approved Agreement",
      value: meta.Approved,
      onClick: () => navigate("/srManagerListing/approved-ag"),
    },
    {
      service: "Renewal Agreements",
      value: meta.Renewal,
      onClick: () => navigate("/srm-renewal-list"),
    },
  ];

  async function getMetaDatas(id) {
    try {
      const metaData = await getMetaData_SRM(id);
      setMeta(metaData.data);
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    getMetaDatas(auth.id);
  }, []);

  return (
    <>
      <Stack sx={{ flexWrap: "noWrap", flexDirection: "row" }}>
        <SRMHamburger />
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

export default SrManagerDashboard;
