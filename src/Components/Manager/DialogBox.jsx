import {
  Dialog,
  FormControl,
  FormLabel,
  Grid,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { CustomTextField } from "../StyledComponent";

const labelStyle = {
  fontSize: "15px",
  lineHeight:"30px",
  color: "#03C1F3",
  fontWeight: "600",
  "@media(max-width:900px)": { fontSize: "10px" },
};

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
    <Grid item md={10} xs={grid}>
      {/* <MyTextfield /> */}
      <FormControl fullWidth>
        {/* <FormLabel>
          <Typography variant="body1" sx={labelStyle}>
            {label}
          </Typography>
        </FormLabel> */}
        <TextField
          variant="outlined"
          label={label}
          name={name}
          type={'number'}
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
    </Grid>
  );
};

const Landblord = () => {
  return (
    <>
      <Grid item md={10} xs={11.5} container sx={{ justifyContent: "center" }} spacing={0}>
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
            width: "500px",
            borderRadious: "30px ",
            backgroundColor: "#FFFFFF",
            justifyContent: "center",
            alignItems: "center",
            py: 10,
            '@media(max-width:900px)':{width:'300px',py:6}
          }}
          spacing={4}
        >
          <TextFieldWrapper
            label="Enter No of Landlord"
            placeHolder="Enter No of Landlord"
            // width="230px"
            grid='10'
            name={"landblord"}
            onChange={handleChange}
          />

          {value > 0 ? (
            <>
              {Array.from({ length: value }, (_, i) => (
                <Landblord key={i} />
              ))}
            </>
          ) : (
            ""
          )}
          {value > 0 ? (
            <Grid item md={4} xs={6}>
              <Button
                variant="contained"
                onClick={handleClose}
                sx={{
                  backgroundColor: "#03C1F3",
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
            </Grid>
          ) : (
            ""
          )}
        </Grid>
      </Dialog>
    </>
  );
}

export default DialogBox;
