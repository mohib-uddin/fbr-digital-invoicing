import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const data = [
  { month: 'JAN', revenue: 20, compliance: 8 },
  { month: 'MAR', revenue: 22, compliance: 10 },
  { month: 'MAY', revenue: 35, compliance: 15 },
  { month: 'JUL', revenue: 32, compliance: 13 },
  { month: 'SEP', revenue: 85, compliance: 25 },
  { month: 'NOV', revenue: 95, compliance: 50 },
]

export default function RevenueTrendChart() {
  return (
    <div className="h-64 w-full pt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 6, right: 6, left: 6, bottom: 0 }}>
          <defs>
            <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#030e44" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#030e44" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="complianceFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#5dfdc5" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#5dfdc5" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid stroke="#f1f3fc" strokeWidth={1} vertical={false} />
          <YAxis hide domain={[0, 100]} />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{
              fill: '#94a3b8',
              fontSize: 10,
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontWeight: 700,
            }}
            dy={10}
          />
          <Tooltip
            cursor={false}
            contentStyle={{
              border: 'none',
              borderRadius: '10px',
              boxShadow: '0 12px 28px rgba(3,14,68,0.12)',
              background: '#ffffff',
              color: '#030e44',
            }}
            labelStyle={{ color: '#64748b', fontSize: '11px', fontWeight: 700 }}
          />
          <Legend
            verticalAlign="top"
            align="right"
            iconType="circle"
            iconSize={8}
            wrapperStyle={{
              paddingBottom: '12px',
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontSize: '11px',
              color: '#64748b',
            }}
          />

          <Area
            type="monotone"
            name="Revenue"
            dataKey="revenue"
            stroke="#030e44"
            strokeWidth={3}
            fill="url(#revenueFill)"
            dot={false}
            activeDot={{ r: 4, fill: '#030e44', strokeWidth: 0 }}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Area
            type="monotone"
            name="Compliance"
            dataKey="compliance"
            stroke="#5dfdc5"
            strokeWidth={2.5}
            fill="url(#complianceFill)"
            dot={false}
            activeDot={{ r: 4, fill: '#5dfdc5', strokeWidth: 0 }}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
