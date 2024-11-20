import Link from 'next/link';
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

import { getUserById } from '@/lib/user';

import { Settings, User, LogOut } from 'lucide-react';
import { FaUser } from 'react-icons/fa';

const UserDropdown = async () => {
  const session = await auth();
  const user = await getUserById(session?.user?.id as string);
  const publicId = user?.publicId;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="link"
          className="font-regular text-[18.33px] hover:opacity-70 cursor-pointer p-0 w-[1em] h-[1em]">
          <FaUser className="text-color-teritary hover:opacity-70" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-gray-800 border-gray-700" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium text-color-light">{session?.user?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">{session?.user?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gray-700" />
        <DropdownMenuItem>
          <Link href={`/profile/${publicId}`} className="w-full flex">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-gray-700" />
        <DropdownMenuItem className="w-full">
          <form
            action={async () => {
              'use server';
              await signOut();
            }}>
            <Button
              type="submit"
              variant="ghost"
              className="text-color-light p-0 m-0 h-[36px] w-56 flex justify-start hover:bg-transparent hover:text-color-secondary cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </Button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
