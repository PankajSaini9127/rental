import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

//components
import Dashboard from './Components/Dashboard'
import Login from './Components/Login'
import Listing from './Components/Listing'
import Agreement from './Components/Agreement'
import NewUser from './Components/AdminPanel/NewUser'
import UserDashboard from './Components/AdminPanel/UserDashboard'
import UserManagement from './Components/AdminPanel/UserManagement'
import AdminLogin from './Components/AdminPanel/AdminLogin'
import AgreementApproval from './Components/Manager/AgreementApproval'
import RentalLogin from './Components/RentalPortal/RentalLogin'
import PendingApproval from './Components/Manager/ManagerApproval'
import CEOApproval from './Components/Ceo Approval/CEOApproval'
import CeoSendBack from './Components/Ceo Approval/CeoSendBack'
import ApprovalRequest from './Components/FinanceTeam/ApprovalRequest'
import RejectApproval from './Components/FinanceTeam/RejectApproval'
import ApprovedList from './Components/FinanceTeam/ApprovedList'
import ApprovedByManager from './Components/Manager/ApprovedByManager'
import FinanceStatus from './Components/FinanceTeam/Status'

function Router() {
  return (
    <BrowserRouter>
    <Routes>
        <Route exact path='/' element={<Login/>}/>
        <Route exact path='/dashboard' element={<Dashboard/>}/>
        <Route exact path='/newAgreement' element={<Agreement/>}/>
        <Route exact path='/listing' element={<Listing/>}/>
        <Route exact path='/newUser' element={<NewUser/>}/>
        <Route exact path='/userDashboard' element={<UserDashboard/>}/>
        <Route exact path='/userManagement' element={<UserManagement/>}/>
        <Route exact path='/agreementApproval' element={<AgreementApproval/>}/>
        <Route exact path='/mangerApproved' element={<ApprovedByManager/>}/>
        <Route exact path='/pendingApproval' element={<PendingApproval/>}/>
        <Route exact path='/ceoApproval' element={<CEOApproval/>}/>
        <Route exact path='/ceosendBack' element={<CeoSendBack/>}/>


        <Route exact path='/financeTeamApproval' element={<ApprovalRequest/>}/>
        <Route exact path='/financeTeamReject' element={<RejectApproval/>}/>
        <Route exact path='/financeApproved' element={<ApprovedList/>}/>
        <Route exact path='/financeStatus' element={<FinanceStatus/>}/>


        <Route exact path='/adminLogin' element={<AdminLogin/>}/>


    </Routes>
    </BrowserRouter>
  )
}

export default Router