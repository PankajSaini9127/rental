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
  Autocomplete,
  TextField,
  MenuItem,
  FormControl,
} from "@mui/material";

// Custom Style Component

import {
  DocumentUpload,
  MyHeader,
  SelectComponent,
  TextFieldWrapper,
} from "../StyledComponent";

// Components

import HamburgerMenu from "../HamburgerMenu";
import YearlyIncrement from "./IncrementType";
// import DialogBox from "./DialogBox";
import {
  add_agreement,
  add_landlord,
  getStateList,
  uploadDoc,
  getDetails,
  getCityList,
  editAgreement,
  getBankName,
} from "../../Services/Services";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../../store/action/action";
import PermissionAlert from "./Alert";
import { useParams, useNavigate } from "react-router-dom";

function EditAgreement({ history }) {
  const navigate =useNavigate()
  const { landloard } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [agreement, setAgreement] = useState([]);
  const { id } = useParams();
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  // const history = props.history

  // modified by yashwant
  const [preData, setPreData] = useState({
    landlord: [],
    code: "",
    lockInYear: "",
    address: "",
    pincode: "",
    state: "",
    city: "",
    locaiton: "",
    noticePeriod: "",
    deposite: "",
    monthlyRent: "",
    yearlyIncrement: "",
    status: "",
    gst_certificate: "",
    draft_agreement: "",
    electricity_bill: "",
    poa: "",
    maintaince_bill: "",
    cheque: "",
    tax_receipt: "",
    noc: "",
    remark:""
  });
  useEffect(() => {
    fetchData();
  }, []);


  console.log(preData)
  async function fetchData() {
    try {
      let response = await getDetails(id);

      if (response.status === 200) {
        let {
          id,
          code,
          pincode,
          state,
          address,
          location,
          city,
          lockInYear,
          monthlyRent,
          noticePeriod,
          yearlyIncrement,
          deposite,
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
          landlord,
          remark
        } = response.data;

        setYearValue({ 
          year1 : year1 && Math.floor(((year1-monthlyRent)/monthlyRent) * 100),
          year2 : year2 && Math.floor(((year2-monthlyRent)/year1) * 100),
          year3 : year3 && Math.floor(((year3-monthlyRent)/year2) * 100),
          year4 : year4 && Math.floor(((year4-monthlyRent)/year3) * 100),
          year5 : year5 && Math.floor(((year5-monthlyRent)/year4) * 100),
        })
        setPreData({
          id,
          code,
          pincode,
          state,
          address,
          location,
          city,
          lockInYear,
          monthlyRent,
          noticePeriod,
          yearlyIncrement,
          deposite,
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
          landlord,
          remark
        });
      }
    } catch (error) {
      //console.log('err>>',error)
    }
  }



  // useEffect(() => {
  //   codeGenerater();
  // }, []);
  //console.log(">>>>", landloard);
  const [i, setIndex] = useState(0);
  const [data, setData] = useState({
    landlord: [...landloard],
    code: "",
    lockInYear: "",
    noticePeriod: "",
    deposite: "",
    monthlyRent: "",
    yearlyIncrement: "",
    tenure: "",
  });

  useEffect(() => {
    setData((old) => ({ ...old, landlord: [...landloard] }));
  }, [landloard]);

  const [landblord, setLandblord] = useState([1]);

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const [formError, setFormError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

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
    FD.append("photo", e.target.files[0]);
    let response = await uploadDoc(FD);

    if (response.status === 200) {
      setPreData((old) => ({ ...old, [e.target.name]: response.data.link }));
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


  //handle Change for uncommon feilds
  function handleChange(e, i) {
    // console.log(preData)
    //console.log(e.target.name,e.target.value)
    var error = false;
    switch (e.target.name) {
      case "leeseName":
        if (!e.target.value.match(/^[a-zA-Z ]*$/)) error = true;
        break;
      
      case "aadharNo":
        if (!e.target.value.match(/^[0-9]*$/)) error = true;
        break;
      case "mobileNo":
        if (!e.target.value.match(/^[0-9]*$/)) error = true;
        break;
      case "alternateMobile":
        if (!e.target.value.match(/^[0-9]*$/)) error = true;
        break;
      case "bankName":
        if (!e.target.value.match(/^[a-zA-Z ]*$/)) error = true;
        break;
      case "benificiaryName":
        if (!e.target.value.match(/^[a-zA-Z ]*$/)) error = true;
        break;
      case "accountNo":
        if (!e.target.value.match(/^[0-9]*$/)) error = true;
        break;
      case "deposite":
        if (!e.target.value.match(/^[0-9]*$/)) error = true;
        break;

      case "panNo":
        e.target.value = e.target.value.toUpperCase();
        if (!e.target.value.match(/^.{0,10}$/)) error = true;
        break;
      default:
        break;
    }
    if (
      e.target.name === 'ifscCode' && 
      e.target.value.length === 11
    )
    {
      console.log(e.target.name)
      getBankeDetails(e.target.value,i);

    }
    //console.log(error)
    if (!error) {
      if (preData.landlord[i]) {
        setPreData((old) => ({
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
        setPreData((old) => ({
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
  }

  // handle Change for common feilds
  function handleCommonChange(e, i) {
    var error = false;
    switch (e.target.name) {
      case "state":
        // //console.log('state',e.target.value.match(/^[a-zA-Z ]*$/))
        if (!e.target.value.match(/^[a-zA-Z ]*$/)) error = true;
        break;
      case "pincode":
        if (!e.target.value.match(/^[0-9]*$/)) error = true;
        break;
      case "gstNo":
        if (!e.target.value.match(/^[a-z0-9]{0,15}$/)) error = true;
        break;
      case "lockInYear":
        if (!e.target.value.match(/^[0-9]*$/)) error = true;
        break;
      case "rental_amount":
        if (!e.target.value.match(/^[0-9]*$/)) error = true;
        break;
      case "noticePeriod":
        if (!e.target.value.match(/^[0-9]*$/)) error = true;
        break;
      case "monthlyRent":
        if (!e.target.value.match(/^[0-9]*$/)) error = true;
        break;
      case "deposite":
        if (!e.target.value.match(/^[0-9]*$/)) error = true;
        break;
      default:
        break;
    }


  

    if (!error)
      setPreData((old) => ({ ...old, [e.target.name]: e.target.value }));
  }

  // on form submit

  const handleConfirm = () => {
    setOpen(false);
    // //console.log(data)
    const {
      id,
      code,
      lockInYear,
      monthlyRent,
      noticePeriod,
      yearlyIncrement,
      deposite,
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
      landlord,
    } = preData;

    APICall(
      {
        pincode,
      state,
      address,
      location,
      city,
        id,
        code,
        lockInYear,
        monthlyRent,
        noticePeriod,
        yearlyIncrement,
        deposite,
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
        landlord,
        status:"Sent To Sr Manager",
        remark:""
      },
      landlord
    );
  };

  const APICall = async (values, landlordData) => {
    const agreement = await editAgreement(values);

    if (agreement.status === 200) {
      // console.log(history);
      window.location.href = "/listing";
      dispatch(
        setAlert({
          open: true,
          variant: "success",
          message: "Agrement Edited Successfully.",
        })
      );
    }
  };

  useEffect(() => {
    // //console.log(formError)
    if (Object.keys(formError).length === 0 && isSubmit) {
      setOpen(true);
    }
  }, [formError]);


  //confirmation alert
  const [open, setOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(preData);
    setPreData((old) => ({ ...old, ...increment }));
    // validate(preData.landLord);
    setIsSubmit(true);
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

   // funciton for fetching state list
   async function handleStateSearch(e, i) {
    setIndex(i);
    let response = await getStateList(e.target.value);

    if (response.status === 200) {
      setStateList(response.data);
    } else setStateList([]);
  }

  useEffect(() => {
    handleCitySearch();
  }, [preData.state]);

  // funciton for fetching state list
  async function handleCitySearch() {
    console.log(i);
    console.log(preData.state);
    let search = stateList.filter(
      (row) => row.name === preData.state && row.id
    );

    // console.log(search);
    let response = await getCityList(search[0].id);

    if (response.status === 200) {
      setCityList(response.data);
    } else setCityList([]);
  }

  async function getBankeDetails(data,i) {
    let res = await getBankName(data);
    if (res) {
      setPreData((old) => ({
        ...old,
        landlord: old.landlord.map((row, index) => {
          if (index === i) {
            return { ...row, bankName: res.data.BANK };
          } else return row;
        }),
      }));
    }
  }

function handleHold (){
  const {
    id,
    code,
    lockInYear,
    monthlyRent,
    noticePeriod,
    yearlyIncrement,
    deposite,
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
    landlord,
  } = preData;

  APICall(
    {
      pincode,
    state,
    address,
    location,
    city,
      id,
      code,
      lockInYear,
      monthlyRent,
      noticePeriod,
      yearlyIncrement,
      deposite,
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
      landlord,
      status:"Hold",
      remark:""
    },
    landlord
  );
}


  return (
    <>
      {/* alert for submit form */}
      <PermissionAlert
        handleClose={handleCancel}
        handleConfirm={handleConfirm}
        open={open}
        message={"Please check agreement carefully before submission."}
      />

      {/* dialog box ( popup box ) */}
      {/* <DialogBox value={landblord} setValue={setLandblord} /> */}
      {/* {//console.log(landblord)} */}
      <Stack sx={{ flexWrap: "nowrap", flexDirection: "row" }}>
        {/* side nav     */}
        {/* <HamburgerMenu navigateTo={"listing"} /> */}

        <HamburgerMenu
         navigateHome={'dashboard'}
          handleListing={()=>navigate('/listing')}
          monthlyRent={() => navigate("/monthly-payment")}
          renewal={() => navigate(`/renewal`)}
          monthlyBtn='true'
        />

        <Box sx={{ flexGrow: 1 }}>
          <MyHeader>Edit Agreement</MyHeader>

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
                    disabled={true}
                    backgroundColor="rgba(3, 193, 243, 0.2);"
                    value={preData.code}
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
                        value={preData.state || ""}
                        onChange={(e, val) => {
                          setPreData((old) => ({
                            ...old,
                            state: val,
                          }));
                        }}
                        options={stateList.map((option) => option.name)}
                        renderInput={(params) => (
                          <TextField
                            fullWidth
                            name="state"
                            // placeholder={preData.landlord[i].state || ""}
                            value={preData.state || ""}
                            {...params}
                            label="State"
                            onChange={(e) => {
                              handleCommonChange(e);
                              handleStateSearch(e, i);
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
                        placeHolder="Enter City"
                        select
                        fullWidth
                        name="city"
                        required={true}
                        value={preData.city || ''}
                        onChange={handleCommonChange}
                        index={i}
                      >
                        {cityList &&
                          cityList.map((item) => {
                            return (
                              <MenuItem value={item.city}>{item.city}</MenuItem>
                            );
                          })}
                        <MenuItem value={preData.city}>{preData.city}</MenuItem>
                      </TextField>
                    </FormControl>
                  </Grid>

                  <TextFieldWrapper
                    label="Location"
                    placeHolder="Enter Location"
                    name="location"
                    value={preData.location || ''}
                    onChange={handleCommonChange}
                    index={i}
                  />
                  <TextFieldWrapper
                    label="Pincode"
                    placeHolder="Enter Pincode"
                    name="pincode"
                    required={true}
                    maxLength={6}
                    value={preData.pincode}
                    onChange={handleCommonChange}
                    index={i}
                    error={formError.pincode}
                  />
                  <TextFieldWrapper
                    label="Address"
                    placeHolder="Enter Address"
                    required={true}
                    name="address"
                    value={preData.address}
                    onChange={handleCommonChange}
                    index={i}
                  />
                  <TextFieldWrapper
                    label="Lock In Month(If Applicable)"
                    placeHolder="Enter Lock in Month"
                    name="lockInYear"
                    value={preData.lockInYear}
                    onChange={handleCommonChange}
                  />
                  <TextFieldWrapper
                    label="Notice Period In Month"
                    placeHolder="Enter Notice Period"
                    name="noticePeriod"
                    value={preData.noticePeriod}
                    onChange={handleCommonChange}
                  />
                  <TextFieldWrapper
                    label="Deposite Amount"
                    placeHolder="Enter Deposite Amount"
                    name="deposite"
                    value={preData.deposite}
                    onChange={handleCommonChange}
                  />
                  <TextFieldWrapper
                    label="Monthly Rental"
                    placeHolder="Enter Rental"
                    required={true}
                    name="monthlyRent"
                    value={preData.monthlyRent}
                    onChange={handleCommonChange}
                  />

                  <SelectComponent
                    label={"Agreement Tenure"}
                    required={true}
                    name="tenure"
                    options={[
                      "11 Month",
                      "2 Year",
                      "3 Year",
                      "4 Year",
                      "5 Year",
                    ]}
                    value={preData.tenure || ""}
                    onChange={handleCommonChange}
                  />
                  {preData.tenure === "" ? null : preData.tenure ===
                    "11 Month" ? null : (
                    <SelectComponent
                      label={"Yearly Increment"}
                      required={true}
                      name="yearlyIncrement"
                      options={["Percentage", "Value"]}
                      value={preData.yearlyIncrement}
                      onChange={handleCommonChange}
                    />
                  )}
                </Grid>

                {/* basic details end here */}

                {/* Increment Yearly */}
                <YearlyIncrement
                  yearValue={yearValue}
                  setYearValue={setYearValue}
                  tenure={preData.tenure || ""}
                  value={preData.yearlyIncrement || ""}
                  rent={preData.monthlyRent || ""}
                  increment={increment}

                  setIncrement={setIncrement}
                />

                {/* landlord Details start here*/}
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

              

                {preData.landlord.length > 0 &&
                  preData.landlord.map((_, i) => (
                    <>
                      <Grid
                        container
                        sx={{ px: 3, mb: "25px" }}
                        spacing={isSmall ? 2 : 4}
                      >
                        <Grid item xs={12}>
                          {preData.landlord.length > 0 ? (
                            <Typography color={"var( --main-color)"}>
                              {preData.landlord[i].leeseName}
                            </Typography>
                          ) : (
                            ""
                          )}
                        </Grid>

                        <TextFieldWrapper
                          label="Name Of Lesse"
                          placeHolder="Enter Name Of Lesse"
                          required={true}
                          // error = {errorObj.leeseName}
                          name="name"
                          value={preData.landlord[i].name}
                          onChange={(e) => handleChange(e, i)}
                        />

                        <TextFieldWrapper
                          label="Aadhar Number"
                          placeHolder="Enter Aadhar No."
                          required={true}
                          name="aadharNo"
                          maxLength={12}
                          value={preData.landlord[i].aadharNo}
                          onChange={(e) => handleChange(e, i)}
                          index={i}
                          error={formError.aadharNo}
                        />
                        <TextFieldWrapper
                          label="Pan Number"
                          placeHolder="Enter Pan No."
                          name="panNo"
                          maxLength={10}
                          value={preData.landlord[i].panNo}
                          onChange={(e) => handleChange(e, i)}
                          index={i}
                        />

                        <TextFieldWrapper
                          label="Mobile Number"
                          placeHolder="Enter Mobile No."
                          required={true}
                          name="mobileNo"
                          maxLength={10}
                          error={formError.mobileNo}
                          value={preData.landlord[i].mobileNo}
                          onChange={(e) => handleChange(e, i)}
                          index={i}
                        />
                        <TextFieldWrapper
                          label="Alternate Number"
                          placeHolder="Enter Alternate No."
                          name="alternateMobile"
                          maxLength={10}
                          value={preData.landlord[i].alternateMobile}
                          error={formError.alternateMobile}
                          onChange={(e) => handleChange(e, i)}
                          index={i}
                        />

                        <TextFieldWrapper
                          label="Email"
                          placeHolder="Enter Email"
                          required={true}
                          name="email"
                          value={preData.landlord[i].email}
                          onChange={(e) => handleChange(e, i)}
                          index={i}
                          error={formError.email}
                        />
                        <TextFieldWrapper
                          label="GST Number"
                          placeHolder="Enter GST No."
                          required={true}
                          name="gstNo"
                          maxLength={15}
                          value={preData.landlord[i].gstNo}
                          onChange={(e) => handleChange(e, i)}
                        />
                        <TextFieldWrapper
                          label="Bank IFSC Code"
                          placeHolder="Enter IFSC Code"
                          name="ifscCode"
                          required={true}
                          value={preData.landlord[i].ifscCode}
                          onChange={(e) => handleChange(e, i)}
                        />
                        <TextFieldWrapper
                          label="Bank Name"
                          disabled={true}
                          placeHolder="Enter Bank Name"
                          name="bankName"
                          required={true}
                          value={preData.landlord[i].bankName}
                          onChange={(e) => handleChange(e, i)}
                        />
                        <TextFieldWrapper
                          label="Benificiary Name"
                          placeHolder="Enter Benificiary Name"
                          name="benificiaryName"
                          value={preData.landlord[i].benificiaryName}
                          required={true}
                          onChange={(e) => handleChange(e, i)}
                        />
                        <TextFieldWrapper
                          label="Bank A/C Number "
                          placeHolder="Enter Account No."
                          name="accountNo"
                          required={true}
                          value={preData.landlord[i].accountNo}
                          onChange={(e) => handleChange(e, i)}
                        />
                      </Grid>
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
                {preData.landlord.length > 0 &&
                  preData.landlord.map((_, i) => (
                    <>
                      <Grid
                        container
                        spacing={isSmall ? 2 : 4}
                        sx={{ px: 1, justifyContent: "", mb: 3 }}
                      >
                        <Grid item xs={12}>
                          <Typography color={"var( --main-color)"}>
                            {preData.landlord[i].leeseName}
                          </Typography>
                        </Grid>

                        {/* {console.log('>>>>',preData.landlord[i])} */}
                        <Grid item xs={6}>
                          <DocumentUpload
                            uploaded={
                              preData.landlord[i].aadhar_card ? true : false
                            }
                            label="Upload Aadhar Card"
                            placeHolder="Upload Aadhar Card"
                            handleChange={handleChangeFile}
                            name={"aadhar_card"}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <DocumentUpload
                            label="Upload Pan Card"
                            uploaded={
                              preData.landlord[i].pan_card ? true : false
                            }
                            placeHolder={"Upload Pan Card"}
                            handleChange={handleChangeFile}
                            name={"pan_card"}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <DocumentUpload
                            label="Upload GST Certificate"
                            uploaded={preData.gst_certificate && true}
                            placeHolder="Upload GST Certificate"
                            handleChange={handleChangeFile}
                            name={"gst_certificate"}
                          />
                        </Grid>
                      </Grid>
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
                      uploaded={preData.draft_agreement && true}
                      placeHolder="Upload Draft Agreement"
                      handleChange={handleChangeFile}
                      name={"draft_agreement"}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <DocumentUpload
                      label="Upload Electricity Bill"
                      uploaded={preData.electricity_bill && true}
                      placeHolder={"Upload Electricity Bill"}
                      handleChange={handleChangeFile}
                      name={"electricity_bill"}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <DocumentUpload
                      label="Upload POA(If Applicable)"
                      placeHolder="Upload POA"
                      uploaded={preData.poa && true}
                      handleChange={handleChangeFile}
                      name={"poa"}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <DocumentUpload
                      label="Upload Maintaince Bill"
                      uploaded={preData.maintaince_bill && true}
                      placeHolder={"Upload Maintaince Bill"}
                      handleChange={handleChangeFile}
                      name={"maintaince_bill"}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <DocumentUpload
                      label="Upload Cancle Bank Cheque"
                      placeHolder="Upload Cancle Bank Cheque"
                      uploaded={preData.cheque && true}
                      handleChange={handleChangeFile}
                      name={"cheque"}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <DocumentUpload
                      label="Upload Property Tax Receipt"
                      uploaded={preData.tax_receipt && true}
                      placeHolder={"Upload Property Tax Receipt"}
                      handleChange={handleChangeFile}
                      name={"tax_receipt"}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <DocumentUpload
                      uploaded={preData.noc && true}
                      label="Upload Noc(If Mutiple Oweners)"
                      placeHolder="NOC"
                      handleChange={handleChangeFile}
                      name={"noc"}
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
                  <Grid item md={4} xs={6}>
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
                       Send To Sr Manager
                    </Button>
                  </Grid>

                  <Grid item md={4} xs={6}>
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
                      onClick={handleHold}
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

export default EditAgreement;
