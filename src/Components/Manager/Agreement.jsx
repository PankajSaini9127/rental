import React, { useEffect, useMemo, useState } from "react";

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

import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

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

function Agreement({ history }) {
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
    deposit: "",
    pincode: "",
    location: "",
    city: "",
    area: "",
  });

  useEffect(() => {
    setData((old) => ({ ...old, landlord: [...landloard] }));
    setFormError((old) => ({ ...old, landlord: [...landloard] }));
  }, [landloard]);

  const [landblord, setLandblord] = useState([1]);

  // const [assets,setAssets] = useState("")

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const [formError, setFormError] = useState({
    landlord: [...landloard],
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
    city: "",
    area: "",
  });
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
    console.log(e.target.files[0]);
    FD.append("photo", e.target.files[0]);
    let response = await uploadDoc(FD);
    // console.log(data)
    if (response.status === 200) {
      console.log(e.target.name);
      console.log(formError);
      setFormError((old) => ({
        ...old,
        [e.target.name + "_name"]: "",
        [e.target.name]: "",
      }));

      setData((old) => ({
        ...old,
        [e.target.name]: response.data.link,
        [e.target.name + "_name"]: e.target.files[0].name,
      }));
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

  function checksum(g) {
    let regTest = /\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/.test(
      g
    );
    if (regTest) {
      let a = 65,
        b = 55,
        c = 36;
      return Array["from"](g).reduce((i, j, k, p) => {
        p =
          (p =
            (j.charCodeAt(0) < a ? parseInt(j) : j.charCodeAt(0) - b) *
            ((k % 2) + 1)) > c
            ? 1 + (p - c)
            : p;
        return k < 14
          ? i + p
          : j == ((c = c - (i % c)) < 10 ? c : String.fromCharCode(c + b));
      }, 0);
    }
    return regTest;
  }

  // use on onBlur for uncommon fields
  function handleOnBlur(e, i) {
    let error = { state: false, message: null };
    // console.log(e.target.name, e.target.value);
    switch (e.target.name) {
      case "leeseName":
        if (!e.target.value.match(/^[a-zA-Z ]*$/))
          error = { state: true, message: "Value must be Correct" };
        break;
      case "pincode":
        if (!e.target.value.match(/^.{0,6}$/))
          error = { state: true, message: "Value must be Correct" };
        if (e.target.value.length < 6 && e.target.value.length > 0)
          error = { ...error, message: "Pincode number must be of 6 digit." };
        else error = { ...error, message: null };
        break;
      case "aadharNo":
        if (!e.target.value.match(/^[0-9]*$/))
          error = { ...error, state: true };
        if (e.target.value.length < 12 && e.target.value.length > 0)
          error = { ...error, message: "Aadhaar number must be of 12 digit." };
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
        if (!e.target.value === "Not Found")
          error = { state: true, message: "Value must be Correct" };
        break;
      case "benificiaryName":
        if (!e.target.value.match(/^[a-zA-Z ]*$/))
          error = { state: true, message: "Value must be Correct" };
        break;
      case "accountNo":
        if (!e.target.value.match(/^[0-9]*$/))
          error = { ...error, state: true };
        if (e.target.value.length > 17 && e.target.value.length > 0)
          error = { ...error, message: "Account can be of 17 digit only." };
        else error = { ...error, message: null };
        break;

      case "email":
        // pattern match
        if (
          !e.target.value.match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ) &&
          e.target.value.length > 0
        )
          error = {
            ...error,
            message: "Email should be like example@gmail.com.",
          };
        else error = { ...error, message: null };
        break;
      case "panNo":
        e.target.value = e.target.value.toUpperCase();
        if (
          !e.target.value.match(/^.{0,10}$/) &&
          !e.target.value.match(/^[^@#$%^&*<>'\"/;`%]*$/)
        )
          error = { state: true, message: null };
        // pattern match
        if (
          !e.target.value.match(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/) &&
          e.target.value.length > 0
        )
          error = {
            ...error,
            message: "PAN number should be like NOOPS8327k.",
          };
        else error = { ...error, message: null };
        break;
      case "gstNo":
        e.target.value = e.target.value.toUpperCase();
        if (!e.target.value.match(/^.{0,15}$/))
          error = { state: true, message: null };
        // pattern match
        if (!checksum(e.target.value) && e.target.value.length > 0)
          error = { ...error, message: "GST should be like 18AABCU9603R1ZM." };
        else error = { ...error, message: null };
        break;
      case "ifscCode":
        if (
          !e.target.value.match(/^[A-Z]{4}0[A-Z0-9]{6}$/) &&
          e.target.value !== ""
        )
          error = { ...error, message: "Incorrect IFSC" };
        else error = { ...error, message: null };

        break;
      default:
        break;
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

  // use on Change for uncommon fields
  function handleChange(e, i) {
    let error = { state: false, message: null };
    // console.log(e.target.name, e.target.value);
    switch (e.target.name) {
      case "leeseName":
        if (!e.target.value.match(/^[a-zA-Z ]*$/))
          error = { state: true, message: "Value must be Correct" };
        break;
      case "pincode":
        if (!e.target.value.match(/^.{0,6}$/))
          error = { state: true, message: "Value must be Correct" };
        break;
      case "aadharNo":
        if (!e.target.value.match(/^[0-9]*$/))
          error = { ...error, state: true };
        if (e.target.value.length < 12 && e.target.value.length > 0)
          error = { ...error, message: "Aadhaar number must be of 12 digit." };
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
        if (e.target.value === "Not Found")
          error = { state: true, message: "Value must be Correct" };
        break;
      case "benificiaryName":
        if (!e.target.value.match(/^[a-zA-Z ]*$/))
          error = { state: true, message: "Value must be Correct" };
        break;
      case "accountNo":
        if (!e.target.value.match(/^[0-9]*$/))
          error = { ...error, state: true };
        if (e.target.value.length > 17 && e.target.value.length > 0)
          error = { ...error, message: "Account can be of 17 digit only." };
        else error = { ...error, message: null };
        break;

      case "email":
        // pattern match
        if (
          !e.target.value.match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ) &&
          e.target.value.length > 0
        )
          error = {
            ...error,
            message: "Email address should be like example@gmail.com.",
          };
        else error = { ...error, message: null };
        break;
      case "panNo":
        e.target.value = e.target.value.toUpperCase();
        if (
          !e.target.value.match(/^.{0,10}$/) &&
          !e.target.value.match(/^[^@#$%^&*<>'\"/;`%]*$/)
        )
          error = { state: true, message: null };
        // pattern match
        if (
          !e.target.value.match(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/) &&
          e.target.value.length > 0
        )
          error = {
            ...error,
            message: "PAN number should be like NOOPS8327k.",
          };
        else error = { ...error, message: null };
        break;
      case "gstNo":
        e.target.value = e.target.value.toUpperCase();
        if (!e.target.value.match(/^.{0,15}$/))
          error = { state: true, message: null };
        // pattern match
        if (!checksum(e.target.value) && e.target.value.length > 0)
          error = {
            ...error,
            message: "GST number should be like 27AAPFU0939F1ZV.",
          };
        else error = { ...error, message: null };
        break;
      case "ifscCode":
        e.target.value = e.target.value.toUpperCase();

        if (!e.target.value.match(/^[^@#$%^&*<>'\"/;`%]*$/))
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
  }

  // handle Change for common feilds
  function handleCommonChange(e, i) {
    // console.log(e.target.name);
    // console.log(data.state);
    var error = { state: false };
    switch (e.target.name) {
      case "location":
        if (!e.target.value.match(/^[^@#$%^&*<>'\"/;`%]*$/))
          error = { state: true, message: "Value must be Correct" };
        break;
      case "address":
        // console.log('state',e.target.value.match(/^[a-zA-Z ]*$/))
        if (!e.target.value.match(/^[^@#$%^&*<>'\"/;`%]*$/))
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
      case "area":
        if (!e.target.value.match(/^[0-9]*$/))
          error = { state: true, message: "Value must be Correct" };
        else e.target.value = e.target.value.toLocaleString("hi");
        break;
      case "monthlyRent":
        if (!e.target.value.match(/^[0-9]*$/))
          error = { state: true, message: "Value must be Correct" };
        break;
      case "deposit":
        if (!e.target.value.match(/^[0-9]*$/)) error = { state: true };
        break;
      default:
        break;
    }
    console.log(e.target.name, e.target.value);
    if (!error.state) {
      setData((old) => ({ ...old, [e.target.name]: e.target.value }));
      console.log(formError);
      setFormError((old) => ({ ...old, [e.target.name]: "" }));
    }
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
      area,
      assets,
      property_pic
    } = data;

    const { landlord } = data;

    APICall(
      {
        modify_date: new Date(),
        property_pic,
        assets,
        area,
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
        assets
      },
      landlord
    );
  };

  function handleHold(id) {
    console.log(increment);
    // setData({ ...data, ...increment });
    console.log(validate(data), validateFields(data));
    if (validate(data) && validateFields(data)) {
      handleHoldApiCall(id, { ...data, ...increment });
    }
  }

  async function handleHoldApiCall(id, data) {
    // console.log(data)
    const {
      area,
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
      assets,
      property_pic
    } = data;
    console.log(year1, year2, year3, year4, year5);
    const { landlord } = data;
    APICall(
      {
        modify_date: new Date(),
        area,
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
        remark: "",
        assets,
        property_pic
      },
      landlord
    );
  }

  async function APICall(values, landlordData) {
    console.log(values, landlordData);
    const agreement = await add_agreement(values);

    // return 1
    if (agreement.data.success) {
      const agreement_id = agreement.data.agreement[0];

      console.log(">>>", agreement_id);

      landlordData = landlordData.map((row, index) => {
        let aadhar_card = `${(row.leeseName + "@aadhar_card").replace(
          " ",
          ""
        )}`;
        let pan_card = `${(row.leeseName + "@pan_card").replace(" ", "")}`;
        let gst = `${(row.leeseName + "@gst").replace(" ", "")}`;
        let cheque = `${(row.leeseName + "@cheque").replace(" ", "")}`;
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
          cheque: data[cheque],
        };
      });

      console.log(landlordData);
      // return 1

      const result = await add_landlord(landlordData);

      if (result) {
        window.location.href = "/listing";
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
    try {
      console.log(data);
      let res = await getBankName(data);
      if (res.status === 200) {
        setData((old) => ({
          ...old,
          landlord: old.landlord.map((row, index) => {
            if (index === i) {
              return {
                ...row,
                bankName: res.data.BANK,
                branchName: res.data.BRANCH,
              };
            } else return row;
          }),
        }));
      }
    } catch (err) {
      setData((old) => ({
        ...old,
        landlord: old.landlord.map((row, index) => {
          if (index === i) {
            return { ...row, bankName: "Not Found", branchName: "" };
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
      ,
      "draft_agreement",
      "electricity_bill",
      "poa",
      "maintaince_bill",
      "tax_receipt",
      "property_pic"
    ];

    data.landlord.length > 1 && field.push("noc");

    if (landloard.length > 0) {
      data.landlord.map((row, i) => {
        if (row.gstNo) {
          field.push(
            `${landloard[i].leeseName + "@gst_name"}`.replace(" ", "")
          );
        }
        field.push(
          `${landloard[i].leeseName + "@aadhar_card_name"}`.replace(" ", "")
        );
        field.push(
          `${landloard[i].leeseName + "@cheque_name"}`.replace(" ", "")
        );
        field.push(
          `${landloard[i].leeseName + "@pan_card_name"}`.replace(" ", "")
        );
      });
    }

    let finalCheck = field.map((row) => {
      if (!data[row]) {
        console.log(row);
        setFormError((old) => ({ ...old, [row]: "Document required." }));
        return true;
      } else {
        setFormError((old) => ({ ...old, [row]: "" }));

        return false;
      }
    });

    console.log(finalCheck.includes(true));
    if (!finalCheck.includes(true)) {
      return true;
    } else return false;
  }

  // for field validations 
  function validateFields(data) {
    console.log("Validate Called");

    let field = [
      ,
      "lockInYear",
      "noticePeriod",
      "deposit",
      "monthlyRent",
      "tenure",
      "state",
      "city",
      "address",
      "pincode",
      "location",
      "area",
      "assets"
    ];

    let dataError = [];
    if (data.landlord && data.landlord.length > 0) {
      console.log(data.landlord);

      dataError = data.landlord.map((row, i) => ({
        aadharNo: data.landlord[i].aadharNo ? false : "Field is required.",
        panNo: data.landlord[i].panNo ? false : "Field is required.",
        mobileNo: data.landlord[i].mobileNo ? false : "Field is required.",
        email: data.landlord[i].email ? false : "Field is required.",
        ifscCode: data.landlord[i].ifscCode ? false : "Field is required.",
        bankName: data.landlord[i].bankName ? false : "Field is required.",
        accountNo: data.landlord[i].accountNo ? false : "Field is required.",
        benificiaryName: data.landlord[i].benificiaryName
          ? false
          : "Field is required.",
      }));
    }

    let finalCheck = field.map((row) => {
      if (!data[row] || data[row] === "") {
        setFormError((old) => ({
          ...old,
          [row]: "Field required.",
          landlord: dataError,
        }));
        return true;
      } else {
        setFormError((old) => ({ ...old, [row]: "", landlord: dataError }));
        return false;
      }
    });

    dataError.map((row, i) => {
      finalCheck.push(Object.values(row).includes("Field is required."));
    });

    console.log("Field Check >>>>", finalCheck.includes(true));
    console.log("Field Check >>>>", formError);
    if (!finalCheck.includes(true)) {
      return true;
    } else return false;
  }

  //confirmation alert
  const [open, setOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(">>>",formError)
    console.log(validate(data), validateFields(data));

    setData((old) => ({ ...old, ...increment }));
    //  console.log(validate(data))
    if (validate(data) && validateFields(data)) {
      setIsSubmit(true);
      setOpen(true);
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  // function for fetching state list
  async function handleStateSearch(e, i) {
    if (e.target.value.length > 5) {
      let response = await getLocation(e.target.value);
      if (response.data[0].PostOffice) {
        let address = response.data[0].PostOffice[0];
        setFormError((old) => ({
          ...old,
          city: "",
          state: "",
        }));
        return setData((old) => ({
          ...old,
          state: address.State,
          city: address.District,
        }));
      }
    }
  }

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
        <Box className="backButton">
          <IconButton
            variant="contained"
            color="primary"
            onClick={() => navigate(-1)}
            size={"large"}
          >
            <ArrowCircleLeftIcon
              sx={{ fontSize: "3rem" }}
              color="#FFFFF !important"
            />
          </IconButton>
        </Box>

        <Box sx={{ flexGrow: 1 }}>
          <MyHeader>Rental Management System</MyHeader>

          <Grid container sx={{ justifyContent: "center" }}>
            <Grid item xs={12} md={10}>
              {/* agreement form start here */}
              <Box
                component="form"
                // onSubmit={handleSubmit}
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

                <Grid container  spacing={isSmall ? 2 : 4}>
                  <TextFieldWrapper
                    label="Code"
                    disabled={true}
                    placeHolder="code"
                    backgroundColor="rgba(3, 193, 243, 0.2);"
                    value={data.code}
                    name="code"
                  />

                  <TextFieldWrapper
                    label="Pincode"
                    placeHolder="Pincode"
                    backgroundColor="rgba(3, 193, 243, 0.2);"
                    value={data.pincode}
                    required={true}
                    maxLength={6}
                    name="pincode"
                    onChange={(e) => {
                      handleCommonChange(e);
                      handleStateSearch(e);
                    }}
                    error={formError.pincode}
                  />

                  <TextFieldWrapper
                    label="State"
                    disabled={true}
                    name="state"
                    required={true}
                    maxLength={6}
                    value={data.state || ""}
                    error={formError.state}
                    onChange={handleCommonChange}
                  />

                  <TextFieldWrapper
                    label="City"
                    required={true}
                    disabled={true}
                    fullWidth
                    name="city"
                    value={data.city || ""}
                    error={formError.city}
                    onChange={handleCommonChange}
                  />

                  <TextFieldWrapper
                    label="Location"
                    placeHolder="Enter Location"
                    name="location"
                    error={formError.location}
                    required={true}
                    value={data.location}
                    onChange={handleCommonChange}
                    index={i}
                  />

                  <TextFieldWrapper
                    label="Area"
                    placeHolder="Area in sq. ft"
                    name="area"
                    notationVal="sq. ft"
                    textAlignRight={"textAlignRight"}
                    error={formError.area}
                    required={true}
                    value={data.area}
                    onChange={handleCommonChange}
                    index={i}
                  />

                  <TextFieldWrapper
                    label="Address"
                    placeHolder="Enter Address"
                    required={true}
                    name="address"
                    value={data.address}
                    error={formError.address}
                    onChange={handleCommonChange}
                    index={i}
                  />

                  <TextFieldWrapper
                    label="Lock In Month(If Applicable)"
                    placeHolder="Enter Lock in Month"
                    required={true}
                    name="lockInYear"
                    handleOnBlur={(e) => handleOnBlur(e, i)}
                    // textAlignRight={"textAlignRight"}
                    value={data.lockInYear}
                    maxLength={2}
                    error={formError.lockInYear}
                    onChange={handleCommonChange}
                  />
                  <TextFieldWrapper
                    label="Notice Period In Month"
                    placeHolder="Enter Notice Period"
                    required={true}
                    maxLength={2}
                    name="noticePeriod"
                    error={formError.noticePeriod}
                    // textAlignRight={"textAlignRight"}
                    value={data.noticePeriod}
                    onChange={handleCommonChange}
                  />
                  <TextFieldWrapper
                    required={true}
                    label="Deposit Amount"
                    placeHolder="Enter Deposit Amount"
                    name="deposit"
                    error={formError.deposit}
                    textAlignRight={"textAlignRight"}
                    value={data.deposit || ""}
                    onChange={handleCommonChange}
                  />
                  <TextFieldWrapper
                    label="Monthly Rental"
                    placeHolder="Enter Rental"
                    required={true}
                    error={formError.monthlyRent}
                    textAlignRight={"textAlignRight"}
                    name="monthlyRent"
                    value={data.monthlyRent}
                    onChange={handleCommonChange}
                  />

                  <SelectComponent
                    label={"Agreement Tenure*"}
                    required={true}
                    name="tenure"
                    error={formError.tenure}
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
                  monthlyRent={data.monthlyRent}
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
                      <Box
                        mb={2}
                        size="small"
                        fullWidth
                        variant="outlined"
                        component={Button}
                        onClick={() => setExpand(expand === i ? -1 : i)}
                        sx={{
                          color: "black",
                          justifyContent: "space-between",
                          backgroundColor: "#b0d6f773",
                        }}
                      >
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
                          label="Name Of Lessor"
                          placeHolder="Enter Name Of Lessor"
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
                          label="Aadhaar Number"
                          placeHolder="Enter Aadhaar No."
                          required={true}
                          name="aadharNo"
                          maxLength={12}
                          value={
                            data.landlord[i] && data.landlord[i].aadharNo
                              ? data.landlord[i].aadharNo
                              : ""
                          }
                          onChange={(e) => handleChange(e, i)}
                          onBlur={(e) => handleOnBlur(e, i)}
                          index={i}
                          error={
                            formError.landlord[i] &&
                            formError.landlord[i].aadharNo
                              ? formError.landlord[i].aadharNo
                              : ""
                          }
                        />
                        <TextFieldWrapper
                          label="PAN Number"
                          placeHolder="Enter PAN No."
                          name="panNo"
                          onBlur={(e) => handleOnBlur(e, i)}
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
                          onBlur={(e) => handleOnBlur(e, i)}
                          value={
                            data.landlord[i] && data.landlord[i].mobileNo
                              ? data.landlord[i].mobileNo
                              : ""
                          }
                          error={
                            formError.landlord[i] &&
                            formError.landlord[i].mobileNo
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
                          onBlur={(e) => handleOnBlur(e, i)}
                          maxLength={10}
                          // required={true}

                          value={
                            data.landlord[i] && data.landlord[i].alternateMobile
                              ? data.landlord[i].alternateMobile
                              : ""
                          }
                          error={
                            formError.landlord[i] &&
                            formError.landlord[i].alternateMobile
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
                          onBlur={(e) => handleOnBlur(e, i)}
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
                          onBlur={(e) => handleOnBlur(e, i)}
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
                          maxLength={11}
                          onBlur={(e) => handleOnBlur(e, i)}
                          required={true}
                          value={
                            data.landlord[i] && data.landlord[i].ifscCode
                              ? data.landlord[i].ifscCode
                              : ""
                          }
                          error={
                            formError.landlord[i] &&
                            formError.landlord[i].ifscCode
                              ? formError.landlord[i].ifscCode
                              : ""
                          }
                          onChange={(e) => handleChange(e, i)}
                        />

                        <TextFieldWrapper
                          label="Bank Name"
                          placeHolder="Enter Bank Name"
                          name="bankName"
                          partLabel={
                            data.landlord[i] && data.landlord[i].branchName
                              ? data.landlord[i].branchName
                              : ""
                          }
                          error={
                            data.landlord[i] &&
                            data.landlord[i].bankName === "Not Found"
                              ? "Bank Name not found."
                              : ""
                          }
                          required={true}
                          // onBlur = {(e) => handleOnBlur(e, i)}
                          disabled={true}
                          value={
                            data.landlord[i] && data.landlord[i].bankName
                              ? data.landlord[i].bankName
                              : ""
                          }
                          onChange={(e) => handleOnBlur(e, i)}
                        />

                        <TextFieldWrapper
                          label="Beneficiary Name"
                          placeHolder="Enter Beneficiary Name"
                          name="benificiaryName"
                          onBlur={(e) => handleOnBlur(e, i)}
                          value={
                            data.landlord[i] && data.landlord[i].benificiaryName
                              ? data.landlord[i].benificiaryName
                              : ""
                          }
                          error={
                            formError.landlord[i] &&
                            formError.landlord[i].benificiaryName
                              ? formError.landlord[i].benificiaryName
                              : ""
                          }
                          required={true}
                          onChange={(e) => handleChange(e, i)}
                        />

                        <TextFieldWrapper
                          label="Bank A/C Number "
                          placeHolder="Enter Account No."
                          name="accountNo"
                          maxLength={17}
                          required={true}
                          onBlur={(e) => handleOnBlur(e, i)}
                          value={
                            data.landlord[i] && data.landlord[i].accountNo
                              ? data.landlord[i].accountNo
                              : ""
                          }
                          error={
                            formError.landlord[i] &&
                            formError.landlord[i].accountNo
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
                      <Box
                        mb={2}
                        size="small"
                        fullWidth
                        variant="outlined"
                        component={Button}
                        onClick={() => setDocExpand(docExpand === i ? -1 : i)}
                        sx={{
                          color: "black",
                          justifyContent: "space-between",
                          backgroundColor: "#b0d6f773",
                        }}
                      >
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
                            placeHolder="Upload Aadhaar Card"
                            handleChange={handleChangeFile}
                            name={
                              landloard[i]
                                ? `${(
                                    landloard[i].leeseName + "@aadhar_card"
                                  ).replace(" ", "")}`
                                : "adhar"
                            }
                            fileName={
                              landloard[i]
                                ? data[
                                    `${
                                      landloard[i].leeseName +
                                      "@aadhar_card_name"
                                    }`.replace(" ", "")
                                  ]
                                : ""
                            }
                            error={
                              landloard[i] &&
                              formError[
                                `${
                                  landloard[i].leeseName + "@aadhar_card_name"
                                }`.replace(" ", "")
                              ]
                            }
                          />
                        </Grid>

                        <Grid item xs={6}>
                          <DocumentUpload
                            label="Upload PAN Card"
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
                            placeHolder={"Upload PAN Card"}
                            handleChange={handleChangeFile}
                            name={
                              landloard[i]
                                ? `${(
                                    landloard[i].leeseName + "@pan_card"
                                  ).replace(" ", "")}`
                                : "pan"
                            }
                            fileName={
                              landloard[i]
                                ? data[
                                    `${
                                      landloard[i].leeseName + "@pan_card_name"
                                    }`.replace(" ", "")
                                  ]
                                : ""
                            }
                            error={
                              landloard[i] &&
                              formError[
                                `${
                                  landloard[i].leeseName + "@pan_card_name"
                                }`.replace(" ", "")
                              ]
                            }
                          />
                        </Grid>

                        <Grid item xs={6}>
                          <DocumentUpload
                            label="Upload Cancel Cheque"
                            placeHolder="Upload Cancel Cheque"
                            uploaded={
                              landloard[i]
                                ? data[
                                    `${(
                                      landloard[i].leeseName + "@cheque"
                                    ).replace(" ", "")}`
                                  ]
                                  ? true
                                  : false
                                : false
                            }
                            fileName={
                              landloard[i]
                                ? data[
                                    `${
                                      landloard[i].leeseName + "@cheque_name"
                                    }`.replace(" ", "")
                                  ]
                                : ""
                            }
                            error={
                              landloard[i] &&
                              formError[
                                `${
                                  landloard[i].leeseName + "@cheque_name"
                                }`.replace(" ", "")
                              ]
                            }
                            handleChange={handleChangeFile}
                            name={
                              landloard[i]
                                ? `${(
                                    landloard[i].leeseName + "@cheque"
                                  ).replace(" ", "")}`
                                : "cheque"
                            }
                          />
                        </Grid>

                        {data.landlord[i] ? (
                          data.landlord[i].gstNo ? (
                            <Grid item xs={6}>
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
                                fileName={
                                  landloard[i]
                                    ? data[
                                        `${
                                          landloard[i].leeseName + "@gst_name"
                                        }`.replace(" ", "")
                                      ]
                                    : ""
                                }
                                placeHolder="Upload GST Certificate"
                                error={
                                  landloard[i] &&
                                  formError[
                                    `${
                                      landloard[i].leeseName + "@gst_name"
                                    }`.replace(" ", "")
                                  ]
                                }
                                handleChange={handleChangeFile}
                                name={
                                  landloard[i]
                                    ? `${(
                                        landloard[i].leeseName + "@gst"
                                      ).replace(" ", "")}`
                                    : "gst"
                                }
                              />
                            </Grid>
                          ) : (
                            ""
                          )
                        ) : (
                          ""
                        )}
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
                      fileName={data.draft_agreement_name}
                      handleChange={handleChangeFile}
                      name={"draft_agreement"}
                      error={formError.draft_agreement}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <DocumentUpload
                      label="Upload Electricity Bill"
                      uploaded={data.electricity_bill && true}
                      placeHolder={"Upload Electricity Bill"}
                      fileName={data.electricity_bill_name}
                      handleChange={handleChangeFile}
                      name={"electricity_bill"}
                      error={formError.electricity_bill}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <DocumentUpload
                      label="Upload POA (If Applicable)"
                      placeHolder="Upload POA"
                      uploaded={data.poa && true}
                      fileName={data.poa_name}
                      handleChange={handleChangeFile}
                      name={"poa"}
                      error={formError.poa}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <DocumentUpload
                      label="Upload Maintenance Bill"
                      uploaded={data.maintaince_bill && true}
                      placeHolder={"Upload Maintenance Bill"}
                      fileName={data.maintaince_bill_name}
                      handleChange={handleChangeFile}
                      name={"maintaince_bill"}
                      error={formError.maintaince_bill}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <DocumentUpload
                      label="Upload Property Tax Receipt"
                      uploaded={data.tax_receipt && true}
                      fileName={data.tax_receipt_name}
                      placeHolder={"Upload Property Tax Receipt"}
                      handleChange={handleChangeFile}
                      name={"tax_receipt"}
                      error={formError.tax_receipt}
                    />
                  </Grid>
                  {data.landlord.length > 1 && (
                    <Grid item xs={6}>
                      <DocumentUpload
                        uploaded={data.noc && true}
                        label="Upload NOC (If Multiple Owners)"
                        placeHolder="NOC"
                        fileName={data.noc_name}
                        handleChange={handleChangeFile}
                        name={"noc"}
                        error={formError.noc}
                      />
                    </Grid>
                  )}
                    <Grid item xs={6}>
                    <DocumentUpload
                      label="Upload Property Picture"
                      uploaded={data.property_pic && true}
                      fileName={data.property_pic_name}
                      placeHolder={"Upload Property Picture"}
                      handleChange={handleChangeFile}
                      name={"property_pic"}
                      error={formError.property_pic}
                    />
                  </Grid>
                </Grid>

                {/* Document upload section end here */}

                <Grid
                    item
                    xs={10}
                    sx={{ mt: 5 }}
                    className={"textFieldWrapper"}
                  >
                    <Grid item xs={8}>
                      <TextField
                        type="text"
                        multiline
                        rows={3}
                        fullWidth
                        variant="outlined"
                        label="Landlord Assets *"
                        name = "assets"
                        placeholder="Landlord Assets *"
                        value={data.assets || ""}
                        onChange={handleCommonChange}
                        // onChange={(e) => setAssets(e.target.value)}
                      />
                      <Typography sx = {{color : 'red'}} variant = 'caption'>{formError.assets}</Typography>
                    </Grid>
                  </Grid>

                {/* Landlord Assets */}

                {/* Button Start from here */}
                <Grid
                  container
                  sx={{ justifyContent: "center", mt: 2 }}
                  spacing={4}
                >
                  <Grid item md={3} xs={6}>
                    <Button
                      variant="contained"
                      // type="submit"
                      onClick={handleSubmit}
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
                      Save As Draft
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
