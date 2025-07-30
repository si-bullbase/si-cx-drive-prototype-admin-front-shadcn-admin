import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { BoothJobCrossItem, CrossAnalysisItem } from '../types'

interface StackedBarChartProps {
  data: BoothJobCrossItem[] | CrossAnalysisItem[]
}

export function StackedBarChart({ data }: StackedBarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart 
        data={data} 
        margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        barSize={40}
        barGap={2}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {/* ブース×職種クロス */}
        {'executiveOfficer' in data[0] ? (
          <>
            <Bar dataKey="others" stackId="a" fill="#15803d"/>
            <Bar dataKey="recruitment" stackId="a" fill="#16a34a"/>
            <Bar dataKey="marketing" stackId="a" fill="#22c55e"/>
            <Bar dataKey="salesStaff" stackId="a" fill="#4ade80"/>
            <Bar dataKey="engineer" stackId="a" fill="#86efac"/>
            <Bar dataKey="manager" stackId="a" fill="#bbf7d0"/>
            <Bar dataKey="executiveOfficer" stackId="a" fill="#dcfce7"/>
          </>
        ) : (
          /* 参加目的クロス分析 */
          <>
            <Bar dataKey="others" stackId="a" fill="#15803d"/>
            <Bar dataKey="purpose7" stackId="a" fill="#16a34a"/>
            <Bar dataKey="purpose6" stackId="a" fill="#22c55e"/>
            <Bar dataKey="purpose5" stackId="a" fill="#4ade80"/>
            <Bar dataKey="purpose4" stackId="a" fill="#86efac"/>
            <Bar dataKey="purpose3" stackId="a" fill="#bbf7d0"/>
            <Bar dataKey="purpose2" stackId="a" fill="#dcfce7"/>
            <Bar dataKey="purpose1" stackId="a" fill="#f0fdf4"/>
          </>
        )}
      </BarChart>
    </ResponsiveContainer>
  );
}
