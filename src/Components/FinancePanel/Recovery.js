import {
    Box,
    Button,
    Dialog,
    DialogActions,
    FormControl,
    FormLabel,
    Grid,useMediaQuery,
    TextField,useTheme,
    Typography,
    Stack,
    Table
    ,TableBody
    ,TableCell
    ,TableContainer
    ,TableHead
    ,TableRow
    ,Paper
    ,IconButton
  } from "@mui/material";
  import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
  
  import DatePicker from "react-datepicker";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
  
  import "react-datepicker/dist/react-datepicker.css";
  import { DocumentUpload, TextFieldWrapper,   MyHeader, } from "../StyledComponent";
  import { setAlert } from "../../store/action/action";
  import { useDispatch } from "react-redux";
  import { invoice_validation, uploadDoc, insertRecoveryLog, getRecoveryLog, send_to_bhu } from "../../Services/Services";
  import { Try } from "@mui/icons-material";
import HamburgerMenu from "../HamburgerMenu";
  
  const labelStyle = {
    fontSize: "20px",
    lineHeight: "30px",
    color: "var(--main-color)",
    fontWeight: "600",
    "@media(max-width:900px)": { fontSize: "10px" },
  };
  
  const fieldStyle = {
    border: "1px solid var(--main-color)",
    borderRadius: "20px",
    //   height: "50px",
    p: 1,
    px: 2,
    // width: "450px",
  
    color: "rgba(16, 99, 173, 0.47)",
    "@media(max-width:900px)": { height: "46px", p: 1 },
  };

  
  
  function UploadInvoice({ open, handleClose, handleConfirm, value, setValue }) {
    const [formError, setFormError] = useState({ });
    const [history, setHistory] = useState([]);
    const [balance, setBalance] = useState([]);
    const navigate = useNavigate()
    const {id} = useParams();
    const theme = useTheme();
  
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  
    useEffect(()=>{
      fetchData(id)
      },[id])

      async function fetchData(id){
        let res = await getRecoveryLog(id)
        if(res.status === 200)
        {
          console.log(res)
          setHistory(res.data.history)
          setBalance({
            balance : res.data.balance.balanceDeposit,
            total : res.data.history.reduce((sum,row)=>sum+=row.receivedAmount,0)
          })
        }
        else{
          setHistory([])
        }
      }

    function onChange(e) {
  
      if(e.target.name === "invoiceDate" || e.target.name === "invoiceNo"){
        setValue({
          ...value,
          [e.target.name]: e.target.value,
        });
        setFormError({...formError,[e.target.name]:""})
      }
      
      if (e.target.value.match(/^[0-9]*$/)){
        setValue({
          ...value,
          [e.target.name]: e.target.value,
        });
      }
  
  
    
  
  // if(!error)
  // {
  //   setValue({
  //     ...value,
  //     [e.target.name]: e.target.value,
  //   });
  // }
    }
  
    const disablePastDate = () => {
      const today = new Date();
      const dd = String(today.getDate() + 0).padStart(2, "0");
      const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      const yyyy = today.getFullYear();
      return yyyy + "-" + mm + "-" + dd;
    };
  
  const [ferror,setError] = useState(true)
  const [data , setData] = useState({
    agreement_id : id,
    receivedDate : "",
    receivedAmount : "",
    paymentDetails : "",
    remark : "",
  })
  
    async function handleSubmit(e) {
      e.preventDefault();
      let res = await insertRecoveryLog(data)

      if(res.status === 200)
      {
        if((balance.balance - balance.total) === parseInt(data.receivedAmount))
        {
          //checking the agreement status to Terminated
          let res2 = await  send_to_bhu({status : "Terminated"},id)
          if (res2.status === 200)
          {
            dispatch(setAlert({
              open : true,
              variant : 'success',
              message : 'Log inserted successfully.'
            }))
           window.location.reload()     
          }
          
        }
        else {
          console.log((balance.balance - balance.total), data.receivedAmount)
  
              dispatch(setAlert({
                open : true,
                variant : 'success',
                message : 'Log inserted successfully.'
              }))
             window.location.reload()     
            }
      }
      else{
        dispatch(setAlert({
          open : true,
          variant : 'error',
          message : 'Something Went Wrong !!!'
      }))
      }
    }
  
    const dispatch = useDispatch();
  
   // use on Change for uncommon fields
  function handleChange(e) {
    let error = { state: false, message: null };
    console.log(e.target.name)
    switch (e.target.name) {
      case "receivedAmount":
        if (!e.target.value.match(/^[0-9]*$/))
        error = { ...error, state: true };
        else if(e.target.value > (balance.balance - balance.total))
        error = { ...error, state: true };
        break;
      default:
        break;
    }


    
    if (!error.state) {
      
      setData((old) => ({
          ...old,
          [e.target.name] : e.target.value,
        }));
      }
     
    }

    return (
      <>
           <Stack sx={{ flexWrap: "warap", flexDirection: "row" }}>
        {/* side nav     */}
        {/* <HamburgerMenu navigateTo={"listing"} /> */}

        <HamburgerMenu
          navigateHome={"dashboard"}
          handleListing={() => navigate("/finance-listing")}
          monthlyRent={() => navigate("/finance-monthly-rent")}
          renewal={() => navigate(`/finance-monthly-rent`)}
          monthlyBtn="true"
        />

        <Box sx={{ flexGrow: 1 }}>
          <MyHeader>Recovery Balance</MyHeader>
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
          <Grid container pt = {3}  pr={3} pl={3}
              spacing={isSmall ? 2 : 4} 
              sx= {{justifyContent : 'center', alignItems : 'center'}}
          >
             <Grid
                    item
                    xs={4}
                  >
                    <Typography sx = {{fontSize : '1.3rem' ,fontWeight : 700}} color = 'primary' variant = 'h6'>Balance Deposit: {balance.balance}</Typography>
                  </Grid>
             <Grid
                    item
                    xs={4}
                  >
                    <Typography sx = {{fontSize : '1.3rem' ,fontWeight : 700}} color = 'primary' variant = 'h6'>Receivable Amount: {balance.balance-balance.total}</Typography>
                  </Grid>
             <Grid
                    item
                    xs={4}
                  >
                    <Typography sx = {{fontSize : '1.3rem' ,fontWeight : 700}} color = 'primary' variant = 'h6'>Deposit Recoverd: {balance.total}</Typography>
                  </Grid>
           </Grid>

           <BasicTable row = {history}/>


           {(balance.balance !== balance.total) &&<>

           <Grid p={3}

                          container
                          sx={{ mt : '25px', mb: "25px", gap : '1rem', justifyContent : 'center', alignItems : 'center' }}
                           
          component = {'form'} onSubmit = {handleSubmit} method = 'post' >

            <Grid item xs = {12}
            >

            <Typography
                  align = 'center'
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
                    
                <Grid item xs = {4}
            >

          <FormControl fullWidth>

                <input type="date" 
                name="receivedDate" 
                value={data.receivedDate}  
                onkeydown="return false"
                min={disablePastDate()} 
                className="DatePicker"   
                onChange={(e) => handleChange(e)}
                // error={formError.date && true}
                 />
                <Typography variant = 'caption' sx = {{color : 'red'}}>{formError.agreement_date}</Typography>
              </FormControl>
              </Grid>

           <TextFieldWrapper
                            label="Received Amount"
                            placeHolder="Received Amount"
                            // onBlur={(e) => handleOnBlur(e, i)}
                            // error = {errorObj.leeseName}
                            name="receivedAmount"
                            // disabled = {true}
                            value={data.receivedAmount}
                            onChange={(e) => handleChange(e)}
                          />
        <TextFieldWrapper
                            label="Payment Details"
                            placeHolder="paymentDetails"
                            // onBlur={(e) => handleOnBlur(e, i)}
                            // error = {errorObj.leeseName}
                            name="paymentDetails"
                            // disabled = {true}
                            value={data.paymentDetails}
                            onChange={(e) => handleChange(e)}
                          />
        <TextFieldWrapper
                            label="Remark"
                            placeHolder="Remark"
                            // onBlur={(e) => handleOnBlur(e, i)}
                            // error = {errorObj.leeseName}
                            name="remark"
                            value={data.remark}
                            onChange={(e) => handleChange(e)}
                          />
        
        <Grid item xs = {12}  mt ={2} sx = {{display : 'flex', justifyContent : 'center'}}
            >

       <Button  type = 'submit' size = 'larger' sx = {{borderRadius : '50px', padding : '12px'}}  variant = 'contained'>Save Payment </Button>
        </Grid>

        </Grid> </> }
            </Box>
      </Stack>
      </>
    );
  }
  
  export default UploadInvoice;
  



  function BasicTable({row}) {

    console.log(row)
    function createData(
      receivedDate	: string,
      receivedAmount: string,
      paymentDetails: string,
      remark: string,
    ) {
      return { 
        receivedDate	
        ,receivedAmount
        ,paymentDetails
        ,remark };
    }
    
    const rows = row.map(data=>{

      console.log(data)
      const {
        receivedDate,
        receivedAmount,
        paymentDetails,
        remark
      } = data
      return createData(
        new Date(receivedDate).toDateString()
        ,receivedAmount
        ,paymentDetails
        ,remark
      )})

    return (
      <Box p = {3}>
        <Box mb = {2}>
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
      <TableContainer component={Paper} sx={{borderRadius : '10px' }} >
        <Table sx={{ minWidth: 400, borderRadius : '50px' }} dense aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx = {{fontSize : '1rem',fontWeight : 700}} align="center">Received Date</TableCell>
              <TableCell sx = {{fontSize : '1rem',fontWeight : 700}} align="center">Received Amount</TableCell>
              <TableCell sx = {{fontSize : '1rem',fontWeight : 700}} align="center">Payment Details</TableCell>
              <TableCell sx = {{fontSize : '1rem',fontWeight : 700}} align="center">Remark</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
               >
                <TableCell align="center">{row.receivedDate	}</TableCell>
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