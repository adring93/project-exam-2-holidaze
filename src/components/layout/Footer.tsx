import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <Link to="/" className="inline-flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-lg font-semibold text-slate-950">
              H
            </div>

            <div>
              <p className="text-xl font-semibold tracking-tight">Holidaze</p>
              <p className="text-sm text-slate-400">Stay somewhere memorable</p>
            </div>
          </Link>

          <p className="mt-5 max-w-sm text-sm leading-6 text-slate-400">
            Discover unique stays, plan your next getaway, and manage beautiful
            venues in one simple booking experience.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
            Explore
          </h2>

          <div className="mt-5 flex flex-col gap-3 text-sm">
            <Link to="/" className="text-slate-300 transition hover:text-white">
              Venues
            </Link>
            <Link
              to="/login"
              className="text-slate-300 transition hover:text-white"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-slate-300 transition hover:text-white"
            >
              Register
            </Link>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
            Project
          </h2>

          <div className="mt-5 flex flex-col gap-3 text-sm text-slate-300">
            <p>Noroff Project Exam 2</p>
            <p>Built with React and TypeScript</p>
            <p>Powered by the Holidaze API</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-5 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Holidaze. All rights reserved.</p>
          <p>Designed and developed by Adrian Ingvartsen.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer