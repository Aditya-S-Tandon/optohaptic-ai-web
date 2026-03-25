/**
 * DESIGN: Synaptic Dark — Bioluminescent Noir
 * Roadmap: Animated vertical timeline with 4 milestones.
 * NOW → NEXT → FUTURE → VISION. Closing CTA.
 */
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const MILESTONES = [
  {
    phase: 'NOW',
    title: 'Working Prototype',
    items: [
      '2,400+ controlled trials completed',
      '95%+ accuracy at 10m range',
      'TXEF Science & Engineering Fair competition',
      '17 hardware iterations, 7 matrix versions',
    ],
    color: '#00B4D8',
    active: true,
  },
  {
    phase: 'NEXT',
    title: 'Structured User Trials',
    items: [
      'IRB-approved protocol with visually impaired users',
      'Real-world navigation testing in controlled environments',
      'Feedback integration for haptic pattern refinement',
      'Partnership with rehabilitation centers',
    ],
    color: '#0096C7',
    active: false,
  },
  {
    phase: 'FUTURE',
    title: 'Custom Hardware',
    items: [
      'Custom ASIC for embedded processing',
      'Miniaturized form factor — glasses-integrated design',
      'On-device ML inference without external compute',
      'Extended battery life for all-day wear',
    ],
    color: '#0077B6',
    active: false,
  },
  {
    phase: 'VISION',
    title: 'Accessible to All',
    items: [
      'Sub-$100 BOM for global accessibility',
      'Open-source haptic encoding standard',
      'Integration with existing assistive technology ecosystems',
      'Restoring spatial independence for millions',
    ],
    color: '#48CAE4',
    active: false,
  },
];

export default function RoadmapSection() {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section
      id="roadmap"
      ref={ref}
      className="relative py-24 sm:py-32 lg:py-40 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #041562 0%, #03045E 40%, #020340 100%)' }}
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
            Vision & Next Steps
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
            Building the infrastructure for a new class of assistive technology
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto">
          {MILESTONES.map((milestone, i) => (
            <div
              key={milestone.phase}
              className="flex gap-6 mb-8 last:mb-0 transition-all duration-700"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
                transitionDelay: `${400 + i * 250}ms`,
              }}
            >
              {/* Timeline line + dot */}
              <div className="flex flex-col items-center shrink-0">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center font-display text-xs font-bold tracking-wider"
                  style={{
                    background: `${milestone.color}15`,
                    border: `2px solid ${milestone.color}${milestone.active ? '' : '60'}`,
                    color: milestone.color,
                    boxShadow: milestone.active ? `0 0 20px ${milestone.color}30` : 'none',
                  }}
                >
                  {milestone.phase === 'NOW' && (
                    <div
                      className="absolute w-12 h-12 rounded-full"
                      style={{
                        border: `2px solid ${milestone.color}`,
                        animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
                      }}
                    />
                  )}
                  <span className="relative z-10">{i + 1}</span>
                </div>
                {i < MILESTONES.length - 1 && (
                  <div className="w-px flex-1 my-2" style={{ background: `${milestone.color}30` }} />
                )}
              </div>

              {/* Content card */}
              <div
                className="flex-1 p-5 sm:p-6 rounded-xl mb-2"
                style={{
                  background: milestone.active ? `${milestone.color}08` : 'rgba(0,180,216,0.03)',
                  border: `1px solid ${milestone.color}${milestone.active ? '25' : '10'}`,
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-display text-xs tracking-widest font-bold" style={{ color: milestone.color }}>
                    {milestone.phase}
                  </span>
                  {milestone.active && (
                    <span
                      className="px-2 py-0.5 rounded-full text-xs"
                      style={{ background: `${milestone.color}20`, color: milestone.color }}
                    >
                      Current
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">{milestone.title}</h3>
                <ul className="space-y-2">
                  {milestone.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm" style={{ color: '#CAF0F8' }}>
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: milestone.color }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Mission statement */}
        <div
          className="max-w-3xl mx-auto text-center mt-16 mb-12 transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transitionDelay: '1500ms',
          }}
        >
          <blockquote
            className="text-lg sm:text-xl italic leading-relaxed px-6 py-8 rounded-2xl"
            style={{
              color: '#FFFFFF',
              background: 'rgba(0,180,216,0.05)',
              borderLeft: '3px solid #00B4D8',
            }}
          >
            "We are building the infrastructure for a new class of assistive technology — one that restores spatial awareness without overloading existing senses."
          </blockquote>
        </div>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: '1800ms',
          }}
        >
          <a
            href="mailto:optohapticai@gmail.com"
            className="px-8 py-4 rounded-full font-medium text-base transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #00B4D8, #0077B6)',
              color: '#FFFFFF',
              boxShadow: '0 0 30px rgba(0,180,216,0.3), 0 4px 20px rgba(0,0,0,0.3)',
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
            Partner With Us
          </a>
          <button
            onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 rounded-full font-medium text-base transition-all duration-300"
            style={{
              background: 'transparent',
              color: '#00B4D8',
              border: '1px solid rgba(0,180,216,0.3)',
            }}
            onMouseEnter={e => {
              (e.target as HTMLElement).style.background = 'rgba(0,180,216,0.08)';
              (e.target as HTMLElement).style.borderColor = 'rgba(0,180,216,0.5)';
            }}
            onMouseLeave={e => {
              (e.target as HTMLElement).style.background = 'transparent';
              (e.target as HTMLElement).style.borderColor = 'rgba(0,180,216,0.3)';
            }}
          >
            Back to Top
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="container mx-auto mt-24 pt-8 text-center" style={{ borderTop: '1px solid rgba(0,180,216,0.08)' }}>
        <p className="font-display text-xs tracking-widest mb-2" style={{ color: '#00B4D8' }}>OPTOHAPTIC AI</p>
        <p className="text-xs" style={{ color: '#90E0EF' }}>
          Aditya Tandon · Alexander Drew · Stephen Liu
        </p>
        <p className="text-xs mt-2" style={{ color: 'rgba(144,224,239,0.5)' }}>
          A research prototype. Not FDA-approved or clinically validated.
        </p>
      </div>

      <style>{`
        @keyframes ping {
          75%, 100% { transform: scale(1.5); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
