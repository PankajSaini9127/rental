import React from "react";

import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";

import "../assest/CSS/dataGrid.css";

const columns = [
  {
    field: "status",
    headerName: "Status",
    width: 130,
    headerClassName: "dataGridHeader",
    headerAlign: "center",
  },
  {
    field: "uid",
    headerName: "UID No.",
    width: 90,
    type: "number",
    headerClassName: "dataGridHeader",
    headerAlign: "center",
  },
  {
    field: "nameoflesse",
    headerName: "Name Of Lesses",
    width: 170,
    headerClassName: "dataGridHeader",
    headerAlign: "center",
  },
  {
    field: "state",
    headerName: "State",
    width: 170,
    headerClassName: "dataGridHeader",
    headerAlign: "center",
  },
  {
    field: "city",
    headerName: "City",
    width: 150,
    headerClassName: "dataGridHeader",
    headerAlign: "center",
  },
  {
    field: "location",
    headerName: "Location",
    width: 150,
    headerClassName: "dataGridHeader",
    headerAlign: "center",
  },
  {
    field: "lockinyear",
    headerName: "Lock In Year",
    width: 150,
    headerClassName: "dataGridHeader",
    headerAlign: "center",
  },
  {
    field: "depositamount",
    headerName: "Deposite Amount",
    width: 150,
    headerClassName: "dataGridHeader",
    headerAlign: "center",
  },
];

const rows = [
  {
    id: 1,
    status: "Pending",
    uid: 123,
    nameoflesse: "John Doe",
    state: "Rajsthan",
    city: "Jodhpur",
    location: "Location",
    lockinyear: 2,
    depositamount: 10000,
  },
  {
    id: 2,
    status: "Rejected",
    uid: 124,
    nameoflesse: "John Doe",
    state: "Rajsthan",
    city: "Jodhpur",
    location: "Location",
    lockinyear: 2,
    depositamount: 10000,
  },
  {
    id: 3,
    status: "Approved",
    uid: 125,
    nameoflesse: "John Doe",
    state: "Rajsthan",
    city: "Jodhpur",
    location: "Location",
    lockinyear: 2,
    depositamount: 10000,
  },
  {
    id: 4,
    status: "Rejected",
    uid: 126,
    nameoflesse: "John Doe",
    state: "Rajsthan",
    city: "Jodhpur",
    location: "Location",
    lockinyear: 2,
    depositamount: 10000,
  },
  {
    id: 5,
    status: "Approved",
    uid: 127,
    nameoflesse: "John Doe",
    state: "Rajsthan",
    city: "Jodhpur",
    location: "Location",
    lockinyear: 2,
    depositamount: 10000,
  },
  {
    id: 6,
    status: "Pending",
    uid: 128,
    nameoflesse: "John Doe",
    state: "Rajsthan",
    city: "Jodhpur",
    location: "Location",
    lockinyear: 2,
    depositamount: 10000,
  },
  {
    id: 7,
    status: "Approved",
    uid: 129,
    nameoflesse: "John Doe",
    state: "Rajsthan",
    city: "Jodhpur",
    location: "Location",
    lockinyear: 2,
    depositamount: 10000,
  },
  {
    id: 8,
    status: "Approved",
    uid: 120,
    nameoflesse: "John Doe",
    state: "Rajsthan",
    city: "Jodhpur",
    location: "Location",
    lockinyear: 2,
    depositamount: 10000,
  },
  {
    id: 9,
    status: "Pending",
    uid: 121,
    nameoflesse: "John Doe",
    state: "Rajsthan",
    city: "Jodhpur",
    location: "Location",
    lockinyear: 2,
    depositamount: 10000,
  },
  {
    id: 10,
    status: "Approved",
    uid: 122,
    nameoflesse: "John Doe",
    state: "Rajsthan",
    city: "Jodhpur",
    location: "Location",
    lockinyear: 2,
    depositamount: 10000,
  },
  {
    id: 11,
    status: "Approved",
    uid: 111,
    nameoflesse: "John Doe",
    state: "Rajsthan",
    city: "Jodhpur",
    location: "Location",
    lockinyear: 2,
    depositamount: 10000,
  },
];

function DataTable() {
  return (
    <Box
      sx={{
        height: "430px",
        px: 2,
        "& .dataGridHeader": {
          color: "#CACACA",
        },
        "& .statusCell": {
          color: "#41CF2A",
        },
        "& .green": {
          color: "green",
        },
        "& .yellow": {
          color: "yellow",
        },
        "& .red": {
          color: "red",
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={6}
        rowsPerPageOptions={[6]}
        checkboxSelection
        sx={{ color: "black !important" }}
        getCellClassName={(parms) => {
          if (parms.field === "status" && parms.row.status === "Approved") {
            return "green";
          } else if (
            parms.field === "status" &&
            parms.row.status === "Pending"
          ) {
            return "yellow";
          } else if (
            parms.field === "status" &&
            parms.row.status === "Rejected"
          ) {
            return "red";
          }
        }}
      />
    </Box>
  );
}

export default DataTable;
