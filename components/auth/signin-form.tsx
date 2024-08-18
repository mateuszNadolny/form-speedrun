'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { signIn, useSession } from 'next-auth/react';

import { useToast } from '@/components/ui/use-toast';

import useAuthLoadingStore from '@/store/auth-store';

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

const formSchema = z.object({
  username: z.string().trim().min(3, {
    message: 'Username has to be at least 3 characters'
  }),
  password: z.string().trim().min(8, {
    message: 'Password has to be at least 8 characters'
  })
});

const SigninForm = () => {
  const session = useSession();
  const router = useRouter();
  const { loading, setIsLoading } = useAuthLoadingStore();
  const { toast } = useToast();

  useEffect(() => {
    if (session?.status === 'authenticated') {
      router.push('/home');
    }
  }, [session?.status, router]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: ''
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    signIn('credentials', {
      ...values,
      redirect: false
    }).then((callback) => {
      if (callback?.error) {
        toast({
          variant: 'destructive',
          title: 'Something went wrong',
          description: callback.error
        });
        setIsLoading(false);
      }

      if (callback?.ok && !callback?.error) {
        toast({
          title: '✅ Login successfull!'
        });
      }
    });
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
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input type="name" className="border-color-primary border-b" {...field} />
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
            <Button
              type="submit"
              className="w-full bg-color-teritary text-color-light hover:bg-color-primary"
              disabled={loading}>
              {loading && <LuLoader2 className="h-[1.2rem] w-[1.2rem] animate-spin" />}
              {!loading && 'Login'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SigninForm;
