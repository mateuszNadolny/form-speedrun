import ProvidersSelector from '@/components/auth/providers-selector';
import AuthCostsInfo from '@/components/auth/auth-costs-info';

const AuthWrapper = () => {
  return (
    <div className="bg-gray-800/50 rounded-xl p-4 lg:p-6 lg:w-[600px]">
      <div className="flex flex-col items-center justify-center space-y-3 mb-4">
        <h2 className="text-3xl font-extrabold text-color-light">Sign in</h2>
        <p className="text-muted-foreground">Choose your preferred authentication method</p>
      </div>
      <ProvidersSelector />
      <AuthCostsInfo />
    </div>
  );
};

export default AuthWrapper;
