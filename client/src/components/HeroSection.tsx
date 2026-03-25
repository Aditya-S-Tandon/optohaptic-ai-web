/**
 * DESIGN: Synaptic Dark — Bioluminescent Noir
 * Hero: Full-screen dark navy with floating 3D device, particle field,
 * Orbitron headline, and scroll CTA. The device image floats with parallax.
 */
import { useEffect, useRef, useState } from 'react';

const HERO_IMAGE = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663473632073/gXdKyMwjAN7ij6Q2tYrLFB/hero-device-4BJ8YQvhUAte6YrrTKmZRx.webp';

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const particlesRef = useRef<Array<{ x: number; y: number; vx: number; vy: number; size: number; opacity: number }>>([]);

  // Particle field animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialize particles
    if (particlesRef.current.length === 0) {
      for (let i = 0; i < 35; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.5 + 0.1,
        });
      }
    }

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 180, 216, ${p.opacity})`;
        ctx.fill();

        // Glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 180, 216, ${p.opacity * 0.15})`;
        ctx.fill();
      });

      // Draw connection lines between close particles
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const dx = particlesRef.current[i].x - particlesRef.current[j].x;
          const dy = particlesRef.current[i].y - particlesRef.current[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200) {
            ctx.beginPath();
            ctx.moveTo(particlesRef.current[i].x, particlesRef.current[i].y);
            ctx.lineTo(particlesRef.current[j].x, particlesRef.current[j].y);
            ctx.strokeStyle = `rgba(0, 180, 216, ${0.08 * (1 - dist / 200)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5,
    });
  };

  const scrollToSolution = () => {
    document.getElementById('problem')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #020340 0%, #03045E 50%, #041562 100%)' }}
      onMouseMove={handleMouseMove}
    >
      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Radial glow behind device */}
      <div
        className="absolute z-0"
        style={{
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(0,180,216,0.08) 0%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto flex flex-col items-center text-center px-4">
        {/* Badge */}
        <div
          className="mb-8 px-5 py-2 rounded-full text-sm font-medium tracking-wide animate-fade-in"
          style={{
            background: 'rgba(0, 180, 216, 0.1)',
            border: '1px solid rgba(0, 180, 216, 0.25)',
            color: '#90E0EF',
            animationDelay: '0.2s',
            animationFillMode: 'both',
          }}
        >
          338 Million People. One Solution.
        </div>

        {/* Device image with parallax */}
        <div
          className="relative w-full max-w-2xl mb-10 animate-fade-in"
          style={{
            transform: `translate(${mousePos.x * 15}px, ${mousePos.y * 10}px)`,
            transition: 'transform 0.3s ease-out',
            animationDelay: '0.4s',
            animationFillMode: 'both',
          }}
        >
          <img
            src={HERO_IMAGE}
            alt="OptoHaptic AI head-mounted device with 24 glowing haptic actuators"
            className="w-full h-auto drop-shadow-2xl"
            style={{
              filter: 'drop-shadow(0 0 40px rgba(0,180,216,0.3)) drop-shadow(0 20px 60px rgba(0,0,0,0.5))',
            }}
          />
          {/* Pulsing glow overlay on device */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(ellipse at 60% 40%, rgba(0,180,216,0.12) 0%, transparent 60%)',
              animation: 'pulse 3s ease-in-out infinite',
            }}
          />
        </div>

        {/* Headline */}
        <h1
          className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-wide text-white mb-6 animate-fade-in"
          style={{
            textShadow: '0 0 40px rgba(0,180,216,0.3), 0 0 80px rgba(0,180,216,0.1)',
            animationDelay: '0.6s',
            animationFillMode: 'both',
            letterSpacing: '0.05em',
          }}
        >
          A New Sense.
        </h1>

        {/* Sub-headline */}
        <p
          className="text-lg sm:text-xl max-w-2xl mb-10 animate-fade-in"
          style={{
            color: '#CAF0F8',
            lineHeight: 1.7,
            animationDelay: '0.8s',
            animationFillMode: 'both',
          }}
        >
          OptoHaptic AI translates the world around you into touch — giving the visually impaired a spatial sixth sense.
        </p>

        {/* CTA */}
        <button
          onClick={scrollToSolution}
          className="group px-8 py-4 rounded-full font-medium text-base transition-all duration-300 animate-fade-in"
          style={{
            background: 'linear-gradient(135deg, #00B4D8, #0077B6)',
            color: '#FFFFFF',
            boxShadow: '0 0 30px rgba(0,180,216,0.3), 0 4px 20px rgba(0,0,0,0.3)',
            animationDelay: '1s',
            animationFillMode: 'both',
          }}
          onMouseEnter={e => {
            (e.target as HTMLElement).style.boxShadow = '0 0 50px rgba(0,180,216,0.5), 0 4px 30px rgba(0,0,0,0.4)';
            (e.target as HTMLElement).style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={e => {
            (e.target as HTMLElement).style.boxShadow = '0 0 30px rgba(0,180,216,0.3), 0 4px 20px rgba(0,0,0,0.3)';
            (e.target as HTMLElement).style.transform = 'translateY(0)';
          }}
        >
          Discover the Technology
        </button>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" style={{ animationDelay: '2s' }}>
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center pt-2">
            <div className="w-1 h-2.5 rounded-full bg-cyan" style={{ background: '#00B4D8', animation: 'scrollDot 2s ease-in-out infinite' }} />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scrollDot {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(8px); opacity: 0.3; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
