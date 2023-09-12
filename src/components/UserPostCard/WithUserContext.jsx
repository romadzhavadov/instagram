import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import UserPostCard from './UserPostCard';
import { useNavigate } from 'react-router-dom';
import { Endpoint } from '../../constants';
import { client } from '../../services/client';

const MainUser = () => {
  const posts = useSelector((state) => state?.user?.info?.posts);
  const reversedPosts = posts ? [...posts].reverse() : [];

  return <UserPostCard data={reversedPosts} />;
};

const OtherUser = ({ selectedUser }) => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await client.sendGet(`${Endpoint.USER}?username=${selectedUser}`);
        const data = response.data;
        setPosts(data.posts.reverse());
      } catch (error) {
        console.error('Error fetching user data:', error);
        navigate('/user');
      }
    };

    if (selectedUser) {
      fetchUserData();
    }
  }, [selectedUser]);

  return <UserPostCard data={posts} />;
};

export { MainUser, OtherUser };
