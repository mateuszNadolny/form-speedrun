'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

const ErrorReturnButton = () => {
  const router = useRouter();
  return (
    <Button
      className="bg-color-teritary text-color-light hover:bg-color-secondary"
      onClick={() => router.back()}>
      Go Back
    </Button>
  );
};

export default ErrorReturnButton;
