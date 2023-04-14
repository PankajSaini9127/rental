import { Alert, Box, Button, Grid, Snackbar } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import config from '../../config.json'


import axios from 'axios'

//
import PermissionAlert from '../Manager/Alert';
import { get_monthaly_rent, get_monthly_rent, listMonthRent } from '../../Services/Services';
import UploadInvoice from './UploadInvoice';
 import { useSelector } from 'react-redux'; 


function DataTable() {

  const [data,setData] = useState([])

  const [open,setOpen] = useState(false);

  const [loading, setLoading] = useState(false)

  const {auth} = useSelector(state=>state)



  // api call for get data

  const APICALL = async()=>{
    setLoading(true)
    setData([])
    const result = await listMonthRent(auth.id)
   console.log(result)
    if(result.status === 200){
    //   const data = result.data.data.reverse();
   setData(result.data)
      setLoading(false)
    }
  }




  useEffect(()=>{
    APICALL()
  },[])

  const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];


 const row = data.map((item,index)=>{
  console.log(item.rent_date)

  return  {
    id: index + 1,
    landlord_name : item.landlord_name ,
    rent_amount : parseFloat(item.rent_amount).toFixed(2) ,
    rent_date : month[new Date(item.rent_date).getUTCMonth()] + " " + new Date(item.rent_date).getFullYear(),
    payment_date : item.payment_date || "---",
    share : item.share ,
    monthly_rent : item.monthly_rent ,
    code : item.code,
    location : item.location,
    gst : item.gst || "---",
    utr_no : item.utr_no || "---",
    status : item.status,
  }
 })


 const [invoiceDetails,setInvoiceDetails] = useState({
  invoiceNo: "",
  invoiceDate: "",
  rentAmount: "",
  gstAmount: "",
  totalAmount: "",
  invoice: "",
  invoice_file_name: "",
})


  const navigate = useNavigate()

  const onRowsSelectionHandler = (ids) => {
    
    const id = ids[0]
      // navigate(`/managerApproval/${id}`)
  };

  const gstUploadButton = (e) => {
    const id = e.id;

    return (
      <Button
        variant="contained"
        color="primary"
        size="small"
        style={{
          backgroundColor: "rgb(103 185 68 / 89%)",
          color: "white",
          fontSize: "12px",
          textTransform: "capitalize",
          // width:"100%"
        }}
        onClick={(e) => {
          e.stopPropagation(); // don't select this row after clicking
          // navigate(`/BHUapproval/${id}`);
          setOpen(true)
        }}
      >
        Upload 
      </Button>
    );
  };



  const columns = [
   
    {
      field: "code",
      headerName: "Code",
      width: 70,
      flex:1,
      type: "number",
      headerAlign: "center",
    },
    {
      field: "utr_no",
      headerName: "URT Number",
      width: 100,
      headerAlign: "center",
      flex:1

    },
    {
      field: "landlord_name",
      headerName: "Landlord Name",
      width: 100,
      headerAlign: "center",
      flex:1
    },
    {
      field: "location",
      headerName: "Location",
      width: 150,
      headerAlign: "center",
      flex:1

    },

    {
      field: "gst",
      headerName: "GST",
      width: 100,
      headerAlign: "center",
      flex:1

    },
    {
      field: "share",
      headerName: "Percentage Shear",
      width: 150,
      headerAlign: "center",
    },
    {
      field: "rent_date",
      headerName: "Rent Date",
      headerAlign: "center",
      flex:1
    },
    {
      field: "monthly_rent",
      headerName: "Month Rent",
      headerAlign: "center",
      flex:1
    },
    
    {
      field: "rent_amount",
      headerName: "Payable Amount",
      headerAlign: "center",
      flex:1
    },
    {
      field: "status",
      headerName: "Status",
      headerAlign: "center",
      flex:1
    },
    
  ];
  

  //form delete alert


function uploadInvoiceDetails(){
  console.log(invoiceDetails)
}

 
  return (
    <>
<UploadInvoice
        open={open}
        setOpen={setOpen}
        handleConfirm={uploadInvoiceDetails}
        value={invoiceDetails}
        setValue={setInvoiceDetails}
      />
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