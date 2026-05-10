import { forwardRef, useEffect, useRef, useState } from 'react';
import { socialLinks } from '../../data/Socials';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ── Brand SVG icons ───────────────────────────────────────────────────────────

const icons: Record<string, (props: { size?: number }) => JSX.Element> = {
  github: ({ size = 22 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  ),
  instagram: ({ size = 22 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  ),
  discord: ({ size = 22 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  ),
  linkedin: ({ size = 22 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  x: ({ size = 22 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  ),
  portfolio: ({ size = 22 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  email: ({ size = 22 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
};

// ── Social Card ───────────────────────────────────────────────────────────────

const SocialCard = ({ social }: { social: typeof socialLinks[0] }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [hov, setHov] = useState(false);
  const Icon = icons[social.id];

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = cardRef.current?.getBoundingClientRect();
    if (!r || !cardRef.current) return;
    const dx = (e.clientX - r.left - r.width / 2) / (r.width / 2);
    const dy = (e.clientY - r.top - r.height / 2) / (r.height / 2);
    gsap.to(cardRef.current, {
      rotateY: dx * 5, rotateX: -dy * 5,
      duration: 0.35, ease: 'power2.out', transformPerspective: 900,
    });
    if (glowRef.current) {
      glowRef.current.style.opacity = '1';
      glowRef.current.style.left = (e.clientX - r.left) + 'px';
      glowRef.current.style.top  = (e.clientY - r.top)  + 'px';
    }
  };

  const onLeave = () => {
    if (cardRef.current) gsap.to(cardRef.current, { rotateY: 0, rotateX: 0, duration: 0.55, ease: 'power3.out' });
    if (glowRef.current) glowRef.current.style.opacity = '0';
    setHov(false);
  };

  return (
    <a
      href={social.url}
      target={social.id === 'email' ? '_self' : '_blank'}
      rel="noopener noreferrer"
      style={{ textDecoration: 'none', display: 'block' }}
    >
      <div
        ref={cardRef}
        className="social-card"
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        onMouseEnter={() => setHov(true)}
        style={{
          position: 'relative',
          borderRadius: '16px',
          padding: '20px 18px',
          background: '#ffffff',
          border: `1px solid ${hov ? social.borderHover : 'rgba(0,0,0,0.07)'}`,
          boxShadow: hov
            ? `0 16px 48px rgba(0,0,0,0.10), 0 2px 12px ${social.glow}`
            : '0 2px 12px rgba(0,0,0,0.05), 0 1px 0 rgba(255,255,255,0.9) inset',
          transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
          overflow: 'hidden',
          cursor: 'pointer',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Top shimmer */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
          background: `linear-gradient(90deg, transparent, ${social.color}66, transparent)`,
          opacity: hov ? 1 : 0,
          transition: 'opacity 0.3s',
        }} />

        {/* Mouse glow */}
        <div ref={glowRef} style={{
          position: 'absolute',
          width: '160px', height: '160px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${social.glow} 0%, transparent 70%)`,
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          opacity: 0,
          transition: 'opacity 0.25s',
          zIndex: 0,
        }} />

        {/* Content row */}
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '14px' }}>

          {/* Icon box */}
          <div style={{
            width: '46px', height: '46px',
            borderRadius: '12px',
            background: social.bg,
            border: `1px solid ${hov ? social.color + '33' : 'rgba(0,0,0,0.06)'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: hov ? social.color : social.color + 'bb',
            flexShrink: 0,
            transform: hov ? 'scale(1.1) rotate(-5deg)' : 'scale(1) rotate(0deg)',
            transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
            boxShadow: hov ? `0 4px 14px ${social.glow}` : 'none',
          }}>
            {Icon && <Icon size={20} />}
          </div>

          {/* Text */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
              <p style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: '0.95rem', fontWeight: 700,
                color: '#1a1814',
                margin: 0, lineHeight: 1.25, letterSpacing: '-0.01em',
              }}>{social.name}</p>
              {social.label && (
                <span style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: '0.58rem', letterSpacing: '0.07em',
                  padding: '2px 7px', borderRadius: '999px',
                  background: social.bg,
                  border: `1px solid ${social.color}33`,
                  color: social.color,
                  flexShrink: 0,
                }}>{social.label}</span>
              )}
            </div>
            <p style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '0.67rem', letterSpacing: '0.04em',
              color: 'rgba(80,72,60,0.5)',
              margin: 0,
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>{social.handle}</p>
          </div>

          {/* Arrow */}
          <div style={{
            width: '26px', height: '26px',
            borderRadius: '50%',
            background: social.color,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
            opacity: hov ? 1 : 0,
            transform: hov ? 'translateX(0) scale(1)' : 'translateX(6px) scale(0.8)',
            transition: 'all 0.28s cubic-bezier(0.16,1,0.3,1)',
            boxShadow: `0 4px 12px ${social.glow}`,
          }}>
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
              <path d="M1.5 10.5L10.5 1.5M10.5 1.5H4.5M10.5 1.5V7.5" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Bottom accent bar */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0,
          height: '2px',
          width: hov ? '100%' : '0%',
          background: `linear-gradient(90deg, ${social.color}, transparent)`,
          transition: 'width 0.45s cubic-bezier(0.16,1,0.3,1)',
        }} />
      </div>
    </a>
  );
};

// ── Main Section ──────────────────────────────────────────────────────────────

const Socials = forwardRef<HTMLDivElement, {}>((_, ref) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);
  const ctaRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Header reveal
      gsap.fromTo(
        headerRef.current?.children ?? [],
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.1, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 82%', once: true },
        },
      );

      // Cards stagger
      const cards = gridRef.current?.querySelectorAll('.social-card-wrap') ?? [];
      gsap.fromTo(
        cards,
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1,
          stagger: 0.08, duration: 0.65, ease: 'back.out(1.4)',
          scrollTrigger: { trigger: gridRef.current, start: 'top 82%', once: true },
        },
      );

      // CTA
      gsap.fromTo(
        ctaRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: ctaRef.current, start: 'top 90%', once: true },
        },
      );

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={(node) => {
        (sectionRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }}
      style={{ padding: '64px 0 80px', position: 'relative', background: 'transparent' }}
    >
      {/* Gold divider — matches other sections */}
      <div className="container-main" style={{ marginBottom: '56px' }}>
        <div className="divider-gold" />
      </div>

      <div className="container-main">

        {/* Header */}
        <div ref={headerRef} style={{ textAlign: 'center', marginBottom: '52px' }}>
          <span style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '0.6875rem', letterSpacing: '0.1em',
            textTransform: 'uppercase', color: 'var(--gold)',
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            marginBottom: '12px',
          }}>
            ✦ Get in Touch
          </span>

          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(2rem, 4vw, 2.75rem)',
            fontWeight: 700, color: 'var(--text)',
            letterSpacing: '-0.03em', lineHeight: 1.1,
            marginBottom: '14px',
          }}>
            Let's Connect
          </h2>

          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.9375rem', fontWeight: 300,
            color: 'var(--text-secondary)',
            maxWidth: '380px', margin: '0 auto', lineHeight: 1.7,
          }}>
            Find me across the web — DMs are always open.
          </p>
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="socials-grid"
          style={{ maxWidth: '960px', margin: '0 auto', padding: '4px' }}
        >
          {socialLinks.map((social) => (
            <div key={social.id} className="social-card-wrap">
              <SocialCard social={social} />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          ref={ctaRef}
          style={{
            marginTop: '56px', textAlign: 'center',
            borderTop: '1px solid var(--surface-border)',
            paddingTop: '40px',
          }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '7px',
            marginBottom: '18px',
            padding: '5px 14px', borderRadius: '999px',
            background: 'rgba(26,122,82,0.07)',
            border: '1px solid rgba(26,122,82,0.2)',
          }}>
            <span style={{
              width: '6px', height: '6px', borderRadius: '50%',
              background: '#1a7a52',
              boxShadow: '0 0 5px rgba(26,122,82,0.6)',
              animation: 'socialPulse 2s ease-in-out infinite',
              display: 'inline-block',
            }} />
            <span style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '0.65rem', letterSpacing: '0.08em',
              color: '#1a7a52',
            }}>Open to opportunities</span>
          </div>

          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '1rem', color: 'var(--text-secondary)',
            marginBottom: '12px', lineHeight: 1.6,
          }}>
            Prefer email?{' '}
            <a
              href="mailto:rumman.ahmed.work+portfolio@gmail.com"
              style={{
                color: 'var(--gold)',
                textDecoration: 'underline',
                textUnderlineOffset: '4px',
                textDecorationColor: 'rgba(166,136,46,0.4)',
                transition: 'color 0.2s',
              }}
            >
              Drop me a line →
            </a>
          </p>

          <p style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '0.5875rem', color: 'var(--text-muted)',
            letterSpacing: '0.1em', textTransform: 'uppercase',
          }}>
            Usually responds within 24 hours
          </p>
        </div>
      </div>

      <style>{`
        .socials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }
        @media (max-width: 1024px) { .socials-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 640px)  { .socials-grid { grid-template-columns: 1fr !important; gap: 12px !important; } }

        @keyframes socialPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.55; transform: scale(1.35); }
        }
      `}</style>
    </section>
  );
});

Socials.displayName = 'Socials';
export default Socials;