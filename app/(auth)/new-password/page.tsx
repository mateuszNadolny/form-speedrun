import NewPasswordForm from '@/components/auth/new-password-form';
import BackButton from '@/components/ui/back-button';
const NewPasswordPage = () => {
  return (
    <main className="flex h-screen min-h-screen flex-col items-center justify-center bg-color-primary overflow-hidden">
      <BackButton text="Back to login" href="/signin" />
      <NewPasswordForm />
    </main>
  );
};

export default NewPasswordPage;
