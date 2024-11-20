'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface User {
  name: string;
  image: string | null;
  createdAt: Date;
}

const ProfileHeader = ({ name, image, createdAt }: User) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full mb-4 sm:mb-8">
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:justify-between">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20,
              delay: 0.2
            }}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-800 border-2 border-color-teritary flex items-center justify-center">
            <Avatar>
              <AvatarImage
                src={(image as string) ?? ''}
                alt={name + ' profile picture'}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-color-teritary"
              />
              <AvatarFallback className="bg-transparent text-2xl sm:text-4xl text-color-light">
                {name.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold text-color-teritary">{name}</h1>
            <p className="text-sm sm:text-base text-gray-400">
              Speedrunning since{' '}
              {createdAt.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </p>
          </motion.div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center text-color-light gap-2 bg-gray-800 hover:bg-gray-700 transition px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-base mt-2 sm:mt-0">
          <Share2 size={16} className="text-color-teritary sm:size-18" />
          Share Profile
        </motion.button>
      </div>
    </motion.div>
  );
};
export default ProfileHeader;
