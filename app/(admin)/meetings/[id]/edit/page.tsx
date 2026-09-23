import { notFound } from 'next/navigation';
import MeetingForm from '@/components/MeetingForm';
import { updateMeeting } from '@/lib/actions';
import { getMeetingById } from '@/lib/meetings-db';

interface EditMeetingPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditMeetingPage({ params }: EditMeetingPageProps) {
  const { id } = await params;
  const meetingId = Number(id);

  if (Number.isNaN(meetingId)) {
    notFound();
  }

  const meeting = await getMeetingById(meetingId);

  if (!meeting) {
    notFound();
  }

  const updateMeetingWithId = updateMeeting.bind(null, meetingId);

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Edit Meeting</h1>
      <MeetingForm action={updateMeetingWithId} meeting={meeting} submitLabel="Save Changes" />
    </div>
  );
}