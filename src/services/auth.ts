import { apiRequest } from './api'
import type { ApiResponse } from '../types/api'
import type { AuthUser, LoginData, RegisterData } from '../types/auth'
import type { Profile } from '../types/profile'

export async function registerUser(data: RegisterData) {
  return apiRequest<ApiResponse<Profile>>('/auth/register', {
    method: 'POST',
    body: data,
  })
}

export async function loginUser(data: LoginData) {
  return apiRequest<ApiResponse<AuthUser>>('/auth/login?_holidaze=true', {
    method: 'POST',
    body: data,
  })
}