import { useContext, useState } from "react";
import "../src/App1.css";

import { Routes, Route, useParams, useSearchParams } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import AddEventPage from "./components/AddEventPage";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import Profile from "./components/Profile.jsx";
import SingleEvent from "./components/SingleEvent.jsx";
import SignUp from "./components/SignUp.jsx";
import LoginForm from "./components/LoginForm.jsx";
import Logout from "./components/Logout.jsx";

function App() {
  return (
    <AuthProvider>
      <main id="main">
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/events" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/add-event" element={<AddEventPage />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/events/:event_id" element={<SingleEvent />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </main>
    </AuthProvider>
  );
}

export default App;
