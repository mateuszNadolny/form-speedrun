'use client';

import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';

import { newPassword } from '@/actions/new-password';
import { CustomError } from '@/types/types';
import { NewPasswordSchema } from '@/schemas/index';

import { useToast } from '@/components/ui/use-toast';
import PrimaryButton from '@/components/ui/primary-button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LuLoader2 } from 'react-icons/lu';

import useAuthLoadingStore from '@/store/auth-store';

const NewPasswordForm = () => {
  const router = useRouter();
  const params = useSearchParams();
  const newPasswordToken = params?.get('token');
  const { loading, setIsLoading } = useAuthLoadingStore();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
      token: newPasswordToken as string
    }
  });

  const mutation = useMutation({
    mutationFn: async (values: z.infer<typeof NewPasswordSchema>) =>
      await newPassword({
        password: values.password,
        confirmPassword: values.confirmPassword,
        token: newPasswordToken as string
      }),
    onSuccess: (callback) => {
      if (callback?.error) {
        toast({
          variant: 'destructive',
          title: '⛔️ An error occurred',
          description: callback.error as string
        });
      } else {
        toast({
          title:
            '✅ Password updated succesfully! You will be redirected to signin page within 3 seconds'
        });
        setTimeout(() => {
          router.push('/signin');
        }, 3000);
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

  function onSubmit(values: z.infer<typeof NewPasswordSchema>) {
    // e?.preventDefault();
    setIsLoading(true);
    mutation.mutate(values);
  }

  return (
    <Card className="bg-color-secondary outline-none border-none text-color-light w-[80%] md:w-[400px] p-5">
      <CardHeader className="text-color-light">
        <CardTitle>Reset your password</CardTitle>
        <CardDescription className="text-color-light">Type in your new password</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="password"
              disabled={loading}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" className="border-color-primary border-b" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              disabled={loading}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input type="password" className="border-color-primary border-b" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="token"
              disabled={loading}
              render={({ field }) => <FormItem className="hidden" />}
            />
            <PrimaryButton type="submit" className="w-full text-md p-5" disabled={loading}>
              {loading ? (
                <LuLoader2 className="h-[1.2rem] w-[1.2rem] animate-spin" />
              ) : (
                'Reset password'
              )}
            </PrimaryButton>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default NewPasswordForm;
