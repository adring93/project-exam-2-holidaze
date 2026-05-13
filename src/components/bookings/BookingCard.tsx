import { Link } from 'react-router-dom'
import type { Booking } from '../../types/booking'

type BookingCardProps = {
  booking: Booking
}

function BookingCard({ booking }: BookingCardProps) {
  return (
    <article className="grid gap-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-[12rem_1fr]">
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
  )
}

export default BookingCard