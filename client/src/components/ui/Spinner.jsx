const Spinner = ({ size = 'md', className = '' }) => {
  const sizes = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12' };
  return (
    <div
      className={`${sizes[size]} border-2 border-border border-t-accent rounded-full animate-spin ${className}`}
      role="status"
      aria-label="Loading"
    />
  );
};

export const FullPageSpinner = () => (
  <div className="min-h-screen bg-bg-primary flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <Spinner size="lg" />
      <p className="text-text-muted text-sm">Loading...</p>
    </div>
  </div>
);

export default Spinner;
