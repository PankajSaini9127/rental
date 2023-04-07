import { Alert, Box, Button, Grid, Snackbar } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import config from '../../config.json'


import axios from 'axios'

//
import PermissionAlert from '../Manager/Alert';
import { get_monthaly_rent, get_monthly_rent } from '../../Services/Services';
 


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
    const result = await get_monthaly_rent()
   console.log(result)
    if(result.status === 200){
    //   const data = result.data.data.reverse();
   setData(result.data.monthly_rent)
      setLoading(false)
    }
  }




  useEffect(()=>{
    APICALL()
  },[])

 const row = data.map((item)=>{
  // console.log(item)
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
      // navigate(`/managerApproval/${id}`)
  };



  const columns = [
   
    {
      field: "code",
      headerName: "Code",
      width: 130,
      type: "number",
      headerClassName: "dataGridHeader",
      headerAlign: "center",
      flex:1
    },
    {
      field: "name",
      headerName: "Name",
      width: 230,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
      flex:1
    },
    {
      field: "location",
      headerName: "Location",
      width: 230,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
      flex:1
    },
    {
      field: "rentalAmount",
      headerName: "Rental Amount",
      width: 200,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
      flex:1
    }
  ];
  

  //form delete alert

const [deleteAlert, setDeleteAlert] = useState({open:false,id:''})

  const handleConfirm = ()=>{
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

<PermissionAlert handleClose={handleCancel} handleConfirm={handleConfirm} open={ deleteAlert.open} message={"Are you sure you want to delete this item?"}/>

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
        // onSelectionModelChange={(ids) => {console.log(ids)}}
      >

      </DataGrid>
    </Box>
    </>
  )
}

export default DataTable;