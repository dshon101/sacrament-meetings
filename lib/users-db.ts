import { sql } from './db';

export interface AppUser {
  id: number;
  email: string;
  name: string;
  passwordHash: string;
}

export async function getUserByEmail(email: string): Promise<AppUser | null> {
  const rows = await sql`
    SELECT id, email, name, password_hash AS "passwordHash"
    FROM users
    WHERE email = ${email}
  `;
  return (rows[0] as unknown as AppUser) ?? null;
}