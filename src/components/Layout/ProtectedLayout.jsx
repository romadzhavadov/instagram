import { Outlet, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const ProtectedLayout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <>
      <Header />
      <main className="relative min-h-screen pb-20 mt-4">
        <Outlet />
        {!isHomePage && <Footer />}
      </main>
    </>
  );
};

export default ProtectedLayout;
