const rows = [
  {
    icon: 'inventory_2',
    name: 'Industrial Grade Steel Coil',
    id: 'PRD-2024-001',
    hsCode: '7208.1000',
    uom: 'MT',
    tax: '18.00%',
    updated: 'Oct 12, 2024',
  },
  {
    icon: 'precision_manufacturing',
    name: 'Hydraulic Pump Assembly',
    id: 'PRD-2024-089',
    hsCode: '8413.5000',
    uom: 'PCS',
    tax: '18.00%',
    updated: 'Oct 09, 2024',
  },
  {
    icon: 'package_2',
    name: 'Polypropylene Granules',
    id: 'PRD-2024-112',
    hsCode: '3902.1000',
    uom: 'KG',
    tax: '18.00%',
    updated: 'Sep 28, 2024',
  },
  {
    icon: 'bolt',
    name: 'M16 Stainless Steel Bolts',
    id: 'PRD-2024-205',
    hsCode: '7318.1500',
    uom: 'PKT',
    tax: '18.00%',
    updated: 'Sep 15, 2024',
  },
]

export default function MasterDataTable() {
  return (
    <section className="px-4 pb-24 font-['Plus Jakarta Sans'] md:px-10 md:pb-20">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-fintech-accent/40 bg-surface-container-lowest p-3 shadow-sm">
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4">
          <div className="relative w-full sm:w-auto">
            <select className="w-full cursor-pointer appearance-none rounded-lg border-none bg-surface-container-low py-2 pl-4 pr-10 text-xs font-bold text-on-surface-variant focus:ring-0 sm:min-w-[170px]">
              <option>Tax Category: All</option>
              <option>Exempt</option>
              <option>Standard (18%)</option>
            </select>
            <span className="material-symbols-outlined pointer-events-none absolute right-2 top-2 text-sm">
              expand_more
            </span>
          </div>

          <div className="relative w-full sm:w-auto">
            <select className="w-full cursor-pointer appearance-none rounded-lg border-none bg-surface-container-low py-2 pl-4 pr-10 text-xs font-bold text-on-surface-variant focus:ring-0 sm:min-w-[140px]">
              <option>UOM: All</option>
              <option>Kilograms</option>
              <option>Units</option>
            </select>
            <span className="material-symbols-outlined pointer-events-none absolute right-2 top-2 text-sm">
              expand_more
            </span>
          </div>
        </div>

        <div className="text-xs font-medium text-on-surface-variant">
          Showing <span className="font-bold text-primary">1 - 10</span> of 128 results
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl bg-surface-container-lowest shadow-sm">
        <table className="min-w-[820px] w-full border-collapse text-left">
          <thead className="border-b border-outline-variant/10 bg-surface-container-high">
            <tr>
              <th className="px-6 py-4 text-[10px] font-extrabold uppercase tracking-widest text-on-surface-variant">
                Product Name
              </th>
              <th className="px-6 py-4 text-[10px] font-extrabold uppercase tracking-widest text-on-surface-variant">
                HS Code
              </th>
              <th className="px-6 py-4 text-center text-[10px] font-extrabold uppercase tracking-widest text-on-surface-variant">
                UOM
              </th>
              <th className="px-6 py-4 text-right text-[10px] font-extrabold uppercase tracking-widest text-on-surface-variant">
                Default Tax
              </th>
              <th className="px-6 py-4 text-right text-[10px] font-extrabold uppercase tracking-widest text-on-surface-variant">
                Last Updated
              </th>
              <th className="px-6 py-4 text-right text-[10px] font-extrabold uppercase tracking-widest text-on-surface-variant">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-surface-container">
            {rows.map((row) => (
              <tr key={row.id} className="group transition-colors hover:bg-surface-container-low">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-surface-container text-primary">
                      <span className="material-symbols-outlined">{row.icon}</span>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-primary">{row.name}</div>
                      <div className="text-xs text-on-surface-variant">ID: {row.id}</div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-5 text-sm font-medium tabular-nums text-on-surface-variant">
                  {row.hsCode}
                </td>

                <td className="px-6 py-5 text-center">
                  <span className="rounded-full bg-fintech-accent/35 px-3 py-1 text-[10px] font-bold text-primary">
                    {row.uom}
                  </span>
                </td>

                <td className="px-6 py-5 text-right text-sm font-bold tabular-nums">{row.tax}</td>
                <td className="px-6 py-5 text-right text-xs text-on-surface-variant">{row.updated}</td>

                <td className="px-6 py-5 text-right">
                  <div className="flex justify-end gap-2 opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100">
                    <button className="rounded-lg p-2 text-on-surface-variant transition-all hover:bg-white hover:text-primary">
                      <span className="material-symbols-outlined text-lg">edit</span>
                    </button>
                    <button className="rounded-lg p-2 text-on-surface-variant transition-all hover:bg-white hover:text-error">
                      <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-center bg-surface-container-low/50 p-4">
          <button className="px-6 py-2 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant transition-colors hover:text-primary">
            Load more results
          </button>
        </div>
      </div>
    </section>
  )
}
