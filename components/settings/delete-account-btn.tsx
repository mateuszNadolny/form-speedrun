'use client';

import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { useTransition } from 'react';
import { deleteUser } from '@/actions/delete-user';

interface DeleteAccountBtnProps {
  disabled: boolean;
  userId: string;
}

const DeleteAccountBtn = ({ disabled, userId }: DeleteAccountBtnProps) => {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      await deleteUser(userId);
    });
  };

  return (
    <Button
      variant="destructive"
      disabled={disabled || isPending}
      onClick={handleDelete}
      className="disabled:opacity-50 disabled:cursor-not-allowed">
      <Trash2 className="mr-2 h-4 w-4" />
      {isPending ? 'Deleting...' : 'Delete account'}
    </Button>
  );
};

export default DeleteAccountBtn;
