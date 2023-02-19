import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

//components
import Dashboard from './Components/Dashboard'
import Login from './Components/Login'
import Listing from './Components/Listing'
import Agreement from './Components/Agreement'

function Router() {
  return (
    <BrowserRouter>
    <Routes>
        <Route exact path='/' element={<Login/>}/>
        <Route exact path='/dashboard' element={<Dashboard/>}/>
        <Route exact path='/newAgreement' element={<Agreement/>}/>
        <Route exact path='/listing' element={<Listing/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default Router