import { notFound } from 'next/navigation';
import MeetingDetail from '@/components/MeetingDetail';
import type { SacramentMeeting } from '@/lib/types';

interface MeetingPageProps {
  params: Promise<{ id: string }>;
}

async function getMeetingData(id: string): Promise<SacramentMeeting | null> {
  const res = await fetch(`http://localhost:3000/api/meetings/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
}

export default async function MeetingPage({ params }: MeetingPageProps) {
  const { id } = await params;
  const meeting = await getMeetingData(id);

  if (!meeting) {
    notFound();
  }

  return (
    <div className="px-4 py-12">
      <MeetingDetail meeting={meeting} />
    </div>
  );
}