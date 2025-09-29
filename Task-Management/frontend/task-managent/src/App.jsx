import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Support from "./components/Support";
import Dashboard from "./components/Dashboard";
import Edit from "./components/Edit";
import PeopleListing from "./components/PeopleListing";
import ThemeProvider from "./components/ThemeContext";
import "./App.css";
import ProjectsDetails from "./components/ProjectsDetails";
import KanbanBoard from "./components/KanbanBoard";
import { AppDataProvider } from "./components/DataContext";
import ProjectForm from "./components/ProjectForm";
import SessionHandler from "./SessionHandler";

const App = () => {
  return (
    <BrowserRouter>
      <SessionHandler />
      <ThemeProvider>
        <AppDataProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/support" element={<Support />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/kanbanboard" element={<KanbanBoard />} />
            <Route path="/projectform" element={<ProjectForm />} />
            <Route path="/edit/:userid" element={<Edit />} />
            <Route path="/peoplelist" element={<PeopleListing />} />
            <Route path="/projectlist" element={<ProjectsDetails />} />
          </Routes>
        </AppDataProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
