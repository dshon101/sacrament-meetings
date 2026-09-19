import { getMeetings } from '@/lib/meetings-db';

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  const query = searchParams.get('query') ?? searchParams.get('date') ?? '';
  const page = Number(searchParams.get('page')) || 1;
  const meetings = await getMeetings(query, page);
  return Response.json(meetings);
}