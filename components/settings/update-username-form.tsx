'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { updateUsername } from '@/actions/update-username';

interface UpdateUsernameFormProps {
  currentUsername: string;
}

const UpdateUsernameForm = ({ currentUsername }: UpdateUsernameFormProps) => {
  const [username, setUsername] = useState(currentUsername);
  const [isPending, setIsPending] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);

    try {
      const result = await updateUsername({ username });

      if (result.error) {
        toast({
          variant: 'destructive',
          title: '⛔️ Error',
          description: result.error
        });
      } else {
        toast({
          title: '✅ Success',
          description: result.success
        });
        router.refresh();
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: '⛔️ Error',
        description: 'Something went wrong'
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="bg-gray-800/50 w-full rounded-xl p-4 lg:p-6 border border-gray-700 space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <User className="w-5 h-5 text-color-teritary" />
        <h3 className="font-semibold text-md lg:text-2xl text-color-light">Update Username</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username" className="text-color-light">
            New Username
          </Label>
          <Input
            id="username"
            onChange={(e) => setUsername(e.target.value)}
            placeholder={currentUsername}
            className="text-color-light border max-w-[300px] rounded-md border-gray-700"
            disabled={isPending}
          />
        </div>
        <Button
          type="submit"
          disabled={isPending || username === currentUsername}
          className="w-full sm:w-auto bg-teal-500 hover:bg-teal-600 text-white shadow-lg hover:shadow-teal-500/20 transition-all">
          {isPending ? 'Updating...' : 'Update Username'}
        </Button>
      </form>
    </div>
  );
};

export default UpdateUsernameForm;
