import React from "react";
// import { TextFieldWrapper } from "./StyledComponent";
import {
  Grid,
  Typography,
  FormControl,
  FormLabel,
  TextField,
} from "@mui/material";

const ValueWrapper = ({ label, value }) => {
  return (
    <>
      <Grid
        item
        md={4}
        xs={4}
        sx={{
          height: "66px",
          //  width: "280px",
          //  '@media(max-width:900px)':{height:"46px"}
        }}
      >
        <FormControl fullWidth>
          <FormLabel>
            <Typography
              variant="body1"
              fontWeight="600"
              fontSize="20px"
              color="var(--main-color)"
              minHeight="30px"
              sx={{
                "@media(max-width:900px)": {
                  fontSize: "10px",
                  minHeight: "15px",
                },
              }}
            >
              {label}
            </Typography>
          </FormLabel>

          <Grid
            container
            sx={{
              // border: "1px solid #03C1F3",
              backgroundColor: "var(--main-color)",
              borderRadius: "20px",
              height: "66px",
              // width: "280px",
              justifyContent: "center",
              alignItems: "center",
              "@media(max-width:900px)": { height: "46px" },
            }}
          >
            <Typography
              fontSize="20px"
              lineHeight="30px"
              color="#FFFFFF"
              sx={{
                "@media(max-width:900px)": {
                  fontSize: "12px",
                  lineHeight: "20px",
                },
              }}
            >
              {value}
            </Typography>
          </Grid>
        </FormControl>
      </Grid>
    </>
  );
};

function IncrementType({ Year, Percentage, Amount, label }) {
  return (
    <>
      <Grid item container spacing={2}>
        <ValueWrapper value={Year} />
        <ValueWrapper label={label} value={Percentage} />
        <TextFieldWrapper value={Amount} label="Rental Amount" />
      </Grid>
    </>
  );
}

const YearlyIncrement = ({ value }) => {
  if (value === "Percentage") {
    return (
      <Grid
        container
        sx={{ justifyContent: "space-evenly", minHeight: "200px", py: 3 }}
        spacing={2}
      >
        <IncrementType
          Year="Year 1"
          Percentage="0%"
          Amount="10000"
          label="Percentage"
        />
        <IncrementType
          Year="Year 2"
          Percentage="10%"
          Amount="11000"
          label="Percentage"
        />
        <IncrementType
          Year="Year 3"
          Percentage="12%"
          Amount="12320"
          label="Percentage"
        />
        <IncrementType
          Year="Year 4"
          Percentage="12%"
          Amount="13798"
          label="Percentage"
        />
        <IncrementType
          Year="Year 5"
          Percentage="15%"
          Amount="15868"
          label="Percentage"
        />
      </Grid>
    );
  }

  if (value === "Value") {
    return (
      <Grid
        container
        sx={{ justifyContent: "space-evenly", minHeight: "200px", py: 3 }}
        spacing={2}
      >
        <IncrementType
          Year="Year 1"
          Percentage="0"
          Amount="10000"
          label="Value"
        />
        <IncrementType
          Year="Year 2"
          Percentage="1000"
          Amount="11000"
          label="Value"
        />
        <IncrementType
          Year="Year 3"
          Percentage="1000"
          Amount="12000"
          label="Value"
        />
        <IncrementType
          Year="Year 4"
          Percentage="1500"
          Amount="13600"
          label="Value"
        />
        <IncrementType
          Year="Year 5"
          Percentage="1500"
          Amount="15000"
          label="Value"
        />
      </Grid>
    );
  }
};

export default YearlyIncrement;

const labelStyle = {
  fontSize: "20px",
  color: "#03C1F3",
  fontWeight: "600",
  minheight:"30px",
  "@media(max-width:900px)": { fontSize: "10px" },
};

const fieldStyle = {
  // border: "1px solid #03C1F3",
  // borderRadius: "20px",
  height: "66px !important",
  // p: 2,
  color: "rgba(16, 99, 173, 0.47)",
  mt:"30px",
  "@media(max-width:900px)": { height: "46px", p: 1 },
};

const TextFieldWrapper = ({ label, placeHolder, value, name, onChange }) => {
  return (
    <Grid item md={4} xs={4}>
      {/* <MyTextfield /> */}
      <FormControl fullWidth>
        {/* <FormLabel>
          <Typography variant="body1" sx={labelStyle}>
            
          </Typography>
        </FormLabel> */}
        <TextField
          variant="outlined"
          name={name}
          label={label}
          onChange={(e) => onChange(e)}
          // InputProps={{
          //   disableUnderline: true,
          // }}
          placeholder={placeHolder}
          value={value}
          fullWidth
          sx={fieldStyle}
        />
      </FormControl>
    </Grid>
  );
};
