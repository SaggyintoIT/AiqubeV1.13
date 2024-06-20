
import './Contactus.css'
import Banner from '../../Contact-us/Contactus-sub-pages/Banner'
import Form from '../../Contact-us/Contactus-sub-pages/Form.jsx'
import '../../Navbar/Navbar'
import '../../Footer/Footer.jsx'
import { useEffect } from 'react';
import Footer from '../../Footer/Footer.jsx'
import Navbar from '../../Navbar/Navbar'



function Contactus() {
  useEffect(() => {
    document.title = "Contact Us - AiQube";
  }, []);
  return (
    <>
    <Navbar/>
<Banner/>
    <div className="content">
        <p>Get In Touch</p>
        <p id="content_discription">We appreciate your interest in AIqube technologies . Please fill out the form below to reach us.</p>
    </div>
<Form/>
<Footer/>
</>
  )
}

export default Contactus
