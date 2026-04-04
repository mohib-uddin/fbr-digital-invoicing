import { useMemo, useState } from 'react'

type PartyDetails = {
  businessName: string
  ntnCnic: string
  province: string
  address: string
  registrationType?: string
}

type InvoiceHeader = {
  invoiceNumber: string
  invoiceDate: string
  invoiceType: string
  invoiceRefNo: string
  remarks: string
}

type ItemDraft = {
  product: string
  hsCode: string
  description: string
  uom: string
  saleType: string
  rateLabel: string
  quantity: number
  unitPrice: number
  fixedNotifiedValue: number
  extraTax: number
  furtherTax: number
  fedPayable: number
  discount: number
  withholdingTax: number
  sroScheduleNo: string
  sroItemSerialNo: string
}

type InvoiceItem = ItemDraft & {
  id: string
  valueExcludingST: number
  salesTaxApplicable: number
  lineTotal: number
}

const productCatalog = [
  { label: 'SHEEP BLACK (PLX)', hsCode: '4105.1000', description: 'SHEEP BLACK (PLX)', uom: 'KG' },
  { label: 'COTTON FABRIC PREMIUM', hsCode: '5208.3210', description: 'COTTON FABRIC PREMIUM', uom: 'MTR' },
  { label: 'CHEMICAL SOLVENT X9', hsCode: '3814.0090', description: 'CHEMICAL SOLVENT X9', uom: 'LTR' },
]

const provinces = ['SINDH', 'PUNJAB', 'BALOCHISTAN', 'KPK', 'ICT']

const initialDraft = (): ItemDraft => ({
  product: '',
  hsCode: '',
  description: '',
  uom: 'KG',
  saleType: 'Goods at standard rate (default)',
  rateLabel: '18%',
  quantity: 1,
  unitPrice: 0,
  fixedNotifiedValue: 0,
  extraTax: 0,
  furtherTax: 0,
  fedPayable: 0,
  discount: 0,
  withholdingTax: 0,
  sroScheduleNo: '',
  sroItemSerialNo: '',
})

function formatMoney(value: number) {
  return new Intl.NumberFormat('en-PK', { maximumFractionDigits: 2 }).format(value)
}

function parseRate(rateLabel: string) {
  const parsed = Number.parseFloat(rateLabel.replace('%', '').trim())
  return Number.isNaN(parsed) ? 0 : parsed
}

function createInvoiceItem(draft: ItemDraft): InvoiceItem {
  const valueExcludingST = draft.quantity * draft.unitPrice
  const salesTaxApplicable = (valueExcludingST * parseRate(draft.rateLabel)) / 100
  const lineTotal =
    valueExcludingST +
    salesTaxApplicable +
    draft.extraTax +
    draft.furtherTax +
    draft.fedPayable +
    draft.withholdingTax -
    draft.discount

  return {
    ...draft,
    id: `INV-ITEM-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    valueExcludingST,
    salesTaxApplicable,
    lineTotal,
  }
}

export default function InvoiceCreationPage() {
  const [invoiceHeader, setInvoiceHeader] = useState<InvoiceHeader>({
    invoiceNumber: 'INV-NAS-0004-26-00026',
    invoiceDate: '2026-04-03',
    invoiceType: 'Sale Invoice',
    invoiceRefNo: '123',
    remarks: '',
  })

  const [seller, setSeller] = useState<PartyDetails>({
    businessName: 'A.K Traders',
    ntnCnic: '7387127',
    province: 'SINDH',
    address: 'PLOT NO 249, SECTOR -7A, KORANGI INDUSTRIAL AREA, KORANGI',
  })

  const [buyer, setBuyer] = useState<PartyDetails>({
    businessName: 'LEATHER LEGEND',
    ntnCnic: '2303326',
    province: 'PUNJAB',
    registrationType: 'Registered',
    address: 'Al-Ashar Road, Al-Ghani Industrial Estate, near Metro Station, Lahore',
  })

  const [items, setItems] = useState<InvoiceItem[]>([])
  const [showItemDialog, setShowItemDialog] = useState(false)
  const [itemDraft, setItemDraft] = useState<ItemDraft>(initialDraft)

  const draftCalculated = useMemo(() => {
    const valueExcludingST = itemDraft.quantity * itemDraft.unitPrice
    const salesTaxApplicable = (valueExcludingST * parseRate(itemDraft.rateLabel)) / 100
    const total =
      valueExcludingST +
      salesTaxApplicable +
      itemDraft.extraTax +
      itemDraft.furtherTax +
      itemDraft.fedPayable +
      itemDraft.withholdingTax -
      itemDraft.discount

    return { valueExcludingST, salesTaxApplicable, total }
  }, [itemDraft])

  const totals = useMemo(() => {
    const subtotal = items.reduce((sum, item) => sum + item.valueExcludingST, 0)
    const salesTax = items.reduce((sum, item) => sum + item.salesTaxApplicable, 0)
    const extras = items.reduce(
      (sum, item) => sum + item.extraTax + item.furtherTax + item.fedPayable + item.withholdingTax,
      0,
    )
    const discount = items.reduce((sum, item) => sum + item.discount, 0)
    const grandTotal = subtotal + salesTax + extras - discount

    return { subtotal, salesTax, extras, discount, grandTotal }
  }, [items])

  const onProductSelect = (productName: string) => {
    const selected = productCatalog.find((entry) => entry.label === productName)
    setItemDraft((prev) => ({
      ...prev,
      product: productName,
      hsCode: selected?.hsCode ?? prev.hsCode,
      description: selected?.description ?? prev.description,
      uom: selected?.uom ?? prev.uom,
    }))
  }

  const addItemToInvoice = () => {
    if (!itemDraft.product || itemDraft.quantity <= 0 || itemDraft.unitPrice <= 0) {
      return
    }

    setItems((prev) => [...prev, createInvoiceItem(itemDraft)])
    setItemDraft(initialDraft())
    setShowItemDialog(false)
  }

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const resetInvoice = () => {
    setItems([])
    setInvoiceHeader((prev) => ({ ...prev, invoiceRefNo: '', remarks: '' }))
  }

  return (
    <div className="invoice-clean mx-auto max-w-[1600px] space-y-6 px-4 pb-24 pt-6 md:space-y-8 md:px-10 md:pt-10">
      <section className="rounded-2xl border border-outline-variant/20 bg-gradient-to-r from-primary to-primary-container px-6 py-5 text-white shadow-[0_20px_50px_rgba(3,14,68,0.22)]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-white/70">Transactions</p>
            <h1 className="mt-2 font-headline text-2xl font-extrabold tracking-tight md:text-3xl">
              Create Invoice
            </h1>
            <p className="mt-2 max-w-3xl text-sm text-white/80">
              Capture invoice master data, add taxable line items, and review totals before posting.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              className="rounded-xl border border-white/25 bg-white/10 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-white/20"
              onClick={resetInvoice}
              type="button"
            >
              New Invoice
            </button>
            <button
              className="rounded-xl bg-fintech-accent px-4 py-2 text-xs font-black text-primary shadow-lg shadow-black/10 transition-all hover:opacity-90"
              type="button"
            >
              Save As Draft
            </button>
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_330px]">
        <div className="space-y-6">
          <section className="rounded-2xl border border-outline-variant/20 bg-surface-container-lowest p-5 shadow-[0_8px_28px_rgba(3,14,68,0.05)] md:p-6">
            <div className="mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">description</span>
              <h2 className="font-headline text-lg font-extrabold text-primary">Invoice Information</h2>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <label className="block">
                <span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Invoice # (AutoFill)
                </span>
                <input
                  className="w-full rounded-xl border border-outline-variant/30 bg-surface-container-low px-3 py-2.5 text-sm font-semibold text-primary outline-none"
                  disabled
                  value={invoiceHeader.invoiceNumber}
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Invoice Date
                </span>
                <input
                  className="w-full rounded-xl border border-outline-variant/30 bg-white px-3 py-2.5 text-sm font-semibold text-primary outline-none focus:border-primary/30 focus:ring-2 focus:ring-primary/10"
                  onChange={(event) =>
                    setInvoiceHeader((prev) => ({ ...prev, invoiceDate: event.target.value }))
                  }
                  type="date"
                  value={invoiceHeader.invoiceDate}
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Invoice Type
                </span>
                <select
                  className="w-full rounded-xl border border-outline-variant/30 bg-white px-3 py-2.5 text-sm font-semibold text-primary outline-none focus:border-primary/30 focus:ring-2 focus:ring-primary/10"
                  onChange={(event) =>
                    setInvoiceHeader((prev) => ({ ...prev, invoiceType: event.target.value }))
                  }
                  value={invoiceHeader.invoiceType}
                >
                  <option>Sale Invoice</option>
                  <option>Debit Note</option>
                  <option>Credit Note</option>
                </select>
              </label>
            </div>
          </section>

          <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <article className="rounded-2xl border border-outline-variant/20 bg-surface-container-lowest p-5 shadow-[0_8px_28px_rgba(3,14,68,0.05)] md:p-6">
              <div className="mb-4 flex items-center gap-2 text-primary">
                <span className="material-symbols-outlined">storefront</span>
                <h3 className="font-headline text-lg font-extrabold">Seller Details</h3>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <label className="md:col-span-2">
                  <span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Seller Business Name
                  </span>
                  <input
                    className="w-full rounded-xl border border-outline-variant/30 bg-white px-3 py-2.5 text-sm font-semibold text-primary outline-none focus:border-primary/30 focus:ring-2 focus:ring-primary/10"
                    onChange={(event) => setSeller((prev) => ({ ...prev, businessName: event.target.value }))}
                    value={seller.businessName}
                  />
                </label>
                <label>
                  <span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Seller NTN / CNIC
                  </span>
                  <input
                    className="w-full rounded-xl border border-outline-variant/30 bg-white px-3 py-2.5 text-sm font-semibold text-primary outline-none focus:border-primary/30 focus:ring-2 focus:ring-primary/10"
                    onChange={(event) => setSeller((prev) => ({ ...prev, ntnCnic: event.target.value }))}
                    value={seller.ntnCnic}
                  />
                </label>
                <label>
                  <span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Seller Province
                  </span>
                  <select
                    className="w-full rounded-xl border border-outline-variant/30 bg-white px-3 py-2.5 text-sm font-semibold text-primary outline-none focus:border-primary/30 focus:ring-2 focus:ring-primary/10"
                    onChange={(event) => setSeller((prev) => ({ ...prev, province: event.target.value }))}
                    value={seller.province}
                  >
                    {provinces.map((province) => (
                      <option key={province}>{province}</option>
                    ))}
                  </select>
                </label>
                <label className="md:col-span-2">
                  <span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Seller Address
                  </span>
                  <textarea
                    className="h-24 w-full rounded-xl border border-outline-variant/30 bg-white px-3 py-2.5 text-sm font-semibold text-primary outline-none focus:border-primary/30 focus:ring-2 focus:ring-primary/10"
                    onChange={(event) => setSeller((prev) => ({ ...prev, address: event.target.value }))}
                    value={seller.address}
                  />
                </label>
              </div>
            </article>

            <article className="rounded-2xl border border-outline-variant/20 bg-surface-container-lowest p-5 shadow-[0_8px_28px_rgba(3,14,68,0.05)] md:p-6">
              <div className="mb-4 flex items-center gap-2 text-primary">
                <span className="material-symbols-outlined">person_add</span>
                <h3 className="font-headline text-lg font-extrabold">Buyer Details</h3>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <label className="md:col-span-2">
                  <span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Buyer Business Name
                  </span>
                  <input
                    className="w-full rounded-xl border border-outline-variant/30 bg-white px-3 py-2.5 text-sm font-semibold text-primary outline-none focus:border-primary/30 focus:ring-2 focus:ring-primary/10"
                    onChange={(event) => setBuyer((prev) => ({ ...prev, businessName: event.target.value }))}
                    value={buyer.businessName}
                  />
                </label>
                <label>
                  <span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Buyer NTN / CNIC
                  </span>
                  <input
                    className="w-full rounded-xl border border-outline-variant/30 bg-white px-3 py-2.5 text-sm font-semibold text-primary outline-none focus:border-primary/30 focus:ring-2 focus:ring-primary/10"
                    onChange={(event) => setBuyer((prev) => ({ ...prev, ntnCnic: event.target.value }))}
                    value={buyer.ntnCnic}
                  />
                </label>
                <label>
                  <span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Buyer Province
                  </span>
                  <select
                    className="w-full rounded-xl border border-outline-variant/30 bg-white px-3 py-2.5 text-sm font-semibold text-primary outline-none focus:border-primary/30 focus:ring-2 focus:ring-primary/10"
                    onChange={(event) => setBuyer((prev) => ({ ...prev, province: event.target.value }))}
                    value={buyer.province}
                  >
                    {provinces.map((province) => (
                      <option key={province}>{province}</option>
                    ))}
                  </select>
                </label>
                <label>
                  <span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Buyer Registration Type
                  </span>
                  <select
                    className="w-full rounded-xl border border-outline-variant/30 bg-white px-3 py-2.5 text-sm font-semibold text-primary outline-none focus:border-primary/30 focus:ring-2 focus:ring-primary/10"
                    onChange={(event) =>
                      setBuyer((prev) => ({ ...prev, registrationType: event.target.value }))
                    }
                    value={buyer.registrationType ?? 'Registered'}
                  >
                    <option>Registered</option>
                    <option>Unregistered</option>
                  </select>
                </label>
                <label className="md:col-span-2">
                  <span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Buyer Address
                  </span>
                  <textarea
                    className="h-24 w-full rounded-xl border border-outline-variant/30 bg-white px-3 py-2.5 text-sm font-semibold text-primary outline-none focus:border-primary/30 focus:ring-2 focus:ring-primary/10"
                    onChange={(event) => setBuyer((prev) => ({ ...prev, address: event.target.value }))}
                    value={buyer.address}
                  />
                </label>
              </div>
            </article>
          </section>

          <section className="rounded-2xl border border-outline-variant/20 bg-surface-container-lowest p-5 shadow-[0_8px_28px_rgba(3,14,68,0.05)] md:p-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <label>
                <span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Invoice Refno
                </span>
                <textarea
                  className="h-24 w-full rounded-xl border border-outline-variant/30 bg-white px-3 py-2.5 text-sm font-semibold text-primary outline-none focus:border-primary/30 focus:ring-2 focus:ring-primary/10"
                  onChange={(event) =>
                    setInvoiceHeader((prev) => ({ ...prev, invoiceRefNo: event.target.value }))
                  }
                  value={invoiceHeader.invoiceRefNo}
                />
              </label>

              <label>
                <span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Remarks
                </span>
                <textarea
                  className="h-24 w-full rounded-xl border border-outline-variant/30 bg-white px-3 py-2.5 text-sm font-semibold text-primary outline-none focus:border-primary/30 focus:ring-2 focus:ring-primary/10"
                  onChange={(event) => setInvoiceHeader((prev) => ({ ...prev, remarks: event.target.value }))}
                  value={invoiceHeader.remarks}
                />
              </label>
            </div>
          </section>

          <section className="rounded-2xl border border-outline-variant/20 bg-surface-container-lowest p-5 shadow-[0_8px_28px_rgba(3,14,68,0.05)] md:p-6">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <h3 className="font-headline text-lg font-extrabold text-primary">Invoice Detail</h3>

              <button
                className="inline-flex items-center gap-2 rounded-xl border border-primary/25 bg-white px-4 py-2 text-xs font-semibold text-primary transition-colors hover:bg-surface-container-low"
                onClick={() => setShowItemDialog(true)}
                type="button"
              >
                <span className="material-symbols-outlined text-base">add</span>
                Add Item Information
              </button>
            </div>

            {items.length === 0 ? (
              <div className="rounded-xl border border-dashed border-outline-variant/40 bg-surface-container-low px-6 py-10 text-center">
                <span className="material-symbols-outlined text-3xl text-slate-400">receipt_long</span>
                <p className="mt-3 text-sm font-semibold text-primary">No line items added yet</p>
                <p className="mt-1 text-xs text-on-surface-variant">
                  Add at least one item to compute invoice totals and proceed to posting.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-outline-variant/15">
                <table className="min-w-[920px] w-full border-collapse text-left">
                  <thead className="bg-surface-container-low">
                    <tr>
                      <th className="px-4 py-3 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">
                        Product
                      </th>
                      <th className="px-4 py-3 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">
                        HS Code
                      </th>
                      <th className="px-4 py-3 text-right text-[10px] font-black uppercase tracking-widest text-on-surface-variant">
                        Qty
                      </th>
                      <th className="px-4 py-3 text-right text-[10px] font-black uppercase tracking-widest text-on-surface-variant">
                        Unit Price
                      </th>
                      <th className="px-4 py-3 text-right text-[10px] font-black uppercase tracking-widest text-on-surface-variant">
                        Tax
                      </th>
                      <th className="px-4 py-3 text-right text-[10px] font-black uppercase tracking-widest text-on-surface-variant">
                        Line Total
                      </th>
                      <th className="px-4 py-3 text-center text-[10px] font-black uppercase tracking-widest text-on-surface-variant">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr className="border-t border-outline-variant/10" key={item.id}>
                        <td className="px-4 py-3 text-sm font-bold text-primary">{item.description}</td>
                        <td className="px-4 py-3 text-sm font-semibold text-on-surface-variant">{item.hsCode}</td>
                        <td className="px-4 py-3 text-right text-sm font-semibold text-on-surface-variant">
                          {item.quantity}
                        </td>
                        <td className="px-4 py-3 text-right text-sm font-semibold text-on-surface-variant">
                          {formatMoney(item.unitPrice)}
                        </td>
                        <td className="px-4 py-3 text-right text-sm font-semibold text-on-surface-variant">
                          {formatMoney(item.salesTaxApplicable)}
                        </td>
                        <td className="px-4 py-3 text-right text-sm font-bold text-primary">
                          {formatMoney(item.lineTotal)}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <button
                            className="rounded-lg border border-error/25 bg-error-container px-3 py-1.5 text-xs font-semibold text-error transition-colors hover:bg-error hover:text-white"
                            onClick={() => removeItem(item.id)}
                            type="button"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>

        <aside className="h-fit space-y-4 xl:sticky xl:top-24">
          <section className="rounded-2xl border border-outline-variant/20 bg-surface-container-lowest p-5 shadow-[0_8px_28px_rgba(3,14,68,0.05)]">
            <h3 className="font-headline text-lg font-extrabold text-primary">Invoice Summary</h3>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between text-on-surface-variant">
                <span>Items</span>
                <span className="font-bold text-primary">{items.length}</span>
              </div>
              <div className="flex items-center justify-between text-on-surface-variant">
                <span>Subtotal</span>
                <span className="font-bold text-primary">{formatMoney(totals.subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-on-surface-variant">
                <span>Sales Tax</span>
                <span className="font-bold text-primary">{formatMoney(totals.salesTax)}</span>
              </div>
              <div className="flex items-center justify-between text-on-surface-variant">
                <span>Other Taxes</span>
                <span className="font-bold text-primary">{formatMoney(totals.extras)}</span>
              </div>
              <div className="flex items-center justify-between text-on-surface-variant">
                <span>Discount</span>
                <span className="font-bold text-primary">-{formatMoney(totals.discount)}</span>
              </div>
              <div className="border-t border-outline-variant/20 pt-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-widest text-slate-400">Grand Total</span>
                  <span className="text-lg font-black text-primary">{formatMoney(totals.grandTotal)}</span>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-outline-variant/20 bg-surface-container-lowest p-5 shadow-[0_8px_28px_rgba(3,14,68,0.05)]">
            <div className="space-y-2">
              <button
                className="w-full rounded-xl border border-outline-variant/30 bg-white px-4 py-2.5 text-sm font-bold text-on-surface-variant transition-colors hover:bg-surface-container-low"
                onClick={resetInvoice}
                type="button"
              >
                Cancel
              </button>
              <button
                className="w-full rounded-xl border border-fintech-accent/50 bg-fintech-accent/20 px-4 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-fintech-accent/30"
                type="button"
              >
                Post Invoice
              </button>
              <button
                className="w-full rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white shadow-[0_8px_24px_rgba(3,14,68,0.18)] transition-all hover:opacity-90"
                type="button"
              >
                Apply Changes
              </button>
            </div>
          </section>
        </aside>
      </div>

      {showItemDialog && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-primary/20 px-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-2xl border border-outline-variant/30 bg-white shadow-[0_30px_90px_rgba(3,14,68,0.35)]">
            <div className="flex items-center justify-between border-b border-outline-variant/15 px-5 py-4">
              <h3 className="font-headline text-xl font-extrabold text-primary">Item Information</h3>
              <button
                aria-label="Close item dialog"
                className="rounded-lg border border-outline-variant/30 p-1.5 text-on-surface-variant hover:bg-surface-container-low"
                onClick={() => setShowItemDialog(false)}
                type="button"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>

            <div className="space-y-4 px-5 py-5">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
                <label className="md:col-span-2">
                  <span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Product
                  </span>
                  <select
                    className="w-full rounded-xl border border-outline-variant/30 bg-white px-3 py-2.5 text-sm font-semibold text-primary outline-none focus:border-primary/30 focus:ring-2 focus:ring-primary/10"
                    onChange={(event) => onProductSelect(event.target.value)}
                    value={itemDraft.product}
                  >
                    <option value="">--SELECT--</option>
                    {productCatalog.map((product) => (
                      <option key={product.label} value={product.label}>
                        {product.label} - {product.hsCode}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  <span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-400">
                    HS Code
                  </span>
                  <input
                    className="w-full rounded-xl border border-outline-variant/30 bg-surface-container-low px-3 py-2.5 text-sm font-semibold text-primary outline-none"
                    readOnly
                    value={itemDraft.hsCode}
                  />
                </label>
                <label>
                  <span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-400">
                    UOM
                  </span>
                  <input
                    className="w-full rounded-xl border border-outline-variant/30 bg-surface-container-low px-3 py-2.5 text-sm font-semibold text-primary outline-none"
                    readOnly
                    value={itemDraft.uom}
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
                <label className="md:col-span-2">
                  <span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Product Description
                  </span>
                  <input
                    className="w-full rounded-xl border border-outline-variant/30 bg-surface-container-low px-3 py-2.5 text-sm font-semibold text-primary outline-none"
                    readOnly
                    value={itemDraft.description}
                  />
                </label>

                <label>
                  <span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Sale Type
                  </span>
                  <select
                    className="w-full rounded-xl border border-outline-variant/30 bg-white px-3 py-2.5 text-sm font-semibold text-primary outline-none focus:border-primary/30 focus:ring-2 focus:ring-primary/10"
                    onChange={(event) =>
                      setItemDraft((prev) => ({ ...prev, saleType: event.target.value }))
                    }
                    value={itemDraft.saleType}
                  >
                    <option>Goods at standard rate (default)</option>
                    <option>Goods at reduced rate</option>
                    <option>Exempt supply</option>
                  </select>
                </label>

                <label>
                  <span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Rate
                  </span>
                  <select
                    className="w-full rounded-xl border border-outline-variant/30 bg-white px-3 py-2.5 text-sm font-semibold text-primary outline-none focus:border-primary/30 focus:ring-2 focus:ring-primary/10"
                    onChange={(event) =>
                      setItemDraft((prev) => ({ ...prev, rateLabel: event.target.value }))
                    }
                    value={itemDraft.rateLabel}
                  >
                    <option>18%</option>
                    <option>17%</option>
                    <option>16%</option>
                    <option>0%</option>
                  </select>
                </label>
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
                <label>
                  <span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Quantity
                  </span>
                  <input
                    className="w-full rounded-xl border border-outline-variant/30 bg-white px-3 py-2.5 text-sm font-semibold text-primary outline-none focus:border-primary/30 focus:ring-2 focus:ring-primary/10"
                    min={1}
                    onChange={(event) =>
                      setItemDraft((prev) => ({ ...prev, quantity: Number(event.target.value) || 0 }))
                    }
                    type="number"
                    value={itemDraft.quantity}
                  />
                </label>
                <label>
                  <span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Unit Price
                  </span>
                  <input
                    className="w-full rounded-xl border border-outline-variant/30 bg-white px-3 py-2.5 text-sm font-semibold text-primary outline-none focus:border-primary/30 focus:ring-2 focus:ring-primary/10"
                    min={0}
                    onChange={(event) =>
                      setItemDraft((prev) => ({ ...prev, unitPrice: Number(event.target.value) || 0 }))
                    }
                    type="number"
                    value={itemDraft.unitPrice}
                  />
                </label>
                <label>
                  <span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Value Sales Excluding ST
                  </span>
                  <input
                    className="w-full rounded-xl border border-outline-variant/30 bg-surface-container-low px-3 py-2.5 text-sm font-semibold text-primary outline-none"
                    readOnly
                    value={formatMoney(draftCalculated.valueExcludingST)}
                  />
                </label>
                <label>
                  <span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Sales Tax Applicable
                  </span>
                  <input
                    className="w-full rounded-xl border border-outline-variant/30 bg-surface-container-low px-3 py-2.5 text-sm font-semibold text-primary outline-none"
                    readOnly
                    value={formatMoney(draftCalculated.salesTaxApplicable)}
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-5">
                <label>
                  <span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Fixed Notified Value
                  </span>
                  <input
                    className="w-full rounded-xl border border-outline-variant/30 bg-white px-3 py-2.5 text-sm font-semibold text-primary outline-none focus:border-primary/30 focus:ring-2 focus:ring-primary/10"
                    min={0}
                    onChange={(event) =>
                      setItemDraft((prev) => ({ ...prev, fixedNotifiedValue: Number(event.target.value) || 0 }))
                    }
                    type="number"
                    value={itemDraft.fixedNotifiedValue}
                  />
                </label>
                <label>
                  <span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Sales Tax Withheld
                  </span>
                  <input
                    className="w-full rounded-xl border border-outline-variant/30 bg-white px-3 py-2.5 text-sm font-semibold text-primary outline-none focus:border-primary/30 focus:ring-2 focus:ring-primary/10"
                    min={0}
                    onChange={(event) =>
                      setItemDraft((prev) => ({ ...prev, withholdingTax: Number(event.target.value) || 0 }))
                    }
                    type="number"
                    value={itemDraft.withholdingTax}
                  />
                </label>
                <label>
                  <span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Extra Tax
                  </span>
                  <input
                    className="w-full rounded-xl border border-outline-variant/30 bg-white px-3 py-2.5 text-sm font-semibold text-primary outline-none focus:border-primary/30 focus:ring-2 focus:ring-primary/10"
                    min={0}
                    onChange={(event) =>
                      setItemDraft((prev) => ({ ...prev, extraTax: Number(event.target.value) || 0 }))
                    }
                    type="number"
                    value={itemDraft.extraTax}
                  />
                </label>
                <label>
                  <span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Further Tax
                  </span>
                  <input
                    className="w-full rounded-xl border border-outline-variant/30 bg-white px-3 py-2.5 text-sm font-semibold text-primary outline-none focus:border-primary/30 focus:ring-2 focus:ring-primary/10"
                    min={0}
                    onChange={(event) =>
                      setItemDraft((prev) => ({ ...prev, furtherTax: Number(event.target.value) || 0 }))
                    }
                    type="number"
                    value={itemDraft.furtherTax}
                  />
                </label>
                <label>
                  <span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-400">
                    FED Payable
                  </span>
                  <input
                    className="w-full rounded-xl border border-outline-variant/30 bg-white px-3 py-2.5 text-sm font-semibold text-primary outline-none focus:border-primary/30 focus:ring-2 focus:ring-primary/10"
                    min={0}
                    onChange={(event) =>
                      setItemDraft((prev) => ({ ...prev, fedPayable: Number(event.target.value) || 0 }))
                    }
                    type="number"
                    value={itemDraft.fedPayable}
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
                <label>
                  <span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Discount
                  </span>
                  <input
                    className="w-full rounded-xl border border-outline-variant/30 bg-white px-3 py-2.5 text-sm font-semibold text-primary outline-none focus:border-primary/30 focus:ring-2 focus:ring-primary/10"
                    min={0}
                    onChange={(event) =>
                      setItemDraft((prev) => ({ ...prev, discount: Number(event.target.value) || 0 }))
                    }
                    type="number"
                    value={itemDraft.discount}
                  />
                </label>
                <label>
                  <span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-400">
                    SRO Schedule No.
                  </span>
                  <input
                    className="w-full rounded-xl border border-outline-variant/30 bg-white px-3 py-2.5 text-sm font-semibold text-primary outline-none focus:border-primary/30 focus:ring-2 focus:ring-primary/10"
                    onChange={(event) =>
                      setItemDraft((prev) => ({ ...prev, sroScheduleNo: event.target.value }))
                    }
                    value={itemDraft.sroScheduleNo}
                  />
                </label>
                <label>
                  <span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-400">
                    SRO Item Serial No.
                  </span>
                  <input
                    className="w-full rounded-xl border border-outline-variant/30 bg-white px-3 py-2.5 text-sm font-semibold text-primary outline-none focus:border-primary/30 focus:ring-2 focus:ring-primary/10"
                    onChange={(event) =>
                      setItemDraft((prev) => ({ ...prev, sroItemSerialNo: event.target.value }))
                    }
                    value={itemDraft.sroItemSerialNo}
                  />
                </label>
                <div className="rounded-xl border border-fintech-accent/40 bg-fintech-accent/20 px-3 py-3 text-right">
                  <p className="text-[10px] font-black uppercase tracking-widest text-primary/70">Line Total</p>
                  <p className="mt-1 text-lg font-black text-primary">{formatMoney(draftCalculated.total)}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-outline-variant/15 px-5 py-4">
              <button
                className="rounded-xl border border-outline-variant/30 bg-white px-4 py-2 text-sm font-semibold text-on-surface-variant transition-colors hover:bg-surface-container-low"
                onClick={() => setShowItemDialog(false)}
                type="button"
              >
                Close
              </button>
              <button
                className="inline-flex items-center gap-2 rounded-xl border border-primary/30 bg-white px-4 py-2 text-sm font-bold text-primary transition-all hover:bg-primary hover:text-white"
                onClick={addItemToInvoice}
                type="button"
              >
                <span className="material-symbols-outlined text-base">add_circle</span>
                Add Item Detail
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}