import { Link } from 'react-router-dom'

type EmptyStateProps = {
  title: string
  message: string
  actionLabel?: string
  actionTo?: string
}

function EmptyState({
  title,
  message,
  actionLabel,
  actionTo,
}: EmptyStateProps) {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-semibold text-slate-950">{title}</h2>

      <p className="mt-3 text-slate-600">{message}</p>

      {actionLabel && actionTo && (
        <Link
          to={actionTo}
          className="mt-6 inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  )
}

export default EmptyState