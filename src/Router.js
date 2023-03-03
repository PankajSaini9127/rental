import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

//components

import AdminLogin from './Components/AdminPanel/AdminLogin'
import NewUser from './Components/AdminPanel/NewUser'
import UserDashboard from './Components/AdminPanel/UserDashboard'
import UserManagement from './Components/AdminPanel/UserManagement'

import AgreementApproval from './Components/SrManager/AgreementApproval'
import PendingApproval from './Components/SrManager/ManagerApproval'
import CEOApproval from './Components/Ceo Approval/CEOApproval'
import CeoSendBack from './Components/Ceo Approval/CeoSendBack'
import ApprovalRequest from './Components/Operations/ApprovalRequest'
import RejectApproval from './Components/Operations/RejectApproval'
import ApprovedList from './Components/FinanceTeam/ApprovedList'
import FinanceStatus from './Components/FinanceTeam/Status'

import Login from './Components/Manager/Login'
import Dashboard from './Components/Manager/Dashboard'
import Agreement from './Components/Manager/Agreement';
import Listing from './Components/Manager/Listing';
import ManagerLogin from './Components/SrManager/SrManagerLogin';
import SrManagerListing from './Components/SrManager/SrManagerListing'
import SrManagerDashboard from './Components/SrManager/SrManagerDashboard'
import OperationsLogin from './Components/Operations/Login'
import OperationsListing from './Components/Operations/OperationsListing'

function Router() {
  return (
    <BrowserRouter>
    <Routes>
        <Route exact path='/' element={<Login/>}/>
        <Route exact path='/srManagerLogin' element={<ManagerLogin/>}/>
        <Route exact path='/operationsLogin' element={<OperationsLogin/>}/>
        <Route exact path='/dashboard' element={<Dashboard/>}/>
        <Route exact path='/newAgreement' element={<Agreement/>}/>
        <Route exact path='/listing' element={<Listing/>}/>
        <Route exact path='/operationsListing' element={<OperationsListing/>}/>
        <Route exact path='/srManagerDashboard' element={<SrManagerDashboard/>}/>

        <Route exact path='/newUser' element={<NewUser/>}/>
        <Route exact path='/userDashboard' element={<UserDashboard/>}/>
        <Route exact path='/userManagement' element={<UserManagement/>}/>
        <Route exact path='/agreementApproval' element={<AgreementApproval/>}/>
        <Route exact path='/srManagerListing' element={<SrManagerListing/>}/>
        <Route exact path='/pendingApproval' element={<PendingApproval/>}/>
        <Route exact path='/ceoApproval' element={<CEOApproval/>}/>
        <Route exact path='/ceosendBack' element={<CeoSendBack/>}/>


        <Route exact path='/operationsApproval' element={<ApprovalRequest/>}/>
        <Route exact path='/OperationsReject' element={<RejectApproval/>}/>
        <Route exact path='/financeApproved' element={<ApprovedList/>}/>
        <Route exact path='/financeStatus' element={<FinanceStatus/>}/>


        <Route exact path='/adminLogin' element={<AdminLogin/>}/>


    </Routes>
    </BrowserRouter>
  )
}

export default Router