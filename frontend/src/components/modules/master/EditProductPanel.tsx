export default function EditProductPanel() {
  return (
    <section className="rounded-lg bg-surface-container-lowest p-6 shadow-[0_12px_40px_rgba(3,14,68,0.04)]">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-headline text-lg font-bold tracking-tight text-primary">Edit Product Entity</h3>
          <p className="mt-1 text-xs text-on-surface-variant">
            Update the compliance and classification data for this asset.
          </p>
        </div>
        <button className="rounded-full p-1.5 text-slate-500 hover:bg-slate-100">
          <span className="material-symbols-outlined text-sm">close</span>
        </button>
      </div>

      <div className="space-y-4">
        <label className="block">
          <span className="mb-1 block text-[10px] font-black uppercase tracking-widest text-slate-400">
            Product Name
          </span>
          <input
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-primary focus:border-primary/20 focus:ring-2 focus:ring-primary/10"
            defaultValue="Industrial Grade Steel Coil"
            type="text"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-[10px] font-black uppercase tracking-widest text-slate-400">
            HS Code (Harmonized System)
          </span>
          <input
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-primary focus:border-primary/20 focus:ring-2 focus:ring-primary/10"
            defaultValue="7208.1000"
            type="text"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-[10px] font-black uppercase tracking-widest text-slate-400">
            Unit of Measurement (UOM)
          </span>
          <select className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-primary focus:border-primary/20 focus:ring-2 focus:ring-primary/10">
            <option>MT</option>
            <option>KG</option>
            <option>PCS</option>
            <option>PKT</option>
          </select>
        </label>

        <label className="block">
          <span className="mb-1 block text-[10px] font-black uppercase tracking-widest text-slate-400">
            Default Sales Tax Rate (%)
          </span>
          <input
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-primary focus:border-primary/20 focus:ring-2 focus:ring-primary/10"
            defaultValue="18"
            type="number"
          />
        </label>

        <div>
          <span className="mb-1 block text-[10px] font-black uppercase tracking-widest text-slate-400">
            Compliance Status
          </span>
          <div className="flex items-center rounded-lg bg-slate-100 p-1">
            <button className="rounded bg-white px-3 py-1 text-xs font-bold text-primary shadow-sm">Active</button>
            <button className="px-3 py-1 text-xs font-semibold text-slate-500">Archived</button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button className="rounded-lg border border-slate-200 py-2 text-xs font-bold text-slate-500 transition hover:bg-slate-50">
            Discard Changes
          </button>
          <button className="rounded-lg bg-primary py-2 text-xs font-bold text-white transition hover:opacity-90">
            Update Asset
          </button>
        </div>
      </div>
    </section>
  )
}
