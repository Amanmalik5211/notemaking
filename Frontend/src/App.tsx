import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Login from './Pages/LoginAndSignUpPage/Login';
import Signup from './Pages/LoginAndSignUpPage/Signup';
import Dashboard from './Pages/DashBoard/Dashboard';
import ProtectedUI from './Components/ProtectedUI';



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<ProtectedUI><Dashboard /></ProtectedUI>} />
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Router>
  )
}

export default App
