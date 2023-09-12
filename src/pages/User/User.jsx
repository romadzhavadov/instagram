import { useParams } from 'react-router-dom';
import UserProfile from '../../components/UserProfile/UserProfile.jsx';
import { MainUser, OtherUser } from '../../components/UserPostCard/WithUserContext';

const User = () => {
  const { username } = useParams();

  return (
    <>
      <UserProfile selectedUser={username} />
      {username ? <OtherUser selectedUser={username} /> : <MainUser />}
    </>
  );
};

export default User;
