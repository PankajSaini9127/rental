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
        element={isAuth && role.includes("Manager") ? <Agreement /> : <Login />}
      />
      <Route
        exact
        path="/editAgreement/:id"
        history={history}
        element={isAuth && role.includes("Manager")  ? <EditAgreement /> : <Login />}
      />
      <Route
        exact
        path="/listing"
        element={isAuth && role.includes("Manager")  ? <Listing /> : <Login />}
      />
      <Route
        exact
        path="/monthly-payment"
        element={isAuth && role.includes("Manager")  ? <MonthalyList /> : <Login />}
      />
      <Route
        exact
        path="/renewal"
        element={isAuth && role.includes("Manager")  ? <RenewalList /> : <Login />}
      />
      <Route
        exact
        path="/managerApproval/:id"
        element={isAuth && role.includes("Manager")  ? <ManagerApproval /> : <Login />}
      />

      {/* Sr Manager */}

      <Route
        exact
        path="/srManagerDashboard"
        element={
          isAuth && role.includes("Sr Manager") ? <SrManagerDashboard /> : <Login />
        }
      />
      <Route
        exact
        path="/srManagerListing"
        element={
          isAuth && role.includes("Sr Manager") ? <SrManagerListing /> : <Login />
        }
      />
      <Route
        exact
        path="/srManagerApproval/:id"
        element={
          isAuth && role.includes("Sr Manager") ? <SrManagerApproval /> : <Login />
        }
      />

      {/* Operations Section */}

      <Route
        exact
        path="/operationsDashboard"
        element={
          isAuth && role.includes("Operations") ? <OperationsDashboard /> : <Login />
        }
      />
      <Route
        exact
        path="/operationsListing"
        element={
          isAuth && role.includes("Operations") ? <OperationsListing /> : <Login />
        }
      />
      <Route
        exact
        path="/operations-approval/:id"
        element={
          isAuth && role.includes("Operations") ? <ApprovalRequest /> : <Login />
        }
      />

      {/* BHU Section */}
      <Route
        exact
        path="/BHUListing"
        element={isAuth && role.includes("BHU") ? <BHUListing /> : <Login />}
      />
      <Route
        exact
        path="/BHUDashboard"
        element={isAuth && role.includes("BHU") ? <BHUDashBoard /> : <Login />}
      />
      <Route
        exact
        path="/BHUapproval/:id"
        element={isAuth && role.includes("BHU") ? <BHUapproval /> : <Login />}
      />

      {/* Admin Section */}
      <Route
        exact
        path="/userDashboard"
        element={isAuth && role.includes("Admin") ? <UserDashboard /> : <Login />}
      />
      <Route
        exact
        path="/userManagement"
        element={isAuth && role.includes("Admin") ? <UserManagement /> : <Login />}
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
          isAuth && role.includes("Super Admin") ? <SuperAdminDashboard /> : <Login />
        }
      />

      <Route
        exact
        path="/super-admin-newuser"
        element={
          isAuth && role.includes("Super Admin") ? <SuperAdminNewUser /> : <Login />
        }
      />

      <Route
        exact
        path="/super-admin-listing"
        element={
          isAuth && role.includes("Super Admin") ? <SuperAdminListing /> : <Login />
        }
      />
      <Route
        exact
        path="/super-admin-edit/:id"
        element={
          isAuth && role.includes("Super Admin") ? <SuperAdminUserEdit /> : <Login />
        }
      />

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
    </Routes>
  );
}

export default MyRouter;
