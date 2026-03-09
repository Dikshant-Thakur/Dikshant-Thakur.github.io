import React from "react"
import SEO from "../components/seo"
import Layout from "../components/layout"
import Fade from "../components/animations/Fade"
import "../css/resume.scss"
import { useLanguage } from "../contexts/LanguageContext"
import data, { getText } from "../data"
import { FaDownload, FaFilePdf } from "react-icons/fa"

const ResumeContent = () => {
  const { language } = useLanguage();

  // 1. Yahan hum language ke hisab se File ID set kar rahe hain
  const fileIds = {
    en: "10TRQ_4nZVYNNWEjNt6fA2nIzF05dw9uo", // English CV ID (Jo abhi chal rahi hai)
    it: "1Wj3jGWAsVWsRVB_V7K9J2BaGWbNhMo_G",        // Italian CV ID (Yahan nayi ID dalna)
  };

  // 2. Current Language ki ID uthao (Agar IT nahi mili to EN default rahegi)
  const currentFileId = fileIds[language] || fileIds['en'];

  // 3. Links ab dynamic ban gaye hain
  const previewUrl = `https://drive.google.com/file/d/${currentFileId}/preview`;
  const downloadUrl = `https://drive.google.com/uc?export=download&id=${currentFileId}`;
  
  const resumeTitle = getText(data.nav.resume, language);
  const downloadText = language === 'it' ? "Scarica CV" : "Download CV"; // Button text bhi change hoga

  return (
    <div className="section" id="resume">
      <div className="container">
        <Fade bottom cascade distance="20px">
          <h1 style={{marginBottom: "30px"}}>{resumeTitle}</h1>
        </Fade>

        <Fade bottom duration={1000} distance="20px">
          <div style={{ 
            display: "flex", 
            flexWrap: "wrap", 
            gap: "30px", 
            alignItems: "flex-start" 
          }}>
            
            {/* LEFT SIDE: Resume Preview */}
            <div style={{ flex: "2 1 600px", minWidth: "300px" }}>
              <div className="resume-container" style={{ 
                position: "relative", 
                paddingBottom: "130%", 
                height: 0, 
                overflow: "hidden", 
                background: "#f0f0f0", 
                borderRadius: "8px", 
                boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                border: "1px solid #ddd"
              }}>
                <iframe 
                  src={previewUrl} 
                  allow="autoplay" 
                  title={resumeTitle}
                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
                />
              </div>
            </div>

            {/* RIGHT SIDE: Download Options */}
            <div style={{ 
              flex: "1 1 250px", 
              backgroundColor: "#f8f9fa", 
              padding: "25px", 
              borderRadius: "10px", 
              boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
              textAlign: "center",
              position: "sticky", 
              top: "100px"
            }}>
              <FaFilePdf size={50} color="#dc3545" style={{ marginBottom: "15px" }} />
              <h3 style={{ fontSize: "1.2rem", marginBottom: "10px" }}>
                {language === 'it' ? "Versione PDF" : "PDF Version"}
              </h3>
              <p style={{ fontSize: "0.9rem", color: "#666", marginBottom: "20px" }}>
                {language === 'it' 
                  ? "Ottieni una versione PDF del mio curriculum."
                  : "Get a generic PDF version of my resume."}
              </p>
              
              <a 
                href={downloadUrl} 
                className="btn btn-primary"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  padding: "12px 20px",
                  backgroundColor: "#333",
                  color: "#fff",
                  textDecoration: "none",
                  borderRadius: "5px",
                  fontWeight: "bold",
                  width: "100%",
                  transition: "0.3s"
                }}
              >
                <FaDownload /> {downloadText}
              </a>
              
              <div style={{ marginTop: "15px", fontSize: "0.8rem", color: "#888" }}>
                Format: PDF <br/> Size: ~2 MB
              </div>
            </div>

          </div>
        </Fade>
      </div>
    </div>
  );
};

export default function Resume() {
  return (
    <div>
      <Layout>
        {/* eslint-disable-next-line react/jsx-pascal-case */}
        <SEO title="Resume" />
        <ResumeContent />
      </Layout>
    </div>
  )
}