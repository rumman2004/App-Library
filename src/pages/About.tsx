import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { myData } from '../data/MyData';
import { Briefcase, GraduationCap, Code, Sparkles, BookOpen } from 'lucide-react';

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal animations
      const reveals = gsap.utils.toArray('.ab-reveal');
      reveals.forEach((el: any) => {
        gsap.fromTo(el, 
          { opacity: 0, y: 50, rotateX: -5 },
          { 
            opacity: 1, 
            y: 0, 
            rotateX: 0, 
            duration: 1.2, 
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
            }
          }
        );
      });

      // Line animations
      gsap.fromTo('.ab-line', 
        { scaleX: 0 }, 
        { scaleX: 1, duration: 1.5, ease: 'power3.inOut', stagger: 0.2 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="ab-container">
      {/* ── STYLES ── */}
      <style>{`
        .ab-container {
          background-color: var(--bg);
          min-height: 100vh;
          padding-top: 140px;
          padding-bottom: 100px;
          color: var(--text);
          position: relative;
          overflow: hidden;
        }

        .ab-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          pointer-events: none;
          z-index: 0;
        }
        .ab-blob-1 { top: 10%; right: -10%; width: 60vw; height: 60vw; background: radial-gradient(circle, rgba(166,136,50,0.06) 0%, transparent 70%); }
        .ab-blob-2 { bottom: -10%; left: -10%; width: 50vw; height: 50vw; background: radial-gradient(circle, rgba(59,98,181,0.04) 0%, transparent 70%); }

        .ab-wrap {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 6vw;
          position: relative;
          z-index: 10;
        }

        .ab-label {
          font-family: 'DM Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--gold);
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 2rem;
        }
        .ab-label::before {
          content: '';
          display: block;
          width: 24px;
          height: 1px;
          background: var(--gold);
        }

        .ab-h1 {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(3rem, 8vw, 6rem);
          font-weight: 700;
          line-height: 0.95;
          letter-spacing: -0.03em;
          margin-bottom: 2rem;
        }

        .ab-h2 {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.02em;
          margin-bottom: 1.5rem;
        }

        .ab-h3 {
          font-family: 'DM Sans', sans-serif;
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          letter-spacing: -0.01em;
        }

        .ab-body {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(1rem, 1.5vw, 1.125rem);
          line-height: 1.8;
          color: var(--text-secondary);
          font-weight: 300;
        }

        .ab-lead {
          font-size: clamp(1.25rem, 2.5vw, 1.75rem);
          line-height: 1.6;
          color: var(--text);
          font-weight: 400;
        }

        .ab-line {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, rgba(0,0,0,0.1), transparent);
          transform-origin: left center;
          margin: 4rem 0;
        }

        /* ── GRID LAYOUTS ── */
        .ab-grid-2 {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
        }
        @media (min-width: 768px) {
          .ab-grid-2 { grid-template-columns: 1fr 1fr; gap: 5rem; }
        }

        .ab-grid-3 {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }
        @media (min-width: 640px) { .ab-grid-3 { grid-template-columns: 1fr 1fr; } }
        @media (min-width: 1024px) { .ab-grid-3 { grid-template-columns: 1fr 1fr 1fr; } }

        /* ── CARDS ── */
        .ab-card {
          background: var(--surface);
          border: 1px solid var(--surface-border);
          border-radius: 1.5rem;
          padding: 2.5rem;
          box-shadow: 0 4px 24px rgba(0,0,0,0.02);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .ab-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.06);
        }

        .ab-pill-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-top: 1.5rem;
        }

        .ab-pill {
          padding: 0.6rem 1.25rem;
          border-radius: 2rem;
          border: 1px solid var(--surface-border);
          background: rgba(255,255,255,0.5);
          font-family: 'DM Mono', monospace;
          font-size: 0.75rem;
          color: var(--text-secondary);
          backdrop-filter: blur(8px);
        }

        /* ── TIMELINE ── */
        .ab-timeline {
          position: relative;
          padding-left: 2rem;
        }
        .ab-timeline::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 1px;
          background: var(--surface-border);
        }

        .ab-timeline-item {
          position: relative;
          padding-bottom: 3rem;
        }
        .ab-timeline-item:last-child { padding-bottom: 0; }
        
        .ab-timeline-dot {
          position: absolute;
          left: -2.35rem;
          top: 0.25rem;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--gold);
          box-shadow: 0 0 0 4px rgba(166,136,50,0.1);
        }
      `}</style>

      {/* Blobs */}
      <div className="ab-blob ab-blob-1" />
      <div className="ab-blob ab-blob-2" />

      <div className="ab-wrap">
        
        {/* ── HERO SECTION ── */}
        <div className="ab-reveal" style={{ maxWidth: '800px', marginBottom: '6rem' }}>
          <div className="ab-label">The person behind the code</div>
          <h1 className="ab-h1">
            Design-driven <br/>
            <span style={{ fontStyle: 'italic', color: 'var(--text-secondary)' }}>engineering.</span>
          </h1>
          <p className="ab-body ab-lead mt-6">
            {myData.bio}
          </p>
        </div>

        <div className="ab-line" />

        {/* ── ABOUT ME ── */}
        <div className="ab-grid-2" style={{ alignItems: 'center', marginBottom: '6rem' }}>
          <div className="ab-reveal">
            <h2 className="ab-h2">A blend of logic<br/>& aesthetics.</h2>
            <p className="ab-body mb-6">
              {myData.about}
            </p>
            <p className="ab-body">
              Based in {myData.location}, I specialize in bridging the gap between beautiful interfaces and robust backend architectures.
            </p>
          </div>
          
          <div className="ab-reveal">
            <div className="ab-card" style={{ background: 'linear-gradient(135deg, rgba(166,136,50,0.05) 0%, transparent 100%)' }}>
              <Sparkles className="mb-6" style={{ color: 'var(--gold)' }} size={32} />
              <h3 className="ab-h3">Specialties</h3>
              <p className="ab-body mb-4 text-sm">Areas where I bring the most value to a project.</p>
              <div className="ab-pill-list">
                {myData.specialties.map(spec => (
                  <span key={spec} className="ab-pill">{spec}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── EXPERIENCE ── */}
        <div className="ab-reveal" style={{ marginBottom: '6rem' }}>
          <div className="ab-label"><Briefcase size={14} /> Career Journey</div>
          <h2 className="ab-h2 mb-10">Experience</h2>
          
          <div className="ab-timeline">
            {myData.experience.map((exp, idx) => (
              <div key={idx} className="ab-timeline-item ab-reveal">
                <div className="ab-timeline-dot" />
                <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 mb-3">
                  <h3 className="ab-h3 m-0">{exp.role}</h3>
                  <span className="font-mono text-sm text-[var(--gold)]">{exp.company}</span>
                  <span className="font-mono text-xs text-[var(--text-muted)] md:ml-auto">{exp.period}</span>
                </div>
                <p className="ab-body max-w-2xl">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="ab-line" />

        {/* ── SKILLS & TOOLS ── */}
        <div className="ab-reveal mb-12">
          <div className="ab-label"><Code size={14} /> Technical Arsenal</div>
          <h2 className="ab-h2 mb-10">Skills & Technologies</h2>
          
          <div className="ab-grid-3">
            <div className="ab-card">
              <h3 className="ab-h3 mb-4">Core Tech Stack</h3>
              <div className="ab-pill-list" style={{ marginTop: 0 }}>
                {myData.skills.slice(0, 8).map(skill => (
                  <span key={skill} className="ab-pill">{skill}</span>
                ))}
              </div>
            </div>

            <div className="ab-card">
              <h3 className="ab-h3 mb-4">Frameworks & More</h3>
              <div className="ab-pill-list" style={{ marginTop: 0 }}>
                {myData.skills.slice(8, 16).map(skill => (
                  <span key={skill} className="ab-pill">{skill}</span>
                ))}
              </div>
            </div>

            <div className="ab-card">
              <h3 className="ab-h3 mb-4">Favorite Tools</h3>
              <div className="ab-pill-list" style={{ marginTop: 0 }}>
                {myData.favoriteTools.map(tool => (
                  <span key={tool} className="ab-pill">{tool}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── EDUCATION & INTERESTS ── */}
        <div className="ab-grid-2">
          <div className="ab-reveal">
            <div className="ab-label"><GraduationCap size={14} /> Academic Background</div>
            <h2 className="ab-h2 mb-6">Education</h2>
            {myData.education.map((edu, idx) => (
              <div key={idx} className="mb-4">
                <h3 className="ab-h3">{edu.institution}</h3>
                <p className="ab-body" style={{ color: 'var(--gold)' }}>{edu.status}</p>
              </div>
            ))}
          </div>

          <div className="ab-reveal">
            <div className="ab-label"><BookOpen size={14} /> Beyond Code</div>
            <h2 className="ab-h2 mb-6">Interests</h2>
            <div className="ab-pill-list" style={{ marginTop: 0 }}>
              {myData.interests.map(interest => (
                <span key={interest} className="ab-pill" style={{ background: 'transparent' }}>{interest}</span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
