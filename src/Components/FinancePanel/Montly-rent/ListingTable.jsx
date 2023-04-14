import { Button, Checkbox } from '@mui/material';
import { Box } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { get_monthlt_rent_finance } from '../../../Services/Services';





export default function ListingTable() {

    const [ids, setIds] = useState([]);
    const navigate = useNavigate()

    const [agIDS,setAgIds] = useState([])
    const [rentData,setRent] = useState({})

    const {auth} = useSelector(s=>s)

    async function fetchData(id){
      try {
  const data = await get_monthlt_rent_finance(id)
     if(data.data.success){
           setAgIds(data.data.ids)
           setRent(data.data.agreement)
           console.log(data.data.agreement)
     }else{
     console.log(data)
     }
  
      } catch (error) {
          console.log(error)
      }
    }    
  
    useEffect(()=>{
      fetchData(auth.id)
    },[])

    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

      const rows = agIDS.map((row)=>{
        return(
          {
            id : rentData[row].id,
            code:rentData[row].code,
            checkbox:rentData[row].status,
            status:rentData[row].status,
            utr:rentData[row].utr_no,
            // srmanager:rentData[row].manager,
            name:rentData[row].landlord_name,
            location:rentData[row].location,
            gst:rentData[row].gst,
            percentage:rentData[row].share,
            month_of_rent: month [new Date(rentData[row].rent_date).getUTCMonth()] + " " + new Date(rentData[row].rent_date).getFullYear(),
            total_month_rent:rentData[row].monthly_rent,
            payable_amount: parseFloat(rentData[row].rent_amount).toFixed(2)
          }
        )
      })

    const renderDetailsButton = (e) => {
        const id = e.id;
    
    
        return (
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
            onClick={(e) => {
              e.stopPropagation(); // don't select this row after clicking
              navigate(`/finance-monthly-view/${id}`);
            }}
          >
            View
          </Button>
        );
      };
    
      const handleSwitch = (e) => {
        console.log(ids);
        if (ids.includes(e.target.name)) {
          console.log("out");
          setIds(ids.filter((i) => i !== e.target.name));
        } else {
          console.log("in", e.target.name, ids);
          setIds([...ids, e.target.name]);
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
              {/* {console.log(params)} */}
              {(params.formattedValue === "Sent To Finance") ? (
                <Checkbox
                  onChange={handleSwitch}
                  name={params.id}
                  checked={ids.includes(params.id)}
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
            field: "utr",
            headerName: "UTR Number",
            width: 150,
            headerClassName: "dataGridHeader",
            headerAlign: "center",
            flex:1
          },
          // {
          //   field: "srmanager",
          //   headerName: "Sr Manager Name",
          //   width: 150,
          //   headerClassName: "dataGridHeader",
          //   headerAlign: "center",
          //   flex:1
          // },
          {
            field: "name",
            headerName: "Landlord Name",
            width: 200,
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
            field: "gst",
            headerName: "GST Number",
            width: 200,
            headerClassName: "dataGridHeader",
            headerAlign: "center",
            flex:1,
          },
          {
            field: "percentage",
            headerName: "Percentage Share",
            width: 200,
            headerClassName: "dataGridHeader",
            headerAlign: "center",
            flex:1,
          },
          {
            field: "month_of_rent",
            headerName: "Rent Month",
            width: 230,
            headerClassName: "dataGridHeader",
            headerAlign: "center",
            flex:1
          },
          {
            field: "total_month_rent",
            headerName: "Total Month Rent",
            width: 200,
            headerClassName: "dataGridHeader",
            headerAlign: "center",
            flex:1,
          },
          {
            field: "payable_amount",
            headerName: "Payable Amount",
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
            flex:1,
          },
          {
            field: "action",
            headerName: "Action",
            width: 200,
            headerClassName: "dataGridHeader",
            headerAlign: "center",
            flex:1,
            renderCell:renderDetailsButton
          }
        
      ];

      function sendToOperations (){

      }


  return (
    <>
      {ids.length > 0 && (
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            sx={{ textTransform: "capitalize", m: 1, mx: 3 }}
            onClick={sendToOperations}
          >
            Send To Operations
          </Button>
        </Box>
      )}
      {/* <Remark remark={remarkMSG} setRemark={setRemarkMSG} handleSend={handleSend} open={remarkOpen} handleClose={()=>setRemarkOpen(false)} /> */}

      <Box
        sx={{
          height: "430px",
          px: 2,
          "& .dataGridHeader": {
            color: "#CACACA",
            textAlign: "left",
          },
          "& .green": {
            backgroundColor: "#E7FFE9",
            color: "#41CF2A",
          },
          "& .yellow": {
            backgroundColor: "#FEFFC8",
            color: "#C5C05B",
          },
          "& .red": {
            backgroundColor: "#FFEBE7",
            color: "#CF482A",
          },
          "& .statusCell": {
            // maxWidth:"180px !important",
            // minWidth:"92px !important",
            maxHeight: "30px !important",
            minHeight: "25px !important",
            alignSelf: "center",
            mx: "1",
            textAlign: "center !important",
            borderRadius: "10px !important",
          },
          "& .allCell": {
            justifyContent: "center !important",
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={6}
          rowsPerPageOptions={[6]}
          // checkboxSelection
          sx={{ color: "black !important", minWidth: "50px" }}
          getCellClassName={(parms) => {
            let cellClass = [];
            if (
              parms.field === "status" &&
              (parms.row.status === "Approved" || parms.row.status === "Deposited")
            ) {
              cellClass.push("green statusCell");
            } else if (
              parms.field === "status" &&
              (parms.row.status === "Sent To Sr Manager" ||
                parms.row.status === "Sent To BUH" ||
                parms.row.status === "Sent To Operations" ||
                parms.row.status === "Sent To Finance" || 
                parms.row.status === "Hold"
                )
            ) {
              cellClass.push("yellow statusCell");
            } else if (
              parms.field === "status" &&
              (parms.row.status === "Sent Back From Sr Manager"  || parms.row.status === "Sent Back From BUH" ||
              parms.row.status === "Sent Back From Operations" || parms.row.status === "Sent Back From Finance"
              )
            ) {
              cellClass.push("red statusCell");
            }
            cellClass.push("allCell");

            return cellClass;
          }}
          // onSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
        ></DataGrid>
      </Box> 
    </>
  )
}
