import { useLocation } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isLoginPage = location.pathname === '/register' || location.pathname === '/login';

  return (
    <footer
      className={`p-3 flex flex-col justify-center text-lightText w-full text-xs
      ${isHomePage ? 'items-start' : 'items-center'}
      ${!isLoginPage && !isHomePage && 'absolute bottom-4'}`}
    >
      <ul className={`flex flex-wrap ${styles.list} mb-5`}>
        <li>
          <a href="#">About</a>
        </li>
        <li>
          <a href="#">Help</a>
        </li>
        <li>
          <a href="#">Press</a>
        </li>
        <li>
          <a href="#">API</a>
        </li>
        <li>
          <a href="#">Jobs</a>
        </li>
        <li>
          <a href="#">Privacy</a>
        </li>
        <li>
          <a href="#">Terms</a>
        </li>
        <li>
          <a href="#">Locations</a>
        </li>
        <li>
          <a href="#">Language</a>
        </li>
        <li>
          <a href="#">Meta Verified</a>
        </li>
      </ul>
      <p className="uppercase">&copy; {currentYear} Instagram</p>
    </footer>
  );
};

export default Footer;
