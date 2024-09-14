import AuthControlWrapper from '@/components/ui/auth-control-wrapper';
import React from 'react';

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-grow">
        <AuthControlWrapper />
        {children}
      </main>
    </div>
  );
}
