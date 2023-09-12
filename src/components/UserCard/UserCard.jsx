import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UserCard = () => {
  const { pathname } = useLocation();

  const username = useSelector((state) => state?.user?.info?.username);
  const lastName = useSelector((state) => state?.user?.info?.lastName);
  const firstName = useSelector((state) => state?.user?.info?.firstName);

  return (
    <NavLink to={pathname}>
      <div className="w-full p-3 pt-0 flex gap-4">
        <div className="">
          <img
            src={`https://i.pravatar.cc/250?v=${Math.random()}`}
            alt="Avatar"
            className="rounded-full w-14"
          />
        </div>
        <div className="flex flex-col justify-center ">
          <p className="text-[16px]">
            {firstName} {lastName}
          </p>
          <p className="text-lightText text-[14px]">{username}</p>
        </div>
      </div>
    </NavLink>
  );
};

export default UserCard;
