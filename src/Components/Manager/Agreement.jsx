import React, { useEffect, useState } from "react";

//icons
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

// MUI Components
import {
  Box,
  Button,
  Grid,
  Typography,
  Stack,
  useTheme,
  useMediaQuery,
  Autocomplete,
  TextField,
  MenuItem,
  FormControl,
  IconButton,
  Collapse,
} from "@mui/material";

// Custom Style Component

import {
  DocumentUpload,
  MyHeader,
  SelectComponent,
  TextFieldWrapper,
} from "../StyledComponent";

// Components
import { useNavigate } from "react-router-dom";
import HamburgerMenu from "../HamburgerMenu";
import YearlyIncrement from "./IncrementType";
import DialogBox from "./DialogBox";
import {
  add_agreement,
  add_landlord,
  getStateList,
  uploadDoc,
  getCityList,
  getBankName,
  getLocation,
} from "../../Services/Services";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../../store/action/action";
import PermissionAlert from "./Alert";

function Agreement() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { landloard, auth } = useSelector((state) => state);

  const manager_id = auth.id;
  const codeGenerater = () => {
    var length = 6,
      charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      random = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
      random += charset.charAt(Math.floor(Math.random() * n));
      setData({ ...data, code: random });
    }
  };

  useEffect(() => {
    codeGenerater();
  }, []);
  // console.log(">>>>", landloard);
  const [i, setIndex] = useState(0);
  const [data, setData] = useState({
    landlord: [...landloard],
    code: "",
    lockInYear: "",
    noticePeriod: "",
    monthlyRent: "",
    yearlyIncrement: "",
    tenure: "",
    state: "",
    deposit : 0,
    pincode: "",
    location: "",
    city: "",
  });

  useEffect(() => {
    setData((old) => ({ ...old, landlord: [...landloard] }));
    setFormError((old) => ({ ...old, landlord: [...landloard] }));
  }, [landloard]);

  const [landblord, setLandblord] = useState([1]);

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const [formError, setFormError] = useState({ landlord: [...landloard],
    code: "",
    lockInYear: "",
    noticePeriod: "",
    deposit: "",
    monthlyRent: "",
    yearlyIncrement: "",
    tenure: "",
    state: "",
    pincode: "",
    location: "",
    city: "",});
  const [isSubmit, setIsSubmit] = useState(false);

  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);

  const [expand, setExpand] = useState(0);
  const [docExpand, setDocExpand] = useState(0);

  const [increment, setIncrement] = useState({
    year1: "",
    year2: "",
    year3: "",
    year4: "",
    year5: "",
  });
  const [yearValue, setYearValue] = useState({
    year1: 0,
    year2: 0,
    year3: 0,
    year4: 0,
    year5: 0,
  });

  // upload document
  async function handleChangeFile(e) {
    const FD = new FormData();
    console.log(e.target.files[0])
    FD.append("photo", e.target.files[0]);
    let response = await uploadDoc(FD);
console.log(data)
    if (response.status === 200) {
      setData((old) => ({ ...old, [e.target.name]: response.data.link, [e.target.name+"_name"] : e.target.files[0].name }));
      dispatch(
        setAlert({
          open: true,
          variant: "success",
          message: response.data.message,
        })
      );
    } else {
      dispatch(
        setAlert({
          open: true,
          variant: "error",
          message: response.data.message || "Something went wrong !!!",
        })
      );
    }
  }

  function checksum(g){
    let regTest = /\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/.test(g)
     if(regTest){
        let a=65,b=55,c=36;
        return Array['from'](g).reduce((i,j,k,p)=>{ 
           p=(p=(j.charCodeAt(0)<a?parseInt(j):j.charCodeAt(0)-b)*(k%2+1))>c?1+(p-c):p;
           return k<14?i+p:j==((c=(c-(i%c)))<10?c:String.fromCharCode(c+b));
        },0); 
    }
    return regTest
}

  //handle Change for uncommon feilds
  function handleChange(e, i) {
    let error = { state: false, message: null };
    // console.log(e.target.name, e.target.value);
    switch (e.target.name) {
      case "leeseName":
        if (!e.target.value.match(/^[a-zA-Z ]*$/))
          error = { state: true, message: "Value must be Correct" };
        break;
      case "pincode":
        if (!e.target.value.match(/^[0-9]*$/))
          error = { state: true, message: "Value must be Correct" };
        if (e.target.value.length < 6 && e.target.value.length > 0)
          error = { ...error, message: "Pincode number must be of 6 digit." };
        else error = { ...error, message: null };
        break;
      case "aadharNo":
        if (!e.target.value.match(/^[0-9]*$/))
          error = { ...error, state: true };
        if (e.target.value.length < 12 && e.target.value.length > 0)
          error = { ...error, message: "Aadhar number must be of 12 digit." };
        else error = { ...error, message: null };
        break;
      case "mobileNo":
        if (!e.target.value.match(/^[0-9]*$/))
          error = { ...error, state: true };
        if (e.target.value.length < 10 && e.target.value.length > 0)
          error = { ...error, message: "Phone number must be of 10 digit." };
        else error = { ...error, message: null };
        break;
      case "alternateMobile":
        if (!e.target.value.match(/^[0-9]*$/))
        error = { ...error, state: true };
      if (e.target.value.length < 10 && e.target.value.length > 0)
        error = { ...error, message: "Phone number must be of 10 digit." };
      else error = { ...error, message: null };
        break;
      case "bankName":
        if (!e.target.value.match(/^[a-zA-Z ]*$/))
          error = { state: true, message: "Value must be Correct" };
        break;
      case "benificiaryName":
        if (!e.target.value.match(/^[a-zA-Z ]*$/))
          error = { state: true, message: "Value must be Correct" };
        break;
      case "accountNo":
        if (!e.target.value.match(/^.{0,17}$/))
          error = { ...error, state: true };
        if (e.target.value.length > 17 && e.target.value.length > 0)
          error = { ...error, message: "Account can be of 17 digit only." };
        else error = { ...error, message: null };
        break;

      case "email":
          // pattern match          
        if (!e.target.value.match(  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) && e.target.value.length > 0)
          error = { ...error, message: "Email address should be like example@gmail.com." };
        else error = { ...error, message: null };
        break;
      case "panNo":
        e.target.value = e.target.value.toUpperCase();
        if (!e.target.value.match(/^.{0,10}$/))
          error = { state: true, message: null };
          // pattern match
        if (!e.target.value.match(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/) && e.target.value.length > 0)
          error = { ...error, message: "PAN number should be like NOOPS8327k." };
        else error = { ...error, message: null };
        break;
      case "gstNo":
        e.target.value = e.target.value.toUpperCase();
        if (!e.target.value.match(/^.{0,15}$/))
          error = { state: true, message: null };
          // pattern match
        if (!checksum(e.target.value)&& e.target.value.length > 0)
          error = { ...error, message: "GST number should be like 27AAPFU0939F1ZV." };
        else error = { ...error, message: null };
        break;
      case "ifscCode":
        // e.target.value = e.target.value.toUpperCase();
        if (!e.target.value.match(/^.{0,11}$/))
          error = { state: true, message: null };
        break;
      default:
        break;
    }
    if (e.target.name === "ifscCode" && e.target.value.length === 11) {
      console.log(e.target.name);
      getBankDetails(e.target.value, i);
    }
    if (!error.state) {
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
          landlord: [
            ...old.landlord,
            {
              [e.target.name]: e.target.value,
            },
          ],
        }));
      }
    }

    if (error.message) {
      if (formError.landlord[i]) {
        setFormError((old) => ({
          ...old,
          landlord: old.landlord.map((row, id) => {
            if (i === id) {
              return {
                ...row,
                [e.target.name]: error.message,
              };
            }
            return row;
          }),
        }));
      } else {
        setFormError((old) => ({
          ...old,
          landlord: [
            ...old.landlord,
            {
              [e.target.name]: error.message,
            },
          ],
        }));
      }
    } else {
      if (formError.landlord[i]) {
        setFormError((old) => ({
          ...old,
          landlord: old.landlord.map((row, id) => {
            if (i === id) {
              return {
                ...row,
                [e.target.name]: "",
              };
            }
            return row;
          }),
        }));
      } else {
        setFormError((old) => ({
          ...old,
          landlord: [
            ...old.landlord,
            {
              [e.target.name]: "",
            },
          ],
        }));
      }
    }
  }

  // handle Change for common feilds
  function handleCommonChange(e, i) {
    // console.log(e.target.name);
    // console.log(data.state);
    var error = false;
    switch (e.target.name) {
      case "state":
        // console.log('state',e.target.value.match(/^[a-zA-Z ]*$/))
        if (!e.target.value.match(/^[a-zA-Z ]*$/))
          error = { state: true, message: "Value must be Correct" };
        break;
      case "pincode":
        if (!e.target.value.match(/^[0-9]*$/))
          error = { state: true, message: "Value must be Correct" };
        break;
      case "lockInYear":
        if (!e.target.value.match(/^[0-9]*$/))
          error = { state: true, message: "Value must be Correct" };
        break;
      case "rental_amount":
        if (!e.target.value.match(/^[0-9]*$/))
          error = { state: true, message: "Value must be Correct" };
        break;
      case "noticePeriod":
        if (!e.target.value.match(/^[0-9]*$/))
          error = { state: true, message: "Value must be Correct" };
        else e.target.value = e.target.value.toLocaleString("hi");
        break;
      case "monthlyRent":
        if (!e.target.value.match(/^[0-9]*$/))
          error = { state: true, message: "Value must be Correct" };
        break;
      case "deposit":
        // if (!e.target.value.match(/^[0-9]+$/))
          // error = { state: true};
          // if(e.target.value.length > 0)
          // {
            // e.target.value = (Number(e.target.value).toLocaleString("en")).toString();
          //   error = { state: false, message: "Value must be Correct" };}
        break;
      default:
        break;
    }
console.log(e.target.name,parseInt(e.target.value).toLocaleString("en"))
    if (!error.status) setData((old) => ({ ...old, [e.target.name]: e.target.value}));

  }

  // on form submit

  const handleConfirm = (id) => {
    setOpen(false);
    // console.log(data)
    const {
      code,
      lockInYear,
      monthlyRent,
      noticePeriod,
      yearlyIncrement,
      deposit,
      gst_certificate,
      draft_agreement,
      electricity_bill,
      poa,
      maintaince_bill,
      cheque,
      tax_receipt,
      noc,
      tenure,
      year1,
      year2,
      year3,
      year4,
      year5,
      pincode,
      state,
      address,
      location,
      city,
    } = data;

    const { landlord } = data;

    APICall(
      {
        code,
        lockInYear,
        monthlyRent,
        noticePeriod,
        yearlyIncrement,
        deposit,
        gst_certificate,
        draft_agreement,
        electricity_bill,
        poa,
        maintaince_bill,
        cheque,
        tax_receipt,
        noc,
        tenure,
        year1,
        year2,
        year3,
        year4,
        year5,
        pincode,
        state,
        address,
        location,
        city,
        manager_id: id,
        status: "Sent To Sr Manager",
      },
      landlord
    );
  };

  function handleHold(id) {
    console.log(increment);
    // setData({ ...data, ...increment });
    // console.log(data)
    handleHoldApiCall(id, { ...data, ...increment });
  }

  async function handleHoldApiCall(id, data) {
    // console.log(data)
    const {
      pincode,
      state,
      address,
      location,
      city,
      code,
      lockInYear,
      monthlyRent,
      noticePeriod,
      yearlyIncrement,
      deposit,
      gst_certificate,
      draft_agreement,
      electricity_bill,
      poa,
      maintaince_bill,
      cheque,
      tax_receipt,
      noc,
      tenure,
      year1,
      year2,
      year3,
      year4,
      year5,
    } = data;
    console.log(year1, year2, year3, year4, year5);
    const { landlord } = data;
    APICall(
      {
        code,
        lockInYear,
        monthlyRent,
        noticePeriod,
        yearlyIncrement,
        deposit,
        gst_certificate,
        draft_agreement,
        electricity_bill,
        poa,
        maintaince_bill,
        cheque,
        tax_receipt,
        noc,
        tenure,
        year1,
        year2,
        year3,
        year4,
        year5,
        pincode,
        state,
        address,
        location,
        city,
        manager_id: id,
        status: "Hold",
      },
      landlord
    );
  }

  async function APICall(values, landlordData) {
    console.log(values,landlordData)
    const agreement = await add_agreement(values);

    // return 1
    if (agreement.data.success) {
      const agreement_id = agreement.data.agreement[0];

      console.log(">>>",agreement_id)


      landlordData = landlordData.map((row, index) => {
        let aadhar_card = `${(row.leeseName + "@aadhar_card").replace(
          " ",
          ""
        )}`;
        let pan_card = `${(row.leeseName + "@pan_card").replace(" ", "")}`;
        let gst = `${(row.leeseName + "@gst").replace(" ", "")}`;
        console.log(">>>>", landlordData);
        console.log(">>>>", data);
        return {
          ...row,
          // percentageShare: row.percentage,
          name: row.leeseName,
          agreement_id,
          aadhar_card: data[aadhar_card],
          pan_card: data[pan_card],
          gst: data[gst],
        };
      });

      console.log(landlordData)
      // return 1

      const result = await add_landlord(landlordData);

      if (result) {
        navigate("/listing");
        dispatch(
          setAlert({
            open: true,
            variant: "success",
            message: "Agreement Submitted.",
          })
        );
      }
    }
  }

  async function getBankDetails(data, i) {
    try{
    console.log(data)
    let res = await getBankName(data);

    if (res.status === 200) {
      setData((old) => ({
        ...old,
        landlord: old.landlord.map((row, index) => {
          if (index === i) {
            return { ...row, bankName: res.data.BANK };
          } else return row;
        }),
      }));
    }
    }
    catch(err){
      setData((old) => ({
        ...old,
        landlord: old.landlord.map((row, index) => {
          if (index === i) {
            return { ...row, bankName: "Not Found" };
          } else return row;
        }),
      }));
    }
  }

  useEffect(() => {
    // console.log(formError)
    if (Object.keys(formError).length === 0 && isSubmit) {
      setOpen(true);
    }
  }, [formError]);

  // form validation
  function validate(data) {

    let field = [
    ,"draft_agreement"
    ,"electricity_bill"
    ,"poa"
    ,"maintaince_bill"
    ,"cheque"
    ,"tax_receipt"
    ,"noc"
  ]

  if(landloard.length > 0)
  {

    data.landlord.map((row,i)=>{
      if(row.gstNo)
      {

        field.push((`${landloard[i].leeseName + "@gst_name"}`).replace(
                                " ",
                                ""
                              ))
      }
          field.push((`${landloard[i].leeseName + "@aadhar_card_name"}`).replace(
                              " ",
                              ""
                            ))
          field.push((`${landloard[i].leeseName + "@pan_card_name"}`).replace(
                              " ",
                              ""
                              ))
                            })
                          }

let finalCheck = field.map(row=>{
  if(!data[row])
  {
    console.log(row)
    setFormError(old=>({...old,[row] : "Document required."}))
    return true
  }
})

  console.log(finalCheck.includes(true))
if(!finalCheck.includes(true)){
  return true
}else return false
  }

  //confirmation alert
  const [open, setOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(">>>",formError)
    setData((old) => ({ ...old, ...increment }));
  //  console.log(validate(data))
    if(validate(data))
    {
      setIsSubmit(true);
      setOpen(true);

    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  // funciton for fetching state list
  async function handleStateSearch(e, i) {
    if (e.target.value.length > 4) {
      let response = await getLocation(e.target.value);
      if (response.data[0].PostOffice) {
        let address = response.data[0].PostOffice[0];
        return setData((old) => ({
          ...old,
          state: address.State,
          city: address.District,
        }));
      } else {
        return setData((old) => ({ ...old, state: "", city: "" }));
      }
    }
  }

  // useEffect(() => {
  //   handleCitySearch();
  // }, [data.state]);

  // funciton for fetching state list
  // async function handleCitySearch() {
  //   // console.log(i);
  //   console.log(data.state);
  //   let search = stateList.filter((row) => row.name === data.state && row.id);

  //   // console.log(search);
  //   let response = await getCityList(search[0].id);

  //   if (response.status === 200) {
  //     setCityList(response.data);
  //   } else setCityList([]);
  // }

  return (
    <>
      {/* alert for submit form */}
      <PermissionAlert
        handleClose={handleCancel}
        handleConfirm={() => handleConfirm(manager_id)}
        open={open}
        message={"Please check agreement carefully before submission."}
      />

      {/* dialog box ( popup box ) */}
      <DialogBox value={landblord} setValue={setLandblord} />
      {/* {console.log(landblord)} */}
      <Stack sx={{ flexWrap: "nowrap", flexDirection: "row" }}>
        {/* side nav     */}
        {/* <HamburgerMenu navigateTo={"listing"} /> */}

        <HamburgerMenu
          navigateHome={"dashboard"}
          handleListing={() => navigate("/listing")}
          monthlyRent={() => navigate("/monthly-payment")}
          renewal={() => navigate(`/renewal`)}
          monthlyBtn="true"
        />

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
                    disabled={true}
                    placeHolder="code"
                    backgroundColor="rgba(3, 193, 243, 0.2);"
                    value={data.code}
                    name="code"
                  />

                  <Grid
                    item
                    md={4}
                    xs={6}
                    sx={{
                      mb: "0px !important",
                      "@media(max-width:900px)": { my: 1 },
                    }}
                  >
                    <FormControl fullWidth className="textFieldWrapper">
                      <Autocomplete
                        freeSolo
                        fullWidth
                        id="free-solo-2-demo"
                        disableClearable
                        onChange={(e, val) => {
                          setData((old) => ({ ...old, pincode: val }));
                        }}
                        options={stateList.map((option) => option.name)}
                        renderInput={(params) => (
                          <TextField
                            fullWidth
                            required={true}
                            maxLength='6'
                            name="pincode"
                            value={data.pincode}
                            {...params}
                            label="Pincode"
                            onChange={(e) => {
                              handleCommonChange(e);
                              handleStateSearch(e);
                            }}
                            InputProps={{
                              ...params.InputProps,
                              type: "search",
                            }}
                          />
                        )}
                      />
                    </FormControl>
                  </Grid>

                  <TextFieldWrapper
                    label="State"
                    disabled={true}
                    name="state"
                    required={true}
                    maxLength={6}
                    value={data.state || ""}
                    error={formError.state}
                  />
                  <Grid
                    item
                    md={4}
                    xs={6}
                    sx={{
                      mb: "0px !important",
                      "@media(max-width:900px)": { my: 1 },
                    }}
                  >
                    <FormControl fullWidth className="textFieldWrapper">
                      <TextField
                        label="City"
                        required={true}
                        disabled={true}
                        fullWidth
                        name="city"
                        value={data.city || ""}
                      />
                    </FormControl>
                  </Grid>
                  <TextFieldWrapper
                    label="Location"
                    placeHolder="Enter Location"
                    name="location"
                    required={true}
                    value={data.location}
                    onChange={handleCommonChange}
                    index={i}
                  />

                  <TextFieldWrapper
                    label="Address"
                    placeHolder="Enter Address"
                    required={true}
                    name="address"
                    value={data.address}
                    onChange={handleCommonChange}
                    index={i}
                  />

                  <TextFieldWrapper
                    label="Lock In Month(If Applicable)"
                    placeHolder="Enter Lock in Month"
                    required={true}
                    name="lockInYear"
                    // textAlignRight={"textAlignRight"}
                    value={data.lockInYear}
                    onChange={handleCommonChange}
                  />
                  <TextFieldWrapper
                    label="Notice Period In Month"
                    placeHolder="Enter Notice Period"
                    required={true}
                    name="noticePeriod"
                    // textAlignRight={"textAlignRight"}
                    value={data.noticePeriod}
                    onChange={handleCommonChange}
                  />
                  <TextFieldWrapper
                    required={true}
                    label="Deposit Amount"
                    placeHolder="Enter Deposit Amount"
                    name="deposit"
                    textAlignRight={"textAlignRight"}
                    value={data.deposit}
                    onChange={handleCommonChange}
                  />
                  <TextFieldWrapper
                    label="Monthly Rental"
                    placeHolder="Enter Rental"
                    required={true}
                    textAlignRight={"textAlignRight"}
                    name="monthlyRent"
                    value={data.monthlyRent}
                    onChange={handleCommonChange}
                  />

                  <SelectComponent
                    label={"Agreement Tenure *"}
                    required={true}
                    name="tenure"
                    options={[
                      "11 Month",
                      "2 Year",
                      "3 Year",
                      "4 Year",
                      "5 Year",
                    ]}
                    value={data.tenure}
                    onChange={handleCommonChange}
                  />
                  {data.tenure === "" ? null : data.tenure ===
                    "11 Month" ? null : (
                    <SelectComponent
                      label={"Yearly Increment"}
                      required={true}
                      name="yearlyIncrement"
                      options={["Percentage", "Value"]}
                      value={data.yearlyIncrement}
                      onChange={handleCommonChange}
                    />
                  )}
                </Grid>

                {/* basic details end here */}
                <br />
                {/* Increment Yearly */}
                <YearlyIncrement
                  yearValue={yearValue}
                  setYearValue={setYearValue}
                  tenure={data.tenure}
                  value={data.yearlyIncrement}
                  rent={data.monthlyRent}
                  increment={increment}
                  setIncrement={setIncrement}
                />

                {/* uncommon fields Details start here*/}
                <Typography
                  variant="body1"
                  color="var(--main-color)"
                  fontSize="25px"
                  lineHeight="28px"
                  fontWeight="600"
                  my="20px"
                >
                  Landlord Detail
                </Typography>

                {landblord.map((_, i) => (
                  <>
                    {landloard.length > 0 && (
                      <Box mb  = {2} size = 'small' fullWidth variant = 'outlined' component = {Button}  onClick={() => setExpand(expand === i ? -1 : i)} sx={{color : 'black', justifyContent: "space-between", backgroundColor : "#b0d6f773"  }}>
                        <Typography color={"var( --main-color)"}>
                          {" "}
                          {landloard.length > 0
                            ? landloard[i].leeseName
                            : ""}{" "}
                          Personal Details
                        </Typography>
                        <IconButton
                          onClick={() => setExpand(expand === i ? -1 : i)}
                        >
                          {expand === i ? (
                            <KeyboardArrowUpIcon />
                          ) : (
                            <KeyboardArrowDownIcon />
                          )}
                        </IconButton>
                      </Box>
                    )}
                    <Collapse in={expand === i} timeout="auto" unmountOnExit>
                      <Grid
                        container
                        sx={{ px: 3, mb: "25px" }}
                        spacing={isSmall ? 2 : 4}
                      >
                        <Grid item xs={12}></Grid>

                        <TextFieldWrapper
                          label="Name Of Lessee"
                          placeHolder="Enter Name Of Lesses"
                          name="leeseName"
                          disabled={true}
                          required={true}
                          // error = {errorObj.leeseName}
                          value={
                            data.landlord[i] && data.landlord[i].leeseName
                              ? data.landlord[i].leeseName
                              : ""
                          }
                          onChange={(e) => handleChange(e, i)}
                        />

                        <TextFieldWrapper
                          label="Aadhar Number"
                          placeHolder="Enter Aadhar No."
                          required={true}
                          name="aadharNo"
                          maxLength={12}
                          value={
                            data.landlord[i] && data.landlord[i].aadharNo
                              ? data.landlord[i].aadharNo
                              : ""
                          }
                          onChange={(e) => handleChange(e, i)}
                          index={i}
                          error={
                            formError.landlord[i] && formError.landlord[i].aadharNo
                              ? formError.landlord[i].aadharNo
                              : ""
                            }
                        />
                        <TextFieldWrapper
                          label="PAN Number"
                          placeHolder="Enter Pan No."
                          name="panNo"
                          required={true}
                          maxLength={10}
                          value={
                            data.landlord[i] && data.landlord[i].panNo
                              ? data.landlord[i].panNo
                              : ""
                          }
                          onChange={(e) => handleChange(e, i)}
                          index={i}
                          error={
                            formError.landlord[i] && formError.landlord[i].panNo
                              ? formError.landlord[i].panNo
                              : ""
                          }
                        />

                        <TextFieldWrapper
                          label="Mobile Number"
                          placeHolder="Enter Mobile No."
                          required={true}
                          name="mobileNo"
                          maxLength={10}
                          value={
                            data.landlord[i] && data.landlord[i].mobileNo
                              ? data.landlord[i].mobileNo
                              : ""
                          }
                          error={
                            formError.landlord[i] && formError.landlord[i].mobileNo
                              ? formError.landlord[i].mobileNo
                              : ""
                          }
                          onChange={(e) => handleChange(e, i)}
                          index={i}
                        />
                        <TextFieldWrapper
                          label="Alternate Number"
                          placeHolder="Enter Alternate No."
                          name="alternateMobile"
                          maxLength={10}
                          value={
                            data.landlord[i] && data.landlord[i].alternateMobile
                              ? data.landlord[i].alternateMobile
                              : ""
                          }
                          error={
                            formError.landlord[i] && formError.landlord[i].alternateMobile
                              ? formError.landlord[i].alternateMobile
                              : ""
                          }
                          onChange={(e) => handleChange(e, i)}
                          index={i}
                        />

                        <TextFieldWrapper
                          label="Email"
                          placeHolder="Enter Email"
                          required={true}
                          name="email"
                          value={
                            data.landlord[i] && data.landlord[i].email
                              ? data.landlord[i].email
                              : ""
                          }
                          error={
                            formError.landlord[i] && formError.landlord[i].email
                              ? formError.landlord[i].email
                              : ""
                          }
                          onChange={(e) => handleChange(e, i)}
                          index={i}
                        />

                        <TextFieldWrapper
                          label="GST Number"
                          placeHolder="Enter GST No."
                          // required={true}
                          // error = }
                          name="gstNo"
                          maxLength={15}
                          value={
                            data.landlord[i] && data.landlord[i].gstNo
                              ? data.landlord[i].gstNo
                              : ""
                          }
                          error={
                            formError.landlord[i] && formError.landlord[i].gstNo
                              ? formError.landlord[i].gstNo
                              : ""
                          }
                          onChange={(e) => handleChange(e, i)}
                        />
                        <TextFieldWrapper
                          label="Bank IFSC Code"
                          placeHolder="Enter IFSC Code"
                          name="ifscCode"
                          required={true}
                          value={
                            data.landlord[i] && data.landlord[i].ifscCode
                              ? data.landlord[i].ifscCode
                              : ""
                          }
                          error={
                            formError.landlord[i] && formError.landlord[i].ifscCode
                              ? formError.landlord[i].ifscCode
                              : ""
                          }
                          onChange={(e) => handleChange(e, i)}
                        />

                        <TextFieldWrapper
                          label="Bank Name"
                          placeHolder="Enter Bank Name"
                          name="bankName"
                          required={true}
                          disabled={true}
                          value={
                            data.landlord[i] && data.landlord[i].bankName
                              ? data.landlord[i].bankName
                              : ""
                          }
                          // onChange={(e) => handleChange(e, i)}
                        />
                        <TextFieldWrapper
                          label="Benificiary Name"
                          placeHolder="Enter Benificiary Name"
                          name="benificiaryName"
                          value={
                            data.landlord[i] && data.landlord[i].benificiaryName
                              ? data.landlord[i].benificiaryName
                              : ""
                          }
                          required={true}
                          onChange={(e) => handleChange(e, i)}
                        />
                        <TextFieldWrapper
                          label="Bank A/C Number "
                          placeHolder="Enter Account No."
                          name="accountNo"
                          required={true}
                          value={
                            data.landlord[i] && data.landlord[i].accountNo
                              ? data.landlord[i].accountNo
                              : ""
                          }
                          error={
                            formError.landlord[i] && formError.landlord[i].accountNo
                              ? formError.landlord[i].accountNo
                              : ""
                          }
                          onChange={(e) => handleChange(e, i)}
                        />
                      </Grid>
                    </Collapse>
                  </>
                ))}

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
                {landblord.map((_, i) => (
                  <>
                    {landloard.length > 0 && (
                      <Box mb  = {2} size = 'small' fullWidth variant = 'outlined' component = {Button}  onClick={() => setDocExpand(docExpand === i ? -1 : i)} sx={{color : 'black', justifyContent: "space-between", backgroundColor : "#b0d6f773"  }}>
                        <Typography color={"var( --main-color)"}>
                          {" "}
                          {landloard.length > 0
                            ? landloard[i].leeseName
                            : ""}{" "}
                          Document Upload
                        </Typography>
                        <IconButton
                          onClick={() => setDocExpand(docExpand === i ? -1 : i)}
                        >
                          {docExpand === i ? (
                            <KeyboardArrowUpIcon />
                          ) : (
                            <KeyboardArrowDownIcon />
                          )}
                        </IconButton>
                      </Box>
                    )}

                    <Collapse in={docExpand === i} timeout="auto" unmountOnExit>
                      <Grid
                        container
                        spacing={isSmall ? 2 : 4}
                        sx={{ px: 1, justifyContent: "", mb: 3 }}
                      >
                        <Grid item xs={6}>
                          <DocumentUpload
                            uploaded={
                              landloard[i]
                                ? data[
                                    `${(
                                      landloard[i].leeseName + "@aadhar_card"
                                    ).replace(" ", "")}`
                                  ]
                                  ? true
                                  : false
                                : false
                            }
                            label="Upload Aadhaar Card"
                            placeHolder="Upload Aadhar Card"
                            handleChange={handleChangeFile}
                            name={
                              landloard[i]
                                ? `${(
                                    landloard[i].leeseName + "@aadhar_card"
                                  ).replace(" ", "")}`
                                : "adhar"
                            }
                            fileName = {landloard[i] ? data[(`${landloard[i].leeseName + "@aadhar_card_name"}`).replace(
                              " ",
                              ""
                            )] :""
                            }
                            error = {landloard[i] && formError[(`${landloard[i].leeseName + "@aadhar_card_name"}`).replace(
                              " ",
                              ""
                            )]}
                          />
                        </Grid>
                    

                        <Grid item xs={6}>
                          <DocumentUpload
                            label="Upload Pan Card"
                            uploaded={
                              landloard[i]
                                ? data[
                                    `${(
                                      landloard[i].leeseName + "@pan_card"
                                    ).replace(" ", "")}`
                                  ]
                                  ? true
                                  : false
                                : false
                            }
                            
                            placeHolder={"Upload Pan Card"}
                            handleChange={handleChangeFile}
                            name={
                              landloard[i]
                                ? `${(
                                    landloard[i].leeseName + "@pan_card"
                                  ).replace(" ", "")}`
                                : "pan"
                            }
                            fileName = {landloard[i] ? data[(`${landloard[i].leeseName + "@pan_card_name"}`).replace(
                              " ",
                              ""
                            )] :""
                            }
                            error = {landloard[i] &&  formError[(`${landloard[i].leeseName + "@pan_card_name"}`).replace(
                              " ",
                              ""
                            )]}
                          />
                        </Grid>

                        { data.landlord[i] ? data.landlord[i].gstNo ? <Grid item xs={6}>
                          <DocumentUpload
                            label="Upload GST Certificate"
                            uploaded={
                              landloard[i]
                                ? data[
                                    `${(
                                      landloard[i].leeseName + "@gst"
                                    ).replace(" ", "")}`
                                  ]
                                  ? true
                                  : false
                                : false
                            }
                            fileName = { landloard[i] ? data[(`${landloard[i].leeseName + "@gst_name"}`).replace(
                              " ",
                              ""
                            )] :""
                            }
                            placeHolder="Upload GST Certificate"
                            error = {landloard[i] &&  formError[(`${landloard[i].leeseName + "@gst_name"}`).replace(
                              " ",
                              ""
                            )]}
                            handleChange={handleChangeFile}
                            name={
                              landloard[i]
                                ? `${(landloard[i].leeseName + "@gst").replace(
                                    " ",
                                    ""
                                  )}`
                                : "gst"
                            }
                          />
                        </Grid> : '' : ""}
                      </Grid>
                    </Collapse>
                  </>
                ))}

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
                  sx={{ px: 1, justifyContent: "" }}
                >
                  <Grid item xs={6}>
                    <DocumentUpload
                      label="Upload Draft Agreement"
                      uploaded={data.draft_agreement && true}
                      placeHolder="Upload Draft Agreement"
                      fileName = {data.draft_agreement_name}
                      handleChange={handleChangeFile}
                      name={"draft_agreement"}
                      error = {formError.draft_agreement}

                    />
                  </Grid>
                  <Grid item xs={6}>
                    <DocumentUpload
                      label="Upload Electricity Bill"
                      uploaded={data.electricity_bill && true}
                      placeHolder={"Upload Electricity Bill"}
                      fileName = {data.electricity_bill_name}
                      handleChange={handleChangeFile}
                      name={"electricity_bill"}
                      error = {formError.electricity_bill}

                    />
                  </Grid>
                  <Grid item xs={6}>
                    <DocumentUpload
                      label="Upload POA(If Applicable)"
                      placeHolder="Upload POA"
                      uploaded={data.poa && true}
                      fileName = {data.poa_name}
                      handleChange={handleChangeFile}
                      name={"poa"}
                      error = {formError.poa}

                    />
                  </Grid>
                  <Grid item xs={6}>
                    <DocumentUpload
                      label="Upload Maintenance Bill"
                      uploaded={data.maintaince_bill && true}
                      placeHolder={"Upload Maintenance Bill"}
                      fileName = {data.maintaince_bill_name}
                      handleChange={handleChangeFile}
                      name={"maintaince_bill"}
                      error = {formError.maintaince_bill}

                    />
                  </Grid>
                  <Grid item xs={6}>
                    <DocumentUpload
                      label="Upload Cancel Bank Cheque"
                      placeHolder="Upload Cancel Bank Cheque"
                      fileName = {data.cheque_name}
                      uploaded={data.cheque && true}
                      handleChange={handleChangeFile}
                      name={"cheque"}
                      error = {formError.cheque}

                    />
                  </Grid>
                  <Grid item xs={6}>
                    <DocumentUpload
                      label="Upload Property Tax Receipt"
                      uploaded={data.tax_receipt && true}
                      fileName = {data.tax_receipt_name}
                      placeHolder={"Upload Property Tax Receipt"}
                      handleChange={handleChangeFile}
                      name={"tax_receipt"}
                      error = {formError.tax_receipt}

                    />
                  </Grid>
                  <Grid item xs={6}>
                    <DocumentUpload
                      uploaded={data.noc && true}
                      label="Upload Noc(If Multiple Owners)"
                      placeHolder="NOC"
                      fileName = {data.NOC_name}
                      handleChange={handleChangeFile}
                      name={"noc"}
                      error = {formError.noc}
                    />
                  </Grid>
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
                      Submit To Sr Manager
                    </Button>
                  </Grid>

                  <Grid item md={3} xs={6}>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleHold(manager_id)}
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
