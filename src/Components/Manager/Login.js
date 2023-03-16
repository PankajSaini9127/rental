import React, { useState } from "react";

import LoginComponent from "../StyleComponents/LoginComponent";
import { useNavigate } from "react-router-dom";

import axios from 'axios';

export default function Login() {
  const data = { username: "manager", password: "manager" };

  const navigate = useNavigate();

  const [formValue, setFormValue] = useState({ username: "", password: "" });
 const [err, setErr] = useState(false);
  


 //text Field onchnage 
const handleChange = (e) => {
        setFormValue({
          ...formValue,
          [e.target.name]: e.target.value,
        });
      };
  

      const Get_DATA = async()=>{
        const user = await axios.post('http://localhost:8080/api/admin/login',{email:formValue.username})
         if(user.data[0].role === "Manager" && user.data[0].password === formValue.password){
          setErr(false);
            navigate(`/dashboard`);
         }else{
          setErr(true);
         }
      }

      //on form Submit
  const handleSubmit = async (e) => {
    
    e.preventDefault();
    Get_DATA()
    
    // if (
    //   formValue.password === data.password
    // ) {
    //   setErr(false);
    //   navigate(`/dashboard`);
    // } else {
    //   setErr(true);
    // }


  };
  return (
    <>
      <LoginComponent
      buttons={true}
        title="Hello,"
        discription={"Enter Your Details For Further Process"}
        data={data}
        handleSubmit={handleSubmit}
        err ={err}
        formValue={formValue}
        handleChange={handleChange}
      />
    </>
  );
}
