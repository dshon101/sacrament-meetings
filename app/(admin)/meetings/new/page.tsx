import MeetingForm from '@/components/MeetingForm';
import { createMeeting } from '@/lib/actions';

export default function NewMeetingPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Create Meeting</h1>
      <MeetingForm action={createMeeting} submitLabel="Create Meeting" />
    </div>
  );
}