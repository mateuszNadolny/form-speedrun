import AuthTabs from '@/components/auth/auth-tabs';
import BackButton from '@/components/ui/back-button';
const SigninPage = () => {
  return (
    <main className="flex h-screen min-h-screen flex-col items-center justify-center bg-color-primary">
      <BackButton text="Back to main page" href="/" />
      <AuthTabs />
    </main>
  );
};

export default SigninPage;
