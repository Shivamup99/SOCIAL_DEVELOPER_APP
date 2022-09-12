import React from 'react'
import {Link} from 'react-router-dom'
import './auth.css'
function Login() {
  return (
    <div className='login'>
    <img src='https://images.pexels.com/photos/1770809/pexels-photo-1770809.jpeg?auto=compress&cs=tinysrgb&w=600' alt='dd'/>
    <form className="login-box">
      <h1>Login Form</h1>
      <div className="login-content">
      <div className="input-email">

      <input type="email" placeholder='username' name='email' required />
      </div>
      <div className="input-password">
       
      <input type="password" placeholder='password'  name='password' required />
      </div>
      </div>
      <div className="auth-btn">
      <button>Let me in</button>

      <Link to='/register' className='reg'>
       don't have account ? Register
        </Link>
      </div>
    </form>
  
  </div>
  )
}

export default Login