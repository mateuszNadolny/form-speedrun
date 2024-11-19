import { auth } from '@/auth';
import AuthControl from '@/components/ui/auth-control';

export default async function AuthControlWrapper() {
  const session = await auth();
  return <AuthControl isAuthenticated={!!session} />;
}
