import {
  Box,
  Button,
  Dialog,
  DialogActions,
  FormControl,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { setAlert } from "../../store/action/action";

const labelStyle = {
  fontSize: "18px",
  lineHeight: "25px",
  color: "var(--main-color)",
  fontWeight: "500",
  mb:2,
  "@media(max-width:900px)": { fontSize: "10px" },
}  


function Remark({ open, handleClose, handleSend,remark,setRemark,setIds }) {

    const diapatch = useDispatch()

    function handleChange(e){
        
        setRemark(e.target.value)
    }

    function handleSubmit(){
        if(remark.length === 0){
          setIds([])
            diapatch(setAlert({open:true,variant:"error",message:"Remark Required !"}))
        }else{
            handleSend()
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
        <Box sx={{ pt: 5, px: 4, pb: 2 }}>
        <FormLabel>
          <Typography variant="body1" sx={labelStyle}>
            Remark
          </Typography>
        </FormLabel>
        <FormControl className="textFieldWrapper">
        <TextField
          variant="outlined"
          multiline
          label={'Remark'}
          rows={4}
          onChange={(e) => handleChange(e)}
          InputProps={{
            style: {
              color: "rgba(16, 99, 173, 0.90)",
              fontSize: "15px",
            },
          }}
          placeholder={"Remark !"}
          value={remark}
          fullWidth
          color={'primary'}
          sx={{width: "450px"}}
        />
      </FormControl>

          <DialogActions sx={{ mt: 2 }}>
            <Button
              variant="contained"
              sx={{
                height: 45,
                color: "#FFFFFF",
                borderRadius: "15px",
                textTransform: "capitalize",
              }}
              onClick={handleSubmit}
            >
              Confirm
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
              Close
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
}

export default Remark;
