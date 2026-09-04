import { useState } from 'react';
import { Megaphone, Send } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MOCK_ANNOUNCEMENTS_FULL, Announcement2 } from '@/lib/mockData';
import { useAuth } from '@/context/AuthContext';

export default function AnnouncementsPage() {
  const { user } = useAuth();
  const [announcements, setAnnouncements] = useState<Announcement2[]>(MOCK_ANNOUNCEMENTS_FULL);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');

  const handlePost = () => {
    if (!title.trim() || !body.trim() || !user) return;
    const newAnnouncement: Announcement2 = {
      id: Date.now(),
      title,
      body,
      postedBy: `${user.first_name} ${user.last_name}`,
      priority,
      createdAt: new Date().toISOString(),
    };
    setAnnouncements((prev) => [newAnnouncement, ...prev]);
    setTitle('');
    setBody('');
    setPriority('medium');
  };

  const priorityVariant = { low: 'neutral', medium: 'warning', high: 'danger' } as const;

  return (
    <DashboardLayout>
      <DashboardHeader title="Announcements" subtitle="Post facility-wide updates for members" />

      <Card className="mb-8">
        <h3 className="text-base font-semibold text-white mb-6">Post New Announcement</h3>
        <div className="space-y-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Announcement title"
            className="w-full bg-base-800 border border-base-600 rounded-2xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-accent"
          />
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={3}
            placeholder="Announcement details..."
            className="w-full bg-base-800 border border-base-600 rounded-2xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-accent resize-none"
          />
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {(['low', 'medium', 'high'] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setPriority(p)}
                  className={`px-4 py-2 rounded-full text-xs font-medium capitalize transition-colors ${
                    priority === p ? 'bg-white text-base-950' : 'bg-base-800 text-white/50 hover:text-white'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
            <Button variant="primary" size="sm" icon={<Send size={14} />} onClick={handlePost}>
              Post Announcement
            </Button>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-base font-semibold text-white mb-6">Announcement History</h3>
        <div className="space-y-3">
          {announcements.map((a) => (
            <div key={a.id} className="p-4 rounded-2xl bg-base-800">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Megaphone size={14} className="text-accent-light" />
                  <p className="text-sm font-medium text-white">{a.title}</p>
                </div>
                <Badge variant={priorityVariant[a.priority]}>{a.priority}</Badge>
              </div>
              <p className="text-xs text-white/40 leading-relaxed mb-2">{a.body}</p>
              <p className="text-[10px] text-white/30">
                Posted by {a.postedBy} · {new Date(a.createdAt).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' })}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </DashboardLayout>
  );
}