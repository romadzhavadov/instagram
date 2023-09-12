import { Routes, Route } from 'react-router-dom';
import Default from './pages/Default/Default';
import Home from './pages/Home/Home';
import User from './pages/User/User';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import RequireAuth from './components/RequireAuth/RequireAuth';
import PublicLayout from './components/Layout/PublicLayout';

const AppRoutes = () => {
  return (
    <Routes>
      <Route exact path="/" element={<PublicLayout />}>
        {/* public routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />} />
          <Route path="/user" element={<User />} />
          <Route path="/user/:username" element={<User />} />

          {/* <Route path="/search" element={<Default />} />
          <Route path="/explore" element={<Default />} />
          <Route path="/reels" element={<Default />} />
          <Route path="/messages" element={<Default />} />
          <Route path="/notifications" element={<Default />} />
          <Route path="/create" element={<Default />} /> */}
        </Route>

        {/* full-access route */}
        <Route path="*" element={<Default />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
