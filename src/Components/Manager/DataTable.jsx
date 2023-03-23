import { Alert, AlertTitle, Box, Button, Grid, Snackbar } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { lazy, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import config from '../../config.json'


import axios from 'axios'

//icons
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect } from 'react';
import DeleteAlert from './DeleteAlert';

 

  const rows = [
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

  const [data,setData] = useState([])

  const [loading, setLoading] = useState(false)

  const [err,setErr] = useState({
    open:false,
    type:"",
    message:''
  })

  //altet close 
  const handleClose = ()=>{
      setErr(
        {
          open:false,
          type:"",
          message:''
        }
      )
  }

  // api call for get data

  const APICALL = async()=>{
    setLoading(true)
    setData([])
    const result = await axios.get(`${config.API_LIVE}/api/agreements`)

    if(result.status === 200){
      const data = result.data.data.reverse();
   setData(data)
      setLoading(false)
    }
  }

  // api for delete record
  const deleteAPI = async(id)=>{
    const deleteItem = await axios.delete(`${config.API_LIVE}/api/delAgreement/${id}`)
    if(deleteItem.data.success){
      setErr({
        open:true,
        type:"warning",
        message:deleteItem.data.message
      })
    }else{
      setErr({
        open:true,
        type:"error",
        message:deleteItem.data.message
      })
    }
  }


  useEffect(()=>{
    APICALL()
  },[])

 const row = data.map((item)=>{
  console.log(item)
  return  {
    id: item.id,
    status: item.status,
    code: item.code,
    name: item.leeseName,
    location:item.location,
    rentalAmount:item.monthlyRent,
  
  }
 })


  const navigate = useNavigate()

  const onRowsSelectionHandler = (ids) => {
    const id = ids[0]
      navigate(`/managerApproval/${id}`)
  };

  const renderDetailsButton = (e) => {
      const id = e.id;
  
    return (
        <Grid container>
          <Grid item md={6} sx={{color:"white !important"}}>
          <Button
                variant="contained"
                color="primary"
                size="small"
                style={{ backgroundColor:"#e3c739",color:"white",fontSize:"12px",textTransform:"capitalize" }}
                startIcon={<EditIcon />}
                onClick={(e) => {
                  e.stopPropagation(); // don't select this row after clicking
                  id && navigate(`/editAgreement/${id}`, {id})
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
              // deleteAPI(id)
              setDeleteAlert({open:true,id:id})
            }}
              sx={{fontSize:"12px",color:"white",backgroundColor:"red",textTransform:"capitalize"}}
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
  

  //form delete alert

const [deleteAlert, setDeleteAlert] = useState({open:false,id:''})

  const handleConfirm = ()=>{
    deleteAPI(deleteAlert.id)
    setDeleteAlert({open:false,id:''})
  }
 
  const handleCancel = ()=>{
      setDeleteAlert({open:false,id:''})
  }
  return (
    <>
<Snackbar open={err.open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical:"top", horizontal:"center" }}>
  <Alert onClose={handleClose} severity={err.type} sx={{ width: '100%' }}>
    {err.message}
  </Alert>
</Snackbar>

<DeleteAlert handleClose={handleCancel} handleConfirm={handleConfirm} open={ deleteAlert.open}/>

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
        loading={loading}
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

export default DataTable;