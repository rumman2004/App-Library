import { forwardRef, useRef } from 'react';
import type { ReactNode } from 'react';
import gsap from 'gsap';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
  /** Subtle accent glow color on hover, e.g. 'rgba(201,168,76,0.15)' */
  glowColor?: string;
  variant?: 'default' | 'raised' | 'bordered' | 'glass';
  style?: React.CSSProperties;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      className = '',
      interactive = false,
      glowColor = 'rgba(201,168,76,0.08)',
      variant = 'default',
      ...props
    },
    ref
  ) => {
    const innerRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);

    /* ── magnetic tilt on hover ── */
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!interactive || !innerRef.current) return;
      const rect = innerRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      gsap.to(innerRef.current, {
        rotateY: dx * 4,
        rotateX: -dy * 4,
        duration: 0.4,
        ease: 'power2.out',
        transformPerspective: 800,
      });
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          opacity: 1,
          x: (e.clientX - rect.left) - rect.width / 2,
          y: (e.clientY - rect.top) - rect.height / 2,
          duration: 0.3,
        });
      }
    };

    const handleMouseLeave = () => {
      if (!interactive || !innerRef.current) return;
      gsap.to(innerRef.current, {
        rotateY: 0, rotateX: 0, duration: 0.5, ease: 'power3.out',
      });
      if (glowRef.current) {
        gsap.to(glowRef.current, { opacity: 0, duration: 0.3 });
      }
    };

    const variantStyles: Record<string, React.CSSProperties> = {
      default: {
        background: 'var(--surface)',
        border: '1px solid var(--surface-border)',
        boxShadow: 'var(--shadow-card)',
      },
      raised: {
        background: 'var(--surface-raised)',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
      },
      bordered: {
        background: 'transparent',
        border: '1px solid var(--surface-border-hover)',
        boxShadow: 'none',
      },
      glass: {
        background: 'rgba(20,21,28,0.6)',
        border: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        boxShadow: 'var(--shadow-card)',
      },
    };

    return (
      <div
        ref={(node) => {
          innerRef.current = node!;
          if (typeof ref === 'function') ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={[
          'rounded-[var(--radius-lg)] relative overflow-hidden',
          'transition-[transform,box-shadow,border-color] duration-300 ease-out',
          interactive
            ? 'cursor-pointer hover:-translate-y-1.5 hover:shadow-[var(--shadow-hover)] hover:border-[rgba(201,168,76,0.2)]'
            : '',
          className,
        ].join(' ')}
        style={{ ...variantStyles[variant], transformStyle: 'preserve-3d' }}
        {...props}
      >
        {/* Gradient shimmer overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(135deg, rgba(255,255,255,0.025) 0%, transparent 50%, rgba(201,168,76,0.02) 100%)',
          }}
        />

        {/* Mouse-tracking glow */}
        {interactive && (
          <div
            ref={glowRef}
            className="absolute pointer-events-none opacity-0 -translate-x-1/2 -translate-y-1/2"
            style={{
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
              left: '50%',
              top: '50%',
              filter: 'blur(1px)',
            }}
          />
        )}

        {/* Content */}
        <div className="relative z-10">{children}</div>
      </div>
    );
  }
);

Card.displayName = 'Card';
export default Card;