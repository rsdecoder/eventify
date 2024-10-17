import { useState } from "react";
import "../src/App1.css";
import { LoginPage } from "./components/LoginPage";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import AddEventPage from "./components/AddEventPage";
import Events from "./components/Events";

function App() {
  return (
    <div id="main">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/add-event" element={<AddEventPage />} />
        {/* <Route path="account" element = {</>} /> */}
      </Routes>
    </div>
  );
}

export default App;

