/**
 * DESIGN: Synaptic Dark — Bioluminescent Noir
 * Forehead science section: Neuroscience explainer with illustrated cards.
 * Uses the generated neural-forehead image. Three reason cards with glow.
 */
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const NEURAL_IMG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663473632073/gXdKyMwjAN7ij6Q2tYrLFB/neural-forehead-am7JC3u36RdHqn4QJyRNAr.webp';

const REASONS = [
  {
    number: '01',
    title: 'Sensory Density',
    description: 'The forehead has dense tactile nerve endings ideal for high-resolution haptic communication. Each actuator maps to a distinct perceptual zone.',
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10">
        <circle cx="20" cy="20" r="18" fill="none" stroke="#00B4D8" strokeWidth="1" opacity="0.3" />
        <circle cx="20" cy="20" r="12" fill="none" stroke="#00B4D8" strokeWidth="1" opacity="0.5" />
        <circle cx="20" cy="20" r="6" fill="none" stroke="#00B4D8" strokeWidth="1" opacity="0.7" />
        <circle cx="20" cy="20" r="2" fill="#00B4D8" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Cortical Representation',
    description: 'A large somatosensory cortex area is dedicated to the forehead, enabling nuanced signal interpretation — the brain is already wired to process forehead touch at high fidelity.',
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10">
        <path d="M5 30 Q10 10 20 15 Q30 20 35 5" fill="none" stroke="#00B4D8" strokeWidth="1.5" opacity="0.7" />
        <path d="M5 35 Q15 15 25 20 Q32 25 35 10" fill="none" stroke="#00B4D8" strokeWidth="1" opacity="0.4" />
        <circle cx="20" cy="15" r="2" fill="#00B4D8" />
        <circle cx="10" cy="22" r="1.5" fill="#00B4D8" opacity="0.6" />
        <circle cx="30" cy="12" r="1.5" fill="#00B4D8" opacity="0.6" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Cross-Modal Plasticity',
    description: "The brain's visual cortex reorganizes after vision loss and can process spatial tactile input as directional awareness — enabling a new sensory channel without overloading existing ones.",
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10">
        <path d="M10 20 L18 20 L22 10 L26 30 L30 20 L38 20" fill="none" stroke="#00B4D8" strokeWidth="1.5" opacity="0.7" />
        <circle cx="5" cy="20" r="3" fill="none" stroke="#00B4D8" strokeWidth="1" opacity="0.5" />
        <circle cx="5" cy="20" r="1" fill="#00B4D8" opacity="0.8" />
      </svg>
    ),
  },
];

export default function ForeheadSection() {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section
      id="forehead"
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
            Why the Forehead?
          </h2>
          <p
            className="font-display text-base sm:text-lg tracking-wide transition-all duration-700"
            style={{
              color: '#00B4D8',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transitionDelay: '200ms',
            }}
          >
            Dense Innervation. High Bandwidth. Hands and Ears Stay Free.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
          {/* Image */}
          <div
            className="transition-all duration-700"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
              transitionDelay: '400ms',
            }}
          >
            <div className="relative rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(0,180,216,0.1)' }}>
              <img
                src={NEURAL_IMG}
                alt="Neural pathways in the forehead region showing dense innervation for haptic feedback"
                className="w-full h-auto"
                loading="lazy"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(3,4,94,0.8) 100%)' }}
              />
            </div>
          </div>

          {/* Reason cards */}
          <div className="space-y-6">
            {REASONS.map((reason, i) => (
              <div
                key={reason.number}
                className="flex gap-4 p-5 rounded-xl transition-all duration-700 group"
                style={{
                  background: 'rgba(0,180,216,0.03)',
                  border: '1px solid rgba(0,180,216,0.08)',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateX(0)' : 'translateX(30px)',
                  transitionDelay: `${500 + i * 200}ms`,
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,180,216,0.25)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(0,180,216,0.1)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,180,216,0.08)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                <div className="shrink-0 mt-1">
                  {reason.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono-data text-xs" style={{ color: 'rgba(0,180,216,0.5)' }}>{reason.number}</span>
                    <h3 className="font-semibold text-white">{reason.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: '#CAF0F8' }}>{reason.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quote */}
        <div
          className="max-w-3xl mx-auto text-center mt-16 transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transitionDelay: '1200ms',
          }}
        >
          <blockquote
            className="text-lg sm:text-xl italic px-6 py-6 rounded-2xl"
            style={{
              color: '#FFFFFF',
              background: 'rgba(0,180,216,0.05)',
              borderLeft: '3px solid #00B4D8',
            }}
          >
            "Our system doesn't overload the auditory channel. It opens a new one entirely."
          </blockquote>
        </div>
      </div>
    </section>
  );
}
