import type { SacramentMeeting } from './types';

const meetings: SacramentMeeting[] = [
  {
    id: 1,
    date: '2026-05-03',
    meetingType: 'regular',
    presiding: 'Bishop Smith',
    conducting: 'Brother Jones',
    announcements: ['Ward temple night: May 10'],
    openingHymn: { number: 2, title: 'The Spirit of God' },
    openingPrayer: 'Sister Williams',
    wardBusiness: [{ description: 'Sustaining of new Primary president' }],
    stakeBusiness: false,
    sacramentHymn: { number: 169, title: 'In Remembrance of Thy Suffering' },
    speakers: [
      { name: 'Sister Brown', topic: 'Faith in Jesus Christ', type: 'speaker' },
      { name: 'Youth Choir', topic: '', type: 'musical-number' },
    ],
    closingHymn: { number: 31, title: 'O God, Our Help in Ages Past' },
    closingPrayer: 'Brother Davis',
  },
  {
    id: 2,
    date: '2026-05-10',
    meetingType: 'testimony',
    presiding: 'Bishop Smith',
    conducting: 'Brother Jones',
    announcements: [],
    openingHymn: { number: 19, title: 'We Thank Thee, O God, for a Prophet' },
    openingPrayer: 'Brother Taylor',
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 193, title: "O Thou, Before the World Began" },
    speakers: [],
    closingHymn: { number: 66, title: 'Rejoice, the Lord Is King!' },
    closingPrayer: 'Sister Adams',
  },
  {
    id: 3,
    date: '2026-05-17',
    meetingType: 'regular',
    presiding: 'Bishop Smith',
    conducting: 'Brother Jones',
    announcements: ['Youth conference sign-ups due Friday'],
    openingHymn: { number: 249, title: 'I Am a Child of God' },
    openingPrayer: 'Sister Clark',
    wardBusiness: [{ description: 'Release of Sister Harris as Relief Society president' }],
    stakeBusiness: false,
    sacramentHymn: { number: 172, title: "'Tis Sweet to Sing the Matchless Love" },
    speakers: [
      { name: 'Brother Lee', topic: 'Service in the Church', type: 'speaker' },
    ],
    closingHymn: { number: 85, title: 'How Firm a Foundation' },
    closingPrayer: 'Brother Nelson',
  },
  {
    id: 4,
    date: '2026-05-24',
    meetingType: 'stake',
    presiding: 'President Anderson',
    conducting: 'President Anderson',
    announcements: ['This is a combined stake conference session'],
    openingHymn: { number: 1, title: 'The Morning Breaks' },
    openingPrayer: 'Elder Roberts',
    wardBusiness: [],
    stakeBusiness: true,
    sacramentHymn: { number: 169, title: 'In Remembrance of Thy Suffering' },
    speakers: [
      { name: 'Elder Roberts', topic: 'Stake Direction for the Year', type: 'speaker' },
    ],
    closingHymn: { number: 219, title: 'Called to Serve' },
    closingPrayer: 'Sister Martin',
  },
  {
    id: 5,
    date: '2026-05-31',
    meetingType: 'general',
    presiding: 'Bishop Smith',
    conducting: 'Brother Jones',
    announcements: ['No regular meeting this week - General Conference rebroadcast'],
    openingHymn: { number: 0, title: 'N/A' },
    openingPrayer: 'N/A',
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 0, title: 'N/A' },
    speakers: [],
    closingHymn: { number: 0, title: 'N/A' },
    closingPrayer: 'N/A',
  },
];

export function getMeetings(date?: string | null): SacramentMeeting[] {
  if (date) return meetings.filter((m) => m.date === date);
  return meetings;
}

export function getMeetingById(id: number): SacramentMeeting | null {
  return meetings.find((m) => m.id === id) ?? null;
}