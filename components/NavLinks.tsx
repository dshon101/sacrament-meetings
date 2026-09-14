'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Home' },
  { href: '/meetings', label: 'Meetings' },
  { href: '/meetings/current', label: 'This Week' },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="bg-blue-600 text-white">
      <ul className="max-w-4xl mx-auto px-4 flex gap-6 py-2">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive ? 'page' : undefined}
                className={
                  isActive
                    ? 'underline font-semibold'
                    : 'hover:underline'
                }
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}