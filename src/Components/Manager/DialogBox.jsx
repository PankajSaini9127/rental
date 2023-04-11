import {
  Dialog,
  FormControl,
  Grid,
  TextField,
  Button,
  Box,
  ListItem,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { addLandLoard } from "../../store/action/action";
import { useNavigate } from "react-router-dom";

const TextFieldWrapper = ({ type,label, placeHolder, value, name, onChange }) => {
  const fieldStyle = {
    height: "50px",
    color: "rgba(16, 99, 173, 0.47)",
    "@media(max-width:900px)": { height: "46px", p: 1 },
  };

  return (
    <Box sx={{ width: "100%" }} className="textFieldWrapper">
      <FormControl fullWidth>
        <TextField
          variant="outlined"
          label={label}
          name={name}
          type={type}
          onChange={(e) => onChange(e)}
          fullWidth
          required
          InputProps={{
            disableUnderline: true,
            style: {
              // color: "rgba(16, 99, 173, 0.47)",
              fontSize: "15px",
            },
          }}
          placeholder={placeHolder}
          value={value}
          sx={fieldStyle}
        />
      </FormControl>
    </Box>
  );
};

const Landblord = ({ value, setValue, index }) => {
  function handleChange(e) {
    
    // console.log(e.target.name,e.target.value)
     let name_regX =  /^[a-zA-Z ]*$/

    if((e.target.name === "leeseName" && e.target.value.match(name_regX)) 
    || e.target.name === "percentage"
    )
    {
    
    if (value[index]) {
      setValue((old) =>
        old.map((row, i) => {
          if (index === i) {
            return {
              ...row,
              [e.target.name]: e.target.value,
            };
          }
          return row;
        })
      );
    } else {
      setValue((old) => [
        ...old,
        {
          [e.target.name]: e.target.value,
        },
      ]);
    }
  }
  }

  return (
    <>
    
      <Grid
        container
        sx={{ justifyContent: "space-evenly", mb: 2 }}
        spacing={2}
      >
        <Grid item xs={6}>
          <TextFieldWrapper
            label={"Name of Landlord"}
            placeHolder={"Name of Landlord"}
            name={"leeseName"}
            value={value[index] && value[index].leeseName ? value[index].leeseName : ""}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextFieldWrapper
            label={"Percentage Share%"}
            placeHolder={"Percentage Share%"}
            name={"percentage"}
            value={
              (value[index] && value[index].percentage && value[index].percentage <= 100)
                ? value[index].percentage
                : ''
            }
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </>
  );
};

function DialogBox({ value, setValue }) {
  const [open, setOpen] = useState(true);

  const [data, setData] = useState([]);

  const [alert,setAlert] = useState({open:false,message:""})

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault()
    let percentage=0;
    data.map((item)=> 
    percentage += Number(item.percentage)
    )
   if(percentage > 100){
    setAlert({open:true,message:"Percentage Share Not Be Bigger Then 100 %"})
   }else
   if(percentage < 100){
    setAlert({open:true,message:"Percentage Share Should Be 100 %"})
   }
   else{
    console.log(data)
    setAlert({open:false,message:""})
    dispatch(addLandLoard(data));
    handleClose()
   }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [noLandlord,setLandlord] = useState(1)
  const handleChange = (e) => {

    if(e.target.value > 0)
    {
      setLandlord(e.target.value)
      setValue(Array.from({length : e.target.value},i=>i));
    }

  };

  const navigate = useNavigate()

  return (
    <>
      <Dialog
        open={open}
        // onClose={handleClose}
        PaperProps={{
          style: { borderRadius: 18 },
        }}
      >
        <Grid
          container
          sx={{
            borderRadious: "30px ",
            backgroundColor: "#FFFFFF",
            justifyContent: "center",
            alignItems: "center",
            py: 5,
            "@media(max-width:900px)": { width: "300px", py: 6 },
          }}
          // spacing={2}
        >
          <Grid item md={10}>
            <TextFieldWrapper
              label="Enter No of Landlord"
              placeHolder="Enter No of Landlord"
              type = 'number'
              grid="10"
              name={"landblord"}
              value = {noLandlord}
              onChange={handleChange}
            />
          </Grid>
          <Box component={'form'} onSubmit={handleSubmit}>
          <Grid
          container
          sx={{
            // height: "345px",
            width: "600px",
            borderRadious: "30px ",
            backgroundColor: "#FFFFFF",
            justifyContent: "center",
            alignItems: "center",
            py: 2,
            "@media(max-width:900px)": { width: "300px", py: 6 },
          }}
          // spacing={4}
        >
          <Grid item md={10}>
            {value.length > 0 ? (
              <>
                {value.map((_, i) => (
                  <Landblord
                    key={i}
                    index={i}
                    value={data}
                    setValue={setData}
                  />
                ))}
              </>
            ) : (
              ""
            )}
            {
              alert.open?<Typography textAlign={'center'} variant={'body1'} color="red" mx={2}>{alert.message}</Typography>:""
            }
            
          </Grid>

          <Grid item md={3}>
            {value.length > 0 ? (
              <Button
                variant="contained"
                type='submit'
                sx={{
                  height: "40px",
                  width: "100%",
                  borderRadius: "20px",
                  fontSize: "16px",
                  color: "#FFFFFF",
                  lineHeight: "32px",
                  textTransform: "capitalize",
                }}
              >
                Submit
              </Button>
            ) : (
              ""
            )}
          </Grid>
          
          </Grid>
            </Box>
            <Button
                variant="outlined"
                
                sx={{
                  height: "30px",
                  borderRadius: "10px",
                  fontSize: "16px",
                  lineHeight: "32px",
                  textTransform: "capitalize",
                }}
                onClick={()=>navigate(-1)}
              >
               Close
              </Button>
        </Grid>
      </Dialog>
    </>
  );
}

export default DialogBox;
