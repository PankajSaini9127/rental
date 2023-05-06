import { Stack } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ListingComponent from "../StyleComponents/ListingComponent";
import UserManagementTable from "./UserManagementTable";
import { AuthContext } from "../../App";
import { GetUser, GetUser_specific, get_search } from "../../Services/Services";
import { useSelector } from "react-redux";
import HamburgerMenu from "../HamburgerMenu";
import HamburgerAdmin from "./HamburgerAdmin";

function UserManagement() {
  const navigate = useNavigate();

  const { auth, refresh } = useSelector((s) => s);

  const { city, state, role } = auth;

const {type} = useParams()

  const [data, setData] = useState([]);
  const [SelectValue, setSelectValue] = useState("Senior Manager");

  const [searchValue, setsearchValue] = useState("");

  async function SearchAPi(searchValue) {
    const search = await get_search(searchValue);
    setData(search.data);
  }

  //api Call get all user
  const getUsers = async () => {
    try {
      setData([]);
      const users = await GetUser({ city, state });
      if (users.data.length > 0) {
        setData(users.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async () => {
    try {
      setData([]);
      const users = await GetUser_specific({ city, state,type });
      if (users.data.length > 0) {
        setData(users.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    type=== "all-user" ? getUsers(): getUser(type);
    
  }, [refresh,type]);

  const row = data.map((item, i) => {
    const frole = JSON.parse(item.role).includes("Senior_Manager")
      ? "Senior Manager"
      : JSON.parse(item.role);

    return {
      id: item.id,
      status: item.status,
      code: item.code,
      name: item.name,
      role: frole,
      email: item.email,
      contactno: item.mobile,
      created: item.time ? item.time.slice(0, 10) : "",
      modify: item.modify,
    };
  });

  const handleChange = (e) => {
    setSelectValue(e.target.value);
  };

  const handleAddUser = () => {
    navigate("/newUser");
  };

  function handleSerachChange(e) {
    SearchAPi(searchValue);
    setsearchValue(e.target.value);
  }

  return (
    <>
      <Stack sx={{ flexWrap: "wap", flexDirection: "row" }}>

        <HamburgerAdmin />

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
          handleSerachChange={handleSerachChange}
        />
      </Stack>
    </>
  );
}

export default UserManagement;
