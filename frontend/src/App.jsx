<<<<<<< HEAD
import { Navigate, Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Explore from './pages/Explore'
import CreateRequest from './pages/CreateRequest'
import Auth from './pages/Auth'

export default function App() {
  return <Routes><Route element={<MainLayout/>}><Route index element={<Home/>}/><Route path="explore" element={<Explore/>}/><Route path="create-request" element={<CreateRequest/>}/><Route path="login" element={<Auth mode="login"/>}/><Route path="register" element={<Auth mode="register"/>}/><Route path="*" element={<Navigate to="/" replace/>}/></Route></Routes>
}
=======
import{Navigate,Route,Routes}from'react-router-dom';import MainLayout from'./layouts/MainLayout';import Home from'./pages/Home';import Explore from'./pages/Explore';import CreateRequest from'./pages/CreateRequest';import Auth from'./pages/Auth';import ProtectedRoute from'./components/ProtectedRoute';import Dashboard from'./pages/Dashboard';import RequestDetails from'./pages/RequestDetails';import ProviderProfile from'./pages/ProviderProfile'
export default function App(){return <Routes><Route element={<MainLayout/>}><Route index element={<Home/>}/><Route path="explore" element={<Explore/>}/><Route path="requests/:id" element={<RequestDetails/>}/><Route path="create-request" element={<ProtectedRoute><CreateRequest/></ProtectedRoute>}/><Route path="dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/><Route path="provider-profile" element={<ProtectedRoute roles={['provider']}><ProviderProfile/></ProtectedRoute>}/><Route path="login" element={<Auth mode="login"/>}/><Route path="register" element={<Auth mode="register"/>}/><Route path="*" element={<Navigate to="/" replace/>}/></Route></Routes>}
>>>>>>> e015e11 (first commit)
