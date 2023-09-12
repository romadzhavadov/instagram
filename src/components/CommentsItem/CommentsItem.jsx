import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import Heart from '../../assets/svgComponents/Heart.jsx';
import ThreeDotsSvg from '../../assets/svgComponents/ThreeDotsSvg.jsx';
import { CONTENT_MODAL_NAME, DEFAULT_MODAL_NAME, Endpoint } from '../../constants/index.js';
import { closeModal, openModal, setDefaultBody } from '../../redux/slices/modalSlice.js';
import { useContext, useState } from 'react';
import AuthContext from '../../context/AuthProvider.jsx';
import { client } from '../../services/client.js';
import { NavLink } from 'react-router-dom';

const CommentsItem = ({ commentData, setComments }) => {
  const { commentId, userPhoto, authorUsername, text } = commentData;

  const dispatch = useDispatch();

  const likes = Math.round(Math.random() * 50);

  const [isPostLiked, setIsPostLiked] = useState(false);
  const handleClickLike = () => setIsPostLiked(!isPostLiked);

  const {
    auth: { user },
  } = useContext(AuthContext);

  const handleCloseModal = () => {
    dispatch(closeModal(DEFAULT_MODAL_NAME));
  };

  const handleDeleteComment = async () => {
    try {
      const response = await client.sendDelete(Endpoint.COMMENT, `commentId=${commentId}`);
      setComments((draft) => {
        const index = draft.findIndex((el) => el.commentId === commentId);
        draft.splice(index, 1);
      });
    } catch (err) {
      console.error('Error from CommentsItem delete comment request: ', err);
    } finally {
      handleCloseModal();
    }
  };

  const handleOpenModal = () => {
    const isAuthor = user === authorUsername;

    dispatch(openModal(DEFAULT_MODAL_NAME));
    dispatch(
      setDefaultBody(
        <button
          className="font-bold text-xl text-redText"
          onClick={isAuthor ? handleDeleteComment : handleCloseModal}
        >
          {isAuthor ? 'Delete' : 'Complain'}
        </button>,
      ),
    );
  };

  return (
    <li className="grid grid-cols-comment gap-x-4 items-start group" >
      <NavLink
        to={`/user/${authorUsername}`}
        className="block w-8 h-8"
        onClick={() => dispatch(closeModal(CONTENT_MODAL_NAME))}
      >
        <img
          className="block rounded-full"
          src={userPhoto ? userPhoto : `https://i.pravatar.cc/250?v=${Math.random()}`}
          alt={authorUsername}
          width="32px"
          height="32px"
        />
      </NavLink>
      <div className=" text-start">
        <NavLink
          to={`/user/${authorUsername}`}
          className="mr-1.5 text-[13px] font-semibold"
          onClick={() => dispatch(closeModal(CONTENT_MODAL_NAME))}
        >
          {authorUsername}
        </NavLink>
        <span className="text-sm/[17px]">{text}</span>
        <div className="flex gap-x-3 text-xs text-lightText mt-1.5">
          <span>{Math.round(Math.random() * 24) + 'h'}</span>
          {likes > 0 && likes !== 1 && <span>{`${likes} likes`}</span>}
          {likes === 1 && <span>{`${likes} like`}</span>}
          <span>Reply</span>
          <div className="relative">
            <button
              className="absolute -top-3 -left-0.5 cursor-pointer p-2 opacity-0 group-hover:opacity-100 duration-300"
              onClick={handleOpenModal}
            >
              <ThreeDotsSvg />
            </button>
          </div>
        </div>
      </div>
      <button className="mt-2" onClick={handleClickLike}>
        <Heart width="12" height="12" isPostLiked={isPostLiked} />
      </button>
    </li>
  );
};

CommentsItem.protoTypes = {
  commentData: PropTypes.object,
};

CommentsItem.defaultProps = {
  commentData: {},
};

export default CommentsItem;
