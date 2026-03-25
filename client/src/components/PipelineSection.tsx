/**
 * DESIGN: Synaptic Dark — Bioluminescent Noir
 * Pipeline: Horizontal connected nodes with glowing cards and traveling data particles.
 * Each step expands on scroll. Mobile: vertical stacked.
 */
import { useState, useEffect } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const STEPS = [
  {
    id: 'camera',
    icon: '📷',
    title: 'CAMERA',
    subtitle: 'Intel RealSense D435i',
    detail: 'Captures RGB + depth at 640×480, 15 FPS. IMU stabilizes spatial map during head motion.',
  },
  {
    id: 'processing',
    icon: '🧠',
    title: 'PROCESSING',
    subtitle: 'YOLOv8 Detection',
    detail: 'Identifies 80+ object classes. Alternates every 1s between Object Mode (YOLO) and Depth Mode (obstacle grid).',
  },
  {
    id: 'encoding',
    icon: '⚡',
    title: 'ENCODING',
    subtitle: 'Pattern Mapping',
    detail: 'Object class mapped to base haptic pattern. Depth modifier (+0 to +3) applied based on distance zone.',
  },
  {
    id: 'transmission',
    icon: '📡',
    title: 'TRANSMISSION',
    subtitle: 'USB CDC Serial',
    detail: 'Pattern data sent as JSON array at 115200 baud to 3× QT Py SAMD21 microcontrollers.',
  },
  {
    id: 'actuation',
    icon: '🔔',
    title: 'ACTUATION',
    subtitle: 'DRV2605L Haptic ICs',
    detail: 'Each QT Py drives 8× DRV2605L via I2C multiplexer (TCA9548A). ERM/LRA motors vibrate in forehead matrix.',
  },
];

export default function PipelineSection() {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const [activeStep, setActiveStep] = useState(-1);

  useEffect(() => {
    if (!isVisible) return;
    // Sequentially reveal steps
    const timers: NodeJS.Timeout[] = [];
    STEPS.forEach((_, i) => {
      timers.push(setTimeout(() => setActiveStep(i), 400 + i * 400));
    });
    return () => timers.forEach(clearTimeout);
  }, [isVisible]);

  return (
    <section
      id="pipeline"
      ref={ref}
      className="relative py-24 sm:py-32 lg:py-40 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #041562 0%, #03045E 50%, #020340 100%)' }}
    >
      <div className="container mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <h2
            className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl tracking-wide mb-4 transition-all duration-700"
            style={{
              color: '#FFFFFF',
              textShadow: '0 0 30px rgba(0,180,216,0.2)',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            }}
          >
            How It Works
          </h2>
          <p
            className="text-base sm:text-lg max-w-2xl mx-auto transition-all duration-700"
            style={{
              color: '#CAF0F8',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transitionDelay: '200ms',
            }}
          >
            From camera to forehead — the complete data pipeline in under 330ms
          </p>
        </div>

        {/* Desktop: Horizontal pipeline */}
        <div className="hidden lg:block">
          <div className="relative flex items-start justify-between gap-4 px-4">
            {/* Connection line */}
            <div className="absolute top-16 left-[10%] right-[10%] h-px" style={{ background: 'rgba(0,180,216,0.15)' }}>
              {/* Traveling particle */}
              <div
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
                style={{
                  background: '#00B4D8',
                  boxShadow: '0 0 12px #00B4D8, 0 0 24px rgba(0,180,216,0.5)',
                  animation: isVisible ? 'travelParticle 3s ease-in-out infinite' : 'none',
                }}
              />
              {/* Glow trail */}
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{
                  background: `linear-gradient(90deg, transparent, rgba(0,180,216,${isVisible ? 0.4 : 0}), transparent)`,
                  transition: 'all 1s ease',
                }}
              />
            </div>

            {STEPS.map((step, i) => (
              <div
                key={step.id}
                className="relative flex-1 text-center transition-all duration-700"
                style={{
                  opacity: i <= activeStep ? 1 : 0.2,
                  transform: i <= activeStep ? 'translateY(0)' : 'translateY(20px)',
                }}
              >
                {/* Node circle */}
                <div
                  className="w-12 h-12 mx-auto rounded-full flex items-center justify-center text-xl mb-4 transition-all duration-500"
                  style={{
                    background: i <= activeStep ? 'rgba(0,180,216,0.15)' : 'rgba(0,180,216,0.05)',
                    border: `2px solid ${i <= activeStep ? 'rgba(0,180,216,0.5)' : 'rgba(0,180,216,0.1)'}`,
                    boxShadow: i <= activeStep ? '0 0 20px rgba(0,180,216,0.2)' : 'none',
                  }}
                >
                  {step.icon}
                </div>

                {/* Card */}
                <div
                  className="p-4 rounded-xl transition-all duration-500"
                  style={{
                    background: i <= activeStep ? 'rgba(0,180,216,0.06)' : 'rgba(0,180,216,0.02)',
                    border: `1px solid ${i <= activeStep ? 'rgba(0,180,216,0.2)' : 'rgba(0,180,216,0.05)'}`,
                  }}
                >
                  <h4 className="font-display text-xs tracking-widest mb-1" style={{ color: '#00B4D8' }}>{step.title}</h4>
                  <p className="font-mono-data text-xs mb-2" style={{ color: '#90E0EF' }}>{step.subtitle}</p>
                  <p className="text-xs leading-relaxed" style={{ color: '#CAF0F8' }}>{step.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: Vertical pipeline */}
        <div className="lg:hidden space-y-6">
          {STEPS.map((step, i) => (
            <div
              key={step.id}
              className="flex gap-4 transition-all duration-700"
              style={{
                opacity: i <= activeStep ? 1 : 0.2,
                transform: i <= activeStep ? 'translateX(0)' : 'translateX(-20px)',
              }}
            >
              {/* Vertical line + node */}
              <div className="flex flex-col items-center">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-lg shrink-0"
                  style={{
                    background: i <= activeStep ? 'rgba(0,180,216,0.15)' : 'rgba(0,180,216,0.05)',
                    border: `2px solid ${i <= activeStep ? 'rgba(0,180,216,0.5)' : 'rgba(0,180,216,0.1)'}`,
                    boxShadow: i <= activeStep ? '0 0 15px rgba(0,180,216,0.2)' : 'none',
                  }}
                >
                  {step.icon}
                </div>
                {i < STEPS.length - 1 && (
                  <div className="w-px flex-1 my-2" style={{ background: 'rgba(0,180,216,0.15)' }} />
                )}
              </div>

              {/* Card */}
              <div
                className="flex-1 p-4 rounded-xl mb-2"
                style={{
                  background: 'rgba(0,180,216,0.04)',
                  border: '1px solid rgba(0,180,216,0.12)',
                }}
              >
                <h4 className="font-display text-xs tracking-widest mb-1" style={{ color: '#00B4D8' }}>{step.title}</h4>
                <p className="font-mono-data text-xs mb-1" style={{ color: '#90E0EF' }}>{step.subtitle}</p>
                <p className="text-sm leading-relaxed" style={{ color: '#CAF0F8' }}>{step.detail}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Latency callout */}
        <div
          className="mt-12 text-center transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transitionDelay: '2500ms',
          }}
        >
          <div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full"
            style={{
              background: 'rgba(0,180,216,0.08)',
              border: '1px solid rgba(0,180,216,0.2)',
            }}
          >
            <span className="text-sm" style={{ color: '#90E0EF' }}>End-to-end latency:</span>
            <span className="font-mono-data font-bold text-lg" style={{ color: '#00B4D8' }}>275ms</span>
            <span className="text-xs" style={{ color: '#90E0EF' }}>base</span>
            <span className="mx-1" style={{ color: 'rgba(0,180,216,0.3)' }}>|</span>
            <span className="font-mono-data font-bold text-lg" style={{ color: '#00B4D8' }}>330ms</span>
            <span className="text-xs" style={{ color: '#90E0EF' }}>8 objects</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes travelParticle {
          0% { left: 0%; }
          100% { left: 100%; }
        }
      `}</style>
    </section>
  );
}
