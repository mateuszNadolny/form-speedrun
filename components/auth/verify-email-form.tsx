import { CustomError } from '@/types/types';
import { LuLoader2 } from 'react-icons/lu';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { newVerification } from '@/actions/new-verification';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import useAuthLoadingStore from '@/store/auth-store';

const VerifyEmailForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const router = useRouter();
  const { loading, setIsLoading } = useAuthLoadingStore();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async () => await newVerification(token as string),
    onSuccess: (data) => {
      console.log(data);
      if (data.success) {
        toast({
          variant: 'default',
          title: '✅ Verification successful!',
          description: data.success
        });
        setTimeout(() => {
          router.push('/signin');
        }, 3000);
      } else if (data.error) {
        toast({
          variant: 'destructive',
          title: '⛔️ Verification failed',
          description: data.error.toString()
        });
      }
    },
    onError: (error: CustomError) => {
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: error?.response?.data
      });
    },
    onSettled: () => {
      setIsLoading(false);
    }
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    mutation.mutate();
  }

  return (
    <Card className="bg-color-secondary outline-none border-none text-color-light">
      <CardHeader className="text-color-light">
        <CardTitle>🔐 Verify your account</CardTitle>
        <CardDescription className="text-color-light">
          Click the button below to verify your email
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit}>
          <Button
            type="submit"
            className="w-full bg-color-teritary text-color-light hover:bg-color-primary"
            disabled={loading}>
            {loading ? <LuLoader2 className="h-[1.2rem] w-[1.2rem] animate-spin" /> : 'Verify me'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default VerifyEmailForm;
