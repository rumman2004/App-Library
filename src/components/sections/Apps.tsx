import { forwardRef, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Layers } from 'lucide-react';
import { Images } from '../../data/images';
import { appsData } from '../../data/apps';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';

gsap.registerPlugin(ScrollTrigger);

const appImages: Record<string, string> = {
  'dr-crop':       Images.drCrop.icon,
  'my-calculator': Images.calculator.icon,
  'planix':        Images.planix.logo,
};

const appAccents: Record<string, string> = {
  'dr-crop':       'rgba(76,175,129,0.12)',
  'my-calculator': 'rgba(79,124,255,0.12)',
  'planix':        'rgba(201,168,76,0.12)',
};

const appAccentColors: Record<string, string> = {
  'dr-crop':       '#4caf81',
  'my-calculator': '#4f7cff',
  'planix':        '#c9a84c',
};

/** Maps app id to the Badge variant that suits it */
const appBadgeVariants: Record<string, 'green' | 'blue' | 'gold'> = {
  'dr-crop':       'green',
  'my-calculator': 'blue',
  'planix':        'gold',
};

const appBadgeLabels: Record<string, string> = {
  'dr-crop':       'Active',
  'my-calculator': 'v2',
  'planix':        'New',
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
      const cards = cardsRef.current?.querySelectorAll('.app-card') ?? [];
      gsap.fromTo(
        cards,
        { y: 80, opacity: 0, scale: 0.96 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 0.75, stagger: 0.18, ease: 'power4.out',
          scrollTrigger: { trigger: cardsRef.current, start: 'top 78%', once: true },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ── Magnetic tilt ─────────────────────────────────────────────────────────
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>, el: HTMLElement) => {
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2);
    const dy = (e.clientY - rect.top  - rect.height / 2) / (rect.height / 2);
    gsap.to(el, {
      rotateY: dx * 5, rotateX: -dy * 5,
      duration: 0.4, ease: 'power2.out', transformPerspective: 900,
    });
  };

  const handleMouseLeave = (el: HTMLElement) => {
    gsap.to(el, { rotateY: 0, rotateX: 0, duration: 0.6, ease: 'power3.out' });
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <section
      ref={(node) => {
        sectionRef.current = node!;
        if (typeof ref === 'function') ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLElement | null>).current = node;
      }}
      id="builds"
      style={{ padding: '64px 0 80px', position: 'relative' }}
    >
      {/* ── Divider ── */}
      <div className="container-main" style={{ marginBottom: '56px' }}>
        <div className="divider-gold" />
      </div>

      <div className="container-main">

        {/* ── Section Header ── */}
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
                fontFamily: "'DM Mono', monospace",
                fontSize: '0.6875rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--gold)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                marginBottom: '12px',
              }}
            >
              ✦ Portfolio
            </span>

            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                fontWeight: 700,
                color: 'var(--text)',
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                marginBottom: '10px',
              }}
            >
              My Builds
            </h2>

            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.9375rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.65,
                maxWidth: '340px',
              }}
            >
              Mobile experiences designed and engineered from scratch.
            </p>
          </div>

          {/* Right: project count meta */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: "'DM Mono', monospace",
              fontSize: '0.6875rem',
              color: 'var(--text-muted)',
              letterSpacing: '0.08em',
              paddingBottom: '4px',
              whiteSpace: 'nowrap',
            }}
          >
            <Layers
              style={{ width: '14px', height: '14px', color: 'var(--gold)', flexShrink: 0 }}
            />
            {appsData.length} projects
          </div>
        </div>

        {/* ── Cards Grid ── */}
        <div
          ref={cardsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '28px',
          }}
          className="apps-grid"
        >
          {appsData.map((app) => {
            const accentBg    = appAccents[app.id]      ?? 'rgba(255,255,255,0.05)';
            const accentColor = appAccentColors[app.id] ?? 'var(--gold)';
            const badgeVariant = appBadgeVariants[app.id] ?? 'gold';
            const badgeLabel   = appBadgeLabels[app.id]   ?? '';

            return (
              <Link
                key={app.id}
                to={`/apps/${app.id}`}
                className="app-card block group"
                style={{ textDecoration: 'none' }}
              >
                {/*
                 * Card — interactive prop enables the built-in magnetic tilt
                 * and hover lift from Card.tsx. We additionally pass a
                 * glowColor matching each app's accent.
                 */}
                <Card
                  className="h-full flex flex-col relative overflow-hidden"
                  interactive
                  glowColor={accentBg}
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--surface-border)',
                    borderRadius: 'var(--radius-xl)',
                    boxShadow: 'var(--shadow-card)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                  onMouseMove={(e) => handleMouseMove(e, e.currentTarget as HTMLElement)}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor   = 'rgba(166,136,50,0.22)';
                    el.style.boxShadow     = 'var(--shadow-hover)';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = 'var(--surface-border)';
                    el.style.boxShadow   = 'var(--shadow-card)';
                    handleMouseLeave(el);
                  }}
                >
                  {/* ── Image area ── */}
                  <div
                    style={{
                      height: '260px',
                      background: accentBg,
                      borderBottom: '1px solid var(--surface-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    {/* Soft radial glow behind icon */}
                    <div
                      style={{
                        position: 'absolute',
                        width: '180px',
                        height: '180px',
                        borderRadius: '50%',
                        background: accentBg,
                        filter: 'blur(48px)',
                        transform: 'scale(2)',
                        pointerEvents: 'none',
                      }}
                    />

                    {/* App icon */}
                    <img
                      src={appImages[app.id] || app.image}
                      alt={app.name}
                      className="relative z-10 group-hover:scale-110 transition-transform duration-700 ease-out"
                      style={{
                        width: '192px',
                        height: '192px',
                        objectFit: 'contain',
                        borderRadius: '38px',
                        boxShadow: '0 16px 48px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.06)',
                      }}
                    />

                    {/* Version chip — uses Badge component (mono variant) */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '14px',
                        right: '14px',
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)',
                      }}
                    >
                      <Badge variant="mono">{app.version}</Badge>
                    </div>

                    {/* Arrow button — appears on hover */}
                    <div
                      className="absolute bottom-3.5 right-3.5 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 z-10"
                      style={{ background: 'var(--gold)', color: '#ffffff' }}
                    >
                      <ArrowUpRight style={{ width: '13px', height: '13px' }} />
                    </div>
                  </div>

                  {/* ── Content ── */}
                  <div
                    style={{
                      padding: '22px 24px 24px',
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                      zIndex: 1,
                    }}
                  >
                    {/* Name row + status badge */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '8px',
                      }}
                    >
                      {/* Accent dot */}
                      <span
                        style={{
                          width: '7px',
                          height: '7px',
                          borderRadius: '50%',
                          background: accentColor,
                          flexShrink: 0,
                        }}
                      />

                      <h3
                        style={{
                          fontFamily: "'Playfair Display', Georgia, serif",
                          fontSize: '1.125rem',
                          fontWeight: 700,
                          color: 'var(--text)',
                          letterSpacing: '-0.01em',
                          lineHeight: 1.2,
                          flex: 1,
                        }}
                      >
                        {app.name}
                      </h3>

                      {/* Status badge — uses Badge component */}
                      {badgeLabel && (
                        <Badge variant={badgeVariant}>{badgeLabel}</Badge>
                      )}
                    </div>

                    {/* Description */}
                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: '0.875rem',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.65,
                        flex: 1,
                        marginBottom: '18px',
                      }}
                    >
                      {app.shortDescription}
                    </p>

                    {/* Tech stack — uses Badge component (mono variant) */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {app.techStack.slice(0, 4).map((tech) => (
                        <Badge key={tech} variant="mono">{tech}</Badge>
                      ))}
                    </div>
                  </div>

                  {/* Bottom accent line */}
                  <div
                    className="h-0.5 w-0 group-hover:w-full transition-all duration-500 ease-out"
                    style={{
                      background: `linear-gradient(90deg, ${accentColor}, transparent)`,
                    }}
                  />
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* ── Responsive grid breakpoint ── */}
      <style>{`
        @media (max-width: 1024px) {
          .apps-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .apps-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
        }
      `}</style>
    </section>
  );
});

AppsSection.displayName = 'AppsSection';
export default AppsSection;