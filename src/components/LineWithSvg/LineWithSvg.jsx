import Heart from '../../assets/svgComponents/Heart';
import CommentsSvg from '../../assets/svgComponents/Comments';
import MessagesSvg from '../../assets/svgComponents/Messages';
import SaveSvg from '../../assets/svgComponents/Save';
import { useDispatch, useSelector } from 'react-redux';
import { Endpoint } from '../../constants';
import { client } from '../../services/client';
import { addLike, removeLike } from '../../redux/slices/likesSlice';
import { useContext } from 'react';
import TextareaContext from '../../context/TextareaProvider';
import { useLocation } from 'react-router-dom';

const LineWithSvg = ({ postId }) => {

  const { focusTextarea } = useContext(TextareaContext);
   const isOpenModal = useSelector((state) => state.modal.isContentActive)

  const dispatch = useDispatch();

  const likes = useSelector((state) => state?.like?.likes);
  const username = useSelector((state) => state?.user?.info?.username);

  const isPostLiked = likes.find((el) => el.authorUsername === username);

  const handleClick = async () => {
    try {
      let response = null;
      if (!isPostLiked) {
        response = await client.sendPost(Endpoint.LIKE, {
          postId: postId,
        });
        dispatch(addLike({ authorUsername: username }));
      } else {
        response = await client.sendDelete(`${Endpoint.LIKE}?postId=${postId}`);
        dispatch(removeLike(username));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex justify-between w-full">
      <div className="flex gap-4">
        <button onClick={handleClick}>
          <Heart isPostLiked={isPostLiked} />
        </button>
        <button onClick={isOpenModal && focusTextarea}>
        <CommentsSvg />
        </button>
        <MessagesSvg />
      </div>
      <div>
        <SaveSvg />
      </div>
    </div>
  );
};

export default LineWithSvg;
