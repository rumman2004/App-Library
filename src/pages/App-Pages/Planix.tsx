import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ChevronLeft, ChevronRight, Download, Play, Calendar,
  Bell, Shield, Zap, Cloud, CheckCircle2, Sparkles,
  Code2, ExternalLink, User,
  ArrowDown,
} from 'lucide-react';

import planixLogo  from '../../assets/app-icons/Planix icon.png';
import homePage    from '../../assets/app-Interfaces/Planix/Plainx Home Page.jpeg';
import calendarPage from '../../assets/app-Interfaces/Planix/Planix Calendar.jpeg';
import addEventPage from '../../assets/app-Interfaces/Planix/Planix Add Event.jpeg';
import appMockup   from '../../assets/app-Interfaces/Planix/app-mockup.png';
import profilePage from '../../assets/app-Interfaces/Planix/Plainx User Profile.jpeg';
import alertPage   from '../../assets/app-Interfaces/Planix/Planix Alert Page.jpeg';

gsap.registerPlugin(ScrollTrigger);

// ─── Data ────────────────────────────────────────────────────────────────────

const FEATURES = [
  { icon: Calendar,       title: 'Smart Calendar',        desc: 'Interactive monthly planner with event indicators, smooth navigation, and daily schedule tracking.' },
  { icon: Bell,           title: 'Intelligent Reminders', desc: 'Timely local notifications for events, tasks, and birthdays — never miss what matters.' },
  { icon: Sparkles,       title: 'Premium UI Design',     desc: 'Minimal, calm, and beautifully animated mobile experience with glassmorphism-inspired surfaces.' },
  { icon: Cloud,          title: 'Google Calendar Sync',  desc: 'Real-time two-way synchronization with Google Calendar — your data, always current.' },
  { icon: Zap,            title: 'Fast Performance',      desc: 'Built with React Native New Architecture for buttery smooth 60fps interactions.' },
  { icon: Shield,         title: 'Secure Auth',           desc: 'Google OAuth 2.0 with secure session management keeps your data protected.' },
];

const STATS = [
  { value: '4',   suffix: ' types', label: 'Event categories', sub: 'Events, Tasks, Birthdays, Reminders' },
  { value: '2x',  suffix: '',       label: 'Google Calendar sync', sub: 'Real-time two-way' },
  { value: '60',  suffix: 'fps',    label: 'Animation performance', sub: 'React Native Fabric' },
  { value: '∞',   suffix: '',       label: 'Scheduling capacity', sub: 'No event limits' },
];

const TECH = [
  { label: 'Frontend',     color: '#0d7377', items: ['React Native', 'Expo SDK 54', 'React Navigation', 'Lucide Icons', 'Date-fns'] },
  { label: 'Backend',      color: '#14a085', items: ['Node.js', 'Express.js', 'MongoDB', 'Railway Hosting'] },
  { label: 'Integrations', color: '#5bb3a0', items: ['Google Calendar API', 'Google OAuth 2.0', 'Expo Notifications'] },
];

const SCREENS = [
  { src: homePage,     alt: 'Dashboard',   label: 'Dashboard',      rot: -6 },
  { src: calendarPage, alt: 'Calendar',    label: 'Calendar',       rot: -2 },
  { src: addEventPage, alt: 'Add Event',   label: 'Event Creation', rot: 4  },
  { src: alertPage,    alt: 'Alerts',      label: 'Reminders',      rot: 7  },
  { src: profilePage,  alt: 'Profile',     label: 'User Profile',   rot: 8  },
];

const SECTIONS = [
  {
    label: 'Smart Dashboard',
    title: 'Your schedule,',
    accent: 'beautifully organized.',
    body: 'The dashboard gives users an instant overview of their day — upcoming events, weekly stats, and smart reminders displayed in a calm, focused layout.',
    bullets: ['Personalized greetings', 'Real-time event overview', 'Weekly activity tracking', 'Smart upcoming reminders'],
    img: homePage,
    imgAlt: 'Dashboard Screen',
  },
  {
    label: 'Calendar System',
    title: 'See everything.',
    accent: 'Miss nothing.',
    body: 'A modern calendar with clean grid layouts, event indicators, and smooth navigation. Every date is one tap away.',
    bullets: ['Interactive monthly view', 'Event dot indicators', 'Daily schedule panel', 'Fast event access'],
    img: calendarPage,
    imgAlt: 'Calendar Screen',
    reverse: true,
  },
  {
    label: 'Event Creation',
    title: 'Create moments',
    accent: 'in seconds.',
    body: 'Birthdays, meetings, tasks, or reminders — creation is simple, fast, and visually satisfying with color categorization and rich detail options.',
    bullets: ['Multi-event type support', 'Color categorization', 'All-day scheduling', 'Smart reminders'],
    img: addEventPage,
    imgAlt: 'Add Event Screen',
  },
];

// ─── Phone Frame ─────────────────────────────────────────────────────────────
const Phone = ({ src, alt, style = {}, className = '' }: { src: string; alt: string; style?: React.CSSProperties; className?: string }) => (
  <div
    className={`px-phone ${className}`.trim()}
    style={{
      borderRadius: '1.5rem',
      border: '2px solid rgba(13,115,119,0.15)',
      overflow: 'hidden',
      background: '#f5f5f0',
      boxShadow: '0 2px 0 rgba(13,115,119,0.08), 0 24px 64px rgba(13,115,119,0.1), 0 8px 24px rgba(0,0,0,0.08)',
      width: 'clamp(140px,18vw,210px)',
      flexShrink: 0,
      position: 'relative',
      ...style,
    }}
  >
    <div style={{
      position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)',
      width: 56, height: 4, borderRadius: 99,
      background: 'rgba(13,115,119,0.12)', zIndex: 2,
    }} />
    <img src={src} alt={alt} style={{ width: '100%', display: 'block' }} />
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
const Planix = () => {
  const pageRef  = useRef<HTMLDivElement>(null);
  const heroRef  = useRef<HTMLDivElement>(null);
  const mockRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.fromTo('.px-h-anim',
        { y: 55, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: 'power4.out', delay: 0.1 }
      );

      gsap.fromTo(mockRef.current,
        { y: 90, opacity: 0, scale: 0.94 },
        { y: 0, opacity: 1, scale: 1, duration: 1.5, ease: 'expo.out', delay: 0.45 }
      );

      gsap.to(mockRef.current, {
        y: '-=16', duration: 3.8, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 2,
      });
      gsap.to(mockRef.current, {
        rotation: 1.2, duration: 4.5, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 2,
      });

      gsap.utils.toArray<HTMLElement>('.px-phone').forEach((el, i) => {
        gsap.fromTo(el,
          { y: 70, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.9, ease: 'back.out(1.3)',
            scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' },
          }
        );
        gsap.to(el, {
          y: `+=${5 + i * 2}`, duration: 3 + i * 0.5,
          yoyo: true, repeat: -1, ease: 'sine.inOut', delay: i * 0.35,
        });
      });

      gsap.utils.toArray<HTMLElement>('.px-reveal').forEach(el => {
        gsap.fromTo(el,
          { y: 48, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 87%', toggleActions: 'play none none none' },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>('.px-stagger').forEach(container => {
        const children = Array.from(container.children);
        if (children.length) {
          gsap.fromTo(children,
            { y: 36, opacity: 0 },
            {
              y: 0, opacity: 1, duration: 0.65, stagger: 0.1, ease: 'power3.out',
              scrollTrigger: { trigger: container, start: 'top 85%', toggleActions: 'play none none none' },
            }
          );
        }
      });

      gsap.utils.toArray<HTMLElement>('.px-count').forEach(el => {
        ScrollTrigger.create({
          trigger: el, start: 'top 88%', once: true,
          onEnter: () => {
            const raw = el.dataset.val || '';
            const num = parseFloat(raw);
            if (!isNaN(num)) {
              const suffix = raw.replace(/[\d.]/g, '');
              gsap.fromTo({ v: 0 }, { v: 0 }, {
                v: num, duration: 1.8, ease: 'power2.out',
                onUpdate: function () {
                  el.textContent = Math.round(this.targets()[0].v) + suffix;
                },
              });
            }
          },
        });
      });

      const inner = document.querySelector('.px-marq-inner');
      if (inner) gsap.to(inner, { x: '-50%', duration: 30, ease: 'none', repeat: -1 });

      gsap.utils.toArray<HTMLElement>('.px-feat').forEach((el, i) => {
        gsap.fromTo(el,
          { y: 44, opacity: 0, scale: 0.97 },
          {
            y: 0, opacity: 1, scale: 1, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 89%', toggleActions: 'play none none none' },
            delay: (i % 3) * 0.08,
          }
        );
      });

    }, pageRef);
    return () => ctx.revert();
  }, []);

  const MARQUEE = [
    'React Native', 'Expo SDK 54', 'Google Calendar', 'Node.js',
    'MongoDB', 'OAuth 2.0', 'Expo Notifications', 'React Navigation',
    'React Native', 'Expo SDK 54', 'Google Calendar', 'Node.js',
    'MongoDB', 'OAuth 2.0', 'Expo Notifications', 'React Navigation',
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&family=Outfit:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

        :root {
          --teal:    #0d7377;
          --teal2:   #14a085;
          --teal3:   #5bb3a0;
          --teal4:   #c8e6e5;
          --cream:   #f0ede8;
          --cream2:  #e8e4de;
          --cream3:  #faf9f7;
          --card:    #ffffff;
          --text:    #1a2422;
          --text2:   rgba(26,36,34,0.58);
          --text3:   rgba(26,36,34,0.35);
          --border:  rgba(13,115,119,0.1);
          --border2: rgba(13,115,119,0.22);
          --surf:    rgba(13,115,119,0.04);
          --surf2:   rgba(13,115,119,0.08);
        }

        .px-wrap {
          background: var(--cream);
          color: var(--text);
          font-family: 'Outfit', sans-serif;
          font-weight: 300;
          min-height: 100vh;
          padding-top: 5rem;
          overflow-x: hidden;
        }

        .px-wrap *, .px-wrap *::before, .px-wrap *::after { box-sizing: border-box; }

        /* ── Typography ── */
        .px-display {
          font-family: 'Lora', Georgia, serif;
          font-weight: 700;
          line-height: 0.95;
          letter-spacing: -0.03em;
          color: var(--text);
        }
        .px-h2 {
          font-family: 'Lora', Georgia, serif;
          font-weight: 600;
          font-size: clamp(1.6rem, 4vw, 2.9rem);
          line-height: 1.08;
          letter-spacing: -0.025em;
          color: var(--text);
          margin-top: 0.5rem;
        }
        .px-h2 .ac { color: var(--teal); }
        .px-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.58rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--teal);
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .px-label::before {
          content: '';
          width: 18px; height: 1px;
          background: var(--teal);
          display: inline-block;
        }
        .px-body {
          font-family: 'Outfit', sans-serif;
          font-weight: 300;
          line-height: 1.8;
          color: var(--text2);
          font-size: 0.97rem;
        }

        /* ── Divider ── */
        .px-div {
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--border2), transparent);
        }

        /* ── Tag ── */
        .px-tag {
          display: inline-flex; align-items: center;
          padding: 0.28rem 0.8rem;
          border-radius: 100px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.57rem; letter-spacing: 0.1em; text-transform: uppercase;
          background: rgba(13,115,119,0.07);
          border: 1px solid var(--border);
          color: var(--teal2);
          white-space: nowrap;
          transition: background 0.2s, border-color 0.2s;
        }
        .px-tag:hover { background: rgba(13,115,119,0.12); border-color: var(--border2); }

        /* ── Buttons ── */
        .px-btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 0.85rem 1.6rem;
          border-radius: 0.75rem;
          background: var(--teal);
          color: #fff;
          font-family: 'Outfit', sans-serif; font-weight: 600; font-size: 0.9rem;
          text-decoration: none; border: none; cursor: pointer; white-space: nowrap;
          box-shadow: 0 4px 20px rgba(13,115,119,0.28);
          transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
        }
        .px-btn-primary:hover {
          background: var(--teal2);
          transform: translateY(-2px);
          box-shadow: 0 10px 32px rgba(13,115,119,0.35);
        }
        .px-btn-outline {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 0.85rem 1.6rem;
          border-radius: 0.75rem;
          background: var(--card);
          color: var(--text);
          font-family: 'Outfit', sans-serif; font-weight: 400; font-size: 0.9rem;
          text-decoration: none;
          border: 1px solid var(--cream2);
          cursor: pointer; white-space: nowrap;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          transition: border-color 0.2s, background 0.2s, transform 0.2s, box-shadow 0.2s;
        }
        .px-btn-outline:hover {
          border-color: var(--border2);
          background: rgba(13,115,119,0.04);
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(13,115,119,0.12);
        }

        /* ── Stat card ── */
        .px-stat {
          padding: 1.5rem 1.25rem;
          border-radius: 1.25rem;
          border: 1px solid var(--border);
          background: var(--card);
          text-align: center;
          box-shadow: 0 2px 12px rgba(13,115,119,0.06);
          transition: border-color 0.25s, transform 0.25s, box-shadow 0.25s;
          position: relative; overflow: hidden;
        }
        .px-stat::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, var(--teal), var(--teal2), var(--teal3));
          border-radius: 99px 99px 0 0;
        }
        .px-stat:hover {
          border-color: var(--border2);
          transform: translateY(-3px);
          box-shadow: 0 8px 32px rgba(13,115,119,0.12);
        }

        /* ── Feature card ── */
        .px-feat {
          padding: 1.5rem;
          border-radius: 1.25rem;
          border: 1px solid var(--border);
          background: var(--card);
          box-shadow: 0 2px 10px rgba(0,0,0,0.04);
          transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
          cursor: default; position: relative; overflow: hidden;
        }
        .px-feat::after {
          content: '';
          position: absolute; bottom: 0; right: 0;
          width: 80px; height: 80px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(13,115,119,0.06) 0%, transparent 70%);
          pointer-events: none;
        }
        .px-feat:hover {
          border-color: var(--border2);
          transform: translateY(-4px);
          box-shadow: 0 12px 36px rgba(13,115,119,0.1);
        }

        /* ── Tech card ── */
        .px-tech {
          padding: 1.75rem;
          border-radius: 1.25rem;
          border: 1px solid var(--border);
          background: var(--card);
          box-shadow: 0 2px 10px rgba(0,0,0,0.04);
          transition: border-color 0.25s;
        }
        .px-tech:hover { border-color: var(--border2); }

        /* ── Why card ── */
        .px-why {
          border-radius: 1.25rem;
          border: 1px solid rgba(13,115,119,0.14);
          background: linear-gradient(135deg, rgba(13,115,119,0.07) 0%, rgba(91,179,160,0.03) 100%);
          padding: 2rem;
          position: relative; overflow: hidden;
        }
        .px-why::before {
          content: '';
          position: absolute; top: -60px; right: -60px;
          width: 220px; height: 220px; border-radius: 50%;
          background: radial-gradient(circle, rgba(13,115,119,0.07) 0%, transparent 70%);
          pointer-events: none;
        }

        /* ── Audience pill ── */
        .px-aud {
          display: flex; align-items: center; gap: 10px;
          padding: 0.75rem 1rem;
          border-radius: 0.85rem;
          border: 1px solid var(--border);
          background: var(--card);
          font-family: 'Outfit', sans-serif; font-size: 0.88rem; font-weight: 500;
          color: var(--text);
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
          transition: border-color 0.2s, background 0.2s, transform 0.2s;
          cursor: default;
        }
        .px-aud:hover {
          border-color: var(--border2);
          background: var(--surf);
          transform: translateX(4px);
        }

        /* ── Bullet item ── */
        .px-bullet {
          display: flex; align-items: center; gap: 0.75rem;
          padding: 0.7rem 0;
          border-bottom: 1px solid rgba(13,115,119,0.06);
        }
        .px-bullet:last-child { border-bottom: none; }

        /* ── CTA box ── */
        .px-cta {
          border-radius: 1.75rem;
          border: 1px solid var(--border);
          background: linear-gradient(135deg, var(--teal) 0%, var(--teal2) 100%);
          padding: 3rem 1.5rem;
          text-align: center;
          max-width: 720px;
          margin: 0 auto;
          position: relative; overflow: hidden;
          box-shadow: 0 24px 64px rgba(13,115,119,0.22);
        }
        .px-cta::before {
          content: '';
          position: absolute; top: -80px; left: 50%; transform: translateX(-50%);
          width: 400px; height: 300px; border-radius: 50%;
          background: radial-gradient(ellipse, rgba(255,255,255,0.1) 0%, transparent 70%);
          pointer-events: none;
        }
        .px-cta::after {
          content: '';
          position: absolute; bottom: -60px; right: -60px;
          width: 280px; height: 280px; border-radius: 50%;
          background: radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%);
          pointer-events: none;
        }

        /* ── Hero bg ── */
        .px-hero-dots {
          position: absolute; inset: 0; pointer-events: none; z-index: 0;
          background-image: radial-gradient(circle, rgba(13,115,119,0.07) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: radial-gradient(ellipse 90% 80% at 50% 0%, black 20%, transparent 100%);
        }
        .px-glow {
          position: absolute; border-radius: 50%;
          background: radial-gradient(ellipse, rgba(13,115,119,0.08) 0%, transparent 70%);
          filter: blur(70px); pointer-events: none;
        }

        /* ── Marquee ── */
        .px-marq { overflow: hidden; width: 100%; }
        .px-marq-inner {
          display: flex; gap: 1.25rem;
          width: max-content; align-items: center;
        }

        /* ── Back link ── */
        .px-back {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.6rem; letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--teal); text-decoration: none;
          transition: gap 0.2s, color 0.2s;
        }
        .px-back:hover { gap: 10px; color: var(--teal2); }

        /* ── Scrollbar ── */
        .px-wrap ::-webkit-scrollbar { width: 3px; }
        .px-wrap ::-webkit-scrollbar-track { background: transparent; }
        .px-wrap ::-webkit-scrollbar-thumb { background: rgba(13,115,119,0.2); border-radius: 99px; }

        /* ══════════ RESPONSIVE LAYOUT SYSTEM ══════════ */

        /* Section padding */
        .px-section {
          padding: 3.5rem 4vw;
        }
        @media (min-width: 640px)  { .px-section { padding: 4.5rem 5vw; } }
        @media (min-width: 1024px) { .px-section { padding: 5.5rem 5vw; } }

        /* Hero section */
        .px-hero-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
          align-items: center;
          position: relative;
          z-index: 2;
        }
        @media (min-width: 1024px) {
          .px-hero-grid { grid-template-columns: 1fr 1fr; gap: 3.5rem; }
        }

        /* Hero mockup: show first on mobile */
        .px-hero-mockup {
          order: -1;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        @media (min-width: 1024px) {
          .px-hero-mockup { order: 0; }
        }

        /* Stats grid */
        .px-stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }
        @media (min-width: 640px) {
          .px-stats-grid { grid-template-columns: repeat(4, 1fr); }
        }

        /* Feature sections two-col */
        .px-two-col {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          align-items: start;
        }
        @media (min-width: 1024px) {
          .px-two-col { grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
        }

        /* Feature section image: always top on mobile */
        .px-feat-img-left {
          order: -1;
          display: flex;
          justify-content: center;
        }
        @media (min-width: 1024px) {
          .px-feat-img-left { order: 0; }
        }

        /* Reversed section: image right on desktop, top on mobile */
        .px-feat-img-right {
          order: -1;
          display: flex;
          justify-content: center;
        }
        @media (min-width: 1024px) {
          .px-feat-img-right { order: 1; }
        }

        /* Phone in feature section: constrain height on mobile */
        .px-feat-phone {
          width: clamp(150px, 45vw, 220px) !important;
        }
        @media (min-width: 640px) {
          .px-feat-phone { width: clamp(180px, 35vw, 260px) !important; }
        }
        @media (min-width: 1024px) {
          .px-feat-phone { width: clamp(200px, 22vw, 280px) !important; }
        }

        /* Features grid */
        .px-feat-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }
        @media (min-width: 540px)  { .px-feat-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) { .px-feat-grid { grid-template-columns: repeat(3, 1fr); } }

        /* Gallery phones: wrap nicely on small screens */
        .px-gallery {
          display: flex;
          gap: 1rem;
          align-items: flex-end;
          justify-content: center;
          flex-wrap: wrap;
        }

        /* Tech grid */
        .px-tech-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }
        @media (min-width: 540px)  { .px-tech-grid { grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); } }

        /* Why section */
        .px-why-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          align-items: start;
        }
        @media (min-width: 1024px) {
          .px-why-grid { grid-template-columns: 1fr 1fr; gap: 3rem; }
        }

        /* Audience grid */
        .px-aud-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.75rem;
        }
        @media (min-width: 480px) {
          .px-aud-grid { grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); }
        }

        /* CTA buttons */
        .px-cta-btns {
          display: flex;
          flex-wrap: wrap;
          gap: 0.85rem;
          justify-content: center;
          align-items: center;
          position: relative;
          z-index: 1;
        }

        /* Hero CTAs */
        .px-hero-ctas {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          align-items: center;
        }

        /* Hero badge */
        .px-hero-badge {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        /* Slogan row */
        .px-slogan {
          display: flex;
          gap: 1.25rem;
          flex-wrap: wrap;
        }

        /* Tags row */
        .px-tags-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: 1.75rem;
        }

        /* Phone gallery item */
        .px-gallery-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
        }

        /* Gallery phones: hide some on small screens */
        @media (max-width: 540px) {
          .px-gallery-item:nth-child(n+4) { display: none; }
        }
        @media (max-width: 360px) {
          .px-gallery-item:nth-child(n+3) { display: none; }
        }

        /* CTA large padding on desktop */
        @media (min-width: 640px) {
          .px-cta { padding: 4.5rem 3rem; }
        }

        /* Why card mobile padding */
        @media (max-width: 640px) {
          .px-why { padding: 1.5rem; }
        }
      `}</style>

      <div ref={pageRef} className="px-wrap">

        {/* ══════════ BACK NAV ══════════ */}
        <div style={{ padding: '1.5rem 4vw 0', position: 'relative', zIndex: 20 }}>
          <Link to="/" className="px-back">
            <ChevronLeft style={{ width: 13, height: 13 }} />
            Back to Showcase
          </Link>
        </div>

        {/* ══════════ HERO ══════════ */}
        <section ref={heroRef} style={{
          position: 'relative', overflow: 'hidden',
          padding: 'clamp(2.5rem,5vw,5rem) 4vw clamp(3.5rem,6vw,7rem)',
        }}>
          <div className="px-hero-dots" />
          <div className="px-glow" style={{ width: 650, height: 650, top: '-25%', right: '-8%' }} />
          <div className="px-glow" style={{ width: 400, height: 400, bottom: '-20%', left: '-5%', opacity: 0.6 }} />

          <div className="px-hero-grid">

            {/* Text */}
            <div>
              <div className="px-h-anim px-hero-badge">
                <div style={{
                  width: 60, height: 60, borderRadius: '1.3rem', overflow: 'hidden',
                  border: '2px solid rgba(13,115,119,0.2)',
                  boxShadow: '0 8px 28px rgba(13,115,119,0.18)',
                  flexShrink: 0,
                }}>
                  <img src={planixLogo} alt="Planix Logo" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>
                <div>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace", fontSize: '0.55rem',
                    letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--teal)',
                    marginBottom: 4,
                  }}>
                    Premium Productivity App
                  </div>
                  <div style={{
                    fontFamily: "'Lora', Georgia, serif", fontSize: '1.4rem',
                    fontWeight: 700, color: 'var(--text)', lineHeight: 1,
                  }}>
                    Planix
                  </div>
                </div>
              </div>

              <h1 className="px-h-anim px-display" style={{ fontSize: 'clamp(2.6rem, 7vw, 5.8rem)', margin: 0 }}>
                Plan smarter.<br />
                <span style={{ color: 'var(--teal)' }}>Live clearer.</span>
              </h1>

              <p className="px-h-anim px-body" style={{ marginTop: '1.5rem', maxWidth: '36rem', fontSize: 'clamp(0.9rem, 2vw, 1.05rem)', lineHeight: 1.75 }}>
                A premium productivity and scheduling app — organize events, reminders, birthdays, and tasks in one beautifully crafted, calm experience.
              </p>

              <div className="px-h-anim px-tags-row">
                {['React Native', 'Google Calendar', 'Expo SDK 54', 'Node.js', 'MongoDB'].map(t => (
                  <span key={t} className="px-tag">{t}</span>
                ))}
              </div>

              <div className="px-h-anim px-hero-ctas" style={{ marginTop: '2rem' }}>
                <a href="https://expo.dev/artifacts/eas/8bXctf9BDtMXze8sqsCBdA.apk" className="px-btn-primary">
                  <ArrowDown style={{ width: 16, height: 16 }} /> Download APK
                </a>
                <a href="#features" className="px-btn-outline">
                  Explore Features <ChevronRight style={{ width: 14, height: 14 }} />
                </a>
                <a href="https://planix-omega.vercel.app/" className="px-btn-outline">
                  <Play style={{ width: 13, height: 13 }} /> View Demo
                </a>
              </div>

              <div className="px-h-anim px-slogan" style={{ marginTop: '2rem' }}>
                {['Plan.', 'Organize.', 'Achieve.'].map(w => (
                  <span key={w} style={{
                    fontFamily: "'Lora', serif", fontWeight: 700,
                    fontSize: '1rem', color: 'var(--teal)', opacity: 0.8,
                  }}>{w}</span>
                ))}
              </div>
            </div>

            {/* Mockup */}
            <div className="px-hero-mockup">
              <div ref={mockRef} style={{
                filter: 'drop-shadow(0 32px 80px rgba(13,115,119,0.18)) drop-shadow(0 8px 24px rgba(0,0,0,0.1))',
                willChange: 'transform',
              }}>
                <img
                  src={appMockup}
                  alt="Planix App Mockup"
                  style={{ width: 'clamp(200px, 45vw, 420px)', display: 'block', userSelect: 'none' }}
                  draggable={false}
                />
              </div>
            </div>
          </div>
        </section>

        <div className="px-div" />

        {/* ══════════ STATS ══════════ */}
        <section className="px-section">
          <div className="px-stagger px-stats-grid">
            {STATS.map(({ value, suffix, label, sub }) => (
              <div key={label} className="px-stat">
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', gap: 4, marginBottom: '0.5rem' }}>
                  <span
                    className="px-count"
                    data-val={value + suffix}
                    style={{
                      fontFamily: "'Lora', serif", fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', fontWeight: 700,
                      color: 'var(--teal)', lineHeight: 1,
                    }}
                  >{value}{suffix}</span>
                </div>
                <div className="px-body" style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--text)', marginBottom: '0.25rem' }}>{label}</div>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: '0.5rem',
                  letterSpacing: '0.1em', color: 'var(--text3)', textTransform: 'uppercase',
                }}>{sub}</div>
              </div>
            ))}
          </div>
        </section>

        <div className="px-div" />

        {/* ══════════ FEATURE SECTIONS ══════════ */}
        {SECTIONS.map(({ label, title, accent, body, bullets, img, imgAlt, reverse }, idx) => (
          <section key={label} className="px-section" style={{
            background: idx % 2 === 1
              ? 'linear-gradient(180deg, transparent 0%, rgba(13,115,119,0.025) 50%, transparent 100%)'
              : 'transparent',
            overflow: 'visible',
          }}>
            <div className="px-two-col">

              {/* Image: always top on mobile */}
              <div className={`px-reveal ${reverse ? 'px-feat-img-right' : 'px-feat-img-left'}`}>
                <Phone src={img} alt={imgAlt} style={{ width: undefined }} className="px-feat-phone" />
              </div>

              {/* Text */}
              <div className="px-reveal">
                <div className="px-label">{label}</div>
                <h2 className="px-h2">
                  {title}<br /><span className="ac">{accent}</span>
                </h2>
                <div style={{ height: 1, background: 'var(--border)', margin: '1.25rem 0' }} />
                <p className="px-body">{body}</p>
                <div style={{ marginTop: '1.5rem' }}>
                  {bullets.map(b => (
                    <div key={b} className="px-bullet">
                      <CheckCircle2 style={{ width: 15, height: 15, color: 'var(--teal)', flexShrink: 0 }} />
                      <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: '0.92rem', color: 'var(--text2)' }}>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ))}

        <div className="px-div" />

        {/* ══════════ FEATURES GRID ══════════ */}
        <section id="features" className="px-section">
          <div className="px-reveal" style={{ textAlign: 'center', maxWidth: 540, margin: '0 auto 3rem' }}>
            <div className="px-label" style={{ justifyContent: 'center' }}>Core Features</div>
            <h2 className="px-h2">
              Everything you need<br />
              <span className="ac">in one calm app.</span>
            </h2>
          </div>

          <div className="px-feat-grid">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="px-feat">
                <div style={{
                  width: 44, height: 44, borderRadius: '0.875rem', marginBottom: '1.1rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(13,115,119,0.08)',
                  border: '1px solid rgba(13,115,119,0.12)',
                }}>
                  <Icon style={{ width: 20, height: 20, color: 'var(--teal)' }} />
                </div>
                <div style={{
                  fontFamily: "'Outfit',sans-serif", fontWeight: 600,
                  fontSize: '1rem', color: 'var(--text)', marginBottom: '0.5rem',
                }}>
                  {title}
                </div>
                <div className="px-body" style={{ fontSize: '0.86rem' }}>{desc}</div>
              </div>
            ))}
          </div>
        </section>

        <div className="px-div" />

        {/* ══════════ GALLERY ══════════ */}
        <section className="px-section" style={{ textAlign: 'center' }}>
          <div className="px-reveal" style={{ marginBottom: '3rem' }}>
            <div className="px-label" style={{ justifyContent: 'center' }}>Interface Gallery</div>
            <h2 className="px-h2">
              Beautiful screens,<br />
              <span className="ac">every detail considered.</span>
            </h2>
          </div>

          <div className="px-reveal px-gallery">
            {SCREENS.map(({ src, alt, label, rot }) => (
              <div key={alt} className="px-gallery-item">
                <Phone
                  src={src} alt={alt}
                  style={{ transform: `rotate(${rot}deg)`, transformOrigin: 'center bottom' }}
                />
                <span style={{
                  fontFamily: "'JetBrains Mono',monospace", fontSize: '0.55rem',
                  letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text3)',
                }}>{label}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="px-div" />

        {/* ══════════ MARQUEE ══════════ */}
        <section style={{ padding: '2.5rem 0', overflow: 'hidden' }}>
          <div className="px-marq">
            <div className="px-marq-inner">
              {MARQUEE.map((item, i) => (
                <span key={i} style={{
                  fontFamily: "'JetBrains Mono',monospace",
                  fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: i % 2 === 0 ? 'var(--teal)' : 'var(--text3)',
                  padding: '0.4rem 1.1rem',
                  border: '1px solid var(--border)',
                  borderRadius: '100px',
                  background: 'var(--card)',
                  flexShrink: 0,
                  boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                }}>{item}</span>
              ))}
            </div>
          </div>
        </section>

        <div className="px-div" />

        {/* ══════════ TECH STACK ══════════ */}
        <section className="px-section" style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(13,115,119,0.025) 50%, transparent 100%)',
        }}>
          <div className="px-reveal" style={{ marginBottom: '2.5rem' }}>
            <div className="px-label">Technology</div>
            <h2 className="px-h2">
              Built with the<br />
              <span className="ac">best stack.</span>
            </h2>
          </div>

          <div className="px-stagger px-tech-grid">
            {TECH.map(({ label, color, items }) => (
              <div key={label} className="px-tech">
                <div style={{
                  fontFamily: "'JetBrains Mono',monospace", fontSize: '0.58rem',
                  letterSpacing: '0.15em', textTransform: 'uppercase',
                  color, marginBottom: '1.25rem',
                  display: 'flex', alignItems: 'center', gap: 8,
                }}>
                  <span style={{ width: 14, height: 1, background: color, display: 'inline-block' }} />
                  {label}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {items.map(item => (
                    <span key={item} style={{
                      padding: '0.3rem 0.75rem', borderRadius: '100px',
                      fontFamily: "'Outfit',sans-serif", fontSize: '0.78rem', fontWeight: 400,
                      background: `${color}12`, border: `1px solid ${color}28`, color: 'var(--text)',
                    }}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="px-div" />

        {/* ══════════ WHY PLANIX ══════════ */}
        <section className="px-section">
          <div className="px-why-grid">

            <div className="px-reveal">
              <div className="px-label">Perfect For</div>
              <h2 className="px-h2">
                Productivity that<br />
                <span className="ac">adapts to you.</span>
              </h2>
              <div style={{ height: 1, background: 'var(--border)', margin: '1.25rem 0' }} />
              <p className="px-body" style={{ marginBottom: '1.75rem' }}>
                Planix bridges the gap between complex calendar apps and the simplicity users actually need. Smart enough for professionals, calm enough for everyday life.
              </p>
              <div className="px-aud-grid">
                {['Professionals', 'Students', 'Freelancers', 'Families'].map(l => (
                  <div key={l} className="px-aud">
                    <User style={{ width: 14, height: 14, color: 'var(--teal)', flexShrink: 0 }} />
                    {l}
                  </div>
                ))}
              </div>
            </div>

            <div className="px-reveal px-why">
              <div style={{
                fontFamily: "'JetBrains Mono',monospace", fontSize: '0.56rem',
                letterSpacing: '0.18em', textTransform: 'uppercase',
                color: 'var(--teal)', marginBottom: '1rem',
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <span style={{ width: 14, height: 1, background: 'var(--teal)', display: 'inline-block' }} />
                Design Philosophy
              </div>
              <h3 style={{
                fontFamily: "'Lora',serif", fontWeight: 700,
                fontSize: 'clamp(1.25rem, 3vw, 2rem)',
                lineHeight: 1.12, color: 'var(--text)', marginBottom: '1.1rem',
              }}>
                Calm productivity, beautifully executed.
              </h3>
              <p className="px-body">
                Planix follows a clean design system focused on simplicity, readability, motion, and fluid interactions — inspired by modern productivity platforms and premium mobile ecosystems.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1.5rem' }}>
                {['Simplicity', 'Readability', 'Motion', 'Accessibility', 'Calm UX'].map(t => (
                  <span key={t} className="px-tag">{t}</span>
                ))}
              </div>
              <p className="px-body" style={{ marginTop: '1.1rem', color: 'var(--teal)', fontStyle: 'italic' }}>
                Clarity through better planning.
              </p>
            </div>
          </div>
        </section>

        <div className="px-div" />

        {/* ══════════ CTA ══════════ */}
        <section className="px-section" style={{ paddingBottom: 'clamp(3.5rem, 7vw, 7rem)' }}>
          <div className="px-reveal px-cta">
            <div style={{
              fontFamily: "'JetBrains Mono',monospace", fontSize: '0.56rem',
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.7)', marginBottom: '1rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}>
              <span style={{ width: 14, height: 1, background: 'rgba(255,255,255,0.5)', display: 'inline-block' }} />
              Ready to plan better?
            </div>
            <h2 style={{
              fontFamily: "'Lora',serif", fontWeight: 700,
              fontSize: 'clamp(1.75rem, 4vw, 3rem)', lineHeight: 1.08,
              color: '#fff', marginBottom: '1rem', position: 'relative', zIndex: 1,
            }}>
              Experience a smarter,<br />calmer schedule.
            </h2>
            <p style={{
              fontFamily: "'Outfit',sans-serif", fontWeight: 300,
              color: 'rgba(255,255,255,0.75)', fontSize: 'clamp(0.88rem, 2vw, 1rem)', lineHeight: 1.7,
              maxWidth: 440, margin: '0 auto 2.25rem',
              position: 'relative', zIndex: 1,
            }}>
              Planix combines calendar management, reminders, smart notifications, and elegant design into one seamless experience.
            </p>
            <div className="px-cta-btns">
              <a href="https://expo.dev/artifacts/eas/8bXctf9BDtMXze8sqsCBdA.apk" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '0.85rem 1.6rem', borderRadius: '0.75rem',
                background: '#fff', color: 'var(--teal)',
                fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: '0.9rem',
                textDecoration: 'none',
                boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                position: 'relative', zIndex: 1,
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = ''; }}
              >
                <Download style={{ width: 16, height: 16 }} /> Download APK
              </a>
              <a href="https://github.com/rumman2004/Planix---Mobile" target="_blank" rel="noopener noreferrer" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '0.85rem 1.6rem', borderRadius: '0.75rem',
                background: 'rgba(255,255,255,0.12)', color: '#fff',
                fontFamily: "'Outfit',sans-serif", fontWeight: 400, fontSize: '0.9rem',
                textDecoration: 'none',
                border: '1px solid rgba(255,255,255,0.25)',
                transition: 'background 0.2s, transform 0.2s',
                position: 'relative', zIndex: 1,
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.18)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.12)'; }}
              >
                <Code2 style={{ width: 15, height: 15 }} /> GitHub
              </a>
              <a href="https://planix-omega.vercel.app/" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '0.85rem 1.6rem', borderRadius: '0.75rem',
                background: 'rgba(255,255,255,0.12)', color: '#fff',
                fontFamily: "'Outfit',sans-serif", fontWeight: 400, fontSize: '0.9rem',
                textDecoration: 'none',
                border: '1px solid rgba(255,255,255,0.25)',
                transition: 'background 0.2s, transform 0.2s',
                position: 'relative', zIndex: 1,
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.18)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.12)'; }}
              >
                <ExternalLink style={{ width: 14, height: 14 }} /> Live Demo
              </a>
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default Planix;