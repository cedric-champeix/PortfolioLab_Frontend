import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { string } from 'prop-types'
import Cookies from 'js-cookie'

export default function ProtectedRoute({ routeType }) {
  const jwt = Cookies.get('jwt_token')

  const evaluatePass = () => {
    if (routeType === 'admin') {
      return jwt
    } else {
      return !jwt
    }
  }
  const path = () => {
    return routeType === 'admin' ? '/connection' : '/'
  }

  return evaluatePass() ? <Outlet></Outlet> : <Navigate to={path()}></Navigate>
}

ProtectedRoute.propTypes = {
  routeType: string,
}
