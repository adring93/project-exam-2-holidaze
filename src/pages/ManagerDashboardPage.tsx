import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { getProfileVenues } from '../services/profiles'
import { deleteVenue } from '../services/venues'
import type { Venue } from '../types/venue'

function ManagerDashboardPage() {
  const { isLoggedIn, token, user } = useAuth()
  const [venues, setVenues] = useState<Venue[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    async function loadVenues() {
      if (!isLoggedIn || !token || !user?.venueManager) {
        setIsLoading(false)
        return
      }

      try {
        const response = await getProfileVenues(user.name, token)
        setVenues(response.data)
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : 'Could not load your venues',
        )
      } finally {
        setIsLoading(false)
      }
    }

    loadVenues()
  }, [isLoggedIn, token, user])

  async function handleDeleteVenue(id: string) {
    if (!token) {
      setError('You must be logged in to delete a venue.')
      return
    }

    const confirmed = window.confirm(
      'Are you sure you want to delete this venue?',
    )

    if (!confirmed) {
      return
    }

    setError('')
    setSuccess('')

    try {
      await deleteVenue(id, token)
      setVenues((currentVenues) =>
        currentVenues.filter((venue) => venue.id !== id),
      )
      setSuccess('Venue deleted successfully.')
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'Could not delete venue',
      )
    }
  }

  if (!isLoggedIn) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-slate-950">
            Log in to manage venues
          </h1>
          <p className="mt-3 text-slate-600">
            You need to be logged in as a venue manager to access this page.
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

  if (!user?.venueManager) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-slate-950">
            Venue manager access only
          </h1>
          <p className="mt-3 text-slate-600">
            This area is only available for users registered as venue managers.
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white"
          >
            Browse venues
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
            Venue manager
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Manage your venues.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Create new venues, update existing listings, delete venues, and view
            upcoming bookings.
          </p>
        </div>

        <Link
          to="/manager/venues/new"
          className="inline-flex justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Create venue
        </Link>
      </div>

      {isLoading && (
        <p className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 text-slate-600">
          Loading venues...
        </p>
      )}

      {error && (
        <p className="mt-10 rounded-3xl border border-red-200 bg-red-50 p-6 text-red-700">
          {error}
        </p>
      )}

      {success && (
        <p className="mt-10 rounded-3xl border border-emerald-200 bg-emerald-50 p-6 text-emerald-700">
          {success}
        </p>
      )}

      {!isLoading && !error && venues.length === 0 && (
        <div className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-950">
            No venues yet
          </h2>
          <p className="mt-3 text-slate-600">
            Create your first venue to start receiving bookings.
          </p>
          <Link
            to="/manager/venues/new"
            className="mt-6 inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white"
          >
            Create venue
          </Link>
        </div>
      )}

      {!isLoading && venues.length > 0 && (
        <div className="mt-10 grid gap-6">
          {venues.map((venue) => (
            <article
              key={venue.id}
              className="grid gap-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-[14rem_1fr]"
            >
              <div className="overflow-hidden rounded-3xl bg-slate-200">
                {venue.media?.[0]?.url ? (
                  <img
                    src={venue.media[0].url}
                    alt={venue.media[0].alt || venue.name}
                    className="h-48 w-full object-cover md:h-full"
                  />
                ) : (
                  <div className="flex h-48 items-center justify-center text-4xl font-bold text-slate-400 md:h-full">
                    H
                  </div>
                )}
              </div>

              <div>
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold text-slate-950">
                      {venue.name}
                    </h2>
                    <p className="mt-2 text-slate-500">
                      {venue.location?.city || 'Unknown city'},{' '}
                      {venue.location?.country || 'Unknown country'}
                    </p>
                  </div>

                  <p className="w-fit rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
                    {venue.bookings?.length || 0} bookings
                  </p>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">Price</p>
                    <p className="mt-1 font-semibold text-slate-950">
                      {venue.price} NOK
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">Guests</p>
                    <p className="mt-1 font-semibold text-slate-950">
                      Up to {venue.maxGuests}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">Rating</p>
                    <p className="mt-1 font-semibold text-slate-950">
                      ★ {venue.rating || 0}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    to={`/venues/${venue.id}`}
                    className="rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
                  >
                    View
                  </Link>

                  <Link
                    to={`/manager/venues/${venue.id}/edit`}
                    className="rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
                  >
                    Edit
                  </Link>

                  <Link
                    to={`/manager/venues/${venue.id}/bookings`}
                    className="rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
                  >
                    View bookings
                  </Link>

                  <button
                    type="button"
                    onClick={() => handleDeleteVenue(venue.id)}
                    className="rounded-full bg-red-50 px-5 py-3 text-sm font-semibold text-red-700 transition hover:bg-red-100"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default ManagerDashboardPage