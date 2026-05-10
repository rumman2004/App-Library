import { Download, Check, Loader } from 'lucide-react';
import { useRef, useState } from 'react';
import gsap from 'gsap';

interface DownloadButtonProps {
  url: string;
  appName: string;
  version: string;
  /** Optional: override gradient from color */
  accentFrom?: string;
  /** Optional: override gradient to color */
  accentTo?: string;
  /** Use gold style (default) or blue style */
  colorScheme?: 'gold' | 'blue' | 'custom';
}

const DownloadButton = ({
  url: _url,
  appName,
  version,
  colorScheme = 'gold',
  accentFrom,
  accentTo,
}: DownloadButtonProps) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [state, setState] = useState<'idle' | 'loading' | 'done'>('idle');

  const schemeStyles = {
    gold: {
      background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%)',
      color: '#0b0c10',
      boxShadow: '0 4px 24px rgba(201,168,76,0.3)',
    },
    blue: {
      background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-hover) 100%)',
      color: '#ffffff',
      boxShadow: '0 4px 24px rgba(79,124,255,0.3)',
    },
    custom: {
      background: `linear-gradient(135deg, ${accentFrom ?? 'var(--gold)'} 0%, ${accentTo ?? 'var(--gold-light)'} 100%)`,
      color: '#ffffff',
      boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
    },
  };

  const handleClick = () => {
    if (state !== 'idle') return;
    setState('loading');

    const tl = gsap.timeline();
    tl.to(btnRef.current, { scale: 0.95, duration: 0.1, ease: 'power2.in' });
    tl.to(btnRef.current, { scale: 1, duration: 0.2, ease: 'back.out(2)' });

    /* simulate download */
    setTimeout(() => {
      setState('done');
      gsap.fromTo(
        btnRef.current,
        { scale: 0.95 },
        { scale: 1, duration: 0.4, ease: 'elastic.out(1.2, 0.5)' }
      );
      setTimeout(() => setState('idle'), 2800);
    }, 1600);

    console.log(`Download: ${appName} v${version}`);
  };

  const currentStyle = schemeStyles[colorScheme];

  return (
    <button
      ref={btnRef}
      onClick={handleClick}
      disabled={state !== 'idle'}
      className="group relative flex items-center gap-2.5 rounded-[var(--radius-md)] font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 active:scale-95 overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
      style={{
        padding: '0.75rem 1.75rem',
        fontFamily: "'DM Sans', sans-serif",
        letterSpacing: '0.01em',
        ...currentStyle,
        ...(state !== 'idle' ? { opacity: 0.85, cursor: 'default' } : {}),
      }}
      onMouseEnter={() => {
        if (state !== 'idle') return;
        gsap.to(btnRef.current, {
          boxShadow: colorScheme === 'gold'
            ? '0 8px 40px rgba(201,168,76,0.45)'
            : '0 8px 40px rgba(79,124,255,0.45)',
          duration: 0.25,
        });
      }}
      onMouseLeave={() => {
        gsap.to(btnRef.current, { boxShadow: currentStyle.boxShadow, duration: 0.25 });
      }}
    >
      {/* shimmer sweep */}
      <span
        className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"
        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)' }}
      />

      {/* icon */}
      <span className="relative z-10 flex items-center justify-center w-5 h-5">
        {state === 'loading' ? (
          <Loader className="w-4 h-4 animate-spin" />
        ) : state === 'done' ? (
          <Check className="w-4 h-4" strokeWidth={2.5} />
        ) : (
          <Download
            className="w-4 h-4 transition-transform duration-200 group-hover:translate-y-0.5"
            strokeWidth={2}
          />
        )}
      </span>

      {/* label */}
      <span ref={labelRef} className="relative z-10">
        {state === 'loading'
          ? 'Downloading…'
          : state === 'done'
          ? 'Downloaded!'
          : `Download v${version}`}
      </span>
    </button>
  );
};

export default DownloadButton;