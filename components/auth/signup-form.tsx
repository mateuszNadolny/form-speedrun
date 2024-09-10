'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import axios from 'axios';

import { useMutation } from '@tanstack/react-query';

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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LuLoader2 } from 'react-icons/lu';

import { CustomError } from '@/types/types';

const formSchema = z
  .object({
    username: z.string().trim().min(3, {
      message: 'Username has to be at least 3 characters'
    }),
    password: z.string().trim().min(8, {
      message: 'Minimum 8 characters'
    }),
    confirmPassword: z.string().trim().min(8, {
      message: 'Minimum 8 characters'
    })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirm']
  });

const SignupForm = () => {
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
      password: '',
      confirmPassword: ''
    }
  });

  const registerUser = async (values: z.infer<typeof formSchema>) => {
    const response = await axios.post('/api/register', values);
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: async (data, values) => {
      // `data` is the response from the server, `valeus` are the original form values

      const callback = await signIn('credentials', {
        username: values.username,
        password: values.password,
        redirect: false
      });

      if (callback?.error) {
        toast({
          variant: 'destructive',
          title: '❌ Something went wrong',
          description: callback.error
        });
      }

      if (callback?.ok) {
        toast({
          variant: 'default',
          title: '✅ Registration successful!',
          description: callback.ok
        });
        router.push('/');
      }
    },
    onError: (error: CustomError) => {
      toast({
        variant: 'destructive',
        title: '❌ Something went wrong',
        description: error?.response?.data! || 'An error occurred'
      });
    },
    onSettled: () => {
      setIsLoading(false);
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    mutation.mutate(values);
  }

  return (
    <Card className="bg-color-secondary outline-none border-none text-color-light">
      <CardHeader className="text-color-light">
        <CardTitle>Sign Up</CardTitle>
        <CardDescription className="text-color-light">
          Sign up with username and password
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
                  <FormDescription>Provide username that has at least 5 characters</FormDescription>
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
                  <FormDescription>
                    Provide a password that has at least 8 characters
                  </FormDescription>
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
                  <FormDescription>Confirm your password</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-color-teritary text-color-light hover:bg-color-primary"
              disabled={loading}>
              {loading ? <LuLoader2 className="h-[1.2rem] w-[1.2rem] animate-spin" /> : 'Sign Up'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SignupForm;
