import { forwardRef, useEffect, useRef } from 'react';
import { ArrowDown, ArrowUpRight, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { Images } from '../../data/images';

const HeroSection = forwardRef<HTMLDivElement, {}>((_, ref) => {
  const phoneRef     = useRef<HTMLDivElement>(null);
  const phoneGlowRef = useRef<HTMLDivElement>(null);
  const labelRef     = useRef<HTMLDivElement>(null);
  const headingRef   = useRef<HTMLDivElement>(null);
  const subRef       = useRef<HTMLParagraphElement>(null);
  const ctaRef       = useRef<HTMLDivElement>(null);
  const statsRef     = useRef<HTMLDivElement>(null);
  const metaRef      = useRef<HTMLDivElement>(null);
  const lineRef      = useRef<HTMLDivElement>(null);
  const orbRef       = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(orbRef.current, { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 2.0, ease: 'power2.out' }, 0);
    tl.fromTo(
      metaRef.current?.children ?? [],
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.6 },
      0.3
    );
    tl.fromTo(labelRef.current, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55 }, 0.5);
    tl.fromTo(
      headingRef.current?.querySelectorAll('.line-wrap') ?? [],
      { y: 90, opacity: 0, rotateX: -12 },
      { y: 0, opacity: 1, rotateX: 0, stagger: 0.16, duration: 1.0, ease: 'power4.out' },
      0.65
    );
    tl.fromTo(lineRef.current, { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.8, ease: 'power2.inOut' }, 1.0);
    tl.fromTo(subRef.current,  { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 1.1);
    tl.fromTo(
      ctaRef.current?.children ?? [],
      { y: 20, opacity: 0, scale: 0.92 },
      { y: 0, opacity: 1, scale: 1, stagger: 0.1, duration: 0.55, ease: 'back.out(1.7)' },
      1.25
    );
    tl.fromTo(
      statsRef.current?.children ?? [],
      { y: 16, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.5 },
      1.4
    );
    tl.fromTo(
      phoneRef.current,
      { opacity: 0, y: 80, rotate: 0, scale: 0.88 },
      { opacity: 1, y: 0, rotate: -6, scale: 1, duration: 1.4, ease: 'back.out(1.2)' },
      0.7
    );
    tl.fromTo(phoneGlowRef.current, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 1.4 }, 0.9);

    gsap.to(phoneRef.current, { y: '-=20', duration: 3.5, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 2.2 });
    gsap.to(phoneGlowRef.current, { scale: 1.2, opacity: 0.55, duration: 3.5, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 2.2 });
    gsap.to(orbRef.current, { x: 40, y: -30, duration: 8, yoyo: true, repeat: -1, ease: 'sine.inOut' });
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');

        .hero-section {
          background: var(--bg);
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          position: relative;
          perspective: 1200px;
          padding-top: 1rem;
        }

        .hero-orb {
          position: absolute;
          top: -15%;
          left: 25%;
          width: 800px;
          height: 800px;
          background: radial-gradient(ellipse at center, rgba(166,136,50,0.08) 0%, rgba(166,136,50,0.02) 50%, transparent 70%);
          filter: blur(70px);
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
        }

        .hero-dot-grid {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          background-image: radial-gradient(circle, rgba(166,136,50,0.065) 1px, transparent 1px);
          background-size: 48px 48px;
          -webkit-mask-image: radial-gradient(ellipse 70% 70% at 50% 40%, black 10%, transparent 100%);
          mask-image: radial-gradient(ellipse 70% 70% at 50% 40%, black 10%, transparent 100%);
        }

        /* ── Meta bar ── */
        .hero-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.25rem 5vw;
          position: relative;
          z-index: 10;
        }

        .hero-meta-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: 'DM Mono', monospace;
          font-size: 0.62rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--gold, #c9a84c);
        }

        .hero-meta-text {
          font-family: 'DM Mono', monospace;
          font-size: 0.62rem;
          letter-spacing: 0.12em;
          color: var(--text-muted, #8a8a7a);
        }

        /* ── Main content grid ── */
        .hero-body {
          flex: 1;
          display: grid;
          grid-template-columns: 1fr;
          grid-template-rows: auto auto;
          align-items: center;
          padding: 1.5rem 6vw 5rem;
          gap: 0;
          position: relative;
          z-index: 10;
        }

        /* ── Text side ── */
        .hero-text {
          display: flex;
          flex-direction: column;
          order: 2;
          padding-top: 1.5rem;
        }

        /* ── Phone side ── */
        .hero-phone-side {
          display: flex;
          justify-content: center;
          align-items: center;
          order: 1;
          padding: 1rem 0 0;
        }

        /* ── Tablet (640px+) ── */
        @media (min-width: 640px) {
          .hero-body {
            padding: 2rem 8vw 5rem;
            gap: 1rem;
          }

          .hero-phone-img {
            width: clamp(280px, 55vw, 360px) !important;
          }
        }

        /* ── Desktop (1024px+) ── */
        @media (min-width: 1024px) {
          .hero-body {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 1fr;
            padding: 1rem 8vw 4rem;
            gap: 5rem;
            align-items: center;
          }

          .hero-text {
            order: 1;
            padding-top: 0;
          }

          .hero-phone-side {
            order: 2;
            justify-content: flex-end;
            padding-right: 1rem;
            padding-top: 0;
          }
        }

        /* ── Large desktop (1280px+) ── */
        @media (min-width: 1280px) {
          .hero-body {
            padding: 1rem 10vw 4rem;
            gap: 6rem;
          }
        }

        .hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 0.55rem 1.15rem;
          border-radius: 100px;
          background: linear-gradient(135deg, rgba(201,168,76,0.13) 0%, rgba(166,136,50,0.05) 100%);
          border: 1px solid rgba(201,168,76,0.26);
          font-family: 'DM Mono', monospace;
          font-size: 0.6rem;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          color: var(--gold, #c9a84c);
          width: fit-content;
          margin-bottom: 1.5rem;
        }

        .hero-eyebrow-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--gold, #c9a84c);
          box-shadow: 0 0 8px rgba(201,168,76,0.9);
          flex-shrink: 0;
          animation: heroPulse 2.2s ease-in-out infinite;
        }

        .hero-heading-block {
          overflow: hidden;
          margin-bottom: 0;
        }

        .hero-h1-plain {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(3rem, 10vw, 6.5rem);
          font-weight: 700;
          line-height: 0.9;
          letter-spacing: -0.035em;
          color: var(--text, #1a1a18);
          display: block;
          margin: 0;
        }

        .hero-h1-gold {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(3rem, 10vw, 6.5rem);
          font-weight: 700;
          line-height: 1.0;
          letter-spacing: -0.035em;
          display: block;
          margin: 0;
          background: linear-gradient(135deg, #c9a84c 0%, #e8c96d 45%, #a86830 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        @media (min-width: 1024px) {
          .hero-h1-plain,
          .hero-h1-gold {
            font-size: clamp(3.5rem, 7vw, 6.5rem);
          }
        }

        .hero-rule {
          height: 1px;
          max-width: 380px;
          background: linear-gradient(90deg, rgba(201,168,76,0.55) 0%, rgba(201,168,76,0.06) 100%);
          transform-origin: left center;
          margin-top: 1.75rem;
          margin-bottom: 1.75rem;
        }

        .hero-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(0.9rem, 2.5vw, 1.05rem);
          font-weight: 300;
          line-height: 1.8;
          color: var(--text-secondary, #555548);
          max-width: 33rem;
          margin: 0;
        }

        /* CTAs */
        .hero-ctas {
          display: flex;
          flex-wrap: wrap;
          gap: 0.85rem;
          margin-top: 2.25rem;
          align-items: center;
        }

        .hero-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 0.85rem 1.75rem;
          border-radius: 0.6rem;
          background: linear-gradient(135deg, #c9a84c 0%, #a86830 100%);
          color: #0c0c0a;
          font-family: 'DM Sans', sans-serif;
          font-weight: 600;
          font-size: 0.88rem;
          letter-spacing: 0.01em;
          text-decoration: none;
          box-shadow: 0 8px 28px rgba(166,136,50,0.30), 0 2px 8px rgba(0,0,0,0.08);
          transition: transform 0.22s ease, box-shadow 0.22s ease;
          white-space: nowrap;
        }

        .hero-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 40px rgba(166,136,50,0.42), 0 4px 12px rgba(0,0,0,0.12);
        }

        .hero-btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 0.85rem 1.75rem;
          border-radius: 0.6rem;
          background: transparent;
          color: var(--text, #1a1a18);
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          font-size: 0.88rem;
          letter-spacing: 0.01em;
          text-decoration: none;
          border: 1px solid rgba(201,168,76,0.28);
          transition: border-color 0.22s ease, background 0.22s ease, transform 0.22s ease;
          white-space: nowrap;
        }

        .hero-btn-ghost:hover {
          border-color: rgba(201,168,76,0.6);
          background: rgba(201,168,76,0.05);
          transform: translateY(-1px);
        }

        /* Stats row */
        .hero-stats {
          display: flex;
          flex-wrap: nowrap;
          margin-top: 2.5rem;
          padding-top: 1.75rem;
          border-top: 1px solid rgba(201,168,76,0.12);
          gap: 0;
          overflow: visible;
        }

        .hero-stat {
          display: flex;
          flex-direction: column;
          gap: 5px;
          padding-right: 1.75rem;
          min-width: 0;
          flex-shrink: 1;
        }

        .hero-stat + .hero-stat {
          padding-left: 1.75rem;
          padding-right: 1.75rem;
          border-left: 1px solid rgba(201,168,76,0.12);
        }

        .hero-stat:last-child {
          padding-right: 0;
        }

        @media (min-width: 640px) {
          .hero-stat {
            padding-right: 2.5rem;
          }
          .hero-stat + .hero-stat {
            padding-left: 2.5rem;
            padding-right: 2.5rem;
          }
          .hero-stat:last-child {
            padding-right: 0;
          }
        }

        .hero-stat-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.6rem, 5vw, 2.15rem);
          font-weight: 700;
          line-height: 1;
          background: linear-gradient(135deg, #c9a84c 0%, #e8c96d 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-stat-label {
          font-family: 'DM Mono', monospace;
          font-size: clamp(0.5rem, 1.5vw, 0.58rem);
          letter-spacing: 0.11em;
          text-transform: uppercase;
          color: var(--text-muted, #8a8a7a);
          white-space: nowrap;
        }

        /* ── Phone side ── */
        .hero-phone-wrap {
          position: relative;
        }

        .hero-phone-glow {
          position: absolute;
          inset: -50px;
          background: radial-gradient(ellipse at 45% 55%, rgba(201,168,76,0.2) 0%, rgba(166,136,50,0.06) 50%, transparent 72%);
          filter: blur(44px);
          border-radius: 50%;
          pointer-events: none;
        }

        .hero-phone-img {
          width: clamp(220px, 65vw, 340px);
          display: block;
          user-select: none;
          pointer-events: none;
          filter: drop-shadow(-14px 28px 56px rgba(0,0,0,0.20)) drop-shadow(0 6px 20px rgba(166,136,50,0.12));
        }

        @media (min-width: 1024px) {
          .hero-phone-img {
            width: clamp(300px, 28vw, 400px);
          }
        }

        .hero-badge {
          position: absolute;
          bottom: 8%;
          right: -5%;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 0.55rem 0.9rem;
          border-radius: 14px;
          background: rgba(22,22,20,0.84);
          border: 1px solid rgba(201,168,76,0.22);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.18);
          white-space: nowrap;
        }

        @media (min-width: 640px) {
          .hero-badge {
            right: -10%;
          }
        }

        @media (min-width: 1024px) {
          .hero-badge {
            right: -20%;
            padding: 0.65rem 1.1rem;
          }
        }

        .hero-badge-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #4ade80;
          box-shadow: 0 0 10px rgba(74,222,128,0.7);
          flex-shrink: 0;
        }

        .hero-badge-text {
          font-family: 'DM Mono', monospace;
          font-size: 0.52rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.72);
        }

        @media (min-width: 640px) {
          .hero-badge-text {
            font-size: 0.58rem;
          }
        }

        .hero-stat-card {
          position: absolute;
          top: 14%;
          left: -5%;
          display: flex;
          flex-direction: column;
          gap: 3px;
          padding: 0.65rem 0.9rem;
          border-radius: 14px;
          background: rgba(22,22,20,0.80);
          border: 1px solid rgba(201,168,76,0.18);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.15);
        }

        @media (min-width: 640px) {
          .hero-stat-card {
            left: -12%;
          }
        }

        @media (min-width: 1024px) {
          .hero-stat-card {
            left: -22%;
            padding: 0.8rem 1.1rem;
          }
        }

        .hero-stat-card-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.35rem;
          font-weight: 700;
          color: #c9a84c;
          line-height: 1;
        }

        @media (min-width: 1024px) {
          .hero-stat-card-num {
            font-size: 1.5rem;
          }
        }

        .hero-stat-card-label {
          font-family: 'DM Mono', monospace;
          font-size: 0.48rem;
          letter-spacing: 0.09em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.42);
        }

        @media (min-width: 640px) {
          .hero-stat-card-label {
            font-size: 0.52rem;
          }
        }

        /* Scroll */
        .hero-scroll {
          position: absolute;
          bottom: 1.5rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          z-index: 10;
        }

        @media (max-width: 639px) {
          .hero-scroll {
            display: none;
          }
        }

        .hero-scroll-label {
          font-family: 'DM Mono', monospace;
          font-size: 0.52rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--text-muted, #8a8a7a);
        }

        .hero-scroll-track {
          width: 1px;
          height: 44px;
          background: rgba(201,168,76,0.14);
          position: relative;
          overflow: hidden;
        }

        .hero-scroll-thumb {
          width: 100%;
          height: 40%;
          position: absolute;
          top: 0;
          background: linear-gradient(180deg, transparent 0%, #c9a84c 50%, transparent 100%);
          animation: heroScroll 2s ease-in-out infinite;
        }

        @keyframes heroPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }

        @keyframes heroScroll {
          0%   { top: -40%; }
          100% { top: 140%; }
        }
      `}</style>

      <section ref={ref} className="hero-section">

        <div ref={orbRef} className="hero-orb" />
        <div className="hero-dot-grid" />

        {/* Meta bar */}
        <div ref={metaRef} className="hero-meta">
          <span className="hero-meta-label">
            <Sparkles style={{ width: 11, height: 11 }} /> App Showcase
          </span>
          <span className="hero-meta-text">2025</span>
        </div>

        {/* Body grid */}
        <div className="hero-body">

          {/* Phone — order:1 on mobile, order:2 on desktop */}
          <div className="hero-phone-side">
            <div className="hero-phone-wrap">
              <div ref={phoneGlowRef} className="hero-phone-glow" />
              <div
                ref={phoneRef}
                style={{ rotate: '-6deg', transformOrigin: 'center bottom' }}
              >
                <img
                  src={Images.general.heroIphone}
                  alt="iPhone Mockup"
                  className="hero-phone-img"
                  draggable={false}
                />
              </div>
            </div>
          </div>

          {/* Text — order:2 on mobile, order:1 on desktop */}
          <div className="hero-text">
            <div ref={labelRef}>
              <span className="hero-eyebrow">
                <span className="hero-eyebrow-dot" />
                Mobile Developer · Designer
              </span>
            </div>

            <div ref={headingRef} className="hero-heading-block">
              <div className="line-wrap" style={{ overflow: 'hidden' }}>
                <h1 className="hero-h1-plain">My App</h1>
              </div>
              <div className="line-wrap" style={{ overflow: 'hidden' }}>
                <h1 className="hero-h1-gold">Library.</h1>
              </div>
            </div>

            <div ref={lineRef} className="hero-rule" />

            <p ref={subRef} className="hero-sub">
              I design and build mobile experiences that people actually love.
              Each app is crafted with precision — from concept to App Store.
            </p>

            <div ref={ctaRef} className="hero-ctas">
              <a href="#builds" className="hero-btn-primary">
                Explore Apps <ArrowDown style={{ width: 15, height: 15 }} />
              </a>
              <a
                href="https://github.com/rumman2004"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-btn-ghost"
              >
                GitHub <ArrowUpRight style={{ width: 15, height: 15 }} />
              </a>
            </div>

            <div ref={statsRef} className="hero-stats">
              {[
                { num: '3+', label: 'Apps Built' },
                { num: '12', label: 'GitHub Stars' },
                { num: '101%', label: 'Passion-Driven' },
              ].map(({ num, label }) => (
                <div key={label} className="hero-stat">
                  <span className="hero-stat-num">{num}</span>
                  <span className="hero-stat-label">{label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Scroll indicator */}
        <div className="hero-scroll">
          <span className="hero-scroll-label">Scroll</span>
          <div className="hero-scroll-track">
            <div className="hero-scroll-thumb" />
          </div>
        </div>

      </section>
    </>
  );
});

HeroSection.displayName = 'HeroSection';
export default HeroSection;