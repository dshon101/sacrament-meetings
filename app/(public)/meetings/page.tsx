import { getMeetings, getMeetingsTotalPages } from '@/lib/meetings-db';
import { MeetingSearch } from '@/components/MeetingSearch';
import MeetingCard from '@/components/MeetingCard';
import { Pagination } from '@/components/Pagination';

export default async function MeetingsPage(props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query ?? '';
  const currentPage = Number(searchParams?.page) || 1;

  const [meetings, totalPages] = await Promise.all([
    getMeetings(query, currentPage),
    getMeetingsTotalPages(query),
  ]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">
        Sacrament Meetings
      </h1>
      <MeetingSearch />
      <div className="space-y-4">
        {meetings.map((meeting) => (
          <MeetingCard key={meeting.id} meeting={meeting} />
        ))}
      </div>
      {meetings.length === 0 && (
        <p className="text-gray-600 mt-4">No meetings found.</p>
      )}
      <Pagination totalPages={totalPages} />
    </div>
  );
}