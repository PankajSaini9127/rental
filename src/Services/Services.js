import axios from "axios";
import config from "../config.json"

const API_LIVE = config.API_LIVE

//Admin Section start here
export async function LoginAPI(data){
    const user = await axios.post(`${API_LIVE}/api/auth/login`,data)
   return user ;
}

export async function get_user(id){
    console.log(id)
    return await axios.post(`${API_LIVE}/api/admin/user/${id}`)
}

export async function GetUser (){
    return await axios.get(`${API_LIVE}/api/admin/user`)
}

export async function EditUserInfo (id,data){
    return await axios.put(`${API_LIVE}/api/admin/edit/${id}`,data)
}

export async function AddUser (data){
    return await axios.post(`${API_LIVE}/api/admin/userRegistration`,data);
}

export async function GetSupervisor (role){
    return await axios.post(`${API_LIVE}/api/admin/selectRole`,role);
}

export async function UpdateStatusAPI (id,data){
    return await axios.put(`${API_LIVE}/api/admin/updateStatus/${id}`,{"status":data})
  
}

//Admin Section Ends Here

//manager sEction start here


export async function add_agreement (data){
    return  axios.post(`${API_LIVE}/api/newAgreement`,data);
}

export async function add_landlord (data){
    return axios.post(`${API_LIVE}/api/add_landlord`,data)
}

export async function uploadDoc (data){
    return axios.post(`${API_LIVE}/api/uploadDoc`,data)
}

export async function get_agreement_id (id) {
    return axios.post(`${API_LIVE}/api/agreement/${id}`)
}