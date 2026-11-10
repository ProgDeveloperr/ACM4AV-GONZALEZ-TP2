import { useState } from 'react'
import AuthContext from './auth-context'

const STORAGE_KEY = '3d-store-user'

const users = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@3dstore.com',
    password: '1234',
    role: 'admin',
  },
  {
    id: 2,
    username: 'user',
    email: 'user@3dstore.com',
    password: '1234',
    role: 'user',
  },
]

function getStoredUser() {
  try {
    const storedUser =
      localStorage.getItem(STORAGE_KEY)

    if (!storedUser) {
      return null
    }

    return JSON.parse(storedUser)
  } catch {
    localStorage.removeItem(STORAGE_KEY)

    return null
  }
}

function AuthProvider({ children }) {
  const [user, setUser] = useState(
    getStoredUser
  )

  const isLoggedIn = Boolean(user)

  const login = (username, password) => {
    const foundUser = users.find(
      (currentUser) =>
        currentUser.username === username &&
        currentUser.password === password
    )

    if (!foundUser) {
      return false
    }

    const sessionUser = {
      id: foundUser.id,
      username: foundUser.username,
      email: foundUser.email,
      role: foundUser.role,
    }

    setUser(sessionUser)

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(sessionUser)
    )

    return true
  }

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY)
    setUser(null)
  }

  const value = {
    user,
    isLoggedIn,
    login,
    logout,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider