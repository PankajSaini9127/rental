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
import React from "react";

const labelStyle = {
  fontSize: "20px",
  lineHeight: "30px",
  color: 'var(--main-color)',
  fontWeight: "600",
  "@media(max-width:900px)": { fontSize: "10px" },
};

const TextFieldWrapper = ({ placeHolder, value, name, onChange, grid }) => {
  const fieldStyle = {
    border: "1px solid var(--main-color)",
    borderRadius: "20px",
    //   height: "50px",
    p: 1,
    px: 2,
    width: "450px",

    color: "rgba(16, 99, 173, 0.47)",
    "@media(max-width:900px)": { height: "46px", p: 1 },
  };

  return (
    <Grid>
      {/* <MyTextfield /> */}
      <FormControl>
        <FormLabel>
          <Typography variant="body1" sx={labelStyle}>
            Remark
          </Typography>
        </FormLabel>
        <TextField
          variant="standard"
          multiline
          rows={7}
          name={name}
          onChange={(e) => onChange(e)}
          InputProps={{
            disableUnderline: true,
            style: {
              color: "rgba(16, 99, 173, 0.47)",
              fontSize: "15px",
            },
          }}
          placeholder={placeHolder}
          value={value}
          fullWidth
          sx={fieldStyle}
        />
      </FormControl>
    </Grid>
  );
};

function DialogBoxSBM({ open, handleClose, sendBack }) {
  const handleSend = () => {
    // Navigate()
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
        <Box sx={{ pt: 5, px: 4, pb: 2 }}>
          <TextFieldWrapper />

          <DialogActions sx={{ mt: 2 }}>
            <Button
              variant="contained"
              sx={{ height: 45, color: "#FFFFFF", borderRadius: "15px",textTransform:'capitalize' }}
              onclick={handleSend}
            >
             {sendBack}
             
            </Button>
            <Button
              variant="outlined"
              sx={{ height: 45, borderRadius: "15px" ,textTransform:'capitalize'}}
              onClick={handleClose}
            >
              Cancel
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
}

export default DialogBoxSBM;
