import AppRoutes from './AppRoutes';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getStateFromLocalStorage } from './utils';
import { AUTH_LS_KEY } from './constants';
import useAuth from './hooks/useAuth';
import useTheme from './hooks/useTheme';
import ContentModal from './components/ContentModal/ContentModal';
import DefaultModal from './components/DefaultModal/DefaultModal.jsx';

function App() {
  const { theme } = useTheme();
  const { setAuth } = useAuth();

  document.getElementById('root').classList.add('flex', 'flex-col');

  useEffect(() => {
    const credentials = getStateFromLocalStorage(AUTH_LS_KEY);
    if (credentials) {
      setAuth(credentials);
    }
  }, []);

  const isDefaultActive = useSelector((state) => state.modal.isDefaultActive);
  const isContentActive = useSelector((state) => state.modal.isContentActive);

  return (
    <div
      className={`${
        theme === 'darkTheme' ? 'text-white bg-darkTheme' : 'text-black bg-lightTheme'
      } min-h-screen`}
    >
      <AppRoutes />
      {isDefaultActive && <DefaultModal />}
      {isContentActive && <ContentModal />}
    </div>
  );
}

export default App;
