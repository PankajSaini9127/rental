import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HamburgerMenu from "../HamburgerMenu";

import ListingComponent from "../StyleComponents/ListingComponent";
import AdminHamburgerMenu from "./AdminHamburgerMenu";
import UserManagementTable from "./UserManagementTable";

const options = ["Sr Manager", "Manager", "Operations"];




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
  },
  
];

const srManagerRows = [
  {
    id: 1,
    status: "Pending",
    code: 123,
    name: "Pankaj",
    role: "Sr Manager",
    password: "Password",
    email: "john@test.com",
    contactno: 1234567890,
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
  },
  
];




function UserManagement() {

  const navigate = useNavigate()

    const [SelectValue, setSelectValue] = useState('Sr Manager')
    const [rows, setRows] = useState(srManagerRows)

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
