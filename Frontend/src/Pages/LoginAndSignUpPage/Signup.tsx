import './LoginAndSignUp.css';
import loginImage from '../../assets/loginPageImage.jpg';
import { useState } from 'react';
import axios from 'axios';
import { useApi } from '../../Components/ContextApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import logo from '../../assets/logo.png'

const Signup = () => {
    const { baseURL } = useApi();
    const navigate = useNavigate();
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false)
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [dob, setDob] = useState('')

    const isValidName = (name: string) => {
        return name.trim().length >= 2 && name.split('').every(char =>
            /^[a-zA-Z ]$/.test(char)
        );
    };

    const getOTP = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error("Please enter a valid email address.");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post(`${baseURL}/get-otp`, { email, type: "signup" });

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



    const handleSignup = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!email || !dob || !name || !otp) {
            toast.error("All fields are required")
            return
        }
        else if (!isValidName(name)) {
            toast.error("Invalid name. Use only letters and spaces.");
            return;
        }
        try {
            setLoading(true);
            const res = await axios.post(`${baseURL}/verify-otp-for-signup`, { email, DOB: dob, name, otp, }, { withCredentials: true });

            if (res.data.success) {
                navigate('/Dashboard')
                toast.success('Signup successful');
            } else {
                toast.error(res.data.message || 'Signup failed');
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Something went wrong');

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className='top-logoAndName'>
                <img src={logo} alt="company logo" />
                <h1>HD</h1>
            </div>
            <div className='loginSignup-form'>
                <form className="form-box">
                    <h2>Sign up</h2>
                    <span>Signup to enjoy the features of HD</span>

                    <fieldset className="input-fieldset">
                        <legend>Your Name</legend>
                        <input type="text" placeholder="Enter Your Name" value={name} onChange={(e) => setName(e.target.value)} />
                    </fieldset>

                    <fieldset className="input-fieldset">
                        <legend>Date Of Birth</legend>
                        <input type="date" placeholder=" " value={dob} onChange={(e) => setDob(e.target.value)} />
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
                            <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
                        </fieldset>
                    )}

                    <button style={{ backgroundColor: loading ? '#ccc' : '#007bff',}} onClick={otpSent ? handleSignup : getOTP} disabled={loading}>
                        {loading
                            ? '...'
                            : otpSent
                                ? 'Sign Up'
                                : 'Get OTP'}
                    </button>


                    <span style={{ alignSelf: 'center' }}>
                        Already have an account??
                        <a style={{ color: 'blue', cursor: 'pointer', textDecoration: 'underline' }} onClick={() => navigate('/')}>
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
