import axios from "axios";
import config from "../config.json"

const API_LIVE = config.API_LIVE


//Super Admin Login
export async function super_admin_Login(data){
    return await axios.post(`${API_LIVE}/api/auth/super-admin-creds`,data)
}

//Admin Section start here
export async function LoginAPI(data){
    const user = await axios.post(`${API_LIVE}/api/auth/login`,data)
   return user ;
}

export async function get_user(id){
    return await axios.post(`${API_LIVE}/api/admin/user/${id}`)
}

export async function GetUser (data){
    return await axios.post(`${API_LIVE}/api/admin/user`,data)
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
export async function GetSupervisorSRM (role){
    return await axios.post(`${API_LIVE}/api/admin/selectRole-srm`,role);
}


export async function UpdateStatusAPI (id,data){
    return await axios.put(`${API_LIVE}/api/admin/updateStatus/${id}`,{"status":data})
  
}

export async function get_emp_code (){
    return await axios.get(`${API_LIVE}/api/admin/get_emp.code`)
}


export async function get_search (name){
     return await axios.post(`${API_LIVE}/api/admin/user_search/`,{name})
}

//Admin Section Ends Here

//manager sEction start here

export async function get_agreements (){
    return axios.get(`${API_LIVE}/api/agreements`)
}

export async function add_agreement (data){
    console.log(data)
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

export async function delete_agreement (id){
    return await axios.delete(`${API_LIVE}/api/delAgreement/${id}`)
}

export async function getMetaData (){
     return await axios.get(`${API_LIVE}/api/dashboard/get-meta`)
}



export async function get_monthaly_rent(id){
    return await axios.get(`${API_LIVE}/api/list_monthly/${id}`)
}

export async function get_renewal(){
    return await axios.get(`${API_LIVE}/api/list_teure`)
}

export async function add_invoice(id,data){
    return await axios.put(`${API_LIVE}/api/add_invoice/${id}`,data)
}

export async function meta(){
    return await axios.get(`${API_LIVE}/api/admin/meta`)
}

export async function getStateList(search){
    return await axios.get(`${API_LIVE}/api/stateList?search=${search}`)
}

export async function getCityList(search){
    return await axios.get(`${API_LIVE}/api/cityList?search=${search}`)
}

export async function getDetails(search){
    return await axios.get(`${API_LIVE}/api/getDetails?id=${search}`)
}
export async function editAgreement(data){
    return await axios.patch(`${API_LIVE}/api/editAgreement`,data)
}

export async function get_search_manager (name){
    return await axios.post(`${API_LIVE}/api/search/manager`,{name})
}

export async function add_monthly_rent (data){
    return await axios.post(`${API_LIVE}/api/monthly_rent/add`,data)
}

export async function get_landlord_id (id){
    return await axios.get(`${API_LIVE}/api/month_rent/get_landlord_id/${id}`)
}


//senior manager start here

export async function get_srm_agreements(id){
    return await axios.get(`${API_LIVE}/api/srmanager/get-agreement/${id}`)
}

export async function get_monthlt_rent_srm (id){
    return await axios.get(`${API_LIVE}/api/srmanager/get-monthly-rent/${id}`)
}

export async function get_rent_data_ID(id){
    return await axios.get(`${API_LIVE}/api/srmanager/get-monthly-rent-id/${id}`)
}

export async function sendMonthyPaymentForword(id,data){
    return await axios.put(`${API_LIVE}/api/sent-monthly-payment/${id}`,data)
}

//operations get monthaly rent 
export async function get_monthlt_rent_opr(id){
    return await axios.get(`${API_LIVE}/api/operations/opr-monthly-payment/${id}`)
}

//finance get monthaly rent 
export async function get_monthlt_rent_finance(id){
    return await axios.get(`${API_LIVE}/api/finance/finance-monthly-rent/${id}`)
}





//search in srmanager
export async function get_search_srmanager (id,name){
    return await axios.post(`${API_LIVE}/api/srmanager-search/${id}`,{name})
}

//send back to manager 
export async function send_back_to_manager (data,id){
    return await axios.put(`${API_LIVE}/api/send-back/${id}`,data)
}


//send to BHU 
export async function send_to_bhu (data,id){
    return await axios.put(`${API_LIVE}/api/updateAgreement/${id}`,data)
}

export async function getBankName(data){
    return await axios.get(`https://ifsc.razorpay.com/${data}`)
}

// BHU Services 

export async function get_BHU_agreements(data){
    return await axios.get(`${API_LIVE}/api/BHU/get-agreement/${data}`)
}

//send to BHU 
export async function send_to_operations (data,id){
    return await axios.put(`${API_LIVE}/api/BHU/updateAgreement/${id}`,data)
}


export async function get_Operations_agreements(data){
    return await axios.get(`${API_LIVE}/api/operations/get-agreement/${data}`)
}


//operations 
export async function get_agreement_operation (id){
    axios.get(`${config.API_LIVE}/api/operations/getagreement/${id}`)
}

// search state and city based on  Pin code

export async function getLocation (pincode){
   return await axios.get(`https://api.postalpincode.in/pincode/${pincode}`)
//    return await axios.get(`https://api.postalpincode.in/pincode/110001`)
}


//finance

export async function get_finance_agreements(data){
    return await axios.get(`${API_LIVE}/api/finance/get-agreement/${data}`)
}

export async function ApprovedByFinance (data,id){
    return await axios.put(`${API_LIVE}/api/finance/updateAgreement/finance/${id}`,data)
}


// APIs for finalize the Agreement
export async function setFinalAgreement (data){
    return await axios.put(`${API_LIVE}/api/setFinalAgreement`,data)
}

// APIs for listMonthRent
export async function listMonthRent (data){
    return await axios.get(`${API_LIVE}/api/listMonthRent`)
}
