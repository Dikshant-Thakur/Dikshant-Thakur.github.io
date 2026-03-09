import React from 'react';
import '../styles/contact.scss';
import { useLanguage } from '../contexts/LanguageContext'; // Language context import kiya
import data, { getText } from '../data'; // Data aur helper function import kiya

// Icons Import
import mail from '../images/contactIcon/mail.png';
import linkedin from '../images/contactIcon/linkedin.png';
import github from '../images/contactIcon/github.svg';


const Contact = () => {
  const { language } = useLanguage(); // Current language pata karein (en/it)

  // String map for icons because data.js cannot store image imports directly
  const iconMap = {
    mail: mail,
    linkedin: linkedin,
    github: github,

  };

  return (
    <div className="contact-section" id="contact"> {/* Added id="contact" for navigation */}
      
      {/* Title with Translation */}
      <h2 className="section-title">
        {getText(data.sections.contact, language)}
      </h2>
      
      {/* Subtitle with Translation */}
      <p className="section-subtitle">
        {getText(data.contact.subtitle, language)}
      </p>
      
      <div className="contact-grid">
        {data.contact.items.map((contact, index) => (
          <a 
            key={index} 
            href={contact.link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="contact-card"
            style={{ '--hover-bg': contact.bg }}
          >
            <div className="icon-box">
              {/* Icon map se sahi image uthayein */}
              <img src={iconMap[contact.iconName]} alt={getText(contact.name, language)} />
            </div>
            
            {/* Name with Translation */}
            <span className="contact-name">
              {getText(contact.name, language)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Contact;