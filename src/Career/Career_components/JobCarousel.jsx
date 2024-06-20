import { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

import 'aos/dist/aos.css';

const JobCarousel = () => {


  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [jobData, setJobData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost/Homepage/Home/php_web_v1.9/main.php');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setJobData(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const handleOnSlideChange = (e) => {
    console.log(`Slide changed to index: ${e.item}`);
  };

  return (
    <div className="Jobcardsec">
      <div className="cardcont" data-aos="fade-up">
        <AliceCarousel
          mouseTracking
          items={jobData.map((card, index) => (
            <div className="carousel-cell" key={index}>
              <div className="jobimage">
                <img src={card.image_url} alt={card.Position} className="job1" />
              </div>
              <div className="card-content">
                <h3 className="cardheader">{card.Position}</h3>
                <p className="cardheaderexp">Experience: {card.experience}</p>
                <p className="cardDesc">{card.description}</p>
                <a href={card.link}>
                  <button className="jobbtn">{card.button}</button>
                </a>
              </div>
            </div>
          ))}
          responsive={{
            0: { items: 1 },
            600: { items: 2 },
            1024: { items: 3 },
          }}
          onSlideChange={handleOnSlideChange}
          renderPrevButton={() => (
            <button className="carousel-button prev glow-on-hover" type="button">‹</button>
          )}
          renderNextButton={() => (
            <button className="carousel-button next glow-on-hover">›</button>
          )}
        />
      </div>
    </div>
  );
};

export default JobCarousel;
