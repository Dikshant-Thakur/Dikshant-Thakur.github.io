import React, { useState, useEffect } from "react"
import Preloader from "../components/Preloader";
import Layout from "../components/layout"
import SEO from "../components/seo"
import Contact from '../components/Contact';
// Components
import Header from "../components/Header"
import Work from "../components/Work"
import About from "../components/about"
import Skills from "../components/skills"
import Footer from "../components/Footer"
import Project from "../components/projects"
import Education from "../components/Education"
import Thesis from "../components/Thesis"

const IndexPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isHiding, setIsHiding] = useState(false); // Zoom out animation ke liye

  useEffect(() => {
    // 1. Text animation ko poora hone ke liye 2.5 seconds dete hain
    const hideTimer = setTimeout(() => {
      setIsHiding(true); // Isse Zoom out animation start hoga
      
      // 2. Zoom out animation 0.8 seconds ka hoga, uske baad preloader DOM se hata denge
      setTimeout(() => {
        setIsLoading(false); 
      }, 800); 

    }, 2500); 

    return () => clearTimeout(hideTimer);
  }, []);

  return (
    <>
      {/* Agar isLoading true hai tabhi Preloader dikhega, aur isHiding prop class change karega */}
      {isLoading && <Preloader isHiding={isHiding} />}
      
      <Layout>
        {/* eslint-disable-next-line react/jsx-pascal-case */}
        <SEO title="Dikshant Thakur Portfolio" />
        <Header></Header>
        <About></About>
        <Project></Project>
        <Education></Education>
        <Thesis></Thesis>
        <Work></Work>
        <Skills></Skills>
        <Contact></Contact>
        {/* <Footer></Footer> */}
      </Layout>
    </>
  )
}

export default IndexPage