import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

//components

//manager Section
import Login from "./Components/Login/Login";
import Dashboard from "./Components/Manager/Dashboard";
import Listing from "./Components/Manager/Listing";
import Agreement from "./Components/Manager/Agreement";
import EditAgreement from "./Components/Manager/EditAgreement";
import ManagerApproval from "./Components/Manager/ManagerApproval";
import MonthalyList from "./Components/MonthalyPayment/MonthalyList";
import RenewalList from "./Components/Renewal/RenewalList";
import RenewalEditAgreement from "./Components/Renewal/EditAgreement";
import RenewalDepositeRefund from "./Components/Manager/DepositeRefund";

import RentPaidSchedule from "./Components/SuperAdmin/RentPaidSchedule";
import GraphReports from "./Components/SuperAdmin/GraphReports";
import RentalMisReports from "./Components/SuperAdmin/RentalMisReport";
//sr MAnager section
import SrManagerDashboard from "./Components/SrManager/SrManagerDashboard";
import SrManagerListing from "./Components/SrManager/SrManagerListing";
import SrManagerApproval from "./Components/SrManager/SrManagerApproval";

//opertaions Section
import OperationsListing from "./Components/Operations/OperationsListing";
import OperationsDashboard from "./Components/Operations/OperationsDashboard";
import ApprovalRequest from "./Components/Operations/ApprovalRequest";
// import RejectApproval from './Components/Operations/RejectApproval'

//BHU Section
import BHUListing from "./Components/BHU/BHUListing";
import BHUDashBoard from "./Components/BHU/BHUDashboard";
import BHUapproval from "./Components/BHU/BHUapproval";

//Admin Section
import NewUser from "./Components/AdminPanel/NewUser";
import UserDashboard from "./Components/AdminPanel/UserDashboard";
import UserManagement from "./Components/AdminPanel/UserManagement";

//Reset Password Section
import ForgotPassword from "./Components/ResetPassword/ForgotPassword";
import EmailVerify from "./Components/ResetPassword/EmailVerify";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import EditUser from "./Components/AdminPanel/EditUser";
import { useSelector } from "react-redux";
import SuperAdminDashboard from "./Components/SuperAdmin/Super-admin-dashboard";
import SuperAdminNewUser from "./Components/SuperAdmin/NewUser";
import SuperAdminListing from "./Components/SuperAdmin/SuperUserListing";
import SuperAdminUserEdit from "./Components/SuperAdmin/EditUser";
import FinanceDashboard from "./Components/FinancePanel/FinanceDashboard";
import FinanceListing from "./Components/FinancePanel/FinanceListing";
import FinanceApproval from "./Components/FinancePanel/ApprovalRequest";
import MonthlyPayement from "./Components/SrManager/Montly-rent/MonthlyPayement";
// import BUHMonthlyPayement from "./Components/BHU/Montly-rent/MonthlyPayement";
import FinanceMonthlyPayement from "./Components/FinancePanel/Montly-rent/MonthlyPayement";
import OperationsMonthlyPayement from "./Components/Operations/Montly-rent/MonthlyPayement";
import MonthalyRentView from "./Components/Operations/Montly-rent/MonthalyRentView";
import SRMMonthlyRentView from "./Components/SrManager/Montly-rent/SRMMonthlyRentView";
import FinanceMonthlyRentView from "./Components/FinancePanel/Montly-rent/FinanceMonthlyView";
import Recovery from "./Components/FinancePanel/Recovery";
import EditInvoice from "./Components/MonthalyPayment/EditInvoice";
import ViewPage from "./Components/MonthalyPayment/ViewPage";
import SrmRenwalList from "./Components/SrManager/Renewal/RenewalListing";
import RenewalViewPage from "./Components/Renewal/ViewPage";
import RentalPropertyDumpReport from "./Components/SuperAdmin/RentalPropertyDumpReport";
import RentalPaymentMIS from "./Components/SuperAdmin/RentalPaymentMIS";
import RentalOnboardingAllStatus from "./Components/SuperAdmin/RentalOnboardingAllStatus";
import RentalOnboardingDeposited from "./Components/SuperAdmin/RentalOnboardingDeposited";
// import RentPaidSchedule from "./Components/SuperAdmin/RentPaidSchedule";

function MyRouter() {
  const history = useNavigate();

  const { auth } = useSelector((s) => s);

  const { role, isAuth } = auth;

  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route
        exact
        path="/dashboard"
        element={isAuth && role.includes("Manager") ? <Dashboard /> : <Login />}
      />
      <Route
        exact
        path="/newAgreement"
        history={history}
        element={isAuth && role.includes("Manager") ? <Agreement /> : <Login />}
      />
      <Route
        exact
        path="/editAgreement/:id"
        history={history}
        element={
          isAuth && role.includes("Manager") ? <EditAgreement /> : <Login />
        }
      />
      <Route
        exact
        path="/listing/:params"
        element={isAuth && role.includes("Manager") ? <Listing /> : <Login />}
      />
      <Route
        exact
        path="/monthly-payment/:type"
        element={
          isAuth && role.includes("Manager") ? <MonthalyList /> : <Login />
        }
      />
      <Route
        exact
        path="/monthly-payment-edit/:id"
        element={
          isAuth && role.includes("Manager") ? <EditInvoice /> : <Login />
        }
      />
      <Route
        exact
        path="/monthly-payment-view/:id"
        element={isAuth && role.includes("Manager") ? <ViewPage /> : <Login />}
      />
      <Route
        exact
        path="/renewal-edit-agreement/:id"
        element={
          isAuth && role.includes("Manager") ? (
            <RenewalEditAgreement />
          ) : (
            <Login />
          )
        }
      />
      <Route
        exact
        path="/renewal-view-agreement/:id"
        element={
          isAuth && role.includes("Manager") ? <RenewalViewPage /> : <Login />
        }
      />
      <Route
        exact
        path="/renewal-deposit-refund/:id"
        element={
          isAuth && role.includes("Manager") ? (
            <RenewalDepositeRefund />
          ) : (
            <Login />
          )
        }
      />
      <Route
        exact
        path="/renewal"
        element={
          isAuth && role.includes("Manager") ? <RenewalList /> : <Login />
        }
      />
      <Route
        exact
        path="/managerApproval/:id"
        element={
          isAuth && role.includes("Manager") ? <ManagerApproval /> : <Login />
        }
      />
      {/* Sr Manager */}
      <Route
        exact
        path="/srManagerDashboard"
        element={
          isAuth && role.includes("Senior_Manager") ? (
            <SrManagerDashboard />
          ) : (
            <Login />
          )
        }
      />
      <Route
        exact
        path="/srManagerListing/:type"
        element={
          isAuth && role.includes("Senior_Manager") ? (
            <SrManagerListing />
          ) : (
            <Login />
          )
        }
      />
      <Route
        exact
        path="/srManagerApproval/:id"
        element={
          isAuth && role.includes("Senior_Manager") ? (
            <SrManagerApproval />
          ) : (
            <Login />
          )
        }
      />
      <Route
        exact
        path="/srm-monthly-rent/:type"
        element={
          isAuth && role.includes("Senior_Manager") ? (
            <MonthlyPayement />
          ) : (
            <Login />
          )
        }
      />
      <Route
        exact
        path="/srm-monthly-view/:id"
        element={
          isAuth && role.includes("Senior_Manager") ? (
            <SRMMonthlyRentView />
          ) : (
            <Login />
          )
        }
      />
      <Route
        exact
        path="/srm-renewal-list"
        element={
          isAuth && role.includes("Senior_Manager") ? (
            <SrmRenwalList />
          ) : (
            <Login />
          )
        }
      />
      {/* Operations Section */}
      <Route
        exact
        path="/operationsDashboard"
        element={
          isAuth && role.includes("Operations") ? (
            <OperationsDashboard />
          ) : (
            <Login />
          )
        }
      />
      <Route
        exact
        path="/operationsListing/:type"
        element={
          isAuth && role.includes("Operations") ? (
            <OperationsListing />
          ) : (
            <Login />
          )
        }
      />
      <Route
        exact
        path="/operations-approval/:id"
        element={
          isAuth && role.includes("Operations") ? (
            <ApprovalRequest />
          ) : (
            <Login />
          )
        }
      />
      <Route
        exact
        path="/opr-monthly-rent/:type"
        element={
          isAuth && role.includes("Operations") ? (
            <OperationsMonthlyPayement />
          ) : (
            <Login />
          )
        }
      />
      <Route
        exact
        path="/opr-monthly-view/:id"
        element={
          isAuth && role.includes("Operations") ? (
            <MonthalyRentView />
          ) : (
            <Login />
          )
        }
      />
      {/* BHU Section */}
      <Route
        exact
        path="/BHUListing/:type"
        element={isAuth && role.includes("BUH") ? <BHUListing /> : <Login />}
      />
      <Route
        exact
        path="/BHUDashboard"
        element={isAuth && role.includes("BUH") ? <BHUDashBoard /> : <Login />}
      />
      <Route
        exact
        path="/BHUapproval/:id"
        element={isAuth && role.includes("BUH") ? <BHUapproval /> : <Login />}
      />
      {/* Admin Section */}
      <Route
        exact
        path="/userDashboard"
        element={
          isAuth && role.includes("Admin") ? <UserDashboard /> : <Login />
        }
      />
      <Route
        exact
        path="/userManagement"
        element={
          isAuth && role.includes("Admin") ? <UserManagement /> : <Login />
        }
      />
      <Route
        exact
        path="/newUser"
        element={isAuth && role.includes("Admin") ? <NewUser /> : <Login />}
      />
      <Route
        exact
        path="/editUser/:id"
        element={isAuth && role.includes("Admin") ? <EditUser /> : <Login />}
      />
      {/* super Admin */}
      <Route
        exact
        path="/super-admin-dashboard"
        element={
          isAuth && role.includes("Super Admin") ? (
            <SuperAdminDashboard />
          ) : (
            <Login />
          )
        }
      />
      <Route
        exact
        path="/super-admin-newuser"
        element={
          isAuth && role.includes("Super Admin") ? (
            <SuperAdminNewUser />
          ) : (
            <Login />
          )
        }
      />
      <Route
        exact
        path="/super-admin-listing"
        element={
          isAuth && role.includes("Super Admin") ? (
            <SuperAdminListing />
          ) : (
            <Login />
          )
        }
      />
      <Route
        exact
        path="/super-admin-edit/:id"
        element={
          isAuth && role.includes("Super Admin") ? (
            <SuperAdminUserEdit />
          ) : (
            <Login />
          )
        }
      />

      {/* mis  */}
      <Route
        exact
        path="/rental-property-dump-report"
        element={
          isAuth  ? (
            <RentalPropertyDumpReport />
          ) : (
            <Login />
          )
        }
      />
      <Route
        exact
        path="/rental-payment-mis"
        element={
          isAuth ? (
            <RentalPaymentMIS />
          ) : (
            <Login />
          )
        }
      />
      <Route
        exact
        path="/rental-onboarding-all-status"
        element={
          isAuth  ? (
            <RentalOnboardingAllStatus />
          ) : (
            <Login />
          )
        }
      />
      <Route
        exact
        path="/rental-onboarding-deposited"
        element={
          isAuth  ? (
            <RentalOnboardingDeposited />
          ) : (
            <Login />
          )
        }
      />
      <Route
        exact
        path="/rent-paid-schedule"
        element={
          isAuth  ? (
            <RentPaidSchedule />
          ) : (
            <Login />
          )
        }
      />
      {/*Super Admin Ends Here */}
      {/* Finance team start here */}
      <Route
        path="/finance-dashboard"
        element={
          isAuth && role.includes("Finance") ? <FinanceDashboard /> : <Login />
        }
      />
      <Route
        path="/finance-listing/:type"
        element={
          isAuth && role.includes("Finance") ? <FinanceListing /> : <Login />
        }
      />
      <Route
        path="/finance-approval/:id"
        element={
          isAuth && role.includes("Finance") ? <FinanceApproval /> : <Login />
        }
      />
      <Route
        path="/finance-monthly-rent/:type"
        element={
          isAuth && role.includes("Finance") ? (
            <FinanceMonthlyPayement />
          ) : (
            <Login />
          )
        }
      />
      <Route
        path="/finance-monthly-view/:id"
        element={
          isAuth && role.includes("Finance") ? (
            <FinanceMonthlyRentView />
          ) : (
            <Login />
          )
        }
      />
      <Route
        path="/balance_recovery/:id"
        element={isAuth && role.includes("Finance") ? <Recovery /> : <Login />}
      />
      {/* Finance team end here */}
      {/* passowrd section Reset */}
      <Route
        path={"/resetPassword"}
        element={<ForgotPassword history={history} />}
      />
      <Route path={"/emailVerify"} element={<EmailVerify />} />
      <Route
        path={"/newPassword/:email"}
        element={<ResetPassword history={history} />}
      />

      <Route
        exact
        path="/rental-mis-reports"
        element={
          isAuth  ? (
            <RentalMisReports />
          ) : (
            <Login />
          )
        }
      />
        <Route
        exact
        path="/graph-reports"
        element={
          isAuth  ? <GraphReports /> : <Login />
        }
      />
      <Route
        exact
        path="/rent-paid-schedule"
        element={isAuth ? <RentPaidSchedule /> : <Login />}
      />
    </Routes>
  );
}

export default MyRouter;