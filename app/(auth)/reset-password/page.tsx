import ResetForm from '@/components/auth/reset-form';
import BackButton from '@/components/ui/back-button';
const ResetPasswordPage = () => {
  return (
    <main className="flex h-screen min-h-screen flex-col items-center justify-center bg-color-primary overflow-hidden">
      <BackButton text="Back to login" href="/signin" />
      <ResetForm />
    </main>
  );
};

export default ResetPasswordPage;
