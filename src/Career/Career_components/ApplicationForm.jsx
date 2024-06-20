import  { useEffect, useState } from 'react';
import './ApplicationForm.css'; // Adjust the path as per your project structure
import vector from '../career_assets/vector.png'; // Adjust the path as per your project structure
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for react-toastify
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles

const ApplicationForm = () => {
    useEffect(()=>{
      AOS.init();
    })

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('default');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [resume, setResume] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData();
    formData.append('Name', name);
    formData.append('Email', email);
    formData.append('Position', position);
    formData.append('Phone', phone);
    formData.append('Message', message);
    formData.append('Resume', resume);

    try {
      const response = await fetch('http://localhost/Homepage/Home/php_web_v1.9/main.php', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      toast.success(data.success, {
        style: {
          background: '#4CAF50', // Green background
          color: '#FFFFFF', // White text color
        }
      }); // Show success toast
      clearForm(); // Clear form fields
    } catch (error) {
      console.error('Error submitting form:', error.message);
      toast.error('Failed to submit the form', {
        style: {
          background: '#F44336', // Red background
          color: '#FFFFFF', // White text color
        },
      });
    } finally {
      setSubmitting(false);
    }
  };

  const clearForm = () => {
    setName('');
    setEmail('');
    setPosition('default');
    setPhone('');
    setMessage('');
    setResume(null);
  };

  return (
    <div className="application">
      <ToastContainer /> {/* Add the ToastContainer component */}
      <div className="vector">
        <img className="imagevec" src={vector} alt="Vector Image" data-aos="fade-up" />
      </div>

      <div className="bg-form" id="NearForm">
        <div className="myformsec">
          <div className="formheader">
            <h2 style={{ color: 'rgb(255, 255, 255)', marginTop: '1.2rem' }}>Application Form</h2>
          </div>
          <form id="ApplicationForm" onSubmit={handleSubmit} encType="multipart/form-data" noValidate>
            <div className="full">
              <div className="left" data-aos="fade-up">
                <input
                  type="text" data-aos="fade-up"
                  className="fname"
                  placeholder="Enter Your Full Name"
                  id="Name"
                  name="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <input
                  type="email" data-aos="fade-up"
                  className="fname"
                  placeholder="Enter Your Email Address"
                  id="Email"
                  name="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <select
                  className="MyOptions" data-aos="fade-up"
                  id="Position"
                  name="Position"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  required
                >
                  <option value="default">Select Position</option>
                  <option value="Salesforce Developer">Salesforce Developer</option>
                  <option value="Salesforce Admin" >Salesforce Admin</option>
                </select>
                <input
                  type="tel" data-aos="fade-up"
                  className="fname"
                  placeholder="+91 Enter Your Number"
                  maxLength="13"
                  id="Phone"
                  name="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
                <p className="Myuploadsec">Upload Resume</p>
                <input
                  type="file" data-aos="fade-up"
                  className="customFileInput"
                  accept=".pdf,.doc,.docx" 
                  id="Resume"
                  name="Resume"
                  onChange={handleFileChange}
                  required
                />
              </div>
              <div className="right" data-aos="fade-up">
                <div className="paraform">
                  <textarea
                    id="para" 
                    rows="8"
                    cols="20"
                    placeholder='Leave us a Message'
                    style={{
                      padding: '10px',
                      outline: 'none',
                      borderRadius: '10px',
                      marginTop: '3rem',
                      color: 'black',
                    }}
                    name="Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="btn">
              <button className="Submit" type="submit" disabled={submitting}>
                {submitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </form>
          <div className={`submit-message ${submitMessage.includes('successfully') ? 'success' : 'error'}`}>
            {submitMessage}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;
