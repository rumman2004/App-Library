import { forwardRef } from 'react';
import type { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: ReactNode;
  iconRight?: ReactNode;
}

// ─── Size scale ───────────────────────────────────────────────────────────────
// All padding/gap/font values are explicit — no Tailwind shorthand.

const sizes: Record<string, React.CSSProperties> = {
  sm: {
    padding: '7px 16px',
    fontSize: '0.75rem',
    gap: '6px',
    lineHeight: 1.4,
  },
  md: {
    padding: '10px 20px',
    fontSize: '0.875rem',
    gap: '8px',
    lineHeight: 1.4,
  },
  lg: {
    padding: '14px 28px',
    fontSize: '1rem',
    gap: '10px',
    lineHeight: 1.4,
  },
};

// ─── Spinner size per button size ────────────────────────────────────────────

const spinnerSize: Record<string, string> = {
  sm: '0.875rem',
  md: '1rem',
  lg: '1.125rem',
};

// ─── Variant base styles ─────────────────────────────────────────────────────

const variantStyles: Record<string, React.CSSProperties> = {
  primary: {
    background: 'var(--gold)',
    color: '#0b0c10',
    border: 'none',
    boxShadow: '0 4px 20px rgba(201,168,76,0.25)',
  },
  secondary: {
    background: 'var(--surface-raised)',
    color: 'var(--text)',
    border: '1px solid var(--surface-border-hover)',
    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
  },
  ghost: {
    background: 'transparent',
    color: 'var(--text-secondary)',
    border: '1px solid transparent',
    boxShadow: 'none',
  },
  danger: {
    background: 'rgba(255,107,107,0.12)',
    color: 'var(--error)',
    border: '1px solid rgba(255,107,107,0.25)',
    boxShadow: 'none',
  },
};

// ─── Hover Tailwind classes ───────────────────────────────────────────────────
// Only hover/focus/active pseudo-states stay in Tailwind — these cannot be
// expressed as inline styles without JavaScript event handlers.

const hoverMap: Record<string, string> = {
  primary:
    'hover:bg-[var(--gold-light)] hover:shadow-[0_8px_32px_rgba(201,168,76,0.35)] hover:-translate-y-0.5',
  secondary:
    'hover:bg-[var(--surface)] hover:border-[var(--gold)] hover:text-[var(--gold)] hover:-translate-y-0.5',
  ghost:
    'hover:bg-[rgba(255,255,255,0.05)] hover:text-[var(--text)] hover:border-[var(--surface-border)]',
  danger:
    'hover:bg-[rgba(255,107,107,0.18)] hover:-translate-y-0.5',
};

// ─── Component ────────────────────────────────────────────────────────────────

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      icon,
      iconRight,
      className = '',
      disabled,
      style,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        style={{
          // ── Layout ──
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,

          // ── Typography ──
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 600,
          letterSpacing: '0.01em',
          whiteSpace: 'nowrap',

          // ── Shape ──
          borderRadius: 'var(--radius-sm)',

          // ── Motion ──
          transition: 'all 0.2s ease',
          cursor: isDisabled ? 'not-allowed' : 'pointer',

          // ── Size (padding, font-size, gap, line-height) ──
          ...sizes[size],

          // ── Variant (background, color, border, boxShadow) ──
          ...variantStyles[variant],

          // ── Disabled ──
          ...(isDisabled ? { opacity: 0.5, pointerEvents: 'none' } : {}),

          // ── Caller overrides — always last ──
          ...style,
        }}
        className={[
          'focus:outline-none',
          'focus-visible:ring-2 focus-visible:ring-[var(--gold)]',
          'focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]',
          'active:scale-[0.97]',
          hoverMap[variant],
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      >
        {/* ── Leading icon or spinner ── */}
        {isLoading ? (
          <svg
            style={{
              width: spinnerSize[size],
              height: spinnerSize[size],
              animation: 'spin 1s linear infinite',
              flexShrink: 0,
              // Optical margin so the spinner doesn't push text too far right
              marginRight: '2px',
            }}
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              style={{ opacity: 0.2 }}
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path
              style={{ opacity: 0.8 }}
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        ) : icon ? (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              flexShrink: 0,
              // Negative optical margin so icon doesn't add extra left padding
              marginLeft: '-2px',
            }}
          >
            {icon}
          </span>
        ) : null}

        {/* ── Label ── */}
        <span>{children}</span>

        {/* ── Trailing icon ── */}
        {!isLoading && iconRight ? (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              flexShrink: 0,
              // Negative optical margin so icon doesn't add extra right padding
              marginRight: '-2px',
            }}
          >
            {iconRight}
          </span>
        ) : null}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;