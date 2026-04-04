import { NavLink } from 'react-router-dom'

const tabs = [
  { to: '/dashboard', label: 'Home', icon: 'dashboard' },
  { to: '/master', label: 'Master', icon: 'database' },
  { to: '/invoices', label: 'Invoices', icon: 'receipt_long' },
  { to: '/reports', label: 'Reports', icon: 'analytics' },
]

export default function MobileBottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-outline-variant/20 bg-white/95 px-2 pb-[calc(env(safe-area-inset-bottom)+0.5rem)] pt-2 backdrop-blur lg:hidden">
      <div className="mx-auto grid max-w-md grid-cols-4 gap-1">
        {tabs.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center rounded-xl py-2 transition-colors ${
                isActive ? 'bg-fintech-accent/45 text-primary' : 'text-slate-500 hover:bg-slate-100'
              }`
            }
          >
            <span className="material-symbols-outlined text-[20px]">{tab.icon}</span>
            <span className="mt-0.5 text-[10px] font-bold tracking-tight">{tab.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
