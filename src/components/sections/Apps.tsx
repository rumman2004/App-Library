import { forwardRef, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Layers } from 'lucide-react';
import { Images } from '../../data/images';
import { appsData } from '../../data/apps';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const appImages: Record<string, string> = {
  'dr-crop':       Images.drCrop.icon,
  'my-calculator': Images.calculator.icon,
  'planix':        Images.planix.logo,
  'antinode':      Images.antinode.icon,
  'gaan':          Images.gaan.icon,
};

const appAccents: Record<string, string> = {
  'dr-crop':       'rgba(76,175,129,0.12)',
  'my-calculator': 'rgba(79,124,255,0.12)',
  'planix':        'rgba(201,168,76,0.12)',
  'antinode':      'rgba(37,99,255,0.12)',
  'gaan':          'rgba(160,212,160,0.15)',
};

const appAccentColors: Record<string, string> = {
  'dr-crop':       '#4caf81',
  'my-calculator': '#4f7cff',
  'planix':        '#c9a84c',
  'antinode':      '#5b8dff',
  'gaan':          '#2C6B37',
};

const appBadgeLabels: Record<string, string> = {
  'dr-crop':       'Active',
  'my-calculator': 'v2',
  'planix':        'New',
  'antinode':      'New',
  'gaan':          'Hot',
};

// ─────────────────────────────────────────────────────────────────────────────

const AppsSection = forwardRef<HTMLElement, {}>((_, ref) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);
  const cardsRef   = useRef<HTMLDivElement>(null);

  // ── Scroll-triggered entrance animations ──────────────────────────────────
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
      const cards = cardsRef.current?.querySelectorAll('.m3-app-card') ?? [];
      gsap.fromTo(
        cards,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 0.75, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: cardsRef.current, start: 'top 78%', once: true },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <section
      ref={(node) => {
        sectionRef.current = node!;
        if (typeof ref === 'function') ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLElement | null>).current = node;
      }}
      id="builds"
      className="m3-apps-section"
      style={{ padding: '64px 0 80px', position: 'relative' }}
    >
      <style>{`
        .m3-apps-section {
          --m3-surface: #F8F9F5;
          --m3-surface-cont: #EEF0EB;
          --m3-surface-cont-hi: #E3E5DF;
          --m3-on-surface: #191C1A;
          --m3-on-surface-var: #404842;
          --m3-outline: #717972;
          --m3-outline-var: #C0C8C1;
          --m3-primary: #2C6B37;
          --m3-radius-xl: 28px;
          --m3-ease: cubic-bezier(0.2, 0, 0, 1);
        }

        .m3-app-card {
          background: var(--m3-surface-cont);
          border: 1px solid var(--m3-outline-var);
          border-radius: var(--m3-radius-xl);
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
          transition: all 0.4s var(--m3-ease);
          text-decoration: none;
        }
        
        .m3-app-card:hover {
          transform: translateY(-6px);
          background: var(--m3-surface-cont-hi);
          box-shadow: 0 20px 40px rgba(0,0,0,0.4), 0 0 20px rgba(160,212,160,0.05);
          border-color: rgba(160,212,160,0.2);
        }

        .m3-app-img-area {
          height: 240px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          border-bottom: 1px solid var(--m3-outline-var);
          transition: border-color 0.4s var(--m3-ease);
        }

        .m3-app-card:hover .m3-app-img-area {
          border-color: rgba(160,212,160,0.2);
        }

        .m3-app-icon {
          width: 180px;
          height: 180px;
          object-fit: contain;
          border-radius: 36px;
          position: relative;
          z-index: 10;
          box-shadow: 0 16px 40px rgba(0,0,0,0.3);
          transition: transform 0.5s var(--m3-ease);
        }

        .m3-app-card:hover .m3-app-icon {
          transform: scale(1.08) translateY(-4px);
        }

        .m3-content-area {
          padding: 24px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .m3-app-title {
          font-family: 'Outfit', sans-serif;
          font-size: 1.35rem;
          font-weight: 600;
          color: var(--m3-on-surface);
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .m3-app-desc {
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem;
          color: var(--m3-on-surface-var);
          line-height: 1.5;
          margin-bottom: 20px;
          flex: 1;
        }

        .m3-chips-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .m3-chip {
          padding: 6px 12px;
          border-radius: 8px;
          background: rgba(0,0,0,0.04);
          border: 1px solid rgba(0,0,0,0.08);
          font-family: 'Inter', sans-serif;
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--m3-on-surface-var);
        }

        .m3-badge {
          position: absolute;
          top: 16px;
          right: 16px;
          padding: 4px 10px;
          border-radius: 12px;
          background: rgba(255,255,255,0.75);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.4);
          font-family: 'Inter', sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--m3-on-surface);
          z-index: 20;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }

        .m3-fab {
          position: absolute;
          bottom: -20px;
          right: 20px;
          width: 44px;
          height: 44px;
          border-radius: 14px;
          background: #191C1A;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transform: translateY(10px);
          transition: all 0.4s var(--m3-ease);
          z-index: 20;
          box-shadow: 0 8px 16px rgba(0,0,0,0.2);
        }

        .m3-app-card:hover .m3-fab {
          opacity: 1;
          transform: translateY(-38px);
        }

        @media (max-width: 1024px) {
          .m3-apps-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .m3-apps-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
        }
      `}</style>

      {/* ── Divider ── */}
      <div className="container-main" style={{ marginBottom: '56px' }}>
        <div className="divider-gold" />
      </div>

      <div className="container-main">

        {/* ── Section Header (M3 Typography) ── */}
        <div
          ref={headerRef}
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '24px',
            marginBottom: '48px',
            flexWrap: 'wrap',
          }}
        >
          {/* Left: label + title + subtitle */}
          <div>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.75rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--m3-primary)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '12px',
                fontWeight: 600
              }}
            >
              ✦ Portfolio
            </span>

            <h2
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                fontWeight: 700,
                color: 'var(--m3-on-surface)',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                marginBottom: '12px',
              }}
            >
              My Builds
            </h2>

            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '1rem',
                color: 'var(--m3-on-surface-var)',
                lineHeight: 1.6,
                maxWidth: '380px',
              }}
            >
              Mobile experiences designed and engineered from scratch with a focus on modern aesthetics.
            </p>
          </div>

          {/* Right: project count meta */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.8rem',
              color: 'var(--m3-on-surface-var)',
              paddingBottom: '6px',
              fontWeight: 500
            }}
          >
            <Layers style={{ width: '16px', height: '16px', color: 'var(--m3-primary)' }} />
            {appsData.length} active projects
          </div>
        </div>

        {/* ── Cards Grid (M3) ── */}
        <div
          ref={cardsRef}
          className="m3-apps-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
          }}
        >
          {appsData.map((app) => {
            const accentBg = appAccents[app.id] ?? 'rgba(0,0,0,0.03)';
            const accentColor = appAccentColors[app.id] ?? 'var(--m3-primary)';
            const badgeLabel = appBadgeLabels[app.id] ?? '';

            return (
              <Link key={app.id} to={`/apps/${app.id}`} className="m3-app-card">
                
                {/* Image Area */}
                <div className="m3-app-img-area" style={{ background: accentBg }}>
                  <div
                    style={{
                      position: 'absolute',
                      width: '100%', height: '100%',
                      background: `radial-gradient(circle at center, ${accentBg} 0%, transparent 70%)`,
                      opacity: 0.5
                    }}
                  />
                  <img src={appImages[app.id] || app.image} alt={app.name} className="m3-app-icon" />
                  
                  {/* Version/Status Badge */}
                  <div className="m3-badge">
                    {badgeLabel ? `${badgeLabel} • ` : ''}{app.version}
                  </div>

                  {/* Hover FAB */}
                  <div className="m3-fab">
                    <ArrowUpRight style={{ width: 20, height: 20 }} />
                  </div>
                </div>

                {/* Content Area */}
                <div className="m3-content-area">
                  <h3 className="m3-app-title">
                    <span
                      style={{
                        width: '8px', height: '8px',
                        borderRadius: '50%',
                        background: accentColor,
                        display: 'inline-block'
                      }}
                    />
                    {app.name}
                  </h3>
                  
                  <p className="m3-app-desc">{app.shortDescription}</p>
                  
                  <div className="m3-chips-wrap">
                    {app.techStack.slice(0, 4).map((tech) => (
                      <span key={tech} className="m3-chip">{tech}</span>
                    ))}
                  </div>
                </div>

              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
});

AppsSection.displayName = 'AppsSection';
export default AppsSection;