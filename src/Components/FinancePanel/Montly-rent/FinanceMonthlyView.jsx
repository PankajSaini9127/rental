import { Box, Button, FormControl, Grid, IconButton, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import HamburgerMenu from "../../HamburgerMenu";

import {
  DocumentUpload,
  MyHeader,
  TextFieldWrapper,
} from "../../StyledComponent";

import moment from "moment"

import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { useDispatch, useSelector } from "react-redux";
import { DataFieldStyle, DocumentView } from "../../StyleComponents/Rental";
import { setAlert, setRefreshBox } from "../../../store/action/action";
import { get_rent_data_ID, sendMonthyPaymentForword } from "../../../Services/Services";

export default function FinanceMonthlyRentView() {
  const navigate = useNavigate();
  const { id } = useParams();

  console.log(id);

  const dispatch = useDispatch()

  const [remark, setRemark] = useState("");

  const {auth} = useSelector(s=>s)

  const [preData, setPredata] = useState({
    invoice_no: "",
    invoice_date: "",
    rent_amount: "",
    gst_amount: "",
    gst: "",
    total_amount: "",
    invoice: "",
    status:"",
    dateMonth:"",
    remark:"",
    paymentDate:""
  });

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

  async function fetchData(id) {
    try {
      const response = await get_rent_data_ID(id);

      console.log(response.data.data[0].invoice_number);
      if (response.data.succes) {
        setPredata({
          invoice: response.data.data[0].invoice,
          invoice_no: response.data.data[0].invoice_number,
          invoice_date:(response.data.data[0].invoice_date),
          rent_amount: parseFloat(response.data.data[0].rent_amount).toFixed(2),
          gst_amount: response.data.data[0].gst_amount,
          gst: response.data.data[0].gst,
          total_amount: parseFloat(
            Number(response.data.data[0].rent_amount) +
              Number(response.data.data[0].gst_amount)
          ).toFixed(2),
          status: response.data.data[0].status,
          dateMonth: month[new Date(response.data.data[0].rent_date).getUTCMonth()] +
          " " +
          new Date(response.data.data[0].rent_date).getFullYear(),
          remark: response.data.data[0].remark,
          paymentDate:new Date(response.data.data[0].payment_date).getDate() +" "+
          month[new Date(response.data.data[0].rent_date).getUTCMonth()]+ " "+
          new Date(response.data.data[0].payment_date).getFullYear()
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData(id);
  }, []);

  const today = new Date()
  console.log(today)

  async function handleSubmit(e) {
    try {
      const send = await sendMonthyPaymentForword(id,{status:"Approved By Finance",finance_id: auth.id,remark:remark})
      // console.log(send.data.success)
     if(send.data.success){
      dispatch(setAlert({open:true,variant:"success",message:"Approved Successfully."}))
      dispatch(setRefreshBox())
       navigate(-1)
     }else{
      dispatch(setAlert({open:true,variant:"error",message:"Something Went Wrong Please Try Again Later."}))
     }
    } catch (error) {
      console.log(error)
      dispatch(setAlert({open:true,variant:"error",message:"Something Went Wrong Please Try Again Later."}))
    }
  
    // console.log(send)
  }

  async function handleSendBack() {
    if(remark.length >0){
    try {
      const send = await sendMonthyPaymentForword(id,{status:"Sent Back From Finance",remark})
      console.log(send.data.success)
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
    dispatch(setAlert({open:true,variant:"error",message:"Remark Required !"}))
  }
      
    }

  return (
    <>
      <Stack sx={{ flexDirection: "row", mb: 4 }}>
        {/* <a id="button"></a> */}

        <HamburgerMenu
            navigateHome={"finance-dashboard"}
            handleListing={() => navigate("/finance-listing")}
            monthlyRent={() => navigate("/finance-monthly-rent")}
            renewal={() => navigate("/finance-monthly-rent")}
            monthlyBtn="true"
            renewalBTN="false"
          />

        <Box sx={{ flexGrow: 1 }}>
          <MyHeader>Rental Management System</MyHeader>
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
              
              {preData.gst !== null &&<>
                  <TextFieldWrapper
                    required={true}
                    label="Invoice Number"
                    placeHolder="Enter Invoice Number"
                    value={preData.invoice_no}
                    // disabled={true}
                    name="invoice_no"
                  />
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
                   {/* <Grid item xs={6} md={4}>
              <FormControl fullWidth>
                <input
                  type="date"
                  name="invoice_date"
                  value={preData.invoice_date}
                  className="DatePicker"
                  // disabled
                  style={{height:'55px'}}
                  
                />
              </FormControl>
            </Grid> */}
              </>}
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
                  textAlignRight={"textAlignRight"}
                  placeHolder="Enter Total Amount"
                  value={parseInt(preData.total_amount).toLocaleString()}
                  disabled={true}
                  name="total_amount"
                  // onBlur={(e) => handleOnBlur(e, i)}
                  // error={ }
                />
         {preData.gst !== null &&
                  <Grid item xs={8} container>
                    <DocumentUpload
                      uploaded={preData.invoice ? true : false}
                      label="Upload Invoice"
                      placeHolder="Upload Invoice"
                      name={"invoice"}
                      fileName={preData.fileName}
                      href={preData.invoice}
                    />
                  </Grid>}
                {
                  preData.remark.length >0 && <Grid item xs={12} container spacing={2} sx={{mt:4}}>
                  <DataFieldStyle field={"Remark"} value={preData.remark} />
                </Grid>
                }
              </Grid>
            </Grid>

            {/* Buttons start here*/}

            {preData.status === "Sent To Finance" && (
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
                    <Grid item md={5} xs={11}>
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
                        Approve
                      </Button>
                    </Grid>
                    <Grid item md={5} xs={11}>
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
