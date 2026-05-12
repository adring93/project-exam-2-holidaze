import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { loginUser } from '../services/auth'

function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const response = await loginUser({ email, password })
      login(response.data)
      navigate('/')
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Could not log in with those details',
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="mx-auto grid min-h-[calc(100vh-10rem)] max-w-7xl items-center px-6 py-16 lg:grid-cols-2 lg:gap-16">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
          Welcome back
        </p>

        <h1 className="mt-4 max-w-xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
          Log in and continue your Holidaze journey.
        </h1>

        <p className="mt-5 max-w-lg text-lg leading-8 text-slate-600">
          Access your bookings, update your profile, or manage venues if you are
          registered as a venue manager.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm lg:mt-0"
      >
        <div className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-slate-700"
            >
              Stud email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-950"
              placeholder="name@stud.noroff.no"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-slate-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-950"
              placeholder="Your password"
            />
          </div>

          {error && (
            <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? 'Logging in...' : 'Log in'}
          </button>

          <p className="text-center text-sm text-slate-500">
            No account yet?{' '}
            <Link
              to="/register"
              className="font-medium text-slate-950 hover:underline"
            >
              Create one
            </Link>
          </p>
        </div>
      </form>
    </section>
  )
}

export default LoginPage