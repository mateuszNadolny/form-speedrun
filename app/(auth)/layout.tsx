export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-gray-900 to-gray-950">
      {children}
    </main>
  );
}
