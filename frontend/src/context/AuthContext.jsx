import {createContext,useContext,useEffect,useState} from 'react'
import api from '../api/client'
const AuthContext=createContext(null)
export function AuthProvider({children}){const[user,setUser]=useState(null);const[loading,setLoading]=useState(true)
 useEffect(()=>{const token=localStorage.getItem('helpcircle_token');if(!token){setLoading(false);return}api.get('/auth/me').then(r=>setUser(r.data.user)).catch(()=>{localStorage.removeItem('helpcircle_token');setUser(null)}).finally(()=>setLoading(false))},[])
 const authenticate=async(path,payload)=>{const{data}=await api.post(path,payload);localStorage.setItem('helpcircle_token',data.token);setUser(data.user);return data.user}
 const login=payload=>authenticate('/auth/login',payload);const register=payload=>authenticate('/auth/register',payload);const logout=()=>{localStorage.removeItem('helpcircle_token');setUser(null)}
 return <AuthContext.Provider value={{user,loading,login,register,logout,setUser}}>{children}</AuthContext.Provider>}
export const useAuth=()=>useContext(AuthContext)
