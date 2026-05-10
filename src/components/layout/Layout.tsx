import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  const { pathname } = useLocation();
  const blob1 = useRef<HTMLDivElement>(null);
  const blob2 = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);

  /* ── ambient blob float ── */
  useEffect(() => {
    const tl1 = gsap.timeline({ repeat: -1, yoyo: true, ease: 'sine.inOut' });
    tl1.to(blob1.current, { y: -40, x: 30, duration: 8 });

    const tl2 = gsap.timeline({ repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 4 });
    tl2.to(blob2.current, { y: 50, x: -40, duration: 10 });

    return () => { tl1.kill(); tl2.kill(); };
  }, []);

  /* ── page transition on route change ── */
  useEffect(() => {
    if (!mainRef.current) return;
    gsap.fromTo(
      mainRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', clearProps: 'all' }
    );
  }, [pathname]);

  return (
    <div
      className="w-full min-h-screen flex flex-col relative overflow-x-hidden"
      style={{ backgroundColor: 'var(--bg)' }}
    >
      {/* Ambient background blobs */}
      <div
        ref={blob1}
        className="ambient-blob"
        style={{
          width: '600px',
          height: '600px',
          top: '-200px',
          right: '-100px',
          background: 'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)',
          zIndex: 0,
        }}
      />
      <div
        ref={blob2}
        className="ambient-blob"
        style={{
          width: '500px',
          height: '500px',
          bottom: '10%',
          left: '-150px',
          background: 'radial-gradient(circle, rgba(79,124,255,0.06) 0%, transparent 70%)',
          zIndex: 0,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main ref={mainRef} className="flex-grow pt-24">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;