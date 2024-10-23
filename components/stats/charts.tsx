'use client';

import { Line, LineChart, XAxis, YAxis, LabelList, CartesianGrid } from 'recharts';
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
      <LineChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12
        }}>
        <CartesianGrid vertical={false} strokeWidth={0.1} />
        <XAxis
          dataKey="label"
          type="category"
          tickLine={true}
          axisLine={true}
          tickMargin={3}
          tickFormatter={(value) => {
            return sliceLabel(value);
          }}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
        <Line
          type="natural"
          dataKey="timeValue"
          stroke="var(--color-teritary)"
          strokeWidth={2}
          dot={{ fill: 'var(--color-teritary)', r: 4 }}
          activeDot={{
            r: 6
          }}>
          <LabelList
            dataKey="formattedTime"
            position="top"
            offset={12}
            fill="var(--color-teritary)"
            fontSize={13}
          />
        </Line>
      </LineChart>
    </ChartContainer>
  );
};

export default Chart;
