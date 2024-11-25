'use client';
import { useTransition } from 'react';

import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { deleteUser } from '@/actions/delete-user';

import { Trash2 } from 'lucide-react';
interface DeleteAccountBtnProps {
  disabled: boolean;
  userId: string;
}

const DeleteAccountBtn = ({ disabled, userId }: DeleteAccountBtnProps) => {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await deleteUser(userId);
        toast({
          title: 'Account deleted successfully!'
        });
        await signOut({ callbackUrl: '/' });
      } catch (error) {
        toast({
          variant: 'destructive',
          title: '⛔️ An error occurred',
          description: error instanceof Error ? error.message : 'Failed to delete account'
        });
      }
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          disabled={disabled || isPending}
          className="disabled:opacity-50 disabled:cursor-not-allowed">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete account
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-gray-800 text-color-light border border-red-600">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your account and remove all
            your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button variant="destructive" onClick={handleDelete} disabled={isPending}>
            {isPending ? 'Deleting...' : 'Delete Account'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAccountBtn;
