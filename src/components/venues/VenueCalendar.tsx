import type { Booking } from '../../types/booking'

type VenueCalendarProps = {
  bookings?: Booking[]
}

function VenueCalendar({ bookings = [] }: VenueCalendarProps) {
  const upcomingBookings = bookings
    .filter((booking) => new Date(booking.dateTo) >= new Date())
    .sort(
      (a, b) =>
        new Date(a.dateFrom).getTime() - new Date(b.dateFrom).getTime(),
    )

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-6">
      <h2 className="text-xl font-semibold text-slate-950">Availability</h2>

      <p className="mt-2 text-sm leading-6 text-slate-600">
        Booked dates are shown below. Choose dates outside these ranges when
        making a booking.
      </p>

      {upcomingBookings.length === 0 ? (
        <p className="mt-5 rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-700">
          No upcoming bookings. This venue currently has open availability.
        </p>
      ) : (
        <div className="mt-5 space-y-3">
          {upcomingBookings.map((booking) => (
            <div
              key={booking.id}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
            >
              <p className="text-sm font-medium text-slate-950">
                Booked from {new Date(booking.dateFrom).toLocaleDateString()}{' '}
                to {new Date(booking.dateTo).toLocaleDateString()}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                {booking.guests} guest{booking.guests === 1 ? '' : 's'}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default VenueCalendar