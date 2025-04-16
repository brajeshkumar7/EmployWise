import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Users from './pages/Users';
import UserProvider from './store/user-store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/users" element={<Users />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </UserProvider>
  );
}

export default App;
