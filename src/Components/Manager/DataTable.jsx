import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react'
import { useNavigate } from 'react-router-dom';


const columns = [
   
    {
      field: "code",
      headerName: "Code",
      width: 150,
      type: "number",
      headerClassName: "dataGridHeader",
      headerAlign: "center",
    },
    {
      field: "name",
      headerName: "Name",
      width: 250,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
    },
    {
      field: "location",
      headerName: "Location",
      width: 250,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
    },
    {
      field: "rentalAmount",
      headerName: "Rental Amount",
      width: 220,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
    },
    {
        field: "status",
        headerName: "Status",
        width: 180,
        headerClassName: "dataGridHeader",
        headerAlign: "center",
      },
  ];
  

  const row = [
    {
      id: 1,
      status: "Pending",
      code: 123,
      name: "John Doe",
      location:"Rajsthan",
      rentalAmount:10000,
    },
    {
      id: 2,
      status: "Approved",
      code: 123,
      name: "John Doe",
      location:"Rajsthan",
      rentalAmount:10000,
    },
    {
      id: 3,
      status: "Rejected",
      code: 123,
      name: "John Doe",
      location:"Rajsthan",
      rentalAmount:10000,
    },
    {
      id: 4,
      status: "Approved",
      code: 123,
      name: "John Doe",
      location:"Rajsthan",
      rentalAmount:10000,
    },
    {
      id: 5,
      status: "Approved",
      code: 123,
      name: "John Doe",
      location:"Rajsthan",
      rentalAmount:10000,
    },
    {
      id: 6,
      status: "Pending",
      code: 123,
      name: "John Doe",
      location:"Rajsthan",
      rentalAmount:10000,
    },
    {
      id: 7,
      status: "Rejected",
      code: 123,
      name: "John Doe",
      location:"Rajsthan",
      rentalAmount:10000,
    }
    
  ];
 


function DataTable() {

  const navigate = useNavigate()

  // const onRowsSelectionHandler = (ids) => {
  //   const selectRow = ids.map((id) => rows.find((row) => row.id === id));
  //   // console.log(selectRow)
  //     navigate('/ceoApproval')
  // };
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
          textAlign:"center !important",
          borderRadius:"10px !important",
          m:'auto',
          mx:6
        },
        "& .allCell":{
          justifyContent:"center !important"          
        }
      }}
    >
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={6}
        rowsPerPageOptions={[6]}
        checkboxSelection
        sx={{ color: "black !important",  minWidth:"50px" }}
        getCellClassName={(parms) => {
           let cellClass = []
          if (parms.field === "status" && parms.row.status === "Approved") {
            cellClass.push("green statusCell") ;
          } else if (
            parms.field === "status" &&
            parms.row.status === "Pending"
          ) {
            cellClass.push( "yellow statusCell") ;
          } else if (
            parms.field === "status" &&
            parms.row.status === "Rejected"
          ) {
            cellClass.push("red statusCell")  ;
          }
          cellClass.push('allCell')
          
          return(cellClass)

        }}
        // onSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
      >

      </DataGrid>
    </Box>
    </>
  )
}

export default DataTable;