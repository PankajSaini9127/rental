import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HamburgerMenu from "../HamburgerMenu";

import axios from 'axios'

import ListingComponent from "../StyleComponents/ListingComponent";
import AdminHamburgerMenu from "./AdminHamburgerMenu";
import UserManagementTable from "./UserManagementTable";

const options = ["Senior Manager", "Manager", "Operations","BHU","Finance"];




const managerRows = [
  {
    id: 1,
    status: "Pending",
    code: 123,
    name: "Pankaj",
    role: "Manager",
    password: "Password",
    email: "john@test.com",
    contactno: 1234567890,
    supervisor:'Nilesh'
  },
  {
    id: 2,
    status: "Active",
    code: 123,
    name: "John Doe",
    role: "Manager",
    password: "Password",
    email: "john@test.com",
    contactno: 1234567890,
    supervisor:'Yashwant'
  },
  {
    id: 3,
    status: "Pending",
    code: 123,
    name: "John Doe",
    role: "Manager",
    password: "Password",
    email: "john@test.com",
    contactno: 1234567890,
    supervisor:'Pankaj'
  },
  {
    id: 4,
    status: "Inactive",
    code: 123,
    name: "John Doe",
    role: "Manager",
    password: "Password",
    email: "john@test.com",
    contactno: 1234567890,
    supervisor:'Nilesh'
  },
  {
    id: 5,
    status: "Pending",
    code: 123,
    name: "John Doe",
    role: "Manager",
    password: "Password",
    email: "john@test.com",
    contactno: 1234567890,
    supervisor:'Nilesh'
  },
  {
    id: 6,
    status: "Pending",
    code: 123,
    name: "John Doe",
    role: "Manager",
    password: "Password",
    email: "john@test.com",
    contactno: 1234567890,
    supervisor:'Nilesh'
  },
  {
    id: 7,
    status: "Pending",
    code: 123,
    name: "John Doe",
    role: "Manager",
    password: "Password",
    email: "john@test.com",
    contactno: 1234567890,
    supervisor:'Nilesh'
  },
  {
    id: 8,
    status: "Pending",
    code: 123,
    name: "John Doe",
    role: "Manager",
    password: "Password",
    email: "john@test.com",
    contactno: 1234567890,
    supervisor:'Nilesh'
  },
  {
    id: 9,
    status: "Pending",
    code: 123,
    name: "John Doe",
    role: "Manager",
    password: "Password",
    email: "john@test.com",
    contactno: 1234567890,
    supervisor:'Nilesh'
  },
  
];

const srManagerRows = [
  {
    id: 1,
    status: "Pending",
    code: 123,
    name: "John",
    role: "Sr Manager",
    password: "Password",
    email: "john@test.com",
    contactno: 1234567890,
    supervisor:'Nilesh'
  },
  {
    id: 2,
    status: "Active",
    code: 123,
    name: "John Doe",
    role: "Sr Manager",
    password: "Password",
    email: "john@test.com",
    contactno: 1234567890,
    supervisor:'Yashwant'
  },
  {
    id: 3,
    status: "Pending",
    code: 123,
    name: "John Doe",
    role: "Sr Manager",
    password: "Password",
    email: "john@test.com",
    contactno: 1234567890,
    supervisor:'Pankaj'
  },
  {
    id: 4,
    status: "Inactive",
    code: 123,
    name: "John Doe",
    role: "Sr Manager",
    password: "Password",
    email: "john@test.com",
    contactno: 1234567890,
    supervisor:'Nilesh'
  },
  {
    id: 5,
    status: "Pending",
    code: 123,
    name: "John Doe",
    role: "Sr Manager",
    password: "Password",
    email: "john@test.com",
    contactno: 1234567890,
    supervisor:'Nilesh'
  },
  {
    id: 6,
    status: "Pending",
    code: 123,
    name: "John Doe",
    role: "Sr Manager",
    password: "Password",
    email: "john@test.com",
    contactno: 1234567890,
    supervisor:'Pankaj'
  },
  {
    id: 7,
    status: "Pending",
    code: 123,
    name: "John Doe",
    role: "Sr Manager",
    password: "Password",
    email: "john@test.com",
    contactno: 1234567890,
    supervisor:'Yashwant'
  },
  {
    id: 8,
    status: "Pending",
    code: 123,
    name: "John Doe",
    role: "Sr Manager",
    password: "Password",
    email: "john@test.com",
    contactno: 1234567890,
    supervisor:'Yashwant'
  },
  {
    id: 9,
    status: "Pending",
    code: 123,
    name: "John Doe",
    role: "Sr Manager",
    password: "Password",
    email: "john@test.com",
    contactno: 1234567890,
    supervisor:'Nilesh'
  },
  
];

const operationRow = [
  {
    id: 1,
    status: "Pending",
    code: 123,
    name: "Pankaj",
    role: "Operations",
    password: "Password",
    email: "john@test.com",
    contactno: 1234567890,
    supervisor:'Pankaj'
  },
  {
    id: 2,
    status: "Active",
    code: 123,
    name: "John Doe",
    role: "Operations",
    password: "Password",
    email: "john@test.com",
    contactno: 1234567890,
    supervisor:'Nilesh'
  },
  {
    id: 3,
    status: "Pending",
    code: 123,
    name: "John Doe",
    role: "Operations",
    password: "Password",
    email: "john@test.com",
    contactno: 1234567890,
    supervisor:'Nilesh'
  },
  {
    id: 4,
    status: "Inactive",
    code: 123,
    name: "John Doe",
    role: "Operations",
    password: "Password",
    email: "john@test.com",
    contactno: 1234567890,
    supervisor:'Nilesh'
  },
  {
    id: 5,
    status: "Pending",
    code: 123,
    name: "John Doe",
    role: "Operations",
    password: "Password",
    email: "john@test.com",
    contactno: 1234567890,
    supervisor:'Nilesh'
  },
  {
    id: 6,
    status: "Pending",
    code: 123,
    name: "John Doe",
    role: "Operations",
    password: "Password",
    email: "john@test.com",
    contactno: 1234567890,
    supervisor:'Nilesh'
  },
  {
    id: 7,
    status: "Pending",
    code: 123,
    name: "John Doe",
    role: "Operations",
    password: "Password",
    email: "john@test.com",
    contactno: 1234567890,
    supervisor:'Nilesh'
  },
  {
    id: 8,
    status: "Pending",
    code: 123,
    name: "John Doe",
    role: "Operations",
    password: "Password",
    email: "john@test.com",
    contactno: 1234567890,
    supervisor:'Nilesh'
  },
  {
    id: 9,
    status: "Pending",
    code: 123,
    name: "John Doe",
    role: "Operations",
    password: "Password",
    email: "john@test.com",
    contactno: 1234567890,
    supervisor:'Nilesh'
  },
  
];




function UserManagement() {

  const navigate = useNavigate();

  const [data, setData] = useState([])
  const [SelectValue, setSelectValue] = useState('Senior Manager')
  const [rows, setRows] = useState(srManagerRows)


  //api Call
  const getUsers = async(SelectValue)=>{
      try {
        setData([])
    const users = await axios.post(`http://localhost:8080/api/admin/user`,{role:SelectValue})
    if(users.data.length > 0) {
        const reverse = users.data.reverse()
      setData(reverse)
    }
  } catch (error) {
    console.log(error) 
  }
    
  }

  useEffect(()=>{
   getUsers(SelectValue)
  },[SelectValue])

  const row = data.map((item,i)=>{
    return(
      {
        id: item.id,
        status: "Active",
        code: item.code,
        name: item.name,
        role: item.role,
        password: item.password,
        email: item.email,
        contactno: item.mobile,
        supervisor:item.supervisor
      }
    )
  })

    

     const handleChange = (e)=>{
        setSelectValue(e.target.value)
     }


     const dataChange = (value)=>{

            if(value === 'Sr Manager'){
                  setRows(srManagerRows)
            }
            if(value === 'Manager'){
                  setRows(managerRows)
            }
            if(value === 'Operations'){
                  setRows(operationRow)
            }
     }

useEffect(() => {
  dataChange(SelectValue)
}, [SelectValue])


const handleAddUser =()=>{
  navigate('/newUser')
}


  return (
    <>

<Stack sx={{flexWrap:"wap",flexDirection:"row"}}>

<AdminHamburgerMenu/>
      <ListingComponent
        title="User Management"
        buttonText="Add User"
        addUserBtn={true}
        options={options}
        onChange={handleChange}
        value={SelectValue}
        Table={UserManagementTable}
        rows={rows}
        onButtonClick={handleAddUser}
      />

</Stack>
    </>
  );
}

export default UserManagement;
