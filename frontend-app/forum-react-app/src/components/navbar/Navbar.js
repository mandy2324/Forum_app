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
                <li><Link to="/">Home</Link></li>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/signup">Register</Link></li>   
          </ul>
    </div>


  )
}

export default Navbar;