import Link from 'next/link';

export default function EditMeetingNotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12 text-center">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Meeting Not Found</h1>
      <p className="text-gray-600 mb-6">We couldn&apos;t find a meeting with that ID to edit.</p>
      <Link href="/meetings" className="text-blue-600 hover:underline">Back to Meetings</Link>
    </div>
  );
}