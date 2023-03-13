import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react'
import { useNavigate } from 'react-router-dom';


const columns = [
   
    {
      field: "code",
      headerName: "Code",
      width: 130,
      type: "number",
      headerClassName: "dataGridHeader",
      headerAlign: "center",
    },
    {
      field: "name",
      headerName: "Name",
      width: 220,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
    },
    {
      field: "location",
      headerName: "Location",
      width: 220,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
    },
    {
      field: "manager",
      headerName: "Manager",
      width: 210,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
    },
    {
      field: "rentalAmount",
      headerName: "Rental Amount",
      width: 210,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
    },
    {
        field: "status",
        headerName: "Status",
        width: 160,
        headerClassName: "dataGridHeader",
        headerAlign: "center",
      },
  ];
  
 


function ManagerTable({rows}) {

  const navigate = useNavigate()

  const onRowsSelectionHandler = (ids) => {
    const selectRow = ids.map((id) => rows.find((row) => row.id === id));
    // console.log(selectRow)
      navigate('/srManagerApproval')
  };
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
        "& .allCell":{
          justifyContent:"center !important"          
        }

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
        onSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
      >

      </DataGrid>
    </Box>
    </>
  )
}

export default ManagerTable;