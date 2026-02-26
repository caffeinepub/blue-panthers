import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Trophy, Zap, ChevronRight, Star } from 'lucide-react';

const features = [
  {
    icon: Users,
    title: 'Join the Roster',
    description: 'Whether you\'re a player, fan, or supporter — there\'s a place for you on the Blue Panthers team.',
  },
  {
    icon: Trophy,
    title: 'Winning Culture',
    description: 'We play with heart, hustle, and unity. Every game is a chance to prove what we\'re made of.',
  },
  {
    icon: Zap,
    title: 'Elite Training',
    description: 'Push your limits with our dedicated coaching staff and structured training programs.',
  },
];

const stats = [
  { value: '1', label: 'Season' },
  { value: '10', label: 'Members' },
  { value: '0', label: 'Games Played' },
  { value: '0', label: 'Trophies' },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-navy overflow-hidden clip-diagonal min-h-[520px] flex items-center">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('/assets/generated/hero-banner.dim_1200x400.png')" }}
          aria-hidden="true"
        />
        {/* Decorative circles */}
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-gold opacity-5" aria-hidden="true" />
        <div className="absolute -bottom-10 -left-10 w-64 h-64 rounded-full bg-gold opacity-5" aria-hidden="true" />

        <div className="container mx-auto px-4 sm:px-6 py-20 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            {/* Text content */}
            <div className="flex-1 text-center lg:text-left">
              <Badge className="mb-4 bg-gold/20 text-gold border-gold/40 font-body text-xs uppercase tracking-widest px-3 py-1">
                🏀 Basketball Team
              </Badge>
              <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl text-white leading-none mb-4">
                BLUE
                <br />
                <span className="text-gold">PANTHERS</span>
              </h1>
              <p className="text-white/70 font-body text-lg sm:text-xl max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed">
                We don't just play basketball — we live it. Join a team built on passion, discipline, and the relentless pursuit of greatness.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/signup">
                  <Button
                    size="lg"
                    className="bg-gold text-navy font-body font-bold text-base hover:bg-gold-light shadow-gold animate-pulse-gold rounded-sm uppercase tracking-wider px-8"
                  >
                    Join the Team
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/40 text-white hover:bg-white/10 hover:border-white font-body font-semibold text-base rounded-sm uppercase tracking-wider px-8"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>

            {/* Mascot image */}
            <div className="flex-shrink-0 relative">
              <div className="w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 relative">
                <div className="absolute inset-0 rounded-full bg-gold/10 border-2 border-gold/30" />
                <img
                  src="/assets/generated/panther-mascot.dim_512x512.png"
                  alt="Blue Panthers Mascot"
                  className="w-full h-full object-contain drop-shadow-2xl relative z-10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-gold py-8">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <span className="font-display text-4xl sm:text-5xl text-navy leading-none">{stat.value}</span>
                <span className="font-body text-sm font-semibold text-navy/70 uppercase tracking-widest mt-1">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <Badge className="mb-3 bg-gold/10 text-gold border-gold/30 font-body text-xs uppercase tracking-widest px-3 py-1">
              Why Join Us
            </Badge>
            <h2 className="font-display text-5xl sm:text-6xl text-navy leading-none">
              MORE THAN A TEAM
            </h2>
            <p className="text-muted-foreground font-body text-base mt-3 max-w-xl mx-auto">
              The Blue Panthers are a family. We compete hard, support each other, and grow together on and off the court.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="group bg-card border border-border rounded-lg p-8 hover:border-gold/50 hover:shadow-gold transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-sm bg-navy flex items-center justify-center mb-5 group-hover:bg-gold transition-colors duration-300">
                    <Icon className="w-6 h-6 text-gold group-hover:text-navy transition-colors duration-300" />
                  </div>
                  <h3 className="font-display text-2xl text-navy mb-3">{feature.title}</h3>
                  <p className="font-body text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Roles Section */}
      <section className="py-20 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" aria-hidden="true"
          style={{ backgroundImage: "url('/assets/generated/hero-banner.dim_1200x400.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-12">
            <h2 className="font-display text-5xl sm:text-6xl text-white leading-none mb-3">
              FIND YOUR <span className="text-gold">ROLE</span>
            </h2>
            <p className="text-white/60 font-body text-base max-w-lg mx-auto">
              Everyone has a part to play. Choose how you want to be part of the Blue Panthers family.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { role: 'Player', icon: '🏀', desc: 'Hit the court and compete with the squad.' },
              { role: 'Fan', icon: '📣', desc: 'Cheer us on and be part of the energy.' },
              { role: 'Supporter', icon: '⭐', desc: 'Back the team and help us grow.' },
            ].map((item) => (
              <div
                key={item.role}
                className="bg-navy-light border border-gold/20 rounded-lg p-6 text-center hover:border-gold/60 hover:bg-navy-light/80 transition-all duration-300 group"
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-display text-2xl text-gold mb-2">{item.role}</h3>
                <p className="font-body text-white/60 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="bg-navy rounded-lg p-10 sm:p-16 text-center relative overflow-hidden shadow-navy">
            <div className="absolute top-0 left-0 w-32 h-32 bg-gold/10 rounded-br-full" aria-hidden="true" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gold/10 rounded-tl-full" aria-hidden="true" />
            <div className="relative z-10">
              <div className="flex justify-center mb-4">
                <Star className="w-5 h-5 text-gold fill-gold" />
                <Star className="w-5 h-5 text-gold fill-gold" />
                <Star className="w-5 h-5 text-gold fill-gold" />
                <Star className="w-5 h-5 text-gold fill-gold" />
                <Star className="w-5 h-5 text-gold fill-gold" />
              </div>
              <h2 className="font-display text-5xl sm:text-6xl text-white leading-none mb-4">
                READY TO <span className="text-gold">ROAR?</span>
              </h2>
              <p className="text-white/60 font-body text-base max-w-md mx-auto mb-8">
                Sign up today and become part of the Blue Panthers legacy. The court is waiting.
              </p>
              <Link to="/signup">
                <Button
                  size="lg"
                  className="bg-gold text-navy font-body font-bold text-base hover:bg-gold-light shadow-gold rounded-sm uppercase tracking-wider px-10"
                >
                  Sign Up Now
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
