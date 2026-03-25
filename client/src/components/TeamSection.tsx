/**
 * DESIGN: Synaptic Dark — Bioluminescent Noir
 * Team section: Three team cards with role descriptions and quotes.
 * Uses team abstract background image. Advisor mentions.
 */
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const TEAM_BG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663473632073/gXdKyMwjAN7ij6Q2tYrLFB/team-abstract-bg-jd4rd5DiKfuXQDjMnyFNCZ.webp';

const TEAM = [
  {
    name: 'Aditya Tandon',
    role: 'Lead Systems Architecture',
    contributions: 'Sensor integration, haptic encoding algorithm, system pipeline design, presentation',
    quote: 'We wanted to build something that doesn\'t just detect the world — it lets you feel it.',
    initials: 'AT',
    color: '#00B4D8',
  },
  {
    name: 'Alexander Drew',
    role: 'Hardware & Coordination',
    contributions: 'Sponsorships, hardware assembly, project coordination, stakeholder management',
    quote: 'The hardest part wasn\'t the engineering — it was making sure every piece worked together as one system.',
    initials: 'AD',
    color: '#0096C7',
  },
  {
    name: 'Stephen Liu',
    role: 'Electronics & Firmware',
    contributions: 'Electronics design, vibration node research, firmware support, I2C multiplexer integration',
    quote: 'Getting 24 haptic motors to fire in precise patterns with sub-millisecond timing — that was the challenge I loved.',
    initials: 'SL',
    color: '#0077B6',
  },
];

export default function TeamSection() {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section
      id="team"
      ref={ref}
      className="relative py-24 sm:py-32 lg:py-40 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #020340 0%, #03045E 50%, #041562 100%)' }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url(${TEAM_BG})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

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
            The Team
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
            Three students. One mission. 338 million reasons to build.
          </p>
        </div>

        {/* Team cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          {TEAM.map((member, i) => (
            <div
              key={member.name}
              className="p-6 rounded-2xl transition-all duration-700 group"
              style={{
                background: 'rgba(3, 4, 94, 0.7)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(0,180,216,0.1)',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                transitionDelay: `${400 + i * 200}ms`,
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = `${member.color}40`;
                (e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px ${member.color}15`;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,180,216,0.1)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
            >
              {/* Avatar */}
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center font-display font-bold text-lg mb-4"
                style={{
                  background: `${member.color}15`,
                  border: `2px solid ${member.color}40`,
                  color: member.color,
                }}
              >
                {member.initials}
              </div>

              <h3 className="text-lg font-semibold text-white mb-1">{member.name}</h3>
              <p className="font-display text-xs tracking-wider mb-3" style={{ color: member.color }}>{member.role}</p>
              <p className="text-sm mb-4 leading-relaxed" style={{ color: '#CAF0F8' }}>{member.contributions}</p>

              {/* Quote */}
              <blockquote
                className="text-sm italic pt-4 leading-relaxed"
                style={{
                  color: '#90E0EF',
                  borderTop: `1px solid ${member.color}20`,
                }}
              >
                "{member.quote}"
              </blockquote>
            </div>
          ))}
        </div>

        {/* Advisors */}
        <div
          className="text-center transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: '1200ms',
          }}
        >
          <h4 className="font-display text-xs tracking-widest mb-4" style={{ color: '#00B4D8' }}>ADVISORS & CONSULTANTS</h4>
          <p className="text-sm max-w-2xl mx-auto" style={{ color: '#90E0EF' }}>
            UTHealth Low-Vision Specialist · Rice University Mechanical Engineering Chair · Rice ECE Faculty · MIT Undergraduate Research Feedback
          </p>
        </div>
      </div>
    </section>
  );
}
