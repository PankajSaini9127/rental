import React, { useContext, useState } from "react";

import LoginComponent from "../StyleComponents/LoginComponent";
import { useNavigate } from "react-router-dom";

import axios from 'axios';
import { AuthContext } from "../../App";
import { ADD_AUTH } from "../ContextAPI/Action";
import { LoginAPI } from "../../Services/Services";

export default function Login() {
  const data = { username: "manager", password: "manager" };

  const { dispatch } = useContext(AuthContext)

  const navigate = useNavigate();

  const [formValue, setFormValue] = useState({ username: "", password: "", role: "" });
  const [err, setErr] = useState({
    open: false,
    type: '',
    msg: ""
  });



  //text Field onchnage 
  const handleChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };
  const { role } = formValue;


  const Get_DATA = async () => {
    const user = await LoginAPI({ email: formValue.username })
    const data = user.data;

    if (data.success) {
      if (data.result[0].password === formValue.password) {
        data.result[0].role = JSON.parse(data.result[0].role)
        let userRole = data.result[0].role
        console.log(userRole)
       if(userRole.includes(role)){
        if (data.result[0].is_auth == 1 || role === "Admin") {
          

          if (role === "Manager") {
            setErr({ open: false });
            dispatch(ADD_AUTH(data.result[0]))
            navigate(`/dashboard`)
          }
          else
            if (role === "Senior Manager") {
              setErr({ open: false });
              dispatch(ADD_AUTH(data.result[0]))
              navigate(`/srManagerDashboard`)
            }
            else
              if (role === "Admin") {
                setErr({ open: false });
                dispatch(ADD_AUTH(data.result[0]))
                navigate(`/userDashboard`)
              } else if (role === "Operations") {
                setErr({ open: false });
                dispatch(ADD_AUTH(data.result[0]))
                navigate(`/operationsListing`)
              }
               else {
                setErr({ open: true, type: 'error', msg: "Role Not Valid !" });
              }
        } else {
            navigate(`/newPassword/${data.result[0].email}`)
        }

        }else{
          setErr({ open: true, type: 'error', msg: "Role Not Valid !" });
        }
       } else {
        setErr({ open: true, type: 'error', msg: "Invalid Password !" });
      }


    } else {
      setErr({ open: true, type: 'error', msg: data.message });
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
        err={err}
        formValue={formValue}
        handleChange={handleChange}
      />
    </>
  );
}
