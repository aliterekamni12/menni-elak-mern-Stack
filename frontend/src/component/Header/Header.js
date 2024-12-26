import React, { useContext } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../Header/Header.css"
import logo from "./Logo.png"
import ProjectIdContext from '../../context';
import PP from "./PP.png"

const Header = () => {

    const {login, isLogin , setUserData, userData } = useContext(ProjectIdContext)
    const navigate = useNavigate()
    const logout= ()=>{
      isLogin(false)
      setUserData({})
      navigate("/login")
    }
 
  return (
    <div className='header-navbar'>
      <div className='logo'> 
        <Link to='/'><img  src={logo} /></Link>
      </div>
      <div className='menu'>
        <ul>
            <li><Link to='/' className="link">Home</Link> </li>
            <li><Link to='/projects' className="link">Projects</Link> </li>
            <li><Link to='/AboutUs' className="link">About Us</Link> </li>
            {login? <li><Link to='/Posts' className="link">Posts</Link> </li>: <></> } 
            {userData && userData.data && userData.data.user && userData.data.user.isAdmin? <li><Link to='/Dashboard' className="link">Dashboard</Link> </li> : <></>}
        </ul>
      </div>
      <div className='profile'>
        {login?
         <>
         <img id='PP' src={PP}/>
          <button id='logout' onClick={logout} >Logout</button>
         </> :
            <div className='login_signup'> 
                <Link to='/login'><button>Login</button></Link>
                <Link to='/signup'><button>Sign Up</button></Link>
            </div>}
      </div>
    </div>
  )
}

export default Header
