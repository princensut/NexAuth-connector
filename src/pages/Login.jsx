import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function Login() {

    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        const copyLoginInfo = { ...loginInfo };
        copyLoginInfo[name] = value;
        setLoginInfo(copyLoginInfo);
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;
        if (!email || !password) {
            return handleError('email and password are required')
        }
        try {
            const url = `https://mongodb-vrzy.vercel.app/auth/login`;
            const response = await fetch(url, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginInfo)
            });
            const result = await response.json();
            const { success, message, jwtToken, name, error } = result;
            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
                setTimeout(() => { navigate('/dashboard') }, 1000)
            } else if (error) {
                handleError(error?.details[0].message);
            } else if (!success) {
                handleError(message);
            }
        } catch (err) {
            handleError(err);
        }
    }

    return (
        <div className='container'>
            <div className='auth-header'>
                <div className='auth-icon'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                </div>
                <h1>Welcome back</h1>
                <p>Sign in to your account</p>
            </div>

            <div className='tab-switcher'>
                <Link to="/login" className='tab active'>Login</Link>
                <Link to="/signup" className='tab'>Sign Up</Link>
            </div>

            <form onSubmit={handleLogin}>
                <div className='form-group'>
                    <label htmlFor='email'>Email</label>
                    <div className='input-wrap'>
                        <svg className='input-icon' xmlns="http://www.w3.org/2000/svg" width="15" height="15"
                            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
                            strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="4" width="20" height="16" rx="2"/>
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                        </svg>
                        <input
                            onChange={handleChange}
                            type='email'
                            name='email'
                            id='email'
                            placeholder='Enter your email...'
                            value={loginInfo.email}
                        />
                    </div>
                </div>

                <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    <div className='input-wrap'>
                        <svg className='input-icon' xmlns="http://www.w3.org/2000/svg" width="15" height="15"
                            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
                            strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="11" width="18" height="11" rx="2"/>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                        </svg>
                        <input
                            onChange={handleChange}
                            type='password'
                            name='password'
                            id='password'
                            placeholder='Enter your password...'
                            value={loginInfo.password}
                        />
                    </div>
                </div>

                <button type='submit'>Login</button>

                {/* <span>Don't have an account? <Link to="/signup">Sign Up</Link></span> */}
            </form>

            <ToastContainer />
        </div>
    )
}

export default Login