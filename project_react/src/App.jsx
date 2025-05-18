import React, { useEffect, useRef } from 'react'
import './App.css'
import deeImage from './dee.jpg'

function App() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const animate = () => {
      const time = Date.now() * 0.001;
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      // Create main gradient
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, 'rgba(15, 23, 42, 0.8)');
      gradient.addColorStop(0.5, 'rgba(30, 41, 59, 0.9)');
      gradient.addColorStop(1, 'rgba(15, 23, 42, 0.8)');

      // Draw main gradient
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Add floating particles
      for (let i = 0; i < 100; i++) {
        const x = (Math.sin(time * 0.5 + i) * width * 0.5) + width * 0.5;
        const y = (Math.cos(time * 0.3 + i) * height * 0.5) + height * 0.5;
        const size = Math.sin(time + i) * 2 + 3;
        
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${Math.sin(time + i) * 0.1 + 0.1})`;
        ctx.fill();
      }

      // Add flowing lines
      ctx.beginPath();
      for (let i = 0; i < 3; i++) {
        const y = height * (i + 1) / 4;
        ctx.moveTo(0, y);
        for (let x = 0; x < width; x++) {
          const wave = Math.sin(x * 0.002 + time + i) * 20;
          ctx.lineTo(x, y + wave);
        }
      }
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.05)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Add subtle glow effect
      const glowGradient = ctx.createRadialGradient(
        width * 0.5, height * 0.5, 0,
        width * 0.5, height * 0.5, width * 0.5
      );
      glowGradient.addColorStop(0, 'rgba(59, 130, 246, 0.1)');
      glowGradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
      
      ctx.fillStyle = glowGradient;
      ctx.fillRect(0, 0, width, height);

      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleScrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView();
    }
  };

  return (
    <div className="app">
      <canvas ref={canvasRef} className="background-canvas"></canvas>

      {/* Header/Navigation */}
      <header className="header">
        <nav>
          <h1>Deekshith</h1>
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>hi, <span className="name" onClick={handleScrollToAbout}>Deekshith</span> here.</h1>
          <h2>Full Stack Developer</h2>
          <p>I build beautiful, responsive, and user-friendly web applications.</p>
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
        className="about"
        id="about"
      >
        <div className="about-content">
          <div className="about-image-container">
            <img 
              src={deeImage} 
              alt="Deekshith" 
              className="about-image"
            />
          </div>
          <h2>About Me</h2>
          <p>
            I am a passionate Full Stack Developer with expertise in modern web technologies.
            I love creating intuitive and engaging user experiences while writing clean and
            maintainable code. My goal is to build applications that make a positive impact
            on people's lives.
          </p>
        </div>
      </section>
    </div>
  )
}

export default App
