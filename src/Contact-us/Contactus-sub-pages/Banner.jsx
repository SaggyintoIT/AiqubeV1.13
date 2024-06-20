import { useEffect, useState } from 'react';

import './Banner.css'

function Banner() {
  const [contact, setContact] = useState({ email: '', address: '', phone: '', office_hours: '' });

  useEffect(() => {
    fetch('http://localhost/backend/contactinfo.php')
      .then(response => response.json())
      .then(data => setContact(data))
      .catch(error => {
        console.error("There was an error!", error);
      });
  }, []);

  return (
    <>
      <div className="container_1">
        <div className="heading">
          <h1>Contact Us</h1>
          <div className="title">
            <p id="t1">
              We'<span>d</span> Love To Hear From You
              {/* We're dedicated to catalyzing change and growth. Let's work together and embark on this journey. */}

            </p>
            <p id="t2">
              Our Friendly Team Is Always Here To Chat
            </p>
          </div>
        </div>
        <div className="cards">
          <div>
          <a href={`mailto:${contact.email}`} target='_blank'>  <img src="https://figmage.com/images/83_s9owiS2Lqa9YsW6yjx.png" alt="Mail Icon" className='contactus_icons_mail' /></a>
            <p id='email_title'>Our friendly team is here to help</p>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </div>
          <div>
            <img src="https://figmage.com/images/ezV3RgCwREMWgDiiHnAkK.png" alt="Location Icon"className='contactus_icons_location'/>
            <p>Come say hello to our office</p>
            <a href="https://maps.app.goo.gl/N29PbCGAYz6oWuxW7 " target="_blank"><address>{contact.address.replace(', ', '')}</address></a>
          </div>
          <div>
          <a href={`tel:${contact.phone}`}> <img src="https://figmage.com/images/4GmstiI8d_00iVKbNZlaW.png" alt="Mobile Icon" className='contactus_icons_phone'/></a>
            <p id='Office_hours'>{contact.office_hours}</p>
            <a href={`tel:${contact.phone}`}>{contact.phone}</a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Banner;