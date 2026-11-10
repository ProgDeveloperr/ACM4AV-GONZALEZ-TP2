import {
  Navigate,
  useLocation,
} from 'react-router-dom'

import useAuth from '../../hooks/useAuth'

function ProtectedRoute({
  children,
  allowedRoles,
}) {
  const {
    isLoggedIn,
    user,
  } = useAuth()

  const location = useLocation()

  if (!isLoggedIn) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location,
        }}
      />
    )
  }

  if (
    allowedRoles &&
    !allowedRoles.includes(user?.role)
  ) {
    return (
      <Navigate
        to="/acceso-denegado"
        replace
      />
    )
  }

  return children
}

export default ProtectedRoute