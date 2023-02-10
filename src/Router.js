import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './Components/Dashboard'
import Listing from './Components/Listing'

//components
import Login from './Components/Login'

function Router() {
  return (
    <BrowserRouter>
    <Routes>
        <Route exact path='/' element={<Login/>}/>
        <Route exact path='/dashboard' element={<Dashboard/>}/>
        <Route exact path='/listing' element={<Listing/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default Router