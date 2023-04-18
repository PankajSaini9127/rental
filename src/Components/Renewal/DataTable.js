import { Alert, Box, Button, Checkbox, Grid, Snackbar } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import config from '../../config.json'


import PermissionAlert from '../Manager/Alert';
import { useDispatch } from 'react-redux';
import { setAlert } from '../../store/action/action';
 


function DataTable() {

  const [data,setData] = useState([])
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)

 async function handleRenewal (id){
   try {
    
   } catch (error) {
    console.log(error)
    dispatch(setAlert({open:true,variant:"error",message:"Something Went Wrong Please Try Again Later."}))
   }
  }

function actionButton (e){
      const id = e.id 
      return <Grid item xs={6}>
      <Button
        variant="contained"
        color="primary"
        size="small"
        style={{
          backgroundColor: "rgb(103 185 68 / 89%)",
          color: "white",
          fontSize: "12px",
          textTransform: "capitalize",
          // width:"100%"
        }}
        onClick={async (e) => {
          e.stopPropagation(); // don't select this row after clicking
          console.log(id);
          handleRenewal(id)
        }}
      >
        Renew
      </Button>
    </Grid>
}

  // api call for get data

  // const APICALL = async()=>{
  //   setLoading(true)
  //   setData([])
  //   const result = await get_renewal()

  //  console.log(result)
  //   if(result.data.success){
  //   //   const data = result.data.data.reverse();
  //  setData(result.data.renewal)
  //     setLoading(false)
  //   }
  // }




  // useEffect(()=>{
  //   // APICALL()
  // },[])

//  const row = data.map((item)=>{
//   // console.log(item)
//   return  {
//     id: item.id,
//     status: item.status,
//     code: item.code,
//     name: item.leeseName,
//     location:item.location,
//     rentalAmount:item.monthlyRent,
  
//   }
//  })

 const row = [
  {
    id: 1,
    status: "Pending",
    code: 123,
    name: "Pankaj",
    location:"jodhpur",
    rentalAmount:3000
  },
  {
    id: 2,
    status: "Pending",
    code: 123,
    name: "John Doe", 
    location:"jodhpur",
    rentalAmount:3000}
,  {
    id: 3,
    status: "Pending",
    code: 123,
    name: "John Doe", location:"jodhpur",
    rentalAmount:3000
  },
  {
    id: 4,
    status: "Pending",
    code: 123,
    name: "John Doe", location:"jodhpur",
    rentalAmount:3000
  },
  {
    id: 5,
    status: "Pending",
    code: 123,
    name: "John Doe", location:"jodhpur",
    rentalAmount:3000
  },
  {
    id: 6,
    status: "Pending",
    code: 123,
    name: "John Doe", location:"jodhpur",
    rentalAmount:3000
  },
  
  
];


  const navigate = useNavigate()

  const onRowsSelectionHandler = (ids) => {
    
    const id = ids[0]
      // navigate(`/managerApproval/${id}`)
  };

  const [ids, setIds] = useState([]);
  console.log(ids);


 //handle Checkbox
 const handleSwitch = (e) => {
  let idVar = Number(e.target.name);
  if (ids.includes(idVar)) {
    // console.log("out");
    setIds(ids.filter((i) => i !== idVar));
  } else {
    // console.log("in", idVar, ids);
    setIds([...ids, idVar]);
  }
};


  const columns = [
    {
      field: "checkbox",
      width: 20,
      type: "number",
      headerClassName: "dataGridHeader",
      headerAlign: "center",
      renderCell: (params) => (
        <>
          {/* {console.log(ids.includes(params.id))} */}
          {params.formattedValue === "Pending" ? (
            <Checkbox
              onChange={handleSwitch}
              name={params.id}
              checked={ids.includes(params.id) ? true : false}
            />
          ) : (
            <Checkbox disabled={true} />
          )}
        </>
      ),
    },   
    {
      field: "code",
      headerName: "Code",
      width: 130,
      type: "number",
      headerClassName: "dataGridHeader",
      headerAlign: "center",
      flex:1
    },
    {
      field: "name",
      headerName: "Name",
      width: 230,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
      flex:1
    },
    {
      field: "location",
      headerName: "Location",
      width: 230,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
      flex:1
    },
    {
      field: "rentalAmount",
      headerName: "Rental Amount",
      width: 200,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
      flex:1
    },
    {
      field: "status",
      headerName: "Status",
      width: 200,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
      flex:1
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      headerClassName: "dataGridHeader",
      headerAlign: "center",
      flex:1,
      renderCell:actionButton
    },
  ];
  

  //form delete alert

const [deleteAlert, setDeleteAlert] = useState({open:false,id:''})

  const handleConfirm = ()=>{
    setDeleteAlert({open:false,id:''})
  }
 
  const handleCancel = ()=>{
      setDeleteAlert({open:false,id:''})
  }
  return (
    <>

<PermissionAlert handleClose={handleCancel} handleConfirm={handleConfirm} open={ deleteAlert.open} message={"Are you sure you want to delete this item?"}/>

      <Box
      sx={{
        height: "430px",
        px: 2,
        "& .dataGridHeader": {
          color: "#CACACA",
          textAlign:'left'
        },
        "& .green": {
         backgroundColor: "#E7FFE9",
         color:"#41CF2A"
        },
        "& .yellow": {
          backgroundColor: "#FEFFC8",
          color:"#C5C05B"
        },
        "& .red": {
          backgroundColor: "#FFEBE7",
          color:"#CF482A"
        },
        "& .statusCell":{
          maxWidth:"92px !important",
          minWidth:"92px !important",
          maxHeight:"30px !important",
          minHeight:"25px !important",
          textAlign:"center !important",
          borderRadius:"10px !important",
          m:'auto',
          mx:6
        },
        "& .allCell":{
          justifyContent:"center !important"          
        }
      }}
    >
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={6}
        rowsPerPageOptions={[6]}
        loading={loading}
        sx={{ color: "black !important",  minWidth:"50px" }}
        getCellClassName={(parms) => {
           let cellClass = []
          if (parms.field === "status" && parms.row.status === "Approved") {
            cellClass.push("green statusCell") ;
          } else if (
            parms.field === "status" &&
            parms.row.status === "Pending"
          ) {
            cellClass.push( "yellow statusCell") ;
          } else if (
            parms.field === "status" &&
            parms.row.status === "Rejected"
          ) {
            cellClass.push("red statusCell")  ;
          }
          cellClass.push('allCell')
          
          return(cellClass)

        }}
        // onSelectionModelChange={(ids) => {console.log(ids)}}
      >

      </DataGrid>
    </Box>
    </>
  )
}

export default DataTable;