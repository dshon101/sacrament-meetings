import { redirect } from 'next/navigation';
import { getMeetings } from '@/lib/meetings-db';

function getMostRecentSundayISO(): string {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 (Sun) through 6 (Sat)
  const sunday = new Date(today);
  sunday.setDate(today.getDate() - dayOfWeek);
  return sunday.toISOString().split('T')[0]; // 'YYYY-MM-DD'
}

export default function CurrentMeetingPage() {
  const sundayDate = getMostRecentSundayISO();
  const matches = getMeetings(sundayDate);

  if (matches.length > 0) {
    redirect(`/meetings/${matches[0].id}`);
  }

  redirect('/meetings');
}