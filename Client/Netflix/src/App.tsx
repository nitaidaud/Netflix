
import { BrowserRouter, Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import SignInPage from './pages/Signin';
import SignupPage from './pages/Signup';
import { useAppSelector } from "./store/Store";
import Landing from './pages/Landing';
import NetflixNavBar from './components/shared/NeftlixNavBar';


function App() {

  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  return (

    <BrowserRouter>
    <NetflixNavBar/>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
