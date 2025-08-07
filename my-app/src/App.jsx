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
import AdminLogin from './pages/admin/adminLogin.jsx';
import AdminNavbar from './components/admin/AdminNavbar.jsx';
import AdminDashboard from './pages/admin/adminDashboard.jsx';
import FAQ from './pages/admin/FAQ.jsx';
import AdminProtectedRoute from './components/admin/AdminRoutes.jsx';


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
            <AdminProtectedRoute>
              <Upload/>
            </AdminProtectedRoute>
            } />

            <Route path='/adminlogin' element={<AdminLogin/>} />
            <Route path='/adminnavbar' element={<AdminNavbar/>} />
            <Route path='/admindashboard' element={
              <AdminProtectedRoute>
              <AdminDashboard/>
              </AdminProtectedRoute>
              } />
            <Route path='/uploadfaq' element={
              <AdminProtectedRoute>
                <FAQ/>
              </AdminProtectedRoute>
              } /> 
      </Routes>
    </>
  );
}

export default App;
