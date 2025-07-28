
import './LoginAndSignUp.css'
import loginImage from '../../assets/loginPageImage.jpg';
import { useState } from 'react';
import axios from 'axios';
 

const Signup = () => {
    const baseURL = "ghyegbbdgf"
   const [otp,setOtp] = useState(false)
   const [loading,setLoading] = useState(false);

   const getOTP = async(e)=>{
       e.preventDefault();
        try {
            setLoading(true)
            const response = await axios.get(`${baseURL}/get-otp`,{withCredentials:true});
        } catch (error) {
            
        }finally{
            setLoading(false)
        }
   }

    return (
        <div className="auth-container">
            <div className='loginSignup-form'>

                <form className="form-box">
                    <h2>Sign up</h2>
                    <span>Signup to enjoy the features of HD</span>
                    <fieldset  className="input-fieldset">
                        <legend>Your Name</legend>
                        <input type="text" placeholder="Enter Your Name " />
                    </fieldset>
                    <fieldset className="input-fieldset">
                        <legend>Date Of Birth</legend>
                        <input type="date" placeholder=" " />
                    </fieldset>
                    <fieldset className="input-fieldset">
                        <legend>Email</legend>
                        <input type="email" placeholder="Enter Email" />
                    </fieldset>
                    {otp && (<fieldset className="input-fieldset">
                        <legend>OTP</legend>
                        <input type="text" placeholder="Enter OTP" />
                    </fieldset>)}
                    <button onClick={(e)=>{getOTP(e)}}>Get OTP</button>
                    <span style={{alignSelf:'center'}}>Already have an account?? 
                        <a
                           style={{ color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}
                           > sign in</a></span>
                </form>

            </div>
            <div className='right-image'>
                <img src={loginImage} alt="Login Visual" />
                right side
            </div>
        </div>
    )
}

export default Signup
