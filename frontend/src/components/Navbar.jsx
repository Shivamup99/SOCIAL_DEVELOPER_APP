import React from 'react'
import Avatar from '@mui/material/Avatar';
import './style.css'
import { Link, NavLink } from 'react-router-dom';
const Navbar = () => {
  return (
    <div className='navbar'>
          <div className="nav-content">
          <img src="https://cdn.icon-icons.com/icons2/306/PNG/512/Website-Icon_33937.png" alt="dh" />
            <span>
                <NavLink to='/'>
                Developers
                </NavLink>  
            </span>
        <div className="nav-right">
        <button className='avatar'>
        <Avatar src='https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'/>
        </button>
            <div className="auth">
                <Link to='/login' className='sign'>Sign in</Link>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Navbar