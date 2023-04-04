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
  width: "450px",

  color: "rgba(16, 99, 173, 0.47)",
  "@media(max-width:900px)": { height: "46px", p: 1 },
};

function DialogBoxSBM({
  open,
  handleClose,
  sendBack,
  handleConfirm,
  value,
  setValue,
}) {
  function onChange(e) {
    setValue(e.target.value);
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
        <Box sx={{ pt: 5, px: 4, pb: 2 }}>
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
                onChange={(e) => onChange(e)}
                InputProps={{
                  disableUnderline: true,
                  style: {
                    color: "rgba(16, 99, 173, 0.47)",
                    fontSize: "15px",
                  },
                }}
                value={value}
                fullWidth
                sx={fieldStyle}
              />
            </FormControl>
          </Grid>

          <DialogActions sx={{ mt: 2 }}>
            <Button
              variant="contained"
              sx={{
                height: 45,
                color: "#FFFFFF",
                borderRadius: "15px",
                textTransform: "capitalize",
              }}
               onClick={handleConfirm}
            >
              {sendBack}
            </Button>
            <Button
              variant="outlined"
              sx={{
                height: 45,
                borderRadius: "15px",
                textTransform: "capitalize",
              }}
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
