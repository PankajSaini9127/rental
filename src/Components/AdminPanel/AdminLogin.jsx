import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginComponent from "../StyleComponents/LoginComponent";
import { LoginAPI } from "../../Services/Services";

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


    // validate
    function validate (data){
      if(data.success){
        data.result[0].role = JSON.parse(data.result[0].role)
        if(data.result[0].role.includes("Admin") && data.result[0].password === formValue.password){
        
          setErr({open:false});
          navigate(`/userDashboard`)
          

         }else{
          setErr({open:true,type:'error', msg:"Invalid Password !"});
         }
      }
      if(!data.success){
        setErr({open:true,type:'error', msg:data.message});
      }
    }

 //get Data   
    const Get_DATA = async()=>{
      const user = await LoginAPI({email:formValue.username})
      const data = user.data;
      
      validate(data)
       
    }
 
    

    const handleSubmit = async (e) => {
          
      e.preventDefault();
      Get_DATA()
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
