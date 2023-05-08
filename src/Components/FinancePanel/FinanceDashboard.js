import { Grid, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardItem, MyHeader } from "../StyledComponent";
import { useSelector } from "react-redux";
import {
  excelDownload,
  getMetaData_finance,
  graphReports,
} from "../../Services/Services";
import FinanceHamburger from "./FinanceHamburger";
import moment from "moment";
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

function FinanceDashboard() {
  const navigate = useNavigate();
  const { auth } = useSelector((s) => s);

  const [graphData, setGraphData] = useState([]);
  const [monthList, setMonthList] = useState([]);
  const [no_of_agreements, setNo_of_agreements] = useState([]);
  const [total_deposit, setTotal_deposit] = useState([]);
  const [total_rent, setTotal_rent] = useState([]);

  useEffect(() => {
    getMetaDatas(auth.id);
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

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: { legend: { position: "top" } },
  };
  const { role, isAuth, id } = auth;

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
    },
  ];

  async function getMetaDatas(id) {
    const metaData = await getMetaData_finance(id);
    setMeta(metaData.data);
  }

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
          <Grid
            item
            xs={10}
            sx={{
              mt: 4,
              borderBottom: "1px solid dodgerBlue",
              paddingBottom: 5,
            }}
          >
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
      </Stack>
    </>
  );
}

export default FinanceDashboard;
