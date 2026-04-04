export default function Header() {
  return (
    <header className="sticky top-0 z-40 flex w-full items-center justify-between bg-white/80 px-8 py-3 shadow-[0_12px_40px_rgba(3,14,68,0.04)] backdrop-blur-md dark:bg-slate-950/80">
      <div className="flex items-center gap-6">
        <div className="group relative">
          <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
            <span className="material-symbols-outlined text-xl">search</span>
          </span>
          <input
            className="w-80 rounded-full border-none bg-slate-100/50 py-2 pl-10 pr-4 text-sm outline-none transition-all focus:ring-2 focus:ring-primary/10"
            placeholder="Global Ledger Search..."
            type="text"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center rounded-lg bg-slate-100 p-1">
          <button className="px-4 py-1 text-xs font-medium text-slate-500 transition-colors hover:text-primary">
            Sandbox Mode
          </button>
          <button className="rounded bg-white px-4 py-1 text-xs font-bold text-primary shadow-sm">
            Production
          </button>
        </div>

        <div className="ml-2 flex items-center gap-2 border-l border-slate-200 px-4">
          <button className="rounded-full p-2 text-slate-500 transition-all hover:bg-slate-100">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button className="rounded-full p-2 text-slate-500 transition-all hover:bg-slate-100">
            <span className="material-symbols-outlined">settings_suggest</span>
          </button>
        </div>

        <div className="flex items-center gap-3 border-l border-slate-200 pl-4">
          <div className="hidden text-right xl:block">
            <p className="text-xs font-bold text-primary">Alexander Sovereign</p>
            <p className="text-[10px] text-slate-500">Chief Executive Officer</p>
          </div>
          <img
            alt="Executive User Profile"
            className="h-10 w-10 rounded-full object-cover ring-2 ring-slate-100"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjNNEqe276g12mzyc2hjMgCa79Ch-RpnYesnSZqmxc9JBC9HMTARQDvHu8W8C6SDi-AtfQw4qlHeIc-G2G1lqeSCRBT9s_Jggp9RRv3VmjDdFFDxvovK_AJgwZYWwVw0skxkuueB7ziUekf1VR5aVH3AWRfOLSYWpqGpVtfRDxDkAUVz5C-ioAXCVP_h9EVqRUhoeuo5i2e8SS4bpDpiDimiDylJtf989dvLCuRC-mapQHuztExY90CEIW7za5JdXc-XkceM6JIqcq"
          />
        </div>
      </div>
    </header>
  )
}
