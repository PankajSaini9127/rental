// Actions for Alert
export const setAlert = (parameters) => {
    return {
        type: 'NOTIFY',
        payload: parameters
    }
}
// Actions for Auth
export const setAuth = (parameters) => {
    return {
        type: 'AUTH',
        payload: parameters
    }
}
// Actions for change to dark mode
export const setMode = (parameters) => {
    return {
        type: 'MODE',
        payload: parameters
    }
}
// Actions for change to dark mode
export const setTab = (parameters) => {
    return {
        type: 'TAB',
        payload: parameters
    }
}

// for refresh token Box 

export const setRefreshBox = (parameters) => {
    return {
        type: 'REFRESH',
        payload: parameters
    }
}

export const addLandLoard = (data)=>{
    console.log(data)
    return{
        type: "ADD_LANDLOARD",
        payload : data
    }
}

export const setForm = (data)=>{
    return {
        type : "FORM",
        payload : data
    } 
}