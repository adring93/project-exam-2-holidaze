import { createContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import type { AuthUser } from '../types/auth'

type AuthContextValue = {
  user: AuthUser | null
  token: string | null
  isLoggedIn: boolean
  login: (user: AuthUser) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
)

type AuthProviderProps = {
  children: ReactNode
}

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('holidazeUser')

    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  function login(userData: AuthUser) {
    localStorage.setItem('holidazeUser', JSON.stringify(userData))
    setUser(userData)
  }

  function logout() {
    localStorage.removeItem('holidazeUser')
    setUser(null)
  }

  const value: AuthContextValue = {
    user,
    token: user?.accessToken || null,
    isLoggedIn: Boolean(user),
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider