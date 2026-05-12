import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const linkStyles = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition ${
      isActive ? 'text-slate-950' : 'text-slate-600 hover:text-slate-950'
    }`

  return (
    <header className="sticky top-0 z-50 border-b border-white/60 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="group flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-lg font-semibold text-white shadow-sm transition group-hover:-translate-y-0.5">
            H
          </div>

          <div>
            <p className="text-xl font-semibold tracking-tight text-slate-950">
              Holidaze
            </p>
            <p className="text-xs text-slate-500">Stay somewhere memorable</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <NavLink to="/" className={linkStyles}>
            Venues
          </NavLink>

          <NavLink to="/login" className={linkStyles}>
            Login
          </NavLink>

          <Link
            to="/register"
            className="rounded-full bg-slate-950 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800"
          >
            Get started
          </Link>
        </nav>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 text-slate-950 transition hover:bg-slate-50 md:hidden"
        >
          <span className="sr-only">Open menu</span>
          <span className="relative block h-4 w-5">
            <span
              className={`absolute left-0 top-0 block h-0.5 w-5 bg-current transition ${
                isMenuOpen ? 'translate-y-[7px] rotate-45' : ''
              }`}
            />
            <span
              className={`absolute left-0 top-[7px] block h-0.5 w-5 bg-current transition ${
                isMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`absolute left-0 top-[14px] block h-0.5 w-5 bg-current transition ${
                isMenuOpen ? '-translate-y-[7px] -rotate-45' : ''
              }`}
            />
          </span>
        </button>
      </div>

      {isMenuOpen && (
        <nav className="border-t border-slate-200 bg-white px-6 py-5 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-4">
            <NavLink
              to="/"
              className={linkStyles}
              onClick={() => setIsMenuOpen(false)}
            >
              Venues
            </NavLink>

            <NavLink
              to="/login"
              className={linkStyles}
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </NavLink>

            <Link
              to="/register"
              onClick={() => setIsMenuOpen(false)}
              className="mt-2 rounded-full bg-slate-950 px-5 py-3 text-center text-sm font-medium text-white"
            >
              Get started
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}

export default Header