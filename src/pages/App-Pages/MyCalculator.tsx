import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ChevronLeft, Download, Code2,
  Calculator, History, Moon,
  Zap, Layers, CheckCircle2, ArrowRight,
  Cpu, Sparkles,
} from 'lucide-react';

import { Images } from '../../data/images';

gsap.registerPlugin(ScrollTrigger);

// ─── Data ─────────────────────────────────────────────────────────────────────

const FEATURES = [
  { icon: Calculator, title: 'Scientific Engine',    desc: 'Trig, logarithms, roots, powers, constants π & e — full scientific suite in a compact panel.' },
  { icon: Layers,     title: 'Neumorphic UI',        desc: 'Soft 3D depth through layered shadows. Every button feels physical, tactile, real.' },
  { icon: History,    title: 'History Tracking',     desc: 'Every equation saved with timestamp. Tap any entry to restore it instantly.' },
  { icon: Moon,       title: 'Adaptive Themes',      desc: 'Auto-detects system appearance — dark orange warmth or light lavender calm.' },
  { icon: Zap,        title: 'Snap Performance',     desc: 'Zero-lag interactions. Expo New Architecture delivers buttery 60fps on every device.' },
  { icon: Cpu,        title: 'Smart State',          desc: 'React Context + custom hooks keep expression state perfectly synced across modes.' },
];

const TECH = [
  { label: 'Frontend',      color: '#FF6B35', items: ['React Native', 'Expo SDK', 'Expo Router', 'React Hooks'] },
  { label: 'Architecture',  color: '#a78bfa', items: ['React Context', 'Custom Hooks', 'Local State'] },
  { label: 'Build',         color: '#6366f1', items: ['EAS Build', 'Android APK', 'Expo Go'] },
];

const STATS = [
  { num: '2',    unit: 'themes',    label: 'Adaptive modes',     sub: 'Light & Dark neumorphism' },
  { num: '20+',  unit: 'funcs',     label: 'Scientific ops',     sub: 'sin, cos, log, √, π, e…' },
  { num: '∞',    unit: '',          label: 'History entries',    sub: 'Persistent calculation log' },
  { num: '60',   unit: 'fps',       label: 'Render performance', sub: 'Expo Fabric architecture' },
];

// ─── Phone Frame ──────────────────────────────────────────────────────────────
const Phone = ({
  src, alt, style = {},
}: { src: string; alt: string; style?: React.CSSProperties }) => (
  <div
    className="nc-phone"
    style={{
      borderRadius: '1.2rem',
      overflow: 'hidden',
      flexShrink: 0,
      position: 'relative',
      width: 'clamp(120px, 28vw, 220px)',
      boxShadow:
        '-8px -8px 20px rgba(255,255,255,0.04), 8px 8px 24px rgba(0,0,0,0.6), 0 0 0 1.5px rgba(255,107,53,0.1)',
      ...style,
    }}
  >
    <div style={{
      position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)',
      width: 52, height: 4, borderRadius: 99,
      background: 'rgba(255,255,255,0.08)', zIndex: 3,
    }} />
    <img src={src} alt={alt} style={{ width: '100%', display: 'block' }} />
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
const MyCalculator = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const mockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.fromTo('.nc-hero-anim',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, stagger: 0.13, ease: 'expo.out', delay: 0.1 }
      );

      gsap.fromTo(mockRef.current,
        { y: 100, opacity: 0, scale: 0.92 },
        { y: 0, opacity: 1, scale: 1, duration: 1.6, ease: 'expo.out', delay: 0.5 }
      );
      gsap.to(mockRef.current, {
        y: '-=14', duration: 4.2, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 2.2,
      });

      gsap.utils.toArray<HTMLElement>('.nc-phone').forEach((el, i) => {
        gsap.fromTo(el,
          { y: 80, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1, ease: 'back.out(1.2)',
            scrollTrigger: { trigger: el, start: 'top 92%', toggleActions: 'play none none none' },
          }
        );
        gsap.to(el, {
          y: `+=${6 + i * 2}`,
          duration: 3.2 + i * 0.6,
          yoyo: true, repeat: -1, ease: 'sine.inOut', delay: i * 0.4,
        });
      });

      gsap.utils.toArray<HTMLElement>('.nc-reveal').forEach(el => {
        gsap.fromTo(el,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>('.nc-stagger').forEach(container => {
        const children = Array.from(container.children);
        if (children.length) {
          gsap.fromTo(children,
            { y: 40, opacity: 0 },
            {
              y: 0, opacity: 1, duration: 0.7, stagger: 0.09, ease: 'power3.out',
              scrollTrigger: { trigger: container, start: 'top 86%', toggleActions: 'play none none none' },
            }
          );
        }
      });

      gsap.utils.toArray<HTMLElement>('.nc-count').forEach(el => {
        ScrollTrigger.create({
          trigger: el, start: 'top 88%', once: true,
          onEnter: () => {
            const raw = el.dataset.val || '';
            const numMatch = raw.match(/^[\d.]+/);
            if (numMatch) {
              const end    = parseFloat(numMatch[0]);
              const suffix = raw.slice(numMatch[0].length);
              gsap.fromTo({ v: 0 }, { v: 0 }, {
                v: end, duration: 2, ease: 'power2.out',
                onUpdate: function () {
                  el.textContent = Math.round((this.targets() as any)[0].v) + suffix;
                },
              });
            }
          },
        });
      });

      const inner = document.querySelector('.nc-marq-inner');
      if (inner) gsap.to(inner, { x: '-50%', duration: 28, ease: 'none', repeat: -1 });

      gsap.utils.toArray<HTMLElement>('.nc-feat').forEach((el, i) => {
        gsap.fromTo(el,
          { y: 50, opacity: 0, scale: 0.96 },
          {
            y: 0, opacity: 1, scale: 1, duration: 0.75, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' },
            delay: (i % 3) * 0.09,
          }
        );
      });

      const themeSection = document.querySelector('.nc-theme-section');
      if (themeSection) {
        gsap.to('.nc-theme-dark', {
          x: '-=30',
          scrollTrigger: { trigger: themeSection, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
        });
        gsap.to('.nc-theme-light', {
          x: '+=30',
          scrollTrigger: { trigger: themeSection, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
        });
      }

    }, pageRef);
    return () => ctx.revert();
  }, []);

  const MARQUEE_ITEMS = [
    'React Native', 'Neumorphic UI', 'Expo SDK', 'Dark Mode',
    'Scientific Calculator', 'History Tracking', 'EAS Build', 'Light Mode',
    'React Native', 'Neumorphic UI', 'Expo SDK', 'Dark Mode',
    'Scientific Calculator', 'History Tracking', 'EAS Build', 'Light Mode',
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&family=JetBrains+Mono:wght@400;500&display=swap');

        :root {
          --bg:      #141414;
          --bg2:     #1c1c1c;
          --bg3:     #222222;
          --card:    #1e1e1e;
          --card2:   #252525;
          --orange:  #FF6B35;
          --orange2: #ff8555;
          --orange3: rgba(255,107,53,0.12);
          --purple:  #7c6dfa;
          --purple2: #a78bfa;
          --text:    #f0ede8;
          --text2:   rgba(240,237,232,0.55);
          --text3:   rgba(240,237,232,0.28);
          --border:  rgba(255,107,53,0.12);
          --border2: rgba(255,107,53,0.25);
          --neu-shadow-dark: -6px -6px 14px rgba(255,255,255,0.03), 6px 6px 14px rgba(0,0,0,0.5);
          --neu-shadow-inset: inset -3px -3px 8px rgba(255,255,255,0.03), inset 3px 3px 8px rgba(0,0,0,0.4);
        }

        .nc-wrap {
          background: var(--bg);
          color: var(--text);
          font-family: 'DM Sans', sans-serif;
          font-weight: 300;
          min-height: 100vh;
          padding-top: 5rem;
          overflow-x: hidden;
        }
        .nc-wrap *, .nc-wrap *::before, .nc-wrap *::after { box-sizing: border-box; }

        /* ── Typography ── */
        .nc-display {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          line-height: 0.92;
          letter-spacing: -0.04em;
          color: var(--text);
        }
        .nc-h2 {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: clamp(1.6rem, 4vw, 3rem);
          line-height: 1.06;
          letter-spacing: -0.03em;
          color: var(--text);
          margin-top: 0.5rem;
        }
        .nc-h2 .ac  { color: var(--orange); }
        .nc-h2 .ac2 { color: var(--purple2); }
        .nc-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.58rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--orange);
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .nc-label::before {
          content: '';
          width: 18px; height: 1px;
          background: var(--orange);
          display: inline-block;
        }
        .nc-label.purple { color: var(--purple2); }
        .nc-label.purple::before { background: var(--purple2); }
        .nc-body {
          font-family: 'DM Sans', sans-serif;
          font-weight: 300;
          line-height: 1.8;
          color: var(--text2);
          font-size: 0.97rem;
        }

        /* ── Divider ── */
        .nc-div {
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--border2), transparent);
        }

        /* ── Tag ── */
        .nc-tag {
          display: inline-flex; align-items: center;
          padding: 0.3rem 0.85rem;
          border-radius: 100px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.55rem; letter-spacing: 0.12em; text-transform: uppercase;
          background: var(--bg3);
          border: 1px solid var(--border);
          color: var(--orange);
          white-space: nowrap;
          box-shadow: var(--neu-shadow-dark);
          transition: all 0.2s;
        }
        .nc-tag:hover { border-color: var(--border2); color: var(--orange2); }
        .nc-tag.purple-tag { color: var(--purple2); border-color: rgba(124,109,250,0.2); }

        /* ── Buttons ── */
        .nc-btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 0.85rem 1.6rem;
          border-radius: 1rem;
          background: var(--orange);
          color: #fff;
          font-family: 'Syne', sans-serif; font-weight: 700; font-size: 0.9rem;
          text-decoration: none; border: none; cursor: pointer; white-space: nowrap;
          box-shadow: 0 6px 24px rgba(255,107,53,0.35), var(--neu-shadow-dark);
          transition: all 0.25s;
        }
        .nc-btn-primary:hover {
          background: var(--orange2);
          transform: translateY(-2px);
          box-shadow: 0 12px 36px rgba(255,107,53,0.45);
        }
        .nc-btn-outline {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 0.85rem 1.6rem;
          border-radius: 1rem;
          background: var(--bg3);
          color: var(--text);
          font-family: 'DM Sans', sans-serif; font-weight: 400; font-size: 0.9rem;
          text-decoration: none;
          border: 1px solid var(--border);
          cursor: pointer; white-space: nowrap;
          box-shadow: var(--neu-shadow-dark);
          transition: all 0.25s;
        }
        .nc-btn-outline:hover {
          border-color: var(--border2);
          transform: translateY(-1px);
          box-shadow: 0 8px 28px rgba(0,0,0,0.3), var(--neu-shadow-dark);
          color: var(--orange);
        }

        /* ── Stat card ── */
        .nc-stat {
          padding: 1.4rem 1rem;
          border-radius: 1.5rem;
          border: 1px solid var(--border);
          background: var(--card);
          text-align: center;
          box-shadow: var(--neu-shadow-dark);
          transition: all 0.3s;
          position: relative; overflow: hidden;
        }
        .nc-stat::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, var(--orange), var(--purple), var(--orange2));
          border-radius: 99px 99px 0 0;
        }
        .nc-stat:hover {
          border-color: var(--border2);
          transform: translateY(-4px);
          box-shadow: 0 20px 50px rgba(0,0,0,0.4), var(--neu-shadow-dark);
        }

        /* ── Feature card ── */
        .nc-feat {
          padding: 1.4rem;
          border-radius: 1.5rem;
          border: 1px solid var(--border);
          background: var(--card);
          box-shadow: var(--neu-shadow-dark);
          transition: all 0.3s;
          cursor: default; position: relative; overflow: hidden;
        }
        .nc-feat::after {
          content: '';
          position: absolute; bottom: -20px; right: -20px;
          width: 100px; height: 100px; border-radius: 50%;
          background: radial-gradient(circle, rgba(255,107,53,0.07) 0%, transparent 70%);
          pointer-events: none;
        }
        .nc-feat:hover {
          border-color: var(--border2);
          transform: translateY(-5px);
          box-shadow: 0 20px 50px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,107,53,0.15);
        }
        .nc-feat:nth-child(even)::after {
          background: radial-gradient(circle, rgba(124,109,250,0.07) 0%, transparent 70%);
        }

        /* ── Theme section ── */
        .nc-theme-section {
          position: relative; overflow: hidden;
          background: linear-gradient(180deg, transparent 0%, rgba(255,107,53,0.03) 50%, transparent 100%);
        }
        .nc-theme-card {
          padding: 1.75rem;
          border-radius: 1.25rem;
          border: 1px solid var(--border);
          background: var(--card2);
          box-shadow: var(--neu-shadow-dark);
          position: relative; overflow: hidden;
        }
        .nc-theme-card.light-card {
          background: #e8e6f0;
          border-color: rgba(124,109,250,0.2);
          box-shadow: -8px -8px 20px rgba(255,255,255,0.8), 8px 8px 20px rgba(160,150,200,0.35);
        }
        .nc-theme-card.light-card .nc-label { color: #5B4FCF; }
        .nc-theme-card.light-card .nc-label::before { background: #5B4FCF; }
        .nc-theme-card.light-card .nc-h2 { color: #2d2a5e; }

        /* ── Tech card ── */
        .nc-tech {
          padding: 1.5rem;
          border-radius: 1.5rem;
          border: 1px solid var(--border);
          background: var(--card);
          box-shadow: var(--neu-shadow-dark);
          transition: border-color 0.25s;
        }
        .nc-tech:hover { border-color: var(--border2); }

        /* ── History section ── */
        .nc-history-card {
          border-radius: 1.25rem;
          overflow: hidden;
          border: 1px solid var(--border);
          background: var(--card2);
          box-shadow:
            -10px -10px 24px rgba(255,255,255,0.03),
            10px 10px 30px rgba(0,0,0,0.5),
            0 0 0 1px rgba(255,107,53,0.08);
          position: relative;
        }
        .nc-history-card::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,107,53,0.04) 0%, transparent 50%);
          pointer-events: none; z-index: 1;
        }

        /* ── CTA box ── */
        .nc-cta {
          border-radius: 2rem;
          border: 1px solid var(--border2);
          background: linear-gradient(135deg, #1e1412 0%, #1a1520 100%);
          padding: 2.75rem 1.5rem;
          text-align: center;
          max-width: 740px;
          margin: 0 auto;
          position: relative; overflow: hidden;
          box-shadow:
            0 40px 80px rgba(0,0,0,0.5),
            inset 0 1px 0 rgba(255,107,53,0.1),
            0 0 60px rgba(255,107,53,0.06);
        }
        .nc-cta::before {
          content: '';
          position: absolute; top: -100px; left: 50%; transform: translateX(-50%);
          width: 500px; height: 300px; border-radius: 50%;
          background: radial-gradient(ellipse, rgba(255,107,53,0.1) 0%, transparent 70%);
          pointer-events: none;
        }
        .nc-cta::after {
          content: '';
          position: absolute; bottom: -80px; right: -80px;
          width: 320px; height: 320px; border-radius: 50%;
          background: radial-gradient(circle, rgba(124,109,250,0.06) 0%, transparent 70%);
          pointer-events: none;
        }
        @media (min-width: 640px) {
          .nc-cta { padding: 4.5rem 3rem; }
        }

        /* ── Hero background ── */
        .nc-hero-grid {
          position: absolute; inset: 0; pointer-events: none; z-index: 0;
          background-image:
            linear-gradient(rgba(255,107,53,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,107,53,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 80% 70% at 60% 20%, black 10%, transparent 100%);
        }
        .nc-glow {
          position: absolute; border-radius: 50%;
          pointer-events: none;
          filter: blur(80px);
        }

        /* ── Marquee ── */
        .nc-marq { overflow: hidden; width: 100%; }
        .nc-marq-inner { display: flex; gap: 1rem; width: max-content; align-items: center; }

        /* ── Back link ── */
        .nc-back {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.6rem; letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--orange); text-decoration: none;
          transition: gap 0.2s, opacity 0.2s;
          opacity: 0.75;
        }
        .nc-back:hover { gap: 10px; opacity: 1; }

        /* ── Bullet ── */
        .nc-bullet {
          display: flex; align-items: center; gap: 0.75rem;
          padding: 0.65rem 0;
          border-bottom: 1px solid rgba(255,107,53,0.07);
        }
        .nc-bullet:last-child { border-bottom: none; }

        /* ── Scrollbar ── */
        .nc-wrap ::-webkit-scrollbar { width: 3px; }
        .nc-wrap ::-webkit-scrollbar-track { background: transparent; }
        .nc-wrap ::-webkit-scrollbar-thumb { background: rgba(255,107,53,0.25); border-radius: 99px; }

        /* ══════════ RESPONSIVE LAYOUT SYSTEM ══════════ */

        /* Section padding */
        .nc-section {
          padding: 3.5rem 4vw;
        }
        @media (min-width: 640px)  { .nc-section { padding: 4.5rem 5vw; } }
        @media (min-width: 1024px) { .nc-section { padding: 5.5rem 5vw; } }

        /* Hero two-column */
        .nc-hero-two {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
          align-items: center;
          position: relative;
          z-index: 2;
          max-width: 1280px;
          margin: 0 auto;
        }
        @media (min-width: 1024px) {
          .nc-hero-two { grid-template-columns: 1fr 1fr; gap: 4rem; }
        }

        /* Mockup: first on mobile */
        .nc-hero-mockup {
          order: -1;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        @media (min-width: 1024px) {
          .nc-hero-mockup { order: 0; }
        }

        /* Stats grid: 2 cols mobile → 4 cols tablet */
        .nc-stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
          max-width: 1280px;
          margin: 0 auto;
        }
        @media (min-width: 640px) {
          .nc-stats-grid { grid-template-columns: repeat(4, 1fr); }
        }

        /* Theme cards: stack on mobile */
        .nc-theme-row {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        @media (min-width: 768px) {
          .nc-theme-row { flex-direction: row; }
        }

        /* Feature grid */
        .nc-feat-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }
        @media (min-width: 540px)  { .nc-feat-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) { .nc-feat-grid { grid-template-columns: repeat(3, 1fr); } }

        /* Generic two-col */
        .nc-two-col {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
          align-items: center;
          max-width: 1280px;
          margin: 0 auto;
        }
        @media (min-width: 1024px) {
          .nc-two-col { grid-template-columns: 1fr 1fr; gap: 4rem; }
        }

        /* History phone: first on mobile */
        .nc-hist-phone {
          order: -1;
          display: flex;
          justify-content: center;
        }
        @media (min-width: 1024px) {
          .nc-hist-phone { order: 0; }
        }

        /* Tech grid */
        .nc-tech-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
          max-width: 1280px;
          margin: 0 auto;
        }
        @media (min-width: 540px) {
          .nc-tech-grid { grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); }
        }

        /* CTA buttons */
        .nc-cta-btns {
          display: flex;
          flex-wrap: wrap;
          gap: 0.85rem;
          justify-content: center;
          align-items: center;
          position: relative;
          z-index: 1;
        }

        /* Hero CTAs */
        .nc-hero-ctas {
          display: flex;
          flex-wrap: wrap;
          gap: 0.85rem;
          align-items: center;
        }

        /* Hero badge */
        .nc-hero-badge {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.75rem;
        }

        /* Tags row */
        .nc-tags-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: 1.5rem;
        }

        /* Slogan row */
        .nc-slogan {
          display: flex;
          gap: 1.25rem;
          flex-wrap: wrap;
          margin-top: 1.75rem;
        }

        /* Color swatches row */
        .nc-swatches {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin-bottom: 1.25rem;
        }

        /* Design philosophy grid */
        .nc-phil-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          max-width: 1280px;
          margin: 0 auto;
          align-items: start;
        }
        @media (min-width: 1024px) {
          .nc-phil-grid { grid-template-columns: 1fr 1fr; gap: 4rem; }
        }
      `}</style>

      <div ref={pageRef} className="nc-wrap">

        {/* ══════════ BACK NAV ══════════ */}
        <div style={{ padding: '1.5rem 4vw 0', position: 'relative', zIndex: 20 }}>
          <Link to="/" className="nc-back">
            <ChevronLeft style={{ width: 13, height: 13 }} />
            Back to Showcase
          </Link>
        </div>

        {/* ══════════ HERO ══════════ */}
        <section style={{
          position: 'relative', overflow: 'hidden',
          padding: 'clamp(2rem,4vw,5.5rem) 4vw clamp(3.5rem,6vw,8rem)',
        }}>
          <div className="nc-hero-grid" />
          <div className="nc-glow" style={{ width: 600, height: 500, top: '-20%', right: '-5%', background: 'radial-gradient(ellipse, rgba(255,107,53,0.1) 0%, transparent 70%)' }} />
          <div className="nc-glow" style={{ width: 350, height: 350, bottom: '-10%', left: '-5%', background: 'radial-gradient(circle, rgba(124,109,250,0.08) 0%, transparent 70%)', opacity: 0.7 }} />

          <div className="nc-hero-two">

            {/* Text */}
            <div>
              <div className="nc-hero-anim nc-hero-badge">
                <div style={{
                  width: 60, height: 60, borderRadius: '1.5rem', overflow: 'hidden',
                  flexShrink: 0,
                  boxShadow: '-6px -6px 14px rgba(255,255,255,0.05), 6px 6px 18px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,107,53,0.15)',
                }}>
                  <img src={Images.calculator.icon} alt="Neumorphic Calculator Icon" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>
                <div>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace", fontSize: '0.54rem',
                    letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--orange)',
                    marginBottom: 4, opacity: 0.9,
                  }}>Premium Mobile App</div>
                  <div style={{
                    fontFamily: "'Syne', sans-serif", fontSize: 'clamp(1.1rem, 3vw, 1.35rem)',
                    fontWeight: 800, color: 'var(--text)', lineHeight: 1, letterSpacing: '-0.02em',
                  }}>Neumorphic Calculator</div>
                </div>
              </div>

              <h1 className="nc-hero-anim nc-display" style={{ fontSize: 'clamp(2.4rem, 8vw, 5.6rem)', margin: 0 }}>
                Precision<br />
                meets<br />
                <span style={{ color: 'var(--orange)' }}>beautiful</span><br />
                design.
              </h1>

              <p className="nc-hero-anim nc-body" style={{ marginTop: '1.5rem', maxWidth: '34rem', fontSize: 'clamp(0.88rem, 2vw, 1.05rem)', lineHeight: 1.8 }}>
                A next-generation scientific calculator crafted with adaptive neumorphism — soft 3D depth, tactile interactions, and intelligent dual-theme design that feels physical and alive.
              </p>

              <div className="nc-hero-anim nc-tags-row">
                {['React Native', 'Expo SDK', 'Neumorphism', 'Dark + Light'].map(t => (
                  <span key={t} className="nc-tag">{t}</span>
                ))}
              </div>

              <div className="nc-hero-anim nc-hero-ctas" style={{ marginTop: '1.75rem' }}>
                <a href="https://expo.dev/artifacts/eas/aX8KhqZzSizYmnc254xFKb.apk" className="nc-btn-primary">
                  <Download style={{ width: 16, height: 16 }} /> Download APK
                </a>
                <a href="#features" className="nc-btn-outline">
                  Explore Features <ArrowRight style={{ width: 14, height: 14 }} />
                </a>
              </div>

              <div className="nc-hero-anim nc-slogan">
                {['Calculate.', 'Immerse.', 'Achieve.'].map(w => (
                  <span key={w} style={{
                    fontFamily: "'Syne', sans-serif", fontWeight: 800,
                    fontSize: '1rem', color: 'var(--orange)', opacity: 0.7,
                    letterSpacing: '-0.01em',
                  }}>{w}</span>
                ))}
              </div>
            </div>

            {/* Mockup — first on mobile */}
            <div className="nc-hero-mockup">
              <div ref={mockRef} style={{ willChange: 'transform', position: 'relative' }}>
                <div style={{
                  position: 'absolute', inset: '-40px',
                  background: 'radial-gradient(ellipse 60% 50% at 50% 60%, rgba(255,107,53,0.12) 0%, transparent 70%)',
                  filter: 'blur(20px)', zIndex: 0, pointerEvents: 'none',
                }} />
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <img
                    src={Images.calculator.mockup}
                    alt="Calculator App Mockup"
                    style={{ width: 'clamp(180px, 50vw, 420px)', display: 'block', userSelect: 'none' }}
                    draggable={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="nc-div" />

        {/* ══════════ STATS ══════════ */}
        <section className="nc-section">
          <div className="nc-stagger nc-stats-grid">
            {STATS.map(({ num, unit, label, sub }) => (
              <div key={label} className="nc-stat">
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', gap: 3, marginBottom: '0.45rem' }}>
                  <span
                    className="nc-count"
                    data-val={num}
                    style={{
                      fontFamily: "'Syne', sans-serif", fontWeight: 800,
                      fontSize: 'clamp(1.6rem, 5vw, 2.6rem)', color: 'var(--orange)', lineHeight: 1,
                      letterSpacing: '-0.04em',
                    }}
                  >{num}</span>
                  {unit && <span style={{
                    fontFamily: "'JetBrains Mono', monospace", fontSize: '0.58rem',
                    letterSpacing: '0.1em', color: 'var(--text2)', textTransform: 'uppercase',
                  }}>{unit}</span>}
                </div>
                <div style={{
                  fontFamily: "'Syne', sans-serif", fontWeight: 600,
                  fontSize: '0.85rem', color: 'var(--text)', marginBottom: '0.25rem',
                }}>{label}</div>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: '0.48rem',
                  letterSpacing: '0.1em', color: 'var(--text3)', textTransform: 'uppercase',
                }}>{sub}</div>
              </div>
            ))}
          </div>
        </section>

        <div className="nc-div" />

        {/* ══════════ ADAPTIVE THEME SECTION ══════════ */}
        <section className="nc-section nc-theme-section">
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div className="nc-reveal" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <div className="nc-label" style={{ justifyContent: 'center' }}>Adaptive Design</div>
              <h2 className="nc-h2" style={{ textAlign: 'center' }}>
                Two themes.<br />
                <span className="ac">One identity.</span>
              </h2>
            </div>

            <div className="nc-theme-row">

              {/* Dark card */}
              <div className="nc-theme-card nc-reveal nc-theme-dark" style={{ flex: 1, minWidth: 0 }}>
                <div className="nc-label" style={{ marginBottom: '1rem' }}>Dark Mode</div>
                <h3 style={{
                  fontFamily: "'Syne', sans-serif", fontWeight: 700,
                  fontSize: 'clamp(1.1rem, 2.5vw, 1.8rem)', color: 'var(--text)',
                  lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '0.85rem',
                }}>
                  Warm orange<br />on obsidian.
                </h3>
                <p className="nc-body" style={{ marginBottom: '1.25rem', fontSize: '0.87rem' }}>
                  Deep #141414 backgrounds with neumorphic depth. Orange #FF6B35 accents cut through the darkness with precision.
                </p>
                <div className="nc-swatches">
                  {['#141414', '#FF6B35', '#2a2a2a'].map(c => (
                    <div key={c} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{
                        width: 16, height: 16, borderRadius: 5,
                        background: c, border: '1px solid rgba(255,255,255,0.08)',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.4)',
                        flexShrink: 0,
                      }} />
                      <span style={{
                        fontFamily: "'JetBrains Mono', monospace", fontSize: '0.52rem',
                        color: 'var(--text3)', letterSpacing: '0.06em',
                      }}>{c}</span>
                    </div>
                  ))}
                </div>
                <Phone src={Images.calculator.dark} alt="Dark theme" style={{ width: '100%', maxWidth: 200, margin: '0 auto', display: 'block' }} />
              </div>

              {/* Light card */}
              <div className="nc-theme-card light-card nc-reveal nc-theme-light" style={{ flex: 1, minWidth: 0 }}>
                <div className="nc-label purple" style={{ marginBottom: '1rem' }}>Light Mode</div>
                <h3 style={{
                  fontFamily: "'Syne', sans-serif", fontWeight: 700,
                  fontSize: 'clamp(1.1rem, 2.5vw, 1.8rem)', color: '#2d2a5e',
                  lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '0.85rem',
                }}>
                  Lavender soft<br />neumorphism.
                </h3>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif", fontWeight: 300,
                  lineHeight: 1.8, color: '#6b6899', fontSize: '0.87rem', marginBottom: '1.25rem',
                }}>
                  #E8E6F0 cloud-like surfaces. Deep purple #5B4FCF accent brings structure to the soft, pillowy interface.
                </p>
                <div className="nc-swatches">
                  {['#E8E6F0', '#5B4FCF', '#ffffff'].map(c => (
                    <div key={c} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{
                        width: 16, height: 16, borderRadius: 5,
                        background: c, border: '1px solid rgba(91,79,207,0.15)',
                        boxShadow: '-2px -2px 5px rgba(255,255,255,0.8), 2px 2px 5px rgba(160,150,200,0.3)',
                        flexShrink: 0,
                      }} />
                      <span style={{
                        fontFamily: "'JetBrains Mono', monospace", fontSize: '0.52rem',
                        color: '#9896b8', letterSpacing: '0.06em',
                      }}>{c}</span>
                    </div>
                  ))}
                </div>
                <Phone src={Images.calculator.light} alt="Light theme" style={{ width: '100%', maxWidth: 200, margin: '0 auto', display: 'block' }} />
              </div>
            </div>
          </div>
        </section>

        <div className="nc-div" />

        {/* ══════════ FEATURES GRID ══════════ */}
        <section id="features" className="nc-section">
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div className="nc-reveal" style={{ textAlign: 'center', maxWidth: 520, margin: '0 auto 2.5rem' }}>
              <div className="nc-label" style={{ justifyContent: 'center' }}>Core Features</div>
              <h2 className="nc-h2" style={{ textAlign: 'center' }}>
                Built for depth,<br />
                <span className="ac">tuned for clarity.</span>
              </h2>
            </div>

            <div className="nc-feat-grid">
              {FEATURES.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="nc-feat">
                  <div style={{
                    width: 46, height: 46, borderRadius: '1rem', marginBottom: '1.1rem',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'var(--bg3)',
                    boxShadow: 'var(--neu-shadow-dark)',
                    border: '1px solid var(--border)',
                  }}>
                    <Icon style={{ width: 20, height: 20, color: 'var(--orange)' }} />
                  </div>
                  <div style={{
                    fontFamily: "'Syne', sans-serif", fontWeight: 700,
                    fontSize: '0.98rem', color: 'var(--text)', marginBottom: '0.5rem',
                    letterSpacing: '-0.01em',
                  }}>{title}</div>
                  <div className="nc-body" style={{ fontSize: '0.86rem' }}>{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="nc-div" />

        {/* ══════════ HISTORY SECTION ══════════ */}
        <section className="nc-section" style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(124,109,250,0.03) 50%, transparent 100%)',
        }}>
          <div className="nc-two-col">

            {/* Phone — top on mobile */}
            <div className="nc-reveal nc-hist-phone">
              <div className="nc-history-card">
                <img src={Images.calculator.history} alt="History panel" style={{ width: 'clamp(160px, 40vw, 280px)', display: 'block' }} />
              </div>
            </div>

            {/* Text */}
            <div className="nc-reveal">
              <div className="nc-label purple">History System</div>
              <h2 className="nc-h2">
                Every equation,<br />
                <span className="ac2">always there.</span>
              </h2>
              <div style={{ height: 1, background: 'rgba(124,109,250,0.15)', margin: '1.25rem 0' }} />
              <p className="nc-body">
                The slide-up history panel preserves every calculation with a timestamp. Tap any entry to instantly restore it — never lose a number again.
              </p>
              <div style={{ marginTop: '1.5rem' }}>
                {['Equation + result preserved', 'Timestamp for each entry', 'Tap to restore instantly', 'Clear all with one tap', 'Smooth modal animation'].map(b => (
                  <div key={b} className="nc-bullet">
                    <CheckCircle2 style={{ width: 14, height: 14, color: 'var(--purple2)', flexShrink: 0 }} />
                    <span className="nc-body" style={{ fontSize: '0.91rem' }}>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="nc-div" />

        {/* ══════════ MARQUEE ══════════ */}
        <section style={{ padding: '2.25rem 0', overflow: 'hidden' }}>
          <div className="nc-marq">
            <div className="nc-marq-inner">
              {MARQUEE_ITEMS.map((item, i) => (
                <span key={i} style={{
                  fontFamily: "'JetBrains Mono',monospace",
                  fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: i % 2 === 0 ? 'var(--orange)' : 'var(--text3)',
                  padding: '0.42rem 1.1rem',
                  border: '1px solid var(--border)',
                  borderRadius: '100px',
                  background: 'var(--card)',
                  flexShrink: 0,
                  boxShadow: 'var(--neu-shadow-dark)',
                }}>{item}</span>
              ))}
            </div>
          </div>
        </section>

        <div className="nc-div" />

        {/* ══════════ TECH STACK ══════════ */}
        <section className="nc-section">
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div className="nc-reveal" style={{ marginBottom: '2.25rem' }}>
              <div className="nc-label">Technology</div>
              <h2 className="nc-h2">
                Engineered with<br />
                <span className="ac">the right stack.</span>
              </h2>
            </div>

            <div className="nc-stagger nc-tech-grid">
              {TECH.map(({ label, color, items }) => (
                <div key={label} className="nc-tech">
                  <div style={{
                    fontFamily: "'JetBrains Mono',monospace", fontSize: '0.57rem',
                    letterSpacing: '0.16em', textTransform: 'uppercase',
                    color, marginBottom: '1.1rem',
                    display: 'flex', alignItems: 'center', gap: 8,
                  }}>
                    <span style={{ width: 14, height: 1, background: color, display: 'inline-block' }} />
                    {label}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {items.map(item => (
                      <span key={item} style={{
                        padding: '0.3rem 0.8rem', borderRadius: '100px',
                        fontFamily: "'DM Sans',sans-serif", fontSize: '0.78rem', fontWeight: 400,
                        background: `${color}14`, border: `1px solid ${color}30`,
                        color: 'var(--text)',
                        boxShadow: 'var(--neu-shadow-dark)',
                      }}>{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="nc-div" />

        {/* ══════════ DESIGN PHILOSOPHY ══════════ */}
        <section className="nc-section" style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(255,107,53,0.03) 50%, transparent 100%)',
        }}>
          <div className="nc-phil-grid">

            <div className="nc-reveal">
              <div className="nc-label">Design System</div>
              <h2 className="nc-h2">
                Minimal complexity.<br />
                <span className="ac">Maximum clarity.</span>
              </h2>
              <div style={{ height: 1, background: 'var(--border)', margin: '1.25rem 0' }} />
              <p className="nc-body" style={{ marginBottom: '1.5rem' }}>
                Neumorphic Calculator follows a strict design philosophy: remove everything that doesn't serve the calculation. What remains is pure, tactile, and focused.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {['Depth through softness', 'Comfortable hierarchy', 'Fluid interactions', 'Reduced visual noise', 'Tactile feedback'].map(t => (
                  <span key={t} className="nc-tag">{t}</span>
                ))}
              </div>
            </div>

            <div className="nc-reveal" style={{
              borderRadius: '1.75rem',
              border: '1px solid var(--border2)',
              background: 'linear-gradient(135deg, rgba(255,107,53,0.06) 0%, rgba(124,109,250,0.04) 100%)',
              padding: '1.75rem',
              boxShadow: 'var(--neu-shadow-dark)',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: -40, right: -40,
                width: 180, height: 180, borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255,107,53,0.08) 0%, transparent 70%)',
                pointerEvents: 'none',
              }} />
              <div style={{
                fontFamily: "'JetBrains Mono',monospace", fontSize: '0.55rem',
                letterSpacing: '0.18em', textTransform: 'uppercase',
                color: 'var(--orange)', marginBottom: '1rem',
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <Sparkles style={{ width: 12, height: 12 }} />
                Why Neumorphic?
              </div>
              <h3 style={{
                fontFamily: "'Syne',sans-serif", fontWeight: 700,
                fontSize: 'clamp(1.1rem, 2.5vw, 1.9rem)',
                lineHeight: 1.1, color: 'var(--text)', marginBottom: '1.1rem',
                letterSpacing: '-0.02em',
              }}>
                A calculator that feels physical and alive.
              </h3>
              <p className="nc-body">
                Traditional apps are flat. Neumorphic Calculator borrows from the physical world — buttons that appear extruded from the surface, shadows that follow light, depth that you can almost touch.
              </p>
              <p className="nc-body" style={{ marginTop: '1rem', color: 'var(--orange)', fontStyle: 'italic', fontSize: '0.92rem' }}>
                Mathematics, redesigned.
              </p>
            </div>

          </div>
        </section>

        <div className="nc-div" />

        {/* ══════════ CTA ══════════ */}
        <section className="nc-section" style={{ paddingBottom: 'clamp(3.5rem, 8vw, 8rem)' }}>
          <div className="nc-reveal nc-cta">
            <div style={{
              fontFamily: "'JetBrains Mono',monospace", fontSize: '0.55rem',
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'var(--orange)', marginBottom: '1.1rem', opacity: 0.8,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              position: 'relative', zIndex: 1,
            }}>
              <span style={{ width: 14, height: 1, background: 'var(--orange)', display: 'inline-block', opacity: 0.6 }} />
              Ready to calculate beautifully?
            </div>
            <h2 style={{
              fontFamily: "'Syne',sans-serif", fontWeight: 800,
              fontSize: 'clamp(1.6rem, 4vw, 3.2rem)', lineHeight: 1.05,
              color: 'var(--text)', marginBottom: '1rem',
              letterSpacing: '-0.04em',
              position: 'relative', zIndex: 1,
            }}>
              A smarter, softer,<br />
              <span style={{ color: 'var(--orange)' }}>more immersive</span> calculator.
            </h2>
            <p style={{
              fontFamily: "'DM Sans',sans-serif", fontWeight: 300,
              color: 'var(--text2)', fontSize: 'clamp(0.88rem, 2vw, 1rem)', lineHeight: 1.75,
              maxWidth: 460, margin: '0 auto 2.25rem',
              position: 'relative', zIndex: 1,
            }}>
              Scientific functions, history tracking, neumorphic depth, and dual adaptive themes — all in one elegantly crafted app.
            </p>
            <div className="nc-cta-btns">
              <a href="https://expo.dev/artifacts/eas/aX8KhqZzSizYmnc254xFKb.apk" className="nc-btn-primary">
                <Download style={{ width: 16, height: 16 }} /> Download APK
              </a>
              <a href="https://github.com/rumman2004/Calculator-App" className="nc-btn-outline">
                <Code2 style={{ width: 15, height: 15 }} /> View on GitHub
              </a>
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default MyCalculator;