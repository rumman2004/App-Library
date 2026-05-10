import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { myData } from '../data/MyData';
import { ArrowUpRight, MessageCircle, Mail } from 'lucide-react';

const Contact = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      tl.fromTo('.ct-title-word', 
        { y: 100, opacity: 0, rotateX: -20 },
        { y: 0, opacity: 1, rotateX: 0, duration: 1.2, stagger: 0.1, ease: 'power4.out' }
      );
      
      tl.fromTo('.ct-fade-in',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power3.out' },
        "-=0.6"
      );

      tl.fromTo('.ct-line',
        { scaleX: 0 },
        { scaleX: 1, duration: 1.5, ease: 'power3.inOut', stagger: 0.2 },
        "-=1.0"
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // We are using Web3Forms to send emails without a backend.
      // 1. Go to https://web3forms.com/
      // 2. Enter your email (rumman.ahmed.work@gmail.com) to get an Access Key.
      // 3. Paste the Access Key below:
      const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: formState.name,
          email: formState.email,
          message: formState.message,
          subject: `New Portfolio Contact from ${formState.name}`,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setFormState({ name: '', email: '', message: '' });
        alert('Message sent successfully! I will get back to you soon.');
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      alert('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppSubmit = () => {
    if (!formState.name || !formState.email || !formState.message) {
      alert("Please fill out all fields before sending via WhatsApp.");
      return;
    }
    
    // Replace with your actual WhatsApp number including the country code (e.g., 91 for India)
    const phoneNumber = import.meta.env.VITE_WHATSAPP_NUMBER; 
    
    const text = `Hello Rumman!\n\nName: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
    
    window.open(url, '_blank');
    setFormState({ name: '', email: '', message: '' });
  };

  return (
    <div ref={containerRef} className="ct-container">
      {/* ── STYLES ── */}
      <style>{`
        .ct-container {
          background-color: var(--bg);
          min-height: 100vh;
          padding-top: 160px;
          padding-bottom: 120px;
          color: var(--text);
          position: relative;
          overflow: hidden;
        }

        .ct-wrap {
          max-width: 1300px;
          margin: 0 auto;
          padding: 0 6vw;
          position: relative;
          z-index: 10;
        }

        .ct-h1 {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(4rem, 12vw, 9rem);
          font-weight: 700;
          line-height: 0.85;
          letter-spacing: -0.04em;
          margin-bottom: 4rem;
          display: flex;
          flex-wrap: wrap;
          column-gap: 2rem;
        }

        .ct-title-word {
          display: inline-block;
          will-change: transform, opacity;
        }

        .ct-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 6rem;
          margin-top: 2rem;
        }
        @media (min-width: 1024px) {
          .ct-grid { grid-template-columns: 1fr 1fr; gap: 8rem; }
        }

        /* ── LEFT COLUMN: INFO ── */
        .ct-info-block {
          margin-bottom: 4rem;
        }

        .ct-label {
          font-family: 'DM Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 1.5rem;
          display: block;
        }

        .ct-email-link {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(1.5rem, 3vw, 2.5rem);
          font-weight: 400;
          color: var(--text);
          text-decoration: none;
          display: inline-block;
          position: relative;
          padding-bottom: 0.5rem;
        }
        .ct-email-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: var(--gold);
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.4s cubic-bezier(0.19, 1, 0.22, 1);
        }
        .ct-email-link:hover::after {
          transform: scaleX(1);
          transform-origin: left;
        }

        .ct-social-list {
          list-style: none;
          padding: 0;
          margin: 0;
          border-top: 1px solid rgba(0,0,0,0.06);
        }
        .ct-social-item {
          border-bottom: 1px solid rgba(0,0,0,0.06);
        }
        .ct-social-link {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 0;
          text-decoration: none;
          color: var(--text);
          font-family: 'DM Sans', sans-serif;
          font-size: 1.125rem;
          font-weight: 500;
          transition: all 0.3s ease;
        }
        .ct-social-link .ct-arrow {
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          color: var(--text-muted);
        }
        .ct-social-link:hover {
          color: var(--gold);
        }
        .ct-social-link:hover .ct-arrow {
          transform: translate(4px, -4px);
          color: var(--gold);
        }

        /* ── RIGHT COLUMN: FORM ── */
        .ct-form-wrap {
          background: transparent;
        }

        .ct-input-group {
          position: relative;
          margin-bottom: 3.5rem;
        }

        .ct-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(0,0,0,0.15);
          padding: 1rem 0;
          font-family: 'DM Sans', sans-serif;
          font-size: 1.25rem;
          color: var(--text);
          outline: none;
          border-radius: 0;
          transition: border-color 0.3s ease;
        }
        .ct-input::placeholder {
          color: rgba(0,0,0,0.25);
          font-weight: 300;
        }
        .ct-input:focus {
          border-bottom-color: var(--gold);
        }

        .ct-textarea {
          resize: none;
          min-height: 140px;
        }

        /* Animated bottom border on focus */
        .ct-input-focus-line {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: var(--gold);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.19, 1, 0.22, 1);
          pointer-events: none;
        }
        .ct-input:focus ~ .ct-input-focus-line {
          transform: scaleX(1);
        }

        .ct-submit {
          display: inline-flex;
          align-items: center;
          gap: 1rem;
          background: transparent;
          border: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--text);
          cursor: pointer;
          padding: 0;
          position: relative;
        }
        .ct-submit-icon {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 1px solid rgba(0,0,0,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          color: var(--text);
        }
        .ct-submit:hover .ct-submit-icon {
          background: var(--gold);
          border-color: var(--gold);
          color: #fff;
          transform: scale(1.05);
        }
        .ct-submit:hover .ct-submit-arrow {
          transform: translate(2px, -2px);
        }
        .ct-submit:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* ── DECORATIVE ── */
        .ct-bg-blur {
          position: absolute;
          top: -20%;
          right: -10%;
          width: 800px;
          height: 800px;
          background: radial-gradient(circle, rgba(166,136,50,0.04) 0%, transparent 60%);
          filter: blur(80px);
          z-index: 0;
          pointer-events: none;
        }
      `}</style>

      <div className="ct-bg-blur" />

      <div className="ct-wrap">
        
        {/* ── HEADER ── */}
        <h1 className="ct-h1">
          <span className="ct-title-word">Let's</span>
          <span className="ct-title-word">collaborate.</span>
        </h1>

        <div className="ct-grid">
          
          {/* ── LEFT: INFO ── */}
          <div className="ct-fade-in">
            <div className="ct-info-block">
              <span className="ct-label">Direct Line</span>
              <a href={`mailto:${myData.email}`} className="ct-email-link">
                rumman.ahmed.work@gmail.com
              </a>
            </div>

            <div className="ct-info-block">
              <span className="ct-label">Digital Presence</span>
              <ul className="ct-social-list">
                <li className="ct-social-item">
                  <a href={myData.github} target="_blank" rel="noopener noreferrer" className="ct-social-link">
                    GitHub <ArrowUpRight className="ct-arrow" size={20} />
                  </a>
                </li>
                <li className="ct-social-item">
                  <a href={myData.linkedin} target="_blank" rel="noopener noreferrer" className="ct-social-link">
                    LinkedIn <ArrowUpRight className="ct-arrow" size={20} />
                  </a>
                </li>
                <li className="ct-social-item">
                  <a href={myData.twitter} target="_blank" rel="noopener noreferrer" className="ct-social-link">
                    Twitter / X <ArrowUpRight className="ct-arrow" size={20} />
                  </a>
                </li>
                <li className="ct-social-item">
                  <a href={myData.instagram} target="_blank" rel="noopener noreferrer" className="ct-social-link">
                    Instagram <ArrowUpRight className="ct-arrow" size={20} />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* ── RIGHT: FORM ── */}
          <div className="ct-fade-in ct-form-wrap">
            <span className="ct-label" style={{ marginBottom: '2.5rem' }}>Send a Message</span>
            
            <form onSubmit={handleSubmit}>
              <div className="ct-input-group">
                <input
                  type="text"
                  id="name"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="ct-input"
                  placeholder="What's your name?"
                />
                <div className="ct-input-focus-line" />
              </div>

              <div className="ct-input-group">
                <input
                  type="email"
                  id="email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="ct-input"
                  placeholder="Your email address"
                />
                <div className="ct-input-focus-line" />
              </div>

              <div className="ct-input-group">
                <textarea
                  id="message"
                  required
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="ct-input ct-textarea"
                  placeholder="Tell me about your project..."
                />
                <div className="ct-input-focus-line" />
              </div>

              <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginTop: '1rem' }}>
                <button type="submit" disabled={isSubmitting} className="ct-submit" title="Send via Email">
                  <span style={{ fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </span>
                  <div className="ct-submit-icon">
                    <Mail className="ct-submit-arrow" size={20} />
                  </div>
                </button>

                <button type="button" onClick={handleWhatsAppSubmit} disabled={isSubmitting} className="ct-submit" title="Send via WhatsApp">
                  <span style={{ fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
                    WhatsApp
                  </span>
                  <div className="ct-submit-icon" style={{ borderColor: 'rgba(37, 211, 102, 0.4)' }}>
                    <MessageCircle className="ct-submit-arrow" size={20} color="#25D366" />
                  </div>
                </button>
              </div>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Contact;

