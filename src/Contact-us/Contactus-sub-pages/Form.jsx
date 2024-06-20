import { useEffect, useState } from 'react';
import './Form.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [contact, setContact] = useState({ email: '', address: '', phone: '', office_hours: '' });

    useEffect(() => {
        fetch('http://localhost/backend/contactinfo.php')
            .then(response => response.json())
            .then(data => setContact(data))
            .catch(error => {
                console.error("There was an error!", error);
            });

        fetch('http://localhost/backend/test.php')
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => {
                console.error("There was an error!", error);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { name, email, message };

        fetch('http://localhost/backend/test.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                setUsers([...users, { name, email, message }]);
                setName('');
                setEmail('');
                setMessage('');
                toast.success('Form submitted successfully!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    style: {
                        background: '#4CAF50', // Green background
                        color: '#FFFFFF', // White text color
                      }
                });
            })
            .catch(error => {
                console.error('Error submitting form:', error.message);
                toast.error('Form not submitted!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    style: {
                        background: '#F44336', // Red background
                        color: '#FFFFFF', // White text color
                      },
                });
            });
    };

    return (
        <div className='div'>
            <ToastContainer />
            <section className="text-gray-600 body-font relative form_main">
                <div className="container mx-auto flex sm:flex-nowrap flex-wrap">
                    <div className="lg:w-2/3 md:w-1/2 bg-gray-300 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
                        <iframe
                            width="100%"
                            height="100%"
                            className="absolute inset-0"
                            frameBorder="0"
                            title="map"
                            marginHeight="0"
                            marginWidth="0"
                            scrolling="no"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3565.0464349314056!2d81.24576511462435!3d26.218582083419264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399ba14166f655d1%3A0x24dffd072d377f70!2sRaebareli%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1659871234567!5m2!1sen!2sin"
                            style={{ filter: ' contrast(1.2) opacity(0.4)' }}
                        ></iframe>
                        <div className="bg-white relative flex flex-wrap py-6 rounded shadow-md" id='contactinfo_map'>
                            <div className="lg:w-1/2 px-6">
                                <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">ADDRESS</h2>
                                <address className='mt-1 text-gray-900 not-italic'>{contact.address.replace(',', ' ')}</address>
                            </div>
                            <div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
                                <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">EMAIL</h2>
                                <a className='text-gray-900' href={`mailto:${contact.email}`}>{contact.email}</a>
                                <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs mt-4">PHONE</h2>
                                <a className='text-gray-900' href={`tel:${contact.phone}`}>{contact.phone}</a>
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0 form_container">
                        <form className="form" onSubmit={handleSubmit}>
                            <div className='form_heading text-center w-94'>
                                <h2 className="text-gray-900 text-lg mb-1 font-medium title-font ">Let's Connect</h2>
                            </div>
                            <p className="leading-relaxed mb-5 text-gray-600"></p>
                            <div className="relative mb-4">
                                <input
                                    type="text"
                                    placeholder='Enter Your Full Name'
                                    id="name"
                                    name="name"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    className="w-full bg-white rounded border border-gray-300  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>
                            <div className="relative mb-4">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    placeholder='Enter Your Email Address'
                                    onChange={e => setEmail(e.target.value)}
                                    className="w-full bg-white rounded  border border-gray-300  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>
                            <div className="relative mb-4">
                                <textarea
                                    placeholder='Enter Your Message'
                                    id="message"
                                    name="message"
                                    value={message}
                                    onChange={e => setMessage(e.target.value)}
                                    className="w-full bg-white rounded border border-gray-300 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                                ></textarea>
                            </div>
                            <button type="submit" className="text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-lg">Submit</button>
                            <p className="text-xs text-gray-500 mt-3">We will be in touch with you within 24hrs</p>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default App;