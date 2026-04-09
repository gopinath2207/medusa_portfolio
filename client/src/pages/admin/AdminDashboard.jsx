import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { LogOut, Upload, Inbox, Image, Trash2, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ArtworkUpload from '../../components/admin/ArtworkUpload';
import SubmissionTable from '../../components/admin/SubmissionTable';
import Badge from '../../components/ui/Badge';
import Spinner from '../../components/ui/Spinner';
import Button from '../../components/ui/Button';
import { artworkAPI, commissionAPI } from '../../services/api';
import { buildThumbnailUrl } from '../../utils/cloudinaryUrl';

const TABS = [
  { id: 'artworks', label: 'Artworks', icon: Image },
  { id: 'commissions', label: 'Commissions', icon: Inbox },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('artworks');
  const [deletingId, setDeletingId] = useState(null);
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully.');
    navigate('/admin');
  };

  // Artworks
  const { data: artworksData, isLoading: artworksLoading } = useQuery({
    queryKey: ['admin-artworks'],
    queryFn: () => artworkAPI.getAll({}),
    select: (res) => res.data.data,
  });

  // Commissions
  const { data: commissionsData, isLoading: commissionsLoading, refetch: refetchCommissions } = useQuery({
    queryKey: ['admin-commissions'],
    queryFn: () => commissionAPI.getAll(),
    select: (res) => res.data.data,
  });

  const handleDeleteArtwork = async (id) => {
    if (!window.confirm('Delete this artwork? This action cannot be undone.')) return;
    setDeletingId(id);
    try {
      await artworkAPI.delete(id);
      toast.success('Artwork deleted.');
      queryClient.invalidateQueries({ queryKey: ['admin-artworks'] });
      queryClient.invalidateQueries({ queryKey: ['artworks'] });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Admin header */}
      <header className="sticky top-0 z-40 bg-bg-secondary border-b border-border px-6 md:px-12 py-4 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-xl font-bold text-text-primary">
            MEDUSA<span className="text-accent">.</span> Admin
          </h1>
          <p className="text-text-muted text-xs">{admin?.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-text-secondary hover:text-red-400 transition-colors text-sm"
        >
          <LogOut size={15} /> Logout
        </button>
      </header>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Total Artworks', value: artworksData?.length ?? '—' },
            { label: 'Pending Commissions', value: commissionsData?.filter(c => c.status === 'pending').length ?? '—' },
            { label: 'In Review', value: commissionsData?.filter(c => c.status === 'in-review').length ?? '—' },
            { label: 'Completed', value: commissionsData?.filter(c => c.status === 'completed').length ?? '—' },
          ].map(({ label, value }) => (
            <div key={label} className="bg-bg-card border border-border rounded-xl p-5">
              <p className="text-text-muted text-xs uppercase tracking-wide mb-1">{label}</p>
              <p className="font-heading text-3xl font-bold text-text-primary">{value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 mb-8 border-b border-border pb-4">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === id
                  ? 'bg-accent/10 text-accent border border-accent/30'
                  : 'text-text-secondary hover:text-text-primary hover:bg-bg-tertiary'
              }`}
            >
              <Icon size={15} /> {label}
            </button>
          ))}
        </div>

        {/* ARTWORKS TAB */}
        {activeTab === 'artworks' && (
          <div className="space-y-10">
            {/* Upload section */}
            <div className="bg-bg-card border border-border rounded-2xl p-7">
              <div className="flex items-center gap-2 mb-6">
                <Upload size={18} className="text-accent" />
                <h2 className="font-heading text-xl font-semibold text-text-primary">Upload New Artwork</h2>
              </div>
              <ArtworkUpload
                onUploadSuccess={() => queryClient.invalidateQueries({ queryKey: ['admin-artworks'] })}
              />
            </div>

            {/* Artwork list */}
            <div className="bg-bg-card border border-border rounded-2xl p-7">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading text-xl font-semibold text-text-primary">
                  All Artworks <span className="text-text-muted text-base font-normal">({artworksData?.length ?? 0})</span>
                </h2>
                <button
                  onClick={() => queryClient.invalidateQueries({ queryKey: ['admin-artworks'] })}
                  className="text-text-muted hover:text-accent transition-colors"
                >
                  <RefreshCw size={15} />
                </button>
              </div>

              {artworksLoading ? (
                <div className="flex justify-center py-10"><Spinner /></div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {artworksData?.map((art) => (
                    <div key={art._id} className="relative group rounded-xl overflow-hidden border border-border bg-bg-tertiary">
                      <img
                        src={buildThumbnailUrl(art.imageUrl, 300)}
                        alt={art.title}
                        className="w-full h-36 object-cover group-hover:opacity-70 transition-opacity"
                      />
                      <div className="p-3">
                        <p className="text-text-primary text-xs font-medium truncate">{art.title}</p>
                        <div className="flex items-center justify-between mt-1">
                          <Badge variant={art.featured ? 'accepted' : 'default'} className="text-[10px]">
                            {art.featured ? 'Featured' : art.category}
                          </Badge>
                          <button
                            onClick={() => handleDeleteArtwork(art._id)}
                            disabled={deletingId === art._id}
                            className="text-text-muted hover:text-red-400 transition-colors disabled:opacity-50"
                          >
                            {deletingId === art._id
                              ? <span className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin inline-block" />
                              : <Trash2 size={13} />
                            }
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* COMMISSIONS TAB */}
        {activeTab === 'commissions' && (
          <div className="bg-bg-card border border-border rounded-2xl p-7">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-xl font-semibold text-text-primary">
                Commission Requests <span className="text-text-muted text-base font-normal">({commissionsData?.length ?? 0})</span>
              </h2>
              <button
                onClick={() => refetchCommissions()}
                className="text-text-muted hover:text-accent transition-colors"
              >
                <RefreshCw size={15} />
              </button>
            </div>
            {commissionsLoading ? (
              <div className="flex justify-center py-10"><Spinner /></div>
            ) : (
              <SubmissionTable
                submissions={commissionsData}
                onRefresh={refetchCommissions}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
