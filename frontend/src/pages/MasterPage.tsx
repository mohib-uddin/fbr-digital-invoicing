import MasterDataTable from '../components/modules/master/MasterDataTable'

export default function MasterPage() {
  return (
    <div className="mx-auto max-w-[1600px] font-['Plus Jakarta Sans']">
      <div className="px-4 pb-4 pt-6 md:px-10 md:pb-6 md:pt-10">
        <div className="flex flex-wrap items-start justify-between gap-4 md:items-end">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-primary">Master Data</h2>
            <p className="mt-1 font-medium text-on-surface-variant">
              Manage global inventory assets and registered entities.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <button className="flex items-center justify-center gap-2 rounded-xl bg-fintech-accent px-5 py-2.5 text-sm font-bold text-primary transition-all hover:bg-fintech-accent/90">
              <span className="material-symbols-outlined text-sm">upload_file</span>
              Bulk Import
            </button>
            <button className="flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-on-primary shadow-lg shadow-black/5 transition-all hover:opacity-90">
              <span className="material-symbols-outlined text-sm">add</span>
              Create New Entity
            </button>
          </div>
        </div>

        <div className="mt-8 flex gap-6 overflow-x-auto border-b border-outline-variant/20 md:mt-12 md:gap-8">
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
