type InvoiceView = 'posted' | 'unposted'

type PostedInvoiceRow = {
  id: string
  invoiceNumber: string
  fbrInvoiceNumber: string
  invoiceRefNo: string
  invoiceDate: string
  buyerNtnCnic: string
  buyerBusinessName: string
  total: string
  status: 'Posted'
}

type UnpostedInvoiceRow = {
  id: string
  invoiceNumber: string
  invoiceRefNo: string
  invoiceDate: string
  buyerNtnCnic: string
  buyerBusinessName: string
  total: string
}

type InvoicesDataTableProps = {
  view: InvoiceView
}

const postedRows: PostedInvoiceRow[] = [
  {
    id: 'P-00017',
    invoiceNumber: 'INV-NAS-0004-26-00017',
    fbrInvoiceNumber: '3450119599305DIADFODK190190',
    invoiceRefNo: '591',
    invoiceDate: '2026-02-26',
    buyerNtnCnic: '1455294',
    buyerBusinessName: 'M/S VIVFY INTERNATIONAL',
    total: '761,395.00',
    status: 'Posted',
  },
  {
    id: 'P-00014',
    invoiceNumber: 'INV-NAS-0004-26-00014',
    fbrInvoiceNumber: '3450119599305DIADFODB642630',
    invoiceRefNo: '593',
    invoiceDate: '2026-02-23',
    buyerNtnCnic: '1455294',
    buyerBusinessName: 'M/S VIVFY INTERNATIONAL',
    total: '678,534.22',
    status: 'Posted',
  },
  {
    id: 'P-00015',
    invoiceNumber: 'INV-NAS-0004-26-00015',
    fbrInvoiceNumber: '3450119599305DIADFOBH315103',
    invoiceRefNo: '592',
    invoiceDate: '2026-02-23',
    buyerNtnCnic: '6681106',
    buyerBusinessName: 'M/S N&F INTERNATIONAL LEATHER & SONS',
    total: '2,295,905.35',
    status: 'Posted',
  },
]

const unpostedRows: UnpostedInvoiceRow[] = [
  {
    id: 'U-00026',
    invoiceNumber: 'INV-NAS-0004-26-00026',
    invoiceRefNo: '123',
    invoiceDate: '2026-04-03',
    buyerNtnCnic: '2303326',
    buyerBusinessName: 'LEATHER LEGEND',
    total: '8,319.00',
  },
  {
    id: 'U-00024',
    invoiceNumber: 'INV-NAS-0004-26-00024',
    invoiceRefNo: '908',
    invoiceDate: '2026-04-02',
    buyerNtnCnic: '2303326',
    buyerBusinessName: 'LEATHER LEGEND',
    total: '460.20',
  },
  {
    id: 'U-00025',
    invoiceNumber: 'INV-NAS-0004-26-00025',
    invoiceRefNo: '123',
    invoiceDate: '2026-04-02',
    buyerNtnCnic: '2303326',
    buyerBusinessName: 'LEATHER LEGEND',
    total: '64,888.20',
  },
]

function RowActionsMenu() {
  return (
    <details className="group relative">
      <summary className="flex cursor-pointer list-none items-center justify-center rounded-lg p-1.5 text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-primary">
        <span className="material-symbols-outlined text-lg">more_horiz</span>
      </summary>

      <div className="absolute right-0 top-9 z-20 w-40 rounded-xl border border-outline-variant/30 bg-white p-1.5 shadow-[0_10px_30px_rgba(3,14,68,0.12)]">
        <button className="w-full rounded-lg px-3 py-2 text-left text-xs font-semibold text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-primary">
          View Details
        </button>
        <button className="w-full rounded-lg px-3 py-2 text-left text-xs font-semibold text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-primary">
          Edit Invoice
        </button>
        <button className="w-full rounded-lg px-3 py-2 text-left text-xs font-semibold text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-primary">
          Duplicate
        </button>
      </div>
    </details>
  )
}

export default function InvoicesDataTable({ view }: InvoicesDataTableProps) {
  const isPosted = view === 'posted'
  const totalRows = isPosted ? postedRows.length : unpostedRows.length

  return (
    <section className="px-4 pb-24 font-['Plus Jakarta Sans'] md:px-10 md:pb-20">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-fintech-accent/40 bg-surface-container-lowest p-3 shadow-sm">
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4">
          <div className="relative w-full sm:w-auto">
            <select className="w-full cursor-pointer appearance-none rounded-lg border-none bg-surface-container-low py-2 pl-4 pr-10 text-xs font-bold text-on-surface-variant focus:ring-0 sm:min-w-[170px]">
              <option>{isPosted ? 'Status: Posted' : 'Status: Unposted'}</option>
              <option>Status: All</option>
            </select>
            <span className="material-symbols-outlined pointer-events-none absolute right-2 top-2 text-sm">
              expand_more
            </span>
          </div>

          <div className="relative w-full sm:w-auto">
            <select className="w-full cursor-pointer appearance-none rounded-lg border-none bg-surface-container-low py-2 pl-4 pr-10 text-xs font-bold text-on-surface-variant focus:ring-0 sm:min-w-[170px]">
              <option>Invoice Date: Last 30 Days</option>
              <option>Invoice Date: This Month</option>
              <option>Invoice Date: This Quarter</option>
            </select>
            <span className="material-symbols-outlined pointer-events-none absolute right-2 top-2 text-sm">
              expand_more
            </span>
          </div>
        </div>

        <div className="text-xs font-medium text-on-surface-variant">
          Showing <span className="font-bold text-primary">1 - {totalRows}</span> of {totalRows} results
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl bg-surface-container-lowest shadow-sm">
        {isPosted ? (
          <table className="min-w-[1160px] w-full border-collapse text-left">
            <thead className="border-b border-outline-variant/10 bg-surface-container-high">
              <tr>
                <th className="px-4 py-4 text-[10px] font-extrabold uppercase tracking-widest text-on-surface-variant">
                  Invoice #
                </th>
                <th className="px-4 py-4 text-[10px] font-extrabold uppercase tracking-widest text-on-surface-variant">
                  FBR Invoice #
                </th>
                <th className="px-4 py-4 text-[10px] font-extrabold uppercase tracking-widest text-on-surface-variant">
                  Invoice Ref No.
                </th>
                <th className="px-4 py-4 text-[10px] font-extrabold uppercase tracking-widest text-on-surface-variant">
                  Invoice Date
                </th>
                <th className="px-4 py-4 text-[10px] font-extrabold uppercase tracking-widest text-on-surface-variant">
                  Buyer NTN / CNIC
                </th>
                <th className="px-4 py-4 text-[10px] font-extrabold uppercase tracking-widest text-on-surface-variant">
                  Buyer Business Name
                </th>
                <th className="px-4 py-4 text-right text-[10px] font-extrabold uppercase tracking-widest text-on-surface-variant">
                  Total
                </th>
                <th className="px-4 py-4 text-[10px] font-extrabold uppercase tracking-widest text-on-surface-variant">
                  Status
                </th>
                <th className="px-4 py-4 text-center text-[10px] font-extrabold uppercase tracking-widest text-on-surface-variant">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-surface-container">
              {postedRows.map((row) => (
                <tr className="transition-colors hover:bg-surface-container-low" key={row.id}>
                  <td className="px-4 py-4 text-sm font-bold text-primary">{row.invoiceNumber}</td>
                  <td className="px-4 py-4 text-xs font-medium text-on-surface-variant">
                    <span className="block max-w-[210px] truncate" title={row.fbrInvoiceNumber}>
                      {row.fbrInvoiceNumber}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm font-medium text-on-surface-variant">{row.invoiceRefNo}</td>
                  <td className="px-4 py-4 text-sm font-medium text-on-surface-variant">{row.invoiceDate}</td>
                  <td className="px-4 py-4 text-sm font-medium text-on-surface-variant">{row.buyerNtnCnic}</td>
                  <td className="px-4 py-4 text-sm font-semibold text-primary">{row.buyerBusinessName}</td>
                  <td className="px-4 py-4 text-right text-sm font-bold tabular-nums text-primary">{row.total}</td>
                  <td className="px-4 py-4">
                    <span className="rounded-full bg-fintech-accent/35 px-3 py-1 text-[10px] font-bold text-secondary">
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <div className="inline-block text-left">
                      <RowActionsMenu />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="min-w-[1060px] w-full border-collapse text-left">
            <thead className="border-b border-outline-variant/10 bg-surface-container-high">
              <tr>
                <th className="px-4 py-4 text-[10px] font-extrabold uppercase tracking-widest text-on-surface-variant">
                  Invoice #
                </th>
                <th className="px-4 py-4 text-[10px] font-extrabold uppercase tracking-widest text-on-surface-variant">
                  Invoice Ref No.
                </th>
                <th className="px-4 py-4 text-[10px] font-extrabold uppercase tracking-widest text-on-surface-variant">
                  Invoice Date
                </th>
                <th className="px-4 py-4 text-[10px] font-extrabold uppercase tracking-widest text-on-surface-variant">
                  Buyer NTN / CNIC
                </th>
                <th className="px-4 py-4 text-[10px] font-extrabold uppercase tracking-widest text-on-surface-variant">
                  Buyer Business Name
                </th>
                <th className="px-4 py-4 text-right text-[10px] font-extrabold uppercase tracking-widest text-on-surface-variant">
                  Total
                </th>
                <th className="px-4 py-4 text-[10px] font-extrabold uppercase tracking-widest text-on-surface-variant">
                  Production Post
                </th>
                <th className="px-4 py-4 text-center text-[10px] font-extrabold uppercase tracking-widest text-on-surface-variant">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-surface-container">
              {unpostedRows.map((row) => (
                <tr className="transition-colors hover:bg-surface-container-low" key={row.id}>
                  <td className="px-4 py-4 text-sm font-bold text-primary">{row.invoiceNumber}</td>
                  <td className="px-4 py-4 text-sm font-medium text-on-surface-variant">{row.invoiceRefNo}</td>
                  <td className="px-4 py-4 text-sm font-medium text-on-surface-variant">{row.invoiceDate}</td>
                  <td className="px-4 py-4 text-sm font-medium text-on-surface-variant">{row.buyerNtnCnic}</td>
                  <td className="px-4 py-4 text-sm font-semibold text-primary">{row.buyerBusinessName}</td>
                  <td className="px-4 py-4 text-right text-sm font-bold tabular-nums text-primary">{row.total}</td>
                  <td className="px-4 py-4">
                    <button className="rounded-lg border border-outline-variant/50 bg-surface-container-low px-3 py-1 text-[10px] font-bold text-on-surface-variant transition-colors hover:bg-surface-container-high">
                      Production Post
                    </button>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <div className="inline-block text-left">
                      <RowActionsMenu />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="flex justify-center bg-surface-container-low/50 p-4">
          <button className="px-6 py-2 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant transition-colors hover:text-primary">
            Load more results
          </button>
        </div>
      </div>
    </section>
  )
}
