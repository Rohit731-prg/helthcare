import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import SignIn from './Components/SignIn';
import Profile from './Components/Profile';
import ForgotePassword from './Components/ForgotPassword';
import UpdateProfile from './Components/UpdateProfile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/pro/:id" element={<Profile />} />
        <Route path="/forgotPassword" element={<ForgotePassword />} />
        <Route path="/updateProfile/:id" element={<UpdateProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
