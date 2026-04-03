import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Strategic Accounts', value: 60, color: '#030e44' },
  { name: 'Growth Partners', value: 25, color: '#5dfdc5' },
  { name: 'Other Entities', value: 15, color: '#bac3ff' },
]

export default function ClientDistributionChart() {
  return (
    <div className="relative h-64 w-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={68}
            outerRadius={84}
            startAngle={90}
            endAngle={-270}
            stroke="none"
            cornerRadius={8}
            paddingAngle={1}
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-headline text-4xl font-black tracking-tighter text-primary">82%</span>
        <span className="font-label mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
          Retention
        </span>
      </div>
    </div>
  )
}
