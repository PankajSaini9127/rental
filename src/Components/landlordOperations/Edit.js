import React, { useEffect, useState } from 'react';
import { Typography, Button } from '@mui/material';
import { Box } from '@mui/system';
import { useSelector } from 'react-redux';
import FinanceHam from "../FinancePanel/FinanceHamburger";
import ManagerHam from "../Manager/HamburgerManager";
import SrMHam from "../SrManager/SRMHAmburger";
import OPHam from "../Operations/OperationsHamburger";
import { TextFieldWrapper, DocumentUpload } from '../StyledComponent';
import { getBankName, updateLandlord,uploadDoc } from '../../Services/Services';
import { setAlert, setForm } from "../../store/action/action";
import { useDispatch } from "react-redux";

// state


const Edit = (props) => {
    const {auth : {role},form} = useSelector(state=>state) 

    const dispatch = useDispatch()
    const [data,setData] = useState({})
    const [old,setOldData] = useState({})
    
    useEffect(()=>{
      setPreData()
    },[])

    function setPreData(){
      if(form)
      {
        console.log(form)
        setOldData(form)
        delete form.gst
        delete form.cheque
        setData(form)
      }
    }

    const [formError,setFormError] =useState({})


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

    const handleValue = (e)=>{
      let error = { state: false, message: null };
      // console.log(e.target.name, e.target.value);
      switch (e.target.name) {
      
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
        // console.log(e.target.name);
        getBankDetails(e.target.value);
      }
      if (!error.state) {
       setData(old=>({
        ...old,
        [e.target.name] : e.target.value
       }))
      }
  
    }

      // use on onBlur for uncommon fields
  function handleOnBlur(e) {
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

    if (error.message) {
      setFormError((old) => ({
        ...old,
            [e.target.name]: error.message,
      }));
    } 
    else{
      setFormError((old) => ({
        ...old,
            [e.target.name]: "",
      }));
    }
  }

  function validate(){
    const feilds = [
          ,"mobileNo" 
          ,"alternateMobile" 
          ,"email" 
          ,"bankName" 
          ,"benificiaryName" 
          ,"accountNo" 
          ,"ifscCode" 
    ]

    let check = feilds.map(feild=>{
      if(!data[feild])
      {
        setFormError(old=>({...old,[feild] : "Feild is required"}))
        return true
      }
      return false
    })

    // for cheque upload
    if((data.benificiaryName !== old.benificiaryName || 
      data.bankName !== old.bankName || 
      data.ifscCode !== old.ifscCode ||
      data.accountNo !== old.accountNo) && !data.cheque)
      {
        check.push(true)
        setFormError(old=>({...old,cheque : "Document Required"}))
      }
      else setFormError(old=>({...old,cheque : ""}))
    // for gst upload
      if(data.gstNo !== old.gstNo && !data.gst )
    {
      check.push(true)
      setFormError(old=>({...old,gst : "Document Required"}))  
    }
    else 
        setFormError(old=>({...old,gst : ""}))

    console.log(formError)

    if(check.includes(true))
    {
      return false
    }
    else return true
  }


// Upload Document *
async function handleChangeFile(e) {
  const FD = new FormData();
  console.log(e.target.files[0]);
  console.log(e.target.name);

  FD.append("photo", e.target.files[0]);
  let response = await uploadDoc(FD);
  // console.log(data)
  if (response.status === 200) {
    console.log(e.target.name);
    // console.log(formError);
    // setFormError((old) => ({
    //   ...old,
    //   [e.target.name + "_name"]: "",
    //   [e.target.name]: "",
    // }));

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



    // on Submit
   async function handleSubmit  (e){
      try{
        e.preventDefault()
        const {
          id,
          gstNo,
          mobileNo,
          alternateMobile,
          email,
          bankName,
          benificiaryName,
          accountNo,
          ifscCode,
          cheque,
          gst
        } = data;

        let formData = { id,
          gstNo,
          mobileNo,
          alternateMobile,
          email,
          bankName,
          benificiaryName,
          accountNo,
          ifscCode}

        if (data.gst) 
        {
          formData = {...formData,gst : data.gst}
        }
        if(data.cheque)
        {
          formData = {...formData,cheque : data.cheque}
        }


        if(!validate())
        {
          return false
        }

        let res = await updateLandlord(formData)

          if(res.status === 200)
          {
            dispatch(setAlert({
              open : true,
              variant : 'success',
              message : 'Landlord Updated Successfully.'
            }))
            props.history(-1)
          }
          else{
            dispatch(setAlert({
              open : true,
              variant : 'error',
              message : 'Erro Occured !!!'
            }))
          }
      }
      catch(error){
          console.log(error)
      }
      e.preventDefault()
    }


  async function getBankDetails(data) {
    try {
      console.log(data);
      let res = await getBankName(data);
      if (res.status === 200) {
        setData((old) => ({
                ...old,
                bankName: res.data.BANK,
                branchName: res.data.BRANCH,
        }));
      }
    } catch (err) {
      setData(old => ({
        ...old,
        bankName: "Not Found",
         branchName: "" }))
    }}

    return (
        <Box sx={style.container}>
      <Box>
        {/* Hamburger */}
        {role.includes("Finance") && <FinanceHam />}
        {role.includes("Manager") && <ManagerHam />}
        {role.includes("Senior_Manager") && <SrMHam />}
        {role.includes("Operations") && <OPHam />}
        {/* Hamburger ends */}
      </Box>

      <Box sx={style.contentContainer}>
        {/* Header  */}
        <Box sx={style.header}>
          <Typography sx={{ fontWeight: 700 }} color="primary" variant="h4">
            Rental Management System
          </Typography>
          <Typography sx={{ fontWeight: 700 }} variant="body1">
            {role}
          </Typography>
        </Box>
        {/* Header ends */}
        {/* module Name */}
        <Box>
          <Typography sx={{ fontWeight: 700 }} variant="h6">
            Edit Landlord
          </Typography>
        </Box>
        {/* module Name ends */}
        {/* Edit Starts from here */}
        <Box sx={style.fromContainer} component = {'form'} method = 'post' onSubmit = {handleSubmit}>
        <Box sx = {style.item}>
        <TextFieldWrapper
                    label="Name Of Lessor"
                    value = {data.name}
                    required={true}
                    disabled={true}
                    fullWidth
                  />
       </Box>
        <Box sx = {style.item}>
        <TextFieldWrapper
                    label="Aadhaar Number"
                    required={true}
                    disabled={true}
                    fullWidth
                    value = {data.aadharNo}
                    />
                    </Box>
        <Box sx = {style.item}>
        <TextFieldWrapper
                    label="PAN Number"
                    required={true}
                    disabled={true}
                    fullWidth
                    name="panNo"
                    value={data.panNo || ""}
                    // error={formError.city}
                    // onChange={handleCommonChange}
                    />
                    </Box>
        <Box sx = {style.item}>
        <TextFieldWrapper
                    label="GST Number"
                    // required={true}
                    fullWidth
                    name="gstNo"
                    error = {formError.gstNo}
                    value={data.gstNo || ""}
                    onChange={handleValue}
                            onBlur={(e) => handleOnBlur(e)}
                            // error={formError.city}
                    />
                    </Box>
      
        <Box sx = {style.item}>
        <TextFieldWrapper
                    label="Mobile Number"
                    required={true}
                    fullWidth
                    error = {formError.mobileNo}
                    name="mobileNo"
                    value={data.mobileNo || ""}
                            onBlur={(e) => handleOnBlur(e)}
                            // error={formError.city}
                    onChange={handleValue}
                    />
                    </Box>
        <Box sx = {style.item}>
        <TextFieldWrapper
                    label="Alternate Number"
                    required={true}
                    fullWidth
                    error = {formError.alternateMobile}
                    name="alternateMobile"
                            onBlur={(e) => handleOnBlur(e)}
                            value={data.alternateMobile || ""}
                    // error={formError.city}
                    onChange={handleValue}
                    />
          </Box>
        <Box sx = {style.item}>
        <TextFieldWrapper
                    label="Percentage Share"
                    required={true}
                    fullWidth
                            onBlur={(e) => handleOnBlur(e)}
                            name="percentage"
                    error = {formError.percentage}
                    value={data.percentage || ""}
                    // error={formError.city}
                    onChange={handleValue}
                    />
                    </Box>
        <Box sx = {style.item}>
        <TextFieldWrapper
                    label="Deposit UTR Number"
                    required={true}
                    disabled={true}
                    fullWidth
                    value={data.utr_number}
                    // error={formError.city}
                    // onChange={handleCommonChange}
                    />
                    </Box>
        <Box sx = {style.item}>
        <TextFieldWrapper
                    label="Deposit Payment Date"
                    required={true}
                    disabled={true}
                    fullWidth
                    // value={data.city || ""}
                    // error={formError.city}
                    // onChange={handleCommonChange}
                    />
                    </Box>
        <Box sx = {style.item}>
        <TextFieldWrapper
                    label="Beneficiary Name"
                    required={true}
                    // disabled={true}
                            onBlur={(e) => handleOnBlur(e)}
                            fullWidth
                    name="benificiaryName"
                    error = {formError.benificiaryName}
                    value={data.benificiaryName || ""}
                    // error={formError.city}
                    onChange={handleValue}
                    />
                    </Box>
        <Box sx = {style.item}>
        <TextFieldWrapper
                    label="Bank A/C Number"
                    required={true}
                    // disabled={true}
                            onBlur={(e) => handleOnBlur(e)}
                            fullWidth
                    name="accountNo"
                    error = {formError.accountNo}
                    value={data.accountNo || ""}
                    // error={formError.city}
                    onChange={handleValue}
                    />
                    </Box>
                    <Box sx = {style.item}>
        <TextFieldWrapper
                    label="Bank IFSC"
                    required={true}
                    // disabled={true}
                    fullWidth
                            onBlur={(e) => handleOnBlur(e)}
                            name="ifscCode"
                    error = {formError.ifscCode}
                    value={data.ifscCode || ""}
                    // error={formError.city}
                    onChange={handleValue}
                    />
                    </Box>
        <Box sx = {style.item}>
        <TextFieldWrapper
                    label="Bank Name"
                    required={true}
                    disabled={true}
                            onBlur={(e) => handleOnBlur(e)}
                            fullWidth
                    error = {formError.bankName}
                    name="bankName"
                    value={data.bankName || ""}
                    />
                    </Box>
                    { data.gstNo !== old.gstNo &&
          <Box sx = {style.item}>
        <DocumentUpload
                              uploaded={data.gst ? true : false}
                              label="Upload GST Certificate"
                              placeHolder="Upload GST Certificate"
                              handleChange={handleChangeFile}
                              name={"gst"}
                             error={formError.gst}
                              fileName={data[`gst_name`]}
                              href={data.gst}
                              />
                    </Box>
      }
                    { (
                      data.benificiaryName !== old.benificiaryName || 
                      data.bankName !== old.bankName || 
                      data.ifscCode !== old.ifscCode ||
                      data.accountNo !== old.accountNo 
                    ) &&
          <Box sx = {style.item}>
        <DocumentUpload
                              placeHolder="Upload Cancel Cheque"
                              uploaded={data.cheque ? true : false}
                              label="Upload Cancel Cheque"
                              handleChange={handleChangeFile}
                              name={"cheque"}
                      error={formError.cheque}

                              fileName={data[`cheque`]}
                              href={data.cheque}
                              />
                    </Box>
      }
        
        <Box sx = {style.button} mt = {5}>
          <Button type='submit' sx = {style.btn}  variant = 'contained'>
            Submit
          </Button>
          <Button onClick={()=>{
            props.history(-1)
          }} sx = {style.btn}  variant = 'outlined'>
            Cancel
          </Button>
          </Box>

        </Box>

        {/* Edit Ends from here */}
      </Box>
    </Box>
    );
}

// style Css (Inline CSS part here)
const style = {
    container: {
      display: "flex",
      width: "100%",
      gap: "1rem",
      padding: "0.3%",
    },
    contentContainer: {
      flex: 1,
      justifyContent: "space-between",
      padding: "1rem",
      gap: "2rem",
      display: "flex",
      flexDirection: "column",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
    },
    fromContainer: {
      display: "flex",
      width : '100%',
      gap : '2rem',
      flexWrap : 'wrap',
      // justifyContent: "space-evenly",
    },
    item: {
      minWidth : '350px',
    },
    button: {
      display : 'flex',
      gap : '2rem',
      width  : '100%',
      justifyContent : 'center'
    },
    btn : {
      padding : '1% 2%',
      borderRadius : '20px'
    }
  };
export default Edit;
