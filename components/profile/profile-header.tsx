import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { Share2 } from 'lucide-react';

interface User {
  name: string;
  image: string | null;
  createdAt: Date;
  // scores: {
  //   id: string;
  //   totalTime: number;
  //   createdAt: Date;
  //   splitTimes: {
  //     id: string;
  //     label: string;
  //     time: number;
  //   }[];
  // }[];
}

const ProfileHeader = ({ name, image, createdAt }: User) => {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-gray-800 border-2 border-color-teritary flex items-center justify-center">
            <Avatar>
              <AvatarImage
                src={(image as string) ?? ''}
                alt={name + ' profile picture'}
                className="w-20 h-20 rounded-full border-2 border-color-teritary"
              />
              <AvatarFallback className="bg-transparent text-4xl text-color-light">
                {name.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-color-teritary">{name}</h1>
            <p className="text-gray-400">
              Speedrunning since{' '}
              {createdAt.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </p>
          </div>
        </div>
        <button className="flex items-center text-color-light gap-2 bg-gray-800 hover:bg-gray-700 transition px-4 py-2 rounded-lg">
          <Share2 size={18} className="text-[#2dd4bf]" />
          Share Profile
        </button>
      </div>
    </div>
  );
};
export default ProfileHeader;
