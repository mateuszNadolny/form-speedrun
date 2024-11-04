import AuthTabs from '@/components/auth/auth-tabs';
import BackButton from '@/components/ui/back-button';
const SigninPage = () => {
  return (
    <section className="flex h-screen min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-gray-950">
      <BackButton text="Back to main page" href="/" />
      <AuthTabs />
    </section>
  );
};

export default SigninPage;
