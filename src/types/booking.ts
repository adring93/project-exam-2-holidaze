import type { Profile } from './profile'
import type { Venue } from './venue'

export type Booking = {
  id: string
  dateFrom: string
  dateTo: string
  guests: number
  created: string
  updated: string
  venue?: Venue
  customer?: Profile
}

export type CreateBookingData = {
  dateFrom: string
  dateTo: string
  guests: number
  venueId: string
}

export type UpdateBookingData = {
  dateFrom?: string
  dateTo?: string
  guests?: number
}
