'use client';

import { Bar, BarChart, XAxis } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import { useInputStore } from '@/store/input-store';

import { convertToMilliseconds } from '@/lib/time';

const Chart = () => {
  const { entries } = useInputStore();

  const sliceLabel = (value: string) => {
    if (value.length > 7) {
      return value.slice(0, 6) + '...';
    } else {
      return value;
    }
  };

  const chartData = entries.map((item) => ({
    ...item,
    timeValue: convertToMilliseconds(item.formattedTime)
  }));

  const chartConfig = {
    splitTime: {
      label: 'Split Time',
      color: 'hsl(var(--chart-1))'
    }
  } satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig} className="min-h-[400px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <XAxis
          dataKey="label"
          type="category"
          width={400}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => {
            return sliceLabel(value);
          }}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="timeValue" fill="var(--color-teritary)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
};

export default Chart;
