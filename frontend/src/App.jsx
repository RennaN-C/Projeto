import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login.jsx'; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {}
        <Route path="/login" element={<Login />} />

        {}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {}
        {}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
