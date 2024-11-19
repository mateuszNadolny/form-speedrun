'use client';

import { useRouter } from 'next/navigation';

import 'animate.css';

import { Card, CardContent } from '@/components/ui/card';

import { formatTime } from '@/lib/time';

interface TodayStatsInterface {
  topTime: number;
  averageTime: number;
}

const TodayStats = ({ topTime, averageTime }: TodayStatsInterface) => {
  const router = useRouter();

  const handleRoute = () => {
    router.push('/scoreboard');
  };

  return (
    <Card
      className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/80 cursor-pointer transition-colors animate__animated animate__fadeInUp animate__delay-1s pt-5 fixed bottom-20 lg:bottom-7 lg:right-10"
      onClick={handleRoute}>
      <CardContent>
        <div className="flex justify-around items-center gap-8 lg:gap-12">
          <div className="text-center">
            <div className="text-xl lg:text-2xl font-bold text-color-light">
              {formatTime(topTime) + 's'}
            </div>
            <div className="text-sm text-muted-foreground">Current Record</div>
          </div>
          <div className="text-center">
            <div className="text-xl lg:text-2xl font-bold text-color-light">
              {formatTime(averageTime) + 's'}
            </div>
            <div className="text-sm text-muted-foreground">Average Time</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TodayStats;
