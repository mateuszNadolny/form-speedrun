import AuthControlWrapper from '@/components/ui/auth-control-wrapper';
import Logo from './logo';
import { NavbarWrapper } from './navbar-wrapper';

const Navbar = () => {
  return (
    <NavbarWrapper>
      <div className="flex justify-between items-center py-6 px-4 lg:px-12 w-full">
        <Logo />
        <AuthControlWrapper />
      </div>
    </NavbarWrapper>
  );
};

export default Navbar;
