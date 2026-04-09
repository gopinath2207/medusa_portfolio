import { MessageSquare, FileText, Sparkles } from 'lucide-react';

const steps = [
  {
    id: '01',
    icon: MessageSquare,
    title: 'Share Your Vision',
    description:
      'Fill out the commission form with your idea, preferred size, and any reference images. Be as detailed as you like — every detail matters.',
  },
  {
    id: '02',
    icon: FileText,
    title: 'Review & Quote',
    description:
      'I\'ll review your request within 48 hours and send you a personalised quote with timeline and pricing information.',
  },
  {
    id: '03',
    icon: Sparkles,
    title: 'Receive Your Masterpiece',
    description:
      'Once approved, I\'ll craft your artwork with meticulous attention to detail. You\'ll receive progress updates and the final delivered piece.',
  },
];

const StepsGuide = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {steps.map((step, index) => {
        const Icon = step.icon;
        return (
          <div
            key={step.id}
            className="relative flex flex-col gap-5 p-7 bg-bg-card rounded-xl border border-border hover:border-accent/40 transition-all duration-300 group animate-fade-up"
            style={{ animationDelay: `${index * 120}ms` }}
          >
            {/* Step number */}
            <span className="absolute top-6 right-6 font-heading text-5xl font-bold text-border group-hover:text-accent/20 transition-colors duration-300 leading-none select-none">
              {step.id}
            </span>

            {/* Icon */}
            <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
              <Icon size={22} className="text-accent" />
            </div>

            {/* Content */}
            <div>
              <h3 className="font-heading text-lg font-semibold text-text-primary mb-2">
                {step.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {step.description}
              </p>
            </div>

            {/* Connector line (not on last) */}
            {index < steps.length - 1 && (
              <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-px bg-border z-10" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StepsGuide;
