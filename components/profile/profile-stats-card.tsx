'use client';

import { formatTime } from '@/lib/time';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface ProfileStatsCardProps {
  icon: LucideIcon;
  title: string;
  value: string | number;
}

const ProfileStatsCard = ({ icon: Icon, title, value }: ProfileStatsCardProps) => {
  return (
    <motion.div>
      <div className="bg-gray-800/50 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-2">
          <Icon className="w-5 h-5 text-color-teritary" />
          <h3 className="font-semibold text-color-light">{title}</h3>
        </div>
        {typeof value === 'number' ? (
          <p className="text-3xl font-bold text-color-light">{formatTime(value)}</p>
        ) : (
          <p className="text-3xl font-bold text-color-light">{value}</p>
        )}
      </div>
    </motion.div>
  );
};
export default ProfileStatsCard;
