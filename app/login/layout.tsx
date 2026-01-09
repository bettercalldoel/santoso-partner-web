// app/login/layout.tsx
// Layout ini hanya untuk /login, tampilan sederhana tanpa duplikasi navbar
export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-100 min-h-screen">
      {children}
    </div>
  );
}
