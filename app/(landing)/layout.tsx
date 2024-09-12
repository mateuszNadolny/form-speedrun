import AuthControl from '@/components/ui/auth-control';
import React from 'react';

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-grow">
        <AuthControl />
        {children}
      </main>
    </div>
  );
}
