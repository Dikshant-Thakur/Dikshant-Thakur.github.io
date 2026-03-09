import React, { useState, useEffect } from "react"
import Fade from "./animations/Fade"
import { Carousel, Modal } from "react-bootstrap"
import { useLanguage } from "../contexts/LanguageContext"
import data, { getText } from "../data"
import "../styles/projects.scss"

// Images/Videos import
import DigitalTwin from "../images/workPhotos/DigitalTwin.webm"
import autonomous_vehicle from "../images/workPhotos/autonomous_vehicle.webm"
import UVMS from "../images/workPhotos/UVMS.webm"
import ManipTPIK from "../images/workPhotos/ManipulatorsTPIK.webm"
import PLC from "../images/workPhotos/PLC_w_PC.jpg"
import Injection_Molding from "../images/workPhotos/Injection_Molding.jpg"

const Project = () => {
  const { language } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0); 
  const [isMobile, setIsMobile] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentModalData, setCurrentModalData] = useState(null);

  const mediaMap = {
    DigitalTwin, autonomous_vehicle, UVMS, ManipTPIK, PLC, Injection_Molding
  };

  const carouselItems = data.projectsCarouselItems.map(item => ({
    ...item,
    media: mediaMap[item.media],
    modalMedia: item.modalMedia ? mediaMap[item.modalMedia] : null,
    title: getText(item.title, language),
    subtitle: getText(item.subtitle, language),
    description: getText(item.description, language),
    detailedDescription: item.detailedDescription 
      ? item.detailedDescription.map(d => getText(d, language))
      : [],
    buttons: item.buttons.map(btn => ({
      ...btn,
      text: getText(btn.text, language)
    }))
  }));

  useEffect(() => {
    const checkMobile = () => { setIsMobile(window.innerWidth <= 768); };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex);
  };

  const handlePrev = () => {
    const prevIndex = activeIndex === 0 ? carouselItems.length - 1 : activeIndex - 1;
    setActiveIndex(prevIndex);
  };

  const handleNext = () => {
    const nextIndex = activeIndex === carouselItems.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const handleButtonClick = (button, item) => {
    if (item.isModal) {
      setCurrentModalData(item);
      setShowModal(true);
    } else {
      window.open(button.url);
    }
  };

  return (
    <div className="section" id="projects">
      <div className="container">
        <Fade bottom cascade distance="20px">
          <h1>{getText(data.sections.projects, language)}</h1>
        </Fade>
        
        <div className="project-wrapper">
          <Carousel 
            className="masterCarousel" 
            activeIndex={activeIndex}
            onSelect={handleSelect}
            touch={true} 
            interval={null} 
            indicators={false}
            controls={false} /* Default Bootstrap Arrows ko hide kar diya */
            variant="dark"
            fade={true}
          >
              {carouselItems.map((item, index) => (
                <Carousel.Item key={index}>
                  <div className="project-media-container">
                    {item.type === 'video' ? (
                      <div className="video-container">
                        <video className="d-block" src={item.media} autoPlay muted loop playsInline />
                      </div>
                    ) : (
                      <img className="d-block w-100" src={item.media} alt={item.title} />
                    )}
                  </div>

                  <Carousel.Caption className="carouselCaption">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    {item.buttons.map((button, bIndex) => (
                      <button key={bIndex} onClick={() => handleButtonClick(button, item)} type="button" className="btn">
                        {button.text}
                      </button>
                    ))}
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
          </Carousel>

          {/* PREMIUM WIDE NAVIGATION UI */}
          <div className="premium-carousel-controls">
            <button className="premium-nav-btn prev-btn" onClick={handlePrev}>
              <span className="arrow">&#8592;</span> <span className="text">Prev</span>
            </button>
            
            <div className="premium-slide-counter">
              <span className="current">{activeIndex + 1}</span>
              <span className="divider">/</span>
              <span className="total">{carouselItems.length}</span>
            </div>
            
            <button className="premium-nav-btn next-btn" onClick={handleNext}>
              <span className="text">Next</span> <span className="arrow">&#8594;</span>
            </button>
          </div>

          <div className="thumbnail-navigation">
            {carouselItems.map((item, index) => (
              <div 
                key={index} 
                className={`thumb-item ${index === activeIndex ? 'active' : ''}`}
                onClick={() => handleSelect(index)}
              >
                <div className="thumb-media">
                  {item.type === 'video' ? (
                    <video src={item.media} muted /> 
                  ) : (
                    <img src={item.media} alt="thumbnail" />
                  )}
                </div>
                <span className="thumb-title">{item.title}</span>
              </div>
            ))}
          </div>

        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered className="project-modal">
        {currentModalData && (
          <>
            <Modal.Header closeButton><Modal.Title>{currentModalData.title}</Modal.Title></Modal.Header>
            <Modal.Body>
              <div style={{ marginBottom: '20px' }}>
                {(currentModalData.modalMedia || currentModalData.media) && (
                   (currentModalData.type === 'video') ? 
                   <video src={currentModalData.modalMedia || currentModalData.media} controls autoPlay muted style={{ width: '100%' }} /> : 
                   <img src={currentModalData.modalMedia || currentModalData.media} alt="" style={{ width: '100%' }} />
                )}
              </div>
              <div className="modal-description">
                 {currentModalData.detailedDescription?.length > 0 ? (
                  <ul>{currentModalData.detailedDescription.map((p, i) => <li key={i}>{p}</li>)}</ul>
                 ) : <p>{currentModalData.description}</p>}
              </div>
            </Modal.Body>
          </>
        )}
      </Modal>
    </div>
  )
}

export default Project