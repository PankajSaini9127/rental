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
          height: "66px",
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

function IncrementType({
  disabled,
  Year,
  Percentage,
  Amount,
  label,
  increment,
  onChange,
  name,
  partLabel,
}) {
  return (
    <>
      <Grid item container spacing={2}>
        <ValueWrapper value={Year} />
        <TextFieldWrapper
          value={increment}
          label={label}
          onChange={onChange}
          name={name}
          disabled={disabled}
        />
        <TextFieldWrapper
          textAlignRight={"textAlignRight"}
          disabled={true}
          value={Math.ceil(Amount)}
          partLabel={partLabel}
          label="Rental Amount"
        />
      </Grid>
    </>
  );
}

const YearlyIncrement = ({
  monthlyRent,
  value,
  rent,
  increment,
  setIncrement,
  tenure,
  yearValue,
  setYearValue,
  disabled,
  partLabel,
}) => {
  rent = Number(rent);
  let total1;
  let total2;
  let total3;
  let total4;
  let total5;
  if (value === "Percentage") {
    total1 = (rent / 100) * yearValue.year1 + rent;
    total2 = (total1 / 100) * yearValue.year2 + total1;
    total3 = (total2 / 100) * yearValue.year3 + total2;
    total4 = (total3 / 100) * yearValue.year4 + total3;
    total5 = (total4 / 100) * yearValue.year5 + total4;

    total1 = parseFloat(total1);
    total2 = parseFloat(total2);
    total3 = parseFloat(total3);
    total4 = parseFloat(total4);
    total5 = parseFloat(total5);
  } else if (value === "Value") {
    total1 = rent + parseInt(yearValue.year1);
    total2 = total1 + parseInt(yearValue.year2);
    total3 = total2 + parseInt(yearValue.year3);
    total4 = total3 + parseInt(yearValue.year4);
    total5 = total4 + parseInt(yearValue.year5);
  }
  useEffect(() => {
    if (tenure < 12) {
      setIncrement({
        year1: 0,
        year2: 0,
        year3: 0,
        year4: 0,
        year5: 0,
      });
    } else {
      let index = parseInt(tenure.split(" ")[0]);
      let arr = [total1, total2, total3, total4, total5];
      let final = {};
      arr.map((total, i) => {
        if (i + 1 <= index) {
          final = { ...final, ["year" + (i + 1)]: total };
        }
      });

      // console.log(final)

      setIncrement(final);
    }
  }, [yearValue, value, tenure, monthlyRent]);

  function handleChange(e) {
    console.log(e.target.value);

    if (e.target.value.match(/^[0-9]*$/)) {
      setYearValue({
        ...yearValue,
        [e.target.name]: e.target.value,
      });
    } else {
      console.log("");
    }
  }

  return (
    <>
      {tenure > 12 && value === "Percentage" ? (
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
            partLabel={"Old Year 1 Rental Amount:" + partLabel.year1}
            increment={0}
            onChange={handleChange}
            disabled={true}
          />
          <IncrementType
            Year="Year 2"
            Percentage="10%"
            Amount={increment.year2}
            label="Percentage"
            name="year2"
            partLabel={"Old Rental Year 2 Amount:" + partLabel.year2}
            increment={yearValue.year2 || ""}
            onChange={handleChange}
            disabled={disabled}
          />
          {tenure > 24 ? (
            <>
              <IncrementType
                Year="Year 3"
                Percentage="15%"
                Amount={increment.year3}
                label="Percentage"
                increment={yearValue.year3 || ""}
                partLabel={"Old Year 3 Rental Amount:" + partLabel.year3}
                onChange={handleChange}
                name="year3"
                disabled={disabled}
              />
            </>
          ) : null}
          {tenure > 36 ? (
            <>
              <IncrementType
                Year="Year 4"
                Percentage="15%"
                Amount={increment.year4}
                label="Percentage"
                increment={yearValue.year4 || ""}
                partLabel={"Old Year 4 Rental Amount:" + partLabel.year4}
                onChange={handleChange}
                name="year4"
                disabled={disabled}
              />
            </>
          ) : null}
          {tenure > 48 ? (
            <>
              <IncrementType
                Year="Year 5"
                Percentage="15%"
                Amount={increment.year5}
                label="Percentage"
                increment={yearValue.year5 || ""}
                partLabel={"Old Year 5 Rental Amount:" + partLabel.year5}
                onChange={handleChange}
                name="year5"
                disabled={disabled}
              />
            </>
          ) : null}
        </Grid>
      ) : value === "Value" ? (
        <Grid
          container
          sx={{ justifyContent: "space-evenly", minHeight: "200px", py: 3 }}
          spacing={2}
        >
          <IncrementType
            Year="Year 1"
            Percentage="0"
            Amount={increment.year1 || ""}
            label="Value"
            increment={0}
            onChange={handleChange}
            name="year1"
            disabled={true}
          />
          <IncrementType
            Year="Year 2"
            Percentage="1000"
            Amount={increment.year2 || ""}
            label="Value"
            increment={yearValue.year2 || ""}
            onChange={handleChange}
            name="year2"
            disabled={disabled}
          />

          {tenure > 24 ? (
            <>
              <IncrementType
                Year="Year 3"
                Percentage="15%"
                Amount={increment.year3}
                label="Value"
                increment={yearValue.year3 || ""}
                onChange={handleChange}
                name="year3"
                disabled={disabled}
              />
            </>
          ) : null}
          {tenure > 36 ? (
            <>
              <IncrementType
                Year="Year 4"
                Percentage="15%"
                Amount={increment.year4}
                label="Value"
                increment={yearValue.year4 || ""}
                onChange={handleChange}
                name="year4"
                disabled={disabled}
              />
            </>
          ) : null}
          {tenure > 48 ? (
            <>
              <IncrementType
                Year="Year 5"
                Percentage="15%"
                Amount={increment.year5}
                label="Value"
                increment={yearValue.year5 || ""}
                onChange={handleChange}
                name="year5"
                disabled={disabled}
              />
            </>
          ) : null}
        </Grid>
      ) : (
        ""
      )}
    </>
  );
};

export default YearlyIncrement;

const fieldStyle = {
  // border: "1px solid #03C1F3",
  // borderRadius: "20px",
  height: "66px !important",
  // p: 2,
  color: "rgba(16, 99, 173, 0.47)",
  mt: "30px",
  "@media(max-width:900px)": { height: "46px", p: 1 },
};

const TextFieldWrapper = ({
  textAlignRight,
  disabled,
  label,
  placeHolder,
  value,
  name,
  onChange,
  partLabel,
}) => {
  return (
    <Grid item md={4} xs={4}>
      <FormControl fullWidth className="textFieldWrapper">
        <TextField
          variant="outlined"
          name={name}
          disabled={disabled}
          className={textAlignRight}
          helperText={partLabel}
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
