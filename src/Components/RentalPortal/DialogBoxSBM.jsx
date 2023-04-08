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

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";


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

function DialogBoxSBM({
  open,
  handleClose,
  handleConfirm,
  value,
  setValue,
}) {

  function onChange(e) {
    setValue({
      ...value,
      [e.target.name]:e.target.value
    });
  }


  const disablePastDate = () => {
    const today = new Date();
    const dd = String(today.getDate() + 1).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
};


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
          <Grid container>
            <Grid item xs={12}>
            <FormControl fullWidth>
              <FormLabel>
                <Typography variant="body1" sx={labelStyle}>
                  UTR Number
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
                value={value.utr}
                fullWidth
                name="utr"
                sx={fieldStyle}
                placeholder="UTR Number"
              />
            </FormControl>
            </Grid>
            <Grid item xs={12}>
            <FormControl fullWidth>
              <FormLabel>
                <Typography variant="body1" sx={labelStyle}>
                  Payment Date
                </Typography>
              </FormLabel>
              <input type="date" name="paymentDate" value={value.paymentDate}  min={disablePastDate()} className="DatePicker"   onChange={(e) => onChange(e)} />
              
            </FormControl>
            </Grid>
            {/* <MyTextfield /> */}
            
           
          </Grid>

          <DialogActions sx={{ mt: 2 }}>
            <Grid container spacing={3}>
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
               onClick={handleConfirm}
            >
            Submit
            </Button>
              </Grid>
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
            </Grid>
           
            
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
}

export default DialogBoxSBM;
