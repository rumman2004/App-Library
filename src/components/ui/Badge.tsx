import type { ReactNode } from 'react';

type BadgeVariant = 'default' | 'gold' | 'blue' | 'green' | 'red' | 'mono';

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
  /** Deprecated: use variant instead */
  colorClass?: string;
}

const variantStyles: Record<BadgeVariant, React.CSSProperties> = {
  default: {
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.08)',
    color: 'var(--text-secondary)',
  },
  gold: {
    background: 'var(--gold-dim)',
    border: '1px solid rgba(201,168,76,0.25)',
    color: 'var(--gold)',
  },
  blue: {
    background: 'var(--primary-light)',
    border: '1px solid rgba(79,124,255,0.25)',
    color: 'var(--primary-hover)',
  },
  green: {
    background: 'rgba(76,175,129,0.1)',
    border: '1px solid rgba(76,175,129,0.25)',
    color: '#4caf81',
  },
  red: {
    background: 'rgba(255,107,107,0.1)',
    border: '1px solid rgba(255,107,107,0.25)',
    color: 'var(--error)',
  },
  mono: {
    background: 'var(--surface-raised)',
    border: '1px solid var(--surface-border)',
    color: 'var(--text-muted)',
  },
};

const Badge = ({
  children,
  variant = 'default',
  className = '',
  colorClass,
}: BadgeProps) => (
  <span
    className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full transition-all duration-200 ${className}`}
    style={{
      fontFamily: "'DM Mono', monospace",
      fontSize: '0.6875rem',
      letterSpacing: '0.04em',
      ...(colorClass ? {} : variantStyles[variant]),
    }}
  >
    {children}
  </span>
);

export default Badge;