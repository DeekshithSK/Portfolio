import React, { useEffect, useRef, useState } from 'react'
import './App.css'
import deeImage from './dee.jpg'

import Particles from './Particles';
import RotatingText from './RotatingText';


function useSlideInOnScroll() {
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

function App() {
  const [aboutRef, aboutVisible] = useSlideInOnScroll();
  const [projectsRef, projectsVisible] = useSlideInOnScroll();
  const [contactRef, contactVisible] = useSlideInOnScroll();
  // Removed: const [splineLoaded, setSplineLoaded] = useState(false);

  const handleScrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app" style={{ position: 'relative', zIndex: 0 }}>
      {/* Particles Background */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0, pointerEvents: 'none' }}>
        <Particles
          particleColors={['#ffffff', '#ffffff']}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>
      {/* Header/Navigation */}
      <header className="header" style={{ position: 'relative', zIndex: 1 }}>
        <nav>
          <h1>Deekshith</h1>
          <ul>
            <li><a href="#about" onClick={(e) => { e.preventDefault(); handleScrollToAbout(); }}>About</a></li>
            <li><a href="#projects" onClick={(e) => { e.preventDefault(); handleScrollToProjects(); }}>Projects</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero" style={{ position: 'relative', zIndex: 1 }}>
        {/* Remove Orb as hero background */}
        <div className="hero-content" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <h1>hi, <span className="name" onClick={handleScrollToAbout}>Deekshith</span> here.</h1>
          <h2 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', width: '100%', marginLeft: '9.3rem' }}>
            <span style={{ flexShrink: 0 }}>Aspiring</span>
            <span style={{ display: 'inline-block', minWidth: '23ch', textAlign: 'left' }}>
              <RotatingText
                texts={['Fullstack Developer', 'Cybersecurity Analyst']}
                mainClassName="px-2 sm:px-2 md:px-3 bg-cyan-300 text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
                staggerFrom={"last"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={3500}
              />
            </span>
          </h2>
          <p>I build aesthetically pleasing, responsive, and user-friendly web applications.</p>
          <button 
            className="cta-button"
            onClick={handleScrollToAbout}
          >
            Learn More About Me
          </button>
        </div>
      </section>

      {/* About Section */}
      <section 
        id="about"
        ref={aboutRef}
        className={`about${aboutVisible ? ' slide-in visible' : ' slide-in'}`}
        style={{ position: 'relative', zIndex: 1 }}
      >
        <div className="about-flex">
          <div className="about-left">
            <h2>About Me</h2>
            <p>
              Front-end developer passionate about creating responsive and user-friendly web interfaces.
              Experienced in building personal projects using React, HTML,CSS,JavaScript,Python,Flask and Bootstrap. Eager to learn and contribute to real-world development teams through internship opportunities.
            </p>
            {/* Education Subsection */}
            <div className="education-section">
              <h3 className="education-title">EDUCATION</h3>
              <div className="education-card">
                <div className="education-header">
                  <div>
                    <span className="degree">Bachelor of Computer Applications (BCA)</span>
                    <br />
                    <a href="https://nitte.edu.in/" className="institute" target="_blank" rel="noopener noreferrer">
                      Nitte Institute of Professional Education, Mangalore
                    </a>
                  </div>
                </div>
                <p>Expected Graduation: 2026</p>
              </div>
            </div>
            {/* Co-founder Subsection */}
            <div className="education-section">
              <h3 className="education-title">Co-founder</h3>
              <div
                className="education-card"
                style={{ cursor: 'pointer' }}
                onClick={() => window.open('https://chaithra-e2135.web.app/', '_blank', 'noopener noreferrer')}
                tabIndex={0}
                onKeyPress={e => { if (e.key === 'Enter') window.open('https://chaithra-e2135.web.app/', '_blank', 'noopener noreferrer'); }}
                role="button"
                aria-label="Visit ApertureAura Camera rentals company website"
              >
                <div className="education-header">
                  <div>
                    <span className="degree">Co-founder of <span style={{ fontWeight: 700, }}> ApertureAura</span></span>
                    <br />
                    <a href="https://chaithra-e2135.web.app/" className="institute" target="_blank" rel="noopener noreferrer">
                      Camera rentals company, Mangalore
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="about-image-container about-image-right">
            <img 
              src={deeImage} 
              alt="Deekshith" 
              className="about-image"
            />
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className={`projects${projectsVisible ? ' slide-in visible' : ' slide-in'}`} id="projects" ref={projectsRef} style={{ position: 'relative', zIndex: 1 }}>
        <h2>My Projects</h2>
        <div className="projects-grid">
          <a 
            href="https://library-management-system-vp40.onrender.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="project-card"
          >
            <div className="project-content">
              <h3>Library Management System</h3>
              <p>A full-stack web application for managing library resources, featuring user authentication, book management, and admin controls.</p>
              <p>Password to access the page "admin12345"</p>
              <div className="project-tech">
                <span>HTML</span>
                <span>CSS</span>
                <span>Python</span>
                <span>Flask</span>
                <span>Bootstrap</span>
              </div>
              <div className="project-link">
                Visit Project →
              </div>
            </div>
          </a>
        </div>
      </section>

      {/* Contact Section */}
      <section className={`contact${contactVisible ? ' slide-in visible' : ' slide-in'}`} id="contact" ref={contactRef} style={{ position: 'relative', zIndex: 1 }}>
        <h2>Get In Touch</h2>
        <div className="contact-content">
          <div className="contact-card">
            <div className="contact-item">
              <i className="fas fa-phone"></i>
              <h3>Phone</h3>
              <a href="tel:+918618232639">+91 8618232639</a>
            </div>
            <div className="contact-item">
              <i className="fas fa-envelope"></i>
              <h3>Email</h3>
              <a href="mailto:deekshithsk24@gmail.com">deekshithsk24@gmail.com</a>
            </div>
            <div className="contact-item">
              <i className="fab fa-linkedin"></i>
              <h3>LinkedIn</h3>
              <a href="https://www.linkedin.com/in/deekshith-sk-aa0694274" target="_blank" rel="noopener noreferrer">
                deekshith-sk
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default App