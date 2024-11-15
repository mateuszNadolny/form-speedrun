'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const ErrorPage = () => {
  const router = useRouter();
  return (
    <section className="flex h-screen min-h-screen flex-col items-center justify-center overflow-hidden">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-destructive mb-4">Oops! Something went wrong 🥲</h1>
        <p className="text-lg text-muted-foreground mb-8">
          {`We're sorry, but an error occurred while processing your request.`}
        </p>
        <Button
          className="bg-color-teritary text-color-light hover:bg-color-secondary"
          onClick={() => router.back()}>
          Go Back
        </Button>
      </div>
    </section>
  );
};

export default ErrorPage;
