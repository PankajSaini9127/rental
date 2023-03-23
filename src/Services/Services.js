import axios from "axios";


//Admin Section start here
export async function LoginAPI(data){
    const user = await axios.post('http://localhost:8080/api/auth/login',data)
   return user ;
}

export async function GetUser (){
    return await axios.get(`http://localhost:8080/api/admin/user`)
}

export async function EditUserInfo (id,data){
    return await axios.put(`http://localhost:8080/api/admin/edit/${id}`,data)
}

export async function AddUser (data){
    return await axios.post(`http://localhost:8080/api/admin/userRegistration`,data);
}

export async function GetSupervisor (role){
    return await axios.post("http://localhost:8080/api/admin/selectRole",role);
}

export async function UpdateStatusAPI (id,data){
    return await axios.put(`http://localhost:8080/api/admin/updateStatus/${id}`,{"status":data})
  
}

//Admin Section Ends Here

//manager sEction start here
export async function add_agreement (data){
    return  axios.post("http://localhost:8080/api/newAgreement",data);
}

export async function add_landlord (data){
    return axios.post('http://localhost:8080/api/add_landlord',data)
}

export async function uploadDoc (data){
    return axios.post('http://localhost:8080/api/uploadDoc',data)
}