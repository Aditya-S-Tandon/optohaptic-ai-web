/**
 * DESIGN: Synaptic Dark — Bioluminescent Noir
 * Device section: 17-version carousel showing design evolution.
 * Milestone cards with version ranges. Materials callout.
 */
import { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const MILESTONES = [
  {
    versions: 'V1 — V5',
    title: 'Structural Feasibility',
    description: 'Basic bracket and elastic band prototypes. Testing fundamental mounting concepts and weight distribution on the forehead.',
    color: '#0077B6',
  },
  {
    versions: 'V6 — V9',
    title: 'Curvature Breakthrough',
    description: 'Forehead-contoured rubber-seated architecture. Eliminated haptic bleed between actuators through isolation channels.',
    color: '#0096C7',
  },
  {
    versions: 'V10 — V12',
    title: 'Material Optimization',
    description: 'Exploring TPU flexibility with PLA rigidity. Iterating on cable routing and actuator mounting solutions.',
    color: '#00B4D8',
  },
  {
    versions: 'V13 — V16',
    title: 'Hybrid Material System',
    description: 'Hybrid PLA + TPU material system with integrated cable channels. Refined vibration isolation and comfort for extended wear.',
    color: '#48CAE4',
  },
  {
    versions: 'V17',
    title: 'Final Production Design',
    description: 'Final tweaked camera mount and alignment optimizations. Velcro bridge for easy matrix removal. Production-ready design.',
    color: '#90E0EF',
  },
];

const SPECS = [
  { label: 'Weight', value: '246g' },
  { label: 'Frame Rate', value: '~30 FPS' },
  { label: 'Power', value: '5V regulated rail' },
  { label: 'Actuators', value: '24 LRA motors' },
  { label: 'Controllers', value: '3× QT Py SAMD21' },
  { label: 'Camera', value: 'RealSense D435i' },
];

export default function DeviceSection() {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const [activeMilestone, setActiveMilestone] = useState(4); // Start at V17

  return (
    <section
      id="device"
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
            Engineered Through 17 Iterations
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
            Every version solved a real problem. From basic brackets to a precision-engineered wearable.
          </p>
        </div>

        {/* Timeline visualization */}
        <div
          className="max-w-4xl mx-auto mb-16 transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transitionDelay: '400ms',
          }}
        >
          {/* Version progress bar */}
          <div className="relative mb-8">
            <div className="h-1 rounded-full" style={{ background: 'rgba(0,180,216,0.1)' }}>
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${((activeMilestone + 1) / MILESTONES.length) * 100}%`,
                  background: 'linear-gradient(90deg, #0077B6, #00B4D8, #90E0EF)',
                  boxShadow: '0 0 15px rgba(0,180,216,0.4)',
                }}
              />
            </div>
            {/* Milestone dots */}
            <div className="flex justify-between mt-3">
              {MILESTONES.map((m, i) => (
                <button
                  key={i}
                  onClick={() => setActiveMilestone(i)}
                  className="flex flex-col items-center gap-2 group"
                >
                  <div
                    className="w-4 h-4 rounded-full transition-all duration-300"
                    style={{
                      background: i <= activeMilestone ? m.color : 'rgba(0,180,216,0.15)',
                      boxShadow: i === activeMilestone ? `0 0 12px ${m.color}` : 'none',
                      transform: i === activeMilestone ? 'scale(1.3)' : 'scale(1)',
                    }}
                  />
                  <span
                    className="font-mono-data text-xs transition-colors"
                    style={{ color: i === activeMilestone ? '#00B4D8' : '#90E0EF' }}
                  >
                    {m.versions.split(' ')[0]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Active milestone card */}
          <div
            className="p-6 sm:p-8 rounded-2xl transition-all duration-500"
            style={{
              background: 'rgba(0,180,216,0.06)',
              border: `1px solid ${MILESTONES[activeMilestone].color}30`,
              boxShadow: `0 0 30px ${MILESTONES[activeMilestone].color}10`,
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span
                className="font-display font-bold text-lg tracking-wider"
                style={{ color: MILESTONES[activeMilestone].color }}
              >
                {MILESTONES[activeMilestone].versions}
              </span>
              <div className="h-px flex-1" style={{ background: `${MILESTONES[activeMilestone].color}30` }} />
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3">
              {MILESTONES[activeMilestone].title}
            </h3>
            <p className="text-sm sm:text-base leading-relaxed" style={{ color: '#CAF0F8' }}>
              {MILESTONES[activeMilestone].description}
            </p>
          </div>
        </div>

        {/* Materials callout */}
        <div
          className="max-w-4xl mx-auto mb-12 p-6 rounded-2xl transition-all duration-700"
          style={{
            background: 'rgba(0,180,216,0.03)',
            border: '1px solid rgba(0,180,216,0.1)',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transitionDelay: '600ms',
          }}
        >
          <h4 className="font-display text-sm tracking-wider mb-4" style={{ color: '#00B4D8' }}>MATERIALS & CONSTRUCTION</h4>
          <p className="text-sm leading-relaxed" style={{ color: '#CAF0F8' }}>
            <span className="font-semibold text-white">TPU matrix</span> for vibration isolation and flexibility.{' '}
            <span className="font-semibold text-white">PLA housing</span> for structural rigidity.{' '}
            <span className="font-semibold text-white">Aquarium silicone</span> for haptic motor mounting.{' '}
            <span className="font-semibold text-white">Velcro bridge</span> for easy matrix removal and maintenance.
          </p>
        </div>

        {/* Specs grid */}
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {SPECS.map((spec, i) => (
            <div
              key={spec.label}
              className="p-4 rounded-xl text-center transition-all duration-700"
              style={{
                background: 'rgba(0,180,216,0.04)',
                border: '1px solid rgba(0,180,216,0.08)',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: `${800 + i * 100}ms`,
              }}
            >
              <div className="font-mono-data text-sm font-bold mb-1" style={{ color: '#00B4D8' }}>{spec.value}</div>
              <div className="text-xs" style={{ color: '#90E0EF' }}>{spec.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
