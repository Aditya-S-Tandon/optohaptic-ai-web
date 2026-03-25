/**
 * DESIGN: Synaptic Dark — Bioluminescent Noir
 * Problem section: Muted, desaturated tones. Stats animate with rolling counters.
 * Cooler palette to create emotional weight. Stats glow on reveal.
 */
import { useScrollAnimation, useCountUp } from '@/hooks/useScrollAnimation';

function StatCard({ value, displayValue, suffix, label, delay, isVisible }: {
  value: number; displayValue?: string; suffix: string; label: string; delay: number; isVisible: boolean;
}) {
  const count = useCountUp(value, 2500, isVisible);

  const formatCount = () => {
    if (displayValue) {
      // For large numbers, show the animated version with custom display
      if (value >= 1000000) {
        const millions = Math.floor(count / 1000000);
        return `${millions}M${suffix}`;
      }
      return displayValue;
    }
    return `${count.toLocaleString()}${suffix}`;
  };

  return (
    <div
      className="text-center p-6 rounded-2xl transition-all duration-700"
      style={{
        background: 'rgba(0, 180, 216, 0.04)',
        border: '1px solid rgba(0, 180, 216, 0.1)',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        transitionDelay: `${delay}ms`,
      }}
    >
      <div className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl mb-2 text-glow" style={{ color: '#00B4D8' }}>
        {value >= 1000000
          ? `${Math.floor(count / 1000000)}M${suffix}`
          : `${count.toLocaleString()}${suffix}`
        }
      </div>
      <p className="text-sm sm:text-base" style={{ color: '#90E0EF' }}>{label}</p>
    </div>
  );
}

export default function ProblemSection() {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section
      id="problem"
      ref={ref}
      className="relative py-24 sm:py-32 lg:py-40 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #041562 0%, #03045E 30%, #020340 100%)' }}
    >
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'linear-gradient(rgba(0,180,216,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,180,216,0.3) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      <div className="container mx-auto relative z-10">
        {/* Opening statement */}
        <div className="max-w-4xl mx-auto text-center mb-16 lg:mb-20">
          <p
            className="text-lg sm:text-xl lg:text-2xl leading-relaxed transition-all duration-700"
            style={{
              color: '#CAF0F8',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            }}
          >
            338 million people who are blind or severely visually impaired struggle with one fundamental challenge:{' '}
            <span className="font-semibold" style={{ color: '#00B4D8' }}>safe navigation in unfamiliar environments</span>.
            The number is expected to more than double over the next 30 years.
          </p>
        </div>

        {/* Stat cards grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16 lg:mb-24">
          <StatCard value={338000000} suffix="+" label="People affected globally" delay={0} isVisible={isVisible} />
          <StatCard value={89} suffix="%" label="Greater mortality risk" delay={200} isVisible={isVisible} />
          <StatCard value={33} suffix="%" label="Life expectancy of sighted peers" delay={400} isVisible={isVisible} />
          <StatCard value={2} suffix="×" label="Expected increase by 2050" delay={600} isVisible={isVisible} />
        </div>

        {/* Range comparison */}
        <div
          className="max-w-4xl mx-auto mb-16 transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transitionDelay: '800ms',
          }}
        >
          <h3 className="font-display text-xl sm:text-2xl text-center mb-8 tracking-wide" style={{ color: '#FFFFFF' }}>
            Detection Range Comparison
          </h3>
          <div className="flex flex-col gap-6 px-4">
            {/* White Cane */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium" style={{ color: '#90E0EF' }}>White Cane</span>
                <span className="font-mono-data text-sm" style={{ color: '#90E0EF' }}>~1.2m</span>
              </div>
              <div className="h-3 rounded-full overflow-hidden" style={{ background: 'rgba(0,180,216,0.1)' }}>
                <div
                  className="h-full rounded-full"
                  style={{
                    width: isVisible ? '12%' : '0%',
                    background: 'linear-gradient(90deg, #0077B6, #0077B6)',
                    transition: 'width 1.5s cubic-bezier(0.16, 1, 0.3, 1) 1000ms',
                  }}
                />
              </div>
            </div>
            {/* Ultrasonic devices */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium" style={{ color: '#90E0EF' }}>Ultrasonic Devices</span>
                <span className="font-mono-data text-sm" style={{ color: '#90E0EF' }}>~2m</span>
              </div>
              <div className="h-3 rounded-full overflow-hidden" style={{ background: 'rgba(0,180,216,0.1)' }}>
                <div
                  className="h-full rounded-full"
                  style={{
                    width: isVisible ? '20%' : '0%',
                    background: 'linear-gradient(90deg, #0077B6, #0077B6)',
                    transition: 'width 1.5s cubic-bezier(0.16, 1, 0.3, 1) 1200ms',
                  }}
                />
              </div>
            </div>
            {/* OptoHaptic AI */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-white">OptoHaptic AI</span>
                <span className="font-mono-data text-sm font-semibold" style={{ color: '#00B4D8' }}>10m</span>
              </div>
              <div className="h-3 rounded-full overflow-hidden" style={{ background: 'rgba(0,180,216,0.1)' }}>
                <div
                  className="h-full rounded-full"
                  style={{
                    width: isVisible ? '100%' : '0%',
                    background: 'linear-gradient(90deg, #00B4D8, #0077B6)',
                    boxShadow: '0 0 20px rgba(0,180,216,0.5)',
                    transition: 'width 1.5s cubic-bezier(0.16, 1, 0.3, 1) 1400ms',
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Quote block */}
        <div
          className="max-w-3xl mx-auto text-center transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transitionDelay: '1000ms',
          }}
        >
          <blockquote
            className="text-lg sm:text-xl italic leading-relaxed px-6 py-8 rounded-2xl"
            style={{
              color: '#CAF0F8',
              background: 'rgba(0, 119, 182, 0.08)',
              borderLeft: '3px solid #00B4D8',
            }}
          >
            "An ideal assistive system must provide real-time spatial information without overloading existing senses — particularly hearing, which is critical for safety."
            <footer className="mt-4 text-sm not-italic" style={{ color: '#90E0EF' }}>
              — UTHealth Low-Vision Specialist Consultation
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
