import React, { useEffect, useState } from "react";

// MUI Components
import {
  Box,
  Button,
  Grid,
  Typography,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";

// Custom Style Component

import {
  DocumentUpload,
  MyHeader,
  SelectComponent,
  TextFieldWrapper,
} from "../StyledComponent";

import axios from "axios";

// Components

import HamburgerMenu from "../HamburgerMenu";
import YearlyIncrement from "./IncrementType";
import DialogBox from "./DialogBox";
import { useNavigate } from "react-router-dom";

<<<<<<< HEAD
const incrementType = [
  "Percentage",
  "Value"
]

=======
import { useFormik } from "formik";
import { agreementSchema } from "../ValidationSchema/Manager";

const incrementType = ["Percentage", "Value"];
>>>>>>> a998acda7a818ef6ac3e696505c34d782d7ce1f8

// form initial state

// const initialState={
//   code:"NA000001",
//   leeseName:"",
//   state:"",
//   city:"",
//   location:"",
//   pincode:"",
//   address:"",
//   aadharNo:"",
//   panNo:"",
//   gstNo:"",
//   mobileNo:"",
//   alternateMobile:"",
//   email:"",
//   lockInYear:"",
//   noticePeriod:"",
//   deposite:"",
//   monthlyRent:"",
//   yearlyIncrement:"",
//   bankName:"",
//   benificiaryName:"",
//   accountNo:"",
//   ifscCode:""
// }

function Agreement() {


  const [data, setData] = useState({
    landlord: [],
    code: "",
    lockInYear: "",
    noticePeriod: "",
    deposite: "",
    monthlyRent: "",
    yearlyIncrement: "",
  });

  const [landblord, setLandblord] = useState([]);

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  // upload document
  const handleChangeFile = (e) => {
    console.log(e.target.files);
  };

  //handle Change for uncommon feilds
  function handleChange(e, i) {
    console.log(data)
    if (data.landlord[i]) {
      setData((old) => ({
        ...old,
        landlord: old.landlord.map((row, id) => {
          if (i === id) {
            return {
              ...row,
              [e.target.name]: e.target.value,
            };
          }
          return row;
        }),
      }));
    } else {
      setData((old) => ({
        ...old,
        landlord: [ ...old.landlord,
          {
            [e.target.name]: e.target.value,
          }
        ],
      }));
    }
  }

  // handle Change for common feilds
  function handleCommonChange(e, i) {
    setData((old) => ({...old,[e.target.name]: e.target.value}));
  }

  // on form submit

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
  };

  const APICall = async (values) => {
    const agreement = await axios.post(
      "http://localhost:8080/api/newAgreement",
      values
    );
    console.log(agreement);
  };

  return (
    <>
      {/* dialog box ( popup box ) */}
      <DialogBox value={landblord} setValue={setLandblord} />
      {/* {console.log(landblord)} */}
      <Stack sx={{ flexWrap: "nowrap", flexDirection: "row" }}>
        {/* side nav     */}
        <HamburgerMenu />

        <Box sx={{ flexGrow: 1 }}>
          <MyHeader>New Agreement</MyHeader>

          <Grid container sx={{ justifyContent: "center" }}>
            <Grid item xs={12} md={10}>
              {/* agreement form start here */}
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                  py: 5,
                  backgroundColor: "white",
                  mx: 3,
                  borderRadius: "15px",
                  maxWidth: "1050px",
                  "@media(max-width:900px)": { mx: 0 },
                }}
              >
                {/* Basic details start here */}

                <Grid container sx={{ px: 3 }} spacing={isSmall ? 2 : 4}>
                  <TextFieldWrapper
                    label="Code"
                    placeHolder=""
                    backgroundColor="rgba(3, 193, 243, 0.2);"
                    value={data.code}
                    name = 'code'
                    onChange={handleCommonChange}
                  />

                  {landblord.map((row,i)=><>
                        <TextFieldWrapper
                          label="Name Of Lesse"
                          placeHolder="Enter Name Of Lesse"
                          name="leeseName"
                          value={
                            data.landlord[i] && data.landlord[i].leeseName
                              ? data.landlord[i].leeseName
                              : ""
                          }
                          onChange={(e) => handleChange(e, i)}
                        />
                        <TextFieldWrapper
                          label="State"
                          placeHolder="Enter State"
                          name="state"
                          value={
                            data.landlord[i] && data.landlord[i].state
                              ? data.landlord[i].state
                              : ""
                          }
                          onChange={(e) => handleChange(e, i)}
                          index={i}
                        />

                        <TextFieldWrapper
                          label="City"
                          placeHolder="Enter City"
                          name="city"
                          value={
                            data.landlord[i] && data.landlord[i].city
                              ? data.landlord[i].city
                              : ""
                          }
                          onChange={(e) => handleChange(e, i)}
                          index={i}
                        />
                        <TextFieldWrapper
                          label="Location"
                          placeHolder="Enter Location"
                          name="location"
                          value={
                            data.landlord[i] && data.landlord[i].location
                              ? data.landlord[i].location
                              : ""
                          }
                          onChange={(e) => handleChange(e, i)}
                          index={i}
                        />
                        <TextFieldWrapper
                          label="Pincode"
                          placeHolder="Enter Pincode"
                          name="pincode"
                          value={
                            data.landlord[i] && data.landlord[i].pincode
                              ? data.landlord[i].pincode
                              : ""
                          }
                          onChange={(e) => handleChange(e, i)}
                          index={i}
                        />
                        <TextFieldWrapper
                          label="Address"
                          placeHolder="Enter Address"
                          name="address"
                          value={
                            data.landlord[i] && data.landlord[i].address
                              ? data.landlord[i].address
                              : ""
                          }
                          onChange={(e) => handleChange(e, i)}
                          index={i}
                        />
                        <TextFieldWrapper
                          label="Aadhar Number"
                          placeHolder="Enter Aadhar No."
                          name="aadharNo"
                          value={
                            data.landlord[i] && data.landlord[i].aadharNo
                              ? data.landlord[i].aadharNo
                              : ""
                          }
                          onChange={(e) => handleChange(e, i)}
                          index={i}
                        />
                        <TextFieldWrapper
                          label="Pan Number"
                          placeHolder="Enter Pan No."
                          name="panNo"
                          value={
                            data.landlord[i] && data.landlord[i].panNo
                              ? data.landlord[i].panNo
                              : ""
                          }
                          onChange={(e) => handleChange(e, i)}
                          index={i}
                        />

                        <TextFieldWrapper
                          label="GST Number"
                          placeHolder="Enter GST No."
                          name="gstNo"
                          value={
                            data.landlord[i] && data.landlord[i].gstNo
                              ? data.landlord[i].gstNo
                              : ""
                          }
                          onChange={(e) => handleChange(e, i)}
                          index={i}
                        />
                        <TextFieldWrapper
                          label="Mobile Number"
                          placeHolder="Enter Mobile No."
                          name="mobileNo"
                          value={
                            data.landlord[i] && data.landlord[i].mobileNo
                              ? data.landlord[i].mobileNo
                              : ""
                          }
                          onChange={(e) => handleChange(e, i)}
                          index={i}
                        />
                        <TextFieldWrapper
                          label="Alternate Number"
                          placeHolder="Enter Alternate No."
                          name="alternateMobile"
                          value={
                            data.landlord[i] && data.landlord[i].alternateMobile
                              ? data.landlord[i].alternateMobile
                              : ""
                          }
                          onChange={(e) => handleChange(e, i)}
                          index={i}
                        />

                        <TextFieldWrapper
                          label="Email"
                          placeHolder="Enter Email"
                          name="email"
                          value={
                            data.landlord[i] && data.landlord[i].email
                              ? data.landlord[i].email
                              : ""
                          }
                          onChange={(e) => handleChange(e, i)}
                          index={i}
                        />
                      </>
                    )
                  }

                  <TextFieldWrapper
                    label="Lock In Year(If Applicable)"
                    placeHolder="Enter Lock in Year"
                    name="lockInYear"
                    value={data.lockInYear}
                    onChange={handleCommonChange}
                  />
                  <TextFieldWrapper
                    label="Notice Period In Month"
                    placeHolder="Enter Notice Period"
                    name="noticePeriod"
                    value={data.noticePeriod}
                    onChange={handleCommonChange}
                  />
                  <TextFieldWrapper
                    label="Deposite Amount"
                    placeHolder="Enter Deposite Amount"
                    name="deposite"
                    value={data.deposite}
                    onChange={handleCommonChange}
                  />
                  <TextFieldWrapper
                    label="Monthly Rental"
                    placeHolder="Enter Rental"
                    name="monthlyRent"
                    value={data.monthlyRent}
                    onChange={handleCommonChange}
                  />
                  <SelectComponent
                    label={"Yearly Increment"}
                    name="yearlyIncrement"
                    options={incrementType}
                    value={data.yearlyIncrement}
                    onChange={handleCommonChange}
                  />
                </Grid>

                {/* basic details end here */}

                {/* Increment Yearly */}
                <YearlyIncrement value={data.yearlyIncrement} />

                {/* Bank Details start here*/}
                <Typography
                  variant="body1"
                  color="var(--main-color)"
                  fontSize="25px"
                  lineHeight="28px"
                  fontWeight="600"
                  my="20px"
                >
                  Bank Detail
                </Typography>

                {landblord.map((_, i) =>
                    <>
                      {landblord.length > 0 ? (
                        <Typography>Landlord Name</Typography>
                      ) : (
                        ""
                      )}
                      <Grid container sx={{ px: 3 }} spacing={isSmall ? 2 : 4}>
                        <TextFieldWrapper
                          label="Bank Name"
                          placeHolder="Enter Bank Name"
                          name="bankName"
                          value={data.bankName}
                          onChange={(e) => handleChange(e, i)}
                        />
                        <TextFieldWrapper
                          label="Benificiary Name"
                          placeHolder="Enter Benificiary Name"
                          name="benificiaryName"
                          value={data.benificiaryName}
                          onChange={(e) => handleChange(e, i)}
                        />
                        <TextFieldWrapper
                          label="Bank A/C Number "
                          placeHolder="Enter Account No."
                          name="accountNo"
                          value={data.accountNo}
                          onChange={(e) => handleChange(e, i)}
                        />
                        <TextFieldWrapper
                          label="Bank IFSC Code"
                          placeHolder="Enter IFSC Code"
                          name="ifscCode"
                          value={data.ifscCode}
                          onChange={(e) => handleChange(e, i)}
                        />
                      </Grid>
                    </>
                  )
                }

                {/* Bank Details ends here*/}

                {/* Document upload section start here */}

                {/* Document */}
                <Typography
                  variant="body1"
                  color="var(--main-color)"
                  fontSize="25px"
                  lineHeight="28px"
                  fontWeight="600"
                  my="20px"
                >
                  Upload Document
                </Typography>

                {landblord.map((_, i) => <>
                      {landblord.length > 1 ? (
                        <Typography>Landlord Name</Typography>
                      ) : (
                        ""
                      )}
                      <Grid
                        container
                        spacing={isSmall ? 2 : 4}
                        sx={{ px: 1, justifyContent: "space-evenly", mb: 3 }}
                      >
                        <DocumentUpload
                          label="Upload Aadhar Card"
                          placeHolder="Upload Aadhar Card"
                        />

                        <DocumentUpload
                          label="Upload Pan Card"
                          placeHolder={"Upload Pan Card"}
                        />
                      </Grid>
                    </>
                  )
                }

                {landblord.length > 0 ? (
                  <Typography
                    variant="body1"
                    color="var(--main-color)"
                    fontSize="25px"
                    lineHeight="28px"
                    fontWeight="600"
                    my="20px"
                  >
                    Upload Document
                  </Typography>
                ) : (
                  ""
                )}

                <Grid
                  container
                  spacing={isSmall ? 2 : 4}
                  sx={{ px: 1, justifyContent: "space-evenly" }}
                >
                  <DocumentUpload
                    label="Upload GST Certificate"
                    placeHolder="Upload GST Certificate"
                  />
                  <DocumentUpload
                    label="Upload Draft Agreement"
                    placeHolder="Upload Draft Agreement"
                  />
                  <DocumentUpload
                    label="Upload Electricity Bill"
                    placeHolder={"Upload Electricity Bill"}
                  />

                  <DocumentUpload
                    label="Upload POA(If Applicable)"
                    placeHolder="Upload POA"
                  />

                  <DocumentUpload
                    label="Upload Maintaince Bill"
                    placeHolder={"Upload Maintaince Bill"}
                  />

                  <DocumentUpload
                    label="Upload Cencel Bank Cheque"
                    placeHolder="Upload Cencel Bank Cheque"
                  />
                  <DocumentUpload
                    label="Upload Property Tax Receipt"
                    placeHolder={"Upload Property Tax Receipt"}
                  />
                  <DocumentUpload
                    label="Upload Noc(If Mutiple Oweners)"
                    placeHolder="Upload GST Certificate"
                  />
                </Grid>

                {/* Document upload section end here */}

                {/* Button Start from here */}
                <Grid
                  container
                  sx={{ justifyContent: "center", mt: 2 }}
                  spacing={4}
                >
                  <Grid item md={3} xs={6}>
                    <Button
                      variant="contained"
                      type="submit"
                      color="primary"
                      sx={{
                        height: "60px",
                        width: "100%",
                        borderRadius: "20px",
                        fontSize: "16px",
                        color: "#FFFFFF",
                        lineHeight: "32px",
                        textTransform: "capitalize",
                        "@media(max-width:900px)": {
                          fontSize: "11px",
                          lineHeight: "12px",
                          height: "40px",
                        },
                      }}
                    >
                      Add Agreement
                    </Button>
                  </Grid>

                  <Grid item md={3} xs={6}>
                    <Button
                      variant="outlined"
                      color="primary"
                      sx={{
                        height: "60px",
                        width: "100%",
                        borderRadius: "20px",
                        fontSize: "16px",
                        lineHeight: "32px",
                        textTransform: "capitalize",
                        "@media(max-width:900px)": {
                          fontSize: "10px",
                          lineHeight: "20px",
                          height: "40px",
                        },
                      }}
                    >
                      Hold
                    </Button>
                  </Grid>
                </Grid>

                {/* Button Ends Here */}
              </Box>

              {/* agreemenet from end here */}
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </>
  );
}

export default Agreement;
