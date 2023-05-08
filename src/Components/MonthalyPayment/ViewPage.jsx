import {
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import HamburgerMenu from "../HamburgerMenu";
import { DataFieldStyle, YearField } from "../StyleComponents/Rental";
import { DocumentUpload, MyHeader, TextFieldWrapper } from "../StyledComponent";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  get_agreement_code,
  sendMonthyPaymentForword,
} from "../../Services/Services";

//download file
import { setAlert } from "../../store/action/action";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import HamburgerManager from "../Manager/HamburgerManager";
import moment from "moment";

function ViewPage() {
  const { auth } = useSelector((s) => s);

  const { id } = useParams();

  console.log(id);

  const navigate = useNavigate();

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

  async function handleSubmit(e) {
    //     const send = await sendMonthyPaymentForword(id,{status:"Sent To Sr Manager",manager_id:auth.id})
    //     console.log(send.data.success)
    //    if(send.data.success){
    //     dispatch(setAlert({open:true,variant:"success",message:"Payment Details Send To Senior Manager Successfully."}))
    //      navigate(-1)
    //    }else{
    //     dispatch(setAlert({open:true,variant:"error",message:"Something Went Wrong Please Try Again Later."}))
    //    }
    // console.log(send)
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

  return (
    <>
      {ids.length > 0 && (
        <Stack sx={{ flexDirection: "row", mb: 4 }}>
          <HamburgerManager />

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
          <Box sx={{ flexGrow: 1 }}>
            <Grid container sx={{ justifyContent: "center", mt: 2 }}>
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

              {/* Basic Details */}
              <Grid item md={10} sx={{ mt: 2 }}>
                <Grid container sx={{mt:4}}>
                <DataFieldStyle
                    field={"Rent Month"}
                    value={
                      (month[new Date(agreement[ids[0]].rent_date).getUTCMonth()] +
                      " " +
                      new Date(agreement[ids[0]].rent_date).getFullYear())}
                  />
                ,
                </Grid>
                {agreement[ids[0]].payment_status === "Paid" && (
                  <Grid container>
                    <DataFieldStyle
                      field={"Invoice"}
                      href={agreement[ids[0]].invoice}
                      name={"Invoice"}
                      bold={true}
                      cursor={true}
                    />

                    <DataFieldStyle
                      field={"Payment Date"}
                      value={new Date(
                        agreement[ids[0]].rent_paid_date
                      ).toDateString()}
                    />
                    <DataFieldStyle
                      field={"Rent Amount"}
                      value={agreement[ids[0]].rent_amount}
                    />
                    <DataFieldStyle
                      field={"GST Amount"}
                      value={agreement[ids[0]].gst_amount}
                    />
                    <DataFieldStyle
                      field={"Total Amount"}
                      value={parseInt(
                        parseInt(agreement[ids[0]].rent_amount) +
                          parseInt(agreement[ids[0]].gst_amount)
                      ).toFixed(2)}
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

                <Grid item md={10}>
                  {agreement[ids[0]].status === "Paid" && (
                    <Grid container sx={{ mb: 2, mt: 4 }}>
                      <DataFieldStyle
                        field={"Payment Date"}
                        value={agreement[ids[0]].paymentDate}
                      />
                    </Grid>
                  )}

                  {(agreement[ids[0]].status === "Paid" &&  agreement[ids[0]].utr_number !== null )&& (
                    <Grid container sx={{ mb: 2 }}>
                      <DataFieldStyle
                        field={"UTR Number"}
                        value={agreement[ids[0]].utr_number}
                      />
                      <DataFieldStyle
                        field={"Payment Date"}
                        value={moment(agreement[ids[0]].paymentDate).format("DD/MM/YYYY")}
                      />
                    </Grid>
                  )}

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

                    {(agreement[ids[0]].status === "Paid" &&
                       agreement[ids[0]].utr_number === null) && (
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
                    {agreement[ids[0]].remark.length > 0 && (
                      <Grid item xs={12} container sx={{ mt: 4 }}>
                        <DataFieldStyle
                          field={"Remark"}
                          value={agreement[ids[0]].remark}
                        />
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Stack>
      )}
    </>
  );
}

export default ViewPage;
