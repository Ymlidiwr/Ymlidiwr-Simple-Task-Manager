import {
    ResponsiveContainer,
    AreaChart,
    CartesianGrid,
    Area,
    XAxis,
    YAxis,
  } from 'recharts';
  
  type BaseChartProps = {
    data: { value: number | undefined }[];
    fill: string;
    stroke: string;
  };
  
  export function BaseChart(props: BaseChartProps) {
    return (
      <ResponsiveContainer width={'100%'} height={'100%'}>
        <AreaChart data={props.data}>
          <CartesianGrid stroke="#2c2c2c" strokeDasharray="5 5" fill="#191919" />
          <Area
            fillOpacity={0.3}
            fill={props.fill}
            stroke={props.stroke}
            strokeWidth={3}
            type="monotone"
            dataKey="value"
            isAnimationActive={false}
          />
          <XAxis stroke="transparent" height={0} />
          <YAxis domain={[0, 100]} stroke="transparent" width={0} />
        </AreaChart>
      </ResponsiveContainer>
    );
  }