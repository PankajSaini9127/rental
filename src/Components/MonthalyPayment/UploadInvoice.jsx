import {
  Box,
  Button,
  Dialog,
  DialogActions,
  FormControl,
  FormLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { DocumentUpload } from "../StyledComponent";
import { setAlert } from "../../store/action/action";
import { useDispatch } from "react-redux";
import { invoice_validation, uploadDoc } from "../../Services/Services";
import { Try } from "@mui/icons-material";

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

  console.log(value)

  useEffect(()=>{
    let total =  parseFloat(Number(value.rentAmount) + parseFloat(Number(value.gstAmount)))
    setValue({...value,totalAmount:total})
  },[value.rentAmount,value.gstAmount])
   
// console.log(value)

  function onChange(e) {

    if(e.target.name === "invoiceDate" || e.target.name === "invoiceNo"){
      setValue({
        ...value,
        [e.target.name]: e.target.value,
      });
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
const [invoiceValidate , setInvoice] = useState(true)

  function validate() {
    // let error = false;

//     let fields = [
//       "invoiceNo"
//       ,"invoiceDate"
//       ,"rentAmount"
//       ,"gstAmount"
//       ,"totalAmount"
//       ,"invoice"
//       ,"invoice_file_name"
// ,
//     ]
    
//     console.log(value)
//     fields.map((row)=>{
//       if(value[row].length === 0)
//       {
//        console.log(value[row].length)
//        serError(true)
//        setFormError(old=>({...old,[row] : "Field is required."}));
//      }else{setFormError(false)}
//     })


  let error = {};
  if(value.gst !== "---"){
  if(value.invoiceNo === "" ){
    error.invoiceNo =  "Invoice Number Required !"
    setError(true)
    setFormError(error)
   }else if(value.invoiceDate === ""){
    error.invoiceDate =  "Please Select Invoice Date!"
    setError(true)
    setFormError(error)
   }else if(value.invoice === ""){
    error.invoice =  "Please Upload Invoice Copy."
    setError(true)
    setFormError(error)
   }else{
    setError(false)
    setFormError(error)
   }
  
   if(Object.keys(formError).length === 0 && !ferror && !invoiceValidate){
    handleConfirm()
  }
}else{
  handleConfirm()
}

  }

  function handleSubmit(e) {
    e.preventDefault();
    validate();
  }

  const dispatch = useDispatch();

//for invoice upload
  async function onfileChange(e) {
    const FD = new FormData();
    console.log(e.target.files[0]);
    FD.append("photo", e.target.files[0]);
    let response = await uploadDoc(FD);

    if (response.status === 200) {
        setFormError({ ...formError, [e.target.name]: "" });

      setValue({
        ...value,
        invoice: response.data.link,
        invoice_file_name: e.target.files[0].name,
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

  // invoice number validate in db
 async function handleValidateInvoiceNo (){
   try {
     const validate = await invoice_validation(value.invoiceNo)
    if(validate.data.alreadyInvoice){
      setFormError(old=>({...old,invoiceNo : "Invoice Number Already Added."}))
      setInvoice(true)
    }else{
      setInvoice(false)
      setFormError({})
    }
  } catch (error) {
    console.log(error)
  }
 }

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: { borderRadius: 18 },
        }}
      >
        
        <Box sx={{ pt: 5, px: 2, pb: 2 }}>
          <Grid container spacing={2}>

            <Grid item xs={6}>
              <FormControl fullWidth>
                <FormLabel>
                  <Typography variant="body1" sx={labelStyle}>
                    Invoice Number
                  </Typography>
                </FormLabel>
                <TextField
                  variant="standard"
                  onChange={onChange}
                  InputProps={{
                    disableUnderline: true,
                    style: {
                      color: "rgba(16, 99, 173, 0.47)",
                      fontSize: "15px",
                    },
                  }}
                  inputProps={{ maxLength: 22 }}
                  value={value.invoiceNo}
                  // helperText ={formError.invoiceNo || ""}
                  fullWidth
                  name="invoiceNo"
                  sx={fieldStyle}
                  placeholder="Invoice Number"
                  onBlur={handleValidateInvoiceNo}
                />
                <Typography variant="caption" color="red" mt={1}>
                  {formError.invoiceNo}
                </Typography>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <FormLabel>
                  <Typography variant="body1" sx={labelStyle}>
                    Invoice Date
                  </Typography>
                </FormLabel>
                <input
                  type="date"
                  name="invoiceDate"
                  value={value.invoiceDate}
                  min={disablePastDate()}
                  className="DatePicker"
                  onChange={(e) => onChange(e)}
                />
                <Typography variant="caption" color="red" mt={1}>
                  {formError.invoiceDate}
                </Typography>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <FormLabel>
                  <Typography variant="body1" sx={labelStyle}>
                    Rent Amount
                  </Typography>
                </FormLabel>
                <TextField
                  variant="standard"
                  onChange={(e) => onChange(e)}
                  InputProps={{
                    disableUnderline: true,
                    style: {
                      color: "rgba(16, 99, 173, 0.47)",
                      fontSize: "15px",
                    },
                  }}
                  value={parseInt(value.rentAmount).toFixed(2)}
                  // helperText ={formError.rentAmount || ""}
                  fullWidth
                  name="rentAmount"
                  sx={fieldStyle}
                  placeholder="Rent Amount"
                  className={"textAlignRight"}
                />
                <Typography variant="caption" color="red" mt={1}>
                  {formError.rentAmount}
                </Typography>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <FormLabel>
                  <Typography variant="body1" sx={labelStyle}>
                    GST Amount
                  </Typography>
                </FormLabel>
                <TextField
                  variant="standard"
                  onChange={(e) => onChange(e)}
                  InputProps={{
                    disableUnderline: true,
                    style: {
                      color: "rgba(16, 99, 173, 0.47)",
                      fontSize: "15px",
                    },
                  }}
                  inputProps={{ maxLength: 22 }}
                  value={parseInt(value.gstAmount).toFixed(2)}
                  className={"textAlignRight"}
                  fullWidth
                  // helperText = {formError.gstAmount} 
                  name="gstAmount"
                  sx={fieldStyle}
                  placeholder="GST Amount"
                />
                <Typography variant="caption" color="red" mt={1}>
                  {formError.gstAmount}
                </Typography>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth>
                <FormLabel>
                  <Typography variant="body1" sx={labelStyle}>
                    Total Amount
                  </Typography>
                </FormLabel>
                <TextField
                  variant="standard"
                  disabled
                  InputProps={{
                    disableUnderline: true,
                    style: {
                      color: "rgba(16, 99, 173, 0.47)",
                      fontSize: "15px",
                    },
                  }}
                  inputProps={{ maxLength: 22 }}
                  value={parseInt(value.totalAmount).toFixed(2)}
                  fullWidth
                  name="totalAmount"
                  sx={fieldStyle}
                  placeholder="GST Amount"
                  className={"textAlignRight"}
                />
                <Typography variant="body1" color="red" mt={1}>
                  {formError.totalAmount}
                </Typography>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <DocumentUpload
                  label={"Upload Invoice"}
                  placeHolder={"Upload Invoice"}
                  name="invoice"
                  handleChange={onfileChange}
                  uploaded={value.invoice && true}
                  fileName={value.invoice}
                  error={formError.invoice}
                />
              </FormControl>
            </Grid>
            
          </Grid>

          <DialogActions sx={{ mt: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  sx={{
                    height: 45,
                    borderRadius: "15px",
                    textTransform: "capitalize",
                  }}
                  onClick={handleClose}
                >
                  Close
                </Button>
              </Grid>

              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    height: 45,
                    color: "#FFFFFF",
                    borderRadius: "15px",
                    textTransform: "capitalize",
                  }}
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
}

export default UploadInvoice;
