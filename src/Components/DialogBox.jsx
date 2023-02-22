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

const labelStyle = {
  fontSize: "18px",
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
  width,
}) => {
  const fieldStyle = {
    border: "1px solid #03C1F3",
    borderRadius: "20px",
    height: "66px",
    width: { width },
    p: 2,
    color: "rgba(16, 99, 173, 0.47)",
    "@media(max-width:900px)": { height: "46px", p: 1 },
  };

  return (
    <Grid item md={10} xs={10}>
      {/* <MyTextfield /> */}
      <FormControl>
        <FormLabel>
          <Typography variant="body1" sx={labelStyle}>
            {label}
          </Typography>
        </FormLabel>
        <TextField
          variant="standard"
          name={name}
          onChange={(e) => onChange(e)}
          InputProps={{
            disableUnderline: true,
            style: {
              color: "rgba(16, 99, 173, 0.47)",
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

const Landblord = () => {
  return (
    <>
      <Grid item md={10} container sx={{ justifyContent: "space-evenly" }}>
        <Grid item md={6}>
          <TextFieldWrapper
            label={"Name of Landblord"}
            placeHolder={"Name of Landblord"}
          />
        </Grid>
        <Grid item md={6}>
          <TextFieldWrapper
            label={"Percentage Share%"}
            placeHolder={"Percentage Share%"}
          />
        </Grid>
      </Grid>
    </>
  );
};

function DialogBox() {
  const [open, setOpen] = useState(true);
  const [value, setValue] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    console.log(value);
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
          }}
          spacing={4}
        >
          <TextFieldWrapper
            label="Enter No of Landblord"
            placeHolder="Enter No of Landblord"
            width="430px"
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
            <Grid item xs={4}>
              <Button
                variant="contained"
                onClick={handleClose}
                sx={{
                  backgroundColor: "#03C1F3",
                  height: "50px",
                  width: "150px",
                  borderRadius: "20px",
                  fontSize:"20px",
                  color:"#FFFFFF",
                  lineHeight:"38px",
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
