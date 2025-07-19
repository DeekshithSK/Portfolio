import React, { useEffect, useRef, useState } from 'react'
import './App.css'
import deeImage from './dee.jpg'


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
  const [splineLoaded, setSplineLoaded] = useState(false);

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
    <div className="app">
      {/* Placeholder background */}
      {!splineLoaded && (
        <div className="spline-placeholder"></div>
      )}
      <div className="spline-wrapper">
        <div className="spline-overlay-top"></div>
        <iframe 
          src='https://my.spline.design/claritystream-U0g25lujoCvBtolJyYq6FFFz/' 
          frameBorder='0' 
          width='100%' 
          height='100%'
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1,
            pointerEvents: 'none',
            border: 'none',
            overflow: 'hidden',
            transform: 'scale(1.1)'
          }}
          onLoad={() => setSplineLoaded(true)}
        />
        <div className="spline-overlay-bottom"></div>
      </div>

      {/* Header/Navigation */}
      <header className="header">
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
      <section className="hero">
        <div className="hero-content">
          <h1>hi, <span className="name" onClick={handleScrollToAbout}>Deekshith</span> here.</h1>
          <h2>Aspiring Full Stack Developer</h2>
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
      <section className={`projects${projectsVisible ? ' slide-in visible' : ' slide-in'}`} id="projects" ref={projectsRef}>
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
      <section className={`contact${contactVisible ? ' slide-in visible' : ' slide-in'}`} id="contact" ref={contactRef}>
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