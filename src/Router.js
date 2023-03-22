import React from 'react'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'

//components

//manager Section
import Login from './Components/Login/Login'
import Dashboard from './Components/Manager/Dashboard'
import Listing from './Components/Manager/Listing';
import Agreement from './Components/Manager/Agreement';
import EditAgreement from './Components/Manager/EditAgreement';
import MonthalyList from './Components/MonthalyPayment/MonthalyList'
import RenewalList from './Components/Renewal/RenewalList'

//sr MAnager section
import ManagerLogin from './Components/SrManager/SrManagerLogin';
import SrManagerDashboard from './Components/SrManager/SrManagerDashboard'
import SrManagerListing from './Components/SrManager/SrManagerListing'
import SrManagerApproval from './Components/SrManager/SrManagerApproval'
import SendBack from './Components/SrManager/SendBack'

//opertaions Section
import OperationsLogin from './Components/Operations/Login'
import OperationsListing from './Components/Operations/OperationsListing'
import ApprovalRequest from './Components/Operations/ApprovalRequest'
import RejectApproval from './Components/Operations/RejectApproval'

//Admin Section 
import AdminLogin from './Components/AdminPanel/AdminLogin'
import NewUser from './Components/AdminPanel/NewUser'
import UserDashboard from './Components/AdminPanel/UserDashboard'
import UserManagement from './Components/AdminPanel/UserManagement'

//Reset Password Section
import ForgotPassword from './Components/ResetPassword/ForgotPassword'
import EmailVerify from './Components/ResetPassword/EmailVerify'
import ResetPassword from './Components/ResetPassword/ResetPassword'
import EditUser from './Components/AdminPanel/EditUser';
import ManagerApproval from './Components/Manager/ManagerApproval';

function MyRouter() {
  const history = useNavigate();
  return (

    <Routes>


        <Route exact path='/' element={<Login/>}/>
        <Route exact path='/dashboard' element={<Dashboard/>}/>
        <Route exact path='/newAgreement' element={<Agreement/>}/>
        <Route exact path='/editAgreement/:id' element={<EditAgreement/>}/>
        <Route exact path='/listing' element={<Listing/>}/>
        <Route exact path='/monthly-payment' element={<MonthalyList/>}/>
        <Route exact path='/renewal' element={<RenewalList/>}/>
        <Route exact path='/managerApproval/:id' element={<ManagerApproval/>}/>


         {/* Sr Manager */}

        <Route exact path='/srManagerLogin' element={<ManagerLogin/>}/>
        <Route exact path='/srManagerDashboard' element={<SrManagerDashboard/>}/>
        <Route exact path='/srManagerListing' element={<SrManagerListing/>}/>
        <Route exact path='/srManagerApproval/:id' element={<SrManagerApproval/>}/>
        <Route exact path='/backToManager' element={<SendBack/>}/>


         {/* Operations Section */}

        <Route exact path='/operationsLogin' element={<OperationsLogin/>}/>
        <Route exact path='/operationsListing' element={<OperationsListing/>}/>
        <Route exact path='/operationsApproval/:id' element={<ApprovalRequest/>}/>
        <Route exact path='/operationsReject' element={<RejectApproval/>}/>


       {/* Admin Section */}

        <Route exact path='/adminLogin' element={<AdminLogin/>}/>
        <Route exact path='/userDashboard' element={<UserDashboard/>}/>
        <Route exact path='/userManagement' element={<UserManagement/>}/>
        <Route exact path='/newUser' element={<NewUser/>}/>
        <Route exact path='/editUser/:id' element={<EditUser/>}/>



        {/* passowrd section Reset */}

        <Route path={'/resetPassword'} element={<ForgotPassword history = {history}/>} />
        <Route path={'/emailVerify'} element={<EmailVerify/>} />
        <Route path={'/newPassword/:email'} element={<ResetPassword history = {history}/>} />
        

    </Routes>
  )
}

export default MyRouter