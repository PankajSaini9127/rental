import { DataGrid } from '@mui/x-data-grid';
import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { Box, Button } from "@mui/material";
import { useSelector } from 'react-redux';
import { send_to_bhu } from '../../Services/Services';

 


function ManagerTable({rows}) {

  const navigate = useNavigate();

  const [ids,setIds] = useState([]);

  const {auth} = useSelector(s=>s)

  const srm_id = auth.id ;


  const renderDetailsButton = (e) => {
    const id = e.id;
  
  
    return (
      
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{
              backgroundColor: "#e3c739",
              color: "white",
              fontSize: "12px",
              textTransform: "capitalize",
              width:"100%"
            }}
            onClick={(e) => {
              e.stopPropagation(); // don't select this row after clicking
              navigate(`/srManagerApproval/${id}`)
            }}
          >
            View
          </Button>
    );
  };
  
  
const columns = [
     
      {
        field: "code",
        headerName: "Code",
        width: 120,
        type: "number",
        headerClassName: "dataGridHeader",
        headerAlign: "center",
      },
      {
        field: "name",
        headerName: "Name",
        width: 180,
        headerClassName: "dataGridHeader",
        headerAlign: "center",
      },
      {
        field: "location",
        headerName: "Location",
        width: 160,
        headerClassName: "dataGridHeader",
        headerAlign: "center",
      },
      {
        field: "manager",
        headerName: "Manager",
        width: 160,
        headerClassName: "dataGridHeader",
        headerAlign: "center",
      },
      {
        field: "rentalAmount",
        headerName: "Rental Amount",
        width: 150,
        headerClassName: "dataGridHeader",
        headerAlign: "center",
      },
      {
          field: "status",
          headerName: "Status",
          width: 200,
          headerClassName: "dataGridHeader",
          headerAlign: "center",
        },
      {
          field: "view",
          headerName: "View",
          width: 150,
          headerClassName: "dataGridHeader",
          headerAlign: "center",
          renderCell: renderDetailsButton,
        },
  
];

const onRowsSelectionHandler = (ids) => {
    setIds(ids)
  };

function handleSelect (){
  ids.map(async(id)=>{
    const response = await send_to_bhu({status:"Sent To BHU", srm_id},id)  
    console.log(response)
  })
   
    
}


  return (
    <>
    {
      ids.length > 0 && <Box sx={{display:'flex',justifyContent:'flex-end'}}>
      <Button variant="contained" sx={{textTransform:'capitalize',m:1,mx:3}} onClick={handleSelect} >Send To BHU</Button>
      </Box>
    }
    

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
          // maxWidth:"180px !important",
          // minWidth:"92px !important",
          maxHeight:"30px !important",
          minHeight:"25px !important",
          alignSelf:"center",
          mx:"20px !important",
          textAlign:"center !important",
          borderRadius:"10px !important"
        },
        "& .allCell":{
          justifyContent:"center !important"          
        }

      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={6}
        rowsPerPageOptions={[6]}
        checkboxSelection
        sx={{ color: "black !important",  minWidth:"50px" }}
        getCellClassName={(parms) => {
         
          let cellClass = []
          if (parms.field === "status" && parms.row.status === "Sent To Finance") {
            cellClass.push("green statusCell") ;
          } else if (
            parms.field === "status" &&
            (parms.row.status === "Sent To Sr Manager" || parms.row.status === "Sent To BHU" ||  parms.row.status === "Sent To Operations")
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
        onSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
      >

      </DataGrid>
    </Box>
    </>
  )
}

export default ManagerTable;