import { useState, useEffect, useRef } from 'react';
import './Testi.css';

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const mainRef = useRef(null);
  const slideRowRef = useRef(null);
  const autoPlayRef = useRef(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch('http://localhost/Homepage/Home/src/Testimonial/Get_Testimonials.php');
        if (!response.ok) {
          throw new Error('Failed to fetch testimonials');
        }
        const data = await response.json();
        setTestimonials(data);
      } catch (error) {
        console.error('Error fetching testimonials:', error.message);
      }
    };

    fetchTestimonials();
  }, []);

  useEffect(() => {
    updateSlide();
    const resizeHandler = () => updateSlide();
    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, [currentIndex]);

  useEffect(() => {
    if (testimonials.length > 0) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const maxIndex = Math.max(testimonials.length - 3, 0);
          return prevIndex === maxIndex ? 0 : prevIndex + 1;
        });
      }, 3000);

      return () => {
        clearInterval(autoPlayRef.current);
      };
    }
  }, [testimonials]);

  const updateSlide = () => {
    if (mainRef.current && slideRowRef.current) {
      const mainWidth = mainRef.current.offsetWidth;
      const translateValue = currentIndex * -mainWidth;
      slideRowRef.current.style.transform = `translateX(${translateValue}px)`;
    }
  };

  if (testimonials.length === 0) {
    return <div>Loading testimonials...</div>;
  }

  return (
    <main ref={mainRef}>
      <h1>Testimonials</h1>
      <div className="slider">
        <div className="slide-row" ref={slideRowRef}>
          {testimonials.map((testimonial, index) => (
            <div className="slide-col" key={index}>
              <div className="content">
                <div className="imagecont">
                  <img src={testimonial.image} alt={testimonial.name} className="testimonial-image" />
                </div>
                <h2 className="Mytitle">{testimonial.name}</h2>
                <div className="star-rating">
                  <div className="stars">
                    {Array.from({ length: 5 }, (_, starIndex) => (
                      <span key={starIndex} className={starIndex < testimonial.rating ? 'star-filled' : ''}>&#9733;</span>
                    ))}
                  </div>
                </div>
                <p>{testimonial.title}</p>
                <p>{testimonial.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="indicator">
        {testimonials.slice(0, Math.max(testimonials.length - 2, 1)).map((_, index) => (
          <span
            key={index}
            className={`btn ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </main>
  );
};

export default Testimonial;
