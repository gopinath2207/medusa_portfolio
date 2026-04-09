const Badge = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-bg-tertiary text-text-secondary border border-border',
    accent: 'bg-accent/15 text-accent border border-accent/30',
    pending: 'bg-yellow-900/30 text-yellow-400 border border-yellow-800/50',
    'in-review': 'bg-blue-900/30 text-blue-400 border border-blue-800/50',
    accepted: 'bg-green-900/30 text-green-400 border border-green-800/50',
    completed: 'bg-accent/20 text-accent border border-accent/40',
    declined: 'bg-red-900/30 text-red-400 border border-red-800/50',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        variants[variant] || variants.default
      } ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
