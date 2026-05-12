import type { Image } from './api'

export type RegisterData = {
  name: string
  email: string
  password: string
  bio?: string
  avatar?: Image
  banner?: Image
  venueManager?: boolean
}

export type LoginData = {
  email: string
  password: string
}

export type AuthUser = {
  name: string
  email: string
  avatar?: Image
  banner?: Image
  venueManager?: boolean
  accessToken: string
}
