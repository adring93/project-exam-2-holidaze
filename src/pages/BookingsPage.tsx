import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { getProfileBookings } from '../services/profiles'
import type { Booking } from '../types/booking'

function BookingsPage() {
  const { isLoggedIn, token, user } = useAuth()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadBookings() {
      if (!isLoggedIn || !token || !user) {
        setIsLoading(false)
        return
      }

      try {
        const response = await getProfileBookings(user.name, token)
        const upcomingBookings = response.data
          .filter((booking) => new Date(booking.dateTo) >= new Date())
          .sort(
            (a, b) =>
              new Date(a.dateFrom).getTime() -
              new Date(b.dateFrom).getTime(),
          )

        setBookings(upcomingBookings)
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : 'Could not load your bookings',
        )
      } finally {
        setIsLoading(false)
      }
    }

    loadBookings()
  }, [isLoggedIn, token, user])

  if (!isLoggedIn) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-slate-950">
            Log in to view your bookings
          </h1>
          <p className="mt-3 text-slate-600">
            You need to be logged in as a customer to see your upcoming
            bookings.
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
          My bookings
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
          Your upcoming stays.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
          View the venues you have booked and keep track of your upcoming
          Holidaze trips.
        </p>
      </div>

      {isLoading && (
        <p className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 text-slate-600">
          Loading bookings...
        </p>
      )}

      {error && (
        <p className="mt-10 rounded-3xl border border-red-200 bg-red-50 p-6 text-red-700">
          {error}
        </p>
      )}

      {!isLoading && !error && bookings.length === 0 && (
        <div className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-950">
            No upcoming bookings yet
          </h2>
          <p className="mt-3 text-slate-600">
            When you book a venue, it will appear here.
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white"
          >
            Browse venues
          </Link>
        </div>
      )}

      {!isLoading && !error && bookings.length > 0 && (
        <div className="mt-10 grid gap-6">
          {bookings.map((booking) => (
            <article
              key={booking.id}
              className="grid gap-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-[12rem_1fr]"
            >
              <div className="overflow-hidden rounded-3xl bg-slate-200">
                {booking.venue?.media?.[0]?.url ? (
                  <img
                    src={booking.venue.media[0].url}
                    alt={booking.venue.media[0].alt || booking.venue.name}
                    className="h-48 w-full object-cover md:h-full"
                  />
                ) : (
                  <div className="flex h-48 items-center justify-center text-4xl font-bold text-slate-400 md:h-full">
                    H
                  </div>
                )}
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-slate-950">
                  {booking.venue?.name || 'Venue'}
                </h2>

                <p className="mt-2 text-slate-500">
                  {booking.venue?.location?.city || 'Unknown city'},{' '}
                  {booking.venue?.location?.country || 'Unknown country'}
                </p>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">Check in</p>
                    <p className="mt-1 font-semibold text-slate-950">
                      {new Date(booking.dateFrom).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">Check out</p>
                    <p className="mt-1 font-semibold text-slate-950">
                      {new Date(booking.dateTo).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">Guests</p>
                    <p className="mt-1 font-semibold text-slate-950">
                      {booking.guests}
                    </p>
                  </div>
                </div>

                {booking.venue?.id && (
                  <Link
                    to={`/venues/${booking.venue.id}`}
                    className="mt-6 inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white"
                  >
                    View venue
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default BookingsPage