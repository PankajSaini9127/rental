import { Button, Checkbox } from '@mui/material';
import { Box } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { get_monthlt_rent_opr, get_monthlt_rent_srm, sendMonthyPaymentForword } from '../../../Services/Services';
import { useDispatch, useSelector } from 'react-redux';
import { setAlert, setRefreshBox } from '../../../store/action/action';





export default function ListingTable({rows}) {
  const {auth,refresh}= useSelector(s=>s)

    const [ids, setIds] = useState([]);
    const navigate = useNavigate()


    const dispatch = useDispatch()

   


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
              navigate(`/opr-monthly-view/${id}`);
            }}
          >
            View
          </Button>
        );
      };
    
      const handleSwitch = (e) => {

        let idVar = Number(e.target.name)
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
              {params.formattedValue === "Sent To Operations" ? (
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
          width: 70,
          flex: 1,
          type: "number",
          headerAlign: "center",
        },
        {
          field: "month_of_rent",
          headerName: "Rent Date",
          headerAlign: "center",
          flex: 1
        },
        {
          field: "name",
          headerName: "Landlord Name",
          width: 100,
          headerAlign: "center",
          flex: 1
        },
        {
          field: "location",
          headerName: "Location",
          width: 150,
          headerAlign: "center",
          flex: 1
    
        },
        {
          field: "gst",
          headerName: "GST",
          width: 100,
          headerAlign: "center",
          flex: 1
    
        },
        {
          field: "manager",
          headerName: "Manager",
          width: 100,
          headerAlign: "center",
          flex: 1
    
        },
        {
          field: "srm",
          headerName: "Sr Manager",
          width: 100,
          headerAlign: "center",
          flex: 1
    
        },
        {
          field: "total_month_rent",
          headerName: "Month Rent",
          headerAlign: "center",
          flex: 1
        },
        {
          field: "percentage",
          headerName: "Percentage Share",
          width: 150,
          headerAlign: "center",
        },
        {
          field: "payable_amount",
          headerName: "Payable Amount",
          headerAlign: "center",
          flex: 1
        },
        {
          field: "status",
          headerName: "Status",
          headerAlign: "center",
          width: 200,
          flex: 1
        },
        {
          field: "utr",
          headerName: "UTR Number",
          width: 100,
          headerAlign: "center",
          flex: 1
    
        },
        {
          field: "action",
          headerName: "Action",
          headerAlign: "center",
          flex: 1,
          renderCell: renderDetailsButton
        }
    
      ];
      
    async function sendToFinance (){
        ids.map(async (id) => {
          const send = await sendMonthyPaymentForword(id, {
            status: "Sent To Finance",
            op_id: auth.id,
          });
          console.log(send.data.success);
          if (send.data.success) {
            dispatch(
              setAlert({
                open: true,
                variant: "success",
                message: "Payment Details Sent To Operations.",
              })
            );
            dispatch(setRefreshBox());
            //  navigate(-1)
          } else {
            dispatch(
              setAlert({
                open: true,
                variant: "error",
                message: "Something Went Wrong Please Try Again Later.",
              })
            );
          }
        });
      }


  return (
    <>
      {ids.length > 0 && (
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            sx={{ textTransform: "capitalize", m: 1, mx: 3 }}
            onClick={sendToFinance}
          >
            Send To Finance
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
              ((parms.row.status === "Paid"))
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
