import { Box, Button, Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react'
import { useNavigate } from 'react-router-dom';

//icons
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const renderDetailsButton = () => {
  return (
      <Grid container>
        <Grid item md={6}>
        <Button
              variant="contained"
              color="primary"
              size="small"
              style={{ backgroundColor:"#C5C05B",fontSize:"12px",textTransform:"capitalize" }}
              startIcon={<EditIcon />}
              onClick={(e) => {
                e.stopPropagation(); // don't select this row after clicking
              }}
          >
              Edit
          </Button>          
        </Grid>
        <Grid item md={6}>
          <Button
           variant="contained"
           size="small"
           startIcon={<DeleteIcon />}
           onClick={(e) => {
            e.stopPropagation(); // don't select this row after clicking
          }}
            sx={{fontSize:"12px",backgroundColor:"#CF482A",textTransform:"capitalize"}}
          >
            Delete
          </Button>
        </Grid>
      </Grid>
         
      
  )
}

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
      width: 230,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
    },
    {
      field: "location",
      headerName: "Location",
      width: 230,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
    },
    {
      field: "rentalAmount",
      headerName: "Rental Amount",
      width: 200,
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
    {
        field: "action",
        headerName: "Action",
        width: 200,
        headerClassName: "dataGridHeader",
        headerAlign: "center",
        renderCell: renderDetailsButton
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