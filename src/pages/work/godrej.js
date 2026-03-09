import React from "react"
import "../../css/worksiteStyle.scss"
import { Container } from "react-bootstrap"
import ecobeePic from "../../images/company/Godrej&Boyce.png"
import Fade from "../../components/animations/Fade"
import SEO from "../../components/seo"
import Layout from "../../components/layout"

export default function godrejTab() {
  return (
    <div>
      <Layout>
        {/* eslint-disable-next-line react/jsx-pascal-case */}
        <SEO title="Automation Engineer at Godrej" />
        <Container>
          <figure className="position-relative">
            <img src={ecobeePic} alt="Godrej & Boyce" className="img-fluid" />
            <figcaption>
              <Fade bottom>
                <h1>Automation Engineer - Godrej</h1>
                <h2>03/2021 - 08/2023  </h2>
                <p>
                  - Managed the full lifecycle of CAPEX projects, from initial requirements gathering and system design to final on-site commissioning.
                  <br></br>
                  <br></br>
                  - Developed, modified, and debugged complex PLC and HMI programs using Siemens (TIA Portal, WinCC) and Allen-Bradley, ensuring systems met functional specifications and passed FAT/SAT.
                  <br></br>
                  - Provided technical assistance for industrial systems, performing hardware and software diagnostics to minimize downtime and ensure production continuity.
                  <br></br>
                  <br></br>
                  - Conducted detailed troubleshooting during project execution, ensuring all systems complied with technical documentation and passed rigorous testing.
                </p>
              </Fade>
            </figcaption>
          </figure>
        </Container>
      </Layout>
    </div>
  )
}
