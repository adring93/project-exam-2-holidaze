import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../services/auth'

function RegisterPage() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [venueManager, setVenueManager] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      await registerUser({
        name,
        email,
        password,
        venueManager,
      })

      navigate('/login')
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Could not create your account',
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="mx-auto grid min-h-[calc(100vh-10rem)] max-w-7xl items-center px-6 py-16 lg:grid-cols-2 lg:gap-16">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
          Join Holidaze
        </p>

        <h1 className="mt-4 max-w-xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
          Create your account and start planning memorable stays.
        </h1>

        <p className="mt-5 max-w-lg text-lg leading-8 text-slate-600">
          Register as a customer to book venues, or as a venue manager to list
          and manage your own accommodation.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm lg:mt-0"
      >
        <div className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="text-sm font-medium text-slate-700"
            >
              Username
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-950"
              placeholder="adrian_ingv"
            />
          </div>

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
              pattern="^[\w.-]+@stud\.noroff\.no$"
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
              placeholder="Minimum 8 characters"
            />
          </div>

          <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <input
              type="checkbox"
              checked={venueManager}
              onChange={(event) => setVenueManager(event.target.checked)}
              className="mt-1 h-4 w-4"
            />

            <span>
              <span className="block text-sm font-medium text-slate-900">
                Register as venue manager
              </span>
              <span className="mt-1 block text-sm text-slate-500">
                Choose this if you want to create and manage venues.
              </span>
            </span>
          </label>

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
            {isLoading ? 'Creating account...' : 'Create account'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default RegisterPage