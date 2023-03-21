const ADD_AUTH = (data)=>{
    return {
        type:"ADD_AUTH",
        payload:data
    }
}
const setAlert = (data)=>{
    return {
        type:"ALERT",
        payload:data
    }
}


export {ADD_AUTH,setAlert}