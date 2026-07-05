import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ChevronLeft, Download, ArrowUpRight, ArrowRight, Code2, CheckCircle2,
  ShieldCheck, FolderTree, Cloud, Sparkles, Smartphone,
  Layers, Lock, Server, Zap, Target,
  GraduationCap, Briefcase, FlaskConical, User,
} from 'lucide-react';

import { Images } from '../../data/images';

gsap.registerPlugin(ScrollTrigger);

// ─── Links ────────────────────────────────────────────────────────────────────
const GITHUB   = 'https://github.com/rumman2004/Antinode';
const DOWNLOAD = 'https://drive.google.com/file/d/1fGlz5E20LyGignmI8o9-SlgbVHE3i5ZR/view?usp=sharing';

// ─── Data ─────────────────────────────────────────────────────────────────────
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
  { title: 'Frontend', items: ['React Native','Expo','TypeScript','React Navigation','GSAP','RN Animated'] },
  { title: 'Backend',  items: ['Node.js','Express','AWS EC2','Nginx','JWT'] },
];

const AUDIENCES = [
  { icon: GraduationCap, label: 'Students' },
  { icon: Briefcase,     label: 'Professionals' },
  { icon: FlaskConical,  label: 'Researchers' },
  { icon: User,          label: 'Personal Use' },
];

const MARQUEE_ITEMS = [
  'React Native','Expo','TypeScript','Node.js','Express','AWS EC2',
  'Nginx','JWT','React Navigation','GSAP','RN Animated','REST API',
];

// ─── Screenshot ────────────────────────────────────────────────────────────────
// Antinode screenshots are pre-rendered tilted device mockups (frame + shadow
// baked in), so we render the bare image and let a soft drop-shadow lift it off
// the paper.
interface ShotProps { src?: string; alt?: string; className?: string; style?: React.CSSProperties; onMouseEnter?: React.MouseEventHandler<HTMLImageElement>; onMouseLeave?: React.MouseEventHandler<HTMLImageElement>; }
const Shot = ({ src, alt, className = '', style = {}, onMouseEnter, onMouseLeave }: ShotProps) => (
  <img
    src={src}
    alt={alt}
    className={`an-shot ${className}`}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    draggable={false}
    style={{
      display: 'block',
      flexShrink: 0,
      filter: 'drop-shadow(0 30px 45px rgba(24,20,10,0.22))',
      ...style,
    }}
  />
);

// ─── Main Component ─────────────────────────────────────────────────────────────
const Antinode = () => {
  const pageRef   = useRef(null);
  const heroRef   = useRef(null);
  const mockupRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── hero line-by-line reveal ──
      gsap.fromTo('.an-h-anim',
        { yPercent: 120, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.1, stagger: 0.09, ease: 'expo.out', delay: 0.15 }
      );

      // ── hero mockup entrance + perpetual float ──
      gsap.fromTo(mockupRef.current,
        { y: 90, opacity: 0, rotation: 6 },
        { y: 0, opacity: 1, rotation: 0, duration: 1.5, ease: 'expo.out', delay: 0.4 }
      );
      gsap.to(mockupRef.current, { y: '-=18', duration: 3.8, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 2 });

      // ── rotating hero seal ──
      gsap.to('.an-seal', { rotation: 360, duration: 26, repeat: -1, ease: 'none' });

      // ── screenshots — fan-in + drift ──
      gsap.utils.toArray('.an-shot').forEach((el: any, i) => {
        const rot = (i % 3 - 1) * 3;
        gsap.fromTo(el,
          { y: 70, opacity: 0, rotation: rot * 2.5 },
          {
            y: 0, opacity: 1, rotation: rot, duration: 0.95, ease: 'back.out(1.3)',
            scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' },
          }
        );
        gsap.to(el, { y: `+=${6 + i * 2}`, duration: 2.8 + i * 0.4, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: i * 0.3 });
      });

      // ── section reveals ──
      gsap.utils.toArray('.an-reveal').forEach((el: any) => {
        gsap.fromTo(el,
          { y: 48, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.85, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 87%', toggleActions: 'play none none none' },
          }
        );
      });

      // ── staggered children ──
      gsap.utils.toArray('.an-stagger').forEach((container: any) => {
        if (container.children.length) {
          gsap.fromTo(container.children,
            { y: 34, opacity: 0 },
            {
              y: 0, opacity: 1, duration: 0.7, stagger: 0.09, ease: 'power3.out',
              scrollTrigger: { trigger: container, start: 'top 85%', toggleActions: 'play none none none' },
            }
          );
        }
      });

      // ── stat count-up ──
      gsap.utils.toArray('.an-stat-val').forEach((el: any) => {
        ScrollTrigger.create({
          trigger: el, start: 'top 90%', once: true,
          onEnter: () => {
            const raw = el.dataset.val || '';
            const m = raw.match(/^[\d.]+/);
            if (m) {
              const end = parseFloat(m[0]);
              const suffix = raw.slice(m[0].length);
              gsap.fromTo({ v: 0 }, { v: 0 }, {
                v: end, duration: 2, ease: 'power2.out',
                onUpdate: function () {
                  const v = this.targets()[0].v;
                  el.textContent = (Number.isInteger(end) ? Math.round(v) : v.toFixed(1)) + suffix;
                },
              });
            }
          },
        });
      });

      // ── marquee ──
      const strip = document.querySelector('.an-marquee-inner');
      if (strip) gsap.to(strip, { x: '-50%', duration: 30, ease: 'none', repeat: -1 });

    }, pageRef);

    return () => ctx.revert();
  }, []);

  const hover = (e: React.MouseEvent, enter: boolean) => {
    gsap.to(e.currentTarget, { scale: enter ? 1.045 : 1, duration: enter ? 0.3 : 0.4, ease: 'power2.out' });
  };

  // small helper for the editorial chapter kicker
  const Kicker = ({ num, children }: { num: string; children: React.ReactNode }) => (
    <div className="an-kicker">
      <span className="an-kicker-num">{num}</span>
      <span className="an-kicker-line" />
      <span>{children}</span>
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400&family=DM+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

        :root {
          --paper:  #f4f0e7;
          --paper2: #eee8db;
          --card:   #faf7f0;
          --ink:    #17140d;
          --ink2:   rgba(23,20,13,0.60);
          --ink3:   rgba(23,20,13,0.38);
          --line:   rgba(23,20,13,0.14);
          --line2:  rgba(23,20,13,0.09);
          --accent: #2f2ce0;
          --accent2: #1a17b8;
          --accent-soft: rgba(47,44,224,0.08);
        }

        .an-wrap {
          background: var(--paper);
          color: var(--ink);
          font-family: 'DM Sans', sans-serif;
          font-weight: 400;
          min-height: 100vh;
          padding-top: 5rem;
          overflow-x: hidden;
          position: relative;
        }
        .an-wrap *, .an-wrap *::before, .an-wrap *::after { box-sizing: border-box; }

        /* paper grain */
        .an-grain {
          position: fixed; inset: 0; pointer-events: none; z-index: 900; opacity: 0.05;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 160px;
        }

        /* ── Type ── */
        .an-display {
          font-family: 'Fraunces', serif;
          font-weight: 500;
          line-height: 0.98;
          letter-spacing: -0.02em;
          color: var(--ink);
        }
        .an-serif-i { font-family: 'Fraunces', serif; font-style: italic; font-weight: 400; color: var(--accent); }
        .an-h2 {
          font-family: 'Fraunces', serif; font-weight: 500;
          font-size: clamp(2rem, 5vw, 3.4rem);
          line-height: 1.02; letter-spacing: -0.02em; color: var(--ink);
        }
        .an-h2 .accent { font-style: italic; font-weight: 400; color: var(--accent); }
        .an-body {
          font-family: 'DM Sans', sans-serif; font-weight: 400;
          line-height: 1.75; color: var(--ink2); font-size: 1rem;
        }

        /* ── Chapter kicker ── */
        .an-kicker {
          display: inline-flex; align-items: center; gap: 12px;
          font-family: 'JetBrains Mono', monospace; font-size: 0.62rem;
          letter-spacing: 0.22em; text-transform: uppercase; color: var(--ink2);
        }
        .an-kicker-num { color: var(--accent); font-weight: 500; }
        .an-kicker-line { width: 32px; height: 1px; background: var(--ink3); }

        /* ── Tag ── */
        .an-tag {
          display: inline-flex; align-items: center;
          padding: 0.32rem 0.8rem; border-radius: 100px;
          font-family: 'JetBrains Mono', monospace; font-size: 0.6rem;
          letter-spacing: 0.08em; text-transform: uppercase;
          background: transparent; border: 1px solid var(--line);
          color: var(--ink2); white-space: nowrap; transition: 0.2s;
        }
        .an-tag:hover { border-color: var(--accent); color: var(--accent); }

        /* ── Buttons ── */
        .an-btn-primary {
          display: inline-flex; align-items: center; gap: 9px;
          padding: 0.85rem 1.7rem; border-radius: 100px;
          background: var(--ink); color: var(--paper);
          font-family: 'DM Sans', sans-serif; font-weight: 500; font-size: 0.92rem;
          text-decoration: none; border: 1px solid var(--ink);
          transition: transform 0.2s, background 0.2s, box-shadow 0.2s;
          cursor: pointer; white-space: nowrap;
        }
        .an-btn-primary:hover { background: var(--accent); border-color: var(--accent); transform: translateY(-2px); box-shadow: 0 14px 30px rgba(47,44,224,0.28); }

        .an-btn-outline {
          display: inline-flex; align-items: center; gap: 9px;
          padding: 0.85rem 1.7rem; border-radius: 100px;
          background: transparent; color: var(--ink);
          font-family: 'DM Sans', sans-serif; font-weight: 500; font-size: 0.92rem;
          text-decoration: none; border: 1px solid var(--ink);
          transition: 0.2s; cursor: pointer; white-space: nowrap;
        }
        .an-btn-outline:hover { background: var(--ink); color: var(--paper); transform: translateY(-2px); }

        /* ── Cards ── */
        .an-card {
          padding: 1.75rem; border-radius: 1.25rem;
          border: 1px solid var(--line); background: var(--card);
          transition: transform 0.3s, border-color 0.3s, box-shadow 0.3s;
          position: relative; overflow: hidden;
        }
        .an-card:hover { transform: translateY(-5px); border-color: var(--accent); box-shadow: 0 20px 40px rgba(24,20,10,0.08); }

        .an-row {
          display: flex; align-items: center; gap: 1rem;
          padding: 1rem 1.25rem; border-radius: 100px;
          border: 1px solid var(--line); background: var(--card);
          transition: 0.25s; cursor: default;
        }
        .an-row:hover { border-color: var(--accent); transform: translateX(6px); }

        .an-aud {
          display: flex; align-items: center; gap: 10px;
          padding: 0.9rem 1.25rem; border-radius: 0.9rem;
          border: 1px solid var(--line); background: var(--card);
          font-size: 0.92rem; font-weight: 500; color: var(--ink);
          transition: 0.2s; cursor: default;
        }
        .an-aud:hover { border-color: var(--accent); background: var(--accent-soft); }

        /* ── Divider ── */
        .an-div { height: 1px; background: var(--line); margin: 0 5vw; }

        /* ── Rotating seal ── */
        .an-seal {
          position: absolute; width: 118px; height: 118px;
          font-family: 'JetBrains Mono', monospace;
        }
        .an-seal text { font-size: 9.5px; letter-spacing: 3px; fill: var(--ink2); text-transform: uppercase; }

        /* ── Marquee ── */
        .an-marquee { overflow: hidden; width: 100%; }
        .an-marquee-inner { display: flex; gap: 0; width: max-content; align-items: center; }
        .an-marquee-item {
          font-family: 'Fraunces', serif; font-weight: 500;
          font-size: clamp(1.4rem, 3.4vw, 2.6rem); color: var(--ink);
          padding: 0 1.5rem; white-space: nowrap; display: flex; align-items: center; gap: 3rem;
        }
        .an-marquee-item::after { content: '✦'; color: var(--accent); font-size: 0.6em; }

        /* ── Back link ── */
        .an-back {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: 'JetBrains Mono', monospace; font-size: 0.62rem;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--ink2); text-decoration: none; transition: 0.2s;
        }
        .an-back:hover { gap: 10px; color: var(--accent); }

        /* ── Layout ── */
        .an-section { padding: 4rem 5vw; }
        @media (min-width: 1024px) { .an-section { padding: 6rem 5vw; } }

        .an-two-col { display: grid; grid-template-columns: 1fr; gap: 3rem; align-items: center; }
        @media (min-width: 1024px) {
          .an-two-col { grid-template-columns: 1fr 1fr; gap: 5rem; }
          .an-two-col.shots-first .an-shots-side { order: -1; }
          .an-two-col.text-first  .an-text-side  { order: -1; }
        }

        .an-shots-row { display: flex; align-items: center; justify-content: center; gap: clamp(0.8rem,2.5vw,1.5rem); flex-wrap: wrap; }
        .an-shot { width: clamp(150px, 34vw, 240px); }

        .an-hero-grid { display: grid; grid-template-columns: 1fr; gap: 2.5rem; align-items: center; position: relative; z-index: 2; }
        @media (min-width: 1024px) { .an-hero-grid { grid-template-columns: 1.05fr 0.95fr; gap: 3rem; } }
        .an-hero-mockup-wrap { display: flex; justify-content: center; align-items: center; order: -1; position: relative; }
        @media (min-width: 1024px) { .an-hero-mockup-wrap { order: 0; } }

        .an-stats-grid { display: grid; grid-template-columns: repeat(2,1fr); }
        @media (min-width: 768px) { .an-stats-grid { grid-template-columns: repeat(4,1fr); } }

        .an-feat-grid { display: grid; grid-template-columns: 1fr; gap: 1rem; }
        @media (min-width: 640px)  { .an-feat-grid { grid-template-columns: repeat(2,1fr); } }
        @media (min-width: 1024px) { .an-feat-grid { grid-template-columns: repeat(3,1fr); } }

        .an-tech-grid { display: grid; grid-template-columns: 1fr; gap: 1rem; }
        @media (min-width: 640px) { .an-tech-grid { grid-template-columns: repeat(auto-fit, minmax(240px,1fr)); } }

        .an-aud-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 0.75rem; }

        .an-gallery-row { display: flex; align-items: flex-end; justify-content: center; gap: clamp(0.75rem,2vw,1.75rem); flex-wrap: wrap; padding: 1rem 0; }
        .an-gallery-item { display: flex; flex-direction: column; align-items: center; gap: 0.9rem; }

        .an-cta-btns, .an-hero-ctas { display: flex; flex-wrap: wrap; gap: 0.85rem; align-items: center; }

        /* ── CTA ── */
        .an-cta {
          border-radius: 1.75rem; border: 1px solid var(--ink);
          background: var(--ink); color: var(--paper);
          padding: 3.5rem 1.5rem; text-align: center; position: relative; overflow: hidden;
        }
        .an-cta .an-h2, .an-cta .an-display { color: var(--paper); }
        .an-cta .an-h2 .accent { color: #a7a3ff; }
        @media (min-width: 640px) { .an-cta { padding: 4.5rem 3rem; } }
      `}</style>

      <div className="an-grain" aria-hidden="true" />

      <div ref={pageRef} className="an-wrap">

        {/* ══════════ BACK NAV ══════════ */}
        <div style={{ padding: '1.5rem 5vw 0', position: 'relative', zIndex: 20 }}>
          <Link to="/" className="an-back">
            <ChevronLeft style={{ width: 13, height: 13 }} /> Back to Showcase
          </Link>
        </div>

        {/* ══════════ HERO ══════════ */}
        <section ref={heroRef} style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(2rem,5vw,4.5rem) 5vw clamp(2.5rem,5vw,5rem)' }}>
          <div className="an-hero-grid">

            {/* Text */}
            <div>
              <div style={{ overflow: 'hidden' }}>
                <div className="an-h-anim" style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', marginBottom: '2rem' }}>
                  <img src={Images.antinode.icon} alt="Antinode Icon" style={{ width: 52, height: 52, borderRadius: '0.9rem', flexShrink: 0, border: '1px solid var(--line)' }} />
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink2)', lineHeight: 1.6 }}>
                    Antinode<br /><span style={{ color: 'var(--accent)' }}>Notes &amp; Document Manager</span>
                  </div>
                </div>
              </div>

              <h1 className="an-display" style={{ fontSize: 'clamp(2.6rem, 7vw, 5.6rem)', margin: 0 }}>
                <span style={{ display: 'block', overflow: 'hidden' }}><span className="an-h-anim" style={{ display: 'block' }}>Your notes</span></span>
                <span style={{ display: 'block', overflow: 'hidden' }}><span className="an-h-anim" style={{ display: 'block' }}>&amp; docs, <span className="an-serif-i">in one</span></span></span>
                <span style={{ display: 'block', overflow: 'hidden' }}><span className="an-h-anim" style={{ display: 'block' }}><span className="an-serif-i">place.</span></span></span>
              </h1>

              <div style={{ overflow: 'hidden', marginTop: '1.75rem' }}>
                <p className="an-h-anim an-body" style={{ maxWidth: '34rem', fontSize: 'clamp(0.95rem,2vw,1.08rem)' }}>
                  A modern, high-performance mobile app that centralizes your digital workspace — secure, intuitive, and beautifully crafted. Manage every document and note without ever leaving the app.
                </p>
              </div>

              <div className="an-h-anim" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1.75rem' }}>
                {['React Native', 'Expo', 'AWS EC2', 'Node.js', 'JWT'].map(t => <span key={t} className="an-tag">{t}</span>)}
              </div>

              <div className="an-h-anim an-hero-ctas" style={{ marginTop: '2rem' }}>
                <a href={DOWNLOAD} target="_blank" rel="noopener noreferrer" className="an-btn-primary">
                  <Download style={{ width: 16, height: 16 }} /> Download App
                </a>
                <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="an-btn-outline">
                  <Code2 style={{ width: 15, height: 15 }} /> View on GitHub
                </a>
              </div>
            </div>

            {/* Mockup + rotating seal */}
            <div className="an-hero-mockup-wrap">
              <img
                ref={mockupRef}
                src={Images.antinode.mockup}
                alt="Antinode installed on a phone"
                draggable={false}
                style={{ width: 'clamp(280px, 58vw, 600px)', display: 'block', userSelect: 'none', willChange: 'transform', filter: 'drop-shadow(0 40px 60px rgba(24,20,10,0.28))' }}
              />
              <svg className="an-seal" viewBox="0 0 120 120" style={{ top: '2%', right: '2%' }} aria-hidden="true">
                <defs><path id="an-circle" d="M60,60 m-42,0 a42,42 0 1,1 84,0 a42,42 0 1,1 -84,0" /></defs>
                <text><textPath href="#an-circle" startOffset="0%">ORGANIZE · ACCESS · OWN · ORGANIZE · ACCESS · OWN · </textPath></text>
              </svg>
            </div>
          </div>
        </section>

        {/* ══════════ MARQUEE ══════════ */}
        <div className="an-div" />
        <section style={{ padding: '2.25rem 0', overflow: 'hidden', borderTop: '1px solid var(--line2)', borderBottom: '1px solid var(--line2)' }}>
          <div className="an-marquee">
            <div className="an-marquee-inner">
              {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
                <span key={i} className="an-marquee-item">{item}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════ STATS ══════════ */}
        <section className="an-section" style={{ paddingTop: 'clamp(3rem,5vw,4.5rem)', paddingBottom: 'clamp(3rem,5vw,4.5rem)' }}>
          <div className="an-stagger an-stats-grid">
            {STATS.map(({ value, label, src }, i) => (
              <div key={label} style={{
                padding: '0.5rem 1.5rem', textAlign: 'left',
                borderLeft: i === 0 ? 'none' : '1px solid var(--line)',
              }}>
                <div className="an-stat-val an-display" data-val={value} style={{ fontSize: 'clamp(2.4rem,6vw,3.6rem)', color: 'var(--accent)', lineHeight: 1, marginBottom: '0.6rem' }}>
                  {value}
                </div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem', color: 'var(--ink)', fontWeight: 500, marginBottom: '0.3rem' }}>{label}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.55rem', letterSpacing: '0.1em', color: 'var(--ink3)', textTransform: 'uppercase' }}>{src}</div>
              </div>
            ))}
          </div>
        </section>

        <div className="an-div" />

        {/* ══════════ 01 — THE PROBLEM ══════════ */}
        <section className="an-section">
          <div className="an-two-col shots-first">
            <div className="an-shots-side an-reveal">
              <div className="an-shots-row">
                <Shot src={Images.antinode.home} alt="Antinode dashboard" style={{ transform: 'rotate(-4deg)' }} onMouseEnter={e => hover(e, true)} onMouseLeave={e => hover(e, false)} />
                <Shot src={Images.antinode.folders} alt="Antinode file manager" style={{ transform: 'rotate(5deg)' }} onMouseEnter={e => hover(e, true)} onMouseLeave={e => hover(e, false)} />
              </div>
            </div>
            <div className="an-text-side an-reveal">
              <Kicker num="01">The Problem</Kicker>
              <h2 className="an-h2" style={{ marginTop: '1.1rem' }}>The fragmentation of <span className="accent">digital workspaces.</span></h2>
              <p className="an-body" style={{ marginTop: '1.5rem' }}>
                Our files, notes, and documents are scattered across a dozen apps and cloud services. We constantly jump between them just to view a PDF, jot a quick thought, or organize a folder.
              </p>
              <p className="an-body" style={{ marginTop: '1rem' }}>
                That fragmentation breaks focus, drains productivity, and turns managing your own data into a chore.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginTop: '2rem' }}>
                {['Scattered files', 'Constant app-switching', 'Lost focus'].map(t => <span key={t} className="an-tag">{t}</span>)}
              </div>
            </div>
          </div>
        </section>

        <div className="an-div" />

        {/* ══════════ 02 — THE OBJECTIVE ══════════ */}
        <section className="an-section">
          <div className="an-reveal" style={{ maxWidth: 620, marginBottom: '3rem' }}>
            <Kicker num="02">The Objective</Kicker>
            <h2 className="an-h2" style={{ marginTop: '1.1rem' }}>A unified, <span className="accent">seamless experience.</span></h2>
            <p className="an-body" style={{ marginTop: '1.5rem' }}>
              Antinode's goal is a single hub where you effortlessly manage all your documents and notes — while guaranteeing privacy and total ownership of your data through a custom cloud architecture, not a third-party ecosystem.
            </p>
          </div>

          <div className="an-two-col text-first">
            <div className="an-text-side an-reveal" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {OBJECTIVES.map(({ icon: Icon, label }) => (
                <div key={label} className="an-row">
                  <span style={{ width: 36, height: 36, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--accent-soft)', border: '1px solid var(--line)' }}>
                    <Icon style={{ width: 15, height: 15, color: 'var(--accent)' }} />
                  </span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.95rem', fontWeight: 500 }}>{label}</span>
                  <ArrowRight style={{ width: 14, height: 14, color: 'var(--accent)', marginLeft: 'auto', opacity: 0.55 }} />
                </div>
              ))}
            </div>
            <div className="an-shots-side an-reveal">
              <div className="an-shots-row">
                <Shot src={Images.antinode.profile} alt="Antinode profile & settings" style={{ width: 'clamp(200px, 52vw, 300px)' }} onMouseEnter={e => hover(e, true)} onMouseLeave={e => hover(e, false)} />
              </div>
            </div>
          </div>
        </section>

        <div className="an-div" />

        {/* ══════════ 03 — THE SOLUTION ══════════ */}
        <section className="an-section">
          <div className="an-two-col shots-first">
            <div className="an-shots-side an-reveal">
              <div className="an-shots-row">
                <Shot src={Images.antinode.folders} alt="Antinode files" style={{ width: 'clamp(200px, 52vw, 300px)' }} onMouseEnter={e => hover(e, true)} onMouseLeave={e => hover(e, false)} />
              </div>
            </div>
            <div className="an-text-side an-reveal">
              <Kicker num="03">The Solution</Kicker>
              <h2 className="an-h2" style={{ marginTop: '1.1rem' }}>Centralized, secure, <span className="accent">and aesthetic.</span></h2>
              <p className="an-body" style={{ marginTop: '1.5rem' }}>
                Antinode delivers a clean, distraction-free environment for personal, academic, and professional use. Smart file management plus a live AWS-powered backend keep your most important files organized, instantly accessible, and securely backed up.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginTop: '1.75rem' }}>
                {SOLUTION.map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <CheckCircle2 style={{ width: 16, height: 16, color: 'var(--accent)', flexShrink: 0 }} />
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.94rem', color: 'var(--ink)' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="an-div" />

        {/* ══════════ 04 — FEATURES ══════════ */}
        <section id="features" className="an-section">
          <div className="an-reveal" style={{ marginBottom: '3rem' }}>
            <Kicker num="04">Key Features</Kicker>
            <h2 className="an-h2" style={{ marginTop: '1.1rem', maxWidth: 620 }}>Engineered for <span className="accent">productivity.</span></h2>
          </div>
          <div className="an-stagger an-feat-grid">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="an-card">
                <div style={{ width: 46, height: 46, borderRadius: '0.8rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--accent-soft)', border: '1px solid var(--line)' }}>
                  <Icon style={{ width: 20, height: 20, color: 'var(--accent)' }} />
                </div>
                <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 500, fontSize: '1.25rem', color: 'var(--ink)', marginBottom: '0.5rem' }}>{title}</div>
                <div className="an-body" style={{ fontSize: '0.9rem' }}>{desc}</div>
              </div>
            ))}
          </div>
        </section>

        <div className="an-div" />

        {/* ══════════ 05 — TECH STACK ══════════ */}
        <section className="an-section">
          <div className="an-reveal" style={{ marginBottom: '2.5rem', maxWidth: 620 }}>
            <Kicker num="05">Technology</Kicker>
            <h2 className="an-h2" style={{ marginTop: '1.1rem' }}>Built with <span className="accent">modern tech.</span></h2>
            <p className="an-body" style={{ marginTop: '1.25rem' }}>
              Engineered for scale and performance, using an industry-standard stack across both the mobile client and the cloud server.
            </p>
          </div>
          <div className="an-stagger an-tech-grid">
            {TECH.map(({ title, items }) => (
              <div key={title} className="an-card" style={{ transform: 'none' }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 16, height: 1, background: 'var(--accent)', display: 'inline-block' }} />{title}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {items.map(item => (
                    <span key={item} style={{ padding: '0.35rem 0.85rem', borderRadius: '100px', fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', fontWeight: 500, background: 'var(--paper2)', border: '1px solid var(--line)', color: 'var(--ink)' }}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="an-div" />

        {/* ══════════ 06 — AUDIENCE + WHY ══════════ */}
        <section className="an-section">
          <div className="an-two-col">
            <div className="an-reveal">
              <Kicker num="06">Perfect For</Kicker>
              <h2 className="an-h2" style={{ marginTop: '1.1rem' }}>One workspace, <span className="accent">every workflow.</span></h2>
              <p className="an-body" style={{ margin: '1.5rem 0 2rem' }}>
                Whether you're studying, shipping projects, or just keeping life organized, Antinode gives you a single, secure home for everything you write and store.
              </p>
              <div className="an-aud-grid">
                {AUDIENCES.map(({ icon: Icon, label }) => (
                  <div key={label} className="an-aud">
                    <Icon style={{ width: 15, height: 15, color: 'var(--accent)' }} />{label}
                  </div>
                ))}
              </div>
            </div>

            <div className="an-reveal an-card" style={{ padding: '2.5rem', background: 'var(--paper2)', transform: 'none' }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '1.25rem' }}>
                Why Antinode?
              </div>
              <h3 className="an-display" style={{ fontSize: 'clamp(1.6rem,3.5vw,2.3rem)', marginBottom: '1.25rem' }}>
                Your data deserves a real <span className="an-serif-i">home.</span>
              </h3>
              <p className="an-body">
                Antinode blends secure JWT auth, a live AWS cloud backend, and premium UX into one platform — built so managing documents feels effortless instead of exhausting.
              </p>
              <p className="an-body" style={{ marginTop: '0.85rem', color: 'var(--accent)', fontStyle: 'italic', fontFamily: "'Fraunces', serif", fontSize: '1.05rem' }}>
                Not just storage — a distraction-free workspace you actually own.
              </p>
            </div>
          </div>
        </section>

        <div className="an-div" />

        {/* ══════════ 07 — GALLERY ══════════ */}
        <section className="an-section" style={{ textAlign: 'center' }}>
          <div className="an-reveal" style={{ marginBottom: '3rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Kicker num="07">Interface Gallery</Kicker>
            <h2 className="an-h2" style={{ marginTop: '1.1rem' }}>Beautiful screens, <span className="accent">every detail considered.</span></h2>
          </div>
          <div className="an-reveal">
            <div className="an-gallery-row">
              {[
                { src: Images.antinode.home,    alt: 'Home Dashboard', label: 'Dashboard', rot: -5 },
                { src: Images.antinode.folders, alt: 'File Manager',   label: 'Files',     rot: 3  },
                { src: Images.antinode.profile, alt: 'Profile',        label: 'Profile',   rot: -2 },
              ].map(({ src, alt, label, rot }) => (
                <div key={alt} className="an-gallery-item">
                  <Shot src={src} alt={alt} style={{ width: 'clamp(160px, 42vw, 250px)', transform: `rotate(${rot}deg)` }} onMouseEnter={e => hover(e, true)} onMouseLeave={e => hover(e, false)} />
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.55rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink3)' }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════ CTA ══════════ */}
        <section className="an-section" style={{ paddingBottom: 'clamp(4rem,8vw,7rem)' }}>
          <div className="an-reveal an-cta">
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#a7a3ff', marginBottom: '1rem' }}>Ready?</div>
            <h2 className="an-h2" style={{ marginBottom: '1.25rem' }}>Organize your <span className="accent">digital life.</span></h2>
            <p className="an-body" style={{ maxWidth: 440, margin: '0 auto 2.5rem', color: 'rgba(244,240,231,0.7)' }}>
              Secure authentication, a live cloud backend, and a beautiful minimalist design — all in one app.
            </p>
            <div className="an-cta-btns" style={{ justifyContent: 'center' }}>
              <a href={DOWNLOAD} target="_blank" rel="noopener noreferrer" className="an-btn-primary" style={{ background: 'var(--paper)', color: 'var(--ink)', borderColor: 'var(--paper)' }}>
                <Download style={{ width: 16, height: 16 }} /> Get Antinode
              </a>
              <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="an-btn-outline" style={{ color: 'var(--paper)', borderColor: 'rgba(244,240,231,0.4)' }}>
                <ArrowUpRight style={{ width: 15, height: 15 }} /> Check the Code
              </a>
            </div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', color: 'rgba(244,240,231,0.45)', marginTop: '2.5rem' }}>
              Built with ❤ by Rumman Ahmed.
            </p>
          </div>
        </section>

      </div>
    </>
  );
};

export default Antinode;
