import { Box, Button, FormControl, FormLabel, Grid, IconButton, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import HamburgerMenu from "../../HamburgerMenu";

import {
  DocumentUpload,
  MyHeader,
  TextFieldWrapper,
} from "../../StyledComponent";

import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { get_rent_data_ID, sendMonthyPaymentForword, uploadDoc } from "../../../Services/Services";
import { useDispatch, useSelector } from "react-redux";
import { setAlert, setRefreshBox } from "../../../store/action/action";
import { DataFieldStyle, DocumentView } from "../../StyleComponents/Rental";
import { SensorDoor } from "@mui/icons-material";

import moment from "moment"

export default function SRMMonthlyRentView() {
  const navigate = useNavigate();
  const { id } = useParams();

  console.log(id);

  const dispatch = useDispatch()

  const {auth} = useSelector(s=>s);

  const [remark, setRemark] = useState("");

  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

 async function fetchData(id){
      try {
        const response = await get_rent_data_ID(id)
        
        
        console.log(response.data.data[0].invoice_date)
        if(response.data.succes){
          setPredata({
            invoice:response.data.data[0].invoice,
            invoice_no:response.data.data[0].invoice_number,
            invoice_date:response.data.data[0].invoice_date,
            rent_amount:parseFloat(response.data.data[0].rent_amount).toFixed(2),
            gst_amount:response.data.data[0].gst_amount,
            total_amount:parseFloat(Number(response.data.data[0].rent_amount)+Number(response.data.data[0].gst_amount)).toFixed(2),
            status:response.data.data[0].status,
            dateMonth: month[new Date(response.data.data[0].rent_date).getUTCMonth()] +
          " " +
          new Date(response.data.data[0].rent_date).getFullYear(),
          remark :response.data.data[0].remark,
          paymentDate:new Date(response.data.data[0].payment_date).getDate() +" "+
          month[new Date(response.data.data[0].rent_date).getUTCMonth()]+ " "+
          new Date(response.data.data[0].payment_date).getFullYear()
          })
        }

      } catch (error) {
        console.log(error)
      }
 } 

useEffect(()=>{
  fetchData(id)
},[])

  const [preData, setPredata] = useState({
    invoice_no: "",
    invoice_date: "",
    rent_amount: "",
    gst_amount: "",
    total_amount: "",
    invoice: "",
    fileName:"",
    status:"",
    remark:"",
    paymentDate:""
  });

   async function handleSubmit(e) {
    if(remark.length > 0){
      try{
        const send = await sendMonthyPaymentForword(id,{status:"Sent To Operations",srm_id:auth.id,remark})
        console.log(send.data.success)
       if(send.data.success){
        dispatch(setAlert({open:true,variant:"success",message:"Payment Details Send To Opertaions Successfully."}))
         navigate(-1)
       }else{
        dispatch(setAlert({open:true,variant:"error",message:"Something Went Wrong Please Try Again Later."}))
       }
      }catch(error){
        console.log(error)
        dispatch(setAlert({open:true,variant:"error",message:"Something Went Wrong Please Try Again Later."}))
      }
    }else{
      dispatch(setAlert({open:true,variant:"error",message:"Remark Required."}))
    }
   
    
    // console.log(send)
  }

 async function handleSendBack() {
  if(remark.length > 0){
  try {
    const send = await sendMonthyPaymentForword(id,{status:"Sent Back From Sr Manager",remark})
   if(send.data.success){
    dispatch(setAlert({open:true,variant:"success",message:"Sent Back To Manager Successfully."}))
    dispatch(setRefreshBox())
     navigate(-1)
   }else{
    dispatch(setAlert({open:true,variant:"error",message:"Something Went Wrong Please Try Again Later."}))
   }
  } catch (error) {
    console.log(error)
    dispatch(setAlert({open:true,variant:"error",message:"Something Went Wrong Please Try Again Later."}))
  }
  }else{
  dispatch(setAlert({open:true,variant:"error",message:"Remark Required."}))
   }    
  }

  

  return (
    <>
      <Stack sx={{ flexDirection: "row", mb: 4 }}>
        {/* <a id="button"></a> */}

        <HamburgerMenu
          handleListing={() => navigate("/srManagerListing")}
          navigateHome={"srManagerDashboard"}
          monthlyRent={() => navigate("/srm-monthly-rent")}
          renewal={() => navigate("/srm-renewal-list")}
          monthlyBtn="true"
        />

        <Box sx={{ flexGrow: 1 }}>
        <Grid
            item
            xs={12}
            sx={{ justifyContent: "space-between", display: "flex" }}
          >
            <MyHeader>Rental Management System</MyHeader>
            <Typography mt="15px" mr="15px" fontWeight="600">
              Welcome {auth.name}
            </Typography>
          </Grid>
          <Box className="backButton">
            <IconButton
              variant="contained"
              color="primary"
              onClick={() => navigate(-1)}
              size={"large"}
            >
              <ArrowCircleLeftIcon
                sx={{ fontSize: "3rem" }}
                color="#FFFFF !important"
              />
            </IconButton>
          </Box>
          <Grid container sx={{ justifyContent: "center", mt: 3 }}>
                       {/* Basic Details */}
            <Grid item md={10}>
            <Grid container spacing={2} sx={{mb:2}}>
                <DataFieldStyle field={"Rent Month"} value={preData.dateMonth}/>
              </Grid>
               { preData.status === "Paid" &&
                <Grid container spacing={2} sx={{mb:2}}>
           <DataFieldStyle field={"Payment Date"} value={preData.paymentDate}/>
                  </Grid>
               }
 
     
              <Grid container spacing={2}>
                <TextFieldWrapper
                  required={true}
                  label="Invoice Number"
                  placeHolder="Enter Invoice Number"
                  value={preData.invoice_no}
                  disabled={true}
                  name="invoice_no"
                />
                {/* <TextFieldWrapper
                  required={true}
                  label="Invoice Date"
                  placeHolder="Enter Invoice Date"
                  value={preData.invoice_date}
                  disabled={true}
                  name="invoice_date"
                /> */}
                {/* <Grid item xs={6} md={4}>
              <FormControl fullWidth>
                <input
                  type="date"
                  name="invoiceDate"
                  value={preData.invoice_date}
                  className="DatePicker"
                  disabled
                  style={{height:'55px'}}
                />
              </FormControl>
            </Grid> */}
            <TextFieldWrapper
                  required={true}
                  label="Invoice Date"
                  placeHolder="Invoice Date"
                  // value={preData.invoice_date}
                  value={moment(preData.invoice_date).format("DD/MM/YYYY")}
                  disabled={true}
                  // name="rent_amount"
                  // textAlignRight={"textAlignRight"}
                  // onBlur={(e) => handleOnBlur(e, i)}
                  // error={ }
                />
                <TextFieldWrapper
                  required={true}
                  label="Rent Amount"
                  placeHolder="Enter Rent Amount"
                  value={parseInt(preData.rent_amount).toLocaleString()}
                  disabled={true}
                  name="rent_amount"
                  textAlignRight={"textAlignRight"}
                  // onBlur={(e) => handleOnBlur(e, i)}
                  // error={ }
                />
                <TextFieldWrapper
                  required={true}
                  label="GST Amount"
                  placeHolder="Enter GST AMount"
                  value={parseInt(preData.gst_amount).toLocaleString()}
                  disabled={true}
                  name="gst_amount"
                  textAlignRight={"textAlignRight"}
                  // onBlur={(e) => handleOnBlur(e, i)}
                  // error={ }
                />
                <TextFieldWrapper
                  required={true}
                  label="Total Amount"
                  placeHolder="Enter Total Amount"
                  value={parseInt(preData.total_amount).toLocaleString()}
                  disabled={true}
                  name="total_amount"
                  textAlignRight={"textAlignRight"}
                  // onBlur={(e) => handleOnBlur(e, i)}
                  // error={ }
                />
                
                  <Grid item xs={12} container spacing={2}>
                  <Grid item xs={4}>
                   <DocumentUpload
                      label="Invoice"
                      disabled={true}
                      placeHolder="Invoice"
                      name={"invoice"}
                      href={preData.invoice}
                    />
                    </Grid>
                </Grid>
                {
                  preData.remark.length >0 && <Grid item xs={12} container spacing={2} sx={{mt:4}}>
                  <DataFieldStyle field={"Remark"} value={preData.remark} />
                </Grid>
                }
                
              </Grid>
            </Grid>

            {/* Buttons start here*/}

            {preData.status === "Sent To Sr Manager" && (
              <>
                <Grid
                  item
                  xs={10}
                  sx={{ mt: 5 }}
                  className={"textFieldWrapper"}
                >
                  <Grid item xs={8}>
                    <TextField
                      type="text"
                      multiline
                      rows={3}
                      fullWidth
                      variant="outlined"
                      label="Remark *"
                      placeholder="Remark *"
                      value={remark}
                      onChange={(e) => setRemark(e.target.value)}
                    />
                  </Grid>
                </Grid>
                <Grid item md={8} sx={{ mt: 4, mb: 2 }}>
                  <Grid container spacing={1} sx={{ justifyContent: "center" }}>
                    <Grid item md={6} xs={11}>
                      <Button
                        variant="contained"
                        sx={{
                          height: "55px",
                          borderRadius: "12px",
                          backgroundColor: "primary",
                          width: "100%",
                          color: "#FFFFFF",
                          textTransform: "capitalize",
                          fontSize: "18px",
                          lineHeight: "20px",
                        }}
                        onClick={handleSubmit}
                      >
                         Send To Operations
                      </Button>
                    </Grid>
                    <Grid item md={6} xs={11}>
                      <Button
                        variant="outlined"
                        sx={{
                          height: "55px",
                          borderRadius: "12px",
                          width: "100%",
                          textTransform: "capitalize",
                          fontSize: "18px",
                        }}
                        onClick={handleSendBack}
                      >
                        Send Back To Manager
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </>
            )}

            {/* buttons end here */}
          </Grid>
        </Box>
      </Stack>
    </>
  );
}
