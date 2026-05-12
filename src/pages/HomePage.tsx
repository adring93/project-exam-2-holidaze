import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { getVenues, searchVenues } from '../services/venues'
import type { Venue } from '../types/venue'

function HomePage() {
  const [venues, setVenues] = useState<Venue[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadVenues() {
      try {
        const response = await getVenues()
        setVenues(response.data)
      } catch (error) {
        setError(
          error instanceof Error ? error.message : 'Could not load venues',
        )
      } finally {
        setIsLoading(false)
      }
    }

    loadVenues()
  }, [])

async function handleSearch(event: FormEvent<HTMLFormElement>) {    event.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const trimmedQuery = searchQuery.trim()

      if (!trimmedQuery) {
        const response = await getVenues()
        setVenues(response.data)
        return
      }

      const response = await searchVenues(trimmedQuery)
      setVenues(response.data)
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'Could not search venues',
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
          Holidaze
        </p>

        <h1 className="mt-4 text-5xl font-bold tracking-tight text-slate-950 sm:text-6xl">
          Find your next memorable stay.
        </h1>

        <p className="mt-6 text-lg leading-8 text-slate-600">
          Browse unique venues, compare details, and book your next getaway with
          a calm and simple booking experience.
        </p>
      </div>

      <form
        onSubmit={handleSearch}
        className="mt-10 flex flex-col gap-3 rounded-[2rem] border border-slate-200 bg-white p-3 shadow-sm sm:flex-row"
      >
        <label htmlFor="venue-search" className="sr-only">
          Search venues
        </label>

        <input
          id="venue-search"
          type="search"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Search by venue name..."
          className="min-h-12 flex-1 rounded-full px-5 text-slate-950 outline-none"
        />

        <button
          type="submit"
          className="rounded-full bg-slate-950 px-7 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Search
        </button>
      </form>

      {isLoading && (
        <p className="mt-12 rounded-3xl border border-slate-200 bg-white p-6 text-slate-600">
          Loading venues...
        </p>
      )}

      {error && (
        <p className="mt-12 rounded-3xl border border-red-200 bg-red-50 p-6 text-red-700">
          {error}
        </p>
      )}

      {!isLoading && !error && venues.length === 0 && (
        <p className="mt-12 rounded-3xl border border-slate-200 bg-white p-6 text-slate-600">
          No venues matched your search.
        </p>
      )}

      {!isLoading && !error && venues.length > 0 && (
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {venues.map((venue) => {
            const image = venue.media?.[0]

            return (
              <Link
                key={venue.id}
                to={`/venues/${venue.id}`}
                className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="aspect-[4/3] overflow-hidden bg-slate-200">
                  {image?.url ? (
                    <img
                      src={image.url}
                      alt={image.alt || venue.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-4xl font-bold text-slate-400">
                      H
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-lg font-semibold text-slate-950">
                        {venue.name}
                      </h2>
                      <p className="mt-1 text-sm text-slate-500">
                        {venue.location?.city || 'Unknown city'},{' '}
                        {venue.location?.country || 'Unknown country'}
                      </p>
                    </div>

                    <p className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                      ★ {venue.rating || 0}
                    </p>
                  </div>

                  <div className="mt-5 flex items-center justify-between text-sm">
                    <p className="font-semibold text-slate-950">
                      {venue.price} NOK
                      <span className="font-normal text-slate-500">
                        {' '}
                        / night
                      </span>
                    </p>

                    <p className="text-slate-500">
                      Up to {venue.maxGuests} guests
                    </p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </section>
  )
}

export default HomePage