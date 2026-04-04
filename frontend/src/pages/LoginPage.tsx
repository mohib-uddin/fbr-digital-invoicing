import { Link } from 'react-router-dom'

export default function LoginPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background font-body text-on-surface">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl"></div>
        <div className="absolute -right-24 top-20 h-80 w-80 rounded-full bg-fintech-accent/20 blur-3xl"></div>
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-primary-fixed/30 blur-3xl"></div>
      </div>

      <div className="relative z-10 mx-auto grid min-h-screen max-w-[1440px] grid-cols-1 items-center gap-12 px-6 py-10 lg:grid-cols-2 lg:px-12">
        <section className="space-y-8">
          <div className="inline-flex items-center gap-3 rounded-full border border-outline-variant/30 bg-white/80 px-4 py-2 backdrop-blur">
            <span className="material-symbols-outlined text-primary">verified_user</span>
            <span className="text-xs font-bold uppercase tracking-widest text-primary">
              Sovereign Enterprise Ledger
            </span>
          </div>

          <div className="space-y-4">
            <h1 className="font-headline text-4xl font-extrabold leading-tight tracking-tight text-primary lg:text-5xl">
              Secure Access For
              <br />
              Executive Operations
            </h1>
            <p className="max-w-xl text-sm leading-relaxed text-on-surface-variant">
              Sign in to access your invoicing intelligence suite, compliance analytics,
              and master data controls with enterprise-grade security.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <article className="rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-4 shadow-[0_12px_40px_rgba(3,14,68,0.04)]">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Compliance Uptime</p>
              <p className="mt-2 text-2xl font-black text-primary">99.98%</p>
            </article>
            <article className="rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-4 shadow-[0_12px_40px_rgba(3,14,68,0.04)]">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Protected Entities</p>
              <p className="mt-2 text-2xl font-black text-primary">14,284</p>
            </article>
          </div>
        </section>

        <section className="rounded-2xl border border-outline-variant/20 bg-surface-container-lowest p-8 shadow-[0_12px_40px_rgba(3,14,68,0.08)] lg:p-10">
          <div className="mb-8 space-y-1">
            <h2 className="font-headline text-2xl font-extrabold tracking-tight text-primary">Welcome Back</h2>
            <p className="text-xs text-on-surface-variant">
              Enter your corporate credentials to continue.
            </p>
          </div>

          <form className="space-y-5">
            <label className="block">
              <span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-400">
                Work Email
              </span>
              <input
                className="w-full rounded-xl border border-outline-variant/30 bg-white px-4 py-3 text-sm font-medium text-primary outline-none transition-all placeholder:text-slate-400 focus:border-primary/30 focus:ring-2 focus:ring-primary/10"
                placeholder="alexander@sovereignledger.com"
                type="email"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-400">
                Password
              </span>
              <input
                className="w-full rounded-xl border border-outline-variant/30 bg-white px-4 py-3 text-sm font-medium text-primary outline-none transition-all placeholder:text-slate-400 focus:border-primary/30 focus:ring-2 focus:ring-primary/10"
                placeholder="Enter your password"
                type="password"
              />
            </label>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 font-medium text-on-surface-variant">
                <input className="h-4 w-4 rounded border-outline-variant text-primary focus:ring-primary" type="checkbox" />
                Keep me signed in
              </label>
              <button className="font-semibold text-primary transition-colors hover:text-secondary" type="button">
                Forgot password?
              </button>
            </div>

            <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-bold text-on-primary shadow-[0_12px_30px_rgba(3,14,68,0.2)] transition-all hover:opacity-90 active:scale-[0.99]">
              <span className="material-symbols-outlined text-base">lock</span>
              Sign In Securely
            </button>

            <Link
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-fintech-accent/40 bg-fintech-accent/20 py-3 text-sm font-bold text-primary transition-all hover:bg-fintech-accent/30"
              to="/dashboard"
            >
              <span className="material-symbols-outlined text-base">insights</span>
              Continue To Dashboard
            </Link>
          </form>
        </section>
      </div>
    </div>
  )
}
