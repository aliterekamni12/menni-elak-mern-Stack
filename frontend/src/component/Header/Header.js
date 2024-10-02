import React, { useContext } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import "../Header/Header.css"
import logo from "./Logo.png"
import ProjectIdContext from '../../context';

const Header = () => {

    const {login} = useContext(ProjectIdContext)
    
 
  return (
    <div className='header-navbar'>
      <div className='logo'> 
        <Link to='/'><img  src={logo} /></Link>
      </div>
      <div className='menu'>
        <ul>
            <li><Link to='/' className="link">Home</Link> </li>
            <li><Link to='/Project' className="link">Projects</Link> </li>
            <li><Link to='/AboutUs' className="link">About Us</Link> </li>
            {login? <li><Link to='/Posts' className="link">Posts</Link> </li>: <></> } 
        </ul>
      </div>
      <div className='profile'>
        {login?
         <></> :
            <div className='login_signup'> 
                <Link to='/login'><button>Login</button></Link>
                <Link to='/signup'><button>Sign Up</button></Link>
            </div>}
      </div>
    </div>
  )
}

export default Header
