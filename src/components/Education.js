import React from "react"
import Fade from "./animations/Fade"
import { useLanguage } from "../contexts/LanguageContext"
import data, { getText } from "../data"

const Education = () => {
  const { language } = useLanguage();

  return (
    <div className="section" id="education">
      <div className="container">
        <Fade bottom cascade distance="20px">
          <h1>{getText(data.sections.education, language)}</h1>
        </Fade>
        
        <div className="education-wrapper">
          <div className="education-list">
            <Fade bottom cascade>
              {data.education.map((school, index) => (
                <div key={index} className="education-row">
                  {/* Left Side: Logo/Image (Optional, chota sa) */}
                  <div className="school-logo">
                    <img src={school.imageSrc} alt="School Logo" />
                  </div>

                  {/* Right Side: Text */}
                  <div className="school-details">
                    <h3>{getText(school.title, language)}</h3>
                    <p>{getText(school.para, language)}</p>
                    {school.url && (
                      <a href={school.url} target="_blank" rel="noopener noreferrer" className="school-link">
                        Visit Website &rarr;
                      </a>
                    )}
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

export default Education