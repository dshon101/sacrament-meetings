import Link from 'next/link';
import { auth, signOut } from '@/auth';

export default async function AuthStatus() {
  const session = await auth();

  if (!session?.user) {
    return (
      <Link href="/login" className="text-sm hover:underline">
        Bishopric Sign In
      </Link>
    );
  }

  return (
    <form
      action={async () => {
        'use server';
        await signOut({ redirectTo: '/' });
      }}
      className="flex items-center gap-3"
    >
      <span className="text-sm">{session.user.email}</span>
      <button type="submit" className="text-sm underline hover:no-underline">
        Sign Out
      </button>
    </form>
  );
}