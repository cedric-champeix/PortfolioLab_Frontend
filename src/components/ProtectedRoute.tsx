import Cookies from 'js-cookie';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
  routeType: string;
}

export const ProtectedRoute: React.FunctionComponent<ProtectedRouteProps> = ({
  routeType,
}) => {
  const jwt = Cookies.get('jwt_token');

  const evaluatePass = () => {
    if (routeType === 'admin') {
      return jwt;
    } else {
      return !jwt;
    }
  };
  const path = () => {
    return routeType === 'admin' ? '/connection' : '/';
  };

  return evaluatePass() ? <Outlet></Outlet> : <Navigate to={path()}></Navigate>;
};
