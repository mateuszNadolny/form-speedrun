import SigninButton from './signin-button';
import UserDropdown from './user-dropdown';

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
