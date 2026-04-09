import { useState } from 'react';
import { ChevronDown, ChevronUp, Trash2, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';
import Badge from '../ui/Badge';
import { commissionAPI } from '../../services/api';

const STATUSES = ['pending', 'in-review', 'accepted', 'completed', 'declined'];

const formatDate = (date) =>
  new Date(date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

const SubmissionTable = ({ submissions, onRefresh }) => {
  const [expanded, setExpanded] = useState(null);
  const [updating, setUpdating] = useState(null);

  const handleStatusChange = async (id, status) => {
    setUpdating(id);
    try {
      await commissionAPI.updateStatus(id, status);
      toast.success('Status updated');
      onRefresh?.();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setUpdating(null);
    }
  };

  if (!submissions?.length) {
    return (
      <div className="text-center py-16 text-text-muted">
        <p className="text-lg mb-1">No commission requests yet.</p>
        <p className="text-sm">Submissions will appear here once clients fill out the form.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-bg-tertiary text-text-muted text-xs uppercase tracking-wider">
            <th className="text-left px-4 py-3">Client</th>
            <th className="text-left px-4 py-3">Type</th>
            <th className="text-left px-4 py-3">Size</th>
            <th className="text-left px-4 py-3">Status</th>
            <th className="text-left px-4 py-3">Date</th>
            <th className="text-left px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {submissions.map((s) => (
            <>
              <tr
                key={s._id}
                className="hover:bg-bg-tertiary/50 transition-colors cursor-pointer"
                onClick={() => setExpanded(expanded === s._id ? null : s._id)}
              >
                <td className="px-4 py-3">
                  <p className="font-medium text-text-primary">{s.clientName}</p>
                  <p className="text-text-muted text-xs">{s.email}</p>
                </td>
                <td className="px-4 py-3 capitalize text-text-secondary">{s.commissionType}</td>
                <td className="px-4 py-3 text-text-secondary">{s.size}</td>
                <td className="px-4 py-3">
                  <Badge variant={s.status}>{s.status}</Badge>
                </td>
                <td className="px-4 py-3 text-text-muted text-xs">{formatDate(s.createdAt)}</td>
                <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center gap-2">
                    <select
                      value={s.status}
                      onChange={(e) => handleStatusChange(s._id, e.target.value)}
                      disabled={updating === s._id}
                      className="bg-bg-primary border border-border text-text-secondary text-xs rounded px-2 py-1 focus:outline-none focus:border-accent"
                    >
                      {STATUSES.map((st) => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                    <button
                      onClick={() => setExpanded(expanded === s._id ? null : s._id)}
                      className="text-text-muted hover:text-accent transition-colors"
                    >
                      {expanded === s._id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                  </div>
                </td>
              </tr>

              {/* Expanded detail row */}
              {expanded === s._id && (
                <tr key={`${s._id}-detail`} className="bg-bg-tertiary/30">
                  <td colSpan={6} className="px-6 py-5">
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs text-text-muted uppercase tracking-wide mb-1">Vision</p>
                        <p className="text-text-secondary text-sm leading-relaxed">{s.vision}</p>
                      </div>
                      {s.referenceImages?.length > 0 && (
                        <div>
                          <p className="text-xs text-text-muted uppercase tracking-wide mb-2">Reference Images</p>
                          <div className="flex flex-wrap gap-3">
                            {s.referenceImages.map((img, i) => (
                              <a key={i} href={img.url} target="_blank" rel="noopener noreferrer"
                                className="relative group w-20 h-20 rounded-lg overflow-hidden border border-border hover:border-accent transition-colors">
                                <img src={img.url} alt={`Ref ${i + 1}`} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                  <ExternalLink size={14} className="text-white" />
                                </div>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubmissionTable;
