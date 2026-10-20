import { Navigate, Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Explore from './pages/Explore'
import CreateRequest from './pages/CreateRequest'
import Auth from './pages/Auth'

export default function App() {
  return <Routes><Route element={<MainLayout/>}><Route index element={<Home/>}/><Route path="explore" element={<Explore/>}/><Route path="create-request" element={<CreateRequest/>}/><Route path="login" element={<Auth mode="login"/>}/><Route path="register" element={<Auth mode="register"/>}/><Route path="*" element={<Navigate to="/" replace/>}/></Route></Routes>
}
