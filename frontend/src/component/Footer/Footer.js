import React from 'react';
import  "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Team Menni Elak. All rights reserved.</p>
        <nav>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="https://www.instagram.com/team_menni_ellak/">instagram</a></li>
          </ul>
        </nav>
        
        
      </div>
    </footer>
  )
}

export default Footer
