import React, { useEffect, useState } from "react"
import Fade from "./animations/Fade"
import { useLanguage } from "../contexts/LanguageContext"
import data, { getText } from "../data"
import { Typewriter } from "react-simple-typewriter"

// Dhumdhaam se dono photos import karein
import imgUrl from "../images/headerphoto2.jpeg"      // Desktop wali
import mobileImgUrl from "../images/mobile_robot.png" // Mobile wali

const Header = () => {
  const { language } = useLanguage();
  const [isLandscape, setIsLandscape] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                 (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
      setIsIOS(iOS);
      
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile/i.test(userAgent);
      
      // Desktop check: Mobile nahi hona chahiye aur screen width 1024 se zyada ho
      setIsDesktop(!isMobile && window.innerWidth >= 1024);
      
      setIsLandscape(window.innerWidth > window.innerHeight);
      
      const handleResize = () => {
        setIsLandscape(window.innerWidth > window.innerHeight);
        // Resize par bhi update karein
        const userAgentResize = navigator.userAgent.toLowerCase();
        const isMobileResize = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile/i.test(userAgentResize);
        setIsDesktop(!isMobileResize && window.innerWidth >= 1024);
      };

      try {
        window.addEventListener("resize", handleResize);
      } catch (error) {
        console.warn('Error adding resize listener:', error);
      }
      handleResize();
      
      return () => {
        try {
          window.removeEventListener("resize", handleResize);
        } catch (error) {
          console.warn('Error removing resize listener:', error);
        }
      };
    }
  }, []);

  const italianRoles = [
    "Ingegnere Robotico", "Ingegnere dell'Automazione Industriale", "Sviluppatore di Simulazioni", 
    "Calciatore", "Giocatore di Cricket", "Corridore", "Appassionato di Viaggi", "Beatboxer", "Giocatore di Ping Pong"
  ];

  const englishRoles = [
    "Robotics Engineer", "Industrial Automation Engineer", "Simulation Developer", 
    "Football Player", "Cricket Player", "Runner", "Travel Enthusiast", "Beatboxer", "Table Tennis Player"
  ];

  // --- LOGIC: Screen ke hisaab se photo choose karo ---
  const currentBackground = isDesktop ? imgUrl : mobileImgUrl;

  // --- IOS RETURN BLOCK (iPhone/iPad ke liye specific) ---
  if (isIOS) {
    return (
      <div className="section" id="home">
        <div className="container">
          <div className="header-wrapper ios-device">
            <div 
              className="ios-background" 
              style={{
                backgroundImage: `linear-gradient(to bottom, rgba(245, 246, 252, 0), rgba(0, 0, 0, 0.2)),url(${mobileImgUrl})`,
              }}
            />
            <div className="content-wrapper">
              <Fade bottom>
                <h2>{getText({ en: "Hi, I am", it: "Ciao, sono" }, language)} {getText(data.name, language)}{" "}</h2>
              </Fade>
              <Fade bottom>
                <div className="heading-wrapper">
                  <h1>
                    {/* iOS par "I am a" hidden hai aur color Black hai */}
                    <span style={{ color: "Black", fontWeight: "700" }}>
                      <Typewriter loop cursor cursorStyle="_" typeSpeed={70} deleteSpeed={50} delaySpeed={1200} words={language === 'it' ? italianRoles : englishRoles} />
                    </span>
                  </h1>
                </div>
              </Fade>
              <Fade bottom><p>{getText(data.headerParagraph, language)}</p></Fade>
              <Fade bottom>
                <a href={`https://www.linkedin.com/in/dikshantthakur/`} className="primary-btn">
                  {getText({ en: "CONNECT WITH ME!", it: "CONTATTAMI!" }, language)}
                </a>
              </Fade>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- MAIN RETURN BLOCK (Desktop & Android ke liye) ---
  return (
    <div className="section" id="home">
      <div className="container">
        <div 
          className={`header-wrapper ${isLandscape ? 'landscape' : 'portrait'} ${isDesktop ? 'desktop' : 'mobile'}`}
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(245, 246, 252, 0), rgba(0, 0, 0, 0.2)),url(${currentBackground})`,
          }}
        >
          <Fade bottom>
            <h2>{getText({ en: "Hi, I am", it: "Ciao, sono" }, language)} {getText(data.name, language)}{" "}</h2>
          </Fade>
          <Fade bottom>
            <div className="heading-wrapper">
              <h1>
                {/* LOGIC: Agar Desktop hai tabhi "I am a" dikhao */}
                {isDesktop && (
                  <>
                    {getText({ en: "I am a", it: "Sono un" }, language)}{" "}
                  </>
                )}
                
                {/* LOGIC: Color aur Font Weight change based on Desktop vs Mobile */}
                <span style={{ 
                  color: isDesktop ? "#00B4D8" : "Black", 
                  fontWeight: isDesktop ? "normal" : "700" 
                }}>
                  <Typewriter loop cursor cursorStyle="_" typeSpeed={70} deleteSpeed={50} delaySpeed={1200} words={language === 'it' ? italianRoles : englishRoles} />
                </span>
              </h1>
            </div>
          </Fade>
          <Fade bottom><p>{getText(data.headerParagraph, language)}</p></Fade>
          <Fade bottom>
            <a href={`https://www.linkedin.com/in/dikshantthakur/`} className="primary-btn">
              {getText({ en: "CONNECT WITH ME!", it: "CONTATTAMI!" }, language)}
            </a>
          </Fade>
        </div>
      </div>
    </div>
  );
}

export default Header