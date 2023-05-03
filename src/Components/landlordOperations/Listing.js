import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import FinanceHam from "../FinancePanel/FinanceHamburger";
import ManagerHam from "../Manager/HamburgerManager";
import SrMHam from "../SrManager/SRMHAmburger";
import OPHam from "../Operations/OperationsHamburger";
import { Box, TextField, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const Listing = () => {
    const {auth : {role, id}} = useSelector(state=>state)

    // for fetching the landlords according the user ID
    // function fetchLandlord(){

    // }
    // useEffect(()=>{

    // },[])
    return (
        <Box sx={style.container}>
        <Box>
        {/* Hamburger */}
        {role.includes('Finance') && <FinanceHam />}
        {role.includes('Manager') && <ManagerHam />}
        {role.includes('Senior_Manager') && <SrMHam />}
        {role.includes('Operations') && <OPHam />}
        {/* Hamburger ends */}
        </Box>

        <Box sx = {style.contentContainer}>
        {/* Header  */}
            <Box sx = {style.header}>
            <Typography sx = {{fontWeight : 700}} color = 'primary' variant = 'h5'>Listing Landlord</Typography>
            <Typography sx = {{fontWeight : 700}} variant = 'body1'>{role}</Typography>
            </Box>
        {/* Header ends */}
        {/* Search Box */}
        <Box sx = {style.searchBox}>
            <TextField
            variant='outlined'
            placeholder='Search...'
            size='small'
            />
        </Box>
        {/* Search Box ends */}
        {/* Listing Component */}
        <ListingPart row = {""}/>
        {/* Listing Component ends */}
        </Box>
            
        </Box>
    );
}

function ListingPart({row}){


const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'firstName',
      headerName: 'First name',
      width: 150,
      editable: true,
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      width: 150,
      editable: true,
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
  ];
  
  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];
  
    return (
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
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
    container : {
        display : 'flex',
        width : '100%',
        gap : '1rem',
        padding : '0.3%',
    },
    contentContainer :{
        flex : 1,
        justifyContent : 'space-between',
        padding : '1rem',
        gap : '5rem',
        display : 'flex',
        flexDirection : 'column',
    },
    header :{
        display : 'flex',
        justifyContent : 'space-between'
    },
    searchBox :{
        display : 'flex',
        justifyContent : 'space-between'
    }
}

export default Listing;


