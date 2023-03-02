import React, { useEffect, useState } from "react";
import axios from 'axios'

import LoginComponent from "./StyleComponents/LoginComponent";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const data = { username: "bitwit", password: "Bitwit" };

  const navigate = useNavigate();

// api call
// const getData = async (username)=>{
  //  const response = await axios.post('http://localhost:8080/',{"username": username})
  //   const data = response.data[0]
  //   return data
  // }

  const [formValue, setFormValue] = useState({ username: "", password: "" });

    const [err, setErr] = useState(false);
  


    const handleChange = (e) => {
        setFormValue({
          ...formValue,
          [e.target.name]: e.target.value,
        });
      };
  
  const handleSubmit = async (e) => {
    
    e.preventDefault();
    
    // const data = await getData(formValue.username)

    if (
      formValue.password === data.password
    ) {
      setErr(false);
      navigate(`dashboard`);
    } else {
      setErr(true);
    }


  };
  return (
    <>
      <LoginComponent
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
