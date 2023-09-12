import { useDispatch, useSelector } from 'react-redux';
import { openModal, setContentBody } from '../../redux/slices/modalSlice';
import { CONTENT_MODAL_NAME } from '../../constants';
import CommentsContainer from '../CommentsContainer/CommentsContainer.jsx';
import useTheme from '../../hooks/useTheme';
import PostSceletonLoader from '../PostSceletonLoader/PostSceletonLoader';

const UserPostCard = ({ data }) => {
  const { theme } = useTheme();
  const dispatch = useDispatch();

  const handleOpenPost = (id, name) => {
    dispatch(openModal(CONTENT_MODAL_NAME));
    dispatch(setContentBody(<CommentsContainer postId={id} userName={name} />));
  };
  const loading = useSelector((state) => state.user.loading);

  return (
    <>
      <ul
        className={`${
          theme === 'darkTheme' ? 'bg-darkTheme' : 'bg-lightTheme'
        } p-3.5 grid grid-cols-3 gap-1.5 justify-center max-w-screen-lg mx-auto`}
      >
        {loading && (
          <>
            {new Array(6).fill(null).map((el, index) => (
              <PostSceletonLoader key={index} />
            ))}
          </>
        )}
        {data?.map((item) => (
          <li
            key={item.postId}
            className="w-full relative pb-[100%] overflow-hidden"
            onClick={() => handleOpenPost(item.postId, item.authorUsername)}
          >
            <img
              src={item.imageUrl}
              className="absolute inset-x-0 inset-y-0 w-full h-full object-cover hover:opacity-70 cursor-pointer"
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default UserPostCard;
