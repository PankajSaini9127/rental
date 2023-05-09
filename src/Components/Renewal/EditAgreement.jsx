import React, { useEffect, useState } from "react";

//icons
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import VisibilityIcon from "@mui/icons-material/Visibility";

  import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

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
  IconButton,
  FormControl,
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
  getLocation,
  getDetails_renewal,
  send_to_bhu,
  addRenewalDesposit
} from "../../Services/Services";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../../store/action/action";
import PermissionAlert from "../Manager/Alert";
import { useParams, useNavigate } from "react-router-dom";
import { DataFieldStyle, ImageView } from "../StyleComponents/Rental";
import HamburgerManager from "../Manager/HamburgerManager";

function EditAgreement({ history }) {
  const navigate = useNavigate();
  const { landloard ,auth} = useSelector((state) => state);
  const dispatch = useDispatch();
  const [agreement, setAgreement] = useState([]);
  const { id } = useParams();
// renewal data state
const [renewal,setRenewal] = useState({
  deposited : 0,
  unpaid_amount : 0,
  balance_amount : 0,
  new_deposit : 0,
  receivable : 0,
  status : 'Pending'
})
  const [upaid,setUnpaid] = useState([])

  // modified by yashwant
  const [preData, setPreData] = useState({
    landlord: [],
    area: "",
    code: "",
    lockInYear: "",
    address: "",
    pincode: "",
    state: "",
    city: "",
    locaiton: "",
    noticePeriod: "",
    deposit: "",
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
    remark: "",
    precentage:"",
    manager_id:""
  });


  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];


  async function fetchData() {
    try {
      let response = await getDetails_renewal(id);

       console.log(response)
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
          area,
          landlord,
          remark,
          manager_id,
          branchName,
          assets,
          property_pic
        } = response.data.agreement;

        // get the unpaid hisorty of the agreement
        let unpaid_amount = response.data.listUnpaidRow.reduce((sum,row)=>sum+=parseInt(row.rent_amount),0)
        if(response.data.listUnpaidRow.length > 0)
        setUnpaid(response.data.listUnpaidRow)

        console.log(unpaid_amount)

        setRenewal(old=>({
          deposited : parseInt(deposit),
          unpaid_amount : unpaid_amount,
          balance_amount : parseInt(deposit) - unpaid_amount,
          new_deposit : parseInt(deposit),
          receivable : parseInt(deposit) - unpaid_amount +  0
        }))

        let rent = monthlyRent;
        if(yearlyIncrement === "Percentage"){
          setYearValue({
            year1: 0,
            year2: year2 && parseInt(((year2 - year1) / year1) * 100),
            year3: year3 && parseInt(((year3 - year2) / year2) * 100),
            year4: year4 && parseInt(((year4 - year3) / year3) * 100),
            year5: year5 && parseInt(((year5 - year4) / year4) * 100),
          });
        }else{
          setYearValue({
            year1: 0,
            year2: year2 && year2 - year1,
            year3: year3 && year3 - year2,
            year4: year4 && year4 - year3,
            year5: year5 && year5 - year4,
          })
        }
        
        setPreData({
          ...preData,
          id,
          property_pic,
          area,
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
          deposit,
          assets,
          // gst_certificate,
          // draft_agreement,
          // electricity_bill,
          // poa,
          // maintaince_bill,
          // cheque,
          // tax_receipt,
          // noc,
          tenure,
          landlord,
          remark,
          manager_id,
          branchName
        });

        setPartLable({
          id,
          area,
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
          landlord,
          remark,
          year1,
          year2,
          year3,
          year4,
          year5,
          branchName,
          assets
        });

        setFormError({
          id: undefined,
          code: undefined,
          pincode: undefined,
          state: undefined,
          address: undefined,
          location: undefined,
          city: undefined,
          lockInYear: undefined,
          monthlyRent: undefined,
          noticePeriod: undefined,
          yearlyIncrement: undefined,
          deposit: undefined,
          gst_certificate: undefined,
          draft_agreement: undefined,
          electricity_bill: undefined,
          poa: undefined,
          maintaince_bill: undefined,
          cheque: undefined,
          tax_receipt: undefined,
          noc: undefined,
          tenure: undefined,
          landlord: landlord.map((row) => ({})),
          remark: undefined,
          area: undefined,
        });
      }
    } catch (error) {
      //console.log('err>>',error)
    }
  }
  
  useEffect(() => {
    fetchData();
  }, []);

  const [docExpand, setDocExpand] = useState(0);

  // useEffect(() => {
  //   codeGenerater();
  // }, []);
  //console.log(">>>>", landloard);
  const [i, setIndex] = useState(0);
 

  useEffect(() => {
    setPreData((old) => ({ ...old, landlord: [...landloard] }));
    setFormError((old) => ({ ...old, landlord: [...landloard] }));
  }, [landloard]);

  const [landblord, setLandblord] = useState([1]);

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const [formError, setFormError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [recovery,setRecovery] = useState({
    agreement_id : id,
    remainingMonth : 0,
    depositedAmount : 0,
    adjustmentAmount : 0,
    expenses : 0,
    otherAdjustments : 0,
    totalAdjustmentAmount : 0,
    balanceDeposit : 0,
    monthlyRent : 0,
  })
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

  function handleRenewal(e)
  {
    let newDP = parseInt(e.target.value || 0)
    setRenewal(old=>({
      ...old,
      [e.target.name] : newDP,
      receivable : (newDP > 0) ? newDP - old.balance_amount : old.deposited - old.unpaid_amount
    }))

  }
  // upload document
  async function handleChangeCommonFile(e, i) {
    const FD = new FormData();
    console.log();
    console.log(e.target.name);

    FD.append("photo", e.target.files[0]);
    let response = await uploadDoc(FD);
    // console.log(data)
    if (response.status === 200) {
      console.log(e.target.name);
      console.log(formError);
      setFormError((old) => ({...old,
        [e.target.name + i]  : "",
        [e.target.name] : "",

      }));

      // setting the value to appropiate lanlord
      setPreData((old) => ({
        ...old,
        [e.target.name + "_name"]: e.target.files[0].name,
        landlord: old.landlord.map((row, index) => {
          if (parseInt(i) === index) {
            row[e.target.name] = response.data.link;
            return row;
          } else return row;
        }),
        [e.target.name + i]: e.target.files[0].name,
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
  // upload document
  async function handleChangeFile(e) {
    const FD = new FormData();
    console.log(e.target.files[0]);
    console.log(e.target.name);

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

      setPreData((old) => ({
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

  // use on Change for uncommon fields
  function handleChange(e, i) {
    let error = { state: false, message: null };
    console.log(e.target.name, i);
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
      console.log("in")
        setPreData((old) => ({
          ...old,
          landlord: old.landlord.map((row, id) => {
            console.log(id)
            if (parseInt(i) === id) {
              return {
                ...row,
                [e.target.name]: e.target.value,
              };
            }
            return row;
          }),
        }));
      }
      console.log(preData)
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
        else e.target.value = e.target.value.toLocaleString();
        break;
      case "area":
        if (!e.target.value.match(/^[0-9]*$/))
          error = { state: true, message: "Value must be Correct" };
        else e.target.value = e.target.value.toLocaleString();
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
      setPreData((old) => ({ ...old, [e.target.name]: e.target.value }));
      console.log(formError);
      setFormError((old) => ({ ...old, [e.target.name]: "" }));
    }
  }

  async function getBankDetails(data, i) {
    try {
      console.log(data);
      let res = await getBankName(data);

      if (res.status === 200) {
        setPreData((old) => ({
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
      setPreData((old) => ({
        ...old,
        landlord: old.landlord.map((row, index) => {
          if (index === i) {
            return { ...row, bankName: "Not Found", branchName: "" };
          } else return row;
        }),
      }));
    }
  }

  // on form submit

  const handleConfirm = ( ) => {
    setOpen(false);
    // //console.log(data)
    console.log(preData.landlord)
    const {
      id,
      code,
      area,
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
      tax_receipt,
      noc,
      tenure,
      pincode,
      state,
      address,
      location,
      precentage,
      city,
      landlord,
      manager_id,
      assets,
      property_pic,

    } = preData;

    APICall(
      {
        assets,
        pincode,
        state,
        address,
        location,
        city,
        area,
        // id,
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
        tax_receipt,
        noc,
          property_pic,
          tenure,
        ...increment,
        manager_id,
        // landlord,
       status: "Sent To Sr Manager",
        remark: "",
        renewal_status:"",
        type:"Renewed"
      },
      landlord
    );
  };

  const [partLabel,setPartLable] = useState({
    landlord: [],
    area: "",
    code: "",
    lockInYear: "",
    address: "",
    pincode: "",
    state: "",
    city: "",
    locaiton: "",
    noticePeriod: "",
    deposit: "",
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
    remark: "",
    assets : ""
  })



console.log(partLabel)


  const [expand, setExpand] = useState(0);


  async function APICall(values, landlordData) {
    console.log(values, landlordData);
    const agreement = await add_agreement(values);

    // return 1
    if (agreement.data.success) {
      const agreement_id = agreement.data.agreement[0];

      console.log(">>>", agreement_id);

      landlordData = landlordData.map(row=>{
           row.agreement_id = agreement_id
           return row
       })
      
       
       const result = await add_landlord(landlordData);
       console.log(result)
       
       const renew_deposit = await addRenewalDesposit({...renewal,agreement_id})
      if (result) {
        // window.location.href = "/listing";
        const response = await send_to_bhu(
          { renewal_status:values.renewal_status },
          preData.id
        )
        if(response.data.success){
          navigate(-1)
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
  }
  useEffect(() => {
    // //console.log(formError)
    if (Object.keys(formError).length === 0 && isSubmit) {
      setOpen(true);
    }
  }, [formError]);

  // form validation
  function validate(data) {
    let field = [
      "draft_agreement",
      "electricity_bill",
      "poa",
      "maintaince_bill",
      "tax_receipt",
      "property_pic",

    ];
     preData.landlord.length > 1 && field.push("noc")


    // if (preData.landlord.length > 0) {
    //   preData.landlord.map((row, i) => {
    //     if (row.gstNo) {
    //       field.push(
    //         `${preData.landlord[i].leeseName + "@gst_name"}`.replace(" ", "")
    //       );
    //     }
    //     field.push(
    //       `${preData.landlord[i].leeseName + "@aadhar_card_name"}`.replace(" ", "")
    //     );
    //     field.push(
    //       `${preData.landlord[i].leeseName + "@cheque_name"}`.replace(" ", "")
    //     );
    //     field.push(
    //       `${preData.landlord[i].leeseName + "@pan_card_name"}`.replace(" ", "")
    //     );
    //   });
    // }

    let finalCheck = field.map((row) => {
      if (!preData[row]) {
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

    console.log(">>>", dataError);
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
  const [open, setOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(">>>",formError)
    console.log(validate(preData), validateFields(preData));
   
    setPreData((old) => ({ ...old, ...increment }));
    if (validate(preData) && validateFields(preData)) {
      setIsSubmit(true);
      setOpen(true);
    }
  };

  //confirmation alert

  const handleCancel = () => {
    setOpen(false);
  };

  // function for fetching state list
  async function handleStateSearch(e, i) {
    if (e.target.value.length > 4) {
      let response = await getLocation(e.target.value);
      if (response.data[0].PostOffice) {
        let address = response.data[0].PostOffice[0];
        return setPreData((old) => ({
          ...old,
          state: address.State,
          city: address.District,
        }));
      } else {
        return setPreData((old) => ({ ...old, state: "", city: "" }));
      }
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
    console.log(e.target.name, e.target.value);
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

    console.log(formError);
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


  function handleHold() {
    const {
      id,
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
      tax_receipt,
      noc,
      tenure,
      pincode,
      state,
      address,
      location,
      city,
      landlord,
      property_pic,

    } = preData;
    console.log(preData);
    console.log(validate(preData), validateFields(preData));
    if (validate(preData) && validateFields(preData)) {
      APICall(
        {
          pincode,
          state,
          address,
          area,
          location,
          city,
          // id,
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
          tax_receipt,
          property_pic,
          noc,
          tenure,
          ...increment,
          status: "Hold",
          remark: "",
          type:"Renewed",
          renewal_status:""
        },
        landlord
      );
    }
  }

  function Docview ( href, name ){
    console.log("docview")
       return <ImageView open={true} handleClose={()=>{}} href={href} name={name} />
  }

  return (
    <>
    {preData.landlord.length > 0 && <>
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
        <HamburgerManager/>
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

        <Box sx={{ flexGrow: 1 }}><Grid
            item
            xs={12}
            sx={{ justifyContent: "space-between", display: "flex" }}
          >
            <MyHeader>Rental Management System</MyHeader>
            <Typography mt="15px" mr="15px" fontWeight="600">
              Welcome {auth.name}
            </Typography>
          </Grid>

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

                <Grid container sx={{ px: 3,mb:2 }} spacing={isSmall ? 4 : 4} rowSpacing={5}>
                  <TextFieldWrapper
                    label="Code"
                    placeHolder=""
                    disabled={true}
                    backgroundColor="rgba(3, 193, 243, 0.2);"
                    value={preData.code}
                    name="code"
                  />

                  <TextFieldWrapper
                    label="Pincode"
                    placeHolder="Pincode"
                    backgroundColor="rgba(3, 193, 243, 0.2);"
                    value={preData.pincode}
                    required={true}
                    maxLength={6}
                    disabled={true}
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
                    value={preData.state || ""}
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
                        error={formError.city}
                        fullWidth
                        name="city"
                        value={preData.city || ""}
                      />
                    </FormControl>
                  </Grid>

                  <TextFieldWrapper
                    label="Location"
                    placeHolder="Enter Location"
                    name="location"
                    disabled={true}
                    error={formError.location}
                    value={preData.location || ""}
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
                    value={preData.area}
                    partLabel={
                      partLabel &&
                      partLabel.area
                        ?"Old Area:"+ partLabel.area+' sq. ft'
                        : ""
                    }
                    onChange={handleCommonChange}
                  />

                  <TextFieldWrapper
                    label="Address"
                    placeHolder="Enter Address"
                    error={formError.address}
                    required={true}
                    disabled={true}
                    name="address"
                    value={preData.address}
                    onChange={handleCommonChange}
                    index={i}
                  />
                  <TextFieldWrapper
                    label="Lock In Month(If Applicable)"
                    placeHolder="Enter Lock in Month"
                    name="lockInYear"
                    maxLength={2}
                    value={preData.lockInYear}
                    partLabel={
                      partLabel.lockInYear &&
                      partLabel.lockInYear
                        ?"Old Lock In Month :"+ partLabel.lockInYear + ' (Month)'
                        : ""
                    }
                    error={formError.lockInYear}
                    onChange={handleCommonChange}
                  />
                  <TextFieldWrapper
                    label="Notice Period In Month"
                    placeHolder="Enter Notice Period"
                    error={formError.noticePeriod}
                    name="noticePeriod"
                    maxLength={2}
                    value={preData.noticePeriod}
                    partLabel={
                      partLabel.noticePeriod &&
                      partLabel.noticePeriod
                        ?"Old Notice Period :"+ partLabel.noticePeriod
                        : ""
                    }
                    onChange={handleCommonChange}
                  />
                  <TextFieldWrapper
                    label="Deposit Amount"
                    placeHolder="Enter deposit Amount"
                    name="deposit"
                    textAlignRight={"textAlignRight"}
                    error={formError.deposit}
                    value={preData.deposit}
                    partLabel={
                      partLabel.deposit &&
                      partLabel.deposit
                        ?"Old Deposit Amount :"+ partLabel.deposit
                        : ""
                    }
                    onChange={handleCommonChange}
                  />
                  <TextFieldWrapper
                    label="Monthly Rental"
                    placeHolder="Enter Rental"
                    required={true}
                    name="monthlyRent"
                    textAlignRight={"textAlignRight"}
                    error={formError.monthlyRent}
                    value={preData.monthlyRent}
                    partLabel={
                      partLabel.monthlyRent &&
                      partLabel.monthlyRent
                        ? "Old Monthly Rent:"+ partLabel.monthlyRent
                        : ""
                    }
                    onChange={handleCommonChange}
                  />

                  {/* <SelectComponent
                    label={"Agreement Tenure"}
                    required={true}
                    error={formError.tenure}
                    name="tenure"
                    options={[
                      "11 Month",
                      "2 Year",
                      "3 Year",
                      "4 Year",
                      "5 Year",
                    ]}
                    partLabel={
                      partLabel.tenure &&
                      partLabel.tenure
                        ? "Old Tenure:"+ partLabel.tenure
                        : ""
                    }
                    value={preData.tenure || ""}  
                    helperText = {partLabel.tenure}             
                    onChange={handleCommonChange}
                  /> */}

                    <TextFieldWrapper
                    label="Agreement Tenure"
                    placeHolder="Tenure In Months"
                    name="tenure"
                    notationVal="Month's"
                    textAlignRight={"textAlignRight"}
                    error={formError.tenure}
                    required={true}
                    value={preData.tenure || ""}
                    onChange={handleCommonChange}
                    index={i}
                    maxLength={3}
                    partLabel={
                      partLabel.tenure &&
                      partLabel.tenure
                        ? "Old Tenure:"+ partLabel.tenure
                        : ""
                    }
                  />
                  {preData.tenure === "" ? null : preData.tenure < 12 ? null : (
                    <SelectComponent
                      label={"Yearly Increment"}
                      required={true}
                      name="yearlyIncrement"
                      partLabel={
                        partLabel.yearlyIncrement &&
                        partLabel.yearlyIncrement
                          ?"Old Yearly Increment" + partLabel.yearlyIncrement
                          : ""
                      }
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
                  monthlyRent={preData.monthlyRent || ""}
                  partLabel={partLabel}
                />

                {/* landlord Details start here*/}
                <Typography
                  variant="body1"
                  color="var(--main-color)"
                  fontSize="25px"
                  lineHeight="28px"
                  fontWeight="600"
                  my="20px"
                  mt="35px !important"
                >
                  Landlord Detail
                </Typography>

                {preData.landlord.length > 0 &&
                  preData.landlord.map((_, i) => (
                    <>
                      {preData.landlord.length > 0 && (
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
                            {preData.landlord.length > 0
                              ? preData.landlord[i].leeseName
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
                          rowSpacing={5}
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
                            label="Name Of Lessor"
                            placeHolder="Enter Name Of Lessor"
                            required={true}
                            disabled={true}
                            onBlur={(e) => handleOnBlur(e, i)}
                            // error = {errorObj.leeseName}
                            name="name"
                            value={preData.landlord[i].name}
                            onChange={(e) => handleChange(e, i)}
                          />
                          <TextFieldWrapper
                            label="Aadhar Number"
                            placeHolder="Enter Aadhar No."
                            required={true}
                            onBlur={(e) => handleOnBlur(e, i)}
                            name="aadharNo"
                            disabled={true}
                            maxLength={12}
                            value={preData.landlord[i].aadharNo}
                            onChange={(e) => handleChange(e, i)}
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
                            onBlur={(e) => handleOnBlur(e, i)}
                            error={
                              formError.landlord[i] &&
                              formError.landlord[i].panNo
                                ? formError.landlord[i].panNo
                                : ""
                            }
                            name="panNo"
                            disabled={true}
                            maxLength={10}
                            value={preData.landlord[i].panNo}
                            onChange={(e) => handleChange(e, i)}
                            index={i}
                          />

                          <TextFieldWrapper
                            label="Mobile Number"
                            placeHolder="Enter Mobile No."
                            required={true}
                            onBlur={(e) => handleOnBlur(e, i)}
                            name="mobileNo"
                            maxLength={10}
                            partLabel={
                              partLabel.landlord[i] &&
                              partLabel.landlord[i].mobileNo
                                ? "Old Mobile Number: " + partLabel.landlord[i].mobileNo
                                : ""
                            }
                            error={
                              formError.landlord[i] &&
                              formError.landlord[i].mobileNo
                                ? formError.landlord[i].mobileNo
                                : ""
                            }
                            value={preData.landlord[i].mobileNo}
                            onChange={(e) => handleChange(e, i)}
                            index={i}
                          />
                          <TextFieldWrapper
                            label="Alternate Number"
                            // error={formError.alternteMo}
                            placeHolder="Enter Alternate No."
                            name="alternateMobile"
                            onBlur={(e) => handleOnBlur(e, i)}
                            maxLength={10}
                            partLabel={
                             "Old Alternate Number: " + partLabel.landlord[i].alternateMobile
                            }
                            value={preData.landlord[i].alternateMobile}
                            // error={formError.alternateMobile}
                            onChange={(e) => handleChange(e, i)}
                            index={i}
                          />

                          <TextFieldWrapper
                            label="Email"
                            placeHolder="Enter Email"
                            onBlur={(e) => handleOnBlur(e, i)}
                            required={true}
                            error={
                              formError.landlord[i] &&
                              formError.landlord[i].email
                                ? formError.landlord[i].email
                                : ""
                            }
                            name="email"
                            partLabel={
                              "Old Email: "+ partLabel.landlord[i].email
                            }
                            value={preData.landlord[i].email}
                            onChange={(e) => handleChange(e, i)}
                            index={i}
                          />
                          <TextFieldWrapper
                            // required={true}
                            label="GST Number"
                            placeHolder="Enter GST No."
                            // required={true}
                            onBlur={(e) => handleOnBlur(e, i)}
                            error={
                              formError.landlord[i] &&
                              formError.landlord[i].gstNo
                                ? formError.landlord[i].gstNo
                                : ""
                            }
                            name="gstNo"
                            maxLength={15}
                            partLabel={
                              "Old GST Number :"+ partLabel.landlord[i].gstNo
                            }
                            value={preData.landlord[i].gstNo}
                            onChange={(e) => handleChange(e, i)}
                          />
                          <TextFieldWrapper
                            required={true}
                            label="Bank IFSC"
                            placeHolder="Enter IFSC Code"
                            onBlur={(e) => handleOnBlur(e, i)}
                            name="ifscCode"
                            // disabled={true}
                            error={
                              formError.landlord[i] &&
                              formError.landlord[i].ifscCode
                                ? formError.landlord[i].ifscCode
                                : ""
                            }
                            partLabel={
                              "Old Bank IFSC :"+ partLabel.landlord[i].ifscCode
                            }
                            value={preData.landlord[i].ifscCode}
                            onChange={(e) => handleChange(e, i)}
                          />


                          <TextFieldWrapper
                            label="Bank Name"
                            placeHolder="Enter Bank Name"
                            name="bankName"
                            onBlur={(e) => handleOnBlur(e, i)}
                            partLabel={
                              "Old Bank Branch Name:"+ partLabel.landlord[i].branchName
                            }
                            error={
                              formError.landlord[i] &&
                              formError.landlord[i].bankName
                                ? formError.landlord[i].bankName
                                : ""
                            }
                            required={true}
                            disabled={true}
                            value={preData.landlord[i].bankName}
                            onChange={(e) => handleChange(e, i)}
                          />

                          <TextFieldWrapper
                            required={true}
                            label="Beneficiary Name"
                            onBlur={(e) => handleOnBlur(e, i)}
                            error={
                              formError.landlord[i] &&
                              formError.landlord[i].benificiaryName
                                ? formError.landlord[i].benificiaryName
                                : ""
                            }
                            placeHolder="Enter Beneficiary Name"
                            name="benificiaryName"
                            value={preData.landlord[i].benificiaryName}
                            onChange={(e) => handleChange(e, i)}
                            partLabel={
                              "Old Beneficiary Name:"+ partLabel.landlord[i].benificiaryName
                            }
                          />
                          <TextFieldWrapper
                            label="Bank A/C Number "
                            required={true}
                            placeHolder="Enter Account No."
                            name="accountNo"
                            error={
                              formError.landlord[i] &&
                              formError.landlord[i].accountNo
                                ? formError.landlord[i].accountNo
                                : ""
                            }
                            value={preData.landlord[i].accountNo}
                            onChange={(e) => handleChange(e, i)}
                            partLabel={
                              "Old Bank A/C Number:"+ partLabel.landlord[i].accountNo
                            }
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

                {preData.landlord.length > 0 &&
                  formError.landlord.length > 0 &&
                  preData.landlord.map((_, i) => (
                    <>
                      {preData.landlord.length > 0 && (
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
                            {preData.landlord.length > 0
                              ? preData.landlord[i].leeseName
                              : ""}{" "}
                            Upload Document
                          </Typography>
                          <IconButton
                            onClick={() =>
                              setDocExpand(docExpand === i ? -1 : i)
                            }
                          >
                            {docExpand === i ? (
                              <KeyboardArrowUpIcon />
                            ) : (
                              <KeyboardArrowDownIcon />
                            )}
                          </IconButton>
                        </Box>
                      )}
                      <Collapse
                        in={docExpand === i}
                        timeout="auto"
                        unmountOnExit
                      >
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
                                preData[`aadhar_card${i}`] ||
                                preData.landlord[i]["aadhar_card"]
                                  ? true
                                  : false
                              }
                              disabled={true}
                              label="Upload Aadhaar Card"
                              placeHolder="Upload Aadhaar Card"
                              handleChange={(e) => handleChangeCommonFile(e, i)}
                              name={"aadhar_card"}
                              fileName={preData[`aadhar_card${i}`]}
                              href={ preData.landlord[i].aadhar_card}
                            />
                            
                          </Grid>
                          <Grid item xs={6}>
                            <DocumentUpload
                              label="Upload PAN Card"
                              uploaded={
                                preData[`pan_card${i}`] ||
                                preData.landlord[i]["pan_card"]
                                  ? true
                                  : false
                              }
                              name={"pan_card"}
                              disabled={true}
                              fileName={preData[`pan_card${i}`]}
                              placeHolder={"Upload PAN Card"}
                              handleChange={(e) => handleChangeCommonFile(e, i)}
                              href={ preData.landlord[i].pan_card}
                            />
                          </Grid>
                          {console.log('>>>',i)}
                          {
                          ((partLabel.landlord[i].gstNo === preData.landlord[i].gstNo && partLabel.landlord[i].gstNo !== "" ) || preData.landlord[i].gstNo !== "") && 
                            <Grid item xs={6}>
                            <DocumentUpload
                              uploaded={(preData.landlord[i].gst !== "" &&
                              partLabel.landlord[i].gstNo === preData.landlord[i].gstNo
                              ) ? true :
                              (partLabel.landlord[i].gst !== preData.landlord[i].gst ) ?
                                true : false}
                              label="Upload GST Certificate"
                              placeHolder="Upload GST Certificate"
                              handleChange={(e) => handleChangeCommonFile(e, i)}
                              name={"gst"}
                              fileName={preData[`gst${i}`]}
                              href={partLabel.landlord[i].gst || preData.landlord[i].gst }
                              />
                          </Grid>
                            }

                         { 
                         ((partLabel.landlord[i].ifscCode === preData.landlord[i].ifscCode && partLabel.landlord[i].ifscCode !== "" ) || preData.landlord[i].ifscCode !== "")
                         && 
                          <Grid item xs={6}>
                            <DocumentUpload
                             uploaded={(preData.landlord[i].cheque !== "" &&
                             partLabel.landlord[i].ifscCode === preData.landlord[i].ifscCode
                             ) ? true :
                             (partLabel.landlord[i].cheque !== preData.landlord[i].cheque ) ?
                               true : false}
                              label="Upload Cancel Cheque"
                              name={"cheque"}
                              fileName={preData[`cheque${i}`]}
                              placeHolder="Upload Cancel Cheque"
                              handleChange={(e) => handleChangeCommonFile(e, i)}
                              href={partLabel.landlord[i].cheque || preData.landlord[i].cheque}
                            />
                          </Grid>
}
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
                      uploaded={preData.draft_agreement && true}
                      error={formError.draft_agreement}
                      placeHolder="Upload Draft Agreement"
                      fileName={preData.draft_agreement_name}
                      handleChange={handleChangeFile}
                      name={"draft_agreement"}
                      href={ partLabel.draft_agreement}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <DocumentUpload
                      label="Upload Electricity Bill"
                      uploaded={preData.electricity_bill && true}
                      error={formError.electricatiy_bill}
                      placeHolder={"Upload Electricity Bill"}
                      handleChange={handleChangeFile}
                      fileName={preData.electricity_bill_name}
                      name={"electricity_bill"}
                      href={ partLabel.electricity_bill}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <DocumentUpload
                      label="Upload POA (If Applicable)"
                      placeHolder="Upload POA"
                      error={formError.poa}
                      uploaded={preData.poa && true}
                      fileName={preData.poa_name}
                      handleChange={handleChangeFile}
                      name={"poa"}
                      href={ partLabel.poa}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <DocumentUpload
                      label="Upload Maintaince Bill"
                      uploaded={preData.maintaince_bill && true}
                      placeHolder={"Upload Maintaince Bill"}
                      error={formError.maintaince_bill}
                      handleChange={handleChangeFile}
                      fileName={preData.maintaince_bill_name}
                      name={"maintaince_bill"}
                      href={ partLabel.maintaince_bill}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <DocumentUpload
                      label="Upload Property Tax Receipt"
                      uploaded={preData.tax_receipt && true}
                      placeHolder={"Upload Property Tax Receipt"}
                      handleChange={handleChangeFile}
                      fileName={preData.tax_receipt_name}
                      error={formError.tax_receipt}
                      name={"tax_receipt"}
                      href={ partLabel.tax_receipt}
                    />
                  </Grid>
                  {console.log(preData.landlord.length)}
                  { (preData.landlord && preData.landlord.length > 1)&&
                    <Grid item xs={6}>
                    <DocumentUpload
                      uploaded={preData.noc && true}
                      label="Upload NOC (If Mutiple Oweners)"
                      error={formError.noc}
                      placeHolder="NOC"
                      fileName={preData.noc_name}
                      handleChange={handleChangeFile}
                      name={"noc"}
                      href={ partLabel.noc}
                      />
                  </Grid>
                    }

<Grid item xs={6}>
                    <DocumentUpload
                      label="Property Picture"
                      uploaded={preData.property_pic && true}
                      placeHolder={"Upload Property Picture"}
                      handleChange={handleChangeFile}
                      fileName={preData.property_pic_name}
                      error={formError.property_pic}
                      name={"property_pic"}
                      href={preData.property_pic}
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
                      helperText = {partLabel.assets}
                      placeholder="Landlord Assets *"
                      value={preData.assets}
                      name={"assets"}
                      onChange={handleCommonChange}
                    />

                  </Grid>
                </Grid>

                {/* {preData.remark.length > 0 && (
                <Grid
                  item
                  container
                  xs={10}
                  sx={{ mt: 5 }}
                >
                    <DataFieldStyle
                      field={"Remark !"}
                      value={preData.remark}
                    />
                </Grid>
              )} */}

{/* New Renewal Disposite Form */}
<Grid
                  container
                  sx={{ mt: "25px", mb: "25px"}}
                  spacing={isSmall ? 2 : 4}
                  component={"form"}
                  onSubmit={handleSubmit}
                  method="post"
                >
                  <Grid item xs={12}>
                    <Typography
                      variant="body1"
                      color="var(--main-color)"
                      fontSize="25px"
                      lineHeight="28px"
                      fontWeight="600"
                      // my="20px"
                    >
                       Renewal Adjustments Form
                    </Typography>
                  </Grid>
                  <Grid item xs={12} >
                  <TextFieldWrapper
                    label="Deposit Amount (Paid)"
                    placeHolder="Deposit Amount"
                    // onBlur={(e) => handleOnBlur(e, i)}
                    // error = {errorObj.leeseName}
                    name="depositedAmount"
                    disabled={true}
                    value={renewal.deposited}
                    onChange={(e) => handleChange(e)}
                  />
                  </Grid>

                  {/* unpaid section */}
                  <Grid item xs={12} >
                  <Grid coantiner sx = {{display : 'flex',gap : '2rem', flexDirection : 'column'}}>
                <Grid item xs = {12} >
                  <Typography variant = 'h6' color = {"primary"} sx = {{fontWeight : 700}}>Unpaid Months</Typography>
                </Grid>
                {
                  upaid.map((row)=><Grid item xs = {12} sx = {{display : 'flex',gap : '2rem'}}>
                  <TextFieldWrapper
                    label={"Rent Month (Unpaid)"}
                    placeHolder="Deposit Amount"
                    disabled={true}
                    value={month[new Date(row.rent_date).getUTCMonth()] + "-" + new Date(row.rent_date).getFullYear()}
                    onChange={(e) => handleChange(e)}
                  />
                  <TextFieldWrapper
                    label="Rent Amount"
                    disabled={true}
                    value={parseInt(row.rent_amount)}
                    onChange={(e) => handleChange(e)}
                  />
                  <TextFieldWrapper
                    label="Status"
                    disabled={true}
                    value={row.status}
                    onChange={(e) => handleChange(e)}
                  />
                  </Grid>)
                }
                  </Grid>
               </Grid>

                  {/* unpaid section ends */}
                  <Grid item xs={12} >
                  <TextFieldWrapper
                    label="Balance Deposit Amount"
                    placeHolder="Balance Deposit Amount"
                    // onBlur={(e) => handleOnBlur(e, i)}
                    // error = {errorObj.leeseName}
                    name="depositedAmount"
                    disabled={true}
                    value={renewal.balance_amount}
                    onChange={(e) => handleChange(e)}
                  />
                  </Grid>
                  <Grid item xs={12} >
                  <TextFieldWrapper
                    label="New Deposit Amount"
                    placeHolder="New Deposit Amount"
                    name="new_deposit"
                    // disabled={true}
                    required = {true}
                    value={renewal.new_deposit}
                    onChange={(e) => handleRenewal(e)}
                  />
                  </Grid>
                  <Grid item xs={12} >
                  <TextFieldWrapper
                    label="Balance Deposit Payable/Receivable"
                    placeHolder="Balance Deposit Payable/Receivable"
                    // onBlur={(e) => handleOnBlur(e, i)}
                    // error = {errorObj.leeseName}
                    name="depositedAmount"
                    disabled={true}
                    value={renewal.receivable}
                    onChange={(e) => handleChange(e)}
                  />
                  </Grid>
                
                </Grid>
{/* New Renewal Disposite Form ends */}


                {/* Button Start from here */}
                <Grid
                  container
                  sx={{ justifyContent: "center", mt: 2 }}
                  spacing={4}
                >
                  <Grid item md={4} xs={6}>
                    <Button
                      onClick={handleSubmit}
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
    </>}
      {/* alert for submit form */}
      
    </>
  );
}

export default EditAgreement;