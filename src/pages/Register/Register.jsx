import { Navigate } from 'react-router-dom';
import RegistrationForm from '../../forms/RegistrationForm/RegistrationForm';
import useAuth from '../../hooks/useAuth';

const Register = () => {
  const { auth } = useAuth();

  return <>{auth?.user ? <Navigate to="/" /> : <RegistrationForm />}</>;
};

export default Register;
