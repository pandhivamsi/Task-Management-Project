import React from 'react'
import Login from './components/Login'
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Register from './components/Register';
import './App.css'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register/>}/>
        </Routes>
        </BrowserRouter>
      </div>
  )
}

export default App