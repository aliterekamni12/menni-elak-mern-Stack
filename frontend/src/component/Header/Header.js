import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import "../Header/Header.css"

const Header = () => {

    const [login, isLogin] = useState(false);

 
  return (
    <div className='header-navbar'>
      <div className='logo'> 
        <img></img>
      </div>
      <div className='menu'>
        <ul>
            <li><Link to='/Home' className="link">Home</Link> </li>
            <li><Link to='/Project' className="link">Projects</Link> </li>
            <li><Link to='/AboutUs' className="link">About Us</Link> </li>
            {login? <li><Link to='/Posts' className="link">Posts</Link> </li>: <></> } 
        </ul>
      </div>
      <div className='profile'>
        {login?
         <img/> :
            <div className='login_signup'> 
                <Link><button>Login</button></Link>
                <Link><button>Sign Up</button></Link>
            </div>}
      </div>
    </div>
  )
}

export default Header
