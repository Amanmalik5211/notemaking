import './LoginAndSignUp.css';
import loginImage from '../../assets/loginPageImage.jpg';
import axios from 'axios';
import { useApi } from '../../Components/ContextApi';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {
    const navigate = useNavigate();
    const {baseURL} = useApi();
    const [email,setEmail] = useState('')
    const [loading,setLoading] = useState(false)
    const [otpSent,setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');

   const getOTP = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post(`${baseURL}/get-otp`, { email,type:"login" })

            if (response.data.success) {
                alert("OTP sent to your email");
                setOtpSent(true);
            } else {
                alert(response.data.message || "Failed to send OTP");
            }
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                alert(err.response?.data?.message || "Something went wrong");
            } else {
                alert("An unexpected error occurred");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) =>{
        e.preventDefault();
        setLoading(true);

         try {
            const res = await axios.post(`${baseURL}/verify-otp-for-login`, {email,otp,},{withCredentials:true});

            if (res.data.success) {
                navigate('/Dashboard')
                alert('Login successful');
            } else {
                alert(res.data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('An error occurred during Login.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="auth-container">
            <div className='loginSignup-form'>
              
                    <form className="form-box">
                         <h2>Login</h2>
                    <span>Please login to continue to your account</span>
                    <fieldset  className="input-fieldset">
                        <legend>Your Email</legend>
                        <input type="email" placeholder="Enter Your Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </fieldset>
                    {otpSent && (
                        <fieldset className="input-fieldset">
                            <legend>OTP</legend>
                            <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)}/>
                        </fieldset>
                    )}
                    {otpSent &&(
                        <p style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline',fontSize:16 }} onClick={()=>getOTP}>Resend OTP</p>
                    )

                    }
            
                    <button onClick={otpSent ? handleLogin : getOTP} disabled={loading}>
                        {loading
                            ? '...'
                            : otpSent
                                ? 'Login'
                                : 'Get OTP'}
                    </button>

                    <span style={{ alignSelf: 'center' }}>
                        Need an account??
                        <a style={{ color: 'blue', cursor: 'pointer', textDecoration: 'underline' }} onClick={()=>navigate('/signup')}>
                            {' '}Create one
                        </a>
                    </span>
                    </form>
               
            </div>
            <div className='right-image'>
                <img src={loginImage} alt="Login Visual" />
                right side
            </div>
        </div>
    );
};

export default Login;
