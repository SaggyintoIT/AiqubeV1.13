
import Navbar from './../Navbar/Navbar';
import Play from './career_assets/Frame 2500.png';
import JobCarousel from './Career_components/JobCarousel'; // Adjust the path as necessary
import ApplicationForm from './Career_components/ApplicationForm'
import Footer from '../Footer/Footer'
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import './Career.css'
import { useEffect } from 'react';



const Career = () => {
  useEffect(()=>{
    AOS.init();
  })
  useEffect(() => {
    document.title = "Career - AiQube";
  }, []);
  return (
    <>
      <div>
        <div>
        <Navbar />
        </div>
        <div className="heroSec">
          <div className="heroMid">
            <div className="herotitle" data-aos="fade-up">
              <h1>One Step Closer To</h1>
              <h1>Your Dream Job</h1>
            </div>
            <div className="miniHeader">
              <p className="Heropara">Explore opportunities tailored to you with our expert guidance</p>
              <div className="buttons">
                <a href="#NearForm"><button>Get Started</button></a>
                <span className="Storysec">
                  <img className="play" src={Play} alt="" />
                  <p>Our Story</p>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <main>
        <div className="midsec">
          <div className="midsecheader" data-aos="fade-up">
            <p data-aos="fade-up">Newest <span className="jobsHeader">Jobs</span> for you</p>
          </div>
          <div className="midsecpara">
            <p data-aos="fade-up">Apply today to ensure your application is noticed first</p>
          </div>
        </div>
        <JobCarousel />
        <ApplicationForm/>
        <Footer/>
      </main>
      
    </>
  );
};

export default Career;
