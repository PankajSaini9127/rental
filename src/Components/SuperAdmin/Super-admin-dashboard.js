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
import { useSelector } from "react-redux";
import moment from "moment";
import AdminHamburgerMenu from "./AdminHamburgerMenu";
function SuperAdminDashboard() {
  const [metaData, setMeta] = useState({});
  const [graphData, setGraphData] = useState({});
  const [monthList, setMonthList] = useState([]);
  const [no_of_agreements, setNo_of_agreements] = useState([]);
  const [total_deposit, setTotal_deposit] = useState([]);
  const [total_rent, setTotal_rent] = useState([]);

  useEffect(() => {
    getMetaData();
    (async () => {
      const data = await graphReports();
      setGraphData(data);
      if (data) {
        data.no_of_agreements.map((val) => {
          setMonthList((monthList) => [...monthList, val.month]);
          setNo_of_agreements((no_of_agreement) => [
            ...no_of_agreement,
            val.no_of_agreement,
          ]);
        });
        data.total_deposit.map((val) => {
          setTotal_deposit((total_deposit) => [
            ...total_deposit,
            val.total_deposit,
          ]);
        });
        data.total_rent.map((val) => {
          setTotal_rent((total_rent) => [...total_rent, val.total_rent]);
        });
      }
    })();
  }, []);

  const reports = [
    {
      report: "No of agreements",
      datasets: {
        labels: monthList,
        datasets: [
          {
            label: "No of Agreement",
            data: no_of_agreements,
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
    plugins: { legend: { position: "top" } },
  };

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
