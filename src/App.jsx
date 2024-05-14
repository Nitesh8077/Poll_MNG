import React from "react";
import Intro from "./components/intro/Intro";
import Registration from "./components/Registration";
import Login from "./components/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Intro />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/reg" element={<Registration />}></Route>
        <Route path="/admin-dashboard" element={<AdminDashboard />}></Route>
        <Route path="/user-dashboard" element={<UserDashboard />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
