import { useState } from 'react'

import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import AddTransaction from './pages/AddTransaction'
import Login from './pages/Login'
import Reports from './pages/Reports'
import Register from './pages/Register'
import ProtectedRoute from './components/ProtectedRoute'

function App() {

  return (
<>
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/register' element={<Register />}/>
        <Route path='/login' element={<Login />}/>

        <Route path='/' element={<ProtectedRoute><Dashboard /> </ProtectedRoute>}/>

        <Route path='/add' element={<ProtectedRoute><AddTransaction /> </ProtectedRoute>}/>

        <Route path='/reports' element={<ProtectedRoute><Reports /> </ProtectedRoute>}/>

        <Route path='edit/:id' element={<ProtectedRoute><AddTransaction /> </ProtectedRoute>}/>
      </Routes>
    </BrowserRouter>
</>
  )
}

export default App
