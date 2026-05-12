import { apiRequest } from './api'
import type { ApiResponse } from '../types/api'
import type { Profile, UpdateProfileData } from '../types/profile'
import type { Venue } from '../types/venue'
import type { Booking } from '../types/booking'

export async function getProfile(name: string, token: string) {
  return apiRequest<ApiResponse<Profile>>(`/holidaze/profiles/${name}`, {
    token,
  })
}

export async function updateProfile(
  name: string,
  data: UpdateProfileData,
  token: string,
) {
  return apiRequest<ApiResponse<Profile>>(`/holidaze/profiles/${name}`, {
    method: 'PUT',
    body: data,
    token,
  })
}

export async function getProfileVenues(name: string, token: string) {
  return apiRequest<ApiResponse<Venue[]>>(
    `/holidaze/profiles/${name}/venues?_bookings=true`,
    {
      token,
    },
  )
}

export async function getProfileBookings(name: string, token: string) {
  return apiRequest<ApiResponse<Booking[]>>(
    `/holidaze/profiles/${name}/bookings?_venue=true`,
    {
      token,
    },
  )
}