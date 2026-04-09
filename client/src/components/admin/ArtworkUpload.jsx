import { useState, useRef } from 'react';
import { Upload, X, Star, StarOff } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../ui/Button';
import { artworkAPI } from '../../services/api';

const CATEGORIES = [
  { value: 'portraits', label: 'Portraits' },
  { value: 'automotive', label: 'Automotive' },
  { value: 'custom', label: 'Custom Commissions' },
  { value: 'other', label: 'Other' },
];

const ArtworkUpload = ({ onUploadSuccess }) => {
  const [form, setForm] = useState({ title: '', description: '', category: 'portraits', tags: '', featured: false });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef();

  const handleFile = (f) => {
    if (!f?.type.startsWith('image/')) { toast.error('Only image files allowed.'); return; }
    if (f.size > 15 * 1024 * 1024) { toast.error('File must be under 15 MB.'); return; }
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) handleFile(dropped);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) { toast.error('Please select an image.'); return; }
    if (!form.title.trim()) { toast.error('Title is required.'); return; }

    setLoading(true);
    try {
      const fd = new FormData();
      fd.append('image', file);
      Object.entries(form).forEach(([k, v]) => fd.append(k, v.toString()));

      await artworkAPI.create(fd);
      toast.success('Artwork uploaded successfully!');
      setForm({ title: '', description: '', category: 'portraits', tags: '', featured: false });
      setFile(null);
      setPreview(null);
      onUploadSuccess?.();
    } catch (err) {
      toast.error(err.message || 'Upload failed.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = 'w-full bg-bg-primary border border-border text-text-primary placeholder:text-text-muted rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all duration-200';

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileRef.current?.click()}
        className={`relative flex flex-col items-center justify-center gap-3 w-full h-48 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200 ${
          dragOver ? 'border-accent bg-accent/10' : 'border-border hover:border-accent/50 hover:bg-accent/5'
        }`}
      >
        {preview ? (
          <>
            <img src={preview} alt="Preview" className="absolute inset-0 w-full h-full object-cover rounded-xl opacity-60" />
            <div className="relative z-10 glass-card px-3 py-1.5 rounded-full text-xs text-text-primary">
              {file?.name}
            </div>
          </>
        ) : (
          <>
            <Upload size={28} className="text-text-muted" />
            <p className="text-text-secondary text-sm text-center">
              <span className="text-accent font-medium">Click or drag</span> to add artwork<br />
              <span className="text-text-muted text-xs">PNG, JPG, WebP — max 15 MB</span>
            </p>
          </>
        )}
        <input ref={fileRef} type="file" accept="image/*" className="sr-only" onChange={(e) => e.target.files[0] && handleFile(e.target.files[0])} />
        {preview && (
          <button type="button" onClick={(e) => { e.stopPropagation(); setFile(null); setPreview(null); }}
            className="absolute top-2 right-2 bg-bg-primary/80 rounded-full p-1 text-text-secondary hover:text-red-400 transition-colors">
            <X size={14} />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-text-muted mb-1.5 uppercase tracking-wide">Title *</label>
          <input value={form.title} onChange={(e) => setForm(p => ({ ...p, title: e.target.value }))}
            placeholder="Artwork title" className={inputClass} />
        </div>
        <div>
          <label className="block text-xs font-medium text-text-muted mb-1.5 uppercase tracking-wide">Category</label>
          <select value={form.category} onChange={(e) => setForm(p => ({ ...p, category: e.target.value }))} className={inputClass}>
            {CATEGORIES.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-text-muted mb-1.5 uppercase tracking-wide">Description</label>
        <textarea value={form.description} onChange={(e) => setForm(p => ({ ...p, description: e.target.value }))}
          rows={2} placeholder="Optional description..." className={`${inputClass} resize-none`} />
      </div>

      <div>
        <label className="block text-xs font-medium text-text-muted mb-1.5 uppercase tracking-wide">Tags (comma-separated)</label>
        <input value={form.tags} onChange={(e) => setForm(p => ({ ...p, tags: e.target.value }))}
          placeholder="graphite, portrait, realistic" className={inputClass} />
      </div>

      <div className="flex items-center justify-between">
        <button type="button" onClick={() => setForm(p => ({ ...p, featured: !p.featured }))}
          className={`flex items-center gap-2 text-sm transition-colors ${form.featured ? 'text-accent' : 'text-text-muted hover:text-text-secondary'}`}>
          {form.featured ? <Star size={16} className="fill-accent" /> : <StarOff size={16} />}
          {form.featured ? 'Featured artwork' : 'Mark as featured'}
        </button>
        <Button type="submit" loading={loading}>Upload to Cloudinary</Button>
      </div>
    </form>
  );
};

export default ArtworkUpload;
