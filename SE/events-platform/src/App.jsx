import { useState } from "react";
import "../src/App.css";
import { LoginPage } from "./components/LoginPage";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        
      </Routes>
    </>
  );
}

export default App;
