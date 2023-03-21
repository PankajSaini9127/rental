import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginComponent from "../StyleComponents/LoginComponent";
import axios, {Axios} from 'axios'

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

    const Get_DATA = async()=>{
      const user = await axios.post('http://localhost:8080/api/auth/login',{email:formValue.username})
      const data = user.data;
      data.result[0].role = JSON.parse(data.result[0].role)
      console.log(data.result[0].status)
      if(data.success){
        if(data.result[0].status === "Active"){
        if(data.result[0].role === "Admin" && data.result[0].password === formValue.password){
          setErr({open:false});
          navigate(`/userDashboard`)
          

         }else{
          setErr({open:true,type:'error', msg:"Invalid Password !"});
         }
        }else{
          setErr({open:true,type:'error', msg:"User Inactive !"})
        }
      }else{
        setErr({open:true,type:'error', msg:data.message});
      }
       
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
