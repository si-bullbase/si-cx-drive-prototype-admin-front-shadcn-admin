import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
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

const CustomLegend = (props: any) => {
  const { payload } = props;
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-4">
      {payload.map((entry: any, index: number) => (
        <div key={index} className="flex items-center gap-1">
          <div 
            className="w-3 h-3 rounded-sm" 
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm text-black">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

const CustomTooltip = (props: any) => {
  const { active, payload, label } = props;
  
  if (active && payload && payload.length) {
    const total = payload.reduce((sum: number, item: any) => sum + item.value, 0);
    
    return (
      <div className="bg-white p-4 border border-gray-200 shadow-lg rounded-lg">
        <h3 className="font-semibold text-gray-800 mb-2">{`${label}`}</h3>
        <div className="space-y-1">
          {payload
            .filter((item: any) => item.value > 0)
            .sort((a: any, b: any) => b.value - a.value)
            .map((item: any, index: number) => (
              <div key={index} className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-sm" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-gray-700">{item.name}</span>
                </div>
                <div className="text-right">
                  <span className="font-medium text-gray-800">{item.value}人</span>
                  <span className="text-xs text-gray-500 ml-1">
                    ({((item.value / total) * 100).toFixed(1)}%)
                  </span>
                </div>
              </div>
            ))}
        </div>
        <div className="mt-2 pt-2 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-700">合計</span>
            <span className="font-bold text-gray-800">{total}人</span>
          </div>
        </div>
      </div>
    );
  }
  
  return null;
};

export function StackedBarChart({ data }: StackedBarChartProps) {
  const legendData = 'executiveOfficer' in data[0] ? 
    Object.keys(jobTypeLabels).map(key => ({
      value: jobTypeLabels[key as keyof typeof jobTypeLabels],
      color: key === 'others' ? '#15803d' : 
             key === 'recruitment' ? '#16a34a' :
             key === 'marketing' ? '#22c55e' :
             key === 'salesStaff' ? '#4ade80' :
             key === 'engineer' ? '#86efac' :
             key === 'manager' ? '#bbf7d0' : '#dcfce7'
    })) :
    Object.keys(purposeLabels).map(key => ({
      value: purposeLabels[key as keyof typeof purposeLabels],
      color: key === 'others' ? '#15803d' :
             key === 'purpose7' ? '#16a34a' :
             key === 'purpose6' ? '#22c55e' :
             key === 'purpose5' ? '#4ade80' :
             key === 'purpose4' ? '#86efac' :
             key === 'purpose3' ? '#bbf7d0' :
             key === 'purpose2' ? '#dcfce7' : '#f0fdf4'
    }));

  return (
    <div>
      <CustomLegend payload={legendData} />
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
        <Tooltip content={<CustomTooltip />} />
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
    </div>
  );
}
