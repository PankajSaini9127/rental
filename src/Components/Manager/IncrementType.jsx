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

function IncrementType({ Year, Percentage, Amount, label,increment ,onChange,name}) {
  return (
    <>
      <Grid item container spacing={2}>
        <ValueWrapper value={Year} />
        <TextFieldWrapper value={increment} label={label} onChange={onChange} name={name} />
        <TextFieldWrapper value={Amount} label="Rental Amount" />
      </Grid>
    </>
  );
}



const YearlyIncrement = ({ value,rent,increment,setIncrement,tenure,yearValue,setYearValue }) => {




rent = Number(rent)
let total1;
let total2;
let total3;
let total4;
let total5;
if(value === "Percentage"){
  total1 = rent/100*yearValue.year1 + rent;
   total2 = total1/100*yearValue.year2 + rent;
   total3 = total2/100*yearValue.year3 + rent;
   total4 = total3/100*yearValue.year4 + rent;
   total5 = total4/100*yearValue.year5 +rent;
}else
 if(value === "Value"){
   total1 = rent + yearValue.year1;
   total2 = total1 + yearValue.year2;
   total3 = total2 + yearValue.year3;
   total4 = total3 + yearValue.year4;
   total5 = total4 + yearValue.year5;
}
useEffect(()=>{
  setIncrement({
    year1:total1,
    year2:total2,
    year3:total3,
    year4:total4,
    year5:total5
  })
},[yearValue])

function handleChange (e){
    setYearValue({
      ...yearValue,
      [e.target.name]:Number(e.target.value)
    })
}
    return (
      <>
      {tenure === "11 Month"? null:
        value === "Percentage"?
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
          name="year1"
          increment={yearValue.year1}
          onChange={handleChange}
        />
        <IncrementType
          Year="Year 2"
          Percentage="10%"
          Amount={increment.year2}
          label="Percentage"
          name="year2"
          increment={yearValue.year2}
          onChange={handleChange}

        />
        <IncrementType
          Year="Year 3"
          Percentage="12%"
          Amount={increment.year3}
          label="Percentage"
          increment={yearValue.year3}
          onChange={handleChange}
          name="year3"
        />
        {
          tenure === "5 Year"?
          <>
        <IncrementType
          Year="Year 4"
          Percentage="12%"
          Amount={increment.year4}
          label="Percentage"
          value= {yearValue.year4}
          onChange={handleChange}
          name="year4"
        />
        <IncrementType
          Year="Year 5"
          Percentage="15%"
          Amount={increment.year5}
          label="Percentage"
          value={yearValue.year5}
          onChange={handleChange}
          name="year5"
        />
        </>
        :null
        }
      </Grid>
: value === "Value"?
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
          increment={yearValue.year1}
          onChange={handleChange}
          name="year1"
        />
        <IncrementType
          Year="Year 2"
          Percentage="1000"
          Amount={increment.year2}
          label="Value"
          increment={yearValue.year2}
          onChange={handleChange}
          name="year2"
        />
        <IncrementType
          Year="Year 3"
          Percentage="1000"
          Amount={increment.year3}
          label="Value"
          increment={yearValue.year3}
          onChange={handleChange}
          name="year3"
        />
         {
          tenure === "5 Year"?
          <>
        <IncrementType
          Year="Year 4"
          Percentage="1500"
          Amount={increment.year4}
          label="Value"
          increment={yearValue.year4}
          onChange={handleChange}
          name="year4"
        />
        <IncrementType
          Year="Year 5"
          Percentage="1500"
          Amount={increment.year5}
          label="Value"
          increment={yearValue.year5}
          onChange={handleChange}
          name="year5"
        />
        </> : null}
      </Grid>
     : ""}
  
    
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
          onChange={onChange}
        />
      </FormControl>
    </Grid>
  );
};
