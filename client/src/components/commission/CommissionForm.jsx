import { useState } from 'react';
import { Upload, X } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../ui/Button';
import { commissionAPI } from '../../services/api';

const COMMISSION_TYPES = [
  { value: '', label: 'Select commission type...' },
  { value: 'portrait', label: 'Portrait' },
  { value: 'automotive', label: 'Automotive Art' },
  { value: 'custom', label: 'Custom / Other' },
];

const SIZES = [
  { value: 'A4', label: 'A4 (210 × 297 mm)' },
  { value: 'A3', label: 'A3 (297 × 420 mm)' },
  { value: 'A2', label: 'A2 (420 × 594 mm)' },
  { value: 'Custom', label: 'Custom Size' },
];

const InputField = ({ label, id, error, children }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-text-secondary mb-1.5">
      {label}
    </label>
    {children}
    {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
  </div>
);

const inputClass =
  'w-full bg-bg-tertiary border border-border text-text-primary placeholder:text-text-muted rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all duration-200';

const CommissionForm = () => {
  const [form, setForm] = useState({
    clientName: '',
    email: '',
    commissionType: '',
    size: 'A4',
    vision: '',
  });
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.clientName.trim()) errs.clientName = 'Name is required.';
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email))
      errs.email = 'A valid email is required.';
    if (!form.commissionType) errs.commissionType = 'Please select a commission type.';
    if (!form.vision.trim() || form.vision.trim().length < 20)
      errs.vision = 'Please describe your vision (at least 20 characters).';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleFiles = (e) => {
    const selected = Array.from(e.target.files).slice(0, 5);
    setFiles(selected);
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([k, v]) => formData.append(k, v));
      files.forEach((f) => formData.append('referenceImages', f));

      const res = await commissionAPI.submit(formData);
      toast.success(res.data.message || 'Commission submitted!');
      setSuccess(true);
      setForm({ clientName: '', email: '', commissionType: '', size: 'A4', vision: '' });
      setFiles([]);
    } catch (err) {
      toast.error(err.message || 'Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-5 text-center bg-bg-card rounded-xl border border-accent/30">
        <div className="w-16 h-16 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center">
          <span className="text-accent text-2xl">✓</span>
        </div>
        <h3 className="font-heading text-2xl text-text-primary font-semibold">
          Request Received!
        </h3>
        <p className="text-text-secondary text-sm max-w-sm">
          Thank you for reaching out. I'll review your commission request and get back to you within 48 hours.
        </p>
        <Button variant="outline" onClick={() => setSuccess(false)}>
          Submit Another Request
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-bg-card rounded-xl border border-border p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField label="Your Name *" id="clientName" error={errors.clientName}>
          <input
            id="clientName"
            name="clientName"
            type="text"
            value={form.clientName}
            onChange={handleChange}
            placeholder="Jane Doe"
            className={`${inputClass} ${errors.clientName ? 'border-red-700' : ''}`}
          />
        </InputField>

        <InputField label="Email Address *" id="email" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="jane@example.com"
            className={`${inputClass} ${errors.email ? 'border-red-700' : ''}`}
          />
        </InputField>

        <InputField label="Commission Type *" id="commissionType" error={errors.commissionType}>
          <select
            id="commissionType"
            name="commissionType"
            value={form.commissionType}
            onChange={handleChange}
            className={`${inputClass} ${errors.commissionType ? 'border-red-700' : ''}`}
          >
            {COMMISSION_TYPES.map(({ value, label }) => (
              <option key={value} value={value} disabled={!value}>
                {label}
              </option>
            ))}
          </select>
        </InputField>

        <InputField label="Preferred Size" id="size">
          <select
            id="size"
            name="size"
            value={form.size}
            onChange={handleChange}
            className={inputClass}
          >
            {SIZES.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </InputField>
      </div>

      <InputField label="Describe Your Vision *" id="vision" error={errors.vision}>
        <textarea
          id="vision"
          name="vision"
          value={form.vision}
          onChange={handleChange}
          rows={5}
          placeholder="Describe the artwork you have in mind — subject, mood, style references, special elements..."
          className={`${inputClass} resize-none ${errors.vision ? 'border-red-700' : ''}`}
        />
        <span className="text-text-muted text-xs mt-1 block text-right">
          {form.vision.length}/2000
        </span>
      </InputField>

      {/* Reference image upload */}
      <div>
        <label className="block text-sm font-medium text-text-secondary mb-1.5">
          Reference Images <span className="text-text-muted">(optional, up to 5)</span>
        </label>
        <label
          htmlFor="referenceImages"
          className="flex flex-col items-center justify-center gap-3 w-full px-4 py-8 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-accent/50 hover:bg-accent/5 transition-all duration-200"
        >
          <Upload size={26} className="text-text-muted" />
          <div className="text-center">
            <p className="text-text-secondary text-sm">
              <span className="text-accent font-medium">Click to upload</span> or drag &amp; drop
            </p>
            <p className="text-text-muted text-xs mt-1">PNG, JPG, WebP up to 10 MB each</p>
          </div>
        </label>
        <input
          id="referenceImages"
          type="file"
          multiple
          accept="image/*"
          onChange={handleFiles}
          className="sr-only"
        />
        {files.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {files.map((file, i) => (
              <div
                key={i}
                className="flex items-center gap-2 bg-bg-tertiary border border-border rounded-full px-3 py-1 text-xs text-text-secondary"
              >
                {file.name.length > 20 ? `${file.name.substring(0, 20)}...` : file.name}
                <button
                  type="button"
                  onClick={() => removeFile(i)}
                  className="text-text-muted hover:text-red-400 transition-colors"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Button type="submit" loading={loading} className="w-full" size="lg">
        Submit Commission Request
      </Button>

      <p className="text-text-muted text-xs text-center">
        I typically respond within 48 hours. All enquiries are kept confidential.
      </p>
    </form>
  );
};

export default CommissionForm;
