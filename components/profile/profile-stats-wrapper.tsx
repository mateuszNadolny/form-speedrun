'use client';
import ProfileStatsCard from '@/components/profile/profile-stats-card';

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

  return (
    <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-8">
      <ProfileStatsCard icon={Trophy} title="Best Time" value={bestTime} />
      <ProfileStatsCard icon={Clock} title="Average Time" value={averageTime} />
      <ProfileStatsCard icon={Zap} title="Total Runs" value={totalRuns.toString()} />
      <ProfileStatsCard icon={CalendarCheck} title="Last Run" value={lastRunDate} />
    </div>
  );
};
export default ProfileStatsWrapper;
