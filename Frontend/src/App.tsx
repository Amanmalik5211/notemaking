import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './Pages/LoginAndSignUpPage/Login';
import Signup from './Pages/LoginAndSignUpPage/Signup';
import Dashboard from './Pages/DashBoard/Dashboard';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
       
      </Routes>
    </Router>
  )
}

export default App
