import { redirect } from 'next/navigation';
import { getMeetings } from '@/lib/meetings-db';

export const dynamic = 'force-dynamic';


  

function getMostRecentSundayISO(): string {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const sunday = new Date(today);
  sunday.setDate(today.getDate() - dayOfWeek);
  return sunday.toISOString().split('T')[0];
}

export default async function CurrentMeetingPage() {
  const sundayDate = getMostRecentSundayISO();
  const allMeetings = await getMeetings('', 1);
  const match = allMeetings.find((m) => m.date === sundayDate);

  if (match) {
    redirect(`/meetings/${match.id}`);
  }

  redirect('/meetings');
}