import { Stack } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ListingComponent from "../StyleComponents/ListingComponent";
import AdminHamburgerMenu from "./AdminHamburgerMenu";
import UserManagementTable from "./UserManagementTable";
import { AuthContext } from "../../App";
import { GetUser, get_search } from "../../Services/Services";
import { useSelector } from "react-redux";
import HamburgerMenu from "../HamburgerMenu";

function UserManagement() {
  const navigate = useNavigate();

  const {auth} = useSelector(s=>s);

  const {city,state,role} = auth;

  const {
    state: { adminReCall },
  } = useContext(AuthContext);

  const [data, setData] = useState([]);
  const [SelectValue, setSelectValue] = useState("Senior Manager");

  const [searchValue, setsearchValue] = useState("");

  async function SearchAPi(searchValue) {
    const search = await get_search(searchValue);
    setData(search.data);
  }

  useEffect(() => {
    // if(searchValue.length >= 3){
    SearchAPi(searchValue);
    // }
  }, [searchValue]);

  //api Call
  const getUsers = async () => {
    try {
      setData([]);
      const users = await GetUser({city,state});
      if (users.data.length > 0) {
        setData(users.data);
        console.log(users)
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [adminReCall]);

  const row = data.map((item, i) => {
    
    return {
      id: item.id,
      status: item.status,
      code: item.code,
      name: item.name,
      role: JSON.parse(item.role),
      email: item.email,
      contactno: item.mobile,
      created:item.time?item.time.slice(0,10):"",
      modify:item.modify
    };
  });

  const handleChange = (e) => {
    setSelectValue(e.target.value);
  };

  const handleAddUser = () => {
    navigate("/newUser");
  };

  return (
    <>
      <Stack sx={{ flexWrap: "wap", flexDirection: "row" }}>
<HamburgerMenu
          navigateHome={role.includes("Manager")?"dashboard":role.includes("Operations")?"operationsDashboard":role.includes("BUH")?"BHUdashboard":''}
          handleListing={() => navigate((role.includes("Manager")?"/listing":role.includes("Operations")? "/operationsListing":role.includes("BUH")?"/BHUListing":""))}
          monthlyRent={() => navigate("/monthly-payment")}
          renewal={() => navigate(`/renewal`)}
          // monthlyBtn="true"
        />
        <ListingComponent
          title="User Management"
          title1={"Rental Management System"}
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
