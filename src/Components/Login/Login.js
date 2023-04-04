import React, { useState } from "react";

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

  //text Field onchnage
  const handleChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };
  const { role } = formValue;

  const Get_DATA = async (dispatch) => {
    if (role === "Super Admin") {
      try {
        const superAdmin = await super_admin_Login(formValue);
        // console.log(superAdmin)
        if (superAdmin.data.success) {
          const super_admin_auth = superAdmin.data.response[0];
          dispatch(
            setAuth({
              name: super_admin_auth.name,
              role: "Super Admin",
              id: super_admin_auth.id,
            })
          );
          navigate("/super-admin-dashboard");
        } else {
          dispatch(
            setAlert({
              variant: "error",
              open: true,
              message: superAdmin.data.msg,
            })
          );
        }
      } catch (error) {
        dispatch(
          setAlert({
            variant: "error",
            open: true,
            message: "Something Went Wrong, Please Try Again !",
          })
        );
      }
    } else {
      try {
        const user = await LoginAPI(formValue);
        const data = user.data;
        console.log(data);

        if (data.success) {
          const login_user = data.result[0];
          if (login_user.is_auth === 1 || role === "Admin") {
            if (role === "senior_manager") {
              dispatch(setAlert({ open: false, variant: "", message: ''}));
              dispatch(
                setAuth({
                  name: data.result[0].name,
                  role: "Sr Manager",
                  id: data.result[0].id,
                })
              );
              navigate(`/srManagerDashboard`);
            }else
            if (role === "manager") {
              dispatch(setAlert({ open: false, variant: "", message: ''}));
              dispatch(
                setAuth({
                  name: data.result[0].name,
                  role: "Manager",
                  id: data.result[0].id,
                })
              );
              navigate(`/dashboard`);
            }  else if (role === "bhu") {
              dispatch(setAlert({ open: false, variant: "", message: ''}));
              dispatch(
                setAuth({
                  name: data.result[0].name,
                  role: "BHU",
                  id: data.result[0].id,
                })
              );
              navigate(`/BHUDashboard`);
            } else if (role === "admin") {
              dispatch(setAlert({ open: false, variant: "", message: ''}));
              dispatch(
                setAuth({
                  name: data.result[0].name,
                  role: "Admin",
                  id: data.result[0].id,
                })
              );
              navigate(`/userDashboard`);
            } else if (role === "operations") {
              dispatch(setAlert({ open: false, variant: "", message: ''}));
              dispatch(
                setAuth({
                  name: data.result[0].name,
                  role: "Operations",
                  id: data.result[0].id,
                })
              );
              // navigate(`/operationsListing`)
              navigate(`/operationsDashboard`);
            }
          } else {
            navigate(`/newPassword/${data.result[0].email}`);
          }

        
        } else {
          dispatch(setAlert({ open: true, variant: "error", message: data.message }));
        }
      } catch (error) {
        dispatch(
          setAlert({
            variant: "error",
            open: true,
            message: "Something Went Wrong, Please Try Again !",
          })
        );
      }
    }
  };

  //on form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    Get_DATA(dispatch);
  };
  return (
    <>
      <LoginComponent
        buttons={true}
        title="Hello,"
        discription={"Enter Your Details For Further Process"}
        handleSubmit={handleSubmit}
        formValue={formValue}
        handleChange={handleChange}
      />
    </>
  );
}
