import { PieChart, ResponsiveContainer, Pie, Cell, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'A社', value: 20 },
  { name: 'B社', value: 30 },
  { name: 'C社', value: 40 },
  { name: 'D社', value: 10 },
];

// 値の大きい順に緑の濃度を濃くする
const COLORS = ['#166534', '#22c55e', '#4ade80', '#86efac'];

export  function SimplePieChart() {
  return (
    <ResponsiveContainer width='100%' height={350}>
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        cx="50%" // 中心位置 X
        cy="50%" // 中心位置 Y
        labelLine={false}
        innerRadius={60}
        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
        outerRadius={120}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
    </ResponsiveContainer>
  );
}
