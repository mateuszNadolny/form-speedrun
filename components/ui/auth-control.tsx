import SigninButton from '@/components/ui/signin-button';
import UserDropdown from '@/components/ui/user-dropdown';

interface AuthControlProps {
  isAuthenticated: boolean;
}

const UserIcon = () => {
  return <UserDropdown />;
};

const AuthControl = ({ isAuthenticated }: AuthControlProps) => {
  if (isAuthenticated) {
    return <UserIcon />;
  } else {
    return <SigninButton />;
  }
};

export default AuthControl;
