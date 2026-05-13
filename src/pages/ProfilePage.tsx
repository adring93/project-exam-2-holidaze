import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { updateProfile } from '../services/profiles'

function ProfilePage() {
  const { isLoggedIn, login, token, user } = useAuth()
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar?.url || '')
  const [avatarAlt, setAvatarAlt] = useState(user?.avatar?.alt || '')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setSuccess('')

    if (!user || !token) {
      setError('You must be logged in to update your profile.')
      return
    }

    setIsLoading(true)

    try {
      const response = await updateProfile(
        user.name,
        {
          avatar: {
            url: avatarUrl,
            alt: avatarAlt || `${user.name} avatar`,
          },
        },
        token,
      )

      login({
        ...user,
        avatar: response.data.avatar,
        banner: response.data.banner,
        venueManager: response.data.venueManager,
      })

      setSuccess('Profile picture updated successfully.')
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'Could not update profile',
      )
    } finally {
      setIsLoading(false)
    }
  }

  if (!isLoggedIn || !user) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-slate-950">
            Log in to view your profile
          </h1>
          <p className="mt-3 text-slate-600">
            You need to be logged in to update your profile picture.
          </p>
          <Link
            to="/login"
            className="mt-6 inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white"
          >
            Go to login
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
          Profile
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
          Manage your Holidaze profile.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
          Update your profile picture and keep your account ready for bookings
          and venue management.
        </p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mx-auto h-36 w-36 overflow-hidden rounded-full bg-slate-200">
            {user.avatar?.url ? (
              <img
                src={user.avatar.url}
                alt={user.avatar.alt || user.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-5xl font-bold text-slate-400">
                {user.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          <div className="mt-6 text-center">
            <h2 className="text-2xl font-semibold text-slate-950">
              {user.name}
            </h2>
            <p className="mt-1 text-slate-500">{user.email}</p>
            <p className="mt-4 inline-flex rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
              {user.venueManager ? 'Venue manager' : 'Customer'}
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm"
        >
          <h2 className="text-2xl font-semibold text-slate-950">
            Update avatar
          </h2>

          <div className="mt-6 space-y-5">
            <div>
              <label
                htmlFor="avatarUrl"
                className="text-sm font-medium text-slate-700"
              >
                Avatar image URL
              </label>
              <input
                id="avatarUrl"
                type="url"
                required
                value={avatarUrl}
                onChange={(event) => setAvatarUrl(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-950"
                placeholder="https://example.com/avatar.jpg"
              />
            </div>

            <div>
              <label
                htmlFor="avatarAlt"
                className="text-sm font-medium text-slate-700"
              >
                Avatar alt text
              </label>
              <input
                id="avatarAlt"
                type="text"
                maxLength={120}
                value={avatarAlt}
                onChange={(event) => setAvatarAlt(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-950"
                placeholder="Profile picture"
              />
            </div>

            {error && (
              <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </p>
            )}

            {success && (
              <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                {success}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? 'Updating profile...' : 'Update profile picture'}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default ProfilePage