import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react'
import { useNavigate } from 'react-router-dom';


const columns = [
   
    {
      field: "code",
      headerName: "Code",
      width: 110,
      type: "number",
      headerClassName: "dataGridHeader",
      headerAlign: "center",
    },
    {
      field: "name",
      headerName: "Name",
      width: 190,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
    },
    {
      field: "location",
      headerName: "Location",
      width: 190,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
    },
    {
      field: "manager",
      headerName: "Manager",
      width: 170,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
    },
    {
        field: "srManger",
        headerName: " Sr Manager",
        width: 170,
        headerClassName: "dataGridHeader",
        headerAlign: "center",
      },
    {
      field: "rentalAmount",
      headerName: "Rental Amount",
      width: 190,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
    },
    {
        field: "status",
        headerName: "Status",
        width: 130,
        headerClassName: "dataGridHeader",
        headerAlign: "center",
      },
  ];
  
 


function FinanceTable({rows}) {

  const navigate = useNavigate()

  return (
    <>
      <Box
      sx={{
        height: "430px",
        px: 2,
        "& .dataGridHeader": {
          color: "#CACACA",
          textAlign:'left'
        },
        "& .green": {
         backgroundColor: "#E7FFE9",
         color:"#41CF2A"
        },
        "& .yellow": {
          backgroundColor: "#FEFFC8",
          color:"#C5C05B"
        },
        "& .red": {
          backgroundColor: "#FFEBE7",
          color:"#CF482A"
        },
        "& .statusCell":{
          maxWidth:"92px !important",
          minWidth:"92px !important",
          maxHeight:"30px !important",
          minHeight:"25px !important",
          alignSelf:"center",
          mx:"20px !important",
          textAlign:"center !important",
          borderRadius:"10px !important"
        },

      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={6}
        rowsPerPageOptions={[6]}
        checkboxSelection
        sx={{ color: "black !important",  minWidth:"50px" }}
        getCellClassName={(parms) => {
         
          if (parms.field === "status" && parms.row.status === "Approved") {
            return "green statusCell";
          } else if (
            parms.field === "status" &&
            parms.row.status === "Pending"
          ) {
            return "yellow statusCell";
          } else if (
            parms.field === "status" &&
            parms.row.status === "Rejected"
          ) {
            return "red statusCell";
          }
        }}
      >

      </DataGrid>
    </Box>
    </>
  )
}

export default FinanceTable;