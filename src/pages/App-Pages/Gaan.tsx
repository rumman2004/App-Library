import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ChevronLeft, Download, ArrowUpRight, Code2,
  Volume2, Fingerprint, Languages, Users,
  Headphones, Globe, Sparkles,
  Music,
} from 'lucide-react';
import { FaDiscord, FaTelegramPlane } from 'react-icons/fa';

import { Images } from '../../data/images';

gsap.registerPlugin(ScrollTrigger);

// ─── Links ─────────────────────────────────────────────────────────────────────
const GITHUB   = 'https://github.com/rumman2004/Gaan';
const DOWNLOAD = 'https://github.com/rumman2004/Gaan/releases/latest/download/Gaan.apk';
const DISCORD  = 'https://discord.gg/EcfV3AxH5c';
const TELEGRAM = 'https://t.me/EchoMusicApp';

// ─── Data ──────────────────────────────────────────────────────────────────────
const FEATURES = [
  { icon: Volume2,     title: 'Zero Ads, Pure Sound',       desc: 'Stream millions of tracks without a single interruption — with support for lossless 16-bit and 24-bit FLAC audio.', size: 'large' },
  { icon: Languages,   title: 'Synced Lyrics',              desc: 'Word-by-word lyrics with multiple animation styles, transliteration, and AI translation.', size: 'small' },
  { icon: Fingerprint, title: 'Echo Find',                  desc: 'On-device audio fingerprinting identifies any song playing around you — like Shazam, built right in.', size: 'small' },
  { icon: Users,       title: 'Listen Together',            desc: 'Sync playback with friends in real time — create rooms, share queues, and experience music as a shared moment.', size: 'large' },
];

const STATS = [
  { value: '40+',  label: 'Languages',       icon: Globe },
  { value: '24',   label: 'Bit Lossless',    icon: Headphones },
  { value: '100%', label: 'Open Source',      icon: Code2 },
  { value: '∞',    label: 'Ad-Free Tracks',  icon: Music },
];

const TECH = [
  { title: 'Language & UI',   items: ['Kotlin', 'Jetpack Compose', 'Material 3', 'Material You'] },
  { title: 'Media & Audio',   items: ['AndroidX Media3', 'ExoPlayer', 'HLS Streaming', 'FLAC Decoder'] },
  { title: 'Networking',      items: ['Ktor Client', 'Retrofit', 'OkHttp', 'REST APIs'] },
  { title: 'Data Layer',      items: ['Room (SQLite)', 'Protocol Buffers', 'Kotlin Serialization', 'DataStore'] },
  { title: 'Architecture',    items: ['MVVM', 'Hilt (DI)', 'Coroutines', 'Flow'] },
  { title: 'Special Engines', items: ['ShazamKit', 'Echo Brain', 'Unison Protocol', 'Multi-Provider Lyrics'] },
  { title: 'Build & CI',      items: ['Gradle KTS', 'GitHub Actions', 'FOSS/GMS Flavors', 'API 26–36'] },
];

const SCREENSHOTS = [
  { key: 'home',       src: Images.gaan.home,       label: 'Home' },
  { key: 'nowPlaying', src: Images.gaan.nowPlaying,  label: 'Now Playing' },
  { key: 'lyrics',     src: Images.gaan.lyrics,      label: 'Synced Lyrics' },
  { key: 'search',     src: Images.gaan.search,      label: 'Search' },
  { key: 'library',    src: Images.gaan.library,     label: 'Library' },
  { key: 'recognize',  src: Images.gaan.recognize,   label: 'Echo Find' },
];

const MARQUEE_ITEMS = [
  'Kotlin', 'Compose', 'Material 3', 'Media3', 'ExoPlayer',
  'Room', 'Ktor', 'ShazamKit', 'Hilt', 'Flow', 'Protobuf', 'FLAC',
];

// ─── Component ──────────────────────────────────────────────────────────────────
const Gaan = () => {
  const pageRef   = useRef(null);
  const heroRef   = useRef(null);
  const mockupRef = useRef(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── hero entrance ──
      gsap.fromTo('.gn-hero-text > *',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0, stagger: 0.12, ease: 'expo.out', delay: 0.1 }
      );

      gsap.fromTo(mockupRef.current,
        { y: 100, opacity: 0, scale: 0.92 },
        { y: 0, opacity: 1, scale: 1, duration: 1.4, ease: 'expo.out', delay: 0.35 }
      );
      gsap.to(mockupRef.current, { y: '-=12', duration: 4, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 2 });

      // ── equalizer bars ──
      gsap.utils.toArray('.gn-eq-bar').forEach((bar: any, i) => {
        gsap.to(bar, {
          scaleY: 0.3 + Math.random() * 0.7,
          duration: 0.4 + Math.random() * 0.4,
          yoyo: true, repeat: -1,
          ease: 'sine.inOut',
          delay: i * 0.08,
        });
      });

      // ── section reveals ──
      gsap.utils.toArray('.gn-reveal').forEach((el: any) => {
        gsap.fromTo(el,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
          }
        );
      });

      // ── stagger children ──
      gsap.utils.toArray('.gn-stagger').forEach((c: any) => {
        if (c.children.length) {
          gsap.fromTo(c.children,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out',
              scrollTrigger: { trigger: c, start: 'top 85%', toggleActions: 'play none none none' },
            }
          );
        }
      });

      // ── stat count-up ──
      gsap.utils.toArray('.gn-stat-num').forEach((el: any) => {
        ScrollTrigger.create({
          trigger: el, start: 'top 90%', once: true,
          onEnter: () => {
            const raw = el.dataset.val || '';
            const m = raw.match(/^[\d.]+/);
            if (m) {
              const end = parseFloat(m[0]);
              const suffix = raw.slice(m[0].length);
              gsap.fromTo({ v: 0 }, { v: 0 }, {
                v: end, duration: 2.2, ease: 'power2.out',
                onUpdate() {
                  const v = this.targets()[0].v;
                  el.textContent = (Number.isInteger(end) ? Math.round(v) : v.toFixed(1)) + suffix;
                },
              });
            }
          },
        });
      });

      // ── marquee ──
      const strip = document.querySelector('.gn-mq-inner');
      if (strip) gsap.to(strip, { x: '-50%', duration: 28, ease: 'none', repeat: -1 });

      // ── carousel screenshots reveal ──
      gsap.fromTo('.gn-carousel-wrap',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.gn-carousel-wrap', start: 'top 85%', toggleActions: 'play none none none' },
        }
      );

    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

        /* ═══════════════════════════════════════════════════
           GAAN — Material Design 3 Dark Immersive Theme
           Surface: M3 tonal elevation · Olive-green primary
           ═══════════════════════════════════════════════════ */
        .gn-page {
          /* M3 tonal surfaces (dark scheme, olive-green seed) */
          --gn-bg:             #0E1210;
          --gn-surface:        #1A1F1B;
          --gn-surfaceCont:    #1E2320;
          --gn-surfaceContHi:  #282D29;
          --gn-surfaceContHst: #333832;
          --gn-surfaceBright:  #3A3F3A;

          /* primary olive-green */
          --gn-primary:        #A0D4A0;
          --gn-onPrimary:      #0B3A18;
          --gn-primaryCont:    #1B5A2D;
          --gn-onPrimaryCont:  #BBEDBB;

          /* secondary */
          --gn-secondary:      #B7CCB7;
          --gn-secondaryCont:  #384A38;

          /* tertiary lavender */
          --gn-tertiary:       #A3CDDB;
          --gn-tertiaryCont:   #1E4D5A;

          /* text */
          --gn-onSurface:      #E1E3DF;
          --gn-onSurfaceVar:   #C1C9C0;
          --gn-outline:        #8B938A;
          --gn-outlineVar:     #414941;

          /* error brand */
          --gn-error:          #FFB4AB;
          --gn-errorCont:      #93000A;

          /* M3 elevation overlay */
          --gn-elev1:          rgba(160,212,160,0.05);
          --gn-elev2:          rgba(160,212,160,0.08);
          --gn-elev3:          rgba(160,212,160,0.11);

          /* motion */
          --gn-easeStd:        cubic-bezier(0.2, 0, 0, 1);
          --gn-easeDec:        cubic-bezier(0.4, 0, 0, 1);
          --gn-easeAcc:        cubic-bezier(0.3, 0, 0.8, 0.15);

          background: var(--gn-bg);
          color: var(--gn-onSurface);
          font-family: 'Inter', system-ui, sans-serif;
          min-height: 100vh;
          overflow-x: hidden;
          padding-top: 5rem;
          position: relative;
        }
        .gn-page *, .gn-page *::before, .gn-page *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* ── Type scale (M3) ── */
        .gn-display-lg {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(3rem, 8vw, 6rem);
          font-weight: 800;
          line-height: 0.95;
          letter-spacing: -0.04em;
          color: var(--gn-onSurface);
        }
        .gn-display-sm {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(1.8rem, 4vw, 2.8rem);
          font-weight: 600;
          line-height: 1.1;
          letter-spacing: -0.02em;
          color: var(--gn-onSurface);
        }
        .gn-headline {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(1.5rem, 3vw, 2.2rem);
          font-weight: 600;
          line-height: 1.15;
          letter-spacing: -0.015em;
        }
        .gn-title-lg {
          font-family: 'Inter', sans-serif;
          font-size: 1.25rem;
          font-weight: 600;
          line-height: 1.3;
        }
        .gn-body-lg {
          font-family: 'Inter', sans-serif;
          font-size: 1.0625rem;
          font-weight: 400;
          line-height: 1.7;
          color: var(--gn-onSurfaceVar);
        }
        .gn-body-md {
          font-family: 'Inter', sans-serif;
          font-size: 0.9375rem;
          font-weight: 400;
          line-height: 1.65;
          color: var(--gn-onSurfaceVar);
        }
        .gn-label-lg {
          font-family: 'Inter', sans-serif;
          font-size: 0.875rem;
          font-weight: 600;
          letter-spacing: 0.01em;
        }
        .gn-label-sm {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.6875rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--gn-primary);
        }

        /* ── Accent highlight ── */
        .gn-accent { color: var(--gn-primary); }

        /* ── M3 Filled Tonal Button ── */
        .gn-btn-tonal {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 0 24px; height: 48px; border-radius: 24px;
          background: var(--gn-primaryCont); color: var(--gn-onPrimaryCont);
          font-family: 'Inter', sans-serif; font-weight: 600; font-size: 0.9rem;
          letter-spacing: 0.01em;
          text-decoration: none; border: none; cursor: pointer;
          transition: all 0.3s var(--gn-easeStd);
          position: relative; overflow: hidden;
        }
        .gn-btn-tonal::before {
          content: ''; position: absolute; inset: 0;
          background: var(--gn-onPrimaryCont); opacity: 0;
          transition: opacity 0.2s;
        }
        .gn-btn-tonal:hover { transform: translateY(-2px); box-shadow: 0 6px 24px rgba(160,212,160,0.2); }
        .gn-btn-tonal:hover::before { opacity: 0.08; }

        /* ── M3 Outlined Button ── */
        .gn-btn-outlined {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 0 24px; height: 48px; border-radius: 24px;
          background: transparent; color: var(--gn-primary);
          font-family: 'Inter', sans-serif; font-weight: 600; font-size: 0.9rem;
          letter-spacing: 0.01em;
          text-decoration: none; border: 1px solid var(--gn-outline); cursor: pointer;
          transition: all 0.3s var(--gn-easeStd);
        }
        .gn-btn-outlined:hover { background: var(--gn-elev2); border-color: var(--gn-primary); transform: translateY(-2px); }

        /* ── M3 Cards ── */
        .gn-card-filled {
          border-radius: 28px;
          background: var(--gn-surfaceCont);
          border: 1px solid var(--gn-outlineVar);
          transition: all 0.35s var(--gn-easeStd);
          position: relative; overflow: hidden;
        }
        .gn-card-filled:hover {
          background: var(--gn-surfaceContHi);
          border-color: var(--gn-outline);
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.35);
        }

        .gn-card-elevated {
          border-radius: 20px;
          background: linear-gradient(135deg, var(--gn-surfaceCont) 0%, var(--gn-surfaceContHi) 100%);
          box-shadow: 0 2px 8px rgba(0,0,0,0.2), 0 0 0 1px var(--gn-outlineVar);
          transition: all 0.35s var(--gn-easeStd);
          position: relative; overflow: hidden;
        }
        .gn-card-elevated::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, var(--gn-elev1) 0%, transparent 50%);
          pointer-events: none;
        }
        .gn-card-elevated:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px var(--gn-outline);
        }

        /* ── M3 Chip ── */
        .gn-chip {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 6px 16px; height: 32px; border-radius: 8px;
          font-family: 'Inter', sans-serif; font-size: 0.8rem; font-weight: 500;
          background: var(--gn-surfaceContHi); color: var(--gn-onSurfaceVar);
          border: 1px solid var(--gn-outlineVar);
          transition: all 0.25s var(--gn-easeStd);
          white-space: nowrap;
        }
        .gn-chip:hover { border-color: var(--gn-primary); color: var(--gn-primary); background: var(--gn-elev2); }

        /* ── Navigation ── */
        .gn-back-link {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: 'Inter', sans-serif; font-size: 0.8rem;
          font-weight: 500; color: var(--gn-onSurfaceVar);
          text-decoration: none;
          transition: all 0.25s var(--gn-easeStd);
        }
        .gn-back-link:hover { color: var(--gn-primary); gap: 10px; }

        /* ── Section label ── */
        .gn-section-label {
          display: inline-flex; align-items: center; gap: 10px;
          margin-bottom: 1rem;
        }
        .gn-section-label::before {
          content: '';
          width: 24px; height: 2px;
          background: var(--gn-primary);
          border-radius: 1px;
        }

        /* ── Layout ── */
        .gn-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 clamp(1.25rem, 5vw, 3rem);
        }
        .gn-section {
          padding: clamp(4rem, 8vw, 7rem) 0;
        }

        /* ═══════════ HERO ═══════════ */
        .gn-hero {
          position: relative;
          text-align: center;
          padding: clamp(2rem, 6vw, 5rem) 0 clamp(3rem, 8vw, 6rem);
          overflow: hidden;
        }
        .gn-hero-glow {
          position: absolute; inset: 0; pointer-events: none; z-index: 0;
        }
        .gn-hero-glow::before {
          content: ''; position: absolute;
          width: 900px; height: 900px;
          top: -40%; left: 50%; transform: translateX(-50%);
          background: radial-gradient(circle, rgba(27,90,45,0.35) 0%, rgba(27,90,45,0.1) 35%, transparent 65%);
          border-radius: 9999px;
          animation: gn-breathe 8s ease-in-out infinite;
        }
        .gn-hero-glow::after {
          content: ''; position: absolute;
          width: 500px; height: 500px;
          bottom: -10%; right: 10%;
          background: radial-gradient(circle, rgba(160,212,160,0.08) 0%, transparent 50%);
          border-radius: 9999px;
          animation: gn-breathe 12s ease-in-out infinite reverse;
        }
        @keyframes gn-breathe {
          0%, 100% { transform: translateX(-50%) scale(1); opacity: 1; }
          50%      { transform: translateX(-50%) scale(1.1); opacity: 0.7; }
        }

        .gn-hero-text {
          position: relative; z-index: 2;
          display: flex; flex-direction: column; align-items: center; gap: 0;
        }
        .gn-hero-badge {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 6px 6px 6px 8px; border-radius: 100px;
          background: var(--gn-surfaceCont); border: 1px solid var(--gn-outlineVar);
          margin-bottom: 2rem;
        }
        .gn-hero-badge img {
          width: 32px; height: 32px; border-radius: 10px;
        }
        .gn-hero-title { margin-bottom: 1.5rem; }
        .gn-hero-sub { max-width: 560px; margin-bottom: 2rem; }
        .gn-hero-chips { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; margin-bottom: 2.5rem; }
        .gn-hero-ctas { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; margin-bottom: clamp(3rem, 6vw, 5rem); }

        /* ── Hero desktop mockup ── */
        .gn-hero-mockup {
          position: relative; z-index: 2;
          display: flex; justify-content: center;
          width: 100%;
        }
        .gn-hero-mockup img {
          width: clamp(320px, 72vw, 820px);
          height: auto;
          display: block;
          filter: drop-shadow(0 30px 60px rgba(0,0,0,0.45)) drop-shadow(0 0 80px rgba(27,90,45,0.12));
          transition: all 0.4s var(--gn-easeStd);
        }
        .gn-hero-mockup:hover img {
          filter: drop-shadow(0 35px 70px rgba(0,0,0,0.5)) drop-shadow(0 0 100px rgba(160,212,160,0.15));
          transform: translateY(-4px);
        }

        /* ── Equalizer decoration ── */
        .gn-eq {
          display: flex; align-items: flex-end; justify-content: center; gap: 3px;
          height: 32px; margin-bottom: 2rem;
        }
        .gn-eq-bar {
          width: 3px; border-radius: 2px;
          background: var(--gn-primary);
          transform-origin: bottom;
          opacity: 0.6;
        }

        /* ═══════════ MARQUEE ═══════════ */
        .gn-marquee-wrap {
          border-top: 1px solid var(--gn-outlineVar);
          border-bottom: 1px solid var(--gn-outlineVar);
          background: var(--gn-elev1);
          padding: 1.25rem 0;
          overflow: hidden;
        }
        .gn-mq-inner { display: flex; width: max-content; align-items: center; }
        .gn-mq-item {
          font-family: 'Outfit', sans-serif; font-weight: 500;
          font-size: clamp(1.1rem, 2.5vw, 1.8rem);
          color: var(--gn-onSurfaceVar);
          padding: 0 1.5rem; white-space: nowrap;
          display: flex; align-items: center; gap: 2rem;
        }
        .gn-mq-item::after {
          content: ''; width: 5px; height: 5px; border-radius: 50%;
          background: var(--gn-primary); opacity: 0.5;
        }

        /* ═══════════ STATS ═══════════ */
        .gn-stats {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1px;
          background: var(--gn-outlineVar);
          border-radius: 28px;
          overflow: hidden;
        }
        @media (min-width: 640px) { .gn-stats { grid-template-columns: repeat(4, 1fr); } }
        .gn-stat-cell {
          background: var(--gn-surfaceCont);
          padding: clamp(1.5rem, 3vw, 2.5rem);
          display: flex; flex-direction: column; align-items: center;
          text-align: center; gap: 0.75rem;
          transition: background 0.3s var(--gn-easeStd);
        }
        .gn-stat-cell:hover { background: var(--gn-surfaceContHi); }
        .gn-stat-icon {
          width: 44px; height: 44px; border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          background: var(--gn-elev2); border: 1px solid var(--gn-outlineVar);
        }
        .gn-stat-num-wrap {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(2rem, 4vw, 2.8rem);
          font-weight: 700;
          color: var(--gn-primary);
          line-height: 1;
        }

        /* ═══════════ BENTO FEATURES ═══════════ */
        .gn-bento {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        @media (min-width: 768px) {
          .gn-bento {
            grid-template-columns: 1.2fr 0.8fr;
            grid-template-rows: auto auto;
          }
        }
        .gn-bento-item { padding: clamp(1.75rem, 3vw, 2.5rem); }
        .gn-bento-icon {
          width: 56px; height: 56px; border-radius: 18px;
          display: flex; align-items: center; justify-content: center;
          background: var(--gn-elev2);
          border: 1px solid var(--gn-outlineVar);
          margin-bottom: 1.25rem;
        }

        /* ═══════════ SCREENSHOT CAROUSEL (INFINITE) ═══════════ */
        .gn-carousel-wrap {
          overflow: hidden;
          padding: 2rem 0;
          position: relative;
        }
        .gn-carousel-wrap::before, .gn-carousel-wrap::after {
          content: ''; position: absolute; top: 0; bottom: 0;
          width: clamp(20px, 8vw, 100px); z-index: 2; pointer-events: none;
        }
        .gn-carousel-wrap::before {
          left: 0; background: linear-gradient(to right, var(--gn-bg), transparent);
        }
        .gn-carousel-wrap::after {
          right: 0; background: linear-gradient(to left, var(--gn-bg), transparent);
        }
        .gn-carousel-inner {
          display: flex; gap: 20px;
          width: max-content;
          animation: gn-scroll-inf 40s linear infinite;
        }
        .gn-carousel-inner:hover {
          animation-play-state: paused;
        }
        @keyframes gn-scroll-inf {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 10px)); }
        }
        .gn-ss-card {
          flex: 0 0 auto;
          display: flex; flex-direction: column; align-items: center; gap: 1rem;
        }
        .gn-ss-card img {
          width: clamp(180px, 36vw, 240px);
          border-radius: 20px;
          border: 1px solid var(--gn-outlineVar);
          box-shadow: 0 16px 48px rgba(0,0,0,0.35);
          transition: all 0.35s var(--gn-easeStd);
        }
        .gn-ss-card:hover img {
          transform: translateY(-6px) scale(1.03);
          box-shadow: 0 24px 64px rgba(0,0,0,0.45), 0 0 40px rgba(160,212,160,0.08);
          border-color: var(--gn-primary);
        }
        .gn-ss-label {
          font-family: 'Inter', sans-serif; font-size: 0.8rem;
          font-weight: 500; color: var(--gn-onSurfaceVar);
          opacity: 0.6;
          transition: all 0.25s;
        }
        .gn-ss-card:hover .gn-ss-label { opacity: 1; color: var(--gn-primary); }

        /* ═══════════ TECH STACK ═══════════ */
        .gn-tech-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
        }
        @media (min-width: 640px) { .gn-tech-grid { grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); } }
        .gn-tech-card { padding: 1.5rem; }
        .gn-tech-title {
          display: flex; align-items: center; gap: 8px;
          margin-bottom: 1rem;
        }
        .gn-tech-title::before {
          content: ''; width: 3px; height: 16px;
          border-radius: 2px; background: var(--gn-primary);
        }
        .gn-tech-pills { display: flex; flex-wrap: wrap; gap: 6px; }

        /* ═══════════ COMMUNITY ═══════════ */
        .gn-community-grid {
          display: grid; grid-template-columns: 1fr; gap: 16px;
        }
        @media (min-width: 640px) { .gn-community-grid { grid-template-columns: 1fr 1fr; } }
        .gn-community-card {
          padding: 2rem; text-align: center; text-decoration: none;
          display: flex; flex-direction: column; align-items: center; gap: 1rem;
        }
        .gn-community-icon {
          width: 56px; height: 56px; border-radius: 18px;
          display: flex; align-items: center; justify-content: center;
        }

        /* ═══════════ FINAL CTA ═══════════ */
        .gn-cta-section {
          position: relative; overflow: hidden;
          border-radius: 32px;
          background: linear-gradient(160deg, var(--gn-primaryCont) 0%, var(--gn-surfaceCont) 50%, var(--gn-surfaceContHi) 100%);
          border: 1px solid var(--gn-outlineVar);
          padding: clamp(3rem, 6vw, 5rem) clamp(1.5rem, 4vw, 3rem);
          text-align: center;
        }
        .gn-cta-section::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(ellipse at 30% 20%, rgba(160,212,160,0.08) 0%, transparent 60%);
          pointer-events: none;
        }
        .gn-notes-float { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
        .gn-note-f {
          position: absolute; font-size: 1.8rem; opacity: 0.06;
          animation: gn-noteDrift 7s ease-in-out infinite;
        }
        @keyframes gn-noteDrift {
          0%   { transform: translateY(0) rotate(0); opacity: 0.06; }
          50%  { transform: translateY(-30px) rotate(12deg); opacity: 0.12; }
          100% { transform: translateY(0) rotate(0); opacity: 0.06; }
        }
        .gn-qr-img {
          width: 110px; height: 110px; border-radius: 16px;
          border: 1px solid var(--gn-outlineVar);
          transition: all 0.35s var(--gn-easeStd);
        }
        .gn-qr-img:hover { box-shadow: 0 0 40px rgba(160,212,160,0.2); border-color: var(--gn-primary); }

        /* ── Now Playing bar motif ── */
        .gn-np-bar {
          display: inline-flex; align-items: center; gap: 12px;
          padding: 10px 20px 10px 12px;
          border-radius: 100px;
          background: var(--gn-surfaceContHi);
          border: 1px solid var(--gn-outlineVar);
          margin-bottom: 2rem;
        }
        .gn-np-bar img {
          width: 36px; height: 36px; border-radius: 10px;
        }
        .gn-np-eq {
          display: flex; align-items: flex-end; gap: 2px; height: 18px;
        }
        .gn-np-eq span {
          width: 2.5px; border-radius: 1px; background: var(--gn-primary);
          transform-origin: bottom;
        }

        /* ── Floating QR Code ── */
        .gn-floating-qr {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          background: var(--gn-surfaceContHi);
          border: 1px solid var(--gn-outlineVar);
          border-radius: 20px;
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          box-shadow: 0 20px 40px rgba(0,0,0,0.4), 0 0 20px rgba(160,212,160,0.1);
          z-index: 9999;
          transition: all 0.35s var(--gn-easeStd);
        }
        .gn-floating-qr:hover {
          transform: translateY(-8px);
          box-shadow: 0 24px 48px rgba(0,0,0,0.5), 0 0 30px rgba(160,212,160,0.2);
          border-color: var(--gn-primary);
        }
        .gn-floating-qr img {
          width: 140px;
          height: 140px;
          border-radius: 12px;
        }
        .gn-floating-qr-text {
          font-family: 'Inter', sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--gn-onSurface);
          text-align: center;
        }
        .gn-floating-qr-sub {
          font-family: 'Inter', sans-serif;
          font-size: 0.7rem;
          color: var(--gn-onSurfaceVar);
          text-align: center;
        }

        /* ── Divider ── */
        .gn-divider {
          height: 1px; margin: 0 auto;
          max-width: 1200px;
          background: linear-gradient(90deg, transparent 0%, var(--gn-outlineVar) 20%, var(--gn-outlineVar) 80%, transparent 100%);
        }

        /* ── Responsive ── */
        @media (max-width: 767px) {
          .gn-hero-mockup img { width: 95vw; }
          .gn-bento-item { padding: 1.5rem; }
          .gn-floating-qr { display: none; }
        }
      `}</style>

      <div ref={pageRef} className="gn-page">

        {/* ── BACK NAV ── */}
        <div className="gn-container" style={{ paddingTop: '1rem', paddingBottom: '0' }}>
          <Link to="/" className="gn-back-link">
            <ChevronLeft style={{ width: 14, height: 14 }} /> Back to Showcase
          </Link>
        </div>

        {/* ════════════════════════════════════════════
            HERO — Full-screen centered, cinematic
            ════════════════════════════════════════════ */}
        <section ref={heroRef} className="gn-hero">
          <div className="gn-hero-glow" aria-hidden="true" />
          <div className="gn-container gn-hero-text">

            {/* App badge */}
            <div className="gn-hero-badge">
              <img src={Images.gaan.iconTrans} alt="" />
              <span className="gn-label-sm" style={{ paddingRight: 8 }}>Gaan — Music Reimagined</span>
            </div>

            {/* Equalizer visual */}
            <div className="gn-eq" aria-hidden="true">
              {Array.from({ length: 24 }).map((_, i) => (
                <div key={i} className="gn-eq-bar" style={{ height: `${12 + Math.random() * 20}px` }} />
              ))}
            </div>

            {/* Title */}
            <h1 className="gn-display-lg gn-hero-title">
              Your music.<br />
              <span className="gn-accent">Uninterrupted.</span>
            </h1>

            {/* Sub-headline */}
            <p className="gn-body-lg gn-hero-sub">
              Ad-free streaming, real-time synced lyrics, lossless 24-bit FLAC audio, and intelligent song recognition — all in one beautifully crafted Android app.
            </p>

            {/* Tech chips */}
            <div className="gn-hero-chips">
              {['Kotlin', 'Jetpack Compose', 'Material You', 'Media3', 'ShazamKit'].map(t => (
                <span key={t} className="gn-chip">{t}</span>
              ))}
            </div>

            {/* CTAs */}
            <div className="gn-hero-ctas">
              <a href={DOWNLOAD} target="_blank" rel="noopener noreferrer" className="gn-btn-tonal">
                <Download style={{ width: 18, height: 18 }} /> Download for Android
              </a>
              <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="gn-btn-outlined">
                <Code2 style={{ width: 16, height: 16 }} /> View Source
              </a>
            </div>

            {/* Mockup */}
            <div className="gn-hero-mockup" ref={mockupRef}>
              <img
                src={Images.gaan.desktop}
                alt="Gaan — Desktop Now Playing screen"
                draggable={false}
              />
            </div>
          </div>
        </section>

        {/* ════════════ MARQUEE ════════════ */}
        <div className="gn-marquee-wrap">
          <div className="gn-mq-inner">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <span key={i} className="gn-mq-item">{item}</span>
            ))}
          </div>
        </div>

        {/* ════════════ STATS ════════════ */}
        <section className="gn-section">
          <div className="gn-container">
            <div className="gn-reveal gn-stats">
              {STATS.map(({ value, label, icon: Icon }) => (
                <div key={label} className="gn-stat-cell">
                  <div className="gn-stat-icon">
                    <Icon style={{ width: 20, height: 20, color: 'var(--gn-primary)' }} />
                  </div>
                  <div className="gn-stat-num-wrap">
                    <span className="gn-stat-num" data-val={value}>{value}</span>
                  </div>
                  <div className="gn-label-lg" style={{ color: 'var(--gn-onSurfaceVar)' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="gn-divider" />

        {/* ════════════ ABOUT ════════════ */}
        <section className="gn-section">
          <div className="gn-container">
            <div className="gn-reveal" style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
              <div className="gn-section-label" style={{ justifyContent: 'center' }}>
                <span className="gn-label-sm">About the App</span>
              </div>
              <h2 className="gn-headline" style={{ marginBottom: '1.5rem' }}>
                Music streaming, <span className="gn-accent">redefined.</span>
              </h2>
              <p className="gn-body-lg" style={{ marginBottom: '1rem' }}>
                Gaan is a feature-rich, open-source Android music app that delivers a seamless, premium listening experience. Powered by YouTube Music's vast catalog, Gaan strips away the ads and adds powerful extras: offline downloads, word-by-word synchronized lyrics, lossless 24-bit FLAC playback, and <strong style={{ color: 'var(--gn-primary)' }}>Echo Find</strong> — an on-device audio recognition engine.
              </p>
              <p className="gn-body-lg" style={{ marginBottom: '2rem' }}>
                Whether you're curating playlists, exploring new genres, or listening together with friends in real time, Gaan puts you in control of every note.
              </p>

              {/* Now Playing bar motif */}
              <div className="gn-np-bar">
                <img src={Images.gaan.iconTrans} alt="" />
                <div style={{ textAlign: 'left', lineHeight: 1.3 }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--gn-onSurface)' }}>Now Playing</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--gn-onSurfaceVar)' }}>Your favorite track</div>
                </div>
                <div className="gn-np-eq">
                  {[14, 10, 18, 8, 12].map((h, i) => (
                    <span key={i} className="gn-eq-bar" style={{ height: `${h}px` }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="gn-divider" />

        {/* ════════════ FEATURES — BENTO GRID ════════════ */}
        <section className="gn-section">
          <div className="gn-container">
            <div className="gn-reveal" style={{ marginBottom: '2.5rem' }}>
              <div className="gn-section-label">
                <span className="gn-label-sm">Key Features</span>
              </div>
              <h2 className="gn-headline">
                Engineered for the <span className="gn-accent">perfect listen.</span>
              </h2>
            </div>

            <div className="gn-stagger gn-bento">
              {FEATURES.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="gn-card-filled gn-bento-item">
                  <div className="gn-bento-icon">
                    <Icon style={{ width: 24, height: 24, color: 'var(--gn-primary)' }} />
                  </div>
                  <div className="gn-title-lg" style={{ marginBottom: '0.6rem' }}>{title}</div>
                  <div className="gn-body-md">{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="gn-divider" />

        {/* ════════════ SCREENSHOTS CAROUSEL ════════════ */}
        <section className="gn-section" style={{ paddingBottom: 0 }}>
          <div className="gn-container">
            <div className="gn-reveal" style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <div className="gn-section-label" style={{ justifyContent: 'center' }}>
                <span className="gn-label-sm">Interface Gallery</span>
              </div>
              <h2 className="gn-headline">
                Beautiful screens, <span className="gn-accent">every detail considered.</span>
              </h2>
            </div>
          </div>

          <div className="gn-carousel-wrap" ref={carouselRef}>
            <div className="gn-carousel-inner">
              {[...SCREENSHOTS, ...SCREENSHOTS].map(({ key, src, label }, index) => (
                <div key={`${key}-${index}`} className="gn-ss-card">
                  <img src={src} alt={label} draggable={false} />
                  <span className="gn-ss-label">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="gn-divider" style={{ marginTop: 'clamp(2rem, 4vw, 3rem)' }} />

        {/* ════════════ TECH STACK ════════════ */}
        <section className="gn-section">
          <div className="gn-container">
            <div className="gn-reveal" style={{ marginBottom: '2.5rem', maxWidth: 560 }}>
              <div className="gn-section-label">
                <span className="gn-label-sm">Technology</span>
              </div>
              <h2 className="gn-headline">
                Built with <span className="gn-accent">modern tech.</span>
              </h2>
              <p className="gn-body-md" style={{ marginTop: '1rem' }}>
                Every layer is purpose-built for performance — from Jetpack Compose for the UI to Media3 for seamless playback.
              </p>
            </div>

            <div className="gn-stagger gn-tech-grid">
              {TECH.map(({ title, items }) => (
                <div key={title} className="gn-card-elevated gn-tech-card">
                  <div className="gn-tech-title">
                    <span className="gn-label-lg" style={{ color: 'var(--gn-primary)' }}>{title}</span>
                  </div>
                  <div className="gn-tech-pills">
                    {items.map(item => (
                      <span key={item} className="gn-chip">{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="gn-divider" />

        {/* ════════════ COMMUNITY ════════════ */}
        <section className="gn-section">
          <div className="gn-container">
            <div className="gn-reveal" style={{ marginBottom: '2.5rem' }}>
              <div className="gn-section-label">
                <span className="gn-label-sm">Community & Open Source</span>
              </div>
              <h2 className="gn-headline">
                Join the <span className="gn-accent">movement.</span>
              </h2>
              <p className="gn-body-md" style={{ marginTop: '1rem', maxWidth: 480 }}>
                Gaan is fully open-source under GPL-3.0. Join our growing community of contributors and music lovers.
              </p>
            </div>

            <div className="gn-stagger gn-community-grid">
              <a href={DISCORD} target="_blank" rel="noopener noreferrer" className="gn-card-filled gn-community-card">
                <div className="gn-community-icon" style={{ background: 'rgba(88,101,242,0.15)', border: '1px solid rgba(88,101,242,0.2)' }}>
                  <FaDiscord style={{ width: 24, height: 24, color: '#5865F2' }} />
                </div>
                <div className="gn-title-lg">Discord</div>
                <div className="gn-body-md">Chat, share feedback, and get support from the community.</div>
                <span className="gn-chip" style={{ borderColor: 'rgba(88,101,242,0.3)', color: '#818cf8' }}>Join Server <ArrowUpRight style={{ width: 12, height: 12 }} /></span>
              </a>

              <a href={TELEGRAM} target="_blank" rel="noopener noreferrer" className="gn-card-filled gn-community-card">
                <div className="gn-community-icon" style={{ background: 'rgba(0,136,204,0.15)', border: '1px solid rgba(0,136,204,0.2)' }}>
                  <FaTelegramPlane style={{ width: 24, height: 24, color: '#0088CC' }} />
                </div>
                <div className="gn-title-lg">Telegram</div>
                <div className="gn-body-md">Updates, release notes, and direct contact with the developer.</div>
                <span className="gn-chip" style={{ borderColor: 'rgba(0,136,204,0.3)', color: '#38bdf8' }}>Join Channel <ArrowUpRight style={{ width: 12, height: 12 }} /></span>
              </a>
            </div>

            <div className="gn-reveal" style={{ marginTop: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
              <a href={`${GITHUB}/blob/main/CONTRIBUTING.md`} target="_blank" rel="noopener noreferrer" className="gn-btn-outlined" style={{ height: 40, fontSize: '0.8rem', padding: '0 18px' }}>
                <Sparkles style={{ width: 14, height: 14 }} /> Contribute
              </a>
              <a href={`${GITHUB}/blob/main/LICENSE`} target="_blank" rel="noopener noreferrer" className="gn-chip">GPL-3.0 Licensed</a>
            </div>
          </div>
        </section>

        <div className="gn-divider" />

        {/* ════════════ FINAL CTA ════════════ */}
        <section className="gn-section">
          <div className="gn-container">
            <div className="gn-reveal gn-cta-section">

              <div className="gn-notes-float" aria-hidden="true">
                {['♪','♫','♩','♬','♪','♫'].map((n, i) => (
                  <span key={i} className="gn-note-f" style={{
                    top: `${15 + i * 14}%`,
                    [i % 2 === 0 ? 'left' : 'right']: `${6 + i * 5}%`,
                    animationDelay: `${i * 0.9}s`,
                  }}>{n}</span>
                ))}
              </div>

              <div style={{ position: 'relative', zIndex: 2 }}>
                <div className="gn-label-sm" style={{ marginBottom: '1rem' }}>Ready to listen?</div>

                <h2 className="gn-display-sm" style={{ marginBottom: '1.25rem' }}>
                  Experience music the<br />
                  <span className="gn-accent">way it should be.</span>
                </h2>

                <p className="gn-body-md" style={{ maxWidth: 480, margin: '0 auto 2.5rem' }}>
                  Ad-free streaming, lossless audio, synced lyrics, and on-device song recognition — completely open-source. Download Gaan and take back your music.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>

                  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px' }}>
                    <a href={DOWNLOAD} target="_blank" rel="noopener noreferrer" className="gn-btn-tonal">
                      <Download style={{ width: 18, height: 18 }} /> Download for Android
                    </a>
                    <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="gn-btn-outlined">
                      <ArrowUpRight style={{ width: 16, height: 16 }} /> View on GitHub
                    </a>
                  </div>
                </div>

                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', color: 'var(--gn-onSurfaceVar)', opacity: 0.4, marginTop: '2.5rem' }}>
                  Built with ♡ by Rumman Ahmed
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Floating QR */}
        <div className="gn-floating-qr">
          <div className="gn-floating-qr-text">Get Gaan on your phone</div>
          <img src={Images.gaan.qr} alt="Scan to download Gaan" />
          <div className="gn-floating-qr-sub">Scan to Download</div>
        </div>

      </div>
    </>
  );
};

export default Gaan;
