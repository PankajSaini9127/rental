import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FinanceHam from "../FinancePanel/FinanceHamburger";
import ManagerHam from "../Manager/HamburgerManager";
import SrMHam from "../SrManager/SRMHAmburger";
import OPHam from "../Operations/OperationsHamburger";
import { Box, Button, TextField, Tooltip, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
// action
import { setAlert, setForm } from "../../store/action/action";
// services
import { listLandlord , search_landlord} from "../../Services/Services";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
const Listing = (props) => {
  const [row, setRow] = useState([]);
  const history = props.history

  const {
    auth: { role, id },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  // for fetching the landlords according the user ID
  async function fetchLandlord(id) {
    try {
      let response = await listLandlord(id);
      if (response.status === 200) {
        setRow(
          response.data.data.map((row, i) => {
            return {
              id: i + 1,
              agreement_id: row.agreement_id,
              agreement_code: row.code,
              name: row.name,
              aadhaar_no: row.aadharNo,
              pan_no: row.panNo,
              gst_no: row.gstNo || "---",
              mobile: row.mobileNo,
              email: row.email,
              share: row.percentage,
              action: row,
            };
          })
        );
      } else {
        dispatch(
          setAlert({
            open: true,
            variant: "warring",
            message: "May User Id valid or provided?",
          })
        );
      }
    } catch (error) {
      dispatch(
        setAlert({
          open: true,
          variant: "error",
          message: "Something went wrong !!!",
        })
      );
    }
  }


  async function handleSearch(e){
    let response = await search_landlord({id,search : e.target.value})

    if (response.status === 200) {
    console.log(response)

      setRow(
        response.data.data.map((row, i) => {
          return {
            id: i + 1,
            agreement_id: row.agreement_id,
            agreement_code: row.code,
            name: row.name,
            aadhaar_no: row.aadharNo,
            pan_no: row.panNo,
            gst_no: row.gstNo || "---",
            mobile: row.mobileNo,
            email: row.email,
            share: row.percentage,
            action: row,
          };
        })
      );
    } 

  }
  useEffect(() => {
    fetchLandlord(id);
  }, []);
  return (
    <Box sx={style.container}>
      <Box>
        {/* Hamburger */}
        {role.includes("Finance") && <FinanceHam />}
        {role.includes("Manager") && <ManagerHam />}
        {role.includes("Senior_Manager") && <SrMHam />}
        {role.includes("Operations") && <OPHam />}
        {/* Hamburger ends */}
      </Box>

      <Box sx={style.contentContainer}>
        {/* Header  */}
        <Box sx={style.header}>
          <Typography sx={{ fontWeight: 700 }} color="primary" variant="h4">
            Rental Management System
          </Typography>
          <Typography sx={{ fontWeight: 700 }} variant="body1">
            {role}
          </Typography>
        </Box>
        {/* Header ends */}
        {/* module Name */}
        <Box>
          <Typography sx={{ fontWeight: 700 }} variant="h6">
            Listing Landlord
          </Typography>
        </Box>
        {/* module Name ends */}
        {/* Search Box */}
        <Box sx={style.searchBox}>
          <TextField variant="outlined" onChange = {handleSearch} placeholder="Search..." size="small" />
        </Box>
        {/* Search Box ends */}
        {/* Listing Component */}
        <ListingPart row={row} history = {history}/>
        {/* Listing Component ends */}
      </Box>
    </Box>
  );
};

// data grid section
function ListingPart({ row, history }) {

  const dispatch = useDispatch();

  const actionButton = (values) => {
    return (
      <>
        <Tooltip title="Edit">
          <Button  variant = 'contained' size = 'small' endIcon = {<EditIcon/>} onClick = {()=>{
            dispatch(setForm(values.formattedValue))
          history('/edit-landlord')
          }}>
            Edit
            </Button>
        </Tooltip>
      </>
    );
  };
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "agreement_id",
      headerName: "Agreement ID",
      width: 150,
    },
    {
      field: "agreement_code",
      headerName: "Agreement Code",
      width: 150,
    },
    {
      field: "name",
      headerName: "Lessor Name",
      width: 150,
    },
    {
      field: "email",
      headerName: "Email",
      width: 110,
    },
    {
      field: "aadhaar_no",
      headerName: "Aadhaar Number",
      width: 150,
    },
    {
      field: "pan_no",
      headerName: "Pan Number",
      width: 110,
    },
    {
      field: "gst_no",
      headerName: "GST",

      width: 110,
    },
    {
      field: "mobile",
      headerName: "Mobile Number",

      width: 110,
    },
    {
      field: "share",
      headerName: "Share",

      width: 110,
    },
    {
      field: "action",
      headerName: "Action",
      width: 110,
      renderCell: actionButton,
    },
  ];

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={row}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
      />
    </Box>
  );
}

// style Css (Inline CSS part here)
const style = {
  container: {
    display: "flex",
    width: "100%",
    gap: "1rem",
    padding: "0.3%",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "space-between",
    padding: "1rem",
    gap: "2rem",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
  },
  searchBox: {
    display: "flex",
    justifyContent: "space-between",
  },
};

export default Listing;
