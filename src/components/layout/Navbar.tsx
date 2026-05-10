import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, Download, Menu, X } from 'lucide-react';
import { Images } from '../../data/images';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

// ─── Data ─────────────────────────────────────────────────────────────────────

const navLinks = [
  { name: 'Showcase', path: '/' },
  { name: 'About',    path: '/about' },
  { name: 'Contact',  path: '/contact' },
];

// ─── Detect if we're on a dark app detail page ────────────────────────────────
// Add any dark-themed app routes here
const DARK_ROUTES = ['/apps/dr-crop', '/apps/drcrop', '/apps/my-calculator'];
const isDarkRoute = (pathname: string) =>
  DARK_ROUTES.some(r => pathname.startsWith(r));

// ─── Component ────────────────────────────────────────────────────────────────

const Navbar = () => {
  const location = useLocation();
  const navRef        = useRef<HTMLElement>(null);
  const logoRef       = useRef<HTMLAnchorElement>(null);
  const linksRef      = useRef<HTMLDivElement>(null);
  const ctaRef        = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled,   setScrolled]   = useState(false);

  const dark = isDarkRoute(location.pathname);

  // ── Entrance animation ────────────────────────────────────────────────────
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.15 });
    tl.fromTo(navRef.current,
      { y: -72, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.75, ease: 'power4.out' },
    );
    tl.fromTo(logoRef.current,
      { opacity: 0, x: -12 },
      { opacity: 1, x: 0, duration: 0.4, ease: 'power3.out' },
      '-=0.35',
    );
    tl.fromTo(
      linksRef.current?.querySelectorAll('a') ?? [],
      { opacity: 0, y: -8 },
      { opacity: 1, y: 0, stagger: 0.07, duration: 0.35, ease: 'power2.out' },
      '-=0.25',
    );
    tl.fromTo(ctaRef.current,
      { opacity: 0, x: 12 },
      { opacity: 1, x: 0, duration: 0.4, ease: 'power3.out' },
      '-=0.3',
    );
  }, []);

  // ── Scroll detection ──────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Close mobile menu on route change ────────────────────────────────────
  useEffect(() => setMobileOpen(false), [location]);

  // ── Mobile menu animation ─────────────────────────────────────────────────
  useEffect(() => {
    if (!mobileMenuRef.current) return;
    if (mobileOpen) {
      gsap.set(mobileMenuRef.current, { display: 'block' });
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0, y: -10, scaleY: 0.92, transformOrigin: 'top center' },
        { opacity: 1, y: 0, scaleY: 1, duration: 0.3, ease: 'power3.out' },
      );
      gsap.fromTo(
        mobileMenuRef.current.querySelectorAll('.mobile-link'),
        { opacity: 0, x: -16 },
        { opacity: 1, x: 0, stagger: 0.05, duration: 0.25, ease: 'power2.out', delay: 0.1 },
      );
    } else {
      gsap.to(mobileMenuRef.current, {
        opacity: 0, y: -8, scaleY: 0.96, transformOrigin: 'top center',
        duration: 0.22, ease: 'power2.in',
        onComplete: () => gsap.set(mobileMenuRef.current, { display: 'none' }),
      });
    }
  }, [mobileOpen]);

  // ── Helper ────────────────────────────────────────────────────────────────
  const isActive = (path: string) =>
    path === '/'
      ? location.pathname === '/' || location.pathname.startsWith('/apps')
      : location.pathname === path;

  // ── Theme tokens based on page context ───────────────────────────────────
  const theme = dark ? {
    // Dark mode — sits on black page
    pillBg: scrolled ? 'rgba(10,14,10,0.92)' : 'rgba(10,14,10,0.75)',
    pillBorder: scrolled ? 'rgba(74,222,128,0.22)' : 'rgba(74,222,128,0.12)',
    pillShadow: scrolled
      ? '0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(74,222,128,0.06)'
      : '0 4px 24px rgba(0,0,0,0.3)',
    logoText: '#f0f4f0',
    logoDot: '#4ade80',
    logoRing: 'rgba(74,222,128,0.35)',
    logoRingHover: '#4ade80',
    linkColor: 'rgba(240,244,240,0.45)',
    linkActive: '#4ade80',
    linkActiveBg: 'rgba(74,222,128,0.1)',
    linkHoverColor: 'rgba(240,244,240,0.85)',
    linkHoverBg: 'rgba(255,255,255,0.05)',
    activeDot: '#4ade80',
    resumeColor: 'rgba(240,244,240,0.45)',
    resumeBorder: 'rgba(255,255,255,0.1)',
    resumeBg: 'transparent',
    resumeHoverColor: '#4ade80',
    resumeHoverBorder: 'rgba(74,222,128,0.3)',
    resumeHoverBg: 'rgba(74,222,128,0.08)',
    separatorBg: 'rgba(255,255,255,0.1)',
    ctaBg: '#22c55e',
    ctaColor: '#04160a',
    ctaShadow: '0 3px 16px rgba(34,197,94,0.35)',
    ctaHoverBg: '#4ade80',
    ctaHoverShadow: '0 6px 24px rgba(74,222,128,0.45)',
    mobileMenuBg: 'rgba(10,14,10,0.97)',
    mobileMenuBorder: 'rgba(74,222,128,0.14)',
    mobileMenuShadow: '0 24px 64px rgba(0,0,0,0.6)',
    mobileLinkColor: 'rgba(240,244,240,0.6)',
    mobileLinkActive: '#4ade80',
    mobileLinkActiveBg: 'rgba(74,222,128,0.1)',
    mobileCtaDivider: 'rgba(255,255,255,0.07)',
    mobileResumeBorder: 'rgba(255,255,255,0.1)',
    mobileResumeColor: 'rgba(240,244,240,0.5)',
    toggleBorder: mobileOpen ? 'rgba(74,222,128,0.3)' : 'rgba(255,255,255,0.1)',
    toggleBg: mobileOpen ? 'rgba(74,222,128,0.1)' : 'transparent',
    toggleColor: mobileOpen ? '#4ade80' : 'rgba(240,244,240,0.5)',
  } : {
    // Light mode — original portfolio style
    pillBg: scrolled ? 'rgba(255,255,255,0.96)' : 'rgba(255,255,255,0.88)',
    pillBorder: scrolled ? 'rgba(166,136,50,0.18)' : 'rgba(166,136,50,0.1)',
    pillShadow: scrolled
      ? '0 8px 40px rgba(0,0,0,0.09), 0 1px 2px rgba(0,0,0,0.04)'
      : '0 4px 24px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.03)',
    logoText: 'var(--text)',
    logoDot: 'var(--gold)',
    logoRing: 'rgba(201,168,76,0.45)',
    logoRingHover: 'var(--gold)',
    linkColor: 'var(--text-muted)',
    linkActive: 'var(--gold)',
    linkActiveBg: 'var(--gold-dim)',
    linkHoverColor: 'var(--text-secondary)',
    linkHoverBg: 'rgba(0,0,0,0.03)',
    activeDot: 'var(--gold)',
    resumeColor: 'var(--text-muted)',
    resumeBorder: 'rgba(0,0,0,0.08)',
    resumeBg: 'transparent',
    resumeHoverColor: 'var(--gold)',
    resumeHoverBorder: 'rgba(201,168,76,0.3)',
    resumeHoverBg: 'var(--gold-dim)',
    separatorBg: 'rgba(0,0,0,0.12)',
    ctaBg: 'var(--gold)',
    ctaColor: '#0b0c10',
    ctaShadow: '0 3px 16px rgba(201,168,76,0.3)',
    ctaHoverBg: 'var(--gold)',
    ctaHoverShadow: '0 6px 24px rgba(201,168,76,0.42)',
    mobileMenuBg: 'rgba(255,255,255,0.97)',
    mobileMenuBorder: 'rgba(166,136,50,0.14)',
    mobileMenuShadow: '0 24px 64px rgba(0,0,0,0.09)',
    mobileLinkColor: 'var(--text-secondary)',
    mobileLinkActive: 'var(--gold)',
    mobileLinkActiveBg: 'var(--gold-dim)',
    mobileCtaDivider: 'rgba(0,0,0,0.06)',
    mobileResumeBorder: 'rgba(0,0,0,0.08)',
    mobileResumeColor: 'var(--text-muted)',
    toggleBorder: mobileOpen ? 'rgba(201,168,76,0.25)' : 'rgba(0,0,0,0.08)',
    toggleBg: mobileOpen ? 'var(--gold-dim)' : 'transparent',
    toggleColor: mobileOpen ? 'var(--gold)' : 'var(--text-muted)',
  };

  // ── Shared avatar element ─────────────────────────────────────────────────
  const AvatarRing = ({ size = 36 }: { size?: number }) => (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        border: `2px solid ${theme.logoRing}`,
        padding: '2px',
        flexShrink: 0,
        transition: 'border-color 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img
        src={Images.general.avatar}
        alt="Rumman Ahmed"
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          objectFit: 'cover',
          display: 'block',
        }}
        onError={(e) => {
          const el = e.currentTarget as HTMLImageElement;
          el.style.display = 'none';
          const parent = el.parentElement!;
          parent.style.cssText += `align-items:center;justify-content:center;`;
          if (!parent.querySelector('.avatar-fallback')) {
            const span = document.createElement('span');
            span.className = 'avatar-fallback';
            span.textContent = 'RA';
            span.style.cssText = `
              font-family:'Playfair Display',Georgia,serif;
              font-size:${size * 0.33}px;
              font-weight:700;
              color:${dark ? '#4ade80' : 'var(--gold)'};
            `;
            parent.appendChild(span);
          }
        }}
      />
    </div>
  );

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <header
      ref={navRef}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 50,
        padding: '12px 16px',
      }}
    >
      {/* ── Main nav pill ── */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          borderRadius: '16px',
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          transition: 'all 0.45s ease',
          background: theme.pillBg,
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: `1px solid ${theme.pillBorder}`,
          boxShadow: theme.pillShadow,
        }}
      >

        {/* ── Logo ── */}
        <Link
          ref={logoRef}
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none',
            flexShrink: 0,
          }}
          onMouseEnter={(e) => {
            const ring = e.currentTarget.querySelector<HTMLElement>('div');
            if (ring) ring.style.borderColor = theme.logoRingHover;
          }}
          onMouseLeave={(e) => {
            const ring = e.currentTarget.querySelector<HTMLElement>('div');
            if (ring) ring.style.borderColor = theme.logoRing;
          }}
        >
          <AvatarRing size={36} />
          <span
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: '1.0625rem',
              fontWeight: 700,
              color: theme.logoText,
              letterSpacing: '-0.02em',
              lineHeight: 1,
              transition: 'color 0.2s',
            }}
          >
            Rumman<span style={{ color: theme.logoDot }}>.</span>
          </span>
        </Link>

        {/* ── Desktop nav links ── */}
        <nav
          ref={linksRef}
          className="desktop-nav"
          style={{ display: 'flex', alignItems: 'center', gap: '2px' }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              style={{
                position: 'relative',
                padding: '7px 16px',
                borderRadius: '10px',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.875rem',
                fontWeight: 500,
                letterSpacing: '0.01em',
                textDecoration: 'none',
                color: isActive(link.path) ? theme.linkActive : theme.linkColor,
                background: isActive(link.path) ? theme.linkActiveBg : 'transparent',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                if (!isActive(link.path)) {
                  (e.currentTarget as HTMLElement).style.color = theme.linkHoverColor;
                  (e.currentTarget as HTMLElement).style.background = theme.linkHoverBg;
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive(link.path)) {
                  (e.currentTarget as HTMLElement).style.color = theme.linkColor;
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                }
              }}
            >
              {link.name}
              {isActive(link.path) && (
                <span
                  style={{
                    position: 'absolute',
                    bottom: '5px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    background: theme.activeDot,
                    display: 'block',
                  }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* ── Desktop CTA group ── */}
        <div
          ref={ctaRef}
          className="desktop-cta"
          style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}
        >
          {/* GitHub CTA */}
          <a
            href="https://github.com/rumman2004"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 18px',
              borderRadius: '10px',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.8125rem',
              fontWeight: 700,
              letterSpacing: '0.01em',
              color: theme.ctaColor,
              background: theme.ctaBg,
              border: 'none',
              textDecoration: 'none',
              boxShadow: theme.ctaShadow,
              transition: 'all 0.22s ease',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.transform = 'translateY(-1px)';
              el.style.boxShadow = theme.ctaHoverShadow;
              el.style.background = theme.ctaHoverBg;
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.transform = '';
              el.style.boxShadow = theme.ctaShadow;
              el.style.background = theme.ctaBg;
            }}
          >
            GitHub
            <ArrowUpRight style={{ width: '13px', height: '13px' }} />
          </a>
        </div>

        {/* ── Mobile toggle ── */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            display: 'none', // shown via media query override below
            alignItems: 'center',
            justifyContent: 'center',
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            border: `1px solid ${theme.toggleBorder}`,
            background: theme.toggleBg,
            color: theme.toggleColor,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          className="mobile-toggle"
          aria-label="Toggle menu"
        >
          {mobileOpen
            ? <X style={{ width: '18px', height: '18px' }} />
            : <Menu style={{ width: '18px', height: '18px' }} />
          }
        </button>
      </div>

      {/* ── Mobile menu ── */}
      <div
        ref={mobileMenuRef}
        style={{ maxWidth: '1200px', margin: '8px auto 0', display: 'none' }}
      >
        <div
          style={{
            borderRadius: '16px',
            padding: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            background: theme.mobileMenuBg,
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: `1px solid ${theme.mobileMenuBorder}`,
            boxShadow: theme.mobileMenuShadow,
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="mobile-link"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                borderRadius: '10px',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.9375rem',
                fontWeight: 500,
                color: isActive(link.path) ? theme.mobileLinkActive : theme.mobileLinkColor,
                background: isActive(link.path) ? theme.mobileLinkActiveBg : 'transparent',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
            >
              {link.name}
              {isActive(link.path) && (
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: theme.mobileLinkActive,
                    display: 'block',
                  }}
                />
              )}
            </Link>
          ))}

          {/* Mobile CTA row */}
          <div
            style={{
              display: 'flex',
              gap: '8px',
              marginTop: '8px',
              paddingTop: '12px',
              borderTop: `1px solid ${theme.mobileCtaDivider}`,
            }}
          >
            <a
              href="https://res.cloudinary.com/dtbytfxzs/raw/upload/v1772296715/portfolio/1772296708892-Rumman%20Ahmed%20Resume"
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-link"
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '10px 0',
                borderRadius: '10px',
                fontFamily: "'DM Mono', monospace",
                fontSize: '0.7rem',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: theme.mobileResumeColor,
                border: `1px solid ${theme.mobileResumeBorder}`,
                textDecoration: 'none',
              }}
            >
              Resume <Download style={{ width: '12px', height: '12px' }} />
            </a>

            <a
              href="https://github.com/rumman2004"
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-link"
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '10px 0',
                borderRadius: '10px',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.8125rem',
                fontWeight: 700,
                color: theme.ctaColor,
                background: theme.ctaBg,
                textDecoration: 'none',
                boxShadow: theme.ctaShadow,
              }}
            >
              GitHub <ArrowUpRight style={{ width: '14px', height: '14px' }} />
            </a>
          </div>
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 767px) {
          .mobile-toggle { display: flex !important; }
          .desktop-nav, .desktop-cta { display: none !important; }
        }
      `}</style>
    </header>
  );
};

export default Navbar;