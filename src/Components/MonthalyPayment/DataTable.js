import { Alert, Box, Button, Grid, Snackbar } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import config from '../../config.json'


import axios from 'axios'

//
import PermissionAlert from '../Manager/Alert';
import { get_monthaly_rent, get_monthly_rent } from '../../Services/Services';
import UploadInvoice from './UploadInvoice';
 


function DataTable() {

  const [data,setData] = useState([])

  const [open,setOpen] = useState(false);

  const [loading, setLoading] = useState(false)




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
    rentalAmount:parseInt(Number((item.monthlyRent)/100)*Number(item.percentage)),
    gst:item.gstNo?item.gstNo: '-',
    utr:item.utr_number,
    month_of_rent:`${item.rent_month}-${item.rent_year}`,
    status:"Pending"
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
      width: 130,
      type: "number",
      headerClassName: "dataGridHeader",
      headerAlign: "center",
      flex:1
    },
    {
      field: "name",
      headerName: "Landlord Name",
      width: 230,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
      flex:1
    },
    {
      field: "month_of_rent",
      headerName: "Rent Month",
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
    },
    {
      field: "utr",
      headerName: "UTR Number",
      width: 200,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
      flex:1
    },
    {
      field: "gst",
      headerName: "GST Number",
      width: 200,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
      flex:1,
    },
    {
      field: "status",
      headerName: "Status",
      width: 200,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
      flex:1,
    },
    {
      field: "gst_certificate",
      headerName: "GST Details",
      width: 200,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
      flex:1,
      renderCell: gstUploadButton,
    }
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