/**
 * DESIGN: Synaptic Dark — Bioluminescent Noir
 * Results: Dark background, glowing cyan/blue charts. All animate on scroll.
 * Bar charts, metric cards, latency display.
 */
import { useScrollAnimation, useCountUp } from '@/hooks/useScrollAnimation';

function AnimatedBarChart({ data, labels, title, isVisible }: {
  data: number[];
  labels: string[];
  title: string;
  isVisible: boolean;
}) {
  const maxVal = Math.max(...data);

  return (
    <div
      className="p-6 rounded-2xl transition-all duration-700"
      style={{
        background: 'rgba(0,180,216,0.04)',
        border: '1px solid rgba(0,180,216,0.12)',
      }}
    >
      <h4 className="font-display text-sm tracking-wider mb-6" style={{ color: '#00B4D8' }}>{title}</h4>
      <div className="space-y-4">
        {data.map((val, i) => (
          <div key={i}>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-xs" style={{ color: '#90E0EF' }}>{labels[i]}</span>
              <span className="font-mono-data text-xs font-medium" style={{ color: '#00B4D8' }}>{val}%</span>
            </div>
            <div className="h-2.5 rounded-full overflow-hidden" style={{ background: 'rgba(0,180,216,0.08)' }}>
              <div
                className="h-full rounded-full"
                style={{
                  width: isVisible ? `${(val / maxVal) * 100}%` : '0%',
                  background: `linear-gradient(90deg, #0077B6, #00B4D8)`,
                  boxShadow: '0 0 10px rgba(0,180,216,0.4)',
                  transition: `width 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${i * 200}ms`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MetricCard({ value, unit, label, delay, isVisible }: {
  value: number; unit: string; label: string; delay: number; isVisible: boolean;
}) {
  const count = useCountUp(value, 1800, isVisible);

  return (
    <div
      className="p-5 rounded-xl text-center transition-all duration-700"
      style={{
        background: 'rgba(0,180,216,0.04)',
        border: '1px solid rgba(0,180,216,0.1)',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transitionDelay: `${delay}ms`,
      }}
    >
      <div className="font-display font-bold text-2xl sm:text-3xl mb-1" style={{ color: '#00B4D8', textShadow: '0 0 15px rgba(0,180,216,0.3)' }}>
        {count.toLocaleString()}<span className="text-lg">{unit}</span>
      </div>
      <p className="text-xs sm:text-sm" style={{ color: '#90E0EF' }}>{label}</p>
    </div>
  );
}

export default function ResultsSection() {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section
      id="results"
      ref={ref}
      className="relative py-24 sm:py-32 lg:py-40 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #020340 0%, #03045E 50%, #041562 100%)' }}
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
            Performance & Results
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
            2,400+ controlled trials across 60 objects — this is not a concept, it works.
          </p>
        </div>

        {/* Key metrics row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12 lg:mb-16">
          <MetricCard value={2400} unit="+" label="Controlled trials" delay={0} isVisible={isVisible} />
          <MetricCard value={160} unit="" label="Unique haptic patterns" delay={200} isVisible={isVisible} />
          <MetricCard value={30} unit=" FPS" label="Real-time frame rate" delay={400} isVisible={isVisible} />
          <MetricCard value={246} unit="g" label="Device weight" delay={600} isVisible={isVisible} />
        </div>

        {/* Charts grid */}
        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          <AnimatedBarChart
            title="ACCURACY BY DISTANCE"
            data={[100, 100, 95, 80]}
            labels={['1-4m (Close Range)', '4m (Mid Range)', '10m (Long Range)', '20m (Extended)']}
            isVisible={isVisible}
          />

          <AnimatedBarChart
            title="DETECTION RANGE COMPARISON"
            data={[12, 20, 100]}
            labels={['White Cane (~1.2m)', 'Ultrasonic Devices (~2m)', 'OptoHaptic AI (10m)']}
            isVisible={isVisible}
          />
        </div>

        {/* Additional metrics */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Latency */}
          <div
            className="p-5 rounded-xl transition-all duration-700"
            style={{
              background: 'rgba(0,180,216,0.04)',
              border: '1px solid rgba(0,180,216,0.1)',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transitionDelay: '800ms',
            }}
          >
            <h4 className="font-display text-xs tracking-wider mb-4" style={{ color: '#00B4D8' }}>LATENCY</h4>
            <div className="flex items-end gap-4">
              <div>
                <div className="font-mono-data text-2xl font-bold" style={{ color: '#FFFFFF' }}>275<span className="text-sm">ms</span></div>
                <p className="text-xs" style={{ color: '#90E0EF' }}>Base (single object)</p>
              </div>
              <div className="text-xl" style={{ color: 'rgba(0,180,216,0.3)' }}>→</div>
              <div>
                <div className="font-mono-data text-2xl font-bold" style={{ color: '#FFFFFF' }}>330<span className="text-sm">ms</span></div>
                <p className="text-xs" style={{ color: '#90E0EF' }}>Complex (8 objects)</p>
              </div>
            </div>
          </div>

          {/* Moving objects */}
          <div
            className="p-5 rounded-xl transition-all duration-700"
            style={{
              background: 'rgba(0,180,216,0.04)',
              border: '1px solid rgba(0,180,216,0.1)',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transitionDelay: '1000ms',
            }}
          >
            <h4 className="font-display text-xs tracking-wider mb-4" style={{ color: '#00B4D8' }}>MOVING OBJECT ACCURACY</h4>
            <div className="font-display text-4xl font-bold mb-2" style={{ color: '#00B4D8', textShadow: '0 0 20px rgba(0,180,216,0.4)' }}>
              78%
            </div>
            <p className="text-xs" style={{ color: '#90E0EF' }}>Strong performance in dynamic environments</p>
          </div>

          {/* Trial volume */}
          <div
            className="p-5 rounded-xl transition-all duration-700"
            style={{
              background: 'rgba(0,180,216,0.04)',
              border: '1px solid rgba(0,180,216,0.1)',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transitionDelay: '1200ms',
            }}
          >
            <h4 className="font-display text-xs tracking-wider mb-4" style={{ color: '#00B4D8' }}>TRIAL METHODOLOGY</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-xs" style={{ color: '#90E0EF' }}>Objects tested</span>
                <span className="font-mono-data text-sm font-medium text-white">60</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs" style={{ color: '#90E0EF' }}>Trials per object</span>
                <span className="font-mono-data text-sm font-medium text-white">40</span>
              </div>
              <div className="flex justify-between pt-2" style={{ borderTop: '1px solid rgba(0,180,216,0.1)' }}>
                <span className="text-xs font-medium" style={{ color: '#90E0EF' }}>Total trials</span>
                <span className="font-mono-data text-sm font-bold" style={{ color: '#00B4D8' }}>2,400+</span>
              </div>
            </div>
          </div>
        </div>

        {/* Full specs table */}
        <div
          className="mt-12 max-w-4xl mx-auto transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transitionDelay: '1400ms',
          }}
        >
          <h3 className="font-display text-sm tracking-wider text-center mb-6" style={{ color: '#00B4D8' }}>
            COMPLETE PERFORMANCE SPECIFICATIONS
          </h3>
          <div
            className="rounded-xl overflow-hidden"
            style={{
              background: 'rgba(0,180,216,0.03)',
              border: '1px solid rgba(0,180,216,0.08)',
            }}
          >
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(0,180,216,0.1)' }}>
                  <th className="text-left py-3 px-4 font-medium text-xs" style={{ color: '#90E0EF' }}>Metric</th>
                  <th className="text-right py-3 px-4 font-medium text-xs" style={{ color: '#90E0EF' }}>Value</th>
                  <th className="text-right py-3 px-4 font-medium text-xs hidden sm:table-cell" style={{ color: '#90E0EF' }}>Context</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Detection Accuracy (≤4m)', '~100%', 'Static objects, full visibility'],
                  ['Accuracy at 10m', '95%', 'Strong mid-range performance'],
                  ['Accuracy at 20m', '>80%', 'Long-range spatial awareness'],
                  ['Moving Object Accuracy', '78%', 'Dynamic environment'],
                  ['Base Latency', '275ms', 'Single object'],
                  ['Latency (8 objects)', '330ms', 'Complex scene'],
                  ['Unique Haptic Patterns', '160', 'Full tactile vocabulary'],
                  ['Detection Range', 'Up to 10m', 'vs. ~1-2m for cane/ultrasonic'],
                  ['Frame Rate', '~30 FPS', 'Real-time feedback loop'],
                  ['Device Weight', '246g', 'Wearable, extended use'],
                  ['Design Iterations', '17 versions', 'Head mount; 7 versions matrix'],
                  ['Trial Volume', '2,400+ trials', '60 objects × 40 trials each'],
                ].map(([metric, value, context], i) => (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(0,180,216,0.05)' }}>
                    <td className="py-2.5 px-4 text-xs" style={{ color: '#CAF0F8' }}>{metric}</td>
                    <td className="py-2.5 px-4 text-right font-mono-data text-xs font-medium" style={{ color: '#00B4D8' }}>{value}</td>
                    <td className="py-2.5 px-4 text-right text-xs hidden sm:table-cell" style={{ color: '#90E0EF' }}>{context}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
