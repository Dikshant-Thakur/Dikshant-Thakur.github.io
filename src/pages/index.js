import React from "react"

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

const IndexPage = () => (
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
)

export default IndexPage
