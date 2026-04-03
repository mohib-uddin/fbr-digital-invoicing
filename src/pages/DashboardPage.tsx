import ClientDistributionChart from '../components/modules/dashboard/ClientDistributionChart'
import RevenueTrendChart from '../components/modules/dashboard/RevenueTrendChart'

export default function DashboardPage() {
  return (
    <>
      <div className="mx-auto max-w-[1600px] space-y-8 p-8">
        <section className="font-body flex flex-wrap items-center gap-6 rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-4 shadow-[0_12px_40px_rgba(3,14,68,0.04)]">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-tighter text-slate-400">Filters:</span>
          </div>

          <div className="flex flex-1 items-center gap-4">
            <div className="relative">
              <select className="cursor-pointer appearance-none rounded-lg border border-outline-variant/40 bg-white py-2 pl-4 pr-10 text-sm font-semibold text-primary shadow-sm focus:border-primary/30 focus:ring-2 focus:ring-primary/10">
                <option>Date Range: Last 30 Days</option>
                <option>Date Range: Q3 2023</option>
                <option>Date Range: Year to Date</option>
              </select>
              <span className="material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                calendar_month
              </span>
            </div>

            <div className="relative">
              <select className="cursor-pointer appearance-none rounded-lg border border-outline-variant/40 bg-white py-2 pl-4 pr-10 text-sm font-semibold text-primary shadow-sm focus:border-primary/30 focus:ring-2 focus:ring-primary/10">
                <option>Company: All Entities</option>
                <option>Sovereign Global Inc.</option>
                <option>Ledger Tech Ltd.</option>
              </select>
              <span className="material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                corporate_fare
              </span>
            </div>

            <div className="relative">
              <select className="cursor-pointer appearance-none rounded-lg border border-outline-variant/40 bg-white py-2 pl-4 pr-10 text-sm font-semibold text-primary shadow-sm focus:border-primary/30 focus:ring-2 focus:ring-primary/10">
                <option>Product Category: All</option>
                <option>Enterprise SaaS</option>
                <option>Financial Consulting</option>
              </select>
              <span className="material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                inventory_2
              </span>
            </div>
          </div>

          <button className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2 text-xs font-bold text-white transition-all hover:opacity-90">
            <span className="material-symbols-outlined text-sm">filter_list</span>
            Apply View
          </button>
        </section>

        <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="group relative overflow-hidden rounded-lg bg-surface-container-lowest p-6 shadow-[0_12px_40px_rgba(3,14,68,0.04)]">
            <div className="mb-4 flex items-start justify-between">
              <div className="rounded-lg bg-slate-100 p-2 text-primary">
                <span className="material-symbols-outlined">description</span>
              </div>
              <span className="flex items-center gap-1 text-[10px] font-bold text-secondary">
                <span className="material-symbols-outlined text-xs">trending_up</span>
                +12.4%
              </span>
            </div>
            <p className="mb-1 text-xs font-medium text-on-surface-variant">Total Invoices</p>
            <h3 className="font-headline text-2xl font-black tracking-tight text-primary">14,284</h3>
            <div className="absolute -bottom-2 -right-2 scale-150 opacity-5">
              <span className="material-symbols-outlined text-8xl">description</span>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-lg bg-surface-container-lowest p-6 shadow-[0_12px_40px_rgba(3,14,68,0.04)]">
            <div className="mb-4 flex items-start justify-between">
              <div className="rounded-lg bg-slate-100 p-2 text-primary">
                <span className="material-symbols-outlined">payments</span>
              </div>
              <span className="flex items-center gap-1 text-[10px] font-bold text-secondary">
                <span className="material-symbols-outlined text-xs">trending_up</span>
                +8.2%
              </span>
            </div>
            <p className="mb-1 text-xs font-medium text-on-surface-variant">Total Revenue</p>
            <h3 className="font-headline text-2xl font-black tracking-tight text-primary">$8.42M</h3>
            <div className="absolute -bottom-2 -right-2 scale-150 opacity-5">
              <span className="material-symbols-outlined text-8xl">payments</span>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-lg bg-surface-container-lowest p-6 shadow-[0_12px_40px_rgba(3,14,68,0.04)]">
            <div className="mb-4 flex items-start justify-between">
              <div className="rounded-lg bg-secondary-container p-2 text-on-secondary-container">
                <span className="material-symbols-outlined">verified_user</span>
              </div>
              <span className="rounded-full bg-secondary-container/30 px-2 py-0.5 text-[10px] font-bold text-secondary">
                Target Met
              </span>
            </div>
            <p className="mb-1 text-xs font-medium text-on-surface-variant">Compliance Rate</p>
            <h3 className="font-headline text-2xl font-black tracking-tight text-secondary">99.8%</h3>
            <div className="absolute -bottom-2 -right-2 scale-150 opacity-5">
              <span className="material-symbols-outlined text-8xl text-secondary">verified_user</span>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-lg bg-surface-container-lowest p-6 shadow-[0_12px_40px_rgba(3,14,68,0.04)]">
            <div className="mb-4 flex items-start justify-between">
              <div className="rounded-lg bg-error-container p-2 text-on-error-container">
                <span className="material-symbols-outlined">cancel</span>
              </div>
              <span className="flex items-center gap-1 text-[10px] font-bold text-error">
                <span className="material-symbols-outlined text-xs">trending_down</span>
                -2.1%
              </span>
            </div>
            <p className="mb-1 text-xs font-medium text-on-surface-variant">Void Invoices</p>
            <h3 className="font-headline text-2xl font-black tracking-tight text-primary">42</h3>
            <div className="absolute -bottom-2 -right-2 scale-150 opacity-5">
              <span className="material-symbols-outlined text-8xl text-error">cancel</span>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="font-headline text-sm font-bold uppercase tracking-widest text-primary">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <button className="group flex scale-100 items-center gap-4 rounded-lg bg-primary p-5 text-left shadow-[0_12px_30px_rgba(3,14,68,0.15)] transition-all hover:shadow-[0_12px_40px_rgba(93,253,197,0.1)] active:scale-[0.98]">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/10 text-fintech-accent transition-transform group-hover:scale-110">
                <span className="material-symbols-outlined text-2xl">add_notes</span>
              </div>
              <div>
                <p className="font-headline text-sm font-bold text-white">Create Invoice</p>
                <p className="text-[10px] font-medium text-white/50 transition-colors group-hover:text-fintech-accent">
                  Draft a new billing entity
                </p>
              </div>
            </button>
            <button className="group flex scale-100 items-center gap-4 rounded-lg bg-primary p-5 text-left shadow-[0_12px_30px_rgba(3,14,68,0.15)] transition-all hover:shadow-[0_12px_40px_rgba(93,253,197,0.1)] active:scale-[0.98]">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/10 text-fintech-accent transition-transform group-hover:scale-110">
                <span className="material-symbols-outlined text-2xl">person_add</span>
              </div>
              <div>
                <p className="font-headline text-sm font-bold text-white">Add Customer</p>
                <p className="text-[10px] font-medium text-white/50 transition-colors group-hover:text-fintech-accent">
                  Register new client record
                </p>
              </div>
            </button>
            <button className="group flex scale-100 items-center gap-4 rounded-lg bg-primary p-5 text-left shadow-[0_12px_30px_rgba(3,14,68,0.15)] transition-all hover:shadow-[0_12px_40px_rgba(93,253,197,0.1)] active:scale-[0.98]">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/10 text-fintech-accent transition-transform group-hover:scale-110">
                <span className="material-symbols-outlined text-2xl">category</span>
              </div>
              <div>
                <p className="font-headline text-sm font-bold text-white">Create Product</p>
                <p className="text-[10px] font-medium text-white/50 transition-colors group-hover:text-fintech-accent">
                  Define new service SKU
                </p>
              </div>
            </button>
          </div>
        </section>

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 rounded-lg bg-surface-container-lowest p-8 shadow-[0_12px_40px_rgba(3,14,68,0.04)] lg:col-span-8">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="font-headline text-xl font-bold tracking-tight text-primary">Revenue Trend</h2>
                <p className="mt-1 text-xs text-on-surface-variant">Institutional revenue performance across fiscal periods.</p>
              </div>
              <div className="flex items-center rounded-lg bg-slate-50 p-1">
                <button className="px-4 py-1.5 text-xs font-bold text-slate-500 transition-all hover:text-primary">Monthly</button>
                <button className="rounded bg-white px-4 py-1.5 text-xs font-bold text-primary shadow-sm">Yearly</button>
              </div>
            </div>
            <RevenueTrendChart />
          </div>

          <div className="col-span-12 flex flex-col rounded-lg bg-surface-container-lowest p-8 shadow-[0_12px_40px_rgba(3,14,68,0.04)] lg:col-span-4">
            <h2 className="font-headline mb-8 text-xl font-bold tracking-tight text-primary">Client Distribution</h2>
            <div className="relative flex flex-1 flex-col items-center justify-center">
              <ClientDistributionChart />
            </div>
            <div className="mt-8 space-y-4">
              <div className="group flex cursor-default items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-primary/5"></span>
                  <span className="font-body text-xs font-semibold text-on-surface-variant transition-colors group-hover:text-primary">Strategic Accounts</span>
                </div>
                <span className="font-label text-xs font-black text-primary">60%</span>
              </div>
              <div className="group flex cursor-default items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-fintech-accent ring-4 ring-fintech-accent/5"></span>
                  <span className="font-body text-xs font-semibold text-on-surface-variant transition-colors group-hover:text-primary">Growth Partners</span>
                </div>
                <span className="font-label text-xs font-black text-primary">25%</span>
              </div>
              <div className="group flex cursor-default items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-primary-fixed-dim ring-4 ring-primary-fixed-dim/5"></span>
                  <span className="font-body text-xs font-semibold text-on-surface-variant transition-colors group-hover:text-primary">Other Entities</span>
                </div>
                <span className="font-label text-xs font-black text-primary">15%</span>
              </div>
            </div>
          </div>

          <div className="col-span-12 rounded-lg bg-surface-container-lowest p-8 shadow-[0_12px_40px_rgba(3,14,68,0.04)] lg:col-span-6">
            <div className="mb-10 flex items-center justify-between">
              <h2 className="font-headline text-xl font-bold tracking-tight text-primary">Product Performance</h2>
              <button className="font-label flex items-center gap-1 text-xs font-bold text-primary hover:underline">
                View Detailed Metrics
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
            <div className="space-y-7">
              <div className="group">
                <div className="mb-2.5 flex items-end justify-between">
                  <span className="font-body text-xs font-bold text-primary">Enterprise Cloud Ledger</span>
                  <span className="font-label text-xs font-black text-primary">$4.2M</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-50">
                  <div className="h-full w-[85%] rounded-full bg-primary transition-all group-hover:bg-primary/90"></div>
                </div>
              </div>
              <div className="group">
                <div className="mb-2.5 flex items-end justify-between">
                  <span className="font-body text-xs font-bold text-primary">Compliance API Suite</span>
                  <span className="font-label text-xs font-black text-primary">$2.1M</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-50">
                  <div className="h-full w-[62%] rounded-full bg-fintech-accent transition-all group-hover:opacity-90"></div>
                </div>
              </div>
              <div className="group">
                <div className="mb-2.5 flex items-end justify-between">
                  <span className="font-body text-xs font-bold text-primary">Real-time Auditing Module</span>
                  <span className="font-label text-xs font-black text-primary">$1.4M</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-50">
                  <div className="h-full w-[45%] rounded-full bg-primary/40 transition-all group-hover:bg-primary/60"></div>
                </div>
              </div>
              <div className="group">
                <div className="mb-2.5 flex items-end justify-between">
                  <span className="font-body text-xs font-bold text-primary">Whitelabel Gateway</span>
                  <span className="font-label text-xs font-black text-primary">$0.7M</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-50">
                  <div className="h-full w-[22%] rounded-full bg-primary/20 transition-all group-hover:bg-primary/30"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-12 rounded-lg bg-surface-container-lowest p-8 shadow-[0_12px_40px_rgba(3,14,68,0.04)] lg:col-span-6">
            <h2 className="font-headline mb-8 text-xl font-bold tracking-tight text-primary">Executive Client Portfolio</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-separate border-spacing-y-3">
                <thead className="bg-surface-container-high/20">
                  <tr>
                    <th className="font-label rounded-l-lg px-4 py-3 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Client Name</th>
                    <th className="font-label px-4 py-3 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Invoices</th>
                    <th className="font-label rounded-r-lg px-4 py-3 text-right text-[10px] font-black uppercase tracking-widest text-slate-400">Total Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="group cursor-pointer transition-all hover:bg-slate-50">
                    <td className="rounded-l-lg border-b border-transparent px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="font-label flex h-8 w-8 items-center justify-center rounded bg-primary-container text-xs font-black text-on-primary-container">NV</div>
                        <div>
                          <p className="font-body text-xs font-bold text-primary">Nova Venture Capital</p>
                          <p className="text-[10px] font-medium text-slate-400">Institutional Tech</p>
                        </div>
                      </div>
                    </td>
                    <td className="border-b border-transparent px-4 py-3"><span className="font-body text-xs font-semibold text-on-surface-variant">1,204</span></td>
                    <td className="font-label rounded-r-lg border-b border-transparent px-4 py-3 text-right text-xs font-black text-primary">$1,452,000</td>
                  </tr>
                  <tr className="group cursor-pointer transition-all hover:bg-slate-50">
                    <td className="rounded-l-lg px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="font-label flex h-8 w-8 items-center justify-center rounded bg-secondary-container text-xs font-black text-on-secondary-container">BH</div>
                        <div>
                          <p className="font-body text-xs font-bold text-primary">Blue Horizon Logistics</p>
                          <p className="text-[10px] font-medium text-slate-400">Logistics &amp; Supply</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3"><span className="font-body text-xs font-semibold text-on-surface-variant">845</span></td>
                    <td className="font-label rounded-r-lg px-4 py-3 text-right text-xs font-black text-primary">$982,500</td>
                  </tr>
                  <tr className="group cursor-pointer transition-all hover:bg-slate-50">
                    <td className="rounded-l-lg px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="font-label flex h-8 w-8 items-center justify-center rounded bg-surface-container text-xs font-black text-slate-500">AS</div>
                        <div>
                          <p className="font-body text-xs font-bold text-primary">Apex Solutions</p>
                          <p className="text-[10px] font-medium text-slate-400">SaaS Services</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3"><span className="font-body text-xs font-semibold text-on-surface-variant">612</span></td>
                    <td className="font-label rounded-r-lg px-4 py-3 text-right text-xs font-black text-primary">$745,200</td>
                  </tr>
                  <tr className="group cursor-pointer transition-all hover:bg-slate-50">
                    <td className="rounded-l-lg px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="font-label flex h-8 w-8 items-center justify-center rounded bg-primary text-xs font-black text-white">GL</div>
                        <div>
                          <p className="font-body text-xs font-bold text-primary">Global Ledger Partners</p>
                          <p className="text-[10px] font-medium text-slate-400">Private Equity</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3"><span className="font-body text-xs font-semibold text-on-surface-variant">428</span></td>
                    <td className="font-label rounded-r-lg px-4 py-3 text-right text-xs font-black text-primary">$512,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-slate-100 px-8 py-10 md:flex-row">
        <div className="flex items-center gap-3 grayscale opacity-40">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-primary text-[10px] text-white">
            <span className="material-symbols-outlined text-xs">account_balance</span>
          </div>
          <p className="text-xs font-bold tracking-tighter text-primary">Sovereign Ledger</p>
        </div>

        <div className="flex gap-8">
          <a className="text-[10px] font-bold uppercase tracking-widest text-slate-400 transition-colors hover:text-primary" href="#">Compliance Engine</a>
          <a className="text-[10px] font-bold uppercase tracking-widest text-slate-400 transition-colors hover:text-primary" href="#">Privacy Policy</a>
          <a className="text-[10px] font-bold uppercase tracking-widest text-slate-400 transition-colors hover:text-primary" href="#">System Status</a>
        </div>

        <p className="text-[10px] font-medium text-slate-400">© 2024 Sovereign Ledger Enterprise Inc. All rights reserved.</p>
      </footer>
    </>
  )
}
