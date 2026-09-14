import MeetingCard from '@/components/MeetingCard';
import type { SacramentMeeting } from '@/lib/types';

async function getMeetingsData(): Promise<SacramentMeeting[]> {
  const res = await fetch('http://localhost:3000/api/meetings', {
    cache: 'no-store',
  });
  return res.json();
}

export default async function MeetingsPage() {
  const meetings = await getMeetingsData();

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">
        Sacrament Meetings
      </h1>
      <div className="space-y-4">
        {meetings.map((meeting) => (
          <MeetingCard key={meeting.id} meeting={meeting} />
        ))}
      </div>
    </div>
  );
}