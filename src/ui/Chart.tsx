import { useMemo } from 'react';
import { BaseChart } from './BaseChart';

export type ChartProps = {
  data: number[];
  maxDataPoints: number;
  selectedView: 'CPU' | 'RAM' | 'STORAGE' | 'GPU';
};

export const COLOR_MAP = {
  CPU: {
    stroke: '#31b0cd',
    fill: '#2b8da3',
  },
  RAM: {
    stroke: '#748aeb',
    fill: '#5d6db6',
  },
  STORAGE: {
    stroke: '#ef8ccb',
    fill: '#b46d9a',
  },
  GPU: {
    stroke: '#a083c9',
    fill: '#806aa0',
  },
};

export function Chart(props: ChartProps) {
  const color = useMemo(
    () => COLOR_MAP[props.selectedView],
    [props.selectedView]
  );
  const preparedData = useMemo(() => {
    const points = props.data.map((point) => ({ value: point * 100 }));
    return [
      ...points,
      ...Array.from({ length: props.maxDataPoints - points.length }).map(
        () => ({ value: undefined })
      ),
    ];
  }, [props.data, props.maxDataPoints]);

  return (
    <BaseChart data={preparedData} fill={color.fill} stroke={color.stroke} />
  );
}