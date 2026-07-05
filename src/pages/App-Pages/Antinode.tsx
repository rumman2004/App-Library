import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ChevronLeft, Download, ChevronRight, ArrowRight, Code2, ExternalLink, CheckCircle2,
  ShieldCheck, FolderTree, Cloud, Sparkles, Smartphone,
  Layers, Lock, Server, Zap, Target,
  GraduationCap, Briefcase, FlaskConical, User,
} from 'lucide-react';

import { Images } from '../../data/images';

gsap.registerPlugin(ScrollTrigger);

// ─── Links ────────────────────────────────────────────────────────────────────
const GITHUB   = 'https://github.https://github.com/rumman2004/Antinode';
const DOWNLOAD = 'https://drive.google.com/file/d/1fGlz5E20LyGignmI8o9-SlgbVHE3i5ZR/view?usp=sharing'; // TODO: swap for the real APK / store link

// ─── Data ───────────────────────────────────────────────────────────────────
const FEATURES = [
  { icon: ShieldCheck, title: 'Secure Authentication', desc: 'Robust registration & login powered by JWT — your workspace stays private, always.' },
  { icon: FolderTree,  title: 'Smart File Management', desc: 'Create folders, upload documents, organize notes. Your workspace, your rules.' },
  { icon: Cloud,       title: 'Cloud-Powered',         desc: 'Wired to a live AWS EC2 backend — data persistently saved and instantly retrieved from anywhere.' },
  { icon: Sparkles,    title: 'Premium Aesthetics',    desc: 'A minimalist design system, smooth micro-animations, and a custom native splash screen.' },
  { icon: Smartphone,  title: 'Cross-Platform Feel',   desc: 'Built with React Native & Expo for a seamless, high-performance native experience.' },
];

const OBJECTIVES = [
  { icon: Layers, label: 'One hub for every document & note' },
  { icon: Lock,   label: 'Total ownership of your data structure' },
  { icon: Server, label: 'Custom cloud — no third-party lock-in' },
  { icon: Zap,    label: 'Highly responsive, distraction-free' },
  { icon: Target, label: 'Effortless organization, zero clutter' },
];

const SOLUTION = [
  'Clean, distraction-free environment',
  'Smart file management built in',
  'Live AWS-powered backend',
  'Instantly accessible & securely backed up',
  'Fluid micro-animations throughout',
];

const STATS = [
  { value: '9+',   label: 'Apps we juggle daily',     src: 'Typical user' },
  { value: '60%',  label: 'Focus lost app-switching', src: 'Context cost' },
  { value: '100%', label: 'Ownership of your data',   src: 'Your cloud' },
  { value: '24/7', label: 'Backend availability',     src: 'AWS EC2' },
];

const TECH = [
  { title: 'Frontend', color: '#5b8dff', items: ['React Native','Expo','TypeScript','React Navigation','GSAP','RN Animated'] },
  { title: 'Backend',  color: '#8fb0ff', items: ['Node.js','Express','AWS EC2','Nginx','JWT'] },
];

const AUDIENCES = [
  { icon: GraduationCap, label: 'Students' },
  { icon: Briefcase,     label: 'Professionals' },
  { icon: FlaskConical,  label: 'Researchers' },
  { icon: User,          label: 'Personal Use' },
];

// ─── Framed Mockup Card ───────────────────────────────────────────────────────
// The Antinode screenshots are already-rendered tilted device mockups (frame +
// shadow baked in), so we present them inside a rounded "product card" rather
// than a CSS phone bezel.
interface ShotProps { src?: string; alt?: string; className?: string; style?: React.CSSProperties; onMouseEnter?: React.MouseEventHandler<HTMLImageElement>; onMouseLeave?: React.MouseEventHandler<HTMLImageElement>; }
const Shot = ({ src, alt, className = '', style = {}, onMouseEnter = undefined, onMouseLeave = undefined }: ShotProps) => (
  <img
    src={src}
    alt={alt}
    className={`an-shot ${className}`}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    style={{
      display: 'block',
      flexShrink: 0,
      position: 'relative',
      ...style,
    }}
    draggable={false}
  />
);

// ─── Main Component ──────────────────────────────────────────────────────────
const Antinode = () => {
  const pageRef   = useRef(null);
  const heroRef   = useRef(null);
  const mockupRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── hero stagger ──
      gsap.fromTo('.an-h-anim',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.13, ease: 'power4.out', delay: 0.15 }
      );

      // ── hero mockup entrance ──
      gsap.fromTo(mockupRef.current,
        { y: 100, opacity: 0, scale: 0.92 },
        { y: 0, opacity: 1, scale: 1, duration: 1.5, ease: 'expo.out', delay: 0.5 }
      );

      // ── perpetual float ──
      gsap.to(mockupRef.current, {
        y: '-=16', duration: 3.6, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 2,
      });
      gsap.to(mockupRef.current, {
        rotation: 1.2, duration: 4.2, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 2,
      });

      // ── framed shots — staggered fan-in + float ──
      gsap.utils.toArray('.an-shot').forEach((el: any, i) => {
        const rotate = (i % 3 - 1) * 4;
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
      gsap.utils.toArray('.an-reveal').forEach((el: any) => {
        gsap.fromTo(el,
          { y: 56, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 86%', toggleActions: 'play none none none' },
          }
        );
      });

      gsap.utils.toArray('.an-stagger').forEach((container: any) => {
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
      gsap.utils.toArray('.an-stat-val').forEach((el: any) => {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 88%',
          onEnter: () => {
            const raw = el.dataset.val || '';          // e.g. "9+", "60%", "24/7"
            const numMatch = raw.match(/^[\d.]+/);      // leading digits/decimal
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
      const strip = document.querySelector('.an-marquee-inner');
      if (strip) gsap.to(strip, { x: '-50%', duration: 28, ease: 'none', repeat: -1 });

      // ── feature cards ──
      gsap.utils.toArray('.an-feat').forEach((el: any, i) => {
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

  const handleShotHover = (e: React.MouseEvent, enter: boolean) => {
    gsap.to(e.currentTarget, {
      scale: enter ? 1.04 : 1,
      duration: enter ? 0.3 : 0.4,
      ease: 'power2.out',
    });
  };

  const MARQUEE_ITEMS = [
    'React Native','Expo','TypeScript','Node.js','Express','AWS EC2',
    'Nginx','JWT','React Navigation','GSAP','RN Animated','REST API',
    'React Native','Expo','TypeScript','Node.js','Express','AWS EC2',
    'Nginx','JWT','React Navigation','GSAP','RN Animated','REST API',
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&family=JetBrains+Mono:wght@400;500&display=swap');

        :root {
          --b: #5b8dff;
          --b2: #2563ff;
          --b3: #8fb0ff;
          --dark: #060810;
          --dark2: #0b0e16;
          --dark3: #10141e;
          --border: rgba(91,141,255,0.12);
          --border-h: rgba(91,141,255,0.30);
          --text: #eef1f8;
          --text-secondary: rgba(238,241,248,0.55);
          --text-muted: rgba(238,241,248,0.32);
          --surface: rgba(255,255,255,0.035);
          --surface-h: rgba(91,141,255,0.06);
        }

        .an-wrap {
          background: var(--dark);
          color: var(--text);
          font-family: 'DM Sans', sans-serif;
          font-weight: 300;
          min-height: 100vh;
          padding-top: 5rem;
          overflow-x: hidden;
        }
        .an-wrap *, .an-wrap *::before, .an-wrap *::after { box-sizing: border-box; }

        /* ── Typography ── */
        .an-display {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          line-height: 0.92;
          letter-spacing: -0.04em;
          color: var(--text);
        }
        .an-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.58rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--b);
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .an-label::before {
          content: '';
          display: inline-block;
          width: 18px;
          height: 1px;
          background: var(--b);
        }
        .an-h2 {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: clamp(1.75rem, 5vw, 3rem);
          line-height: 1.08;
          letter-spacing: -0.03em;
          color: var(--text);
          margin-top: 0.6rem;
        }
        .an-h2 .accent { color: var(--b); }
        .an-body {
          font-family: 'DM Sans', sans-serif;
          font-weight: 300;
          line-height: 1.8;
          color: var(--text-secondary);
          font-size: 0.97rem;
        }

        /* ── Divider ── */
        .an-div {
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--border), transparent);
          margin: 0;
        }

        /* ── Tag ── */
        .an-tag {
          display: inline-flex;
          align-items: center;
          padding: 0.28rem 0.75rem;
          border-radius: 100px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.58rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          background: rgba(91,141,255,0.07);
          border: 1px solid var(--border);
          color: var(--b3);
          white-space: nowrap;
          transition: background 0.2s, border-color 0.2s;
        }
        .an-tag:hover { background: rgba(91,141,255,0.13); border-color: var(--border-h); }

        /* ── Stat card ── */
        .an-stat {
          padding: 1.5rem 1.25rem;
          border-radius: 1.1rem;
          border: 1px solid var(--border);
          background: var(--surface);
          text-align: center;
          transition: border-color 0.25s, background 0.25s;
          position: relative;
          overflow: hidden;
        }
        .an-stat::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at top, rgba(91,141,255,0.05) 0%, transparent 60%);
          pointer-events: none;
        }
        .an-stat:hover { border-color: var(--border-h); background: var(--surface-h); }

        /* ── Feature card ── */
        .an-feat {
          padding: 1.5rem;
          border-radius: 1.1rem;
          border: 1px solid var(--border);
          background: var(--surface);
          transition: border-color 0.3s, transform 0.3s, background 0.3s;
          cursor: default;
          position: relative;
          overflow: hidden;
        }
        .an-feat::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, var(--b), transparent);
          opacity: 0; transition: opacity 0.3s;
        }
        .an-feat:hover { border-color: var(--border-h); background: var(--surface-h); transform: translateY(-5px); }
        .an-feat:hover::before { opacity: 1; }

        /* ── Buttons ── */
        .an-btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 0.8rem 1.6rem;
          border-radius: 0.6rem;
          background: var(--b2); color: #f2f6ff;
          font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: 0.9rem;
          text-decoration: none;
          transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
          cursor: pointer; border: none; white-space: nowrap;
        }
        .an-btn-primary:hover { background: var(--b); transform: translateY(-2px); box-shadow: 0 12px 32px rgba(37,99,255,0.35); }

        .an-btn-outline {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 0.8rem 1.6rem;
          border-radius: 0.6rem;
          background: transparent; color: var(--text);
          font-family: 'DM Sans', sans-serif; font-weight: 400; font-size: 0.9rem;
          text-decoration: none;
          border: 1px solid rgba(238,241,248,0.15);
          transition: border-color 0.2s, background 0.2s, transform 0.2s;
          cursor: pointer; white-space: nowrap;
        }
        .an-btn-outline:hover { border-color: rgba(91,141,255,0.4); background: rgba(91,141,255,0.05); transform: translateY(-1px); }

        /* ── Detect / objective row ── */
        .an-detect-row {
          display: flex; align-items: center; gap: 1rem;
          padding: 1rem 1.25rem;
          border-radius: 0.75rem;
          border: 1px solid var(--border); background: var(--surface);
          transition: border-color 0.2s, background 0.2s, transform 0.2s;
          cursor: default;
        }
        .an-detect-row:hover { border-color: var(--border-h); background: var(--surface-h); transform: translateX(6px); }

        /* ── Tech card ── */
        .an-tech-card {
          padding: 1.75rem; border-radius: 1.1rem;
          border: 1px solid var(--border); background: var(--surface);
          transition: border-color 0.25s;
        }
        .an-tech-card:hover { border-color: var(--border-h); }

        /* ── Audience pill ── */
        .an-aud {
          display: flex; align-items: center; gap: 10px;
          padding: 0.85rem 1.25rem; border-radius: 0.75rem;
          border: 1px solid var(--border); background: var(--surface);
          font-family: 'DM Sans', sans-serif; font-size: 0.9rem; font-weight: 500;
          color: var(--text); transition: border-color 0.2s, background 0.2s; cursor: default;
        }
        .an-aud:hover { border-color: var(--border-h); background: var(--surface-h); }

        /* ── Marquee ── */
        .an-marquee { overflow: hidden; width: 100%; }
        .an-marquee-inner { display: flex; gap: 1.5rem; width: max-content; align-items: center; }

        /* ── Hero glow ── */
        .an-glow {
          position: absolute; width: 700px; height: 700px; border-radius: 50%;
          background: radial-gradient(ellipse, rgba(37,99,255,0.07) 0%, transparent 70%);
          filter: blur(80px); pointer-events: none;
        }

        /* ── Noise grain ── */
        .an-grain {
          position: fixed; inset: 0; pointer-events: none; opacity: 0.018; z-index: 1000;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-repeat: repeat; background-size: 180px;
        }

        /* ── Grid bg ── */
        .an-grid-bg {
          position: absolute; inset: 0; pointer-events: none; z-index: 0;
          background-image:
            linear-gradient(rgba(91,141,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(91,141,255,0.03) 1px, transparent 1px);
          background-size: 56px 56px;
          mask-image: radial-gradient(ellipse 90% 90% at 50% 0%, black 20%, transparent 100%);
        }

        /* ── Why box ── */
        .an-why {
          border-radius: 1.25rem; border: 1px solid var(--border);
          background: linear-gradient(135deg, rgba(37,99,255,0.06) 0%, rgba(91,141,255,0.02) 100%);
          padding: 2rem; position: relative; overflow: hidden;
        }
        .an-why::after {
          content: ''; position: absolute; bottom: -40px; right: -40px;
          width: 200px; height: 200px; border-radius: 50%;
          background: radial-gradient(circle, rgba(91,141,255,0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        /* ── CTA box ── */
        .an-cta {
          border-radius: 1.5rem; border: 1px solid var(--border);
          background: linear-gradient(135deg, rgba(37,99,255,0.06) 0%, transparent 60%);
          padding: 3rem 1.5rem; text-align: center;
          max-width: 700px; margin: 0 auto; position: relative; overflow: hidden;
        }
        .an-cta::before {
          content: ''; position: absolute; top: -80px; left: 50%; transform: translateX(-50%);
          width: 300px; height: 200px; border-radius: 50%;
          background: radial-gradient(ellipse, rgba(37,99,255,0.12) 0%, transparent 70%);
          pointer-events: none;
        }

        /* ── Back link ── */
        .an-back {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: 'JetBrains Mono', monospace; font-size: 0.6rem;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--b); text-decoration: none; transition: gap 0.2s, color 0.2s;
        }
        .an-back:hover { gap: 10px; color: var(--b3); }

        /* ── Scrollbar ── */
        .an-wrap ::-webkit-scrollbar { width: 3px; }
        .an-wrap ::-webkit-scrollbar-track { background: transparent; }
        .an-wrap ::-webkit-scrollbar-thumb { background: rgba(91,141,255,0.25); border-radius: 99px; }

        /* ══════════ LAYOUT GRID ══════════ */
        .an-two-col {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: center;
        }
        .an-two-col.shots-first .an-shots-side { order: -1; }
        .an-two-col.text-first  .an-text-side  { order: -1; }

        @media (min-width: 1024px) {
          .an-two-col {
            grid-template-columns: 1fr 1fr;
            gap: 5rem;
          }
          .an-two-col.shots-first .an-shots-side,
          .an-two-col.text-first  .an-text-side  { order: 0; }
        }

        /* ── Section padding responsive ── */
        .an-section { padding: 3.5rem 5vw; }
        @media (min-width: 640px)  { .an-section { padding: 4.5rem 5vw; } }
        @media (min-width: 1024px) { .an-section { padding: 5.5rem 5vw; } }

        /* ── Shot gallery wrapper ── */
        .an-shots-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(0.8rem, 2.5vw, 1.5rem);
          flex-wrap: wrap;
        }
        .an-shot { width: clamp(150px, 34vw, 240px); }

        /* ── Interface gallery ── */
        .an-gallery-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(0.75rem, 2vw, 1.5rem);
          flex-wrap: wrap;
          padding: 1rem 0;
        }
        .an-gallery-item { display: flex; flex-direction: column; align-items: center; gap: 0.85rem; }

        /* ── Hero layout ── */
        .an-hero-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
          align-items: center;
          position: relative;
          z-index: 2;
        }
        @media (min-width: 1024px) {
          .an-hero-grid { grid-template-columns: 1fr 1fr; gap: 4rem; }
        }
        .an-hero-mockup-wrap {
          display: flex;
          justify-content: center;
          align-items: center;
          order: -1;
        }
        @media (min-width: 1024px) { .an-hero-mockup-wrap { order: 0; } }

        /* ── Stats grid ── */
        .an-stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }
        @media (min-width: 640px) { .an-stats-grid { grid-template-columns: repeat(4, 1fr); } }

        /* ── Feature cards grid ── */
        .an-feat-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }
        @media (min-width: 640px)  { .an-feat-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) { .an-feat-grid { grid-template-columns: repeat(3, 1fr); } }

        /* ── Tech stack grid ── */
        .an-tech-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }
        @media (min-width: 640px) {
          .an-tech-grid { grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); }
        }

        /* ── Audience grid ── */
        .an-aud-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.75rem;
        }

        /* ── Button rows ── */
        .an-cta-btns, .an-hero-ctas {
          display: flex;
          flex-wrap: wrap;
          gap: 0.85rem;
          align-items: center;
        }
        .an-cta-btns { justify-content: center; }

        /* ── Slogan strip ── */
        .an-slogan {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem 1.5rem;
          margin-top: 2rem;
        }

        @media (min-width: 640px) {
          .an-cta { padding: 4rem 2.5rem; }
          .an-why { padding: 2.5rem; }
        }
      `}</style>

      <div className="an-grain" aria-hidden="true" />

      <div ref={pageRef} className="an-wrap">

        {/* ══════════ BACK NAV ══════════ */}
        <div style={{ padding: '1.5rem 5vw 0', position: 'relative', zIndex: 20 }}>
          <Link to="/" className="an-back">
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
          <div className="an-grid-bg" />
          <div className="an-glow" style={{ top: '-20%', left: '55%' }} />
          <div className="an-glow" style={{ top: '40%', left: '-10%', opacity: 0.5 }} />

          <div className="an-hero-grid">

            {/* Text block */}
            <div>
              <div className="an-h-anim" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <img src={Images.antinode.icon} alt="Antinode Icon" style={{ width: 60, height: 60, borderRadius: '1.2rem', flexShrink: 0,
                  border: '1px solid rgba(91,141,255,0.25)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 20px rgba(37,99,255,0.1)',
                }} />
                <div>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace", fontSize: '0.55rem',
                    letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--b)', marginBottom: 5,
                  }}>Notes &amp; Document Manager</div>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.4rem', fontWeight: 800, color: 'var(--text)', lineHeight: 1 }}>
                    Antinode
                  </div>
                </div>
              </div>

              <h1 className="an-h-anim an-display" style={{ fontSize: 'clamp(2.3rem, 6.5vw, 5.4rem)', margin: 0 }}>
                Your notes &amp; docs,{' '}
                <span style={{ color: 'var(--b)' }}>in one place.</span>
              </h1>

              <p className="an-h-anim an-body" style={{ marginTop: '1.5rem', maxWidth: '36rem', fontSize: 'clamp(0.9rem, 2vw, 1.05rem)', lineHeight: 1.75 }}>
                Antinode is a modern, high-performance mobile app that centralizes your digital workspace. Secure, intuitive, and beautifully crafted — manage every document and note without ever leaving the app.
              </p>

              <div className="an-h-anim" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1.75rem' }}>
                {['React Native', 'Expo', 'AWS EC2', 'Node.js', 'JWT'].map(t => (
                  <span key={t} className="an-tag">{t}</span>
                ))}
              </div>

              <div className="an-h-anim an-hero-ctas" style={{ marginTop: '2rem' }}>
                <a href={DOWNLOAD} target="_blank" rel="noopener noreferrer" className="an-btn-primary">
                  <Download style={{ width: 16, height: 16 }} /> Download App
                </a>
                <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="an-btn-outline">
                  <Code2 style={{ width: 15, height: 15 }} /> View on GitHub
                </a>
                <a href="#features" className="an-btn-outline">
                  Discover Features <ChevronRight style={{ width: 14, height: 14 }} />
                </a>
              </div>

              <div className="an-h-anim an-slogan">
                {['Organize.', 'Access.', 'Own.'].map(w => (
                  <span key={w} style={{
                    fontFamily: "'Syne', sans-serif", fontWeight: 700,
                    fontSize: '1.05rem', color: 'var(--b)', opacity: 0.85,
                  }}>{w}</span>
                ))}
              </div>
            </div>

            {/* Hero mockup — the app installed on a device */}
            <div className="an-hero-mockup-wrap">
              <img
                ref={mockupRef}
                src={Images.antinode.mockup}
                alt="Antinode installed on a phone"
                style={{
                  width: 'clamp(300px, 60vw, 640px)',
                  display: 'block',
                  userSelect: 'none',
                  willChange: 'transform',
                }}
                draggable={false}
              />
            </div>
          </div>
        </section>

        <div className="an-div" />

        {/* ══════════ STATS ══════════ */}
        <section className="an-section">
          <div className="an-stagger an-stats-grid">
            {STATS.map(({ value, label, src }) => (
              <div key={label} className="an-stat">
                <div
                  className="an-stat-val"
                  data-val={value}
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: 'clamp(1.8rem, 5vw, 2.6rem)', fontWeight: 800,
                    color: 'var(--b)', lineHeight: 1, marginBottom: '0.55rem',
                  }}
                >
                  {value}
                </div>
                <div className="an-body" style={{ fontSize: '0.82rem', marginBottom: '0.4rem' }}>{label}</div>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.52rem', letterSpacing: '0.1em',
                  color: 'var(--text-muted)', textTransform: 'uppercase',
                }}>{src}</div>
              </div>
            ))}
          </div>
        </section>

        <div className="an-div" />

        {/* ══════════ THE PROBLEM ══════════ */}
        <section className="an-section">
          <div className="an-two-col shots-first">

            {/* Shots */}
            <div className="an-shots-side an-reveal">
              <div className="an-shots-row">
                <Shot src={Images.antinode.home} alt="Antinode dashboard"
                  style={{ transform: 'rotate(-4deg)' }}
                  onMouseEnter={e => handleShotHover(e, true)}
                  onMouseLeave={e => handleShotHover(e, false)}
                />
                <Shot src={Images.antinode.folders} alt="Antinode file manager"
                  style={{ transform: 'rotate(5deg)' }}
                  onMouseEnter={e => handleShotHover(e, true)}
                  onMouseLeave={e => handleShotHover(e, false)}
                />
              </div>
            </div>

            {/* Text */}
            <div className="an-text-side an-reveal">
              <div className="an-label">The Problem</div>
              <h2 className="an-h2" style={{ marginTop: '0.75rem' }}>
                The fragmentation of<br />
                <span className="accent">digital workspaces.</span>
              </h2>
              <div style={{ height: 1, background: 'var(--border)', margin: '1.5rem 0' }} />
              <p className="an-body">
                Our files, notes, and documents are scattered across a dozen apps and cloud services. We constantly jump between them just to view a PDF, jot a quick thought, or organize a folder.
              </p>
              <p className="an-body" style={{ marginTop: '1rem' }}>
                That fragmentation breaks focus, drains productivity, and turns managing your own data into a chore.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginTop: '2rem' }}>
                {['Scattered files', 'Constant app-switching', 'Lost focus'].map(t => (
                  <span key={t} className="an-tag">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="an-div" />

        {/* ══════════ THE OBJECTIVE ══════════ */}
        <section className="an-section" style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(37,99,255,0.03) 50%, transparent 100%)',
        }}>
          <div className="an-reveal" style={{ maxWidth: 560, marginBottom: '3rem' }}>
            <div className="an-label">The Objective</div>
            <h2 className="an-h2">A unified, <span className="accent">seamless experience.</span></h2>
            <div style={{ height: 1, background: 'var(--border)', margin: '1.5rem 0' }} />
            <p className="an-body">
              Antinode's goal is a single hub where you effortlessly manage all your documents and notes — while guaranteeing privacy and total ownership of your data through a custom cloud architecture, not a third-party ecosystem.
            </p>
          </div>

          <div className="an-two-col text-first">

            <div className="an-text-side an-reveal" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {OBJECTIVES.map(({ icon: Icon, label }) => (
                <div key={label} className="an-detect-row">
                  <span style={{
                    width: 36, height: 36, borderRadius: '0.5rem', flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(91,141,255,0.1)', border: '1px solid var(--border)',
                  }}>
                    <Icon style={{ width: 15, height: 15, color: 'var(--b)' }} />
                  </span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.95rem', fontWeight: 500 }}>
                    {label}
                  </span>
                  <ArrowRight style={{ width: 14, height: 14, color: 'var(--b)', marginLeft: 'auto', opacity: 0.5 }} />
                </div>
              ))}
            </div>

            <div className="an-shots-side an-reveal">
              <div className="an-shots-row">
                <Shot src={Images.antinode.profile} alt="Antinode profile & settings"
                  style={{ width: 'clamp(200px, 52vw, 300px)' }}
                  onMouseEnter={e => handleShotHover(e, true)}
                  onMouseLeave={e => handleShotHover(e, false)}
                />
              </div>
            </div>
          </div>
        </section>

        <div className="an-div" />

        {/* ══════════ THE SOLUTION ══════════ */}
        <section className="an-section">
          <div className="an-two-col shots-first">

            <div className="an-shots-side an-reveal">
              <div className="an-shots-row">
                <Shot src={Images.antinode.folders} alt="Antinode files"
                  style={{ width: 'clamp(200px, 52vw, 300px)' }}
                  onMouseEnter={e => handleShotHover(e, true)}
                  onMouseLeave={e => handleShotHover(e, false)}
                />
              </div>
            </div>

            <div className="an-text-side an-reveal">
              <div className="an-label">The Solution</div>
              <h2 className="an-h2">
                Centralized, secure,<br />
                <span className="accent">and aesthetic.</span>
              </h2>
              <div style={{ height: 1, background: 'var(--border)', margin: '1.5rem 0' }} />
              <p className="an-body">
                Antinode delivers a clean, distraction-free environment for personal, academic, and professional use. Smart file management plus a live AWS-powered backend keep your most important files organized, instantly accessible, and securely backed up.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1.75rem' }}>
                {SOLUTION.map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <CheckCircle2 style={{ width: 15, height: 15, color: 'var(--b)', flexShrink: 0 }} />
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="an-div" />

        {/* ══════════ FEATURES ══════════ */}
        <section id="features" className="an-section">
          <div className="an-reveal" style={{ textAlign: 'center', maxWidth: 520, margin: '0 auto 3rem' }}>
            <div className="an-label" style={{ justifyContent: 'center' }}>Key Features</div>
            <h2 className="an-h2">
              Engineered for<br />
              <span className="accent">productivity.</span>
            </h2>
          </div>

          <div className="an-feat-grid">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="an-feat">
                <div style={{
                  width: 44, height: 44, borderRadius: '0.75rem', marginBottom: '1.25rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(91,141,255,0.08)', border: '1px solid rgba(91,141,255,0.16)',
                }}>
                  <Icon style={{ width: 19, height: 19, color: 'var(--b)' }} />
                </div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '1.02rem', color: 'var(--text)', marginBottom: '0.55rem' }}>
                  {title}
                </div>
                <div className="an-body" style={{ fontSize: '0.86rem' }}>{desc}</div>
              </div>
            ))}
          </div>
        </section>

        <div className="an-div" />

        {/* ══════════ MARQUEE ══════════ */}
        <section style={{ padding: '2.5rem 0', overflow: 'hidden' }}>
          <div className="an-marquee">
            <div className="an-marquee-inner">
              {MARQUEE_ITEMS.map((item, i) => (
                <span key={i} style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: i % 2 === 0 ? 'var(--b)' : 'var(--text-muted)',
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

        <div className="an-div" />

        {/* ══════════ TECH STACK ══════════ */}
        <section className="an-section" style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(37,99,255,0.03) 50%, transparent 100%)',
        }}>
          <div className="an-reveal" style={{ marginBottom: '2.5rem' }}>
            <div className="an-label">Technology</div>
            <h2 className="an-h2">Built with <span className="accent">modern tech.</span></h2>
            <p className="an-body" style={{ marginTop: '1rem', maxWidth: 560 }}>
              Antinode is engineered for scale and performance, using an industry-standard stack across both the mobile client and the cloud server.
            </p>
          </div>

          <div className="an-stagger an-tech-grid">
            {TECH.map(({ title, color, items }) => (
              <div key={title} className="an-tech-card">
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

        <div className="an-div" />

        {/* ══════════ AUDIENCE + WHY ══════════ */}
        <section className="an-section">
          <div className="an-two-col">

            <div className="an-reveal">
              <div className="an-label">Perfect For</div>
              <h2 className="an-h2">
                One workspace,<br />
                <span className="accent">every workflow.</span>
              </h2>
              <div style={{ height: 1, background: 'var(--border)', margin: '1.5rem 0' }} />
              <p className="an-body" style={{ marginBottom: '2rem' }}>
                Whether you're studying, shipping projects, or just keeping life organized, Antinode gives you a single, secure home for everything you write and store.
              </p>
              <div className="an-aud-grid">
                {AUDIENCES.map(({ icon: Icon, label }) => (
                  <div key={label} className="an-aud">
                    <Icon style={{ width: 15, height: 15, color: 'var(--b)' }} />
                    {label}
                  </div>
                ))}
              </div>
            </div>

            <div className="an-reveal an-why">
              <div style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: '0.56rem',
                letterSpacing: '0.18em', textTransform: 'uppercase',
                color: 'var(--b)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <span style={{ width: 14, height: 1, background: 'var(--b)', display: 'inline-block' }} />
                Why Antinode?
              </div>
              <h3 style={{
                fontFamily: "'Syne', sans-serif", fontWeight: 700,
                fontSize: 'clamp(1.3rem, 3vw, 2rem)', lineHeight: 1.1,
                color: 'var(--text)', marginBottom: '1.25rem',
              }}>
                Your data deserves a real home.
              </h3>
              <p className="an-body">
                Antinode blends secure JWT auth, a live AWS cloud backend, and premium UX into one platform — built so managing documents feels effortless instead of exhausting.
              </p>
              <p className="an-body" style={{ marginTop: '0.75rem', color: 'var(--b)', fontStyle: 'italic' }}>
                Not just storage — a distraction-free workspace you actually own.
              </p>
              <div className="an-slogan">
                {['Organize.', 'Access.', 'Own.'].map(t => (
                  <span key={t} style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '1.1rem', color: 'var(--b)' }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="an-div" />

        {/* ══════════ SCREEN GALLERY ══════════ */}
        <section className="an-section" style={{ textAlign: 'center' }}>
          <div className="an-reveal" style={{ marginBottom: '3rem' }}>
            <div className="an-label" style={{ justifyContent: 'center' }}>Interface Gallery</div>
            <h2 className="an-h2">
              Beautiful screens,<br />
              <span className="accent">every detail considered.</span>
            </h2>
          </div>

          <div className="an-reveal" style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '320px', height: '320px',
              background: 'radial-gradient(ellipse, rgba(37,99,255,0.1) 0%, transparent 70%)',
              filter: 'blur(50px)', pointerEvents: 'none', zIndex: 0,
            }} />

            <div className="an-gallery-row">
              {[
                { src: Images.antinode.home,    alt: 'Home Dashboard', label: 'Dashboard', rot: -5 },
                { src: Images.antinode.folders, alt: 'File Manager',   label: 'Folders',     rot: 3  },
                { src: Images.antinode.profile, alt: 'Profile',        label: 'Profile',   rot: -2 },
              ].map(({ src, alt, label, rot }) => (
                <div
                  key={alt}
                  className="an-gallery-item"
                  style={{ position: 'relative', zIndex: 1 }}
                >
                  <Shot
                    src={src} alt={alt}
                    style={{ width: 'clamp(160px, 42vw, 250px)', transform: `rotate(${rot}deg)` }}
                    onMouseEnter={e => handleShotHover(e, true)}
                    onMouseLeave={e => handleShotHover(e, false)}
                  />
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace", fontSize: '0.52rem',
                    letterSpacing: '0.14em', textTransform: 'uppercase',
                    color: 'rgba(91,141,255,0.7)', whiteSpace: 'nowrap',
                  }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="an-div" />

        {/* ══════════ CTA ══════════ */}
        <section className="an-section" style={{ paddingBottom: 'clamp(4rem,8vw,7rem)' }}>
          <div className="an-reveal an-cta">
            <div className="an-label" style={{ justifyContent: 'center' }}>Ready?</div>
            <h2 className="an-h2" style={{ marginTop: '0.75rem', marginBottom: '1rem' }}>
              Organize your <span className="accent">digital life.</span>
            </h2>
            <p className="an-body" style={{ maxWidth: 440, margin: '0 auto 2.5rem', fontSize: '1rem' }}>
              Secure authentication, a live cloud backend, and a beautiful minimalist design — all in one app.
            </p>
            <div className="an-cta-btns">
              <a href={DOWNLOAD} target="_blank" rel="noopener noreferrer" className="an-btn-primary">
                <Download style={{ width: 16, height: 16 }} /> Get Antinode
              </a>
              <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="an-btn-outline">
                <Code2 style={{ width: 15, height: 15 }} /> Check the Code
              </a>
              <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="an-btn-outline">
                <ExternalLink style={{ width: 14, height: 14 }} /> Learn More
              </a>
            </div>

            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem',
              color: 'var(--text-muted)', marginTop: '2rem',
            }}>
              Built with ❤ by Rumman Ahmed.
            </p>

            <div style={{
              position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
              width: '40%', height: 1,
              background: 'linear-gradient(90deg, transparent, var(--b), transparent)',
              borderRadius: 99,
            }} />
          </div>
        </section>

      </div>
    </>
  );
};

export default Antinode;
