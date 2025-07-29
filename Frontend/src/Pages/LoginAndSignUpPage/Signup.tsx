import './LoginAndSignUp.css';
import loginImage from '../../assets/loginPageImage.jpg';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const baseURL = "http://localhost:4000";
    const [otp, setOtp] = useState('');
    const [otpSent,setOtpSent] = useState(false)
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [dob, setDob] = useState('')

    const getOTP = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post(`${baseURL}/get-otp`, { email })

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

    const handleSignup = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await axios.post(`${baseURL}/verify-otp`, {email, DOB:dob, name,otp,},{withCredentials:true});

            if (res.data.success) {
                navigate('/Dashboard')
                alert('Signup successful');
            } else {
                alert(res.data.message || 'Signup failed');
            }
        } catch (error) {
            console.error('Signup error:', error);
            alert('An error occurred during signup.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className='loginSignup-form'>
                <form className="form-box">
                    <h2>Sign up</h2>
                    <span>Signup to enjoy the features of HD</span>

                    <fieldset className="input-fieldset">
                        <legend>Your Name</legend>
                        <input type="text" placeholder="Enter Your Name" value={name} onChange={(e) => setName(e.target.value)}/>
                    </fieldset>

                    <fieldset className="input-fieldset">
                        <legend>Date Of Birth</legend>
                        <input type="date" placeholder=" " value={dob} onChange={(e) => setDob(e.target.value)}/>
                    </fieldset>

                    <fieldset className="input-fieldset">
                        <legend>Email</legend>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </fieldset>

                    {otpSent && (
                        <fieldset className="input-fieldset">
                            <legend>OTP</legend>
                            <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)}/>
                        </fieldset>
                    )}

                    <button onClick={otpSent ? handleSignup : getOTP} disabled={loading}>
                        {loading
                            ? '...'
                            : otpSent
                                ? 'Sign Up'
                                : 'Get OTP'}
                    </button>


                    <span style={{ alignSelf: 'center' }}>
                        Already have an account??
                        <a style={{ color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}>
                            {' '}sign in
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

export default Signup;
