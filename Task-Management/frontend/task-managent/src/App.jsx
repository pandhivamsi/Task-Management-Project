import Login from './components/Login'
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Register from './components/Register';
import './App.css'
import Support from './components/Support';
import Dashboard from './components/Dashboard';
import ProjectForm from './components/Projectform';
import PeopleListing from './components/PeopleListing';
import ThemeProvider from './components/ThemeContext';


const App = () => {
  return (
    <div>
      <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/support" element={<Support />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projectform" element={<ProjectForm />} />
          <Route path="/peoplelist" element={<PeopleListing />} />
        </Routes>
      </BrowserRouter>
      </ThemeProvider>
    </div>
  )
}

export default App
