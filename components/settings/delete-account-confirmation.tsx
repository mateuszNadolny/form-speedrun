'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface DeleteAccountConfirmationProps {
  onConfirmationChange: (isConfirmed: boolean) => void;
}

const DELETE_CONFIRMATION = 'DELETE';

export function DeleteAccountConfirmation({
  onConfirmationChange
}: DeleteAccountConfirmationProps) {
  const [confirmation, setConfirmation] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmation(value);
    onConfirmationChange(value === DELETE_CONFIRMATION);
  };

  return (
    <div className="space-y-4 mb-4">
      <Label htmlFor="confirmation" className="text-color-light mb-4">
        Type <span className="font-mono font-bold">{DELETE_CONFIRMATION}</span> to confirm
      </Label>
      <Input
        id="confirmation"
        value={confirmation}
        onChange={handleInputChange}
        placeholder="DELETE"
        className="max-w-[300px] text-color-light border border-red-600 rounded-md"
      />
    </div>
  );
}

export default DeleteAccountConfirmation;
