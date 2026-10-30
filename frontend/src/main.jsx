<<<<<<< HEAD
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster position="top-right" richColors />
    </BrowserRouter>
  </React.StrictMode>,
)
=======
import React from 'react';import{createRoot}from'react-dom/client';import{BrowserRouter}from'react-router-dom';import{Toaster}from'sonner';import App from'./App.jsx';import{AuthProvider}from'./context/AuthContext';import'./index.css'
createRoot(document.getElementById('root')).render(<React.StrictMode><BrowserRouter><AuthProvider><App/><Toaster position="top-right" richColors/></AuthProvider></BrowserRouter></React.StrictMode>)
>>>>>>> e015e11 (first commit)
