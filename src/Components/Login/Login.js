import React, {useState } from "react";

import LoginComponent from "./LoginComponent";
import { useNavigate } from "react-router-dom";

import { LoginAPI, super_admin_Login } from "../../Services/Services";
import { setAlert, setAuth } from "../../store/action/action";
import { useDispatch } from "react-redux";

export default function Login() {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
    role: "",
  });
  const [err, setErr] = useState({
    open: false,
    type: "",
    msg: "",
  });

  //text Field onchnage
  const handleChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };
  const { role } = formValue;

  const Get_DATA = async (dispatch) => {
    if(role === "Super Admin"){
      try{
        const superAdmin = await super_admin_Login(formValue)
        // console.log(superAdmin)
        if(superAdmin.data.success){
             const super_admin_auth  = superAdmin.data.response[0];
             dispatch(
              setAuth({
                name: super_admin_auth.name,
                role: "Super Admin",
                id: super_admin_auth.id,
              })
              );
              navigate("/super-admin-dashboard")
        }else{
         dispatch(setAlert({variant:"error",open:true,message:superAdmin.data.msg}))
        }
      }catch(error){
        dispatch(setAlert({variant:"error",open:true,message:'Something Went Wrong, Please Try Again !'}))
      }
       
    }else{
    const user = await LoginAPI({ email: formValue.email });
    const data = user.data;
    console.log(data);

    if (data.success) {
      if (data.result[0].password === formValue.password) {
        data.result[0].role = JSON.parse(data.result[0].role);
        let userRole = data.result[0].role;
        console.log(userRole);
        if (userRole.includes(role)) {
          if (data.result[0].is_auth == 1 || role === "Admin") {
            if (role === "Manager") {
              setErr({ open: false });
              dispatch(
                setAuth({
                  name: data.result[0].name,
                  role: "Manager",
                  id: data.result[0].id,
                })
              );
              navigate(`/dashboard`);
            } else if (role === "Senior Manager") {
              setErr({ open: false });
              dispatch(
                setAuth({
                  name: data.result[0].name,
                  role: "Sr Manager",
                  id: data.result[0].id,
                })
              );
              navigate(`/srManagerDashboard`);
            } else if (role === "BHU") {
              setErr({ open: false });
              dispatch(
                setAuth({
                  name: data.result[0].name,
                  role: "BHU",
                  id: data.result[0].id,
                })
              );
              navigate(`/BHUDashboard`);
            } else if (role === "Admin") {
              setErr({ open: false });
              dispatch(
                setAuth({
                  name: data.result[0].name,
                  role: "Admin",
                  id: data.result[0].id,
                })
              );
              navigate(`/userDashboard`);
            } else if (role === "Operations") {
              setErr({ open: false });
              dispatch(
                setAuth({
                  name: data.result[0].name,
                  role: "Operations",
                  id: data.result[0].id,
                })
              );
              // navigate(`/operationsListing`)
              navigate(`/operationsDashboard`);
            } else {
              setErr({ open: true, type: "error", msg: "Role Not Valid !" });
            }
          } else {
            navigate(`/newPassword/${data.result[0].email}`);
          }
        } else {
          setErr({ open: true, type: "error", msg: "Role Not Valid !" });
        }
      } else {
        setErr({ open: true, type: "error", msg: "Invalid Password !" });
      }
    } else {
      setErr({ open: true, type: "error", msg: data.message });
    }
  }
  };

  //on form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    Get_DATA(dispatch);

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
        handleSubmit={handleSubmit}
        err={err}
        formValue={formValue}
        handleChange={handleChange}
      />
    </>
  );
}
