import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginComponent from "../StyleComponents/LoginComponent";

const data = { username: "admin", password: "Admin" };

function AdminLogin() {

  const [formValue, setFormValue] = useState({ username: "", password: "" });

  const [err, setErr] = useState(false);

  const navigate = useNavigate()



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
        navigate(`/userDashboard`);
      } else {
        setErr(true);
      }
  
  
    };
  return (
    <>
      <LoginComponent
        title="Login"
        subTitle={"Admin Portal"}
        data={data}
        handleSubmit={handleSubmit}
        err ={err}
        formValue={formValue}
        handleChange={handleChange}
      />
    </>
  );
}

export default AdminLogin;
