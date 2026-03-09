import React, { useState, useRef, useEffect } from "react"
import Fade from "./animations/Fade"
import { useLanguage } from "../contexts/LanguageContext"
import { getText } from "../data"
import "../styles/publications.scss"

// Import publication images/videos
import thesisDemo from "../images/publications/VNAMO_recurssive_done.mp4"


// Helper function to detect if file is a video
const isVideoFile = (url) => {
  if (!url) return false;
  const videoExtensions = ['.mp4', '.webm', '.mov', '.avi'];
  return videoExtensions.some(ext => url.toLowerCase().endsWith(ext));
};

const Thesis = () => {
  const { language } = useLanguage();
  const [videoErrors, setVideoErrors] = useState({});
  const videoRefs = useRef([]);

  // Force video play when videos come into view (helps with iOS autoplay restrictions)
  useEffect(() => {
    try {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const video = entry.target;
            try {
              forceVideoPlay(video);
            } catch (error) {
              console.warn('Error forcing video play:', error);
            }
          }
        });
      }, {
        threshold: 0.5 // Trigger when 50% of video is visible
      });

      // Observe all video elements
      videoRefs.current.forEach(video => {
        if (video) {
          try {
            observer.observe(video);
          } catch (error) {
            console.warn('Error observing video:', error);
          }
        }
      });

      return () => {
        try {
          observer.disconnect();
        } catch (error) {
          console.warn('Error disconnecting observer:', error);
        }
      };
    } catch (error) {
      console.warn('Error setting up intersection observer:', error);
    }
  }, []); // Remove the mutable dependency

  const handleVideoError = (publicationId) => {
    console.warn(`Video failed to load for publication ${publicationId}`);
    setVideoErrors(prev => ({ ...prev, [publicationId]: true }));
  };

  const forceVideoPlay = (videoElement) => {
    if (videoElement) {
      videoElement.muted = true; // Ensure it's muted for autoplay
      videoElement.loop = true;  // Ensure looping is enabled
      
      const playPromise = videoElement.play();
      
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log('Autoplay failed, attempting manual play:', error);
          // Try again after a short delay
          setTimeout(() => {
            videoElement.play().catch(e => console.log('Manual play also failed:', e));
          }, 100);
        });
      }
    }
  };

  const handleVideoEnded = (videoElement) => {
    // Fallback for devices where loop attribute might not work
    if (videoElement) {
      videoElement.currentTime = 0;
      videoElement.play().catch(e => console.log('Loop restart failed:', e));
    }
  };

  const canPlayVideo = (publication) => {
    // Only show fallback if there was an actual error, not for iOS WebM incompatibility
    return !videoErrors[publication.id];
  };

  // Thesis data with actual links
  const thesisData = [
    {
      id: 0,
      title: "Visibility-Aware Navigation for Mobile Robots among movable obstacles",
      subtitle: "Master's Thesis, University of Genoa, 2025",
      imageSrc: thesisDemo,
      projectLink: "https://github.com/Dikshant-Thakur/VNAMO.git",
      type: "Master's Thesis"
    }
  ];

  return (
    <div className="section" id="thesis">
      <div className="container">
        <Fade bottom cascade distance="20px">
          <h1>{getText({ en: "Thesis & Research", it: "Tesi e Ricerca"}, language)}</h1>
        </Fade>
        <div className="thesis-wrapper">
          <div className="grid">
            <Fade bottom distance="20px">
              {thesisData.map((thesis, index) => (
                <div key={index} className="publication-card">
                  <div 
                    className="background-media"
                    style={{
                      backgroundImage: thesis.imageSrc.endsWith('.gif')
                        ? `linear-gradient(to bottom, transparent 0%, transparent 50%, rgba(240, 248, 255, 0.5) 70%, rgba(240, 248, 255, 0.9) 85%, rgba(240, 248, 255, 1.0) 100%), url(${thesis.imageSrc})`
                        : 'none'
                    }}
                  >
                    {isVideoFile(thesis.imageSrc) && canPlayVideo(thesis) && (
                      <video
                        ref={el => {
                          try {
                            videoRefs.current[thesis.id] = el;
                          } catch (error) {
                            console.warn(`Error setting video ref for thesis ${thesis.id}:`, error);
                          }
                        }}
                        className="background-video"
                        src={thesis.imageSrc}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        loading="lazy"
                        controls={false}
                        disablePictureInPicture
                        onError={() => {
                          try {
                            handleVideoError(thesis.id);
                          } catch (error) {
                            console.warn(`Error in video error handler for thesis ${thesis.id}:`, error);
                          }
                        }}
                        onLoadStart={() => {
                          try {
                            console.log(`Loading video for thesis ${thesis.id}`);
                          } catch (error) {
                            console.warn(`Error in video load start handler for thesis ${thesis.id}:`, error);
                          }
                        }}
                        onCanPlay={(e) => {
                          try {
                            console.log(`Video can play for thesis ${thesis.id}`);
                            forceVideoPlay(e.target);
                          } catch (error) {
                            console.warn(`Error in video can play handler for thesis ${thesis.id}:`, error);
                          }
                        }}
                        onLoadedData={(e) => {
                          try {
                            console.log(`Video loaded for thesis ${thesis.id}`);
                            forceVideoPlay(e.target);
                          } catch (error) {
                            console.warn(`Error in video loaded data handler for thesis ${thesis.id}:`, error);
                          }
                        }}
                        onEnded={(e) => {
                          try {
                            console.log(`Video ended for thesis ${thesis.id}, restarting loop`);
                            handleVideoEnded(e.target);
                          } catch (error) {
                            console.warn(`Error in video ended handler for thesis ${thesis.id}:`, error);
                          }
                        }}
                        style={{
                          WebkitTransform: 'translateZ(0)',
                          transform: 'translateZ(0)',
                        }}
                      />
                    )}
                    {isVideoFile(thesis.imageSrc) && !canPlayVideo(thesis) && (
                      <div 
                        className="background-video video-fallback"
                        style={{
                          backgroundColor: '#e9ecef',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.9rem',
                          color: '#666',
                          textAlign: 'center',
                          padding: '20px'
                        }}
                      >
                        <div>
                          🎬<br/>
                          <small>Video preview not available<br/>on this device</small>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="content">
                    <div className="thesis-type" data-type={thesis.type}>{thesis.type}</div>
                    <h3 className="header">{thesis.title}</h3>
                    <h4 className="subtitle">{thesis.subtitle}</h4>
                    <button 
                      onClick={() => {
                        window.open(thesis.projectLink, "_blank");
                      }}
                      type="button" 
                      className="btn"
                    > 
                      {getText({ en: "View Thesis", it: "Visualizza Tesi" }, language)}
                    </button>
                  </div>
                </div>
              ))}
            </Fade>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Thesis