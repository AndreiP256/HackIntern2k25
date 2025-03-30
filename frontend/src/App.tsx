import { useState, useEffect } from 'react'
import './App.css'
import { jwtDecode } from 'jwt-decode';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Register from './pages/Login/Register';


interface JwtTokenPayload {
  email: string,
  exp: number,
  iat: number,
  isActive: boolean,
  role: string,
  sub: string
}

function App() {

  const [isAuth, setIsAuth] = useState(false);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuth(true);
      const decodedToken: JwtTokenPayload = jwtDecode(token);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
