import { Link } from 'react-router-dom'
import type { Venue } from '../../types/venue'

type VenueCardProps = {
  venue: Venue
}

function VenueCard({ venue }: VenueCardProps) {
  const image = venue.media?.[0]

  return (
    <Link
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
            <span className="font-normal text-slate-500"> / night</span>
          </p>

          <p className="text-slate-500">Up to {venue.maxGuests} guests</p>
        </div>
      </div>
    </Link>
  )
}

export default VenueCard