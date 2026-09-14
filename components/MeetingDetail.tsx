import type { SacramentMeeting } from '@/lib/types';

interface MeetingDetailProps {
  meeting: SacramentMeeting;
}

export default function MeetingDetail({ meeting }: MeetingDetailProps) {
  const formattedDate = new Date(meeting.date).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <article className="max-w-2xl mx-auto p-6 bg-white rounded shadow-sm print:shadow-none">
      <header className="text-center mb-6 border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-900">{formattedDate}</h2>
        <p className="text-gray-600">
          Presiding: {meeting.presiding} · Conducting: {meeting.conducting}
        </p>
        {meeting.stakeBusiness && (
          <p className="text-sm font-semibold text-blue-700 mt-1">
            Includes Stake Business
          </p>
        )}
      </header>

      {meeting.announcements && meeting.announcements.length > 0 && (
        <section className="mb-4">
          <h3 className="font-bold text-gray-900 mb-1">Announcements</h3>
          <ul className="list-disc list-inside text-gray-700">
            {meeting.announcements.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      <section className="mb-4">
        <h3 className="font-bold text-gray-900 mb-1">Opening Hymn</h3>
        <p className="text-gray-700">
          #{meeting.openingHymn.number} — {meeting.openingHymn.title}
        </p>
      </section>

      <section className="mb-4">
        <h3 className="font-bold text-gray-900 mb-1">Opening Prayer</h3>
        <p className="text-gray-700">{meeting.openingPrayer}</p>
      </section>

      {meeting.wardBusiness.length > 0 && (
        <section className="mb-4">
          <h3 className="font-bold text-gray-900 mb-1">Ward Business</h3>
          <ul className="list-disc list-inside text-gray-700">
            {meeting.wardBusiness.map((item, index) => (
              <li key={index}>{item.description}</li>
            ))}
          </ul>
        </section>
      )}

      <section className="mb-4">
        <h3 className="font-bold text-gray-900 mb-1">Sacrament Hymn</h3>
        <p className="text-gray-700">
          #{meeting.sacramentHymn.number} — {meeting.sacramentHymn.title}
        </p>
      </section>

      {meeting.speakers.length > 0 && (
        <section className="mb-4">
          <h3 className="font-bold text-gray-900 mb-1">Speakers &amp; Musical Numbers</h3>
          <ul className="text-gray-700 space-y-1">
            {meeting.speakers.map((item, index) => (
              <li key={index}>
                {item.type === 'musical-number' ? (
                  <>Musical Number — {item.name}</>
                ) : (
                  <>{item.name}{item.topic ? ` — ${item.topic}` : ''}</>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mb-4">
        <h3 className="font-bold text-gray-900 mb-1">Closing Hymn</h3>
        <p className="text-gray-700">
          #{meeting.closingHymn.number} — {meeting.closingHymn.title}
        </p>
      </section>

      <section>
        <h3 className="font-bold text-gray-900 mb-1">Closing Prayer</h3>
        <p className="text-gray-700">{meeting.closingPrayer}</p>
      </section>
    </article>
  );
}