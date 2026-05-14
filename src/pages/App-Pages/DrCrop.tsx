import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ChevronLeft, Download, Scan, Play, Star,
  Brain, Cloud, Smartphone, History, Shield, Zap,
  Leaf, CheckCircle2, ArrowRight, Code2, ExternalLink,
  Sprout, FlaskConical, GraduationCap, Users, ChevronRight, ArrowDown,
} from 'lucide-react';

import { Images } from '../../data/images';

gsap.registerPlugin(ScrollTrigger);

// ─── Data ───────────────────────────────────────────────────────────────────
const FEATURES = [
  { icon: Brain,      title: 'AI-Powered Diagnosis',   desc: 'Google Gemini & OpenAI analyze crop images with sub-second precision.' },
  { icon: Cloud,      title: 'Cloud Image Management', desc: 'Cloudinary-backed storage — every scan secure and always accessible.' },
  { icon: Smartphone, title: 'Responsive UI',          desc: 'React 19 + Tailwind v4 + GSAP animations built for any screen size.' },
  { icon: History,    title: 'Diagnosis History',      desc: 'Revisit scans, track trends, and monitor your field health over time.' },
  { icon: Shield,     title: 'Hardened Security',      desc: 'Helmet, CORS, and hardened API practices protect every request.' },
  { icon: Zap,        title: 'Instant Performance',    desc: 'Vite + React 19 for near-instant loads and high responsiveness at scale.' },
];

const DETECT = [
  { icon: Leaf,        label: 'Plant diseases & infections' },
  { icon: FlaskConical,label: 'Nutrient deficiencies' },
  { icon: Scan,        label: 'Early-stage crop damage' },
  { icon: Star,        label: 'Smart treatment recommendations' },
  { icon: CheckCircle2,label: 'Preventive action guidance' },
];

const REPORTS = [
  'Symptoms identification',
  'Possible causes analysis',
  'Recommended treatments',
  'Prevention strategies',
  'Historical scan tracking',
];

const STATS = [
  { value: '40%',   label: 'Global crop loss yearly',      src: 'FAO 2021' },
  { value: '500M+', label: 'Smallholder farmers at risk',  src: 'IFAD 2023' },
  { value: '10k+',  label: 'Plant pathogens catalogued',   src: 'APS 2022' },
  { value: '2.7km', label: 'Disease migration / yr',       src: 'Nature 2023' },
];

const TECH = [
  { title: 'Frontend',       color: '#4ade80', items: ['React 19','TypeScript','Vite','Tailwind v4','GSAP','React Router v7','Lucide React'] },
  { title: 'Backend',        color: '#86efac', items: ['Node.js','Express.js','MongoDB','Mongoose','Multer','Cloudinary'] },
  { title: 'AI Integration', color: '#a3e635', items: ['Google Gemini API','OpenAI API'] },
];

const AUDIENCES = [
  { icon: Sprout,        label: 'Farmers' },
  { icon: GraduationCap, label: 'Agriculture Students' },
  { icon: FlaskConical,  label: 'Researchers' },
  { icon: Users,         label: 'Agronomists' },
];

// ─── Phone Frame ────────────────────────────────────────────────────────────
interface PhoneFrameProps { src?: string; alt?: string; className?: string; style?: React.CSSProperties; onMouseEnter?: React.MouseEventHandler<HTMLDivElement>; onMouseLeave?: React.MouseEventHandler<HTMLDivElement>; }
const PhoneFrame = ({ src, alt, className = '', style = {}, onMouseEnter = undefined, onMouseLeave = undefined }: PhoneFrameProps) => (
  <div
    className={`dc-phone ${className}`}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    style={{
      borderRadius: '1.2rem',
      border: '2px solid rgba(74,222,128,0.18)',
      overflow: 'hidden',
      background: '#111',
      boxShadow: '0 0 0 1px rgba(255,255,255,0.06), 0 32px 80px rgba(0,0,0,0.6), 0 0 40px rgba(74,222,128,0.04)',
      width: 'clamp(120px, 28vw, 200px)',
      flexShrink: 0,
      position: 'relative',
      ...style,
    }}
  >
    <div style={{
      position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)',
      width: 44, height: 4, borderRadius: 99, background: 'rgba(255,255,255,0.08)', zIndex: 2,
    }} />
    <img src={src} alt={alt} style={{ width: '100%', display: 'block' }} />
  </div>
);

// ─── Main Component ──────────────────────────────────────────────────────────
const DrCrop = () => {
  const pageRef   = useRef(null);
  const heroRef   = useRef(null);
  const mockupRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── hero stagger ──
      gsap.fromTo('.dc-h-anim',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.13, ease: 'power4.out', delay: 0.15 }
      );

      // ── mockup entrance ──
      gsap.fromTo(mockupRef.current,
        { y: 100, opacity: 0, scale: 0.92 },
        { y: 0, opacity: 1, scale: 1, duration: 1.5, ease: 'expo.out', delay: 0.5 }
      );

      // ── perpetual float ──
      gsap.to(mockupRef.current, {
        y: '-=18', duration: 3.6, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 2,
      });
      gsap.to(mockupRef.current, {
        rotation: 1.5, duration: 4.2, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 2,
      });

      // ── phone frames — staggered fan-in ──
      gsap.utils.toArray('.dc-phone').forEach((el: any, i) => {
        const rotate = (i % 3 - 1) * 5;
        gsap.fromTo(el,
          { y: 80, opacity: 0, rotation: rotate * 2 },
          {
            y: 0, opacity: 1, rotation: rotate,
            duration: 0.9, ease: 'back.out(1.4)',
            scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' },
          }
        );
        gsap.to(el, {
          y: `+=${6 + i * 2}`, duration: 2.8 + i * 0.4,
          yoyo: true, repeat: -1, ease: 'sine.inOut', delay: i * 0.3,
        });
      });

      // ── scroll-reveal sections ──
      gsap.utils.toArray('.dc-reveal').forEach((el: any) => {
        gsap.fromTo(el,
          { y: 56, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 86%', toggleActions: 'play none none none' },
          }
        );
      });

      gsap.utils.toArray('.dc-stagger').forEach((container: any) => {
        if (container.children.length) {
          gsap.fromTo(container.children,
            { y: 40, opacity: 0 },
            {
              y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out',
              scrollTrigger: { trigger: container, start: 'top 84%', toggleActions: 'play none none none' },
            }
          );
        }
      });

      // ── stat number count-up — preserve full original string ──
      gsap.utils.toArray('.dc-stat-val').forEach((el: any) => {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 88%',
          onEnter: () => {
            const raw = el.dataset.val || '';          // e.g. "40%", "500M+", "2.7km"
            const numMatch = raw.match(/^[\d.]+/);     // leading digits/decimal
            if (numMatch) {
              const end    = parseFloat(numMatch[0]);
              const suffix = raw.slice(numMatch[0].length); // everything after digits
              gsap.fromTo({ val: 0 }, { val: 0 }, {
                val: end, duration: 2, ease: 'power2.out',
                onUpdate: function () {
                  const v = this.targets()[0].val;
                  el.textContent = (Number.isInteger(end) ? Math.round(v) : v.toFixed(1)) + suffix;
                },
              });
            }
          },
          once: true,
        });
      });

      // ── horizontal marquee ──
      const strip = document.querySelector('.dc-marquee-inner');
      if (strip) gsap.to(strip, { x: '-50%', duration: 28, ease: 'none', repeat: -1 });

      // ── feature cards ──
      gsap.utils.toArray('.dc-feat').forEach((el: any, i) => {
        gsap.fromTo(el,
          { y: 50, opacity: 0, scale: 0.96 },
          {
            y: 0, opacity: 1, scale: 1, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
            delay: (i % 3) * 0.08,
          }
        );
      });

    }, pageRef);

    return () => ctx.revert();
  }, []);

  const handlePhoneHover = (e: React.MouseEvent, enter: boolean) => {
    gsap.to(e.currentTarget, {
      scale: enter ? 1.04 : 1,
      duration: enter ? 0.3 : 0.4,
      ease: 'power2.out',
    });
  };

  const MARQUEE_ITEMS = [
    'React 19','TypeScript','Node.js','MongoDB','Vite','GSAP',
    'Google Gemini','OpenAI','Cloudinary','Express.js','Tailwind v4','React Router v7',
    'React 19','TypeScript','Node.js','MongoDB','Vite','GSAP',
    'Google Gemini','OpenAI','Cloudinary','Express.js','Tailwind v4','React Router v7',
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&family=JetBrains+Mono:wght@400;500&display=swap');

        :root {
          --g: #4ade80;
          --g2: #22c55e;
          --g3: #86efac;
          --dark: #080a08;
          --dark2: #0e110e;
          --dark3: #141914;
          --border: rgba(74,222,128,0.12);
          --border-h: rgba(74,222,128,0.28);
          --text: #f0f4f0;
          --text-secondary: rgba(240,244,240,0.55);
          --text-muted: rgba(240,244,240,0.32);
          --surface: rgba(255,255,255,0.035);
          --surface-h: rgba(74,222,128,0.06);
        }

        .dc-wrap {
          background: var(--dark);
          color: var(--text);
          font-family: 'DM Sans', sans-serif;
          font-weight: 300;
          min-height: 100vh;
          padding-top: 5rem;
          overflow-x: hidden;
        }
        .dc-wrap *, .dc-wrap *::before, .dc-wrap *::after { box-sizing: border-box; }

        /* ── Typography ── */
        .dc-display {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          line-height: 0.92;
          letter-spacing: -0.04em;
          color: var(--text);
        }
        .dc-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.58rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--g);
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .dc-label::before {
          content: '';
          display: inline-block;
          width: 18px;
          height: 1px;
          background: var(--g);
        }
        .dc-h2 {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: clamp(1.75rem, 5vw, 3rem);
          line-height: 1.08;
          letter-spacing: -0.03em;
          color: var(--text);
          margin-top: 0.6rem;
        }
        .dc-h2 .accent { color: var(--g); }
        .dc-body {
          font-family: 'DM Sans', sans-serif;
          font-weight: 300;
          line-height: 1.8;
          color: var(--text-secondary);
          font-size: 0.97rem;
        }

        /* ── Divider ── */
        .dc-div {
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--border), transparent);
          margin: 0;
        }

        /* ── Tag ── */
        .dc-tag {
          display: inline-flex;
          align-items: center;
          padding: 0.28rem 0.75rem;
          border-radius: 100px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.58rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          background: rgba(74,222,128,0.07);
          border: 1px solid var(--border);
          color: var(--g3);
          white-space: nowrap;
          transition: background 0.2s, border-color 0.2s;
        }
        .dc-tag:hover { background: rgba(74,222,128,0.13); border-color: var(--border-h); }

        /* ── Stat card ── */
        .dc-stat {
          padding: 1.5rem 1.25rem;
          border-radius: 1.1rem;
          border: 1px solid var(--border);
          background: var(--surface);
          text-align: center;
          transition: border-color 0.25s, background 0.25s;
          position: relative;
          overflow: hidden;
        }
        .dc-stat::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at top, rgba(74,222,128,0.05) 0%, transparent 60%);
          pointer-events: none;
        }
        .dc-stat:hover { border-color: var(--border-h); background: var(--surface-h); }

        /* ── Feature card ── */
        .dc-feat {
          padding: 1.5rem;
          border-radius: 1.1rem;
          border: 1px solid var(--border);
          background: var(--surface);
          transition: border-color 0.3s, transform 0.3s, background 0.3s;
          cursor: default;
          position: relative;
          overflow: hidden;
        }
        .dc-feat::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, var(--g), transparent);
          opacity: 0; transition: opacity 0.3s;
        }
        .dc-feat:hover { border-color: var(--border-h); background: var(--surface-h); transform: translateY(-5px); }
        .dc-feat:hover::before { opacity: 1; }

        /* ── Buttons ── */
        .dc-btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 0.8rem 1.6rem;
          border-radius: 0.6rem;
          background: var(--g2); color: #04160a;
          font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: 0.9rem;
          text-decoration: none;
          transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
          cursor: pointer; border: none; white-space: nowrap;
        }
        .dc-btn-primary:hover { background: var(--g); transform: translateY(-2px); box-shadow: 0 12px 32px rgba(34,197,94,0.3); }

        .dc-btn-outline {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 0.8rem 1.6rem;
          border-radius: 0.6rem;
          background: transparent; color: var(--text);
          font-family: 'DM Sans', sans-serif; font-weight: 400; font-size: 0.9rem;
          text-decoration: none;
          border: 1px solid rgba(240,244,240,0.15);
          transition: border-color 0.2s, background 0.2s, transform 0.2s;
          cursor: pointer; white-space: nowrap;
        }
        .dc-btn-outline:hover { border-color: rgba(74,222,128,0.4); background: rgba(74,222,128,0.05); transform: translateY(-1px); }

        /* ── Detect row ── */
        .dc-detect-row {
          display: flex; align-items: center; gap: 1rem;
          padding: 1rem 1.25rem;
          border-radius: 0.75rem;
          border: 1px solid var(--border); background: var(--surface);
          transition: border-color 0.2s, background 0.2s, transform 0.2s;
          cursor: default;
        }
        .dc-detect-row:hover { border-color: var(--border-h); background: var(--surface-h); transform: translateX(6px); }

        /* ── Tech card ── */
        .dc-tech-card {
          padding: 1.75rem; border-radius: 1.1rem;
          border: 1px solid var(--border); background: var(--surface);
          transition: border-color 0.25s;
        }
        .dc-tech-card:hover { border-color: var(--border-h); }

        /* ── Audience pill ── */
        .dc-aud {
          display: flex; align-items: center; gap: 10px;
          padding: 0.85rem 1.25rem; border-radius: 0.75rem;
          border: 1px solid var(--border); background: var(--surface);
          font-family: 'DM Sans', sans-serif; font-size: 0.9rem; font-weight: 500;
          color: var(--text); transition: border-color 0.2s, background 0.2s; cursor: default;
        }
        .dc-aud:hover { border-color: var(--border-h); background: var(--surface-h); }

        /* ── Marquee ── */
        .dc-marquee { overflow: hidden; width: 100%; }
        .dc-marquee-inner { display: flex; gap: 1.5rem; width: max-content; align-items: center; }

        /* ── Hero glow ── */
        .dc-glow {
          position: absolute; width: 700px; height: 700px; border-radius: 50%;
          background: radial-gradient(ellipse, rgba(34,197,94,0.06) 0%, transparent 70%);
          filter: blur(80px); pointer-events: none;
        }

        /* ── Noise grain ── */
        .dc-grain {
          position: fixed; inset: 0; pointer-events: none; opacity: 0.018; z-index: 1000;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-repeat: repeat; background-size: 180px;
        }

        /* ── Grid bg ── */
        .dc-grid-bg {
          position: absolute; inset: 0; pointer-events: none; z-index: 0;
          background-image:
            linear-gradient(rgba(74,222,128,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(74,222,128,0.03) 1px, transparent 1px);
          background-size: 56px 56px;
          mask-image: radial-gradient(ellipse 90% 90% at 50% 0%, black 20%, transparent 100%);
        }

        /* ── Why box ── */
        .dc-why {
          border-radius: 1.25rem; border: 1px solid var(--border);
          background: linear-gradient(135deg, rgba(34,197,94,0.06) 0%, rgba(74,222,128,0.02) 100%);
          padding: 2rem; position: relative; overflow: hidden;
        }
        .dc-why::after {
          content: ''; position: absolute; bottom: -40px; right: -40px;
          width: 200px; height: 200px; border-radius: 50%;
          background: radial-gradient(circle, rgba(74,222,128,0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        /* ── CTA box ── */
        .dc-cta {
          border-radius: 1.5rem; border: 1px solid var(--border);
          background: linear-gradient(135deg, rgba(34,197,94,0.06) 0%, transparent 60%);
          padding: 3rem 1.5rem; text-align: center;
          max-width: 700px; margin: 0 auto; position: relative; overflow: hidden;
        }
        .dc-cta::before {
          content: ''; position: absolute; top: -80px; left: 50%; transform: translateX(-50%);
          width: 300px; height: 200px; border-radius: 50%;
          background: radial-gradient(ellipse, rgba(34,197,94,0.1) 0%, transparent 70%);
          pointer-events: none;
        }

        /* ── Back link ── */
        .dc-back {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: 'JetBrains Mono', monospace; font-size: 0.6rem;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--g); text-decoration: none; transition: gap 0.2s, color 0.2s;
        }
        .dc-back:hover { gap: 10px; color: var(--g3); }

        /* ── Scrollbar ── */
        .dc-wrap ::-webkit-scrollbar { width: 3px; }
        .dc-wrap ::-webkit-scrollbar-track { background: transparent; }
        .dc-wrap ::-webkit-scrollbar-thumb { background: rgba(74,222,128,0.25); border-radius: 99px; }

        /* ══════════ LAYOUT GRID ══════════ */

        /* Single column by default (mobile-first) */
        .dc-two-col {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: center;
        }

        /* Flip column order on mobile for phone-first sections */
        .dc-two-col.phones-first .dc-phones-side { order: -1; }
        .dc-two-col.text-first   .dc-text-side   { order: -1; }

        /* Desktop: 2 columns */
        @media (min-width: 1024px) {
          .dc-two-col {
            grid-template-columns: 1fr 1fr;
            gap: 5rem;
          }
          /* Reset order on desktop — source order wins */
          .dc-two-col.phones-first .dc-phones-side,
          .dc-two-col.text-first   .dc-text-side   { order: 0; }
        }

        /* ── Section padding responsive ── */
        .dc-section {
          padding: 3.5rem 5vw;
        }
        @media (min-width: 640px)  { .dc-section { padding: 4.5rem 5vw; } }
        @media (min-width: 1024px) { .dc-section { padding: 5.5rem 5vw; } }

        /* ── Phone gallery wrapper ── */
        .dc-phones-row {
          display: flex;
          align-items: flex-end;
          justify-content: center;
          gap: clamp(0.6rem, 2vw, 1.25rem);
          flex-wrap: nowrap;          /* keep in one row */
          overflow: visible;
        }

        /* ── Interface gallery ── */
        .dc-gallery-row {
          display: flex;
          align-items: flex-end;
          justify-content: center;
          gap: clamp(0.5rem, 1.5vw, 1rem);
          flex-wrap: wrap;            /* wraps to 2 rows on very small screens */
          padding: 1rem 0;
        }

        /* Gallery item — hide outer ones on small screens */
        .dc-gallery-item { display: flex; flex-direction: column; align-items: center; gap: 0.75rem; }
        @media (max-width: 479px) {
          /* show only 3 center phones on very small screens */
          .dc-gallery-item.edge { display: none; }
        }

        /* ── Hero layout ── */
        .dc-hero-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
          align-items: center;
          position: relative;
          z-index: 2;
        }
        @media (min-width: 1024px) {
          .dc-hero-grid {
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
          }
        }

        /* Hero mockup: visible on all sizes */
        .dc-hero-mockup-wrap {
          display: flex;
          justify-content: center;
          align-items: center;
          order: -1;   /* mockup first on mobile */
        }
        @media (min-width: 1024px) {
          .dc-hero-mockup-wrap { order: 0; }
        }

        /* ── Stats grid ── */
        .dc-stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }
        @media (min-width: 640px) {
          .dc-stats-grid { grid-template-columns: repeat(4, 1fr); }
        }

        /* ── Feature cards grid ── */
        .dc-feat-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }
        @media (min-width: 640px)  { .dc-feat-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) { .dc-feat-grid { grid-template-columns: repeat(3, 1fr); } }

        /* ── Tech stack grid ── */
        .dc-tech-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }
        @media (min-width: 640px) {
          .dc-tech-grid { grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); }
        }

        /* ── Audience grid ── */
        .dc-aud-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.75rem;
        }

        /* ── CTA buttons row ── */
        .dc-cta-btns {
          display: flex;
          flex-wrap: wrap;
          gap: 0.85rem;
          justify-content: center;
          align-items: center;
        }

        /* ── Hero CTAs ── */
        .dc-hero-ctas {
          display: flex;
          flex-wrap: wrap;
          gap: 0.85rem;
          align-items: center;
        }

        /* ── Slogan strip ── */
        .dc-slogan {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem 1.5rem;
          margin-top: 2rem;
        }

        /* ── Tablet breakpoint misc ── */
        @media (min-width: 640px) {
          .dc-cta { padding: 4rem 2.5rem; }
          .dc-why { padding: 2.5rem; }
        }
      `}</style>

      <div className="dc-grain" aria-hidden="true" />

      <div ref={pageRef} className="dc-wrap">

        {/* ══════════ BACK NAV ══════════ */}
        <div style={{ padding: '1.5rem 5vw 0', position: 'relative', zIndex: 20 }}>
          <Link to="/" className="dc-back">
            <ChevronLeft style={{ width: 13, height: 13 }} />
            Back to Showcase
          </Link>
        </div>

        {/* ══════════ HERO ══════════ */}
        <section
          ref={heroRef}
          style={{
            position: 'relative', overflow: 'hidden',
            padding: 'clamp(2.5rem,5vw,5rem) 5vw clamp(3rem,6vw,7rem)',
          }}
        >
          <div className="dc-grid-bg" />
          <div className="dc-glow" style={{ top: '-20%', left: '55%' }} />
          <div className="dc-glow" style={{ top: '40%', left: '-10%', opacity: 0.5 }} />

          <div className="dc-hero-grid">

            {/* Text block */}
            <div>
              <div className="dc-h-anim" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <img src={Images.drCrop.icon} alt="Dr. Crop Icon" style={{ width: 60, height: 60, borderRadius: '1.2rem', flexShrink: 0,
                  border: '1px solid rgba(74,222,128,0.2)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 20px rgba(74,222,128,0.08)',
                }} />
                <div>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace", fontSize: '0.55rem',
                    letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--g)', marginBottom: 5,
                  }}>AI-Powered Agriculture</div>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.4rem', fontWeight: 800, color: 'var(--text)', lineHeight: 1 }}>
                    Dr. Crop
                  </div>
                </div>
              </div>

              <h1 className="dc-h-anim dc-display" style={{ fontSize: 'clamp(2.4rem, 7vw, 6rem)', margin: 0 }}>
                Your crop's health,{' '}
                <span style={{ color: 'var(--g)' }}>diagnosed.</span>
              </h1>

              <p className="dc-h-anim dc-body" style={{ marginTop: '1.5rem', maxWidth: '36rem', fontSize: 'clamp(0.9rem, 2vw, 1.05rem)', lineHeight: 1.75 }}>
                Dr. Crop is an AI-powered crop disease diagnosis platform — photograph a diseased plant and receive a structured report with symptoms, causes, treatment, and prevention in seconds.
              </p>

              <div className="dc-h-anim" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1.75rem' }}>
                {['Gemini AI', 'OpenAI', 'React 19', 'Node.js', 'Cloudinary'].map(t => (
                  <span key={t} className="dc-tag">{t}</span>
                ))}
              </div>

              <div className="dc-h-anim dc-hero-ctas" style={{ marginTop: '2rem' }}>
                <a href="https://drive.google.com/uc?export=download&id=18VqSEamLpBba963Q3TwUU6MZP3k1fjQw" className="dc-btn-primary">
                  <ArrowDown style={{ width: 16, height: 16 }} /> Download APK 
                </a>
                <a href="https://dr-crop-ecru.vercel.app/" className="dc-btn-outline">
                  <Play style={{ width: 14, height: 14 }} /> Live Demo
                </a>
                <a href="#features" className="dc-btn-outline">
                  Explore <ChevronRight style={{ width: 14, height: 14 }} />
                </a>
              </div>

              <div className="dc-h-anim dc-slogan">
                {['Detect.', 'Diagnose.', 'Protect.'].map(w => (
                  <span key={w} style={{
                    fontFamily: "'Syne', sans-serif", fontWeight: 700,
                    fontSize: '1.05rem', color: 'var(--g)', opacity: 0.85,
                  }}>{w}</span>
                ))}
              </div>
            </div>

            {/* Mockup */}
            <div className="dc-hero-mockup-wrap">
              <div ref={mockupRef} style={{
                filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.5)) drop-shadow(0 0 40px rgba(34,197,94,0.08))',
                willChange: 'transform',
              }}>
                <img
                  src={Images.drCrop.mockup}
                  alt="Dr. Crop App Mockup"
                  style={{ width: 'clamp(280px, 60vw, 750px)', display: 'block', userSelect: 'none' }}
                  draggable={false}
                />
              </div>
            </div>
          </div>
        </section>

        <div className="dc-div" />

        {/* ══════════ STATS ══════════ */}
        <section className="dc-section">
          <div className="dc-stagger dc-stats-grid">
            {STATS.map(({ value, label, src }) => (
              <div key={label} className="dc-stat">
                <div
                  className="dc-stat-val"
                  data-val={value}
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: 'clamp(1.8rem, 5vw, 2.6rem)', fontWeight: 800,
                    color: 'var(--g)', lineHeight: 1, marginBottom: '0.55rem',
                  }}
                >
                  {value}
                </div>
                <div className="dc-body" style={{ fontSize: '0.82rem', marginBottom: '0.4rem' }}>{label}</div>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.52rem', letterSpacing: '0.1em',
                  color: 'var(--text-muted)', textTransform: 'uppercase',
                }}>{src}</div>
              </div>
            ))}
          </div>
        </section>

        <div className="dc-div" />

        {/* ══════════ ABOUT ══════════ */}
        <section className="dc-section">
          <div className="dc-two-col phones-first">

            {/* Phone gallery */}
            <div className="dc-phones-side dc-reveal">
              <div className="dc-phones-row">
                <PhoneFrame src={Images.drCrop.splash} alt="Splash Screen"
                  style={{ transform: 'rotate(-4deg)', transformOrigin: 'center bottom' }}
                  onMouseEnter={e => handlePhoneHover(e, true)}
                  onMouseLeave={e => handlePhoneHover(e, false)}
                />
                <PhoneFrame src={Images.drCrop.home} alt="Home Screen"
                  onMouseEnter={e => handlePhoneHover(e, true)}
                  onMouseLeave={e => handlePhoneHover(e, false)}
                />
                <PhoneFrame src={Images.drCrop.scan} alt="Scan Screen"
                  style={{ transform: 'rotate(6deg)', transformOrigin: 'center bottom' }}
                  onMouseEnter={e => handlePhoneHover(e, true)}
                  onMouseLeave={e => handlePhoneHover(e, false)}
                />
              </div>
            </div>

            {/* Text */}
            <div className="dc-text-side dc-reveal">
              <div className="dc-label">About Dr. Crop</div>
              <h2 className="dc-h2" style={{ marginTop: '0.75rem' }}>
                Built for everyone.<br />
                <span className="accent">Designed for simplicity.</span>
              </h2>
              <div style={{ height: 1, background: 'var(--border)', margin: '1.5rem 0' }} />
              <p className="dc-body">
                Agriculture powers the world, but plant diseases continue to threaten food security globally. Dr. Crop combines modern AI with an intuitive experience to make disease diagnosis accessible, fast, and reliable — for both professionals and beginners.
              </p>
              <p className="dc-body" style={{ marginTop: '1rem' }}>
                Upload or scan a crop image and receive a structured diagnosis — symptoms, causes, treatment recommendations, and prevention methods — all within seconds.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginTop: '2rem' }}>
                {['Offline-first capable', 'Low-bandwidth optimised', 'Remote agriculture ready'].map(t => (
                  <span key={t} className="dc-tag">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="dc-div" />

        {/* ══════════ AI ENGINE ══════════ */}
        <section className="dc-section" style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(34,197,94,0.025) 50%, transparent 100%)',
        }}>
          <div className="dc-reveal" style={{ maxWidth: 560, marginBottom: '3rem' }}>
            <div className="dc-label">AI Engine</div>
            <h2 className="dc-h2">What it <span className="accent">detects.</span></h2>
            <div style={{ height: 1, background: 'var(--border)', margin: '1.5rem 0' }} />
            <p className="dc-body">
              Powered by Google Gemini and OpenAI, Dr. Crop analyses uploaded crop images and generates intelligent diagnosis reports with remarkable speed and precision.
            </p>
          </div>

          <div className="dc-two-col text-first">

            <div className="dc-text-side dc-reveal" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {DETECT.map(({ icon: Icon, label }) => (
                <div key={label} className="dc-detect-row">
                  <span style={{
                    width: 36, height: 36, borderRadius: '0.5rem', flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(74,222,128,0.1)', border: '1px solid var(--border)',
                  }}>
                    <Icon style={{ width: 15, height: 15, color: 'var(--g)' }} />
                  </span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.95rem', fontWeight: 500 }}>
                    {label}
                  </span>
                  <ArrowRight style={{ width: 14, height: 14, color: 'var(--g)', marginLeft: 'auto', opacity: 0.5 }} />
                </div>
              ))}
            </div>

            <div className="dc-phones-side dc-reveal">
              <div className="dc-phones-row">
                <PhoneFrame src={Images.drCrop.gallery} alt="Gallery"
                  style={{ transform: 'rotate(-2deg)', transformOrigin: 'center bottom' }}
                  onMouseEnter={e => handlePhoneHover(e, true)}
                  onMouseLeave={e => handlePhoneHover(e, false)}
                />
                <PhoneFrame src={Images.drCrop.scan} alt="Scan"
                  style={{ transform: 'rotate(4deg)', transformOrigin: 'center bottom' }}
                  onMouseEnter={e => handlePhoneHover(e, true)}
                  onMouseLeave={e => handlePhoneHover(e, false)}
                />
              </div>
            </div>
          </div>
        </section>

        <div className="dc-div" />

        {/* ══════════ REPORTS ══════════ */}
        <section className="dc-section">
          <div className="dc-two-col phones-first">

            <div className="dc-phones-side dc-reveal">
              <div className="dc-phones-row">
                <PhoneFrame src={Images.drCrop.history} alt="History"
                  style={{ transform: 'rotate(-4deg)', transformOrigin: 'center bottom' }}
                  onMouseEnter={e => handlePhoneHover(e, true)}
                  onMouseLeave={e => handlePhoneHover(e, false)}
                />
                <PhoneFrame src={Images.drCrop.profile} alt="Profile"
                  style={{ transform: 'rotate(4deg)', transformOrigin: 'center bottom' }}
                  onMouseEnter={e => handlePhoneHover(e, true)}
                  onMouseLeave={e => handlePhoneHover(e, false)}
                />
              </div>
            </div>

            <div className="dc-text-side dc-reveal">
              <div className="dc-label">Smart Reports</div>
              <h2 className="dc-h2">
                Structured insights<br />
                <span className="accent">farmers can use.</span>
              </h2>
              <div style={{ height: 1, background: 'var(--border)', margin: '1.5rem 0' }} />
              <p className="dc-body">
                Every diagnosis is explained clearly. Actionable steps designed to simplify agricultural decision-making for professionals and beginners alike.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1.75rem' }}>
                {REPORTS.map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <CheckCircle2 style={{ width: 15, height: 15, color: 'var(--g)', flexShrink: 0 }} />
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="dc-div" />

        {/* ══════════ FEATURES ══════════ */}
        <section id="features" className="dc-section">
          <div className="dc-reveal" style={{ textAlign: 'center', maxWidth: 520, margin: '0 auto 3rem' }}>
            <div className="dc-label">Core Features</div>
            <h2 className="dc-h2">
              Everything you need<br />
              <span className="accent">in one app.</span>
            </h2>
          </div>

          <div className="dc-feat-grid">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="dc-feat">
                <div style={{
                  width: 44, height: 44, borderRadius: '0.75rem', marginBottom: '1.25rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.14)',
                }}>
                  <Icon style={{ width: 19, height: 19, color: 'var(--g)' }} />
                </div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '1.02rem', color: 'var(--text)', marginBottom: '0.55rem' }}>
                  {title}
                </div>
                <div className="dc-body" style={{ fontSize: '0.86rem' }}>{desc}</div>
              </div>
            ))}
          </div>
        </section>

        <div className="dc-div" />

        {/* ══════════ MARQUEE ══════════ */}
        <section style={{ padding: '2.5rem 0', overflow: 'hidden' }}>
          <div className="dc-marquee">
            <div className="dc-marquee-inner">
              {MARQUEE_ITEMS.map((item, i) => (
                <span key={i} style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: i % 2 === 0 ? 'var(--g)' : 'var(--text-muted)',
                  padding: '0.4rem 1.2rem',
                  border: '1px solid var(--border)', borderRadius: '100px',
                  background: 'var(--surface)', flexShrink: 0,
                }}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        <div className="dc-div" />

        {/* ══════════ TECH STACK ══════════ */}
        <section className="dc-section" style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(34,197,94,0.025) 50%, transparent 100%)',
        }}>
          <div className="dc-reveal" style={{ marginBottom: '2.5rem' }}>
            <div className="dc-label">Technology</div>
            <h2 className="dc-h2">Built with the <span className="accent">best stack.</span></h2>
          </div>

          <div className="dc-stagger dc-tech-grid">
            {TECH.map(({ title, color, items }) => (
              <div key={title} className="dc-tech-card">
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.58rem', letterSpacing: '0.15em', textTransform: 'uppercase',
                  color, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: 8,
                }}>
                  <span style={{ width: 14, height: 1, background: color, display: 'inline-block' }} />
                  {title}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {items.map(item => (
                    <span key={item} style={{
                      padding: '0.3rem 0.75rem', borderRadius: '100px',
                      fontFamily: "'DM Sans', sans-serif", fontSize: '0.78rem', fontWeight: 400,
                      background: `${color}12`, border: `1px solid ${color}28`, color: 'var(--text)',
                    }}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="dc-div" />

        {/* ══════════ AUDIENCE + WHY ══════════ */}
        <section className="dc-section">
          <div className="dc-two-col">

            <div className="dc-reveal">
              <div className="dc-label">Perfect For</div>
              <h2 className="dc-h2">
                Technology serving<br />
                <span className="accent">agriculture.</span>
              </h2>
              <div style={{ height: 1, background: 'var(--border)', margin: '1.5rem 0' }} />
              <p className="dc-body" style={{ marginBottom: '2rem' }}>
                Dr. Crop bridges the gap between artificial intelligence and modern farming. Cloud-powered infrastructure and responsive mobile design let users diagnose crops anytime, anywhere.
              </p>
              <div className="dc-aud-grid">
                {AUDIENCES.map(({ icon: Icon, label }) => (
                  <div key={label} className="dc-aud">
                    <Icon style={{ width: 15, height: 15, color: 'var(--g)' }} />
                    {label}
                  </div>
                ))}
              </div>
            </div>

            <div className="dc-reveal dc-why">
              <div style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: '0.56rem',
                letterSpacing: '0.18em', textTransform: 'uppercase',
                color: 'var(--g)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <span style={{ width: 14, height: 1, background: 'var(--g)', display: 'inline-block' }} />
                Why Dr. Crop?
              </div>
              <h3 style={{
                fontFamily: "'Syne', sans-serif", fontWeight: 700,
                fontSize: 'clamp(1.3rem, 3vw, 2rem)', lineHeight: 1.1,
                color: 'var(--text)', marginBottom: '1.25rem',
              }}>
                Agriculture deserves smarter tools.
              </h3>
              <p className="dc-body">
                Dr. Crop combines AI, cloud infrastructure, and premium UX into a single platform focused on helping users protect crops more efficiently.
              </p>
              <p className="dc-body" style={{ marginTop: '0.75rem', color: 'var(--g)', fontStyle: 'italic' }}>
                It's not just a diagnosis app — it's a modern agriculture companion.
              </p>
              <div className="dc-slogan">
                {['Detect.', 'Diagnose.', 'Protect.'].map(t => (
                  <span key={t} style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '1.1rem', color: 'var(--g)' }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="dc-div" />

        {/* ══════════ SCREEN GALLERY ══════════ */}
        <section className="dc-section" style={{ textAlign: 'center' }}>
          <div className="dc-reveal" style={{ marginBottom: '3rem' }}>
            <div className="dc-label">Interface Gallery</div>
            <h2 className="dc-h2">
              Beautiful screens,<br />
              <span className="accent">every detail considered.</span>
            </h2>
          </div>

          <div className="dc-reveal" style={{ position: 'relative' }}>
            {/* Background glow */}
            <div style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '280px', height: '360px',
              background: 'radial-gradient(ellipse, rgba(74,222,128,0.08) 0%, transparent 70%)',
              filter: 'blur(40px)', pointerEvents: 'none', zIndex: 0,
            }} />

            <div className="dc-gallery-row">
              {[
                { src: Images.drCrop.home,    alt: 'Home Dashboard', label: 'Dashboard',   rot: -5, edge: true  },
                { src: Images.drCrop.scan,    alt: 'Plant Scanner',  label: 'AI Scanner',  rot: 2,  edge: false },
                { src: Images.drCrop.history, alt: 'History Log',    label: 'History',     rot: -3, edge: false },
                { src: Images.drCrop.journal, alt: 'Journal',        label: 'Journal',     rot: 6,  edge: false },
                { src: Images.drCrop.profile, alt: 'User Profile',   label: 'Profile',     rot: 4,  edge: true  },
              ].map(({ src, alt, label, rot, edge }) => (
                <div
                  key={alt}
                  className={`dc-gallery-item${edge ? ' edge' : ''}`}
                  style={{
                    transform: `rotate(${rot}deg)`,
                    transformOrigin: 'center bottom',
                    transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1)',
                    position: 'relative',
                    zIndex: rot === 0 ? 3 : 1,
                  }}
                >
                  <PhoneFrame
                    src={src} alt={alt}
                    style={{
                      boxShadow: rot === 0
                        ? '0 0 0 1px rgba(74,222,128,0.12), 0 40px 100px rgba(0,0,0,0.7), 0 0 60px rgba(74,222,128,0.06)'
                        : undefined,
                    }}
                    onMouseEnter={e => handlePhoneHover(e, true)}
                    onMouseLeave={e => handlePhoneHover(e, false)}
                  />
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace", fontSize: '0.52rem',
                    letterSpacing: '0.14em', textTransform: 'uppercase',
                    color: rot === 0 ? 'rgba(74,222,128,0.7)' : 'rgba(255,255,255,0.2)',
                    whiteSpace: 'nowrap',
                  }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="dc-div" />

        {/* ══════════ CTA ══════════ */}
        <section className="dc-section" style={{ paddingBottom: 'clamp(4rem,8vw,7rem)' }}>
          <div className="dc-reveal dc-cta">
            <div className="dc-label" style={{ justifyContent: 'center' }}>Ready?</div>
            <h2 className="dc-h2" style={{ marginTop: '0.75rem', marginBottom: '1rem' }}>
              Protect your crops <span className="accent">smarter.</span>
            </h2>
            <p className="dc-body" style={{ maxWidth: 440, margin: '0 auto 2.5rem', fontSize: '1rem' }}>
              AI-powered diagnosis, cloud infrastructure, and beautiful design — now in your hands.
            </p>
            <div className="dc-cta-btns">
              <a href="https://drive.google.com/uc?export=download&id=18VqSEamLpBba963Q3TwUU6MZP3k1fjQw" className="dc-btn-primary">
                <Download style={{ width: 16, height: 16 }} /> Download Now
              </a>
              <a href="https://github.com/rumman2004" target="_blank" rel="noopener noreferrer" className="dc-btn-outline">
                <Code2 style={{ width: 15, height: 15 }} /> GitHub
              </a>
              <a href="https://dr-crop-ecru.vercel.app/" className="dc-btn-outline">
                <ExternalLink style={{ width: 14, height: 14 }} /> Live Demo
              </a>
            </div>

            <div style={{
              position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
              width: '40%', height: 1,
              background: 'linear-gradient(90deg, transparent, var(--g), transparent)',
              borderRadius: 99,
            }} />
          </div>
        </section>

      </div>
    </>
  );
};

export default DrCrop;