import { signOut, auth } from '@/auth';

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

const UserDropdown = async () => {
  const session = await auth();
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
            <p className="text-sm font-medium text-color-light">{session?.user?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">{session?.user?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <form
            action={async () => {
              'use server';
              await signOut();
            }}>
            <Button
              type="submit"
              variant="ghost"
              className="text-color-light p-0 m-0 h-[36px] hover:bg-transparent hover:text-color-teritary cursor-pointer">
              Log out
            </Button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
