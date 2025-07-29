import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './Pages/LoginAndSignUpPage/Login';
import Signup from './Pages/LoginAndSignUpPage/Signup';
import Dashboard from './Pages/DashBoard/Dashboard';
import ProtectedUI from './Components/ProtectedUI';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
       <Route path="/dashboard" element={<ProtectedUI><Dashboard /></ProtectedUI>} />
      </Routes>
    </Router>
  )
}

export default App
