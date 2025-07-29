
import './DashboardHeader.css'
import logo from '../../assets/logo.png'



const DashboardHeader = () => {

  const handleSignOut = () => {
    console.log('Sign out clicked');
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
