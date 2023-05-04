import axios from "axios";
import config from "../config.json";
import moment from "moment";

const API_LIVE = config.API_LIVE;

//Super Admin Login
export async function super_admin_Login(data) {
  return await axios.post(`${API_LIVE}/api/auth/super-admin-creds`, data);
}

//Admin Section start here
export async function LoginAPI(data) {
  const user = await axios.post(`${API_LIVE}/api/auth/login`, data);
  return user;
}

export async function get_user(id) {
  return await axios.post(`${API_LIVE}/api/admin/user/${id}`);
}

export async function GetUser(data) {
  return await axios.post(`${API_LIVE}/api/admin/user`, data);
}

export async function EditUserInfo(id, data) {
  return await axios.put(`${API_LIVE}/api/admin/edit/${id}`, data);
}

export async function AddUser(data) {
  return await axios.post(`${API_LIVE}/api/admin/userRegistration`, data);
}

export async function GetSupervisor(role) {
  return await axios.post(`${API_LIVE}/api/admin/selectRole`, role);
}
export async function GetSupervisorSRM(role) {
  return await axios.post(`${API_LIVE}/api/admin/selectRole-srm`, role);
}

export async function UpdateStatusAPI(id, data) {
  return await axios.put(`${API_LIVE}/api/admin/updateStatus/${id}`, {
    status: data,
  });
}

export async function get_emp_code() {
  return await axios.get(`${API_LIVE}/api/admin/get_emp.code`);
}

export async function get_search(name) {
  return await axios.post(`${API_LIVE}/api/admin/user_search/`, { name });
}

//Admin Section Ends Here

//manager sEction start here

export async function get_agreements(manager_id) {
  return axios.get(`${API_LIVE}/api/agreements/${manager_id}`);
}

export async function add_agreement(data) {
  console.log(data);
  return axios.post(`${API_LIVE}/api/newAgreement`, data);
}

export async function add_landlord(data) {
  return axios.post(`${API_LIVE}/api/add_landlord`, data);
}

export async function uploadDoc(data) {
  return axios.post(`${API_LIVE}/api/uploadDoc`, data);
}

export async function get_agreement_id(id) {
  return axios.post(`${API_LIVE}/api/agreement/${id}`);
}

//get monthly rent details by code
export async function get_agreement_code(id) {
  return axios.get(`${API_LIVE}/api/get-monthly-rent-by-code/${id}`);
}

//invoice  number validation
export async function invoice_validation(invoiceNo) {
  return axios.get(`${API_LIVE}/api/get-invoice-number-validate/${invoiceNo}`);
}

//get monthly rent  serarch in sr manager
export async function get_search_monthly_rent_srm(id, search) {
  console.log(search);
  return axios.get(
    `${API_LIVE}/api/srmanager/get-search-srm-monthlyrent?id=${id}&search=${search}`
  );
}
// //get monthly rent  serarch in sr manager
// export async function get_search_monthly_rent_manager (id,search) {
//     console.log(search)
//     return axios.get(`${API_LIVE}/api/srmanager/get-search-monthlyrent?id=${id}&search=${search}`)
// }
// //get monthly rent  serarch in opertaions
export async function get_search_monthly_rent_operations(id, search) {
  console.log(search);
  return axios.get(
    `${API_LIVE}/api/operations/get-search-operations-monthlyrent?id=${id}&search=${search}`
  );
}

// //get monthly rent  serarch in sr manager
// export async function get_search_monthly_rent_finance (id,search) {
//     console.log(search)
//     return axios.get(`${API_LIVE}/api/srmanager/get-search-finance-monthlyrent?id=${id}&search=${search}`)
// }

export async function delete_agreement(id) {
  return await axios.delete(`${API_LIVE}/api/delAgreement/${id}`);
}

export async function getMetaData() {
  return await axios.get(`${API_LIVE}/api/dashboard/get-meta`);
}

export async function get_monthaly_rent(id) {
  return await axios.get(`${API_LIVE}/api/list_monthly/${id}`);
}

export async function get_renewal(id) {
  return await axios.get(`${API_LIVE}/api/get-renewal-list/${id}`);
}

export async function add_invoice(id, data) {
  return await axios.put(`${API_LIVE}/api/add_invoice/${id}`, data);
}

export async function meta() {
  return await axios.get(`${API_LIVE}/api/admin/meta`);
}

export async function getStateList(search) {
  return await axios.get(`${API_LIVE}/api/stateList?search=${search}`);
}

export async function getCityList(search) {
  return await axios.get(`${API_LIVE}/api/cityList?search=${search}`);
}

export async function getDetails(search) {
  return await axios.get(`${API_LIVE}/api/getDetails?id=${search}`);
}

export async function getDetails_renewal(search) {
  return await axios.get(`${API_LIVE}/api/getDetails-renewal?id=${search}`);
}

export async function editAgreement(data) {
  return await axios.patch(`${API_LIVE}/api/editAgreement`, data);
}

export async function get_search_manager(name) {
  return await axios.post(`${API_LIVE}/api/search/manager`, { name });
}

export async function add_monthly_rent(data) {
  return await axios.post(`${API_LIVE}/api/monthly_rent/add`, data);
}

export async function get_landlord_id(id) {
  return await axios.get(`${API_LIVE}/api/month_rent/get_landlord_id/${id}`);
}

//get search in renewal manager
export async function get_search_renewal(searchValue, id) {
  return await axios.get(
    `${API_LIVE}/api/get-search-renewal/${id}?search=${searchValue}`
  );
}

//get search in srm renewal manager
export async function get_search_renewal_srm(searchValue, id) {
  return await axios.get(
    `${API_LIVE}/api/srmanager/get-search-renewal-srm/${id}?search=${searchValue}`
  );
}

//get Depposit
export async function get_deposit_amount(code) {
  return await axios.get(`${API_LIVE}/api/get-deposit-amount?code=${code}`);
}

//senior manager start here

export async function get_srm_agreements(id) {
  return await axios.get(`${API_LIVE}/api/srmanager/get-agreement/${id}`);
}

export async function get_monthlt_rent_srm(id) {
  return await axios.get(`${API_LIVE}/api/srmanager/get-monthly-rent/${id}`);
}

export async function get_rent_data_ID(id) {
  return await axios.get(`${API_LIVE}/api/srmanager/get-monthly-rent-id/${id}`);
}

export async function sendMonthyPaymentForword(id, data) {
  console.log(data);
  return await axios.put(`${API_LIVE}/api/sent-monthly-payment/${id}`, data);
}

//get Renewal in sr manager
export async function get_renewal_srm(id) {
  return await axios.get(`${API_LIVE}/api/srmanager/get-renewal-srm/${id}`);
}

//operations get monthaly rent
export async function get_monthlt_rent_opr(id) {
  return await axios.get(
    `${API_LIVE}/api/operations/opr-monthly-payment/${id}`
  );
}

//finance get monthaly rent
export async function get_monthlt_rent_finance(id) {
  return await axios.get(`${API_LIVE}/api/finance/finance-monthly-rent/${id}`);
}

//search in srmanager
export async function get_search_srmanager(id, name) {
  return await axios.post(`${API_LIVE}/api/srmanager-search/${id}`, { name });
}

//send back to manager
export async function send_back_to_manager(data, id) {
  return await axios.put(`${API_LIVE}/api/send-back/${id}`, data);
}

//send back to manager
export async function get_data_recovery(id) {
  return await axios.get(`${API_LIVE}/api/get-data-recovery/${id}`);
}

//send to BHU
export async function send_to_bhu(data, id) {
  return await axios.put(`${API_LIVE}/api/updateAgreement/${id}`, data);
}

export async function getBankName(data) {
  return await axios.get(`https://ifsc.razorpay.com/${data}`);
}

// BHU Services

export async function get_BHU_agreements(data) {
  return await axios.get(`${API_LIVE}/api/BHU/get-agreement/${data}`);
}

//send to BHU
export async function send_to_operations(data, id) {
  return await axios.put(`${API_LIVE}/api/BHU/updateAgreement/${id}`, data);
}

export async function get_Operations_agreements(data) {
  return await axios.get(`${API_LIVE}/api/operations/get-agreement/${data}`);
}

//operations
export async function get_agreement_operation(id) {
  axios.get(`${config.API_LIVE}/api/operations/getagreement/${id}`);
}

// search state and city based on  Pin code

export async function getLocation(pincode) {
  return await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);
  //    return await axios.get(`https://api.postalpincode.in/pincode/110001`)
}

//finance

export async function get_finance_agreements(data) {
  return await axios.get(`${API_LIVE}/api/finance/get-agreement/${data}`);
}

export async function ApprovedByFinance(data, id) {
  return await axios.put(
    `${API_LIVE}/api/finance/updateAgreement/finance/${id}`,
    data
  );
}

// APIs for finalize the Agreement
export async function setFinalAgreement(data) {
  return await axios.put(`${API_LIVE}/api/setFinalAgreement`, data);
}

// APIs for listMonthRent
export async function listMonthRent(manager_id) {
  return await axios.get(`${API_LIVE}/api/listMonthRent/${manager_id}`);
}

// APIs for listMonthRent
export async function insertAdjustmentAmount(data) {
  return await axios.post(`${API_LIVE}/api/insertAdjustmentAmount`, data);
}

// APIs for listMonthRent
export async function insertRecoveryLog(data) {
  return await axios.post(`${API_LIVE}/api/finance/insertRecoveryLog`, data);
}

// APIs for listMonthRent
export async function getRecoveryLog(data) {
  return await axios.get(`${API_LIVE}/api/finance/getRecoveryLog?id=${data}`);
}

// APIs for MIS Reports
export function excelDownload(reports, id, role, startDate, endDate) {
  //   console.log(`${API_LIVE}/api/${url}`);

  const url =
    reports === "Rental Property Dump Report"
      ? "mis/get-rental-property-dump-report"
      : reports === "Rental Payment MIS"
      ? "mis/rental-payment-mis"
      : reports === "Rental Onboarding MIS (All Status)"
      ? "mis/rental-onboarding-all-status"
      : reports === "Rental Onboarding MIS (Deposited)"
      ? "mis/rental-onboarding-deposited"
      : reports === "rent-paid-schedule"
      ? "mis/rent-paid-schedule"
      : reports === "No of agreements"
      ? "mis/no-of-agreements"
      : reports === "Monthly rent"
      ? "mis/monthly-rent"
      : reports === "Monthly deposit" && "mis/monthly-deposit";

  const excelName =
    reports === "Rental Property Dump Report"
      ? "rental-property-dump-report"
      : reports === "Rental Payment MIS"
      ? "rental-payment-mis"
      : reports === "Rental Onboarding MIS (All Status)"
      ? "rental-onboarding-all-status"
      : reports === "Rental Onboarding MIS (Deposited)"
      ? "rental-onboarding-deposited"
      : reports === "rent-paid-schedule"
      ? "rent-paid-schedule"
      : reports === "No of agreements"
      ? "no-of-agreements"
      : reports === "Monthly rent"
      ? "monthly-rent"
      : reports === "Monthly deposit" && "monthly-deposit";

  console.log({ reports, url, excelName });

  const requestBody = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  fetch(
    `${API_LIVE}/api/${url}?startDate=${startDate}&endDate=${endDate}&id=${id}&role=${role}`,
    requestBody
  )
    .then((response) => response.blob())
    .then((result) => {
      // console.log(result);
      var data = new Blob([result], { type: "text/xlsx" });
      var csvURL = window.URL.createObjectURL(data);
      var tempLink = document.createElement("a");
      tempLink.href = csvURL;
      tempLink.setAttribute(
        "download",
        `${excelName}-${startDate}-${endDate}.xlsx`
      );
      tempLink.click();
    });
}

export async function graphReports(id, role) {
  // let data = [];
  const url = "mis/graph-reports";
  const date = moment().format("yyyy");
  const startDate = `${date}-04-01`;
  const endDate = `${moment(date).add(12, "M").format("YYYY")}-03-31`;

  return await axios.get(
    `${API_LIVE}/api/${url}?startDate=${startDate}&endDate=${endDate}&id=${id}&role=${role}`
  );
}
