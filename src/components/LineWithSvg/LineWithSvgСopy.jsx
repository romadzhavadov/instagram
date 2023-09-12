import HeartCopy from '../../assets/svgComponents/HeartСopy';
import CommentsSvg from '../../assets/svgComponents/Comments';
import MessagesSvg from '../../assets/svgComponents/Messages';
import SaveSvg from '../../assets/svgComponents/Save';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { client } from '../../services/client';
import { AUTH_LS_KEY, Endpoint } from '../../constants';
import { getStateFromLocalStorage } from '../../utils';

const LineWithSvg = ({ postId, setLikesAmount, handleOpenPost }) => {
  const [isLiked, setIsLiked] = useState(false);
  const posts = useSelector((state) => state.posts.posts);
  const { user } = getStateFromLocalStorage(AUTH_LS_KEY);

  useEffect(() => {
    const currentPost = posts.find((el) => el.postId === postId);
    const isLikedByUser = currentPost.likes.findIndex((el) => el.authorUsername === user);
    if (isLikedByUser !== -1) setIsLiked(true);
  }, [posts]);

  const handleClick = async () => {
    let response = null;
    try {
      if (!isLiked) {
        response = await client.sendPost(Endpoint.LIKE, {
          postId: postId,
        });
        setIsLiked(true);
        setLikesAmount((prev) => prev + 1);
      } else {
        response = await client.sendDelete(`${Endpoint.LIKE}?postId=${postId}`);
        setIsLiked(false);
        setLikesAmount((prev) => prev - 1);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex justify-between w-full gap-4">
      <button onClick={handleClick}>
        <HeartCopy isLiked={isLiked} />
      </button>
      <button onClick={handleOpenPost}>
        <CommentsSvg />
      </button>
      <button style={{ cursor: 'not-allowed' }}>
        <MessagesSvg />
      </button>
      <button className="ml-auto" style={{ cursor: 'not-allowed' }}>
        <SaveSvg />
      </button>
    </div>
  );
};

export default LineWithSvg;
