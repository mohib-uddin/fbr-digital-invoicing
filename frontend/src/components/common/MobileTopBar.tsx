export default function MobileTopBar() {
  return (
    <header className="sticky top-0 z-40 border-b border-outline-variant/20 bg-white/90 px-4 py-3 backdrop-blur lg:hidden">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-white">
            <span className="material-symbols-outlined text-sm">account_balance</span>
          </div>
          <div>
            <p className="font-headline text-sm font-extrabold tracking-tight text-primary">Sovereign</p>
            <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500">Enterprise Compliance</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button className="rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100">
            <span className="material-symbols-outlined text-base">notifications</span>
          </button>
          <button className="rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100">
            <span className="material-symbols-outlined text-base">search</span>
          </button>
        </div>
      </div>
    </header>
  )
}
