const user = {
  id: 1,
  userPhoto: `https://i.pravatar.cc/250?v=${Math.random()}`,
  name: 'viktoria',
};

const IconProfile = () => {
  return (
    <img
      className="w-6 h-6 object-none object-center rounded-full border border-black"
      src={user.userPhoto}
      alt="userPhoto"
    />
  );
};
export default IconProfile;
