'use client';

import { useActionState } from 'react';
import { authenticate } from '@/lib/actions';

export default function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined);

  return (
    <form action={formAction} className="space-y-4" noValidate>
      <div>
        <label htmlFor="email" className="block font-medium text-gray-900 mb-1">Email</label>
        <input
          id="email" name="email" type="email" required
          aria-describedby="login-error"
          className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900"
        />
      </div>
      <div>
        <label htmlFor="password" className="block font-medium text-gray-900 mb-1">Password</label>
        <input
          id="password" name="password" type="password" required minLength={6}
          aria-describedby="login-error"
          className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900"
        />
      </div>
      <div id="login-error" aria-live="polite" className="text-red-700 text-sm">
        {errorMessage && <p>{errorMessage}</p>}
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
      >
        {isPending ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  );
}