import React from 'react'
import Login from './components/Login'
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Register from './components/Register';
import './App.css'
import Support from './components/Support';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register/>}/>
          <Route path="/support" element={<Support/>}/>
        </Routes>
        </BrowserRouter>
      </div>
  )
}

export default App