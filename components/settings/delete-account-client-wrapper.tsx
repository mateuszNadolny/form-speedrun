'use client';

import { useState } from 'react';
import DeleteAccountBtn from './delete-account-btn';
import DeleteAccountConfirmation from './delete-account-confirmation';

interface ClientWrapperProps {
  userId: string;
}

export function ClientWrapper({ userId }: ClientWrapperProps) {
  const [isConfirmed, setIsConfirmed] = useState(false);

  return (
    <>
      <DeleteAccountConfirmation onConfirmationChange={setIsConfirmed} />
      <DeleteAccountBtn disabled={!isConfirmed} userId={userId} />
    </>
  );
}
