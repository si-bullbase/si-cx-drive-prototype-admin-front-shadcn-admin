'use client';

import {
  PieChart,
  ResponsiveContainer,
  Pie,
  Cell,
  Tooltip,
} from 'recharts';
import type { PieChartItem } from '../types';

// 緑の濃淡カラー（値の大きい順に濃く）
const COLORS = ['#166534', '#22c55e', '#4ade80', '#86efac', '#bbf7d0', '#dcfce6'];

interface SimplePieChartProps {
  data: PieChartItem[];
}

// ✅ カスタムラベル（外側、項目名→改行→％、スタイル分け）
const renderCustomLabel = ({
  cx,
  cy,
  midAngle,
  outerRadius,
  percent,
  name,
}: any) => {
  const RADIAN = Math.PI / 180;
  const radius = outerRadius + 20; // 円の外に出す
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#1f2937" // Tailwind: text-gray-800
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      fontFamily="ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial"
    >
      {/* 項目名（上） */}
      <tspan
        x={x}
        dy="-0.5em"
        fontSize={14} // Tailwind: text-sm
        fontWeight="500" // Tailwind: font-medium
      >
        {name}
      </tspan>
      {/* パーセンテージ（下） */}
      <tspan
        x={x}
        dy="1.2em"
        fontSize={18} // Tailwind: text-xl
        fontWeight="700" // Tailwind: font-bold
      >
        {(percent * 100).toFixed(0)}%
      </tspan>
    </text>
  );
};

export function SimplePieChart({ data }: SimplePieChartProps) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={120}
          labelLine={true} // 線を表示
          label={renderCustomLabel} // カスタムラベル適用
          dataKey="value"
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
