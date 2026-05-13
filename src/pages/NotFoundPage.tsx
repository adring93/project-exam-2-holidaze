import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-10rem)] max-w-7xl items-center px-6 py-16">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
          404
        </p>

        <h1 className="mt-4 text-5xl font-bold tracking-tight text-slate-950 sm:text-6xl">
          This stay could not be found.
        </h1>

        <p className="mt-6 text-lg leading-8 text-slate-600">
          The page you are looking for may have been moved, deleted, or never
          existed. You can return to the venue list and continue exploring
          Holidaze.
        </p>

        <Link
          to="/"
          className="mt-8 inline-flex rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Back to venues
        </Link>
      </div>
    </section>
  )
}

export default NotFoundPage