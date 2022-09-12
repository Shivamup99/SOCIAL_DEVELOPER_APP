import React from 'react'
import {Link} from 'react-router-dom'
import './auth.css'
const Register = () => {
  return (
    <div className='login'>
    <img src='https://images.pexels.com/photos/2086622/pexels-photo-2086622.jpeg?auto=compress&cs=tinysrgb&w=600' alt='dd'/>
    <form className="login-box">
      <h1>Register Form</h1>
      <div className="login-content">
      <div className="input-name">

      <input type="text" placeholder='your name' name='name' />
     </div>
      <div className="input-email">

      <input type="email" placeholder='username' name='email' />
      </div>
      <div className="input-password">
       
      <input type="password" placeholder='password'  name='password' required />
      </div>
      </div>
      <div className="auth-btn">
      <button>Let me in</button>

      <Link to='/login' className='reg'>
       have a account ? Sign in
        </Link>
      </div>
    </form>
  
  </div>
  )
}

export default Register