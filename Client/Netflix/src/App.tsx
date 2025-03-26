
import { Button } from './components/ui/button'
import Landing from './pages/Landing'
import SignInPage from './pages/Signin'
import Header from './components/shared/Header';
import './App.css';
import SignupPage from './pages/Signup';

function App() {

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen pt-24">
        <SignInPage />
        <SignupPage/>
        
      </div>
    </div>
  )
}

export default App
