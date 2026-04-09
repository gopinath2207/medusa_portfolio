const CATEGORIES = [
  { key: 'all', label: 'All Works' },
  { key: 'portraits', label: 'Portraits' },
  { key: 'automotive', label: 'Automotive' },
  { key: 'custom', label: 'Custom Commissions' },
];

const FilterTabs = ({ active, onChange }) => {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {CATEGORIES.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={`px-5 py-2 text-sm font-medium rounded-full border transition-all duration-200 ${
            active === key
              ? 'border-accent text-accent bg-accent/10 shadow-sm shadow-accent/10'
              : 'border-border text-text-secondary hover:border-border-hover hover:text-text-primary'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default FilterTabs;
