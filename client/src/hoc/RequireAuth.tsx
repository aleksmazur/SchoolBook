import { useLocation, Navigate } from 'react-router';

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const token = localStorage.getItem('token') as string;
  if (!token) {
    return <Navigate to="/" state={{ from: location }} />;
  }
  return children;
};
