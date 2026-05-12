import type { Image } from './api'
import type { Booking } from './booking'
import type { Profile } from './profile'

export type VenueMeta = {
  wifi: boolean
  parking: boolean
  breakfast: boolean
  pets: boolean
}

export type VenueLocation = {
  address: string
  city: string
  zip: string
  country: string
  continent: string
  lat: number
  lng: number
}

export type Venue = {
  id: string
  name: string
  description: string
  media: Image[]
  price: number
  maxGuests: number
  rating: number
  created: string
  updated: string
  meta: VenueMeta
  location: VenueLocation
  owner?: Profile
  bookings?: Booking[]
}

export type CreateVenueData = {
  name: string
  description: string
  media?: Image[]
  price: number
  maxGuests: number
  rating?: number
  meta?: VenueMeta
  location?: Partial<VenueLocation>
}
