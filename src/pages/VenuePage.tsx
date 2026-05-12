import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getVenueById } from '../services/venues'
import type { Venue } from '../types/venue'

function VenuePage() {
  const { id } = useParams()
  const [venue, setVenue] = useState<Venue | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadVenue() {
      if (!id) {
        setError('Missing venue ID')
        setIsLoading(false)
        return
      }

      try {
        const response = await getVenueById(id)
        setVenue(response.data)
      } catch (error) {
        setError(
          error instanceof Error ? error.message : 'Could not load venue',
        )
      } finally {
        setIsLoading(false)
      }
    }

    loadVenue()
  }, [id])

  if (isLoading) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-16">
        <p className="rounded-3xl border border-slate-200 bg-white p-6 text-slate-600">
          Loading venue...
        </p>
      </section>
    )
  }

  if (error || !venue) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="rounded-3xl border border-red-200 bg-red-50 p-6">
          <p className="text-red-700">{error || 'Venue not found'}</p>
          <Link
            to="/"
            className="mt-4 inline-block font-medium text-red-900 underline"
          >
            Back to venues
          </Link>
        </div>
      </section>
    )
  }

  const mainImage = venue.media?.[0]

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <Link
        to="/"
        className="text-sm font-medium text-slate-600 hover:text-slate-950"
      >
        ← Back to venues
      </Link>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1.4fr_0.8fr]">
        <div>
          <div className="overflow-hidden rounded-[2rem] bg-slate-200">
            {mainImage?.url ? (
              <img
                src={mainImage.url}
                alt={mainImage.alt || venue.name}
                className="h-[28rem] w-full object-cover"
              />
            ) : (
              <div className="flex h-[28rem] items-center justify-center text-6xl font-bold text-slate-400">
                H
              </div>
            )}
          </div>

          <div className="mt-8">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
              {venue.location?.city || 'Unknown city'},{' '}
              {venue.location?.country || 'Unknown country'}
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              {venue.name}
            </h1>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              {venue.description}
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-3xl border border-slate-200 bg-white p-5">
              <p className="text-sm text-slate-500">Price</p>
              <p className="mt-1 text-xl font-semibold text-slate-950">
                {venue.price} NOK
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-5">
              <p className="text-sm text-slate-500">Guests</p>
              <p className="mt-1 text-xl font-semibold text-slate-950">
                Up to {venue.maxGuests}
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-5">
              <p className="text-sm text-slate-500">Rating</p>
              <p className="mt-1 text-xl font-semibold text-slate-950">
                ★ {venue.rating || 0}
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-5">
              <p className="text-sm text-slate-500">Bookings</p>
              <p className="mt-1 text-xl font-semibold text-slate-950">
                {venue.bookings?.length || 0}
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6">
            <h2 className="text-xl font-semibold text-slate-950">Amenities</h2>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <p className="rounded-2xl bg-slate-50 p-4 text-slate-700">
                {venue.meta?.wifi ? '✓' : '—'} Wifi
              </p>
              <p className="rounded-2xl bg-slate-50 p-4 text-slate-700">
                {venue.meta?.parking ? '✓' : '—'} Parking
              </p>
              <p className="rounded-2xl bg-slate-50 p-4 text-slate-700">
                {venue.meta?.breakfast ? '✓' : '—'} Breakfast
              </p>
              <p className="rounded-2xl bg-slate-50 p-4 text-slate-700">
                {venue.meta?.pets ? '✓' : '—'} Pets allowed
              </p>
            </div>
          </div>
        </div>

        <aside className="h-fit rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-28">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
            Booking
          </p>

          <h2 className="mt-3 text-2xl font-bold text-slate-950">
            {venue.price} NOK
            <span className="text-base font-normal text-slate-500">
              {' '}
              / night
            </span>
          </h2>

          <p className="mt-4 text-sm leading-6 text-slate-600">
            Booking form and availability calendar will be added in the next
            step.
          </p>
        </aside>
      </div>
    </section>
  )
}

export default VenuePage