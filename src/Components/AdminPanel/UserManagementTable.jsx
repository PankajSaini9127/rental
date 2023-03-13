import { Box, Button, Grid, Switch } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react'

//icons
import EditIcon from '@mui/icons-material/Edit';

const activeBtn =()=>{
  return (
    <Switch
    onClick={(e) => {
      e.stopPropagation(); // don't select this row after clicking
    }}
    />
  )
}

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
      </Grid>
         
      
  )
}

const columns = [
   
    {
      field: "code",
      headerName: "Code",
      width: 80,
      type: "number",
      headerClassName: "dataGridHeader",
      headerAlign: "center",
    },
    {
      field: "name",
      headerName: "Name",
      width: 140,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
    },
    {
      field: "role",
      headerName: "Role",
      width: 110,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
    },
    {
      field: "supervisor",
      headerName: "Supervisor",
      width: 110,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
    },
    {
      field: "password",
      headerName: "Password",
      width: 110,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
    },
    {
      field: "email",
      headerName: "Email",
      width: 160,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
    },
    {
      field: "contactno",
      headerName: "Contact No.",
      width: 100,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
    },
    {
        field: "status",
        headerName: "Status",
        width: 120,
        headerClassName: "dataGridHeader",
        headerAlign: "center",
      },
    {
        field: "active",
        headerName: "Active/Inactive",
        width: 120,
        headerClassName: "dataGridHeader",
        headerAlign: "center",
        renderCell: activeBtn
      },
    {
        field: "actions",
        headerName: "Actions",
        width: 100,
        headerClassName: "dataGridHeader",
        headerAlign: "center",
        renderCell: renderDetailsButton
      },
  ];
  
 


function UserManagementTable({rows}) {
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
         if (parms.field === "status" && parms.row.status === "Active") {
           cellClass.push("green statusCell") ;
         } else if (
           parms.field === "status" &&
           parms.row.status === "Pending"
         ) {
           cellClass.push( "yellow statusCell") ;
         } else if (
           parms.field === "status" &&
           parms.row.status === "Inactive"
         ) {
           cellClass.push("red statusCell")  ;
         }
         cellClass.push('allCell')
         
         return(cellClass)

       }}

      >

      </DataGrid>
    </Box>
    </>
  )
}

export default UserManagementTable