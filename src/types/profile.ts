import type { Image } from './api'
import type { Booking } from './booking'
import type { Venue } from './venue'

export type Profile = {
  name: string
  email: string
  bio?: string
  avatar?: Image
  banner?: Image
  venueManager?: boolean
  venues?: Venue[]
  bookings?: Booking[]
}

export type UpdateProfileData = {
  bio?: string
  avatar?: Image
  banner?: Image
  venueManager?: boolean
}
