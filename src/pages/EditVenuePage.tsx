import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { getVenueById, updateVenue } from '../services/venues'

function EditVenuePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isLoggedIn, token, user } = useAuth()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [imageAlt, setImageAlt] = useState('')
  const [price, setPrice] = useState(1000)
  const [maxGuests, setMaxGuests] = useState(2)
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [wifi, setWifi] = useState(false)
  const [parking, setParking] = useState(false)
  const [breakfast, setBreakfast] = useState(false)
  const [pets, setPets] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    async function loadVenue() {
      if (!id) {
        setError('Missing venue ID')
        setIsLoading(false)
        return
      }

      try {
        const response = await getVenueById(id)
        const venue = response.data

        setName(venue.name)
        setDescription(venue.description)
        setImageUrl(venue.media?.[0]?.url || '')
        setImageAlt(venue.media?.[0]?.alt || '')
        setPrice(venue.price)
        setMaxGuests(venue.maxGuests)
        setCity(venue.location?.city || '')
        setCountry(venue.location?.country || '')
        setWifi(Boolean(venue.meta?.wifi))
        setParking(Boolean(venue.meta?.parking))
        setBreakfast(Boolean(venue.meta?.breakfast))
        setPets(Boolean(venue.meta?.pets))
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Could not load venue')
      } finally {
        setIsLoading(false)
      }
    }

    loadVenue()
  }, [id])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')

    if (!id || !isLoggedIn || !token || !user?.venueManager) {
      setError('You must be logged in as a venue manager to update a venue.')
      return
    }

    setIsSaving(true)

    try {
      const response = await updateVenue(
        id,
        {
          name,
          description,
          media: imageUrl
            ? [
                {
                  url: imageUrl,
                  alt: imageAlt || name,
                },
              ]
            : [],
          price,
          maxGuests,
          meta: {
            wifi,
            parking,
            breakfast,
            pets,
          },
          location: {
            city,
            country,
          },
        },
        token,
      )

      navigate(`/venues/${response.data.id}`)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Could not update venue')
    } finally {
      setIsSaving(false)
    }
  }

  if (!isLoggedIn || !user?.venueManager) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-slate-950">
            Venue manager access only
          </h1>
          <p className="mt-3 text-slate-600">
            You need to be logged in as a venue manager to edit venues.
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

  if (isLoading) {
    return (
      <section className="mx-auto max-w-4xl px-6 py-16">
        <p className="rounded-3xl border border-slate-200 bg-white p-6 text-slate-600">
          Loading venue...
        </p>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <Link
        to="/manager"
        className="text-sm font-medium text-slate-600 hover:text-slate-950"
      >
        ← Back to manager dashboard
      </Link>

      <div className="mt-8">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
          Edit venue
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
          Update your venue listing.
        </h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">
          Keep your venue details accurate so customers know what to expect.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm"
      >
        <div className="grid gap-5">
          <div>
            <label htmlFor="name" className="text-sm font-medium text-slate-700">
              Venue name
            </label>
            <input
              id="name"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-950"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="text-sm font-medium text-slate-700"
            >
              Description
            </label>
            <textarea
              id="description"
              required
              rows={5}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-950"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="price"
                className="text-sm font-medium text-slate-700"
              >
                Price per night
              </label>
              <input
                id="price"
                type="number"
                required
                min={1}
                value={price}
                onChange={(event) => setPrice(Number(event.target.value))}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-950"
              />
            </div>

            <div>
              <label
                htmlFor="maxGuests"
                className="text-sm font-medium text-slate-700"
              >
                Max guests
              </label>
              <input
                id="maxGuests"
                type="number"
                required
                min={1}
                value={maxGuests}
                onChange={(event) => setMaxGuests(Number(event.target.value))}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-950"
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="city" className="text-sm font-medium text-slate-700">
                City
              </label>
              <input
                id="city"
                value={city}
                onChange={(event) => setCity(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-950"
              />
            </div>

            <div>
              <label
                htmlFor="country"
                className="text-sm font-medium text-slate-700"
              >
                Country
              </label>
              <input
                id="country"
                value={country}
                onChange={(event) => setCountry(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-950"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="imageUrl"
              className="text-sm font-medium text-slate-700"
            >
              Image URL
            </label>
            <input
              id="imageUrl"
              type="url"
              value={imageUrl}
              onChange={(event) => setImageUrl(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-950"
            />
          </div>

          <div>
            <label
              htmlFor="imageAlt"
              className="text-sm font-medium text-slate-700"
            >
              Image alt text
            </label>
            <input
              id="imageAlt"
              maxLength={120}
              value={imageAlt}
              onChange={(event) => setImageAlt(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-950"
            />
          </div>

          <div className="rounded-3xl bg-slate-50 p-5">
            <h2 className="font-semibold text-slate-950">Amenities</h2>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <label className="flex items-center gap-3 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={wifi}
                  onChange={(event) => setWifi(event.target.checked)}
                />
                Wifi
              </label>

              <label className="flex items-center gap-3 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={parking}
                  onChange={(event) => setParking(event.target.checked)}
                />
                Parking
              </label>

              <label className="flex items-center gap-3 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={breakfast}
                  onChange={(event) => setBreakfast(event.target.checked)}
                />
                Breakfast
              </label>

              <label className="flex items-center gap-3 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={pets}
                  onChange={(event) => setPets(event.target.checked)}
                />
                Pets allowed
              </label>
            </div>
          </div>

          {error && (
            <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isSaving}
            className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving ? 'Saving changes...' : 'Save changes'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default EditVenuePage