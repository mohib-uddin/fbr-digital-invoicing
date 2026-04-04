import MasterDataTable from '../components/modules/master/MasterDataTable'

export default function MasterPage() {
  return (
    <div className="mx-auto max-w-[1600px] font-['Plus Jakarta Sans']">
      <div className="px-10 pb-6 pt-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-primary">Master Data</h2>
            <p className="mt-1 font-medium text-on-surface-variant">
              Manage global inventory assets and registered entities.
            </p>
          </div>

          <div className="flex gap-3">
            <button className="flex items-center gap-2 rounded-xl bg-fintech-accent px-5 py-2.5 text-sm font-bold text-primary transition-all hover:bg-fintech-accent/90">
              <span className="material-symbols-outlined text-sm">upload_file</span>
              Bulk Import
            </button>
            <button className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-on-primary shadow-lg shadow-black/5 transition-all hover:opacity-90">
              <span className="material-symbols-outlined text-sm">add</span>
              Create New Entity
            </button>
          </div>
        </div>

        <div className="mt-12 flex gap-8 border-b border-outline-variant/20">
          <button className="flex items-center gap-2 border-b-2 border-primary pb-4 text-sm font-bold text-primary">
            <span className="material-symbols-outlined text-base">inventory_2</span>
            Products
            <span className="ml-1 rounded bg-surface-container-high px-2 py-0.5 text-[10px]">128</span>
          </button>

          <button className="flex items-center gap-2 pb-4 text-sm font-bold text-on-surface-variant transition-colors hover:text-primary">
            <span className="material-symbols-outlined text-base">group</span>
            Customers
            <span className="ml-1 rounded bg-fintech-accent px-2 py-0.5 text-[10px] text-primary">
              3,492
            </span>
          </button>

          <button className="flex items-center gap-2 pb-4 text-sm font-bold text-on-surface-variant transition-colors hover:text-primary">
            <span className="material-symbols-outlined text-base">store</span>
            Suppliers
          </button>
        </div>
      </div>

      <MasterDataTable />
    </div>
  )
}
