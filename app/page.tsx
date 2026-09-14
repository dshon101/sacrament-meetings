import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12 text-center">
      <Image
        src="/globe.svg"
        alt="Illustration of a globe representing the ward community"
        width={120}
        height={120}
        className="mx-auto mb-6"
      />
      <h1 className="text-4xl font-bold mb-4 text-gray-900">
        Sacrament Meeting Planner
      </h1>
      <p className="text-lg text-gray-700 mb-8">
        Plan, manage, and review sacrament meeting agendas — announcements,
        hymns, speakers, and more — all in one place.
      </p>
      <Link
        href="/meetings"
        className="inline-block bg-blue-600 text-white px-6 py-3 rounded font-semibold hover:bg-blue-700 transition-colors"
      >
        View Meetings
      </Link>
    </div>
  );
}