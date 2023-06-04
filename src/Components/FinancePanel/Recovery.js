import {
  Box,
  Button,
  FormControl,
  Grid,
  useMediaQuery,
  useTheme,
  Typography,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

import "react-datepicker/dist/react-datepicker.css";
import { TextFieldWrapper, MyHeader } from "../StyledComponent";
import { setAlert, setForm } from "../../store/action/action";
import { useDispatch, useSelector } from "react-redux";
import {
  insertRecoveryLog,
  getRecoveryLog,
  send_to_bhu,
  update_payment_status,
} from "../../Services/Services";
import FinanceHamburger from "./FinanceHamburger";
import moment from "moment";
import BackButton from "../utility/BackButton";

function UploadInvoice() {
  const [formError, setFormError] = useState({});

  // console.log(formError)

  const [history, setHistory] = useState([]);
  const [balance, setBalance] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const theme = useTheme();

  const { auth } = useSelector((s) => s);
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    fetchData(id);
  }, [id]);

  async function fetchData(id) {
    let res = await getRecoveryLog(id);
    if (res.status === 200) {
      console.log(res);
      setHistory(res.data.history);
      setBalance({
        balance: res.data.balance.balanceDeposit,
        total: res.data.history.reduce(
          (sum, row) => (sum += row.receivedAmount),
          0
        ),
      });
    } else {
      setHistory([]);
    }
  }

  const disablePastDate = () => {
    const today = new Date();
    const dd = String(today.getDate() + 0).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
  };

  // const [ferror, setError] = useState(true);
  const [data, setData] = useState({
    agreement_id: id,
    receivedDate: "",
    receivedAmount: "",
    paymentDetails: "",
    remark: "",
  });

  function validate(data) {
    let error = {};
    if (data.receivedDate === "") {
      error.receivedDate = "Field is required.";
    }
    if (data.receivedAmount === "") {
      error.receivedAmount = "Field is required.";
    }
    if (data.paymentDetails === "") {
      error.paymentDetails = "Field is required.";
    }
    if (data.remark === "") {
      error.remark = "Field is required.";
    }
    setFormError(error);
    if(Object.keys(error).length > 0){
      return false
    }else{
      return true
    }

  }

  async function handleSubmit(e) {
    e.preventDefault();

    validate(data);
    if (validate(data)) {
      let res = await insertRecoveryLog(data);

      if (res.status === 200) {
        if (balance.balance - balance.total === parseInt(data.receivedAmount)) {
          //checking the agreement status to Terminated
          let res2 = await send_to_bhu({ status: "Terminated" }, id);
         let  update_payment = await update_payment_status(id,{status:"Paid"});
          if (res2.status === 200 && update_payment.data.success) {
            dispatch(
              setAlert({
                open: true,
                variant: "success",
                message: "Log inserted successfully.",
              })
            );
            window.location.reload();
          }
        } else {
          console.log(balance.balance - balance.total, data.receivedAmount);

          dispatch(
            setAlert({
              open: true,
              variant: "success",
              message: "Log inserted successfully.",
            })
          );
          window.location.reload();
        }
      } else {
        dispatch(
          setAlert({
            open: true,
            variant: "error",
            message: "Something Went Wrong !!!",
          })
        );
      }
    }
  }

  const dispatch = useDispatch();

  // use on Change for uncommon fields
  function handleChange(e) {
    let fields = ["receivedDate", "receivedAmount", "paymentDetails", "remark"];

    let error = { state: false, message: null };
    console.log(e.target.name);
    switch (e.target.name) {
      case "receivedAmount":
        if (!e.target.value.match(/^[0-9]*$/))
          error = { ...error, state: true };
        else if (e.target.value > balance.balance - balance.total)
          error = { ...error, state: true };
        break;
      default:
        break;
    }

    console.log(formError)
    fields.map((row) => {
      // console.log(row, e.target.name);
      if (e.target.name === row) {
        // console.log(row,formError.e.target.name)
        setFormError({ ...formError, [e.target.name]: "" });
        if (!error.state) {
          setData((old) => ({
            ...old,
            [e.target.name]: e.target.value,
          }));
        }
      }
    });
  }

  return (
    <>
      <Stack sx={{ flexWrap: "warap", flexDirection: "row" }}>
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
          <BackButton />
          <Grid
            container
            pt={3}
            pr={3}
            pl={3}
            spacing={isSmall ? 2 : 4}
            sx={{ justifyContent: "center", alignItems: "center" }}
          >
            <Grid item xs={4}>
              <Typography
                sx={{ fontSize: "1.3rem", fontWeight: 700 }}
                color="primary"
                variant="h6"
              >
                Balance Deposit: {balance.balance}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                sx={{ fontSize: "1.3rem", fontWeight: 700 }}
                color="primary"
                variant="h6"
              >
                Receivable Amount: {balance.balance - balance.total}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                sx={{ fontSize: "1.3rem", fontWeight: 700 }}
                color="primary"
                variant="h6"
              >
                Deposit Recoverd: {balance.total}
              </Typography>
            </Grid>
          </Grid>

          <BasicTable row={history} />

          {balance.balance !== balance.total && (
            <>
              <Grid
                p={3}
                container
                sx={{
                  mt: "25px",
                  mb: "25px",
                  gap: "1rem",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                component={"form"}
                onSubmit={handleSubmit}
                method="post"
              >
                <Grid item xs={12}>
                  <Typography
                    align="center"
                    variant="body1"
                    color="var(--main-color)"
                    fontSize="1.5rem"
                    lineHeight="28px"
                    fontWeight="600"
                    // my="20px"
                  >
                    Recovery Form
                  </Typography>
                </Grid>

                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <input
                      type="date"
                      name="receivedDate"
                      value={data.receivedDate}
                      // required
                      onkeydown="return false"
                      // min={disablePastDate()}
                      className="DatePicker"
                      onChange={(e) => handleChange(e)}
                      max={moment().format("YYYY-MM-DD")}
                    />
                    <Typography variant="caption" sx={{ color: "red" }}>
                      {formError.receivedDate}
                    </Typography>
                  </FormControl>
                </Grid>

                <TextFieldWrapper
                  label="Received Amount *"
                  placeHolder="Received Amount"
                  name="receivedAmount"
                  value={data.receivedAmount}
                  onChange={(e) => handleChange(e)}
                  error={formError.receivedAmount}
                />
                <TextFieldWrapper
                  label="Payment Details *"
                  placeHolder="paymentDetails"
                  name="paymentDetails"
                  value={data.paymentDetails}
                  onChange={(e) => handleChange(e)}
                  error={formError.paymentDetails}
                />
                <TextFieldWrapper
                  label="Remark"
                  placeHolder="Remark *"
                  name="remark"
                  value={data.remark}
                  onChange={(e) => handleChange(e)}
                  error={formError.remark}
                />

                <Grid
                  item
                  xs={4}
                  mt={2}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <Button
                    type="submit"
                    size="larger"
                    sx={{ borderRadius: "50px", padding: "12px" }}
                    variant="contained"
                    fullWidth
                  >
                    Save Payment
                  </Button>
                </Grid>
              </Grid>
            </>
          )}
        </Box>
      </Stack>
    </>
  );
}

export default UploadInvoice;

function BasicTable({ row }) {
  console.log(row);
  function createData(
    receivedDate: string,
    receivedAmount: string,
    paymentDetails: string,
    remark: string
  ) {
    return {
      receivedDate,
      receivedAmount,
      paymentDetails,
      remark,
    };
  }

  const rows = row.map((data) => {
    console.log(data);
    const { receivedDate, receivedAmount, paymentDetails, remark } = data;
    return createData(
      new Date(receivedDate).toDateString(),
      receivedAmount,
      paymentDetails,
      remark
    );
  });

  return (
    <Box p={3}>
      <Box mb={2}>
        <Typography
          variant="body1"
          color="var(--main-color)"
          fontSize="1.3rem"
          lineHeight="28px"
          fontWeight="600"
          // my="20px"
        >
          Payment History
        </Typography>
      </Box>
      <TableContainer component={Paper} sx={{ borderRadius: "10px" }}>
        <Table
          sx={{ minWidth: 400, borderRadius: "50px" }}
          dense
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ fontSize: "1rem", fontWeight: 700 }}
                align="center"
              >
                Received Date
              </TableCell>
              <TableCell
                sx={{ fontSize: "1rem", fontWeight: 700 }}
                align="center"
              >
                Received Amount
              </TableCell>
              <TableCell
                sx={{ fontSize: "1rem", fontWeight: 700 }}
                align="center"
              >
                Payment Details
              </TableCell>
              <TableCell
                sx={{ fontSize: "1rem", fontWeight: 700 }}
                align="center"
              >
                Remark
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow>
                <TableCell align="center">{row.receivedDate}</TableCell>
                <TableCell align="center">{row.receivedAmount}</TableCell>
                <TableCell align="center">{row.paymentDetails}</TableCell>
                <TableCell align="center">{row.remark}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
