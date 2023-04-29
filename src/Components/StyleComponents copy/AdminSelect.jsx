import { FormControl, Grid, InputLabel, MenuItem, Select, Typography } from "@mui/material"

const AdminSelect = ({name,multiple,value,label,onBlur,errMsg,touched,options,onChange})=>{
    return(
        <Grid item md={4} xs={6} sx={{mb:'0px !important','@media(max-width:900px)':{my:1}}}>
        <FormControl fullWidth >
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
          <Select
            name={name}
            multiple={multiple}
            onChange={(e) => onChange(e)}
            variant="outlined"
            labelId="demo-simple-select-label"
            value={value}
            label={label}
            onBlur={onBlur}
            error={errMsg && touched ? true : false}
            sx={{
              mt: "0px !important",
              color: "rgba(16, 99, 173, 0.47)",
              width: "100%",
              height:'50px !important',
              boxShadow: "none",
              
            }}
          >
            {
              options.map((item,i)=>{
                return <MenuItem  value={item}>{item}</MenuItem>
              })
            }
          </Select>
          { errMsg && touched? <Typography variant="body1" color="red" mt={1}>{errMsg}</Typography>:null}
        </FormControl>
      </Grid>
    )
}

export {AdminSelect}