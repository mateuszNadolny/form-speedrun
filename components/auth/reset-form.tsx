'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ResetSchema } from '@/schemas';

import { resetPassword } from '@/actions/reset';

import { useToast } from '@/components/ui/use-toast';

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

const ResetForm = () => {
  const { loading, setIsLoading } = useAuthLoadingStore();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: ''
    }
  });

  const mutation = useMutation({
    mutationFn: async (values: z.infer<typeof ResetSchema>) => await resetPassword(values),
    onSuccess: (callback) => {
      if (callback?.error) {
        toast({
          variant: 'destructive',
          title: '⛔️ An error occurred',
          description: callback.error
        });
      } else {
        toast({
          title: '✅ Password reset link has been sent to your email!'
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

  function onSubmit(values: z.infer<typeof ResetSchema>) {
    setIsLoading(true);
    mutation.mutate(values);
  }

  return (
    <Card className="bg-color-secondary outline-none border-none text-color-light w-[80%] md:w-[400px] p-5">
      <CardHeader className="text-color-light">
        <CardTitle>Reset your password</CardTitle>
        <CardDescription className="text-color-light">
          Enter your email and we&apos;ll send you a link to reset your password
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

            <Button
              type="submit"
              className="w-full bg-color-teritary text-color-light hover:bg-color-primary"
              disabled={loading}>
              {loading ? (
                <LuLoader2 className="h-[1.2rem] w-[1.2rem] animate-spin" />
              ) : (
                'Send reset link'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ResetForm;
