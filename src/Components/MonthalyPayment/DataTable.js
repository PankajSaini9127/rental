import { Alert, Box, Button, Checkbox, Grid, Snackbar } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import config from '../../config.json'


import axios from 'axios'

//
import PermissionAlert from '../Manager/Alert';
import { add_invoice, get_monthaly_rent, get_monthly_rent, listMonthRent, sendMonthyPaymentForword } from '../../Services/Services';
import UploadInvoice from './UploadInvoice';
import { useDispatch, useSelector } from 'react-redux';
import { setAlert, setRefreshBox } from '../../store/action/action';


function DataTable() {

  const [data, setData] = useState([])

  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false)

  const { auth ,refresh} = useSelector(state => state)



  // api call for get data

  const APICALL = async () => {
    setLoading(true)
    setData([])
    const result = await listMonthRent(auth.id)
    console.log(result)
    if (result.status === 200) {
      //   const data = result.data.data.reverse();
      setData(result.data)
      setLoading(false)
    }
  }




  useEffect(() => {
    APICALL()
  }, [refresh])

  const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


  const row = data.map((item, index) => {
    // console.log(item.rent_date)

    return {
      id: item.id,
      landlord_name: item.landlord_name,
      rent_amount: parseFloat(item.rent_amount).toFixed(2),
      rent_date: month[new Date(item.rent_date).getUTCMonth()] + " " + new Date(item.rent_date).getFullYear(),
      payment_date: item.payment_date || "---",
      share: item.share,
      monthly_rent: item.monthly_rent,
      code: item.code,
      location: item.location,
      gst: item.gst || "---",
      utr_no: item.utr_no || "---",
      status: item.status,
      checkbox: item.status,
    }
  })


  const [invoiceDetails, setInvoiceDetails] = useState({
    invoiceNo: "",
    invoiceDate: "",
    rentAmount: "",
    gstAmount: "",
    totalAmount: "",
    invoice: "",
    invoice_file_name: "",
    manager_id: auth.id
  })

  const dispatch = useDispatch()

  const navigate = useNavigate()


  const [selectID, setSelectID] = useState(0)

  const gstUploadButton = (e) => {
    const id = e.id;
    // console.log(">>>>>>",e.row.code)
    const code = e.row.code;

    return (
      <>
      <Grid container spacing={5}>

      
        {
          (e.row.status === "Hold" || e.row.status === "Pending") && (
            <Grid item xs={6}>
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
            </Button>
            </Grid>
            )
        }
        {
          (e.row.status === "Sent Back From Sr Manager"|| 
          e.row.status === "Sent Back From Operations" || 
          e.row.status === "Sent Back From Finance" )&& (
            <Grid item xs={6}>
            <Button
            variant="contained"
            size="small"
            style={{
              backgroundColor: "#97999c",
              color: "white",
              fontSize: "12px",
              textTransform: "capitalize",
              // width:"100%"
            }}
            onClick={(e) => {
              e.stopPropagation(); // don't select this row after clicking
              navigate(`/monthly-payment-edit/${id}`)
            }}
          >
            Edit
          </Button>
          </Grid>
          )
        }
        <Grid item xs={6}>
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
                navigate(`/monthly-payment-view/${code}`);
                // setSelectID(id)
                // setOpen(true)

              }}
            >
              View
            </Button>
            </Grid>
            </Grid>
      </>

    );
  };

  const [ids, setIds] = useState([]);
  console.log(ids)

  const handleSwitch = (e) => {

    let idVar = Number(e.target.name)
    if (ids.includes(idVar)) {
      // console.log("out");
      setIds(ids.filter((i) => i !== idVar));
    } else {
      // console.log("in", idVar, ids);
      setIds([...ids, idVar]);
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
          {/* {console.log(ids.includes(params.id))} */}
          {params.formattedValue === "Pending" ? (
            <Checkbox
              onChange={handleSwitch}
              name={params.id}
              checked={ids.includes(params.id) ? true : false}
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
      flex: 1,
      width: 50,
      type: "number",
      headerAlign: "center",
    },
    {
      field: "rent_date",
      headerName: "Rent Date",
      headerAlign: "center",
      flex: 1,
      width:70
    },
    {
      field: "landlord_name",
      headerName: "Landlord Name",
      headerAlign: "center",
      flex: 1,
      width: 100,
    },
    {
      field: "location",
      headerName: "Location",
      headerAlign: "center",
      flex: 1,
      width: 100,

    },
    {
      field: "gst",
      headerName: "GST",
      headerAlign: "center",
      flex: 1,
      width: 120,

    },
    {
      field: "monthly_rent",
      headerName: "Month Rent",
      headerAlign: "center",
      // flex: 1,
      width:100
    },
    {
      field: "share",
      headerName: "Percentage Share",
      headerAlign: "center",
      width: 90,
    },
    {
      field: "rent_amount",
      headerName: "Payable Amount",
      headerAlign: "center",
      flex: 1,
       width:100
    },
    {
      field: "status",
      headerName: "Status",
      headerAlign: "center",
      // flex: 1,
      width: 200,
    },
    {
      field: "utr_no",
      headerName: "UTR Number",
      headerAlign: "center",
      flex: 1,
      width: 150,

    },
    {
      field: "action",
      headerName: "Action",
      headerAlign: "center",
      // flex: 1,
      width:130,
      renderCell: gstUploadButton
    }

  ];


  //form delete alert


  async function uploadInvoiceDetails() {

    try {
      const addInvoice = await add_invoice(selectID, invoiceDetails)

      console.log(addInvoice)

      if (addInvoice.data.success) {
        dispatch(setAlert({ open: true, variant: "success", message: "Invoice Details Submited & Sent To Manger" }))
        dispatch(setRefreshBox())
        setOpen(false)
      } else {
        dispatch(setAlert({ open: true, variant: "error", message: "Some Error Occured Please Try Again Later." }))
      }
    } catch (error) {
      console.log(error)
      dispatch(setAlert({ open: true, variant: "error", message: "Something Went Wrong Please Try Again Later." }))
    }

  }

 function handleHold (){
  ids.map(async(id)=>{
    const send = await sendMonthyPaymentForword(id,{status:"Hold",manager_id:auth.id})
    console.log(send.data.success)
   if(send.data.success){
    dispatch(setAlert({open:true,variant:"success",message:"Payment Details Set On Hold."}))
    dispatch(setRefreshBox())
    //  navigate(-1)
   }else{
    dispatch(setAlert({open:true,variant:"error",message:"Something Went Wrong Please Try Again Later."}))
   }
  })
  
}


  return (
    <>
     {ids.length > 0 && (
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            sx={{ textTransform: "capitalize", m: 1, mx: 3 }}
            onClick={() => {handleHold()}}
          >
            Hold
          </Button>
        </Box>
      )}
      <UploadInvoice
        open={open}
        // setOpen={setOpen}
        handleClose={() => setOpen(false)}
        handleConfirm={uploadInvoiceDetails}
        value={invoiceDetails}
        setValue={setInvoiceDetails}
      />
      <Box
        sx={{
          height: "430px",
          px: 2,
          overflow:"auto",
          "& .dataGridHeader": {
            color: "#CACACA",
            textAlign: 'left'
          },
          "& .green": {
            backgroundColor: "#E7FFE9",
            color: "#41CF2A"
          },
          "& .yellow": {
            backgroundColor: "#FEFFC8",
            color: "#C5C05B"
          },
          "& .red": {
            backgroundColor: "#FFEBE7",
            color: "#CF482A"
          },
          "& .statusCell": {
            maxHeight: "30px !important",
            minHeight: "25px !important",
            textAlign: "center !important",
            borderRadius: "10px !important",
            my: 1
          },
          "& .allCell": {
            justifyContent: "center !important"
          }
        }}
      >
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={6}
          rowsPerPageOptions={[6]}
          loading={loading}
          sx={{ color: "black !important", minWidth: "50px" }}
          getCellClassName={(parms) => {
            let cellClass = []
            if (parms.field === "status" && (parms.row.status === "Paid")) {
              cellClass.push("green statusCell");
            } else if (
              parms.field === "status" &&
              (parms.row.status === "Pending" ||parms.row.status === "Hold" || parms.row.status === "Sent To Sr Manager" || parms.row.status === "Sent To Operations" || parms.row.status === "Sent To Finance")
            ) {
              cellClass.push("yellow statusCell");
            } else if (
              parms.field === "status" &&
              (parms.row.status === "Sent Back From Sr Manager"  || parms.row.status === "Sent Back From BUH" ||
              parms.row.status === "Sent Back From Operations" || parms.row.status === "Sent Back From Finance"
              )
            ) {
              cellClass.push("red statusCell");
            }
            cellClass.push('allCell')

            return (cellClass)

          }}
        >

        </DataGrid>
      </Box>
    </>
  )
}

export default DataTable;