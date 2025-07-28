import './LoginAndSignUp.css';
import loginImage from '../../assets/loginPageImage.jpg';
import { useState } from 'react';

const LoginAndSignUp = () => {
    const [isSignup, setIsSignup] = useState(false);

    return (
        <div className="auth-container">
            <div className='loginSignup-form'>
              
                    <form className="form-box">
                         <h2>Login</h2>
                    <span>Please login to continue to your account</span>
                    <fieldset  className="input-fieldset">
                        <legend>Your Name</legend>
                        <input type="email" placeholder="Enter Your Email" />
                    </fieldset>
                    <fieldset className="input-fieldset">
                        <legend>Date Of Birth</legend>
                        <input type="email" placeholder="Enter OTP" />
                    </fieldset>
            
                    <button>Get OTP</button>
                    </form>
               
            </div>
            <div className='right-image'>
                <img src={loginImage} alt="Login Visual" />
                right side
            </div>
        </div>
    );
};

export default LoginAndSignUp;
