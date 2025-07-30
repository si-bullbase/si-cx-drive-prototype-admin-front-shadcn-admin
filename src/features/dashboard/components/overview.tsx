import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import type { RankingItem } from '../types'

interface OverviewProps {
  data: RankingItem[]
}

export function Overview({ data }: OverviewProps) {
  return (
    <ResponsiveContainer width='100%' height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey='name'
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Bar
          dataKey='value'
          radius={[4, 4, 0, 0]}
          fill='#06C42C'
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
