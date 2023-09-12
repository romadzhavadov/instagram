import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { client } from '../../services/client';
import { AUTH_LS_KEY, Endpoint } from '../../constants';
import { getStateFromLocalStorage } from '../../utils';
import { setSubscribtions } from '../../redux/slices/userSlice';
// import SettingsIcon from '../../assets/svgComponents/SettingsIcon';

const UserProfile = ({ selectedUser }) => {
  const username = useSelector((state) => state?.user?.info?.username);
  const lastName = useSelector((state) => state?.user?.info?.lastName);
  const firstName = useSelector((state) => state?.user?.info?.firstName);
  const subscribers = useSelector((state) => state?.user?.info?.subscribers);
  const subscriptions = useSelector((state) => state?.user?.info?.subscriptions);
  const posts = useSelector((state) => state?.user?.info?.posts);

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [nickName, setNickName] = useState('');
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [data, setData] = useState([]);

  const [isFollowed, setIsFollowed] = useState(false);

  const dispatch = useDispatch();

  const fetchUserData = async () => {
    try {
      const response = await client.sendGet(`${Endpoint.USER}?username=${selectedUser}`);
      const data = response.data;

      const { user } = getStateFromLocalStorage(AUTH_LS_KEY);

      setName(data.firstName);
      setSurname(data.lastName);
      setNickName(data.username);
      setFollowers(data.subscribers.length);
      setFollowing(data.subscriptions.length);
      setData(data.posts);

      const isSubscribed = data.subscribers.findIndex((item) => {
        return item.username === user;
      });
      if (isSubscribed !== -1) {
        setIsFollowed(true);
      }
    } catch (err) {
      console.error('Error fetching user data:', err);
    }
  };

  useEffect(() => {
    if (selectedUser) {
      fetchUserData();
    } else if (username) {
      setName(firstName);
      setSurname(lastName);
      setNickName(username);
      setFollowers(subscribers.length);
      setFollowing(subscriptions.length);
      setData(posts);
    }
  }, [selectedUser, firstName, lastName, username, subscribers, subscriptions, posts]);

  const handleFollowBtn = async () => {
    try {
      if (isFollowed) {
        const response = await client.sendDelete(
          `${Endpoint.SUBSCRIPTION}?username=${selectedUser}`,
        );
        setFollowers((prev) => prev - 1);
        setIsFollowed(false);
        console.log(response);
      } else {
        const response = await client.sendPost(Endpoint.SUBSCRIPTION, { username: selectedUser });
        setFollowers((prev) => prev + 1);
        setIsFollowed(true);
        console.log(response);
      }
      dispatch(setSubscribtions({ username: nickName, firstName: name, lastName: surname }));
    } catch (error) {
      console.error('Error toggling subscription:', error);
    }
  };

  return (
    <div className="mt-6 pb-16 flex items-center justify-center border-b border-gray-30">
      <img
        className="rounded-full mr-24"
        src={`https://i.pravatar.cc/250?v=${Math.random()}`}
        alt="User Avatar"
        width={150}
        height={150}
      />
      <div>
        <div className="flex items-center mb-8">
          <h2 className="text-2xl">{nickName}</h2>
          {/* <button>
          <SettingsIcon />
        </button> */}
        </div>
        <div className="flex space-x-4 mb-4">
          <div>{data.length} Posts</div>
          <div>{followers} followers</div>
          <div>{following} following</div>
        </div>
        <h2 className="font-bold text-sm">
          {name} {surname}
        </h2>
        {selectedUser && (
          <button
            className={`rounded-lg ${
              isFollowed ? 'bg-gray-600 text-white' : 'bg-blue-500 text-black'
            } p-1 mt-5`}
            onClick={handleFollowBtn}
          >
            {isFollowed ? 'Following' : 'Follow'}
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
