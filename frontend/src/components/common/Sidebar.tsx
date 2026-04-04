import { NavLink } from 'react-router-dom'

type NavItemProps = {
  icon: string
  label: string
  to: string
}

function NavItem({ icon, label, to }: NavItemProps) {
  return (
    <NavLink
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-lg px-4 py-3 transition-colors duration-300 ${
          isActive
            ? 'bg-fintech-accent text-primary shadow-sm font-semibold'
            : 'text-slate-500 hover:text-[#030e44] hover:bg-slate-200/50'
        }`
      }
      to={to}
    >
      <span className="material-symbols-outlined">{icon}</span>
      <span className="font-body text-sm font-semibold tracking-tight">{label}</span>
    </NavLink>
  )
}

export default function Sidebar() {
  return (
    <aside className="font-body fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-slate-100 bg-slate-50 px-4 py-8">
      <div className="mb-10 px-2">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white">
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              account_balance
            </span>
          </div>
          <div>
            <h1 className="font-headline text-lg font-extrabold leading-tight tracking-tight text-[#030e44]">
              Sovereign
            </h1>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
              Enterprise Compliance
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        <NavItem icon="dashboard" label="Dashboard" to="/dashboard" />
        <NavItem icon="receipt_long" label="Invoices" to="/invoices" />
        <NavItem icon="database" label="Master Data" to="/master" />
        <NavItem icon="analytics" label="Reports" to="/reports" />
      </nav>

      <div className="mt-auto space-y-1 border-t border-slate-200/50 pt-4">
        <button className="mb-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 font-bold text-white shadow-lg shadow-primary/20 transition-all hover:opacity-90 active:scale-95">
          <span className="material-symbols-outlined text-sm">add</span>
          <span className="text-sm">New Invoice</span>
        </button>
        <a
          className="flex items-center gap-3 rounded-lg px-4 py-3 text-slate-500 transition-colors duration-300 hover:bg-slate-200/50 hover:text-[#030e44]"
          href="#"
        >
          <span className="material-symbols-outlined">help</span>
          <span className="font-body text-sm font-semibold tracking-tight">Help Center</span>
        </a>
        <a
          className="flex items-center gap-3 rounded-lg px-4 py-3 text-slate-500 transition-colors duration-300 hover:bg-slate-200/50 hover:text-[#030e44]"
          href="#"
        >
          <span className="material-symbols-outlined">logout</span>
          <span className="font-body text-sm font-semibold tracking-tight">Sign Out</span>
        </a>
      </div>
    </aside>
  )
}
