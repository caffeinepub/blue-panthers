import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin } from 'lucide-react';

const MAY_DAYS = Array.from({ length: 31 }, (_, i) => i + 1);

const WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// May 1, 2026 is a Friday (day index 5)
const MAY_2026_START_DAY = 5;

const timeSlots = [
  {
    id: 'morning',
    label: 'Morning Session',
    time: '7:30 AM – 8:00 AM',
    icon: '🌅',
  },
  {
    id: 'evening',
    label: 'Evening Session',
    time: '10:40 PM – 11:00 PM',
    icon: '🌙',
  },
];

export default function SchedulePage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative bg-navy overflow-hidden min-h-[260px] flex items-center">
        <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-gold opacity-5" aria-hidden="true" />
        <div className="absolute -bottom-8 -left-8 w-48 h-48 rounded-full bg-gold opacity-5" aria-hidden="true" />
        <div className="container mx-auto px-4 sm:px-6 py-16 relative z-10">
          <div className="max-w-2xl">
            <Badge className="mb-4 bg-gold/20 text-gold border-gold/40 font-body text-xs uppercase tracking-widest px-3 py-1">
              📅 2026 Season
            </Badge>
            <h1 className="font-display text-6xl sm:text-7xl text-white leading-none mb-3">
              TEAM <span className="text-gold">SCHEDULE</span>
            </h1>
            <p className="text-white/60 font-body text-base leading-relaxed max-w-lg">
              All practices and events for the Blue Panthers. Show up, work hard, and be part of something great.
            </p>
          </div>
        </div>
      </section>

      {/* Schedule Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6">

          {/* Month Header */}
          <div className="flex items-center gap-4 mb-10">
            <div             className="w-12 h-12 rounded-sm bg-navy flex items-center justify-center shrink-0">
              <Calendar className="w-6 h-6 text-gold" />
            </div>
            <div>
              <h2 className="font-display text-4xl sm:text-5xl text-navy leading-none">
                MAY <span className="text-gold">2026</span>
              </h2>
              <p className="text-muted-foreground font-body text-sm mt-0.5">31 days of practice · All month</p>
            </div>
          </div>

          {/* Event Detail Card */}
          <div className="bg-navy rounded-lg border border-gold/30 p-6 sm:p-8 mb-10 shadow-navy relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gold/5 rounded-bl-full" aria-hidden="true" />
            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                {/* Event label */}
                <div className="shrink-0">
                  <div className="w-16 h-16 rounded-sm bg-gold flex items-center justify-center">
                    <span className="text-3xl">🏀</span>
                  </div>
                </div>

                {/* Event details */}
                <div className="flex-1">
                  <Badge className="mb-3 bg-gold/20 text-gold border-gold/40 font-body text-xs uppercase tracking-widest px-3 py-1">
                    All Month · May 1–31
                  </Badge>
                  <h3 className="font-display text-3xl sm:text-4xl text-white leading-none mb-4">
                    PRACTICE
                  </h3>

                  {/* Time slots */}
                  <div className="flex flex-col sm:flex-row gap-4 mb-5">
                    {timeSlots.map((slot) => (
                      <div
                        key={slot.id}
                        className="flex items-center gap-3 bg-navy-light border border-gold/20 rounded-sm px-4 py-3"
                      >
                        <span className="text-xl shrink-0">{slot.icon}</span>
                        <div>
                          <p className="font-body text-xs text-white/50 uppercase tracking-wide">{slot.label}</p>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <Clock className="w-3.5 h-3.5 text-gold shrink-0" />
                            <span className="font-body font-semibold text-white text-sm">{slot.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-2 text-white/50">
                    <MapPin className="w-4 h-4 text-gold shrink-0" />
                    <span className="font-body text-sm">Jackman, Maine 04945, USA</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            {/* Month title bar */}
            <div className="bg-navy px-6 py-4 flex items-center justify-between">
              <span className="font-display text-2xl text-white tracking-widest">MAY 2026</span>
              <Badge className="bg-gold/20 text-gold border-gold/40 font-body text-xs uppercase tracking-widest">
                Practice All Month
              </Badge>
            </div>

            {/* Weekday headers */}
            <div className="grid grid-cols-7 bg-navy/5 border-b border-border">
              {WEEK_DAYS.map((day) => (
                <div
                  key={day}
                  className="py-2.5 text-center font-body text-xs font-semibold text-muted-foreground uppercase tracking-wider"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Day cells */}
            <div className="grid grid-cols-7">
              {/* Empty offset cells */}
              {Array.from({ length: MAY_2026_START_DAY }).map((_, i) => (
                <div key={`empty-${i}`} className="h-16 sm:h-20 border-b border-r border-border/50 bg-muted/20" />
              ))}

              {/* Day cells */}
              {MAY_DAYS.map((day) => {
                const col = (MAY_2026_START_DAY + day - 1) % 7;
                const isWeekend = col === 0 || col === 6;
                return (
                  <div
                    key={day}
                    className={`h-16 sm:h-20 border-b border-r border-border/50 p-1.5 relative group transition-colors duration-150 ${
                      isWeekend ? 'bg-navy/5' : 'bg-card'
                    } hover:bg-gold/5`}
                  >
                    <span className="font-body text-xs font-semibold text-foreground/70 leading-none">{day}</span>
                    {/* Practice dot indicator */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col gap-0.5 items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold opacity-80" title="Morning Practice 7:30–8:00 AM" />
                      <div className="w-1.5 h-1.5 rounded-full bg-gold/50" title="Evening Practice 10:40–11:00 PM" />
                    </div>
                  </div>
                );
              })}

              {/* Trailing empty cells to complete the last row */}
              {(() => {
                const totalCells = MAY_2026_START_DAY + 31;
                const remainder = totalCells % 7;
                if (remainder === 0) return null;
                return Array.from({ length: 7 - remainder }).map((_, i) => (
                  <div key={`trail-${i}`} className="h-16 sm:h-20 border-b border-r border-border/50 bg-muted/20" />
                ));
              })()}
            </div>

            {/* Legend */}
            <div className="px-6 py-4 bg-navy/5 border-t border-border flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-gold" />
                <span className="font-body text-xs text-muted-foreground">Morning Practice · 7:30–8:00 AM</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-gold/50" />
                <span className="font-body text-xs text-muted-foreground">Evening Practice · 10:40–11:00 PM</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CTA strip */}
      <section className="bg-gold py-10">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <p className="font-display text-3xl sm:text-4xl text-navy leading-none mb-2">
            NEVER MISS A SESSION
          </p>
          <p className="font-body text-navy/70 text-sm">
            Show up every day in May — morning, evening, or both. That's how champions are made.
          </p>
        </div>
      </section>
    </div>
  );
}
