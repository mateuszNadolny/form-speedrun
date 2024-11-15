import NewPasswordForm from '@/components/auth/new-password-form';
import BackButton from '@/components/ui/back-button';
const NewPasswordPage = () => {
  return (
    <section className="flex h-screen min-h-screen flex-col items-center justify-center overflow-hidden">
      <BackButton text="Back to login" href="/signin" />
      <NewPasswordForm />
    </section>
  );
};

export default NewPasswordPage;
