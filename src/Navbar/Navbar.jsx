import React, { useState, useEffect } from 'react';
import logo from './Aiqubelogo.png';
import './Navbar.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const hideSidebar = () => {
    setSidebarVisible(false);
  };

  return (
    <header className="navbar">
      <div className={`overlay ${sidebarVisible ? 'show' : ''}`} onClick={hideSidebar}></div>
      <div className="logo">
        <img className="nav-logo" alt="Logo" src={logo} />
      </div>
      <nav>
        <ul className={`sidebar ${sidebarVisible ? 'show' : ''}`}>
          <li onClick={hideSidebar}>
            <a href="javascript:void(0)" className="sidebar-link">
              <svg
                className="cross"
                xmlns="http://www.w3.org/2000/svg"
                height="26"
                viewBox="0 96 960 960"
                width="26"
              >
                <path d="m249 849-42-42 231-231-231-231 42-42 231 231 231-231 231 42-42-231-231-231 231Z" />
              </svg>
            </a>
          </li>
          <li>
            <NavLink 
              exact 
              to="/" 
              className={({ isActive }) => isActive ? "sidebar-link active-link" : "sidebar-link"}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/blog" 
              className={({ isActive }) => isActive ? "sidebar-link active-link" : "sidebar-link"}
            >
              Blog
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/about" 
              className={({ isActive }) => isActive ? "sidebar-link active-link" : "sidebar-link"}
            >
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/services" 
              className={({ isActive }) => isActive ? "sidebar-link active-link" : "sidebar-link"}
            >
              Services
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/career" 
              className={({ isActive }) => isActive ? "sidebar-link active-link" : "sidebar-link"}
            >
              Career
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/contactus" 
              className={({ isActive }) => isActive ? "sidebar-link active-link" : "sidebar-link"}
            >
              Contact Us
            </NavLink>
          </li>
        </ul>
        <ul className='SideNav'>
          <li className="hideOnMobile">
            <NavLink 
              exact 
              to="/" 
              className={({ isActive }) => isActive ? "active-link" : ""}
            >
              Home
            </NavLink>
          </li>
          <li className="hideOnMobile">
            <NavLink 
              to="/blog" 
              className={({ isActive }) => isActive ? "active-link" : ""}
            >
              Blogs
            </NavLink>
          </li>
          <li className="hideOnMobile">
            <NavLink 
              to="/about" 
              className={({ isActive }) => isActive ? "active-link" : ""}
            >
              About Us
            </NavLink>
          </li>
          <li className="hideOnMobile">
            <NavLink 
              to="/services" 
              className={({ isActive }) => isActive ? "active-link" : ""}
            >
              Services
            </NavLink>
          </li>
          <li className="hideOnMobile">
            <NavLink 
              to="/career" 
              className={({ isActive }) => isActive ? "active-link" : ""}
            >
              Career
            </NavLink>
          </li>
          <li className="hideOnMobile">
            <NavLink 
              to="/contactus" 
              className={({ isActive }) => isActive ? "active-link" : ""}
            >
              Contact Us
            </NavLink>
          </li>
          <li className="menu-button" onClick={toggleSidebar}>
            <a href="javascript:void(0)">
              <svg className="hideham" xmlns="http://www.w3.org/2000/svg" height="26" viewBox="0 96 960 960" width="26">
                <path d="M120 816v-60h720v60H120Zm0-210v-60h720v60H120Zm0-210v-60h720v60H120Z" />
              </svg>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
