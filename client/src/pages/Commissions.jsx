import StepsGuide from '../components/commission/StepsGuide';
import CommissionForm from '../components/commission/CommissionForm';
import { Palette, Clock, CheckCircle } from 'lucide-react';

const perks = [
  { icon: Palette, title: 'Custom & Unique', desc: 'Every artwork is created from scratch, exclusively for you.' },
  { icon: Clock, title: 'Progress Updates', desc: 'Receive updates at each milestone so you are always in the loop.' },
  { icon: CheckCircle, title: 'Satisfaction Guaranteed', desc: 'Revisions included. Your vision is my priority.' },
];

const Commissions = () => {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center animate-fade-up">
          <p className="text-accent text-xs font-semibold tracking-[0.3em] uppercase mb-4">Commission a Piece</p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-text-primary mb-5">
            Bring Your Vision to Life
          </h1>
          <div className="w-16 h-0.5 bg-accent mx-auto mb-6" />
          <p className="text-text-secondary text-lg leading-relaxed max-w-2xl mx-auto">
            Whether it's a portrait of someone you love, a dream car rendered in graphite, or an entirely custom concept — I'll transform your idea into a handcrafted masterpiece that lasts a lifetime.
          </p>
        </div>
      </section>

      {/* Perks */}
      <section className="px-6 md:px-12 pb-16">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {perks.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-4 p-5 bg-bg-card rounded-xl border border-border">
              <div className="w-10 h-10 shrink-0 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
                <Icon size={18} className="text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-text-primary text-sm mb-1">{title}</h3>
                <p className="text-text-muted text-xs leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 md:px-12 pb-16 bg-bg-secondary py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-primary mb-2 text-center">
            How It Works
          </h2>
          <p className="text-text-muted text-sm text-center mb-12">Three simple steps to your masterpiece.</p>
          <StepsGuide />
        </div>
      </section>

      {/* Commission form */}
      <section className="px-6 md:px-12 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-primary mb-2">
              Submit Your Request
            </h2>
            <p className="text-text-muted text-sm">
              Fill in the details below and I'll be in touch within 48 hours.
            </p>
          </div>
          <CommissionForm />
        </div>
      </section>

      {/* Pricing note */}
      <section className="px-6 md:px-12 pb-20">
        <div className="max-w-3xl mx-auto text-center p-6 bg-bg-secondary rounded-xl border border-border">
          <p className="text-text-secondary text-sm leading-relaxed">
            <span className="text-text-primary font-semibold">Pricing Note:</span> Prices vary based on complexity, size, and timeline. A custom quote will be provided after reviewing your brief. Typical range: ₹1,500 – ₹15,000 for standard commissions.
          </p>
        </div>
      </section>
    </>
  );
};

export default Commissions;
