export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-yellow-50 min-h-full">
      <div className="max-w-2xl mx-auto px-4 pt-4">
        <p className="text-sm font-semibold text-yellow-800">
          Leader Tools (authentication coming in Week 05)
        </p>
      </div>
      {children}
    </div>
  );
}