import { Box } from "@mui/material"

const vectorStyle={
  backgroundColor:"#FFFFFF",
  borderRadius:"20px",
    height: "50px",
    width: "50px",
    backgroundSize: "cover",
    position: "relative",
    display:"grid",
    placeItems:"center"
  
}

const Vector1 = ()=>{
    return(
      <Box
      sx={vectorStyle}
    >
             <svg
                  width="17"
                  height="17"
                  viewBox="0 0 17 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={"vector"}
                >
                  <path
                    d="M15.5 15.5H8.5C3.25 15.5 1.5 13.75 1.5 8.5V1.5L15.5 15.5Z"
                    stroke="#03C1F3"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <svg
                  width="38"
                  height="38"
                  viewBox="0 0 38 38"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={"vector1"}
                >
                  <path
                    d="M36.5 15.5V24.25C36.5 33 33 36.5 24.25 36.5H13.75C5 36.5 1.5 33 1.5 24.25V13.75C1.5 5 5 1.5 13.75 1.5H22.5"
                    stroke="#03C1F3"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
        </Box>

    )
}


const Vector2 = ()=>{
    return(
      <Box
      sx={vectorStyle}
    >
        <svg
                  width="38"
                  height="30"
                  className={ "vector21"}
                  viewBox="0 0 38 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.5 13.25V9.75C1.5 3.625 5 1 10.25 1H27.75C33 1 36.5 3.625 36.5 9.75V20.25C36.5 26.375 33 29 27.75 29H19"
                    stroke="#03C1F3"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <svg
                  width="32"
                  className={"vector22"}
                  height="18"
                  viewBox="0 0 32 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M30.375 1.625V10.375M1.5 12.125H6.1725H10.845C11.965 12.125 12.875 13.035 12.875 14.155V16.395M19 10.375C20.1603 10.375 21.2731 9.91406 22.0936 9.09359C22.9141 8.27312 23.375 7.16032 23.375 6C23.375 4.83968 22.9141 3.72688 22.0936 2.90641C21.2731 2.08594 20.1603 1.625 19 1.625C17.8397 1.625 16.7269 2.08594 15.9064 2.90641C15.0859 3.72688 14.625 4.83968 14.625 6C14.625 7.16032 15.0859 8.27312 15.9064 9.09359C16.7269 9.91406 17.8397 10.375 19 10.375Z"
                    stroke="#03C1F3"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <svg
                  width="14"
                  className={"vector23"}
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.635 0.988281L1.5 3.12328L3.635 5.25828M12.875 12.3633H3.53C2.41 12.3633 1.5 11.4533 1.5 10.3333V8.09328"
                    stroke="#03C1F3"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <svg
                  width="5"
                  className={"vector24"}
                  height="7"
                  viewBox="0 0 5 7"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.74219 5.50047L3.87719 3.36547L1.74219 1.23047"
                    stroke="#03C1F3"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                </Box>
    )
}


const Vector3 = ()=>{
    return(
        <Box
        sx={vectorStyle}
        >
             <svg
                  className={"vector31"}
                  width="38"
                  height="38"
                  viewBox="0 0 38 38"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.75 36.5H24.25C33 36.5 36.5 33 36.5 24.25V13.75C36.5 5 33 1.5 24.25 1.5H13.75C5 1.5 1.5 5 1.5 13.75V24.25C1.5 33 5 36.5 13.75 36.5Z"
                    stroke="#03C1F3"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <svg
                  className={"vector32"}
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.625 11C20.625 16.32 16.32 20.625 11 20.625C5.68 20.625 2.4425 15.27 2.4425 15.27M2.4425 15.27H6.7825M2.4425 15.27V20.0825M1.375 11C1.375 5.68 5.645 1.375 11 1.375C17.4225 1.375 20.625 6.73 20.625 6.73M20.625 6.73V1.9175M20.625 6.73H16.355"
                    stroke="#03C1F3"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
        </Box>
    )
}


const VectorUser = ()=>{
  return(
    <Box
    sx={vectorStyle}
    >
       <svg width="26" height="30" viewBox="0 0 26 30" fill="none" xmlns="http://www.w3.org/2000/svg">
 <path d="M24.4535 28.3327C24.4535 23.1727 19.3202 18.9993 13.0002 18.9993C6.68021 18.9993 1.54688 23.1727 1.54688 28.3327M13.0002 14.9993C14.7683 14.9993 16.464 14.297 17.7143 13.0467C18.9645 11.7965 19.6669 10.1008 19.6669 8.33268C19.6669 6.56457 18.9645 4.86888 17.7143 3.61864C16.464 2.36839 14.7683 1.66602 13.0002 1.66602C11.2321 1.66602 9.53641 2.36839 8.28616 3.61864C7.03592 4.86888 6.33354 6.56457 6.33354 8.33268C6.33354 10.1008 7.03592 11.7965 8.28616 13.0467C9.53641 14.297 11.2321 14.9993 13.0002 14.9993Z" stroke="#03C1F3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
 </svg>

    </Box>
  )
}

const VectorLogout =()=>{
  return(
    <Box
    sx={{display:"grid",placeItems:"center"}}
    >
      <Box sx={vectorStyle}>
      <svg  className={"logout1"} width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.574 8.49268L14.9873 5.07935L11.574 1.66602M1.33398 5.07935H14.894" stroke="#03C1F3" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

      <svg className={"logout2"} width="13" height="24" viewBox="0 0 13 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 1.33398C6.89333 1.33398 11.6667 5.33398 11.6667 12.0007C11.6667 18.6673 6.89333 22.6673 1 22.6673" stroke="#03C1F3" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</Box>
    </Box>
  )
}

export {Vector1,Vector2,Vector3,VectorUser,VectorLogout}