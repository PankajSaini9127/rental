import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginComponent from "../StyleComponents/LoginComponent";

function OperationsLogin() {
  const navigate = useNavigate();

  const [formValue, setFormValue] = useState({ username: "", password: "" });
  const [err, setErr] = useState(false);

  const data ={ username: "operations", password: "operations" };

  const handleChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formValue.password === data.password) {
      setErr(false);
      navigate(`/operationsListing`);
    } else {
      setErr(true);
    }
  };

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

export default OperationsLogin;
