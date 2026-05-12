import { useState } from 'react'
import type { FormEvent } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { createBooking } from '../../services/bookings'
import type { Booking } from '../../types/booking'
import type { Venue } from '../../types/venue'

type BookingFormProps = {
  venue: Venue
  onBookingCreated: (booking: Booking) => void
}

function BookingForm({ venue, onBookingCreated }: BookingFormProps) {
  const { isLoggedIn, token, user } = useAuth()
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [guests, setGuests] = useState(1)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  function datesOverlap(start: Date, end: Date) {
    return venue.bookings?.some((booking) => {
      const bookedStart = new Date(booking.dateFrom)
      const bookedEnd = new Date(booking.dateTo)

      return start < bookedEnd && end > bookedStart
    })
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setSuccess('')

    if (!isLoggedIn || !token) {
      setError('You must be logged in to create a booking.')
      return
    }

    if (user?.venueManager) {
      setError('Venue managers cannot create customer bookings.')
      return
    }

    const startDate = new Date(dateFrom)
    const endDate = new Date(dateTo)

    if (endDate <= startDate) {
      setError('Check out date must be after check in date.')
      return
    }

    if (guests > venue.maxGuests) {
      setError(`This venue allows a maximum of ${venue.maxGuests} guests.`)
      return
    }

    if (datesOverlap(startDate, endDate)) {
      setError('These dates overlap with an existing booking.')
      return
    }

    setIsLoading(true)

    try {
      const response = await createBooking(
        {
          dateFrom: startDate.toISOString(),
          dateTo: endDate.toISOString(),
          guests,
          venueId: venue.id,
        },
        token,
      )

      onBookingCreated(response.data)
      setSuccess('Booking created successfully.')
      setDateFrom('')
      setDateTo('')
      setGuests(1)
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'Could not create booking',
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <div>
        <label
          htmlFor="dateFrom"
          className="text-sm font-medium text-slate-700"
        >
          Check in
        </label>
        <input
          id="dateFrom"
          type="date"
          required
          value={dateFrom}
          onChange={(event) => setDateFrom(event.target.value)}
          className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-950"
        />
      </div>

      <div>
        <label htmlFor="dateTo" className="text-sm font-medium text-slate-700">
          Check out
        </label>
        <input
          id="dateTo"
          type="date"
          required
          value={dateTo}
          onChange={(event) => setDateTo(event.target.value)}
          className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-950"
        />
      </div>

      <div>
        <label htmlFor="guests" className="text-sm font-medium text-slate-700">
          Guests
        </label>
        <input
          id="guests"
          type="number"
          required
          min={1}
          max={venue.maxGuests}
          value={guests}
          onChange={(event) => setGuests(Number(event.target.value))}
          className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-950"
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
        {isLoading ? 'Creating booking...' : 'Book this venue'}
      </button>
    </form>
  )
}

export default BookingForm