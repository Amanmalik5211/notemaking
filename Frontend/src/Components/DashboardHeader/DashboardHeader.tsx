
import './DashboardHeader.css'
import logo from '../../assets/logo.png'
import axios from 'axios';
import { useApi } from '../ContextApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';



const DashboardHeader = () => {
  const { baseURL } = useApi();
  const navigate = useNavigate();
  const handleSignOut = async () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (!confirmLogout) return;
    try {
      const res = await axios.get(`${baseURL}/logout`, { withCredentials: true });
      if (res.data.success) {
        navigate('/')
        toast.success(res.data.message)

      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div>
      <nav className="dashboard-navbar">
        <div className="navbar-left">
          <img src={logo} alt="Logo" className="logo" />
          <h2 className="navbar-title">Dashboard</h2>
        </div>
        <button className="signout-button" onClick={handleSignOut}>
          Sign Out
        </button>
      </nav>
    </div>
  )
}

export default DashboardHeader
