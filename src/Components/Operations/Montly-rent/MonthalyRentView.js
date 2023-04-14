import { Box, Button, Grid, IconButton, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import HamburgerMenu from "../../HamburgerMenu";

import {
  DocumentUpload,
  MyHeader,
  TextFieldWrapper,
} from "../../StyledComponent";

import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { uploadDoc } from "../../../Services/Services";
import { useDispatch } from "react-redux";
import { setAlert } from "../../../store/action/action";

export default function MonthalyRentView() {
  const navigate = useNavigate();
  const { id } = useParams();

  console.log(id);

  const dispatch = useDispatch()

  const [remark, setRemark] = useState("");

  const [formError, setError] = useState({
    invoice_no: "",
    invoice_date: "",
    rent_amount: "",
    gst_amount: "",
    total_amount: "",
    invoice: "",
    fileName:""
  })

  const [preData, setPredata] = useState({
    invoice_no: "",
    invoice_date: "",
    rent_amount: "",
    gst_amount: "",
    total_amount: "",
    invoice: "",
    fileName:""
  });

  function handleChange(e) {
    setPredata({
      ...preData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleChangeFile(e) {
    const FD = new FormData();
    console.log(e.target.files[0]);
    FD.append("photo", e.target.files[0]);
    let response = await uploadDoc(FD);

    if (response.status === 200) {

      setError({...formError,[e.target.name]:""})


      setPredata({
    ...preData,
    invoice:response.data.link,
    fileName:e.target.files[0].name
  })
    dispatch(
        setAlert({
          open: true,
          variant: "success",
          message: response.data.message,
        })
      );
    
    }else{
        dispatch(
            setAlert({
              open: true,
              variant: "error",
              message: response.data.message || "Something went wrong !!!",
            })
          );
    }
  }

 
  function handleSubmit(e) {
    e.preventDefault();
  }

  function handleSendBack() {}

  ///dummy
  const status = "Sent To Operations";
  return (
    <>
      <Stack sx={{ flexDirection: "row", mb: 4 }}>
        {/* <a id="button"></a> */}

        <HamburgerMenu
          navigateHome={"operationsDashboard"}
          handleListing={() => navigate("/operationsListing")}
          monthlyRent={() => navigate("/opr-monthly-rent")}
          renewal={() => navigate("/opr-monthly-rent")}
          monthlyBtn="true"
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
        <Box component={'form'}>
          <Grid container sx={{ justifyContent: "center", mt: 3 }}>
                       {/* Basic Details */}
            <Grid item md={10}>
              <Grid container spacing={2}>
                <TextFieldWrapper
                  required={true}
                  label="Invoice Number"
                  placeHolder="Enter Invoice Number"
                  value={preData.invoice_no}
                  disabled={true}
                  name="invoice_no"
                />
                <TextFieldWrapper
                  required={true}
                  label="Invoice Date"
                  placeHolder="Enter Invoice Date"
                  value={preData.invoice_date}
                  disabled={true}
                  name="invoice_date"
                />
                <TextFieldWrapper
                  required={true}
                  label="Year"
                  placeHolder="Enter Invoice Date"
                  value={preData.invoice_date}
                  disabled={true}
                  name="invoice_date"
                />
                <TextFieldWrapper
                  required={true}
                  label="Rent Amount"
                  placeHolder="Enter Rent Amount"
                  value={preData.rent_amount}
                  onChange={(e) => handleChange(e)}
                  name="rent_amount"
                  // onBlur={(e) => handleOnBlur(e, i)}
                  // error={ }
                />
                <TextFieldWrapper
                  required={true}
                  label="GST Amount"
                  placeHolder="Enter GST AMount"
                  value={preData.gst_amount}
                  onChange={(e) => handleChange(e)}
                  name="gst_amount"
                  // onBlur={(e) => handleOnBlur(e, i)}
                  // error={ }
                />
                <TextFieldWrapper
                  required={true}
                  label="Total Amount"
                  placeHolder="Enter Total Amount"
                  value={preData.total_amount}
                  onChange={(e) => handleChange(e)}
                  name="total_amount"
                  // onBlur={(e) => handleOnBlur(e, i)}
                  // error={ }
                />
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
                </Grid>
              </Grid>
            </Grid>

            {/* Buttons start here*/}

            {status === "Sent To Operations" && (
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
                    <Grid item md={4} xs={11}>
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
                        Approve And Send To Finance
                      </Button>
                    </Grid>
                    <Grid item md={4} xs={11}>
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
        </Box>
      </Stack>
    </>
  );
}
