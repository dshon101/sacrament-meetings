import Link from 'next/link';
import type { SacramentMeeting } from '@/lib/types';
import DeleteMeetingButton from './DeleteMeetingButton';

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
  const formattedDate = new Date(meeting.date).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="p-4 border-l-4 border-blue-600 bg-gray-50 rounded">
      <Link
        href={`/meetings/${meeting.id}`}
        className="block hover:bg-gray-100 transition-colors rounded -m-2 p-2"
      >
        <h2 className="text-xl font-bold mb-1 text-gray-900">{formattedDate}</h2>
        <p className="text-sm text-gray-600">{meetingTypeLabels[meeting.meetingType]}</p>
        <p className="text-sm text-gray-700 mt-2">Presiding: {meeting.presiding}</p>
      </Link>
      <div className="flex gap-4 mt-3 pt-3 border-t border-gray-200">
        <Link
          href={`/meetings/${meeting.id}/edit`}
          aria-label={`Edit meeting on ${formattedDate}`}
          className="text-sm text-blue-600 hover:underline"
        >
          Edit
        </Link>
        <DeleteMeetingButton id={meeting.id} label={formattedDate} />
      </div>
    </div>
  );
}