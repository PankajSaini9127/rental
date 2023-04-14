import { Alert, Box, Button, Checkbox, Grid, Snackbar } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import config from '../../config.json'


import axios from 'axios'

//
import PermissionAlert from '../Manager/Alert';
import { add_invoice, get_monthaly_rent, get_monthly_rent, listMonthRent } from '../../Services/Services';
import UploadInvoice from './UploadInvoice';
 import { useDispatch, useSelector } from 'react-redux'; 
import { setAlert } from '../../store/action/action';


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
  // console.log(item.rent_date)

  return  {
    id: item.id,
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
    checkbox: item.status,
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
  manager_id:auth.id
})

const dispatch = useDispatch()

  const navigate = useNavigate()

  const onRowsSelectionHandler = (ids) => {
    
    const id = ids[0]
      // navigate(`/managerApproval/${id}`)
  };

  const [selectID,setSelectID] = useState(0)

  const gstUploadButton = (e) => {
    const id = e.id;

    return (
      <>
      {
        e.row.status === "Hold" && (
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
            setSelectID(id)
            setOpen(true)
          }}
        >
          Upload 
        </Button>)
      }
      </>
      
    );
  };

  const [ids, setIds] = useState([]);
  console.log(ids)

  const handleSwitch = (e) => {
    console.log(ids.includes(e.target.name));
    console.log(ids);
    if (ids.includes(e.target.name)) {
      console.log("out");
      setIds(ids.filter((i) => i !== e.target.name));
    } else {
      console.log("in", e.target.name, ids);
      setIds([...ids, e.target.name]);
    }
  };



  const columns = [
    {
      field: "checkbox",
      width: 20,

      type: "number",
      headerClassName: "dataGridHeader",
      headerAlign: "center",
      renderCell: (params) => (
        <>
        {console.log(ids.includes(params.id))}
          {params.formattedValue === "Hold" ? (
            <Checkbox
              onChange={handleSwitch}
              name={params.id}
              checked={ids.includes(params.id)?true:false}
            />
          ) : (
            <Checkbox disabled={true} />
          )}
        </>
      ),
    },
   
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
      headerName: "UTR Number",
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
      headerName: "Percentage Share",
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
      width:200,
      flex:1
    },
    {
      field: "action",
      headerName: "Action",
      headerAlign: "center",
      flex:1,
      renderCell:gstUploadButton
    }
    
  ];
  

  //form delete alert


async function uploadInvoiceDetails(){
 
  try {
    const addInvoice = await add_invoice(selectID,invoiceDetails)

    console.log(addInvoice)

    if(addInvoice.data.success){
      dispatch(setAlert({open:true,variant:"success",message:"Invoice Details Submited & Sent To Manger"}))
      setOpen(false)
    }else{
      dispatch(setAlert({open:true,variant:"error",message:"Some Error Occured Please Try Again Later."}))
    }
  } catch (error) {
    console.log(error)
    dispatch(setAlert({open:true,variant:"error",message:"Something Went Wrong Please Try Again Later."}))
  }
    
      }



 
  return (
    <>
<UploadInvoice
        open={open}
        // setOpen={setOpen}
        handleClose={()=>setOpen(false)}
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
          maxHeight:"30px !important",
          minHeight:"25px !important",
          textAlign:"center !important",
          borderRadius:"10px !important",
          my:1
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
        sx={{ color: "black !important",  minWidth:"50px" }}
        getCellClassName={(parms) => {
           let cellClass = []
          if (parms.field === "status" && parms.row.status === "Approved") {
            cellClass.push("green statusCell") ;
          } else if (
            parms.field === "status" &&
           ( parms.row.status === "Hold"|| parms.row.status === "Sent To Sr Manager"|| parms.row.status === "Sent To Operations"|| parms.row.status === "Sent To Finance")
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
      >

      </DataGrid>
    </Box>
    </>
  )
}

export default DataTable;