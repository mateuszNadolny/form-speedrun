'use client';

import { useRouter } from 'next/navigation';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';

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

import { updatePassword } from '@/actions/update-password';
import { CustomError } from '@/types/types';
import { UpdatePasswordSchema } from '@/schemas/index';
import useAuthLoadingStore from '@/store/auth-store';

import { LuLoader2 } from 'react-icons/lu';

interface ChangePasswordFormProps {
  isOAuthAccount: boolean;
}

const ChangePasswordForm = ({ isOAuthAccount }: ChangePasswordFormProps) => {
  const router = useRouter();
  const { loading, setIsLoading } = useAuthLoadingStore();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof UpdatePasswordSchema>>({
    resolver: zodResolver(UpdatePasswordSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    }
  });

  const mutation = useMutation({
    mutationFn: async (values: z.infer<typeof UpdatePasswordSchema>) =>
      await updatePassword({
        isOAuthAccount: isOAuthAccount,
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
        confirmNewPassword: values.confirmNewPassword
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

  function onSubmit(values: z.infer<typeof UpdatePasswordSchema>) {
    // e?.preventDefault();
    setIsLoading(true);
    mutation.mutate(values);
  }

  return (
    <Card className="bg-gray-800/50 rounded-xl outline-none border-none text-color-light w-full p-2">
      <CardHeader className="text-color-light">
        <CardTitle>Change your password</CardTitle>
        {isOAuthAccount ? (
          <CardDescription className="text-red-600">
            Password change is not available for accounts created with social login.
          </CardDescription>
        ) : (
          <CardDescription className="text-color-light">
            Update your password to keep your account secure.
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="oldPassword"
              disabled={loading || isOAuthAccount}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <Input type="password" className="border-color-primary border-b" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              disabled={loading || isOAuthAccount}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New password</FormLabel>
                  <FormControl>
                    <Input type="password" className="border-color-primary border-b" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmNewPassword"
              disabled={loading || isOAuthAccount}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm new password</FormLabel>
                  <FormControl>
                    <Input type="password" className="border-color-primary border-b" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="bg-teal-500 hover:bg-teal-600 text-white rounded-xl shadow-lg hover:shadow-teal-500/20 transition-all"
              disabled={loading || isOAuthAccount}>
              {loading ? (
                <LuLoader2 className="h-[1.2rem] w-[1.2rem] animate-spin" />
              ) : (
                'Change password'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ChangePasswordForm;
