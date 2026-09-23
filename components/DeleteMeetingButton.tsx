'use client';

import { deleteMeeting } from '@/lib/actions';

export default function DeleteMeetingButton({ id, label }: { id: number; label: string }) {
  const deleteMeetingWithId = deleteMeeting.bind(null, id);

  return (
    <form
      action={deleteMeetingWithId}
      onSubmit={(e) => {
        if (!confirm(`Delete the meeting on ${label}? This cannot be undone.`)) {
          e.preventDefault();
        }
      }}
    >
      <button type="submit" aria-label={`Delete meeting on ${label}`} className="text-sm text-red-600 hover:underline">
        Delete
      </button>
    </form>
  );
}