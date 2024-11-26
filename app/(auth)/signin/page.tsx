import AuthWrapper from '@/components/auth/auth-wrapper';
import BackButton from '@/components/ui/back-button';
const SigninPage = () => {
  return (
    <section className="flex h-screen min-h-screen flex-col items-center justify-center">
      <BackButton text="Back to Form Speedrunner" href="/" />
      <AuthWrapper />
    </section>
  );
};

export default SigninPage;
