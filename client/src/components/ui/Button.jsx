const variants = {
  primary:
    'bg-accent text-bg-primary hover:bg-accent-hover shadow-md hover:shadow-accent/20 hover:shadow-lg',
  outline:
    'border border-accent text-accent hover:bg-accent/10',
  ghost:
    'text-text-secondary hover:text-text-primary hover:bg-white/5',
  danger:
    'bg-red-900/40 text-red-300 border border-red-800 hover:bg-red-800/60',
};

const sizes = {
  sm: 'px-4 py-1.5 text-xs',
  md: 'px-6 py-2.5 text-sm',
  lg: 'px-8 py-3.5 text-base',
};

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
  type = 'button',
  onClick,
  ...rest
}) => {
  const classes = [
    'inline-flex items-center justify-center gap-2 font-semibold rounded tracking-wide transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed',
    variants[variant] || variants.primary,
    sizes[size] || sizes.md,
    className,
  ].join(' ');

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={classes}
      {...rest}
    >
      {loading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : null}
      {children}
    </button>
  );
};

export default Button;
