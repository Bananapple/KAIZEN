import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const customStyles = {
  root: {
    '--bg-color': '#FFFFFF',
    '--text-primary': '#111111',
    '--text-secondary': '#555555',
    '--text-inverse': '#FFFFFF',
    '--accent-line': '#E5E5E5',
    '--font-family': 'Roboto, Arial, sans-serif',
    '--font-size-hero': '3.5rem',
    '--font-size-lead': '2rem',
    '--font-size-h3': '0.875rem',
    '--font-size-body': '1rem',
    '--font-weight-light': '300',
    '--font-weight-regular': '400',
    '--spacing-unit': '8px',
    '--container-padding': '6vw',
    '--section-gap': '120px'
  },
  heroBlock: {
    height: '85vh',
    minHeight: '600px',
    width: '100%',
    background: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop') center/cover no-repeat",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: 'var(--container-padding)',
    paddingBottom: '80px',
    color: 'var(--text-inverse)'
  }
};

const ContactModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const FORMSPREE_ID = 'xpqrogna';

      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          company: formData.company,
          email: formData.email,
          message: formData.message,
          _replyto: formData.email,
          _subject: `New contact from ${formData.name} - ${formData.company}`
        })
      });

      if (response.ok) {
        alert('Thank you for your message! We will get back to you soon.');
        setFormData({ name: '', company: '', email: '', message: '' });
        onClose();
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('Form submission failed:', errorData);
        alert('There was an error sending your message. Please try again or email us directly at nicholas@kaizengrp.co');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error sending your message. Please try again or email us directly at nicholas@kaizengrp.co');
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      padding: '20px'
    }} onClick={onClose}>
      <div style={{
        backgroundColor: 'white',
        padding: '60px',
        maxWidth: '600px',
        width: '100%',
        borderRadius: '0',
        position: 'relative'
      }} onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            color: 'var(--text-secondary)'
          }}
        >
          ×
        </button>

        <h2 style={{
          fontSize: '2rem',
          marginBottom: '40px',
          fontWeight: '400',
          color: 'var(--text-primary)'
        }}>Get in touch</h2>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '0.875rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: 'var(--text-primary)'
            }}>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '1rem',
                border: '1px solid var(--accent-line)',
                borderRadius: '0',
                fontFamily: 'var(--font-family)'
              }}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '0.875rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: 'var(--text-primary)'
            }}>Company</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '1rem',
                border: '1px solid var(--accent-line)',
                borderRadius: '0',
                fontFamily: 'var(--font-family)'
              }}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '0.875rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: 'var(--text-primary)'
            }}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '1rem',
                border: '1px solid var(--accent-line)',
                borderRadius: '0',
                fontFamily: 'var(--font-family)'
              }}
            />
          </div>

          <div style={{ marginBottom: '32px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '0.875rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: 'var(--text-primary)'
            }}>Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="6"
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '1rem',
                border: '1px solid var(--accent-line)',
                borderRadius: '0',
                fontFamily: 'var(--font-family)',
                resize: 'vertical'
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              backgroundColor: '#000',
              color: '#fff',
              padding: '16px 48px',
              fontSize: '1rem',
              border: 'none',
              borderRadius: '0',
              cursor: 'pointer',
              fontFamily: 'var(--font-family)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              fontWeight: '500'
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

const NavBar = ({ onContactClick }) => {
  return (
    <nav className="nav-bar" style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '40px var(--container-padding)',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 10,
      color: 'var(--text-inverse)'
    }}>
      <div className="logo" style={{
        fontSize: '0.875rem',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        fontWeight: '500'
      }}>Kaizen</div>
      <div className="nav-links" style={{ display: 'flex' }}>
        <a href="#services" style={{ marginLeft: '32px', fontSize: '0.875rem' }}>Expertise</a>
        <a href="#about" style={{ marginLeft: '32px', fontSize: '0.875rem' }}>About</a>
        <a href="#" onClick={(e) => { e.preventDefault(); onContactClick(); }} style={{ marginLeft: '32px', fontSize: '0.875rem' }}>Contact</a>
      </div>
    </nav>
  );
};

const CTALink = ({ href, children, isDark = false, onClick }) => {
  return (
    <a
      href={href}
      onClick={onClick}
      className="cta-link"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        fontSize: '1.1rem',
        borderBottom: isDark ? '1px solid #000' : '1px solid rgba(255,255,255,0.5)',
        paddingBottom: '4px',
        transition: 'all 0.3s ease',
        textDecoration: 'none',
        color: 'inherit',
        cursor: 'pointer'
      }}
    >
      {children}
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: '8px' }}>
        <path d="M1 13L13 1M13 1H5M13 1V9" stroke={isDark ? "black" : "currentColor"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
      </svg>
    </a>
  );
};

const HeroBlock = ({ onContactClick }) => {
  return (
    <div className="hero-block" style={customStyles.heroBlock}>
      <h1 className="hero-headline" style={{
        fontSize: 'var(--font-size-hero)',
        fontWeight: 'var(--font-weight-regular)',
        maxWidth: '800px',
        lineHeight: '1.1',
        marginBottom: '60px',
        letterSpacing: '-0.02em'
      }}>
        Precision in process.<br />Power in technology.
      </h1>
      <CTALink href="#" onClick={(e) => { e.preventDefault(); onContactClick(); }}>Let's Talk</CTALink>
    </div>
  );
};

const IntroSection = () => {
  return (
    <section className="intro-section" style={{
      padding: '0 var(--container-padding)',
      marginBottom: 'var(--section-gap)',
      display: 'grid',
      gridTemplateColumns: '1.5fr 1fr',
      gap: '60px'
    }}>
      <div className="lead-text" style={{
        fontSize: 'var(--font-size-lead)',
        lineHeight: '1.3',
        fontWeight: 'var(--font-weight-regular)',
        color: 'var(--text-primary)',
        maxWidth: '30ch'
      }}>
        Helping enterprises and investment firms institutionalize excellence through modern processes and technology.
      </div>
      <div className="bio-text" style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        color: 'var(--text-secondary)',
        alignSelf: 'end'
      }}>
        <p>Built on a foundation in investment banking and venture capital, we bridge the gap between capital markets and operational excellence. We deliver strategic advisory designed to maximize enterprise value - guiding our clients through M&A, digital transformation, and operational scaling.</p>
      </div>
    </section>
  );
};

const ServiceColumn = ({ title, services }) => {
  return (
    <div className="service-column" style={{
      display: 'flex',
      flexDirection: 'column'
    }}>
      <span className="uppercase-label" style={{
        fontSize: 'var(--font-size-h3)',
        textTransform: 'uppercase',
        letterSpacing: '0.02em',
        marginBottom: '24px',
        display: 'block',
        color: 'var(--text-primary)'
      }}>{title}</span>
      <ul className="service-list" style={{ listStyle: 'none' }}>
        {services.map((service, index) => (
          <li key={index} style={{
            fontSize: '1.1rem',
            marginBottom: '16px',
            color: 'var(--text-primary)',
            paddingBottom: '16px',
            borderBottom: '1px solid transparent'
          }}>
            <strong>{service.name}</strong>
            <p className="service-description" style={{
              fontSize: '0.95rem',
              color: 'var(--text-secondary)',
              marginTop: '8px',
              lineHeight: '1.5',
              maxWidth: '90%',
              whiteSpace: 'pre-line'
            }}>{service.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ServicesSection = () => {
  const serviceColumns = [
    {
      title: 'Technology Leverage',
      services: [
        { name: 'AI Integration', description: 'Implementing LLM workflows to automate operational bottlenecks.' },
        { name: 'Technology DD', description: 'Assessment of IT infrastructure, software architecture, security and development processes.' },
        { name: 'Software Stack Audit', description: 'Optimizing toolchain ROI and data interoperability.' }
      ]
    },
    {
      title: 'Process Design',
      services: [
        { name: 'FinOps', description: 'Financial reporting, automation of workflow and processes.' },
        { name: 'Sales Engineering, RevOps', description: 'Systematizing the funnel from lead gen to close.\n\n' },
        { name: 'Engineering Ops', description: 'Standardizing delivery cycles and quality assurance.' }
      ]
    },
    {
      title: 'Corporate Finance',
      services: [
        { name: 'M&A Readiness', description: 'Exit strategy and deal execution.\n\n' },
        { name: 'Post-Merger Integration', description: 'Unifying systems and cultures for value realization.\n\n' },
        { name: 'Capital markets', description: 'Fundraising and investor relations.' }
      ]
    }
  ];

  return (
    <section id="services" className="services-section" style={{
      padding: '0 var(--container-padding)',
      marginBottom: 'var(--section-gap)'
    }}>
      <div className="grid-header" style={{
        marginBottom: '60px',
        borderBottom: '1px solid var(--accent-line)',
        paddingBottom: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
      }}>
        <span className="uppercase-label" style={{
          fontSize: 'var(--font-size-h3)',
          textTransform: 'uppercase',
          letterSpacing: '0.02em',
          marginBottom: '0',
          display: 'block',
          color: 'var(--text-primary)'
        }}>Capabilities</span>
      </div>
      
      <div className="services-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '40px'
      }}>
        {serviceColumns.map((column, index) => (
          <ServiceColumn key={index} title={column.title} services={column.services} />
        ))}
      </div>
    </section>
  );
};

const BackgroundSection = () => {
  return (
    <section id="about" className="background-section" style={{
      backgroundColor: '#F8F8F8',
      padding: '100px var(--container-padding)',
      marginBottom: 'var(--section-gap)'
    }}>
      <div className="container" style={{ padding: 0 }}>
        
        <div className="background-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '80px'
        }}>
          <div>
            <h3 style={{ fontSize: '2rem', marginBottom: '20px', fontWeight: '400' }}>$12B+</h3>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '400px', lineHeight: '1.6' }}>
              TRANSACTION VOLUME ADVISED
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: '2rem', marginBottom: '20px', fontWeight: '400' }}>4x</h3>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '400px', lineHeight: '1.6' }}>
              VALUATION UPLIFT ON AVERAGE
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: '2rem', marginBottom: '20px', fontWeight: '400' }}>GLOBAL</h3>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '400px', lineHeight: '1.6' }}>
              WE SPEAK ENGLISH, FRENCH & SCANDINAVIAN
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = ({ onContactClick }) => {
  return (
    <footer id="contact" style={{
      padding: '80px var(--container-padding)',
      paddingTop: 0
    }}>
      <div className="footer-grid" style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 1fr 1fr',
        gap: '40px',
        marginBottom: '100px'
      }}>
        <div className="footer-col">
          <h2 style={{ fontSize: '2rem', marginBottom: '40px', fontWeight: '400' }}>Ready to scale?</h2>
          <CTALink href="#" onClick={(e) => { e.preventDefault(); onContactClick(); }} isDark={true}>Get in touch</CTALink>
        </div>

        <div className="footer-col">
          <h4 style={{
            fontSize: 'var(--font-size-h3)',
            textTransform: 'uppercase',
            marginBottom: '24px',
            fontWeight: '400'
          }}>Social</h4>
          <ul style={{ listStyle: 'none' }}>
            <li style={{ marginBottom: '12px', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
              <a href="https://www.linkedin.com/in/nicholasvibe/" target="blank">LinkedIn</a>
            </li>
            <li style={{ marginBottom: '12px', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
              <a href="#">Twitter / X</a>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 style={{
            fontSize: 'var(--font-size-h3)',
            textTransform: 'uppercase',
            marginBottom: '24px',
            fontWeight: '400'
          }}>Legal</h4>
          <ul style={{ listStyle: 'none' }}>
            <li style={{ marginBottom: '12px', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
              <a href="#">Privacy</a>
            </li>
            <li style={{ marginBottom: '12px', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
              <a href="#">Terms</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom" style={{
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '0.8rem',
        color: 'var(--text-secondary)',
        borderTop: '1px solid var(--accent-line)',
        paddingTop: '32px'
      }}>
        <div className="footer-logo" style={{
          fontSize: '0.875rem',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          marginTop: '0'
        }}>KAIZEN</div>
        <div className="footer-copyright">© 2025 Kaizen. All rights reserved.</div>
      </div>
    </footer>
  );
};

const HomePage = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const handleContactClick = () => {
    setIsContactModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsContactModalOpen(false);
  };

  return (
    <>
      <header style={{ width: '100%', marginBottom: 'var(--section-gap)' }}>
        <NavBar onContactClick={handleContactClick} />
        <HeroBlock onContactClick={handleContactClick} />
      </header>
      <IntroSection />
      <ServicesSection />
      <BackgroundSection />
      <Footer onContactClick={handleContactClick} />
      <ContactModal isOpen={isContactModalOpen} onClose={handleCloseModal} />
    </>
  );
};

const App = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      :root {
        --bg-color: #FFFFFF;
        --text-primary: #111111;
        --text-secondary: #555555;
        --text-inverse: #FFFFFF;
        --accent-line: #E5E5E5;
        --font-family: 'Roboto', Arial, sans-serif;
        --font-size-hero: 3.5rem;
        --font-size-lead: 2rem;
        --font-size-h3: 0.875rem;
        --font-size-body: 1rem;
        --font-weight-light: 300;
        --font-weight-regular: 400;
        --spacing-unit: 8px;
        --container-padding: 6vw;
        --section-gap: 120px;
      }

      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
      }

      body {
        font-family: var(--font-family);
        background-color: var(--bg-color);
        color: var(--text-primary);
        line-height: 1.5;
      }

      a {
        text-decoration: none;
        color: inherit;
        cursor: pointer;
        transition: opacity 0.2s ease;
      }
      
      a:hover {
        opacity: 0.7;
      }

      .cta-link:hover {
        border-bottom-color: #FFFFFF !important;
        opacity: 1 !important;
      }

      .footer-col li a:hover {
        color: var(--text-primary);
        opacity: 1;
      }

      @media (max-width: 1024px) {
        .hero-headline {
          font-size: 2.5rem !important;
        }
        .intro-section {
          grid-template-columns: 1fr !important;
          gap: 40px !important;
        }
        .services-grid {
          grid-template-columns: 1fr 1fr !important;
        }
        .footer-grid {
          grid-template-columns: 1fr 1fr !important;
        }
      }

      @media (max-width: 768px) {
        :root {
          --container-padding: 24px;
        }
        .services-grid {
          grid-template-columns: 1fr !important;
        }
        .background-grid {
          grid-template-columns: 1fr !important;
        }
        .footer-grid {
          grid-template-columns: 1fr !important;
          gap: 40px !important;
        }
        .footer-bottom {
          flex-direction: column !important;
          gap: 20px !important;
        }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <Router basename="/">
      <div style={customStyles.root}>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;