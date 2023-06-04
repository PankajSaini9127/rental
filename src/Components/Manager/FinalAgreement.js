import {
    Box,
    Button,
    Dialog,
    DialogActions,
    FormControl,
    FormLabel,
    Grid,
    Typography,
  } from "@mui/material";
  
  
  import "react-datepicker/dist/react-datepicker.css";
import { DocumentUpload } from "../StyledComponent";
import { uploadDoc } from "../../Services/Services";
import { setAlert } from "../../store/action/action";
import { useDispatch } from "react-redux";
import { useState } from "react";
  
  
  const labelStyle = {
    fontSize: "20px",
    lineHeight: "30px",
    color: "var(--main-color)",
    fontWeight: "600",
    "@media(max-width:900px)": { fontSize: "10px" },
  };
 

  
  function FinalAgreement({
    open,
    setOpen,
    handleConfirm1,
    value,
    setValue,
    modifyDate
  }) {

    const [formError,setError] = useState({final_agreement:'',agreement_date:""})

    const dispatch = useDispatch()
  
    function onChange(e) {

      setError({...formError,[e.target.name]:""})
      setValue({
        ...value,
        [e.target.name]:e.target.value
      });
    }

   async function onfileChange (e){
    
        const FD = new FormData();
    console.log(e.target.files[0]);
    FD.append("photo", e.target.files[0]);
    let response = await uploadDoc(FD);

    if (response.status === 200) {

      setError({...formError,[e.target.name]:""})


  setValue({
    ...value,
    final_agreement:response.data.link,
    final_agreement_name:e.target.files[0].name
  })
    dispatch(
        setAlert({
          open: true,
          variant: "success",
          message: response.data.message,
        })
      );
    
    }else{
        dispatch(
            setAlert({
              open: true,
              variant: "error",
              message: response.data.message || "Something went wrong !!!",
            })
          );
    }

    }
  
  
    const disablePastDate = () => {
      const today = new Date(modifyDate);
      const dd = String(today.getDate() + 0).padStart(2, "0");
      const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      const yyyy = today.getFullYear();
      console.log(yyyy + "-" + mm + "-" + dd)
      return yyyy + "-" + mm + "-" + dd;
  };

  const disableRentStartDate = () => {
    const today = new Date(value.agreement_date);
    const dd = String(today.getDate() + 0).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    console.log(yyyy + "-" + mm + "-" + dd)
    return yyyy + "-" + mm + "-" + dd;
};

function handleClose(){
  setOpen(false)
  setValue({
    agreement_date: "",
    final_agreement: "",
    rent_start_date: "",
  })
}


function validate(){
      if(value.final_agreement.length < 1){
        setError({...formError,final_agreement:"Please Upload Final Agreement Document !!"})
        return false
      }else if(value.agreement_date.length < 1){
        setError({...formError,agreement_date:"Please Select Final Agreement Date !!"})
        return false
      }else if(value.rent_start_date.length < 1){
        setError({...formError,rent_start_date:"Please Select Rent Start Date !!"})
        return false
      }
      else
        return handleConfirm1() 

}
  
  
    return (
      <>
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: { borderRadius: 18 },
          }}
        >
          <Box sx={{ pt: 5, px: 2, pb: 2 }} component={'form'} >
            <Grid container>
              <Grid item xs={12}>

              <FormControl fullWidth>
                <DocumentUpload 
                label={'Final Agreement'}
                placeHolder={'Upload Final Agreement'}
                name="final_agreement"
                handleChange={onfileChange}
                uploaded={value.final_agreement && true}
                fileName={value.final_agreement_name}
                error={formError.final_agreement}
                />
              </FormControl>
              </Grid>
              <Grid item xs={12}>

              <FormControl fullWidth>
                <FormLabel>
                  <Typography variant="body1" sx={labelStyle}>
                    Agreement Date
                  </Typography>
                </FormLabel>
                <input type="date" 
                name="agreement_date" 
                value={value.agreement_date}  
                min={disablePastDate()} 
                className="DatePicker"   
                onChange={(e) => onChange(e)}
                // error={formError.date && true}
                 />
                <Typography variant = 'caption' sx = {{color : 'red'}}>{formError.agreement_date}</Typography>
              </FormControl>
              </Grid>
              <Grid item xs={12}>

              <FormControl fullWidth>
                <FormLabel>
                  <Typography variant="body1" sx={labelStyle}>
                    Monthly Rent Start Date
                  </Typography>
                </FormLabel>
                <input type="date" 
                name="rent_start_date" 
                value={value.rent_start_date}  
                min={disableRentStartDate()} 
                disabled={value.agreement_date === ""&& true}
                className="DatePicker"  
                onChange={(e)=>{onChange(e);}}
                // error={formError.date && true}
                 />
                <Typography variant = 'caption' sx = {{color : 'red'}}>{formError.rent_start_date}</Typography>
              </FormControl>
              </Grid>
              {/* <MyTextfield /> */}
              
             
            </Grid>
  
            <DialogActions sx={{ mt: 2 }}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                <Button
                fullWidth
                variant="contained"
                sx={{
                  height: 45,
                  color: "#FFFFFF",
                  borderRadius: "15px",
                  textTransform: "capitalize",
                }}
                onClick={validate}
              >
              Upload
              </Button>
                </Grid>
                <Grid item xs={6}>
                <Button
                fullWidth
                variant="outlined"
                sx={{
                  height: 45,
                  borderRadius: "15px",
                  textTransform: "capitalize",
                }}
                onClick={handleClose}
              >
                Close
              </Button>
                </Grid>
              </Grid>
             
              
            </DialogActions>
          </Box>
        </Dialog>
      </>
    );
  }
  
  export default FinalAgreement;