import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <section className="flex h-screen min-h-screen flex-col items-center justify-center">
      <Loader2 className="h-12 w-12 animate-spin text-teal-500" />
      <div className="text-color-light mt-4">Loading user info...</div>
    </section>
  );
}
