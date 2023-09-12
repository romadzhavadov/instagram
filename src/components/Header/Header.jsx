import { NavLink, useNavigate } from 'react-router-dom';
import HomeSvg from '../../assets/svgComponents/HomeSvg';
import CreateSvg from '../../assets/svgComponents/CreateSvg';
import LogoSvg from '../../assets/svgComponents/LogoSvg';
import MoreSvg from '../../assets/svgComponents/MoreSvg';
import IconProfile from '../../assets/svgComponents/IconProfile';
import { useDispatch } from 'react-redux';
import { AUTH_LS_KEY, CONTENT_MODAL_NAME, DEFAULT_MODAL_NAME } from '../../constants';
import {
  closeModal,
  openModal,
  setConfirmButton,
  setContentBody,
  setContentTitle,
  setDefaultBody,
  setDefaultTitle,
} from '../../redux/slices/modalSlice';
import useAuth from '../../hooks/useAuth';
import { clearLocalStorage } from '../../utils';
import { client } from '../../services/client';
import PostCreationForm from '../../forms/PostCreationForm/PostCreationForm';
import useTheme from '../../hooks/useTheme';
import DarkThemeSvg from '../../assets/svgComponents/DarkThemeSvg';
import LightThemeSvg from '../../assets/svgComponents/LightThemeSvg';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const handleLogoutBtn = () => {
    clearLocalStorage(AUTH_LS_KEY);
    client.setToken(null);
    setAuth(null);
    dispatch(closeModal(DEFAULT_MODAL_NAME));
    navigate('/login');
  };

  const handleMoreBtn = () => {
    dispatch(openModal(DEFAULT_MODAL_NAME));
    dispatch(
      setConfirmButton(
        <button onClick={handleLogoutBtn} className="font-bold text-xl py-6 w-full">
          Log out
        </button>,
      ),
    );
    dispatch(setDefaultBody('Are you sure you want to log out?'));
    dispatch(setDefaultTitle('Confirm'));
  };

  const handleCreateBtn = () => {
    dispatch(openModal(CONTENT_MODAL_NAME));
    dispatch(setContentTitle('Create new post'));
    dispatch(setContentBody(<PostCreationForm />));
  };

  const { theme, toogleTheme } = useTheme();

  return (
    <header
      className={`w-52 border-r ${
        theme === 'darkTheme' ? 'border-white' : 'border-black'
      } fixed inset-y-0 flex flex-col justify-between pb-5 px-3 pt-2`}
    >
      <nav className="w-full flex flex-col">
        <NavLink to="/" className="pr-4 pl-3 py-8">
          <LogoSvg />
        </NavLink>
        <ul className="w-full">
          <li className="flex">
            <NavLink
              className={({ isActive }) =>
                'flex gap-4 p-4 pl-3 grow' + (isActive ? ' font-bold' : '')
              }
              to="/"
            >
              <HomeSvg width="24" height="24" />
              Home
            </NavLink>
          </li>
          {/* <li className="flex">
            <NavLink
              className={({ isActive }) =>
                'flex gap-4 p-4 pl-3 grow' + (isActive ? ' font-bold' : '')
              }
              to="/search"
            >
              <SearchSvg width="24" height="24" />
              <span>Search</span>
            </NavLink>
          </li>
          <li className="flex">
            <NavLink
              className={({ isActive }) =>
                'flex gap-4 p-4 pl-3 grow' + (isActive ? ' font-bold' : '')
              }
              to="/explore"
            >
              <ExploreSvg width="24" height="24" />
              <span>Explore</span>
            </NavLink>
          </li>
          <li className="flex">
            <NavLink
              className={({ isActive }) =>
                'flex gap-4 p-4 pl-3 grow' + (isActive ? ' font-bold' : '')
              }
              to="/reels"
            >
              <ReelsSvg width="24" height="24" />
              <span>Reels</span>
            </NavLink>
          </li>
          <li className="flex">
            <NavLink
              className={({ isActive }) =>
                'flex gap-4 p-4 pl-3 grow' + (isActive ? ' font-bold' : '')
              }
              to="/messages"
            >
              <MessagesSvg width="24" height="24" />
              <span>Messages</span>
            </NavLink>
          </li>
          <li className="flex">
            <NavLink
              className={({ isActive }) =>
                'flex gap-4 p-4 pl-3 grow' + (isActive ? ' font-bold' : '')
              }
              to="/notifications"
            >
              <NotificationsSvg width="24" height="24" />
              <span>Notifications</span>
            </NavLink>
          </li> */}
          <li className="flex">
            <button className="flex gap-4 p-4 pl-3 grow focus:font-bold" onClick={handleCreateBtn}>
              <CreateSvg width="24" height="24" />
              Create
            </button>
          </li>
          <li className="flex">
            <NavLink
              className={({ isActive }) =>
                'flex gap-4 p-4 pl-3 grow' + (isActive ? ' font-bold' : '')
              }
              to="/user"
            >
              <IconProfile />
              Profile
            </NavLink>
          </li>
        </ul>
      </nav>
      <button
        className="mt-auto p-4 pl-3 flex gap-4 items-center focus:font-bold"
        onClick={toogleTheme}
      >
        {theme === 'darkTheme' ? <DarkThemeSvg /> : <LightThemeSvg />} Change theme
      </button>
      <button className="flex gap-4 p-4 pl-3 focus:font-bold" onClick={handleMoreBtn}>
        <MoreSvg width="24" height="24" />
        {/* <span>More</span> */}
        Log out
      </button>
    </header>
  );
}

export default Header;
