import { Stack } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ListingComponent from "../StyleComponents/ListingComponent";
import { GetUser, get_search } from "../../Services/Services";
import SuperAdminTable from "./DataTable";
import AdminHamburgerMenu from "../AdminPanel/AdminHamburgerMenu";
import { useSelector } from "react-redux";

function SuperAdminListing() {
  const navigate = useNavigate();

const{refresh} = useSelector(s=>s)

  const [data, setData] = useState([]);
  const [SelectValue, setSelectValue] = useState("Senior Manager");

  const [searchValue, setsearchValue] = useState("");

  async function SearchAPi(searchValue) {
    const search = await get_search(searchValue);
    setData(search.data);
  }

  function handleSerachChange (e){
    SearchAPi(searchValue)
    setsearchValue(e.target.value)
  }

  //api Call
  const getUsers = async () => {
    try {
      setData([]);
      const users = await GetUser();
      if (users.data.length > 0) {
        const reverse = users.data.reverse();
        setData(reverse);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [refresh]);

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
    navigate("/super-admin-newuser");
  };

  return (
    <>
      <Stack sx={{ flexWrap: "wap", flexDirection: "row" }}>
        <AdminHamburgerMenu
          navigateListing={"/super-admin-listing"}
          navigateHome={"/super-admin-dashboard"}
        />
        <ListingComponent
          title="User Management"
          title1={'Rental Management System'}
          buttonText="Add User"
          addUserBtn={true}
          onChange={handleChange}
          value={SelectValue}
          Table={SuperAdminTable}
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

export default SuperAdminListing;
