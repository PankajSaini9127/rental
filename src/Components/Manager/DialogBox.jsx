import {
  Dialog,
  FormControl,
  Grid,
  TextField,
  Button,
  Box,
} from "@mui/material";
import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { addLandLoard } from "../../store/action/action";

const TextFieldWrapper = ({ label, placeHolder, value, name, onChange }) => {
  const fieldStyle = {
    height: "50px",
    color: "rgba(16, 99, 173, 0.47)",
    "@media(max-width:900px)": { height: "46px", p: 1 },
  };

  return (
    <Box sx={{ width: "100%" }} className="textFieldWrapper">
      <FormControl fullWidth>
        <TextField
          variant="outlined"
          label={label}
          name={name}
          type={"text"}
          onChange={(e) => onChange(e)}
          fullWidth
          InputProps={{
            disableUnderline: true,
            style: {
              color: "rgba(16, 99, 173, 0.47)",
              fontSize: "15px",
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

const Landblord = ({ value, setValue, index }) => {
  function handleChange(e) {
    if (value[index]) {
      setValue((old) =>
        old.map((row, i) => {
          if (index === i) {
            return {
              ...row,
              [e.target.name]: e.target.value,
            };
          }
          return row;
        })
      );
    } else {
      setValue((old) => [
        ...old,
        {
          [e.target.name]: e.target.value,
        },
      ]);
    }
  }

  return (
    <>
      <Grid
        container
        sx={{ justifyContent: "space-evenly", mb: 2 }}
        spacing={2}
      >
        <Grid item xs={6}>
          <TextFieldWrapper
            label={"Name of Landlord"}
            placeHolder={"Name of Landlord"}
            name={"name"}
            value={value[index] && value[index].name ? value[index].name : ""}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextFieldWrapper
            label={"Percentage Share%"}
            placeHolder={"Percentage Share%"}
            name={"percentage"}
            value={
              (value[index] && value[index].percentage && value[index].percentage <= 100)
                ? value[index].percentage
                : ''
            }
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </>
  );
};

function DialogBox({ value, setValue }) {
  const [open, setOpen] = useState(true);

  const [data, setData] = useState([]);

  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(addLandLoard(data));
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setValue(Array.from({length : e.target.value},i=>i));
  };

  return (
    <>
      <Dialog
        open={open}
        // onClose={handleClose}
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
            "@media(max-width:900px)": { width: "300px", py: 6 },
          }}
          spacing={4}
        >
          <Grid item md={10}>
            <TextFieldWrapper
              label="Enter No of Landlord"
              placeHolder="Enter No of Landlord"
              // width="230px"
              grid="10"
              name={"landblord"}
              onChange={handleChange}
            />
          </Grid>
          <Grid item md={10}>
            {value.length > 0 ? (
              <>
                {value.map((_, i) => (
                  <Landblord
                    key={i}
                    index={i}
                    value={data}
                    setValue={setData}
                  />
                ))}
              </>
            ) : (
              ""
            )}
          </Grid>

          <Grid item md={3}>
            {value.length > 0 ? (
              <Button
                variant="contained"
                onClick={handleSubmit}
                sx={{
                  height: "40px",
                  width: "100%",
                  borderRadius: "20px",
                  fontSize: "16px",
                  color: "#FFFFFF",
                  lineHeight: "32px",
                  textTransform: "capitalize",
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
