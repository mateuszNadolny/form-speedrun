'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full mb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20,
              delay: 0.2
            }}
            className="w-20 h-20 rounded-full bg-gray-800 border-2 border-color-teritary flex items-center justify-center">
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
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}>
            <h1 className="text-3xl font-bold text-color-teritary">{name}</h1>
            <p className="text-gray-400">
              Speedrunning since{' '}
              {createdAt.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </p>
          </motion.div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center text-color-light gap-2 bg-gray-800 hover:bg-gray-700 transition px-4 py-2 rounded-lg">
          <Share2 size={18} className="text-color-teritary" />
          Share Profile
        </motion.button>
      </div>
    </motion.div>
  );
};
export default ProfileHeader;
