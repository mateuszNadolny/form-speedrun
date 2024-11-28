import type { Metadata } from 'next';
import ErrorReturnButton from '@/components/ui/error-return-button';

export const metadata: Metadata = {
  title: 'Oops... ;( | Form Speedrunner',
  description: 'Something went wrong'
};

const ErrorPage = () => {
  return (
    <section className="flex h-screen min-h-screen flex-col items-center justify-center overflow-hidden">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-destructive mb-4">Oops! Something went wrong 🥲</h1>
        <p className="text-lg text-muted-foreground mb-8">
          {`We're sorry, but an error occurred while processing your request.`}
        </p>
        <ErrorReturnButton />
      </div>
    </section>
  );
};

export default ErrorPage;
