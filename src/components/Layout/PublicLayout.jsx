import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../Footer/Footer';

const PublicLayout = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isRegisterPage = location.pathname === '/register';

  return (
    <>
      <Outlet />
      {(isLoginPage || isRegisterPage) && <Footer />}
    </>
  );
};

export default PublicLayout;
