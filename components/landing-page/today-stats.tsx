import 'animate.css';

import { Card, CardContent } from '@/components/ui/card';

const TodayStats = () => {
  return (
    <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/80 cursor-default transition-colors animate__animated animate__fadeInUp animate__delay-4s pt-5 fixed bottom-20 lg:bottom-7 lg:right-10">
      <CardContent>
        <div className="flex justify-around items-center gap-8 lg:gap-12">
          <div className="text-center">
            <div className="text-xl lg:text-2xl font-bold text-color-light">12.4s</div>
            <div className="text-sm text-muted-foreground">Current Record</div>
          </div>
          <div className="text-center">
            <div className="text-xl lg:text-2xl font-bold text-color-light">25.7s</div>
            <div className="text-sm text-muted-foreground">Average Time</div>
          </div>
          <div className="text-center">
            <div className="text-xl lg:text-2xl font-bold text-color-light">1,234</div>
            <div className="text-sm text-muted-foreground">Players Today</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TodayStats;
