import { useEffect, useState } from 'react';
import './Footer.css';  // Import your CSS file for styling
import { Link, useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  const [followLinks, setFollowLinks] = useState([]);
  const location = useLocation();

  useEffect(() => {
    fetch('/footer.php')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setFollowLinks(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <footer>
      <div className="Footer">
        <div className="usefulLinks">
          <div className="footernav">
            <h3>Quick Links</h3>
            <ul>
              <li><NavLink to='/'>Home</NavLink></li>
              <li><NavLink to='/about'>About</NavLink></li>
              <li><NavLink to='/services'>Services</NavLink></li>
              <li><NavLink to='/contactus'>Contact</NavLink></li>
              <li><NavLink to='/career'>Career</NavLink></li>
              <li><NavLink to='/blogs'>Blogs</NavLink></li>
            </ul>
          </div>
        </div>
        <div className="Contact">
          <div className="mycontact">
            <h3 style={{paddingTop:10}}>Contact Us</h3>
            <p style={{marginTop:'2.2rem'}}><a href="mailto:info@aiqube.tech">info@aiqube.tech</a></p>
            <p style={{marginTop:'2.2rem'}}><a href="tel:9198435433" >+91 9198435433</a></p>
          </div>
        </div>
        <div className="follow">
          <div className="followeffect">
            <h3>Follow Us On</h3>
            <div className="followLink">
              {followLinks.map((item, index) => (
                <a target='_blank' key={index} href={item.hyperlink}>
                  <img src={item.icon_link} alt="" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="copyright">
        <p>@2023 AiQube Technologies Pvt.Ltd All rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
