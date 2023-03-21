import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginComponent from "../StyleComponents/LoginComponent";

import axios from 'axios'
import { AuthContext } from "../../App";
import { ADD_AUTH } from "../ContextAPI/Action";

function SrManagerLogin() {
  const navigate = useNavigate();

  const {dispatch} = useContext(AuthContext);

  const [formValue, setFormValue] = useState({ username: "", password: "" });
  const [err, setErr] = useState({
    open:false,
    type:'',
    msg:""
   });

  const data ={ username: "srmanager", password: "srmanager" };

  const handleChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    getData()

    // if (formValue.password === data.password) {
    //   setErr(false);
    //   navigate(`/srManagerDashboard`);
    // } else {
    //   setErr(true);
    // }
  };

  const getData = async()=>{
    const user = await axios.post('http://localhost:8080/api/auth/login',{email:formValue.username})
    const data = user.data;

    if(data.success){
      if(data.result[0].role === "Senior Manager"){
        if(data.result[0].password === formValue.password){
          setErr({open:false})

          dispatch(ADD_AUTH(data.result[0]))

          navigate(`/srManagerDashboard`)
  
         }else{
          setErr({open:true,type:'error', msg:"Invalid Password !"});
         }
      }else{
        setErr({open:true,type:'warning', msg:"User Not Found!"});
      }
      
    }else{
      setErr({open:true,type:'error', msg:data.message});
    }

  }

  return (
    <>
      <LoginComponent
        title="Login"
        subTitle={"Rental Portal"}
        data={data}
        handleSubmit={handleSubmit}
        err={err}
        formValue={formValue}
        handleChange={handleChange}
      />
    </>
  );
}

export default SrManagerLogin;
