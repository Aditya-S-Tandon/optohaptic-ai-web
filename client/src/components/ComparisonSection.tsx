/**
 * DESIGN: Synaptic Dark — Bioluminescent Noir
 * Comparison: Table with checkmarks + SVG radar chart.
 * OptoHaptic AI dominates across all dimensions.
 */
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const DEVICES = [
  { name: 'OptoHaptic AI', range: '10m', offline: true, nonAuditory: true, affordable: true, tactile: true, headMounted: true },
  { name: 'White Cane', range: '~1.2m', offline: true, nonAuditory: true, affordable: true, tactile: false, headMounted: false },
  { name: 'Audio Systems', range: '3-5m', offline: false, nonAuditory: false, affordable: false, tactile: false, headMounted: true },
  { name: 'HoloLens', range: '5m', offline: false, nonAuditory: false, affordable: false, tactile: false, headMounted: true },
  { name: 'Apple Vision Pro', range: '5m', offline: false, nonAuditory: false, affordable: false, tactile: false, headMounted: true },
];

const COLUMNS = [
  { key: 'range', label: 'Detection Range' },
  { key: 'offline', label: 'Works Offline' },
  { key: 'nonAuditory', label: 'Non-Auditory' },
  { key: 'affordable', label: 'Affordable' },
  { key: 'tactile', label: 'Tactile Feedback' },
  { key: 'headMounted', label: 'Head-Mounted' },
];

// Radar chart data (0-100 scale)
const RADAR_AXES = ['Range', 'Affordability', 'Tactile\nBandwidth', 'Offline\nOperation', 'Sensory\nIndependence'];
const RADAR_DATA = {
  'OptoHaptic AI': [95, 85, 95, 100, 100],
  'White Cane': [15, 95, 10, 100, 80],
  'Audio Systems': [40, 30, 5, 20, 10],
};

function RadarChart({ isVisible }: { isVisible: boolean }) {
  const cx = 150, cy = 150, r = 110;
  const axes = RADAR_AXES.length;

  const getPoint = (axisIdx: number, value: number) => {
    const angle = (Math.PI * 2 * axisIdx) / axes - Math.PI / 2;
    const dist = (value / 100) * r;
    return { x: cx + dist * Math.cos(angle), y: cy + dist * Math.sin(angle) };
  };

  const getPolygonPoints = (values: number[]) =>
    values.map((v, i) => {
      const p = getPoint(i, v);
      return `${p.x},${p.y}`;
    }).join(' ');

  return (
    <svg viewBox="0 0 300 300" className="w-full max-w-sm mx-auto">
      {/* Grid circles */}
      {[20, 40, 60, 80, 100].map(level => (
        <polygon
          key={level}
          points={Array.from({ length: axes }, (_, i) => {
            const p = getPoint(i, level);
            return `${p.x},${p.y}`;
          }).join(' ')}
          fill="none"
          stroke="rgba(0,180,216,0.1)"
          strokeWidth="0.5"
        />
      ))}

      {/* Axis lines */}
      {Array.from({ length: axes }, (_, i) => {
        const p = getPoint(i, 100);
        return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="rgba(0,180,216,0.15)" strokeWidth="0.5" />;
      })}

      {/* Axis labels */}
      {RADAR_AXES.map((label, i) => {
        const p = getPoint(i, 125);
        return (
          <text
            key={i}
            x={p.x}
            y={p.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#90E0EF"
            fontSize="8"
            fontFamily="Inter, sans-serif"
          >
            {label.split('\n').map((line, li) => (
              <tspan key={li} x={p.x} dy={li === 0 ? 0 : 10}>{line}</tspan>
            ))}
          </text>
        );
      })}

      {/* Data polygons */}
      {/* Audio Systems - background */}
      <polygon
        points={getPolygonPoints(RADAR_DATA['Audio Systems'])}
        fill="rgba(144,224,239,0.05)"
        stroke="rgba(144,224,239,0.3)"
        strokeWidth="1"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 1s ease 0.8s',
        }}
      />
      {/* White Cane */}
      <polygon
        points={getPolygonPoints(RADAR_DATA['White Cane'])}
        fill="rgba(0,119,182,0.08)"
        stroke="rgba(0,119,182,0.5)"
        strokeWidth="1"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 1s ease 0.6s',
        }}
      />
      {/* OptoHaptic AI - foreground */}
      <polygon
        points={getPolygonPoints(RADAR_DATA['OptoHaptic AI'])}
        fill="rgba(0,180,216,0.15)"
        stroke="#00B4D8"
        strokeWidth="2"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 1s ease 0.4s',
          filter: 'drop-shadow(0 0 8px rgba(0,180,216,0.4))',
        }}
      />

      {/* Data points for OptoHaptic AI */}
      {RADAR_DATA['OptoHaptic AI'].map((v, i) => {
        const p = getPoint(i, v);
        return (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="3"
            fill="#00B4D8"
            style={{
              opacity: isVisible ? 1 : 0,
              transition: `opacity 0.5s ease ${0.4 + i * 0.1}s`,
            }}
          />
        );
      })}
    </svg>
  );
}

export default function ComparisonSection() {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section
      id="comparison"
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
            How We Compare
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
            OptoHaptic AI fills a gap no existing solution addresses
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Comparison table */}
          <div
            className="lg:col-span-3 overflow-x-auto transition-all duration-700"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transitionDelay: '400ms',
            }}
          >
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left py-3 px-3 font-medium" style={{ color: '#90E0EF' }}>Device</th>
                  {COLUMNS.map(col => (
                    <th key={col.key} className="py-3 px-2 text-center font-medium text-xs" style={{ color: '#90E0EF' }}>
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {DEVICES.map((device, i) => (
                  <tr
                    key={device.name}
                    className="transition-all duration-500"
                    style={{
                      borderTop: '1px solid rgba(0,180,216,0.08)',
                      background: i === 0 ? 'rgba(0,180,216,0.06)' : 'transparent',
                    }}
                  >
                    <td className="py-3 px-3 font-medium" style={{ color: i === 0 ? '#00B4D8' : '#FFFFFF' }}>
                      {device.name}
                    </td>
                    <td className="py-3 px-2 text-center font-mono-data text-xs" style={{ color: i === 0 ? '#00B4D8' : '#CAF0F8' }}>
                      {device.range}
                    </td>
                    {['offline', 'nonAuditory', 'affordable', 'tactile', 'headMounted'].map(key => {
                      const val = device[key as keyof typeof device];
                      return (
                        <td key={key} className="py-3 px-2 text-center">
                          {val ? (
                            <span style={{ color: '#00B4D8' }}>✓</span>
                          ) : (
                            <span style={{ color: 'rgba(144,224,239,0.3)' }}>—</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Radar chart */}
          <div
            className="lg:col-span-2 transition-all duration-700"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transitionDelay: '600ms',
            }}
          >
            <RadarChart isVisible={isVisible} />
            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-4 mt-4 text-xs">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-0.5" style={{ background: '#00B4D8' }} />
                <span style={{ color: '#00B4D8' }}>OptoHaptic AI</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-0.5" style={{ background: '#0077B6' }} />
                <span style={{ color: '#90E0EF' }}>White Cane</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-0.5" style={{ background: 'rgba(144,224,239,0.5)' }} />
                <span style={{ color: '#90E0EF' }}>Audio Systems</span>
              </div>
            </div>
          </div>
        </div>

        {/* Key differentiators */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12 max-w-5xl mx-auto">
          {[
            { stat: '10m', label: 'Detection range vs 1-2m for ultrasonic canes' },
            { stat: '100%', label: 'Offline — no cloud, no privacy risk' },
            { stat: '0', label: 'Auditory interference — hearing stays free' },
            { stat: '<$200', label: 'Target BOM vs $3,500+ HoloLens' },
          ].map((item, i) => (
            <div
              key={i}
              className="p-4 rounded-xl text-center transition-all duration-700"
              style={{
                background: 'rgba(0,180,216,0.04)',
                border: '1px solid rgba(0,180,216,0.08)',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: `${800 + i * 150}ms`,
              }}
            >
              <div className="font-display font-bold text-xl mb-1" style={{ color: '#00B4D8' }}>{item.stat}</div>
              <p className="text-xs" style={{ color: '#90E0EF' }}>{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
