import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { getVenueById } from '../services/venues'
import type { Booking } from '../types/booking'
import type { Venue } from '../types/venue'

function VenueBookingsPage() {
  const { id } = useParams()
  const { isLoggedIn, user } = useAuth()
  const [venue, setVenue] = useState<Venue | null>(null)
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadVenueBookings() {
      if (!id) {
        setError('Missing venue ID')
        setIsLoading(false)
        return
      }

      try {
        const response = await getVenueById(id)
        const loadedVenue = response.data
        const upcomingBookings = (loadedVenue.bookings || [])
          .filter((booking) => new Date(booking.dateTo) >= new Date())
          .sort(
            (a, b) =>
              new Date(a.dateFrom).getTime() -
              new Date(b.dateFrom).getTime(),
          )

        setVenue(loadedVenue)
        setBookings(upcomingBookings)
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : 'Could not load venue bookings',
        )
      } finally {
        setIsLoading(false)
      }
    }

    loadVenueBookings()
  }, [id])

  if (!isLoggedIn || !user?.venueManager) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-slate-950">
            Venue manager access only
          </h1>
          <p className="mt-3 text-slate-600">
            You need to be logged in as a venue manager to view venue bookings.
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
      <Link
        to="/manager"
        className="text-sm font-medium text-slate-600 hover:text-slate-950"
      >
        ← Back to manager dashboard
      </Link>

      <div className="mt-8">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
          Venue bookings
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
          {venue?.name || 'Managed venue'}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
          View upcoming bookings connected to this venue.
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
            No upcoming bookings
          </h2>
          <p className="mt-3 text-slate-600">
            This venue does not have any upcoming bookings yet.
          </p>
        </div>
      )}

      {!isLoading && !error && bookings.length > 0 && (
        <div className="mt-10 grid gap-5">
          {bookings.map((booking) => (
            <article
              key={booking.id}
              className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-slate-950">
                    Booking for {booking.guests} guest
                    {booking.guests === 1 ? '' : 's'}
                  </h2>
                  <p className="mt-2 text-slate-500">
                    Booking ID: {booking.id}
                  </p>
                </div>

                <p className="w-fit rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
                  Upcoming
                </p>
              </div>

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
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default VenueBookingsPage