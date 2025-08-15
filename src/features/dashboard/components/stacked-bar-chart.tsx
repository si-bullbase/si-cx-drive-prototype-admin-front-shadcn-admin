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
  executiveOfficer: '経営者・役員',
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

const CustomTick = (props: any) => {
  const { x, y, payload } = props;
  const text = payload.value;
  const lines = [];
  
  for (let i = 0; i < text.length; i += 4) {
    lines.push(text.slice(i, i + 4));
  }
  
  return (
    <g transform={`translate(${x},${y})`}>
      {lines.map((line, index) => (
        <text 
          key={index}
          x={0} 
          y={index * 14 + 8}
          textAnchor="middle" 
          fill="#666"
          fontSize="12"
        >
          {line}
        </text>
      ))}
    </g>
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
      color: key === 'others' ? '#CC79A7' : 
             key === 'recruitment' ? '#0072B2' :
             key === 'marketing' ? '#56B4E9' :
             key === 'salesStaff' ? '#4E79A7' :
             key === 'engineer' ? '#009E73' :
             key === 'manager' ? '#E69F00' : 
             key === 'executiveOfficer' ? '#D55E00' : '#dcfce7'
    })) :
    Object.keys(purposeLabels).map(key => ({
      value: purposeLabels[key as keyof typeof purposeLabels],
      color: key === 'purpose1' ? '#D55E00' :
             key === 'purpose2' ? '#E69F00' :
             key === 'purpose3' ? '#009E73' :
             key === 'purpose4' ? '#4E79A7' :
             key === 'purpose5' ? '#56B4E9' :
             key === 'purpose6' ? '#0072B2' :
             key === 'purpose7' ? '#CC79A7' :
             key === 'others' ? '#8B8B8B' : '#f0fdf4'
    }));

  return (
    <div>
      <CustomLegend payload={legendData} />
      <ResponsiveContainer width="100%" height={500}>
      <BarChart 
        data={data} 
        margin={{ top: 20, right: 30, left: 0, bottom: 30 }}
        barSize={40}
        barGap={2}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis 
          dataKey="name" 
          tick={<CustomTick />}
          interval={0}
          minTickGap={1}
        />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        {/* ブース×職種クロス */}
        {'executiveOfficer' in data[0] ? (
          <>
            <Bar dataKey="executiveOfficer" stackId="a" fill="#D55E00" name={jobTypeLabels.executiveOfficer}/>
            <Bar dataKey="manager" stackId="a" fill="#E69F00" name={jobTypeLabels.manager}/>
            <Bar dataKey="engineer" stackId="a" fill="#009E73" name={jobTypeLabels.engineer}/>
            <Bar dataKey="salesStaff" stackId="a" fill="#4E79A7" name={jobTypeLabels.salesStaff}/>
            <Bar dataKey="marketing" stackId="a" fill="#56B4E9" name={jobTypeLabels.marketing}/>
            <Bar dataKey="recruitment" stackId="a" fill="#0072B2" name={jobTypeLabels.recruitment}/>
            <Bar dataKey="others" stackId="a" fill="#8B8B8B" name={jobTypeLabels.others}/>
          </>
        ) : (
          /* 参加目的クロス分析 */
          <>
            <Bar dataKey="purpose1" stackId="a" fill="#D55E00" name={purposeLabels.purpose1}/>
            <Bar dataKey="purpose2" stackId="a" fill="#E69F00" name={purposeLabels.purpose2}/>
            <Bar dataKey="purpose3" stackId="a" fill="#009E73" name={purposeLabels.purpose3}/>
            <Bar dataKey="purpose4" stackId="a" fill="#4E79A7" name={purposeLabels.purpose4}/>
            <Bar dataKey="purpose5" stackId="a" fill="#56B4E9" name={purposeLabels.purpose5}/>
            <Bar dataKey="purpose6" stackId="a" fill="#0072B2" name={purposeLabels.purpose6}/>
            <Bar dataKey="purpose7" stackId="a" fill="#CC79A7" name={purposeLabels.purpose7}/>
            <Bar dataKey="others" stackId="a" fill="#8B8B8B" name={purposeLabels.others}/>
          </>
        )}
      </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
