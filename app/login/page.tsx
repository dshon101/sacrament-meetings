import LoginForm from '@/components/LoginForm';

export default function LoginPage() {
  return (
    <div className="max-w-sm mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Bishopric Sign In</h1>
      <LoginForm />
    </div>
  );
}