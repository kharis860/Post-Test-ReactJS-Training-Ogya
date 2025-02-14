import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Profil from "../pages/Profil";
import Form from "../pages/Form";
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/profil" element={<Profil />} />
      <Route path="/form" element={<Form />} />
    </Routes>
  );
}
