import React, { useEffect, useState } from "react";
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
          height: "66px"
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
              backgroundColor: "var(--main-color)",
              borderRadius: "20px",
              height: "66px",
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



const YearlyIncrement = ({ value,rent,increment,setIncrement }) => {

  rent = Number(rent)
  let year2;
  let year3;
  let year4;
  let year5;
  if(value === "Percentage"){
     year2 = rent/100*10 + rent;
     year3 = year2/100*12 + rent;
     year4 = year3/100*12 + rent;
     year5 = year4/100*15 +rent;
  }else
   if(value === "Value"){
     year2 = rent + 1000;
     year3 = year2 + 1000;
     year4 = year3 + 1500;
     year5 = year4 + 1500;
  }

useEffect(()=>{
  setIncrement({
    year1:rent,
    year2,
    year3,
    year4,
    year5
  })
},[value])


   
    return (
      <>
      {
        value === "Percentage"&&
      <Grid
        container
        sx={{ justifyContent: "space-evenly", minHeight: "200px", py: 3 }}
        spacing={2}
      >
        <IncrementType
          Year="Year 1"
          Percentage="0%"
          Amount={increment.year1}
          label="Percentage"

        />
        <IncrementType
          Year="Year 2"
          Percentage="10%"
          Amount={increment.year2}
          label="Percentage"
        />
        <IncrementType
          Year="Year 3"
          Percentage="12%"
          Amount={increment.year3}
          label="Percentage"
        />
        <IncrementType
          Year="Year 4"
          Percentage="12%"
          Amount={increment.year4}
          label="Percentage"
        />
        <IncrementType
          Year="Year 5"
          Percentage="15%"
          Amount={increment.year5}
          label="Percentage"
        />
      </Grid>
}
   { value === "Value"&&
      <Grid
        container
        sx={{ justifyContent: "space-evenly", minHeight: "200px", py: 3 }}
        spacing={2}
      >
        <IncrementType
          Year="Year 1"
          Percentage="0"
          Amount={increment.year1}
          label="Value"
        />
        <IncrementType
          Year="Year 2"
          Percentage="1000"
          Amount={increment.year2}
          label="Value"
        />
        <IncrementType
          Year="Year 3"
          Percentage="1000"
          Amount={increment.year3}
          label="Value"
        />
        <IncrementType
          Year="Year 4"
          Percentage="1500"
          Amount={increment.year4}
          label="Value"
        />
        <IncrementType
          Year="Year 5"
          Percentage="1500"
          Amount={increment.year5}
          label="Value"
        />
      </Grid>
    }
    </>
    )
    }


export default YearlyIncrement;


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
      <FormControl fullWidth>
        <TextField
          variant="outlined"
          name={name}
          label={label}
          placeholder={placeHolder}
          value={value}
          fullWidth
          sx={fieldStyle}
        />
      </FormControl>
    </Grid>
  );
};
