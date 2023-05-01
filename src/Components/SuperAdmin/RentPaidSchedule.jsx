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
import { MyHeader, TextFieldWrapper } from "../StyledComponent";
import AdminHamburgerMenu from "../AdminPanel/AdminHamburgerMenu";
import { excelDownload, getMisReports } from "../../Services/Services";
import { useSelector } from "react-redux";
import moment from "moment";

const RentPaidSchedule = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [financialYear, setFinancialYear] = useState("");
  const [error, setError] = useState(false);
  const reports = "rent-paid-schedule";
  const { auth } = useSelector((s) => s);

  const { role, isAuth, id } = auth;

  console.log(startDate && endDate ? true : false);
  console.log({ startDate, endDate });

  const labelStyle = {
    fontSize: "20px",
    lineHeight: "30px",
    color: "var(--main-color)",
    fontWeight: "600",
    "@media(max-width:900px)": { fontSize: "10px" },
  };

  function getFinancialYearDates(financialYear) {
    const startDate = `${financialYear.split("-")[0]}-04-01`;
    const endDate = `${moment(financialYear.split("-")[0])
      .add(12, "M")
      .format("YYYY")}-03-31`;
    return { financialStartDate: startDate, financialEndDate: endDate };
  }

  function onChange(e) {
    if (e.target.name === "financialYear") {
      const regex = /^\d{4}-(\d{2})?$/;
      setFinancialYear(e.target.value);
      if (regex.test(e.target.value)) {
        const { financialStartDate, financialEndDate } = getFinancialYearDates(
          e.target.value
        );

        setStartDate(financialStartDate);
        setEndDate(financialEndDate);
        setError(false);
      } else {
        setError(true);
      }
    }
    if (e.target.name === "start_date") {
      setStartDate(e.target.value);
    } else if (e.target.name === "end_date") {
      setEndDate(e.target.value);
    }
  }

  return (
    <>
      <Stack sx={{ flexWrap: "nowrap", flexDirection: "row" }}>
        <AdminHamburgerMenu
          navigateListing={"/super-admin-listing"}
          navigateHome={"/super-admin-dashboard"}
        />

        <Box sx={{ flexGrow: 1 }}>
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
                    Rental Paid Schedule
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <br />
            <TextFieldWrapper
              label="Financial Year e.g 2022-23"
              placeHolder="Enter financial year e.g 2022-23"
              name="financialYear"
              maxLength={7}
              value={financialYear}
              onChange={(e) => onChange(e)}
              // index={i}
              error={
                error && "The value does not match the financial year pattern."
              }
            />
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
                excelDownload(reports, id, startDate, endDate);
              }}
              disabled={startDate && endDate ? false : true}
            >
              Export
            </Button>
          </Grid>
        </Box>
      </Stack>
    </>
  );
};

export default RentPaidSchedule;