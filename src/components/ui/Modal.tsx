import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { X } from 'lucide-react';
import gsap from 'gsap';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  /** Optional subtitle below the title */
  subtitle?: string;
  /** Max width of modal panel */
  maxWidth?: string;
}

const Modal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = '480px',
}: ModalProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!overlayRef.current || !panelRef.current) return;

    if (isOpen) {
      gsap.set(overlayRef.current, { display: 'flex' });
      gsap.timeline()
        .fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' })
        .fromTo(
          panelRef.current,
          { scale: 0.88, opacity: 0, y: 24, rotateX: -4 },
          { scale: 1, opacity: 1, y: 0, rotateX: 0, duration: 0.45, ease: 'back.out(1.6)', transformPerspective: 1000 },
          '-=0.2'
        )
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' },
          '-=0.2'
        );
      document.body.style.overflow = 'hidden';
    } else {
      gsap.timeline({
        onComplete: () => {
          gsap.set(overlayRef.current, { display: 'none' });
          document.body.style.overflow = '';
        },
      })
        .to(panelRef.current, {
          scale: 0.92,
          opacity: 0,
          y: 16,
          duration: 0.22,
          ease: 'power2.in',
        })
        .to(overlayRef.current, { opacity: 0, duration: 0.2, ease: 'power2.in' }, '-=0.1');
    }

    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  /* ── key listener ── */
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] items-center justify-center p-4"
      style={{
        display: 'none',
        background: 'rgba(0,0,0,0.75)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
      onClick={onClose}
    >
      <div
        ref={panelRef}
        className="relative w-full overflow-hidden"
        style={{
          maxWidth,
          background: 'var(--surface-raised)',
          border: '1px solid rgba(255,255,255,0.09)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: '0 40px 120px rgba(0,0,0,0.8), 0 0 0 1px rgba(201,168,76,0.06) inset',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top gradient strip */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.5) 30%, rgba(201,168,76,0.5) 70%, transparent 100%)',
          }}
        />

        {/* Header */}
        <div
          className="flex items-start justify-between px-6 pt-6 pb-4"
          style={{ borderBottom: '1px solid var(--surface-border)' }}
        >
          <div>
            <h2
              ref={titleRef}
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: '1.25rem',
                fontWeight: 700,
                color: 'var(--text)',
                lineHeight: 1.25,
                letterSpacing: '-0.02em',
              }}
            >
              {title}
            </h2>
            {subtitle && (
              <p
                className="mt-1 text-xs"
                style={{ color: 'var(--text-muted)', fontFamily: "'DM Sans', sans-serif" }}
              >
                {subtitle}
              </p>
            )}
          </div>

          <button
            onClick={onClose}
            className="flex-shrink-0 ml-4 p-1.5 rounded-lg transition-all duration-200 hover:scale-110"
            style={{
              color: 'var(--text-muted)',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid var(--surface-border)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = 'var(--gold)';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.3)';
              (e.currentTarget as HTMLElement).style.background = 'var(--gold-dim)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)';
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--surface-border)';
              (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)';
            }}
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div
          className="px-6 py-5"
          style={{
            color: 'var(--text-secondary)',
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.9375rem',
            lineHeight: 1.65,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;