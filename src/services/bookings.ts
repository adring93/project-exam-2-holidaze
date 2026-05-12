import { apiRequest } from './api'
import type { ApiResponse } from '../types/api'
import type { Booking, CreateBookingData, UpdateBookingData } from '../types/booking'

export async function getBookings(token: string) {
  return apiRequest<ApiResponse<Booking[]>>('/holidaze/bookings?_customer=true&_venue=true', {
    token,
  })
}

export async function getBookingById(id: string, token: string) {
  return apiRequest<ApiResponse<Booking>>(
    `/holidaze/bookings/${id}?_customer=true&_venue=true`,
    {
      token,
    },
  )
}

export async function createBooking(data: CreateBookingData, token: string) {
  return apiRequest<ApiResponse<Booking>>('/holidaze/bookings', {
    method: 'POST',
    body: data,
    token,
  })
}

export async function updateBooking(
  id: string,
  data: UpdateBookingData,
  token: string,
) {
  return apiRequest<ApiResponse<Booking>>(`/holidaze/bookings/${id}`, {
    method: 'PUT',
    body: data,
    token,
  })
}

export async function deleteBooking(id: string, token: string) {
  return apiRequest<void>(`/holidaze/bookings/${id}`, {
    method: 'DELETE',
    token,
  })
}