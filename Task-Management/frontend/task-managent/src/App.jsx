import React from 'react'
import Login from './components/Login'
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Register from './components/Register';
import './App.css'
import Support from './components/Support';
import Dashboard from './components/Dashboard';
import ProjectForm from './components/Projectform';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/support" element={<Support />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projectform" element={<ProjectForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
