import React, { useState } from "react"
import Fade from "./animations/Fade"
import siteData from "../data"
import "../styles/InfoSolution.scss" 

const InfoSolution = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  // Yahan dhyan dein: Humne 'companyLink' ko bhi data se nikal liya hai
  const { title, date, description, media, companyLink } = siteData.infoSolutionData

  const prevSlide = () => {
    setCurrentIndex(prev => (prev === 0 ? media.length - 1 : prev - 1))
  }

  const nextSlide = () => {
    setCurrentIndex(prev => (prev === media.length - 1 ? 0 : prev + 1))
  }

  const goToSlide = index => {
    setCurrentIndex(index)
  }

  if (!media || media.length === 0) return null

  const currentMedia = media[currentIndex]

  return (
    <section id="infosolution" className="section">
      <div className="container">
        
        {/* Title aur Date */}
        <Fade bottom cascade>
          <h1>{title}</h1>
          <h3>{date}</h3>
        </Fade>

        <div className="infosolution-section">
          {/* Slider / Carousel Container */}
          <div className="carousel-container">
            <div className="infosolution-carousel carousel slide">
              
              <div className="carousel-inner">
                {/* Media Container */}
                <div className="carousel-item active">
                  {currentMedia.type === "video" ? (
                    <video
                      key={currentMedia.url}
                      autoPlay
                      muted
                      loop
                      playsInline
                    >
                      <source src={currentMedia.url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <img
                      key={currentMedia.url}
                      src={currentMedia.url}
                      alt={currentMedia.caption || "Info Solution Project"}
                    />
                  )}
                </div>

                {/* Caption */}
                {currentMedia.caption && (
                  <div className="carousel-caption">
                    <h3>{currentMedia.caption}</h3>
                  </div>
                )}
              </div>

              {/* Navigation Arrows */}
              {media.length > 1 && (
                <>
                  <button
                    className="carousel-control-prev"
                    onClick={prevSlide}
                    aria-label="Previous Slide"
                  >
                    <span className="carousel-control-prev-icon" aria-hidden="true" />
                  </button>
                  <button
                    className="carousel-control-next"
                    onClick={nextSlide}
                    aria-label="Next Slide"
                  >
                    <span className="carousel-control-next-icon" aria-hidden="true" />
                  </button>
                </>
              )}

              {/* Dot Indicators */}
              {media.length > 1 && (
                <div className="carousel-indicators">
                  {media.map((_, idx) => (
                    <button
                      key={idx}
                      className={`carousel-indicator ${idx === currentIndex ? "active" : ""}`}
                      onClick={() => goToSlide(idx)}
                      aria-label={`Slide ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Description Section aur Company Link Button */}
          <div className="content">
            <Fade bottom>
              <p>{description}</p>
              
              {/* NAYA CODE: Company Link Button */}
              {companyLink && (
                <div style={{ marginTop: "25px" }}>
                  <a 
                    href={companyLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    style={{
                      display: "inline-block",
                      padding: "10px 24px",
                      backgroundColor: "#1a202c",
                      color: "#ffffff",
                      textDecoration: "none",
                      borderRadius: "8px",
                      fontWeight: "600",
                      fontSize: "1rem",
                      transition: "0.3s ease",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = "#2d3748"}
                    onMouseOut={(e) => e.target.style.backgroundColor = "#1a202c"}
                  >
                    Visit Info Solution
                  </a>
                </div>
              )}
            </Fade>
          </div>
          
        </div>
      </div>
    </section>
  )
}

export default InfoSolution