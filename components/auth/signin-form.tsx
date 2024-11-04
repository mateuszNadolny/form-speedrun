'use client';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { LoginSchema } from '@/schemas';

import { login } from '@/actions/login';

import { useToast } from '@/components/ui/use-toast';
import PrimaryButton from '../ui/primary-button';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
import { useMutation } from '@tanstack/react-query';

import useAuthLoadingStore from '@/store/auth-store';

import { CustomError } from '@/types/types';
import Link from 'next/link';

const SigninForm = () => {
  const router = useRouter();
  const { loading, setIsLoading } = useAuthLoadingStore();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const mutation = useMutation({
    mutationFn: async (values: z.infer<typeof LoginSchema>) => await login(values),
    onSuccess: (callback) => {
      if (callback?.error) {
        toast({
          variant: 'destructive',
          title: '⛔️ An error occurred',
          description: callback.error
        });
      } else {
        toast({
          title: '✅ Login successful!'
        });
        router.push('/');
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

  function onSubmit(values: z.infer<typeof LoginSchema>) {
    setIsLoading(true);
    mutation.mutate(values);
  }

  return (
    <Card className="bg-color-secondary outline-none border-none text-color-light">
      <CardHeader className="text-color-light">
        <CardTitle>Sign In</CardTitle>
        <CardDescription className="text-color-light">
          Sign in with username and password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              disabled={loading}
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" className="border-color-primary border-b" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <PrimaryButton type="submit" className="w-full text-md p-5" disabled={loading}>
              {loading ? <LuLoader2 className="h-[1.2rem] w-[1.2rem] animate-spin" /> : 'Login'}
            </PrimaryButton>
          </form>
        </Form>
        <Button className="w-full text-color-teritary mt-3 text-xs" variant="link">
          <Link href="/reset-password">Forgot your password?</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default SigninForm;
