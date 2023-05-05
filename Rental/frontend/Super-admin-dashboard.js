import { Box, Grid, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { excelDownload, graphReports, meta } from "../../Services/Services";
import { DashboardItem, MyHeader } from "../StyledComponent";
import AdminHamburgerMenu from "../AdminPanel/AdminHamburgerMenu";
import { useSelector } from "react-redux";
import moment from "moment";

function SuperAdminDashboard() {
  const [metaData, setMeta] = useState({});
  const [graphData, setGraphData] = useState([]);

  let monthList = [];
  let no_of_agreement = [];
  let total_deposit = [];
  let total_rent = [];

  graphData.map((val) => {
    monthList = [...monthList, val.month];
    no_of_agreement = [...no_of_agreement, val.no_of_agreement];
    total_deposit = [...total_deposit, val.total_deposit];
    total_rent = [...total_rent, val.total_rent];
  });

  const reports = [
    {
      report: "No of agreements",
      datasets: {
        labels: monthList,
        datasets: [
          {
            label: "No of Agreement",
            data: no_of_agreement,
            backgroundColor: "#0164AE",
          },
        ],
      },
    },
    {
      report: "Monthly rent",
      datasets: {
        labels: monthList,
        datasets: [
          {
            label: "Monthly rent",
            data: total_rent,
            backgroundColor: "#0164AE",
          },
        ],
      },
    },
    {
      report: "Monthly deposit",
      datasets: {
        labels: monthList,
        datasets: [
          {
            label: "Monthly deposit",
            data: total_deposit,
            backgroundColor: "#0164AE",
          },
        ],
      },
    },
  ];
  const date = moment().format("yyyy");
  const startDate = `${date}-04-01`;
  const endDate = `${moment(date).add(12, "M").format("YYYY")}-03-31`;

  const { auth } = useSelector((s) => s);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  const { role, isAuth, id } = auth;

  async function getMetaData() {
    let response = await meta();

    if (response) {
      setMeta(response.data);
    }
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  useEffect(() => {
    getMetaData();
    (async () => {
      const data = await graphReports();
      setGraphData(data.data);
    })();
  }, []);

  return (
    <>
      <Stack sx={{ flexWrap: "nowrap", flexDirection: "row" }}>
        <AdminHamburgerMenu
          navigateListing={"/super-admin-listing"}
          navigateHome={"/super-admin-dashboard"}
        />

        <Box sx={{ flexGrow: 1 }}>
          <Grid container sx={{ justifyContent: "center" }}>
            <Grid xs={12}>
              {" "}
              <MyHeader>Rental Management System</MyHeader>
            </Grid>
            <Grid
              item
              md={10}
              sx={{
                mt: 4,
                borderBottom: "1px solid dodgerBlue",
                paddingBottom: 5,
              }}
            >
              <Grid container spacing={4}>
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
            <Grid item md={10} sx={{ mt: 4 }}>
              <Grid
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                }}
              >
                {reports.map((val) => (
                  <div
                    style={{ width: 500, cursor: "pointer" }}
                    onClick={() => {
                      excelDownload(val.report, id, role, startDate, endDate);
                    }}
                  >
                    <Bar options={options} data={val.datasets} />
                  </div>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </>
  );
}

export default SuperAdminDashboard;
