import { Stack } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


import ListingComponent from "../StyleComponents/ListingComponent";
import AdminHamburgerMenu from "./AdminHamburgerMenu";
import UserManagementTable from "./UserManagementTable";
import { AuthContext } from "../../App";
import { GetUser, get_search } from "../../Services/Services";



function UserManagement() {

  const navigate = useNavigate();

  const {state:{adminReCall}} = useContext(AuthContext)

  const [data, setData] = useState([])
  const [SelectValue, setSelectValue] = useState('Senior Manager');

  const [searchValue,setsearchValue] =useState('');

  
async function SearchAPi(searchValue){
  const search = await get_search(searchValue)
  setData(search.data)
}

useEffect(()=>{
  if(searchValue.length >= 3){
    SearchAPi(searchValue)
  }
},[searchValue])

  //api Call
  const getUsers = async()=>{
      try {
        setData([])
    const users = await GetUser()
    if(users.data.length > 0) {
        const reverse = users.data.reverse()
      setData(reverse)
    }
  } catch (error) {
    console.log(error) 
  }
    
  }

  useEffect(()=>{
   getUsers()
  },[ adminReCall])

  const row = data.map((item,i)=>{
    return(
      {
        id: item.id,
        status: item.status,
        code: item.code,
        name: item.name,
        role: JSON.parse(item.role),
        email: item.email,
        contactno: item.mobile,
        supervisor:item.supervisor
      }
    )
  })

const handleChange = (e)=>{
        setSelectValue(e.target.value)
     }



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
        onChange={handleChange}
        value={SelectValue}
        Table={UserManagementTable}
        rows={row}
        onButtonClick={handleAddUser}
        dropDown={false}
        searchValue={searchValue}
        setsearchValue={setsearchValue}
      />

</Stack>
    </>
  );
}

export default UserManagement;
