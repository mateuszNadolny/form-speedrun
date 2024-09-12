import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SigninForm from './signin-form';
import SignupForm from './signup-form';
import ProvidersSelector from './providers-selector';

const AuthTabs = () => {
  return (
    <div className="w-full flex flex-col gap-5 items-center justify-center">
      <div className="w-full flex flex-col-reverse lg:flex-col gap-5 items-center justify-center">
        <Tabs defaultValue="signin" className="w-[80%] md:w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent
            value="signin"
            className="bg-color-secondary text-color-light p-5 rounded-md">
            <ProvidersSelector />
            <SigninForm />
          </TabsContent>
          <TabsContent
            value="signup"
            className="bg-color-secondary text-color-light p-5 rounded-md">
            <SignupForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AuthTabs;
