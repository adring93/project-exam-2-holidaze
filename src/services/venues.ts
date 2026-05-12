import { apiRequest } from './api'
import type { ApiResponse } from '../types/api'
import type { CreateVenueData, Venue } from '../types/venue'

export async function getVenues() {
  return apiRequest<ApiResponse<Venue[]>>('/holidaze/venues?_owner=true&_bookings=true')
}

export async function searchVenues(query: string) {
  return apiRequest<ApiResponse<Venue[]>>(
    `/holidaze/venues/search?q=${encodeURIComponent(query)}&_owner=true&_bookings=true`,
  )
}

export async function getVenueById(id: string) {
  return apiRequest<ApiResponse<Venue>>(
    `/holidaze/venues/${id}?_owner=true&_bookings=true`,
  )
}

export async function createVenue(data: CreateVenueData, token: string) {
  return apiRequest<ApiResponse<Venue>>('/holidaze/venues', {
    method: 'POST',
    body: data,
    token,
  })
}

export async function updateVenue(
  id: string,
  data: Partial<CreateVenueData>,
  token: string,
) {
  return apiRequest<ApiResponse<Venue>>(`/holidaze/venues/${id}`, {
    method: 'PUT',
    body: data,
    token,
  })
}

export async function deleteVenue(id: string, token: string) {
  return apiRequest<void>(`/holidaze/venues/${id}`, {
    method: 'DELETE',
    token,
  })
}