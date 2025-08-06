// App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/authPages/Login.jsx';
import './App.css';
import Signup from './pages/authPages/Signup.jsx';
import Home from './pages/home/Home.jsx';
import ChatWindow from './pages/chatPages/Chatwindow.jsx';
import ProtectedRoute from './components/protectedRoutes/protected.jsx';
import Upload from './pages/admin/upload.jsx';


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path="/login" element={<Login />} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/home' element={
          <ProtectedRoute>
            <Home/>
          </ProtectedRoute>
           } />
        <Route path='/chatwindow' element={
          <ProtectedRoute>
            <ChatWindow/>
          </ProtectedRoute>
          } />

          <Route path='/upload' element={
            <ProtectedRoute>
              <Upload/>
            </ProtectedRoute>
            } />

      </Routes>
    </>
  );
}

export default App;
