import './LoginAndSignUp.css';
import loginImage from '../../assets/loginPageImage.jpg';
import axios from 'axios';
import { useApi } from '../../Components/ContextApi';
import { useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { toast } from 'react-toastify';
import { useGoogleLogin } from '@react-oauth/google';
import login_with_google_image from '../../assets/login_with_google_image.png'
import logo from '../../assets/logo.png'

const Login = () => {
    const navigate = useNavigate();
    const { baseURL } = useApi();
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');

    useEffect(() => {
  if (loading) {
    toast.error("If you are visiting for the 1st time, wait 20–30 seconds as the Render free version shuts down the backend when idle. It will work as usual after that.");
  }
}, [loading]);

    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                setLoading(true);
                const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                    headers: {
                        Authorization: `Bearer ${tokenResponse.access_token}`,
                    },
                });
                const googleRes = await axios.post(`${baseURL}/google-login`, res.data, { withCredentials: true });
                if (googleRes.data.success) {
                    toast.success("Google login successful:", googleRes.data.message);
                    navigate('/Dashboard')
                } else {
                    toast.error("Google login failed:", googleRes.data.message);
                }


            } catch (error) {
                toast.error("Failed to fetch user info");
            }finally {
            setLoading(false); 
        }
        },
        onError: () => {
            toast.error("Login Failed");
        }
    });




    const getOTP = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error('Please enter a valid email address.')
            return;
        }
        try {
            setLoading(true);
            
            const response = await axios.post(`${baseURL}/get-otp`, { email, type: "login" })
            console.log(email,baseURL,"get OTP for login page");
            if (response.data.success) {
                toast.success("OTP sent to your email");
                setOtpSent(true);
            } else {
                toast.error(response.data.message || "Failed to send OTP");
            }
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                toast.error(err.response?.data?.message || "Something went wrong");
            } else {
                toast.error("An unexpected error occurred");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!otp || !email) {
            toast.error("Please fill all details")
            return;
        }
        try {
            setLoading(true);
            const res = await axios.post(`${baseURL}/verify-otp-for-login`, { email, otp, }, { withCredentials: true });

            if (res.data.success) {
                navigate('/Dashboard')
                toast.success('Login successfull');
            } else {
                toast.error(res.data.message || 'Login failed');
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="auth-container">
            <div className='top-logoAndName'>
                <img src={logo} alt="comapany logo" />
                <h1>HD</h1>
            </div>
            <div className='loginSignup-form'>
                <form className="form-box">
                    <h2>Login</h2>
                    <span>Please login to continue to your account</span>
                    <fieldset className="input-fieldset">
                        <legend>Your Email</legend>
                        <input type="email" placeholder="Enter Your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </fieldset>
                    {otpSent && (
                        <fieldset className="input-fieldset">
                            <legend>OTP</legend>
                            <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
                        </fieldset>
                    )}
                    {otpSent && (
                        <p style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline', fontSize: 16 }} onClick={() => getOTP}>Resend OTP</p>
                    )

                    }

                    <button style={{ backgroundColor: loading ? '#ccc' : '#007bff',}} onClick={otpSent ? handleLogin : getOTP} disabled={loading}>
                        {loading
                            ? 'Wait...'
                            : otpSent
                                ? 'Login'
                                : 'Get OTP'}
                    </button>

                    <span style={{ alignSelf: 'center' }}>
                        Need an account??
                        <a style={{ color: 'blue', cursor: 'pointer', textDecoration: 'underline' }} onClick={() => navigate('/signup')}>
                            {' '}Create one
                        </a>
                    </span>
                    <img
                        src={login_with_google_image}
                        alt="Login with Google"
                        style={{
                            height: "30px",
                            width: "50%",
                            cursor: "pointer",
                            display: "block",
                            alignSelf:'center'
                        }}
                        onClick={()=>{login()}}
                    />
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
