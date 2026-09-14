export default function Header() {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="bg-blue-700 text-white py-4 shadow-md">
      <div className="max-w-4xl mx-auto px-4 flex justify-between items-center">
        <div className="text-2xl font-bold">Kasupe Brunch</div>
        <p className="text-sm">{today}</p>
      </div>
    </header>
  );
}