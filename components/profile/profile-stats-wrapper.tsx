'use client';

import ProfileStatsCard from '@/components/profile/profile-stats-card';
import { motion } from 'framer-motion';
import { Trophy, Clock, Zap, CalendarCheck } from 'lucide-react';

interface ProfileStatsWrapperProps {
  scores: {
    id: string;
    totalTime: number;
    createdAt: Date;
    splitTimes: {
      id: string;
      label: string;
      time: number;
    }[];
  }[];
}

const ProfileStatsWrapper = ({ scores }: ProfileStatsWrapperProps) => {
  const bestTime = scores.sort((a, b) => a.totalTime - b.totalTime)[0].totalTime;
  const averageTime = scores.reduce((acc, curr) => acc + curr.totalTime, 0) / scores.length;
  const totalRuns = scores.length;

  const lastRunDate = new Intl.DateTimeFormat('en-GB', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
  }).format(new Date(scores[scores.length - 1].createdAt));

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        bounce: 0.4,
        duration: 0.8
      }
    }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="w-full mx-auto grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-10 mb-8 mt-4 lg:mt-0">
      <motion.div variants={item}>
        <ProfileStatsCard icon={Trophy} title="Best Time" value={bestTime} />
      </motion.div>
      <motion.div variants={item}>
        <ProfileStatsCard icon={Clock} title="Average Time" value={averageTime} />
      </motion.div>
      <motion.div variants={item}>
        <ProfileStatsCard icon={Zap} title="Total Runs" value={totalRuns.toString()} />
      </motion.div>
      <motion.div variants={item}>
        <ProfileStatsCard icon={CalendarCheck} title="Last Run" value={lastRunDate} />
      </motion.div>
    </motion.div>
  );
};

export default ProfileStatsWrapper;
