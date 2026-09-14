import Link from 'next/link';
import type { SacramentMeeting } from '@/lib/types';

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

const meetingTypeLabels: Record<SacramentMeeting['meetingType'], string> = {
  regular: 'Regular Sacrament Meeting',
  testimony: 'Fast & Testimony Meeting',
  stake: 'Stake Meeting',
  general: 'General Conference',
};

export default function MeetingCard({ meeting }: MeetingCardProps) {
  return (
    <Link
      href={`/meetings/${meeting.id}`}
      className="block p-4 border-l-4 border-blue-600 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
    >
      <h3 className="text-xl font-bold mb-1 text-gray-900">
        {new Date(meeting.date).toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })}
      </h3>
      <p className="text-sm text-gray-600">
        {meetingTypeLabels[meeting.meetingType]}
      </p>
      <p className="text-sm text-gray-700 mt-2">
        Presiding: {meeting.presiding}
      </p>
    </Link>
  );
}