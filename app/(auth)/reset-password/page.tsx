import ResetForm from '@/components/auth/reset-form';
import BackButton from '@/components/ui/back-button';
const ResetPasswordPage = () => {
  return (
    <section className="flex h-screen min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-gray-950 overflow-hidden overflow-hidden">
      <BackButton text="Back to login" href="/signin" />
      <ResetForm />
    </section>
  );
};

export default ResetPasswordPage;
