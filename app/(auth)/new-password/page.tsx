import NewPasswordForm from '@/components/auth/new-password-form';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
const NewPasswordPage = () => {
  return (
    <main className="flex h-screen min-h-screen flex-col items-center justify-center bg-color-primary overflow-hidden">
      <Link
        href="/signin"
        className="absolute top-12 left-12 flex items-center justify-center gap-2 text-muted-foreground text-xs">
        <ArrowLeft className="w-4 h-4" /> Back to login
      </Link>
      <NewPasswordForm />
    </main>
  );
};

export default NewPasswordPage;
