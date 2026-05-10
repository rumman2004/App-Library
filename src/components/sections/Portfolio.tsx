import { forwardRef, useEffect, useRef } from 'react';
import { ArrowUpRight, Layers } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Portfolio = forwardRef<HTMLElement, {}>((_, ref) => {
  const sectionRef  = useRef<HTMLElement>(null);
  const bannerRef   = useRef<HTMLDivElement>(null);
  const textRef     = useRef<HTMLDivElement>(null);
  const imageRef    = useRef<HTMLDivElement>(null);
  const lineRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* banner entrance */
      gsap.fromTo(
        bannerRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.0, ease: 'power4.out',
          scrollTrigger: { trigger: bannerRef.current, start: 'top 80%', once: true },
        }
      );

      /* text children stagger */
      gsap.fromTo(
        textRef.current?.children ?? [],
        { x: -40, opacity: 0 },
        {
          x: 0, opacity: 1, stagger: 0.12, duration: 0.65, ease: 'power3.out',
          scrollTrigger: { trigger: bannerRef.current, start: 'top 76%', once: true },
        }
      );

      /* image reveal */
      gsap.fromTo(
        imageRef.current,
        { x: 50, opacity: 0, rotate: 8 },
        {
          x: 0, opacity: 1, rotate: 4, duration: 1, ease: 'back.out(1.4)',
          scrollTrigger: { trigger: bannerRef.current, start: 'top 76%', once: true },
        }
      );

      /* marquee line */
      gsap.to(lineRef.current, { x: '-50%', duration: 18, repeat: -1, ease: 'none' });

      /* parallax on scroll */
      gsap.to(imageRef.current, {
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: bannerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={(node) => {
        sectionRef.current = node!;
        if (typeof ref === 'function') ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLElement | null>).current = node;
      }}
      className="section-gap relative"
    >
      <div className="container-main mb-16">
        <div className="divider-gold" />
      </div>

      <div className="container-main">
        {/* Section header */}
        <div className="mb-12">
          <span className="label-md block mb-3" style={{ color: 'var(--gold)' }}>✦ Personal Website</span>
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              color: 'var(--text)',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
            }}
          >
            Portfolio
          </h2>
        </div>

        {/* ── Banner card ── */}
        <div
          ref={bannerRef}
          className="relative overflow-hidden"
          style={{
            borderRadius: 'var(--radius-2xl)',
            background: 'linear-gradient(135deg, #f7f5f0 0%, #faf9f5 40%, #f0ece2 100%)',
            border: '1px solid rgba(166,136,50,0.15)',
            boxShadow: '0 32px 80px rgba(0,0,0,0.06), 0 0 0 1px rgba(166,136,50,0.04) inset',
            padding: 'clamp(2.5rem, 6vw, 4.5rem)',
          }}
        >
          {/* background dot grid */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(201,168,76,0.15) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
              maskImage: 'linear-gradient(135deg, black 0%, transparent 70%)',
              WebkitMaskImage: 'linear-gradient(135deg, black 0%, transparent 70%)',
            }}
          />

          {/* ambient blobs */}
          <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)', filter: 'blur(40px)' }} />
          <div className="absolute -bottom-16 right-32 w-48 h-48 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(79,124,255,0.06) 0%, transparent 70%)', filter: 'blur(32px)' }} />

          {/* top gold line */}
          <div className="absolute top-0 left-12 right-12 h-px" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.6) 50%, transparent 100%)' }} />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">

            {/* ── Text side ── */}
            <div ref={textRef} className="flex-1 text-center lg:text-left max-w-lg">
              {/* badge */}
              <span
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
                style={{
                  background: 'rgba(201,168,76,0.12)',
                  border: '1px solid rgba(201,168,76,0.25)',
                  fontFamily: "'DM Mono', monospace",
                  fontSize: '0.65rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--gold)',
                }}
              >
                <Layers className="w-3 h-3" />
                Personal Portfolio
              </span>

              {/* heading */}
              <h2
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: 'clamp(2.25rem, 5vw, 3.75rem)',
                  fontWeight: 900,
                  color: 'var(--text)',
                  lineHeight: 1.0,
                  letterSpacing: '-0.04em',
                  marginBottom: '1.25rem',
                }}
              >
                Discover more about
                <br />
                <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Me & My Projects</em>
              </h2>

              {/* description */}
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.9375rem',
                  fontWeight: 300,
                  color: 'var(--text-secondary)',
                  lineHeight: 1.7,
                  marginBottom: '2.5rem',
                }}
              >
                Explore my full design philosophy, creative writing, and the personal journey behind every project I've built.
              </p>

              {/* CTA */}
              <a
                href="https://rumman-portfolio-ryuu.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 transition-all duration-300 hover:-translate-y-1"
                style={{
                  padding: '0.875rem 2rem',
                  background: 'var(--gold)',
                  color: '#ffffff',
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: '0.9375rem',
                  borderRadius: 'var(--radius-sm)',
                  boxShadow: '0 4px 24px rgba(201,168,76,0.3)',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 40px rgba(201,168,76,0.45)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 24px rgba(201,168,76,0.3)'; }}
              >
                Visit Portfolio
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </a>
            </div>

            {/* ── Image side ── */}
            <div className="relative shrink-0 flex items-center justify-center lg:justify-end">
              {/* decorative frame behind */}
              <div
                className="absolute"
                style={{
                  inset: '-12px',
                  border: '1px dashed rgba(201,168,76,0.2)',
                  borderRadius: 'calc(var(--radius-xl) + 12px)',
                  transform: 'rotate(-2deg)',
                }}
              />

              <div
                ref={imageRef}
                className="relative overflow-hidden group"
                style={{
                  width: 'clamp(200px, 25vw, 350px)',
                  height: 'clamp(200px, 25vw, 350px)',
                  borderRadius: 'var(--radius-xl)',
                  border: '1px solid rgba(201,168,76,0.25)',
                  boxShadow: '0 32px 80px rgba(0,0,0,0.12), 0 0 40px rgba(166,136,50,0.06)',
                  transform: 'rotate(4deg)',
                }}
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, { rotate: 0, scale: 1.04, duration: 0.5, ease: 'power3.out' });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, { rotate: 4, scale: 1, duration: 0.5, ease: 'power3.out' });
                }}
              >
                <img
                  src="/src/assets/images/portfolio.png"
                  alt="Portfolio Preview"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* overlay on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                  style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}
                >
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'var(--gold)', color: '#ffffff' }}>
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Scrolling marquee strip ── */}
          <div
            className="relative mt-12 -mx-6 sm:-mx-10 lg:-mx-16 overflow-hidden"
            style={{
              borderTop: '1px solid var(--surface-border)',
              paddingTop: '1.25rem',
            }}
          >
            <div ref={lineRef} className="flex gap-8 whitespace-nowrap" style={{ width: 'max-content' }}>
              {Array.from({ length: 10 }).map((_, i) => (
                <span
                  key={i}
                  className="flex items-center gap-4"
                  style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase' }}
                >
                  <span style={{ color: 'var(--gold)' }}>✦</span>
                  Portfolio
                  <span style={{ color: 'var(--gold)' }}>✦</span>
                  Design
                  <span style={{ color: 'var(--gold)' }}>✦</span>
                  Mobile Apps
                  <span style={{ color: 'var(--gold)' }}>✦</span>
                  React Native
                  <span style={{ color: 'var(--gold)' }}>✦</span>
                  Figma
                  <span style={{ color: 'var(--gold)' }}>✦</span>
                  React
                  <span style={{ color: 'var(--gold)' }}>✦</span>
                  HTML CSS
                  <span style={{ color: 'var(--gold)' }}>✦</span>
                  Premire Pro
                  <span style={{ color: 'var(--gold)' }}>✦</span>
                  Photoshop
                  <span style={{ color: 'var(--gold)' }}>✦</span>
                  After Effects
                  <span style={{ color: 'var(--gold)' }}>✦</span>
                  Node JS
                  <span style={{ color: 'var(--gold)' }}>✦</span>
                  Mongo DB
                  <span style={{ color: 'var(--gold)' }}>✦</span>
                  Express JS
                  <span style={{ color: 'var(--gold)' }}>✦</span>
                  Supabase
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

Portfolio.displayName = 'Portfolio';
export default Portfolio;