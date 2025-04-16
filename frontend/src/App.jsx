import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Users from './pages/Users';
import UserProvider from './store/user-store';


function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </UserProvider>
  );
}

export default App;
