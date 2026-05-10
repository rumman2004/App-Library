import { forwardRef, useEffect, useRef } from 'react';
import { Star, GitFork, Users, ArrowUpRight, GitCommit, Code2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

gsap.registerPlugin(ScrollTrigger);

// ─── Data ────────────────────────────────────────────────────────────────────

const stats = [
  { icon: Star,      label: 'Stars',     value: 12,  suffix: '' },
  { icon: GitFork,   label: 'Forks',     value: 4,  suffix: '' },
  { icon: Users,     label: 'Followers', value: 7,  suffix: '' },
  { icon: GitCommit, label: 'Commits',   value: 432, suffix: '+' },
  { icon: Code2,     label: 'Repos',     value: 30,  suffix: '' },
];

const techBadges = ['React Native', 'TypeScript', 'ML / AI'];

// ─── Animated counter helper ──────────────────────────────────────────────────

const animateCount = (el: HTMLElement, target: number, suffix: string) => {
  const obj = { val: 0 };
  gsap.to(obj, {
    val: target,
    duration: 1.6,
    ease: 'power2.out',
    onUpdate: () => { el.textContent = Math.round(obj.val) + suffix; },
  });
};

// ─── Component ───────────────────────────────────────────────────────────────

const GithubProfile = forwardRef<HTMLDivElement, {}>((_, ref) => {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const cardRef     = useRef<HTMLDivElement>(null);
  const avatarRef   = useRef<HTMLDivElement>(null);
  const ringRef     = useRef<HTMLDivElement>(null);
  const statsRef    = useRef<HTMLDivElement>(null);
  const textRef     = useRef<HTMLDivElement>(null);
  const headerRef   = useRef<HTMLDivElement>(null);
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const triggered   = useRef(false);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Header reveal — matches AppsSection pattern
      gsap.fromTo(
        headerRef.current?.children ?? [],
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.1, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 82%', once: true },
        },
      );

      // Card entrance
      gsap.fromTo(
        cardRef.current,
        { y: 70, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: 'power4.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 80%',
            once: true,
            onEnter: () => {
              if (triggered.current) return;
              triggered.current = true;

              // Avatar drop
              gsap.fromTo(
                avatarRef.current,
                { scale: 0.7, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.8)', delay: 0.2 },
              );

              // Ring spin
              gsap.to(ringRef.current, { rotate: 360, duration: 14, repeat: -1, ease: 'none' });

              // Info text slide-in
              gsap.fromTo(
                textRef.current?.children ?? [],
                { x: -30, opacity: 0 },
                { x: 0, opacity: 1, stagger: 0.1, duration: 0.55, ease: 'power3.out', delay: 0.35 },
              );

              // Stat cards stagger — then trigger counters
              const statCards = statsRef.current?.querySelectorAll('.stat-card') ?? [];
              gsap.fromTo(
                statCards,
                { y: 30, opacity: 0, scale: 0.9 },
                {
                  y: 0, opacity: 1, scale: 1,
                  stagger: 0.1, duration: 0.55, ease: 'back.out(1.5)', delay: 0.5,
                  onComplete: () => {
                    counterRefs.current.forEach((el, i) => {
                      if (el) animateCount(el, stats[i].value, stats[i].suffix);
                    });
                  },
                },
              );
            },
          },
        },
      );

      // Idle avatar float
      gsap.to(avatarRef.current, {
        y: -6, duration: 3, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 1.5,
      });

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={(node) => {
        sectionRef.current = node!;
        if (typeof ref === 'function') ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }}
      style={{ padding: '64px 0 80px', position: 'relative' }}
    >
      {/* ── Divider — matches AppsSection ── */}
      <div className="container-main" style={{ marginBottom: '56px' }}>
        <div className="divider-gold" />
      </div>

      <div className="container-main">

        {/* ── Section Header ── */}
        <div
          ref={headerRef}
          style={{ marginBottom: '48px' }}
        >
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
            ✦ Open Source
          </span>

          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(2rem, 4vw, 2.75rem)',
              fontWeight: 700,
              color: 'var(--text)',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
            }}
          >
            GitHub Profile
          </h2>
        </div>

        {/* ── Main Card — uses Card component ── */}
        <Card
          ref={cardRef}
          variant="default"
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--surface-border)',
            borderRadius: 'var(--radius-xl)',
            boxShadow: 'var(--shadow-card)',
            padding: 'clamp(2rem, 5vw, 3.5rem)',
          }}
        >
          {/* Decorative background glows */}
          <div
            style={{
              position: 'absolute',
              top: 0, right: 0,
              width: '320px', height: '320px',
              background: 'radial-gradient(circle at top right, rgba(201,168,76,0.06) 0%, transparent 70%)',
              filter: 'blur(40px)',
              pointerEvents: 'none',
            }}
          />
          {/* Top gold stripe */}
          <div
            style={{
              position: 'absolute',
              top: 0, left: 0, right: 0,
              height: '1px',
              background: 'linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.5) 30%, rgba(201,168,76,0.5) 70%, transparent 100%)',
            }}
          />

          {/* ── Profile row ── */}
          <div
            className="github-profile-row"
            style={{
              position: 'relative',
              zIndex: 1,
              display: 'flex',
              alignItems: 'flex-start',
              gap: '48px',
            }}
          >
            {/* ── Avatar column ── */}
            <div
              style={{
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px',
              }}
            >
              {/* Avatar + rings */}
              <div style={{ position: 'relative', width: '136px', height: '136px' }}>
                {/* Spinning dashed ring */}
                <div
                  ref={ringRef}
                  style={{
                    position: 'absolute',
                    inset: '-12px',
                    borderRadius: '50%',
                    border: '2px dashed rgba(201,168,76,0.3)',
                    pointerEvents: 'none',
                  }}
                />
                {/* Glow ring */}
                <div
                  style={{
                    position: 'absolute',
                    inset: '-6px',
                    borderRadius: '50%',
                    boxShadow: '0 0 36px rgba(201,168,76,0.18)',
                    pointerEvents: 'none',
                  }}
                />

                <div ref={avatarRef} style={{ position: 'relative' }}>
                  <img
                    src="/src/assets/images/avatar.jpeg"
                    alt="Rumman Ahmed"
                    style={{
                      width: '136px',
                      height: '136px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '3px solid rgba(201,168,76,0.4)',
                      boxShadow: '0 16px 48px rgba(0,0,0,0.2)',
                      display: 'block',
                    }}
                  />
                  {/* Online indicator */}
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '6px', right: '6px',
                      width: '16px', height: '16px',
                      borderRadius: '50%',
                      background: '#4caf81',
                      border: '2.5px solid var(--surface)',
                      display: 'block',
                    }}
                  />
                </div>
              </div>

              {/* GitHub handle — uses Badge gold variant */}
              <a
                href="https://github.com/rumman2004"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', transition: 'transform 0.2s ease', display: 'inline-block' }}
                className="github-handle-link"
              >
                <Badge variant="gold">
                  @rumman2004 <ArrowUpRight style={{ width: '10px', height: '10px', display: 'inline', verticalAlign: 'middle' }} />
                </Badge>
              </a>
            </div>

            {/* ── Info column ── */}
            <div
              ref={textRef}
              style={{ flex: 1, minWidth: 0 }}
            >
              {/* Name */}
              <h3
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: '1.75rem',
                  fontWeight: 700,
                  color: 'var(--text)',
                  letterSpacing: '-0.025em',
                  lineHeight: 1.15,
                  marginBottom: '6px',
                }}
              >
                Rumman Ahmed
              </h3>

              {/* Role subtitle */}
              <div
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: '0.6875rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--gold)',
                  marginBottom: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span style={{ display: 'inline-block', width: '18px', height: '1px', background: 'var(--gold)', opacity: 0.5 }} />
                Full-stack &amp; Mobile Developer
              </div>

              {/* Bio */}
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.9375rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.7,
                  maxWidth: '460px',
                  marginBottom: '24px',
                }}
              >
                Passionate developer building open-source tools, mobile applications,
                and exploring the intersection of design and machine learning.
              </p>

              {/* Badge row — uses Badge component */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '28px',
                }}
              >
                <Badge variant="green">
                  <span
                    style={{
                      display: 'inline-block',
                      width: '6px', height: '6px',
                      borderRadius: '50%',
                      background: '#4caf81',
                      marginRight: '2px',
                    }}
                  />
                  Available
                </Badge>

                {techBadges.map((t) => (
                  <Badge key={t} variant="mono">{t}</Badge>
                ))}

                <Badge variant="gold">Open to collab</Badge>
              </div>

              {/* CTA — uses Button component (secondary variant) */}
              <a
                href="https://github.com/rumman2004"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', display: 'inline-block' }}
              >
                <Button
                  variant="secondary"
                  size="md"
                  iconRight={<ArrowUpRight style={{ width: '15px', height: '15px' }} />}
                >
                  View GitHub Profile
                </Button>
              </a>
            </div>
          </div>

          {/* ── Stats row ── */}
          <div
            ref={statsRef}
            style={{
              position: 'relative',
              zIndex: 1,
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '12px',
              marginTop: '40px',
              paddingTop: '32px',
              borderTop: '1px solid var(--surface-border)',
            }}
            className="github-stats-grid"
          >
            {stats.map(({ icon: Icon, label, value, suffix }, i) => (
              <div
                key={label}
                className="stat-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '20px 12px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--surface-raised)',
                  border: '1px solid var(--surface-border)',
                  cursor: 'default',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = 'rgba(201,168,76,0.28)';
                  el.style.background  = 'rgba(201,168,76,0.06)';
                  el.style.transform   = 'translateY(-4px)';
                  el.style.boxShadow   = '0 8px 24px rgba(0,0,0,0.3)';
                  const icon  = el.querySelector<HTMLElement>('.stat-icon');
                  const value = el.querySelector<HTMLElement>('.stat-value');
                  if (icon)  icon.style.color  = 'var(--gold)';
                  if (value) value.style.color = 'var(--gold)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = 'var(--surface-border)';
                  el.style.background  = 'var(--surface-raised)';
                  el.style.transform   = '';
                  el.style.boxShadow   = '';
                  const icon  = el.querySelector<HTMLElement>('.stat-icon');
                  const value = el.querySelector<HTMLElement>('.stat-value');
                  if (icon)  icon.style.color  = 'var(--text-muted)';
                  if (value) value.style.color = 'var(--text)';
                }}
              >
                <Icon
                  className="stat-icon"
                  style={{
                    width: '16px', height: '16px',
                    color: 'var(--text-muted)',
                    transition: 'color 0.25s',
                    flexShrink: 0,
                  }}
                />

                <span
                  ref={(el) => { counterRefs.current[i] = el; }}
                  className="stat-value"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '1.75rem',
                    fontWeight: 700,
                    color: 'var(--text)',
                    lineHeight: 1,
                    transition: 'color 0.25s',
                  }}
                >
                  0{suffix}
                </span>

                <span
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: '0.5875rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                  }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* ── Responsive overrides ── */}
      <style>{`
        .github-handle-link:hover { transform: scale(1.04); }

        @media (max-width: 1024px) {
          .github-profile-row { flex-direction: column !important; align-items: center !important; gap: 32px !important; text-align: center; }
          .github-profile-row p { margin-left: auto !important; margin-right: auto !important; }
          .github-profile-row > div:last-child { align-items: center; }
          .github-stats-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }

        @media (max-width: 640px) {
          .github-stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
});

GithubProfile.displayName = 'GithubProfile';
export default GithubProfile;