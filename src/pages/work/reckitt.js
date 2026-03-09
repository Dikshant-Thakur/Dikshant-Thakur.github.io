import React from "react"
import "../../css/worksiteStyle.scss"
import { Container } from "react-bootstrap"
import reckittLogo from "../../images/company/reckitt.png"
import Fade from "../../components/animations/Fade"
import SEO from "../../components/seo"
import Layout from "../../components/layout"

export default function ReckittTab() {
  return (
    <div>
      <Layout>
        {/* eslint-disable-next-line react/jsx-pascal-case */}
        <SEO title="OT ENGINEER – SITE SURVEY (PROJECT BASED) at Reckitt" />
        <Container>
          <figure className="position-relative">
            <img src={reckittLogo} alt="Reckitt" className="img-fluid" />
            <figcaption>
              <Fade bottom>
                <h1>OT Engineer - Site Survey - Reckitt</h1>
                <h2>10/2025 - 11/2025</h2>
                <p>
                  - Carried out a physical survey of the plant to list all PLCs, HMIs, and SCADA systems, creating a clear map of the network connections.
                  <br></br>
                  <br></br>
                  - Checked the existing asset database against the actual hardware installed on the floor, correcting errors to ensure the documentation matched reality.
                </p>
              </Fade>
            </figcaption>
          </figure>
        </Container>
      </Layout>
    </div>
  )
}
