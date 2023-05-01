import { Grid, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardItem, MyHeader } from "../StyledComponent";
import { useSelector } from "react-redux";
import { getMetaData_finance } from "../../Services/Services";
import FinanceHamburger from "./FinanceHamburger";

function FinanceDashboard() {
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
      onClick: () => navigate("/finance-listing/total-ag"),
    },
    {
      service: "Pending Approval",
      value: meta.Pending,
      onClick: () => navigate("/finance-listing/in-procces-ag"),
    },
    {
      service: "Approved Agreement",
      value: meta.Approved,
      onClick: () => navigate("/finance-listing/approved-ag"),
    }
  ];

  async function getMetaDatas(id) {
    const metaData = await getMetaData_finance(id);
    setMeta(metaData.data);
  }

  useEffect(() => {
    getMetaDatas(auth.id);
  }, []);

  return (
    <>
      <Stack sx={{ flexWrap: "noWrap", flexDirection: "row" }}>
        <FinanceHamburger />

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

export default FinanceDashboard;
