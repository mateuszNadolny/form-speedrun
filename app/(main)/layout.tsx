import Navbar from '@/components/ui/navbar';

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-gray-900 to-gray-950">
      <Navbar />
      {children}
    </main>
  );
}
