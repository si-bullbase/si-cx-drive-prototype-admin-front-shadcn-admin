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

const jobTypeLabels = {
  executiveOfficer: '役員',
  manager: '管理職',
  engineer: 'エンジニア',
  salesStaff: '営業',
  marketing: 'マーケティング',
  recruitment: '採用',
  others: 'その他'
}

const purposeLabels = {
  purpose1: '新しい技術トレンドの把握',
  purpose2: '自社に合う製品・サービスの情報収集',
  purpose3: 'パートナー業者探し',
  purpose4: '商談・ネットワークキング',
  purpose5: '採用・人材関連情報の収集',
  purpose6: '社内への提案資料の収集',
  purpose7: '雰囲気を楽しむため',
  others: 'その他'
}

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
            <Bar dataKey="others" stackId="a" fill="#15803d" name={jobTypeLabels.others}/>
            <Bar dataKey="recruitment" stackId="a" fill="#16a34a" name={jobTypeLabels.recruitment}/>
            <Bar dataKey="marketing" stackId="a" fill="#22c55e" name={jobTypeLabels.marketing}/>
            <Bar dataKey="salesStaff" stackId="a" fill="#4ade80" name={jobTypeLabels.salesStaff}/>
            <Bar dataKey="engineer" stackId="a" fill="#86efac" name={jobTypeLabels.engineer}/>
            <Bar dataKey="manager" stackId="a" fill="#bbf7d0" name={jobTypeLabels.manager}/>
            <Bar dataKey="executiveOfficer" stackId="a" fill="#dcfce7" name={jobTypeLabels.executiveOfficer}/>
          </>
        ) : (
          /* 参加目的クロス分析 */
          <>
            <Bar dataKey="others" stackId="a" fill="#15803d" name={purposeLabels.others}/>
            <Bar dataKey="purpose7" stackId="a" fill="#16a34a" name={purposeLabels.purpose7}/>
            <Bar dataKey="purpose6" stackId="a" fill="#22c55e" name={purposeLabels.purpose6}/>
            <Bar dataKey="purpose5" stackId="a" fill="#4ade80" name={purposeLabels.purpose5}/>
            <Bar dataKey="purpose4" stackId="a" fill="#86efac" name={purposeLabels.purpose4}/>
            <Bar dataKey="purpose3" stackId="a" fill="#bbf7d0" name={purposeLabels.purpose3}/>
            <Bar dataKey="purpose2" stackId="a" fill="#dcfce7" name={purposeLabels.purpose2}/>
            <Bar dataKey="purpose1" stackId="a" fill="#f0fdf4" name={purposeLabels.purpose1}/>
          </>
        )}
      </BarChart>
    </ResponsiveContainer>
  );
}
