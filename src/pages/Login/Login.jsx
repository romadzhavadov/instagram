import { Navigate } from 'react-router-dom';
import LoginForm from '../../forms/LoginForm/LoginForm';
import useAuth from '../../hooks/useAuth';

const Login = () => {
  const { auth } = useAuth();

  return <>{auth?.user ? <Navigate to="/" /> : <LoginForm />}</>;
};

export default Login;
