import React from 'react';
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <div className='navbar'>
          <div className='logo'>
                <h2>Let's Talk</h2>
          </div>
          <ul className="nav-menu">
                {/* <Link to='/' smooth={true} duration={500} ><li>Home</li></Link>
                <Link to='login' smooth={true} duration={500} ><li>Login</li></Link>
                <Link to='register' smooth={true} duration={500} ><li>Register</li></Link>
                <Link to='merchandise' smooth={true} duration={500} ><li>Merchandise</li></Link> */}
                <li><Link to="/">Home</Link></li>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/forums">Forums</Link></li>    
          </ul>
    </div>


  )
}

export default Navbar;