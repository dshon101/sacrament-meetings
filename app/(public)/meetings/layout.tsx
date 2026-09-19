export default function MeetingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-50 min-h-full">
      <div className="max-w-2xl mx-auto px-4 pt-4">
        <p className="text-sm text-gray-500">
          Sacrament Meeting Agendas
        </p>
      </div>
      {children}
    </div>
  );
}