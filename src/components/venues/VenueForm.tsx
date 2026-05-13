import type { FormEvent, ReactNode } from 'react'

type VenueFormProps = {
  title: string
  description: string
  isLoading?: boolean
  error?: string
  submitLabel: string
  loadingLabel: string
  children: ReactNode
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

function VenueForm({
  title,
  description,
  isLoading = false,
  error,
  submitLabel,
  loadingLabel,
  children,
  onSubmit,
}: VenueFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm"
    >
      <div>
        <h2 className="text-2xl font-semibold text-slate-950">{title}</h2>
        <p className="mt-2 text-slate-600">{description}</p>
      </div>

      <div className="mt-6 grid gap-5">{children}</div>

      {error && (
        <p className="mt-5 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="mt-6 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? loadingLabel : submitLabel}
      </button>
    </form>
  )
}

export default VenueForm