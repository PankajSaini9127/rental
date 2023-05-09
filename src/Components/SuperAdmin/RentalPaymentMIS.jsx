import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { MyHeader } from "../StyledComponent";
import { excelDownload, getMisReports } from "../../Services/Services";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import FinanceHam from "../FinancePanel/FinanceHamburger";
import ManagerHam from "../Manager/HamburgerManager";
import SrMHam from "../SrManager/SRMHAmburger";
import OPHam from "../Operations/OperationsHamburger";
import AdminHamburgerMenu from "./AdminHamburgerMenu";
import BackButton from "../utility/BackButton";

const RentalPaymentMIS = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { auth } = useSelector((s) => s);

  const { role, isAuth } = auth;
  console.log({ startDate, endDate });

  const labelStyle = {
    fontSize: "20px",
    lineHeight: "30px",
    color: "var(--main-color)",
    fontWeight: "600",
    "@media(max-width:900px)": { fontSize: "10px" },
  };

  function onChange(e) {
    if (e.target.name === "start_date") {
      setStartDate(e.target.value);
    } else if (e.target.name === "end_date") {
      setEndDate(e.target.value);
    }
  }

  return (
    <>
      <Stack sx={{ flexWrap: "nowrap", flexDirection: "row" }}>
     
      {role.includes("Finance") && <FinanceHam />}
        {role.includes("Manager") && <ManagerHam />}
        {role.includes("Senior_Manager") && <SrMHam />}
        {role.includes("Operations") && <OPHam />}

        <Box sx={{ flexGrow: 1 }}>

        <BackButton/>
          <Grid
            container
            sx={{ flexDirection: "column", justifyContent: "center" }}
          >
            <Grid xs={12}>
              {" "}
              <MyHeader>Rental Management System</MyHeader>
              <Divider />
              <Grid
                container
                sx={{
                  px: 1,
                  justifyContent: "space-between",
                  my: 1,
                  alignItems: "center",
                }}
              >
                <Grid item xs={6}>
                  <Typography
                    variant="body1"
                    color="black"
                    fontSize="20px"
                    fontWeight="600"
                    alignSelf="center"
                    lineHeight="30px"
                    sx={{
                      "@media(max-width:600px)": {
                        fontSize: "17px",
                        lineHeight: "25px",
                      },
                    }}
                  >
                    Rent Paid Schedule
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={10} sx={{ display: "flex", mt: 4 }}>
              <FormControl fullWidth sx={{ mr: 4 }}>
                <FormLabel>
                  <Typography variant="body1" sx={labelStyle}>
                    Start Date
                  </Typography>
                </FormLabel>
                <input
                  type="date"
                  name="start_date"
                  value={startDate}
                  className="DatePicker"
                  onChange={(e) => onChange(e)}
                />
                <Typography
                  variant="caption"
                  sx={{ color: "red" }}
                ></Typography>
              </FormControl>
              <FormControl fullWidth>
                <FormLabel>
                  <Typography variant="body1" sx={labelStyle}>
                    End Date
                  </Typography>
                </FormLabel>
                <input
                  type="date"
                  name="end_date"
                  value={endDate}
                  className="DatePicker"
                  onChange={(e) => onChange(e)}
                />
                <Typography
                  variant="caption"
                  sx={{ color: "red" }}
                ></Typography>
              </FormControl>
            </Grid>
            <Button
              variant="contained"
              sx={{
                mt: 5,
                height: 45,
                width: 200,
                color: "#FFFFFF",
                borderRadius: "15px",
                textTransform: "capitalize",
              }}
              onClick={() => {
                excelDownload(
                  "mis/rental-payment-mis",
                  "rental-payment-mis",
                  startDate,
                  endDate
                );
              }}
            >
              Export
            </Button>
          </Grid>
        </Box>
      </Stack>
    </>
  );
};

export default RentalPaymentMIS;
