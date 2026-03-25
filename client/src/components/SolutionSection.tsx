/**
 * DESIGN: Synaptic Dark — Bioluminescent Noir
 * Solution section: The centerpiece. Interactive 3x8 haptic grid simulator
 * with scenario presets. Four pillars as animated cards. Cyan glow on active nodes.
 */
import { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

// Haptic grid scenarios — which of the 24 actuators (3 rows x 8 cols) activate
// Grid indexed [row][col] where row 0 = top, col 0 = leftmost
type Scenario = {
  name: string;
  description: string;
  patternId: number;
  depthModifier: string;
  depthZone: string;
  grid: number[][]; // 3x8 grid, 0=off, 1=low, 2=med, 3=high intensity
};

const SCENARIOS: Scenario[] = [
  {
    name: 'Person 2m Ahead',
    description: 'Person detected at 2 meters — center columns activate across all rows',
    patternId: 1,
    depthModifier: '+2',
    depthZone: '<3.25m',
    grid: [
      [0, 0, 1, 2, 2, 1, 0, 0],
      [0, 0, 2, 3, 3, 2, 0, 0],
      [0, 0, 1, 2, 2, 1, 0, 0],
    ],
  },
  {
    name: 'Vehicle Approaching Left',
    description: 'Vehicle detected approaching from the left side',
    patternId: 10,
    depthModifier: '+3',
    depthZone: '<1m',
    grid: [
      [3, 3, 2, 1, 0, 0, 0, 0],
      [3, 3, 3, 2, 1, 0, 0, 0],
      [3, 3, 2, 1, 0, 0, 0, 0],
    ],
  },
  {
    name: 'Stop Sign 5m',
    description: 'Stop sign detected at 5 meters — center activation, low intensity',
    patternId: 12,
    depthModifier: '+0',
    depthZone: '>3.25m',
    grid: [
      [0, 0, 0, 1, 1, 0, 0, 0],
      [0, 0, 1, 1, 1, 1, 0, 0],
      [0, 0, 0, 1, 1, 0, 0, 0],
    ],
  },
  {
    name: 'Obstacle 0.8m',
    description: 'Very close obstacle — high intensity center alert (depth mode)',
    patternId: 45,
    depthModifier: '+3',
    depthZone: '<1m',
    grid: [
      [1, 2, 3, 3, 3, 3, 2, 1],
      [2, 3, 3, 3, 3, 3, 3, 2],
      [1, 2, 3, 3, 3, 3, 2, 1],
    ],
  },
  {
    name: 'Clear Path',
    description: 'No obstacles detected — all actuators idle',
    patternId: 0,
    depthModifier: 'N/A',
    depthZone: 'N/A',
    grid: [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ],
  },
];

const PILLARS = [
  { icon: '📡', title: 'SENSE', subtitle: 'Intel RealSense D435i', desc: 'Depth camera with IMU for real-time 3D spatial mapping' },
  { icon: '🔍', title: 'DETECT', subtitle: 'YOLOv8 Recognition', desc: 'Real-time object detection across 80+ classes' },
  { icon: '⚡', title: 'ENCODE', subtitle: '160 Haptic Patterns', desc: 'Depth-modified vibration patterns for spatial encoding' },
  { icon: '🖐', title: 'FEEL', subtitle: '3×8 Forehead Matrix', desc: '24 LRA actuators deliver structured touch feedback' },
];

function HapticGrid({ scenario }: { scenario: Scenario }) {
  return (
    <div className="relative">
      {/* Forehead outline */}
      <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto" style={{ filter: 'drop-shadow(0 0 20px rgba(0,180,216,0.15))' }}>
        {/* Forehead shape */}
        <ellipse cx="200" cy="120" rx="180" ry="100" fill="none" stroke="rgba(0,180,216,0.2)" strokeWidth="1.5" />
        <ellipse cx="200" cy="120" rx="170" ry="90" fill="rgba(3,4,94,0.5)" stroke="rgba(0,180,216,0.1)" strokeWidth="1" />

        {/* 3x8 grid of actuator nodes */}
        {scenario.grid.map((row, rowIdx) =>
          row.map((intensity, colIdx) => {
            const cx = 65 + colIdx * 38.5;
            const cy = 75 + rowIdx * 40;
            const colors = ['rgba(0,180,216,0.15)', 'rgba(0,180,216,0.4)', 'rgba(0,180,216,0.7)', 'rgba(0,180,216,1)'];
            const glowSizes = [0, 6, 12, 20];
            const sizes = [5, 6, 7, 8];

            return (
              <g key={`${rowIdx}-${colIdx}`}>
                {/* Glow */}
                {intensity > 0 && (
                  <circle
                    cx={cx} cy={cy} r={sizes[intensity] + glowSizes[intensity]}
                    fill={colors[intensity]}
                    opacity={0.3}
                  >
                    <animate attributeName="r" values={`${sizes[intensity] + glowSizes[intensity]};${sizes[intensity] + glowSizes[intensity] + 4};${sizes[intensity] + glowSizes[intensity]}`} dur="1.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.3;0.15;0.3" dur="1.5s" repeatCount="indefinite" />
                  </circle>
                )}
                {/* Node */}
                <circle
                  cx={cx} cy={cy} r={sizes[intensity]}
                  fill={colors[intensity]}
                  style={{ transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)' }}
                />
                {intensity > 0 && (
                  <circle cx={cx} cy={cy} r={sizes[intensity] * 0.4} fill="rgba(255,255,255,0.6)">
                    <animate attributeName="opacity" values="0.6;0.2;0.6" dur="1.2s" repeatCount="indefinite" />
                  </circle>
                )}
              </g>
            );
          })
        )}
      </svg>
    </div>
  );
}

export default function SolutionSection() {
  const [activeScenario, setActiveScenario] = useState(0);
  const { ref, isVisible } = useScrollAnimation(0.1);

  const scenario = SCENARIOS[activeScenario];

  return (
    <section
      id="solution"
      ref={ref}
      className="relative py-24 sm:py-32 lg:py-40 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #020340 0%, #03045E 40%, #041562 100%)' }}
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
            Structured Touch. Spatial Awareness.
          </h2>
          <p
            className="text-base sm:text-lg max-w-3xl mx-auto leading-relaxed transition-all duration-700"
            style={{
              color: '#CAF0F8',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transitionDelay: '200ms',
            }}
          >
            The system captures depth and objects through an Intel RealSense D435i, processes it with YOLOv8 object detection, and encodes that spatial data into 24 vibration actuators arranged in a 3×8 grid across the forehead.
          </p>
        </div>

        {/* Four Pillars */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-20 lg:mb-28">
          {PILLARS.map((pillar, i) => (
            <div
              key={pillar.title}
              className="p-5 sm:p-6 rounded-2xl text-center transition-all duration-700 hover:scale-[1.02]"
              style={{
                background: 'rgba(0, 180, 216, 0.04)',
                border: '1px solid rgba(0, 180, 216, 0.12)',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                transitionDelay: `${i * 150}ms`,
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 0 30px rgba(0,180,216,0.15)';
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,180,216,0.3)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,180,216,0.12)';
              }}
            >
              <div className="text-3xl mb-3">{pillar.icon}</div>
              <h3 className="font-display font-bold text-sm sm:text-base tracking-widest mb-1" style={{ color: '#00B4D8' }}>
                {pillar.title}
              </h3>
              <p className="font-mono-data text-xs mb-2" style={{ color: '#90E0EF' }}>{pillar.subtitle}</p>
              <p className="text-xs sm:text-sm" style={{ color: '#CAF0F8' }}>{pillar.desc}</p>
            </div>
          ))}
        </div>

        {/* Haptic Grid Simulator */}
        <div
          className="max-w-5xl mx-auto transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transitionDelay: '600ms',
          }}
        >
          <h3 className="font-display text-xl sm:text-2xl text-center mb-3 tracking-wide text-white">
            Interactive Haptic Grid Simulator
          </h3>
          <p className="text-center text-sm mb-10" style={{ color: '#90E0EF' }}>
            Select a scenario to see which actuators activate on the forehead matrix
          </p>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Grid visualization */}
            <div className="order-1">
              <HapticGrid scenario={scenario} />
              {/* Row/Col labels */}
              <div className="flex justify-center gap-2 mt-4">
                <span className="text-xs font-mono-data px-2 py-1 rounded" style={{ color: '#90E0EF', background: 'rgba(0,180,216,0.08)' }}>
                  3 rows × 8 columns = 24 actuators
                </span>
              </div>
            </div>

            {/* Controls + Data panel */}
            <div className="order-2 space-y-6">
              {/* Scenario buttons */}
              <div className="flex flex-wrap gap-2">
                {SCENARIOS.map((s, i) => (
                  <button
                    key={s.name}
                    onClick={() => setActiveScenario(i)}
                    className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
                    style={{
                      background: activeScenario === i ? 'rgba(0,180,216,0.2)' : 'rgba(0,180,216,0.05)',
                      border: `1px solid ${activeScenario === i ? 'rgba(0,180,216,0.5)' : 'rgba(0,180,216,0.15)'}`,
                      color: activeScenario === i ? '#00B4D8' : '#90E0EF',
                      boxShadow: activeScenario === i ? '0 0 15px rgba(0,180,216,0.2)' : 'none',
                    }}
                  >
                    {s.name}
                  </button>
                ))}
              </div>

              {/* Data panel */}
              <div
                className="p-5 rounded-xl space-y-3"
                style={{
                  background: 'rgba(3, 4, 94, 0.6)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(0, 180, 216, 0.15)',
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full" style={{ background: '#00B4D8', boxShadow: '0 0 8px #00B4D8' }} />
                  <span className="font-mono-data text-xs tracking-wider" style={{ color: '#00B4D8' }}>LIVE DATA PANEL</span>
                </div>
                <p className="text-sm" style={{ color: '#CAF0F8' }}>{scenario.description}</p>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div>
                    <span className="text-xs block mb-1" style={{ color: '#90E0EF' }}>Pattern ID</span>
                    <span className="font-mono-data text-lg font-bold" style={{ color: '#00B4D8' }}>#{scenario.patternId}</span>
                  </div>
                  <div>
                    <span className="text-xs block mb-1" style={{ color: '#90E0EF' }}>Depth Modifier</span>
                    <span className="font-mono-data text-lg font-bold" style={{ color: '#00B4D8' }}>{scenario.depthModifier}</span>
                  </div>
                  <div>
                    <span className="text-xs block mb-1" style={{ color: '#90E0EF' }}>Depth Zone</span>
                    <span className="font-mono-data text-sm" style={{ color: '#FFFFFF' }}>{scenario.depthZone}</span>
                  </div>
                  <div>
                    <span className="text-xs block mb-1" style={{ color: '#90E0EF' }}>Active Actuators</span>
                    <span className="font-mono-data text-sm" style={{ color: '#FFFFFF' }}>
                      {scenario.grid.flat().filter(v => v > 0).length} / 24
                    </span>
                  </div>
                </div>
              </div>

              {/* Intensity legend */}
              <div className="flex items-center gap-4 text-xs" style={{ color: '#90E0EF' }}>
                <span>Intensity:</span>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full" style={{ background: 'rgba(0,180,216,0.15)' }} />
                  <span>Off</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full" style={{ background: 'rgba(0,180,216,0.4)' }} />
                  <span>Low</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full" style={{ background: 'rgba(0,180,216,0.7)' }} />
                  <span>Med</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full" style={{ background: 'rgba(0,180,216,1)' }} />
                  <span>High</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
