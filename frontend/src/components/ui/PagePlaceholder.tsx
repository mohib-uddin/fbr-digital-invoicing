type PagePlaceholderProps = {
  title: string
}

export default function PagePlaceholder({ title }: PagePlaceholderProps) {
  return (
    <div className="mx-auto max-w-[1600px] p-8">
      <section className="rounded-lg bg-surface-container-lowest p-8 shadow-[0_12px_40px_rgba(3,14,68,0.04)]">
        <h1 className="font-headline text-2xl font-black tracking-tight text-primary">{title}</h1>
        <p className="mt-2 text-sm text-on-surface-variant">
          This section is reserved in routing and can be implemented next.
        </p>
      </section>
    </div>
  )
}
