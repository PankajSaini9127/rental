import {
  Dialog,
  FormControl,
  FormLabel,
  Grid,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import React, { useState } from "react";


const TextFieldWrapper = ({
  label,
  placeHolder,
  value,
  name,
  onChange,
  grid
}) => {
  const fieldStyle = {
    // border: "1px solid #03C1F3",
    // borderRadius: "20px",
    height: "50px",
    // p: 1,
    // px:2,
    
    color: "rgba(16, 99, 173, 0.47)",
    "@media(max-width:900px)": { height: "46px", p: 1 },
  };

  return (
      
        <Box sx={{width:'100%'}} className="textFieldWrapper">
      <FormControl fullWidth>
        <TextField
          variant="outlined"
          label={label}
          name={name}
          type={'text'}
          onChange={(e) => onChange(e)}
          fullWidth
          InputProps={{
            disableUnderline: true,
            style: {
              color: "rgba(16, 99, 173, 0.47)",
              fontSize:"15px",
            },
          }}
          placeholder={placeHolder}
          value={value}
          sx={fieldStyle}
        />
       </FormControl>
       </Box>
  );
};

const Landblord = () => {
  return (
    <>
      <Grid container sx={{ justifyContent: "space-evenly",mb:2 }} spacing={2}>

        <Grid item xs={6}>
          <TextFieldWrapper
            label={"Name of Landlord"}
            placeHolder={"Name of Landlord"}
          />
        </Grid>
        <Grid item xs={6}>
          <TextFieldWrapper
            label={"Percentage Share%"}
            placeHolder={"Percentage Share%"}
          />
        </Grid>
      </Grid>
    </>
  );
};

function DialogBox({value, setValue}) {
  const [open, setOpen] = useState(true);
  

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
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
        <Grid
          container
          sx={{
            // height: "345px",
            width: "600px",
            borderRadious: "30px ",
            backgroundColor: "#FFFFFF",
            justifyContent: "center",
            alignItems: "center",
            py: 10,
            '@media(max-width:900px)':{width:'300px',py:6}
          }}
          spacing={4}
        >
          <Grid item md={10}>
          <TextFieldWrapper
            label="Enter No of Landlord"
            placeHolder="Enter No of Landlord"
            // width="230px"
            grid='10'
            name={"landblord"}
            onChange={handleChange}
          />
          </Grid>
          <Grid item md={10}>
          {value > 0 ? (
            <>
              {Array.from({ length: value }, (_, i) => (
                <Landblord key={i} />
              ))}
            </>
          ) : (
            ""
          )}
          </Grid>

          <Grid item md={3}>
          {value > 0 ? (
              <Button
                variant="contained"
                onClick={handleClose}
                sx={{
                  height: "40px",
                  width: "100%",
                  borderRadius: "20px",
                  fontSize:"16px",
                  color:"#FFFFFF",
                  lineHeight:"32px",
                  textTransform:"capitalize"
                }}
              >
                Submit
              </Button>
          ) : (
            ""
          )}
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
}

export default DialogBox;
