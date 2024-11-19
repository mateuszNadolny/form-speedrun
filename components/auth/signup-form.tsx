'use client';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { RegisterSchema } from '@/schemas';

import { useMutation } from '@tanstack/react-query';

import { useToast } from '@/components/ui/use-toast';

import useAuthLoadingStore from '@/store/auth-store';
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

import { register } from '@/actions/register';

const SignupForm = () => {
  const router = useRouter();
  const { loading, setIsLoading } = useAuthLoadingStore();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      name: '',
      password: '',
      confirmPassword: ''
    }
  });

  const mutation = useMutation({
    mutationFn: async (values: z.infer<typeof RegisterSchema>) => await register(values),
    onSuccess: (data) => {
      if (data.success) {
        toast({
          variant: 'default',
          title: '✅ Registration successful!',
          description: data.success
        });
      } else if (data.error) {
        toast({
          variant: 'destructive',
          title: '⛔️ Registration failed',
          description: data.error
        });
      }
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: '⛔️ Something went wrong',
        description: error.message || 'An unexpected error occurred'
      });
    },
    onSettled: () => {
      setIsLoading(false);
    }
  });

  function onSubmit(values: z.infer<typeof RegisterSchema>) {
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="Email" className="border-color-primary border-b" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={loading}
              control={form.control}
              name="name"
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
            <PrimaryButton type="submit" className="w-full text-md p-5" disabled={loading}>
              {loading ? <LuLoader2 className="h-[1.2rem] w-[1.2rem] animate-spin" /> : 'Sign Up'}
            </PrimaryButton>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SignupForm;
