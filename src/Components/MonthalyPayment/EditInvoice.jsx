import { Box, Button, FormControl, Grid, IconButton, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import HamburgerMenu from "../HamburgerMenu";

import {
  DocumentUpload,
  MyHeader,
  TextFieldWrapper,
} from "../StyledComponent";

import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import {
  get_rent_data_ID,
  sendMonthyPaymentForword,
  uploadDoc,
} from "../../Services/Services";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../../store/action/action";
import { CloseFullscreen } from "@mui/icons-material";
import { DataFieldStyle } from "../StyleComponents/Rental";
import HamburgerManager from "../Manager/HamburgerManager";

export default function EditInvoice() {
  const navigate = useNavigate();
  const { id } = useParams();

  console.log(id);
  const { auth } = useSelector((s) => s);
  const dispatch = useDispatch();

  const [remark, setRemark] = useState("");

  const [formError, setError] = useState({
    invoice_no: "",
    invoice_date: "",
    rent_amount: "",
    gst_amount: "",
    total_amount: "",
    invoice: "",
    fileName: "",
  });

  const [preData, setPredata] = useState({
    invoice_no: "",
    invoice_date: "",
    gst : "",
    rent_amount: "",
    gst_amount: "",
    total_amount: 0,
    invoice: "",
    fileName: "",
    status: "",
    remark:""
  });


function getTotal (){
  let total = parseFloat(
    Number(preData.rent_amount) +
      Number(preData.gst_amount)
  ).toFixed(2)

  setPredata({...preData,total_amount:total})
}
console.log(  )

useEffect(()=>{
   getTotal()
},[preData.rent_amount,preData.gst_amount])

  function handleChange(e) {

    console.log(e)
    if(e.target.name === "invoice_date" || e.target.name === "invoice_no"){
      setPredata({
        ...preData,
        [e.target.name]: e.target.value,
      });
    }

    
    let error = false
    
    if (!e.target.value.match(/^[0-9]*$/))
     error = true

    if(!error)
    {
    setPredata({
      ...preData,
      [e.target.name]: e.target.value,
    });
  }
  }

  async function handleChangeFile(e) {
    const FD = new FormData();
    console.log(e.target.files[0]);
    FD.append("photo", e.target.files[0]);
    let response = await uploadDoc(FD);

    if (response.status === 200) {
      setError({ ...formError, [e.target.name]: "" });

      setPredata({
        ...preData,
        invoice: response.data.link,
        fileName: e.target.files[0].name,
      });
      dispatch(
        setAlert({
          open: true,
          variant: "success",
          message: response.data.message,
        })
      );
    } else {
      dispatch(
        setAlert({
          open: true,
          variant: "error",
          message: response.data.message || "Something went wrong !!!",
        })
      );
    }
  }

  async function fetchData(id) {
    try {
      const response = await get_rent_data_ID(id);

      console.log(response.data.data[0].invoice_number);
      if (response.data.succes) {
        setPredata({
          ...preData,
          invoice: response.data.data[0].invoice,
          invoice_no: response.data.data[0].invoice_number,
          invoice_date: response.data.data[0].invoice_date,
          rent_amount: parseFloat(response.data.data[0].rent_amount).toFixed(2),
          gst_amount: response.data.data[0].gst_amount,
          gst : response.data.data[0].gst,
          // total_amount: parseFloat(
          //   Number(response.data.data[0].rent_amount) +
          //     Number(response.data.data[0].gst_amount)
          // ).toFixed(2),
          status: response.data.data[0].status,
          remark : response.data.data[0].remark
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

 

  useEffect(() => {
    fetchData(id);
  }, []);

  async function handleSubmit(e) {
    const send = await sendMonthyPaymentForword(id, {
      status: preData.status === "Sent Back From Operations"?"Sent To Operations":"Sent To Sr Manager",
      op_id: auth.id,
      rent_amount:  preData.rent_amount ,
      gst_amount:   preData.gst_amount,
      invoice: preData.invoice,
      remark:""
    });
    console.log(send.data.success);
    if (send.data.success) {
      dispatch(
        setAlert({
          open: true,
          variant: "success",
          message: preData.status === "Sent Back From Operations"?"Payment Details Send To Operations Successfully.":"Payment Details Send To Sr Manager Successfully.",
        })
      );
      navigate(-1);
    } else {
      dispatch(
        setAlert({
          open: true,
          variant: "error",
          message: "Something Went Wrong Please Try Again Later.",
        })
      );
    }
    // console.log(send)
  }



  return (
    <>
      <Stack sx={{ flexDirection: "row", mb: 4 }}>
        {/* <a id="button"></a> */}

        {/* <HamburgerMenu
      navigateHome={'dashboard'}
          handleListing={()=>navigate('/listing')}
          monthlyRent={() => navigate("/monthly-payment")}
          renewal={() => navigate(`/renewal`)}
          monthlyBtn='true'
        /> */}

<HamburgerManager/>
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
          <Box component={"form"}>
            <Grid container sx={{ justifyContent: "center", mt: 3 }}>
              {/* Basic Details */}
              <Grid item md={10}>
                <Grid container spacing={2}>
                {console.log(preData.gst)}  
                {preData.gst.length > 0 &&<>
                  <TextFieldWrapper
                    required={true}
                    label="Invoice Number"
                    placeHolder="Enter Invoice Number"
                    value={preData.invoice_no}
                    // disabled={true}
                    onChange={(e) => handleChange(e)}
                    name="invoice_no"
                  />
                  {/* <TextFieldWrapper
                    required={true}
                    label="Invoice Date"
                    placeHolder="Enter Invoice Date"
                    value={preData.invoice_date}
                    // disabled={true}
                    onChange={(e) => handleChange(e)}
                    name="invoice_date"
                  /> */}
                   <Grid item xs={6} md={4}>
              <FormControl fullWidth>
                <input
                  type="date"
                  name="invoice_date"
                  value={preData.invoice_date}
                  className="DatePicker"
                  // disabled
                  style={{height:'55px'}}
                  onChange={(e) => handleChange(e)}
                  
                />
              </FormControl>
            </Grid>
              </>}
                  {/* <TextFieldWrapper
                    required={true}
                    label="Year"
                    placeHolder="Enter Invoice Date"
                    value={preData.invoice_date}
                    // disabled={true}
                    onChange={(e) => handleChange(e)}
                    name="invoice_date"
                  /> */}
 
                  <TextFieldWrapper
                    required={true}
                    label="Rent Amount"
                    placeHolder="Enter Rent Amount"
                    value={parseInt(preData.rent_amount).toLocaleString()}
                    onChange={(e) => handleChange(e)}
                    name="rent_amount"
                    disabled = {true}
                    textAlignRight={"textAlignRight"}
                    // onBlur={(e) => handleOnBlur(e, i)}
                    // error={ }
                  />
                  <TextFieldWrapper
                    required={true}
                    label="GST Amount"
                    placeHolder="Enter GST Amount"
                    value={parseInt(preData.gst_amount).toLocaleString()}
                    // onChange={(e) => handleChange(e)}
                    name="gst_amount"
                    textAlignRight={"textAlignRight"}
                    disabled={true}
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
                                    {preData.gst.length > 0 &&
                  <Grid item xs={8} container>
                    <DocumentUpload
                      uploaded={preData.invoice ? true : false}
                      label="Upload Invoice"
                      placeHolder="Upload Invoice"
                      handleChange={(e) => handleChangeFile(e)}
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

              {(preData.status === "Sent To Sr Manager"
                ||preData.status === "Sent Back From Sr Manager" 
                || preData.status === "Sent Back From Operations"
                || preData.status === "Sent Back From Finance"
              ) && (
                <>
                  {/* <Grid
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
                </Grid> */}
                  <Grid item md={8} sx={{ mt: 4, mb: 2 }}>
                    <Grid
                      container
                      spacing={1}
                      sx={{ justifyContent: "center" }}
                    >
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
                         {preData.status === "Sent Back From Operations"? " Send To Operations":" Send To Sr Manager"}
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </>
              )}

              {/* buttons end here */}
            </Grid>
          </Box>
        </Box>
      </Stack>
    </>
  );
}
