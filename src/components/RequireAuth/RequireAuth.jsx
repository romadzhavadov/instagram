import { useLocation, Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useEffect, useState } from 'react';
import ProtectedLayout from '../Layout/ProtectedLayout';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../../redux/slices/userSlice';

const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => {
    setIsLoading(false);
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUserInfo());
  }, []);

  return isLoading ? (
    <p>Loading...</p>
  ) : auth?.user ? (
    <ProtectedLayout />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
