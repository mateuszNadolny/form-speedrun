import { signOut } from 'next-auth/react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Settings, User, LogOut } from 'lucide-react';
import { FaUser } from 'react-icons/fa';

const UserDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="link"
          className="animate__animated animate__backInRight animate__delay-1s font-regular text-[18.33px] hover:opacity-70 fixed top-2 lg:top-10 right-2 lg:right-20 cursor-pointer p-0 w-[1em] h-[1em]">
          <FaUser className="text-color-teritary hover:opacity-70" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-color-secondary" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium text-color-light">John Doe</p>
            <p className="text-xs leading-none text-muted-foreground">john@example.com</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4 text-color-light" />
          <span className="text-color-light">Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4 text-color-light" />
          <span className="text-color-light">Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4 text-color-light" />
          <Button
            onClick={() => signOut({ callbackUrl: '/' })}
            variant="ghost"
            className="text-color-light p-0 m-0 h-[36px] hover:bg-transparent hover:text-color-light cursor-default">
            Log out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
