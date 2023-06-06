import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import HamburgerMenu from "../../HamburgerMenu";

import {
  DocumentUpload,
  MyHeader,
  TextFieldWrapper,
} from "../../StyledComponent";

import moment from "moment";

import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { useDispatch, useSelector } from "react-redux";
import {
  DataFieldStyle,
  DocumentView,
  YearField,
} from "../../StyleComponents/Rental";
import { setAlert, setRefreshBox } from "../../../store/action/action";
import {
  get_agreement_code,
  get_rent_data_ID,
  sendMonthyPaymentForword,
} from "../../../Services/Services";
import FinanceHamburger from "../FinanceHamburger";

export default function FinanceMonthlyRentView() {
  const navigate = useNavigate();
  const { id } = useParams();

  console.log(id);

  const dispatch = useDispatch();

  const [remark, setRemark] = useState("");

  const { auth } = useSelector((s) => s);

  const [preData, setPredata] = useState({
    invoice_no: "",
    invoice_date: "",
    rent_amount: "",
    gst_amount: "",
    gst: "",
    total_amount: "",
    invoice: "",
    status: "",
    dateMonth: "",
    remark: "",
    paymentDate: "",
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
          invoice_date: response.data.data[0].invoice_date,
          rent_amount: parseFloat(response.data.data[0].rent_amount).toFixed(2),
          gst_amount: response.data.data[0].gst_amount,
          gst: response.data.data[0].gst,
          total_amount: parseFloat(
            Number(response.data.data[0].rent_amount) +
              Number(response.data.data[0].gst_amount)
          ).toFixed(2),
          status: response.data.data[0].status,
          dateMonth:
            month[new Date(response.data.data[0].rent_date).getUTCMonth()] +
            " " +
            new Date(response.data.data[0].rent_date).getFullYear(),
          remark: response.data.data[0].remark,
          paymentDate:
            new Date(response.data.data[0].payment_date).getDate() +
            " " +
            month[new Date(response.data.data[0].rent_date).getUTCMonth()] +
            " " +
            new Date(response.data.data[0].payment_date).getFullYear(),
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData(id);
  }, []);

  const [agreement, setAgreement] = useState({});
  const [ids, setIds] = useState([]);

  console.log(agreement);

  const getData = async (id) => {
    console.log(id);
    const agreement = await get_agreement_code(id);
    if (agreement.status === 200) {
      setAgreement(agreement.data.agreement);
      setIds(agreement.data.ids);
    }
  };

  useEffect(() => {
    getData(id);
  }, []);

  const today = new Date();
  console.log(today);

  async function handleSubmit(e) {
    try {
      const send = await sendMonthyPaymentForword(id, {
        status: "Approved By Finance",
        finance_id: auth.id,
        remark: remark,
        update_at: new Date(),
      });
      // console.log(send.data.success)
      if (send.data.success) {
        dispatch(
          setAlert({
            open: true,
            variant: "success",
            message: "Approved Successfully.",
          })
        );
        dispatch(setRefreshBox());
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
    } catch (error) {
      console.log(error);
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

  async function handleSendBack() {
    if (remark.length > 0) {
      try {
        const send = await sendMonthyPaymentForword(id, {
          status: "Sent Back From Finance",
          remark,
        });
        console.log(send.data.success);
        if (send.data.success) {
          dispatch(
            setAlert({
              open: true,
              variant: "success",
              message: "Sent Back To Manager Successfully.",
            })
          );
          dispatch(setRefreshBox());
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
      } catch (error) {
        console.log(error);
        dispatch(
          setAlert({
            open: true,
            variant: "error",
            message: "Something Went Wrong Please Try Again Later.",
          })
        );
      }
    } else {
      dispatch(
        setAlert({ open: true, variant: "error", message: "Remark Required !" })
      );
    }
  }

  function getIncrement(rent, value, type) {
    let incrementType;
    rent = Number(rent);
    value = Number(value);
    if (type === "Percentage") {
      incrementType = `${parseInt(((value - rent) / rent) * 100)}%`;
    } else if (type === "Value") {
      incrementType = value - rent;
    }
    return incrementType;
  }

  return (
    <>
      {ids.length > 0 && (
        <Stack sx={{ flexDirection: "row", mb: 4 }}>
          <FinanceHamburger />
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
              <Grid item md={10}>
                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <DataFieldStyle
                    field={"Rent Month"}
                    value={preData.dateMonth}
                  />
                </Grid>
                {(preData.status === "Paid" && preData.utr_number !== null )&& (
                  <Grid container spacing={2} sx={{ mb: 2 }}>
                    <DataFieldStyle
                      field={"Payment Date"}
                      value={preData.paymentDate}
                    />
                  </Grid>
                )}

                <Grid container sx={{ mt: 4 }}>
                  <DataFieldStyle
                    field={"Final Agreement"}
                    href={agreement[ids[0]].final_agreement}
                    name={"Final Agreement"}
                    bold={true}
                    cursor={true}
                  />
                  <DataFieldStyle
                    field={"Final Agreement Date"}
                    value={agreement[ids[0]].final_agreement_date}
                  />
                  <DataFieldStyle
                    field={"Monthly Rent Start Date"}
                    value={agreement[ids[0]].rent_start_date}
                  />
                </Grid>
                <Grid container sx={{ mt: 1 }}>
                  <DataFieldStyle
                    field={"Deposit UTR Number"}
                    value={agreement[ids[0]].utr_deposit}
                  />
                  <DataFieldStyle
                    field={"Deposit Payment Date"}
                    value={agreement[ids[0]].rent_start_date}
                  />
                </Grid>

                <Grid container sx={{ mt: 2 }}>
                  <DataFieldStyle
                    field={"code"}
                    value={agreement[ids[0]].code}
                  />

                  <DataFieldStyle
                    field={"state"}
                    value={agreement[ids[0]].state}
                  />
                  <DataFieldStyle
                    field={"city"}
                    value={agreement[ids[0]].city}
                  />
                  <DataFieldStyle
                    field={"location"}
                    value={agreement[ids[0]].location}
                  />

                  <DataFieldStyle
                    field={"pincode"}
                    value={agreement[ids[0]].pincode}
                  />
                  <DataFieldStyle
                    field={"address"}
                    value={agreement[ids[0]].address}
                  />
                  <DataFieldStyle
                    field={"area"}
                    value={agreement[ids[0]].area + " sq. ft"}
                  />
                  <DataFieldStyle
                    field={"lock in month"}
                    value={agreement[ids[0]].lockInYear}
                  />
                  <DataFieldStyle
                    field={"notice period in month"}
                    value={agreement[ids[0]].noticePeriod}
                  />
                  <DataFieldStyle
                    field={"deposit"}
                    value={agreement[ids[0]].deposit}
                  />
                  <DataFieldStyle
                    field={"monthly rental"}
                    value={agreement[ids[0]].monthlyRent}
                  />
                  <DataFieldStyle
                    field={"tenure"}
                    value={agreement[ids[0]].tenure}
                  />
                  {agreement[ids[0]].tenure > 12 && (
                    <>
                      <Grid container spacing={1} sx={{ mt: 6 }}>
                        <Grid item xs={12} sx={{ mb: 1 }}>
                          <DataFieldStyle
                            field={"yearly Increment"}
                            value={agreement[ids[0]].yearlyIncrement}
                          />
                        </Grid>
                        <YearField
                          year={"Year 1"}
                          incrementType={agreement[ids[0]].yearlyIncrement}
                          Increment={0}
                          amount={agreement[ids[0]].year1}
                        />
                        <YearField
                          year={"Year 2"}
                          incrementType={agreement[ids[0]].yearlyIncrement}
                          amount={agreement[ids[0]].year2}
                          Increment={getIncrement(
                            agreement[ids[0]].year1,
                            agreement[ids[0]].year2,
                            agreement[ids[0]].yearlyIncrement
                          )}
                        />
                        {agreement[ids[0]].tenure > 24 && (
                          <YearField
                            year={"Year 3"}
                            incrementType={agreement[ids[0]].yearlyIncrement}
                            amount={agreement[ids[0]].year3}
                            Increment={getIncrement(
                              agreement[ids[0]].year2,
                              agreement[ids[0]].year3,
                              agreement[ids[0]].yearlyIncrement
                            )}
                          />
                        )}
                        {agreement[ids[0]].tenure > 36 && (
                          <YearField
                            year={"Year 4"}
                            incrementType={agreement[ids[0]].yearlyIncrement}
                            amount={agreement[ids[0]].year4}
                            Increment={getIncrement(
                              agreement[ids[0]].year3,
                              agreement[ids[0]].year4,
                              agreement[ids[0]].yearlyIncrement
                            )}
                          />
                        )}
                        {agreement[ids[0]].tenure > 48 && (
                          <YearField
                            year={"Year 5"}
                            incrementType={agreement[ids[0]].yearlyIncrement}
                            amount={agreement[ids[0]].year5}
                            Increment={getIncrement(
                              agreement[ids[0]].year4,
                              agreement[ids[0]].year5,
                              agreement[ids[0]].yearlyIncrement
                            )}
                          />
                        )}
                      </Grid>
                    </>
                  )}
                </Grid>

                <Grid container spacing={4} sx={{ mt: 4 }}>

                  {agreement[ids[0]].rent_gst.length > 0 && (
                    <>
                      <TextFieldWrapper
                        required={true}
                        label="Invoice Number"
                        placeHolder="Enter Invoice Number"
                        value={agreement[ids[0]].invoice_no}
                        disabled={true}
                        name="invoice_no"
                      />
                      <TextFieldWrapper
                        required={true}
                        label="Invoice Date"
                        placeHolder="Invoice Date"
                        value={moment(agreement[ids[0]].invoice_date).format(
                          "DD/MM/YYYY"
                        )}
                        disabled={true}
                      />
                    </>
                  )}

                  <TextFieldWrapper
                    required={true}
                    label="Rent Amount"
                    placeHolder="Enter Rent Amount"
                    value={parseInt(
                      agreement[ids[0]].rent_amount
                    ).toLocaleString()}
                    disabled={true}
                    name="rent_amount"
                    textAlignRight={"textAlignRight"}
                  />

                  {agreement[ids[0]].rent_gst.length > 0 && (
                    <TextFieldWrapper
                      required={true}
                      label="GST Amount"
                      placeHolder="Enter GST AMount"
                      value={parseInt(
                        agreement[ids[0]].gst_amount
                      ).toLocaleString()}
                      disabled={true}
                      name="gst_amount"
                      textAlignRight={"textAlignRight"}
                    />
                  )}

                  <TextFieldWrapper
                    required={true}
                    label="Total Amount"
                    placeHolder="Enter Total Amount"
                    value={parseInt(
                      parseInt(agreement[ids[0]].rent_amount) +
                        parseInt(agreement[ids[0]].gst_amount)
                    ).toLocaleString()}
                    disabled={true}
                    textAlignRight={"textAlignRight"}
                  />

                  {agreement[ids[0]].rent_gst.length > 0 && (
                    <Grid item xs={12} container>
                      <Grid item xs={4}>
                        <DocumentUpload
                          label="Invoice"
                          disabled={true}
                          placeHolder="Invoice"
                          name={"invoice"}
                          href={agreement[ids[0]].invoice}
                        />
                      </Grid>
                    </Grid>
                  )}

{/* {console.log(agreement[ids[0]].status ,
                    agreement[ids[0]].utr_number === null )} */}
                  {(agreement[ids[0]].status === "Paid" &&
                    agreement[ids[0]].utr_number === null ) && (
                      <Grid item xs={10}>
                        <Typography
                          variant="body1"
                          height="30px"
                          color="primary"
                        >
                          Note: Monthly Payment Adjust In Deposit Adjustment
                        </Typography>
                      </Grid>
                    )}

{/* {(agreement[ids[0]].status === "Paid" &&
                    agreement[ids[0]].utr_number !== null ) && (
                      <Grid item xs={12} container sx={{ mt: 4 }}>
                      <DataFieldStyle
                        field={"UTR Number"}
                        value={agreement[ids[0]].utr_number}
                      />
                      <DataFieldStyle
                        field={"payment Date"}
                        value={agreement[ids[0]].paymentDate}
                      />
                    </Grid>
                    )} */}

                  {agreement[ids[0]].remark.length > 0 && (
                    <Grid item xs={12} container sx={{ mt: 4 }}>
                      <DataFieldStyle
                        field={"Remark"}
                        value={agreement[ids[0]].remark !== '""' && agreement[ids[0]].remark}
                      />
                    </Grid>
                  )}
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
                    <Grid
                      container
                      spacing={1}
                      sx={{ justifyContent: "center" }}
                    >
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
      )}
    </>
  );
}
