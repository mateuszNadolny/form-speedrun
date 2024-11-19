import { getAverageStats } from '@/actions/get-average-stats';

import TodayStats from '@/components/landing-page/today-stats';

const TodayStatsWrapper = async () => {
  const { topTime, averageTime } = await getAverageStats();

  return (
    <>
      <TodayStats topTime={topTime} averageTime={averageTime} />
    </>
  );
};

export default TodayStatsWrapper;
