import React from "react"
import Card from "./atoms/Card"
import Fade from "./animations/Fade"
import { useLanguage } from "../contexts/LanguageContext"
import data, { getText } from "../data"
import {useState} from "react"
import Modal from "./modal"

const Work = () => {
  const { language } = useLanguage();
  const [openModal, setOpenModal] = useState(false);

  const [id, setId] = useState(0);
  
  // Navigation functions for modal
  const handlePrevious = () => {
    if (id > 0) {
      setId(id - 1);
    }
  };
  
  const handleNext = () => {
    if (id < data.projects.length - 1) {
      setId(id + 1);
    }
  };

  return (
    <div className="section" id="work">
      <div className="container">
        <Fade bottom cascade distance="20px">
          <h1>{getText(data.sections.internships, language)}</h1>
          
          {/* UX Optimized 'Click to view' Indicator */}
          <div style={{ display: "flex", justifyContent: "center", marginTop: "-5px", marginBottom: "35px" }}>
            <span style={{ 
              fontSize: "0.85rem", 
              color: "inherit",       /* Aapki website ke theme ke hisaab se auto-adjust hoga */
              opacity: 0.7,           /* Soft look dega jisse aankhon mein na chube */
              padding: "6px 16px", 
              borderRadius: "20px",   /* Ek modern capsule/pill shape dega */
              border: "1px solid rgba(150, 150, 150, 0.3)", /* Bahut halka sa outline */
              letterSpacing: "0.5px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontWeight: "500"
            }}>
              <span style={{ fontSize: "1rem" }}></span> 
              {getText(data.sections.clickToView, language)}
            </span>
          </div>
        </Fade>
        
        <div className="work-wrapper">
          <div className="grid">
            <Fade>
              {data.projects.map((project, index) => (
                <Card
                  key={index}
                  id={index}
                  heading={getText(project.title, language)}
                  paragraph={getText(project.para, language)}
                  imgUrl={project.imageSrc}
                  projectLink={project.url}
                  setOpenModal = {setOpenModal}
                  setId = {setId}
                ></Card>
              ))}
            </Fade>
          </div>

          {openModal&&<Modal 
            closeModal={setOpenModal} 
            id={id} 
            totalItems={data.projects.length}
            onPrevious={handlePrevious}
            onNext={handleNext}
          />}
    
        </div>
      </div>
    </div>
  )
}

export default Work