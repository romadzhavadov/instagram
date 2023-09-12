import Smile from '../../assets/svgComponents/Smile';
import styles from '../CommentsContainer/CommentsContainer.module.scss'; // без цього імпорта скрол видимий
import CommentsItem from '../CommentsItem/CommentsItem';
import CommentsForm from '../../forms/CommentsForm/CommentsForm';
import { useDispatch, useSelector } from 'react-redux';
import LineWithSvg from '../LineWithSvg/LineWithSvg';
import { useEffect, useState } from 'react';
import { client } from '../../services/client.js';
import { useImmer } from 'use-immer';
import { RotatingLines } from 'react-loader-spinner';
import ImgPreloader from '../ImgPreloader/ImgPreloader.jsx';
import { setLikes } from '../../redux/slices/likesSlice';
import useTheme from '../../hooks/useTheme';
import { CONTENT_MODAL_NAME, DEFAULT_MODAL_NAME, Endpoint } from '../../constants';
import ThreeDotsSvg from '../../assets/svgComponents/ThreeDotsSvg.jsx';
import {
  closeModal,
  openModal,
  setConfirmButton,
  setDefaultBody,
  setDefaultTitle,
} from '../../redux/slices/modalSlice.js';
import { deletePost } from '../../redux/slices/userSlice.js';
import { getPostDate } from '../../utils/getPostDate';

function CommentsContainer({ postId, userName }) {
  const dispatch = useDispatch();

  const [post, setPost] = useState({});
  const [comments, setComments] = useImmer([]);
  const [isLoading, setIsLoading] = useState(true);

  const likes = useSelector((state) => state.like.likes);

  useEffect(() => {
    (async () => {
      try {
        const response = await client.sendGet(Endpoint.POST, `postId=${postId}`);
        const data = response.data;
        setPost(data);
        setComments(data.comments);
        setIsLoading(false);
        dispatch(setLikes(data.likes));
      } catch (err) {
        console.error('Error from CommentsContainer fetching post: ', err);
      }
    })();
  }, []);

  const handleDeletePost = async () => {
    try {
      await client.sendDelete(Endpoint.POST, `postId=${postId}`);
      dispatch(deletePost(postId));
    } catch (err) {
      console.error('Error from CommentsContainer delete post request: ', err);
    } finally {
      dispatch(closeModal(DEFAULT_MODAL_NAME));
      dispatch(closeModal(CONTENT_MODAL_NAME));
    }
  };

  const handleOpenModalDelete = () => {
    dispatch(setDefaultTitle('Delete post?'));
    dispatch(setDefaultBody('Are you sure you want to delete this post?'));
    dispatch(
      setConfirmButton(
        <button className="font-bold text-xl text-redText py-6 w-full" onClick={handleDeletePost}>
          Delete
        </button>,
      ),
    );
  };

  const handleOpenModal = () => {
    dispatch(openModal(DEFAULT_MODAL_NAME));
    dispatch(
      setDefaultBody(
        <button className="font-bold text-xl text-redText" onClick={handleOpenModalDelete}>
          Delete post
        </button>,
      ),
    );
  };

  const liked = likes.map((user) => user.authorUsername).shift();

  const likedAvatar = likes
    .map((user) => `https://i.pravatar.cc/250?v=${Math.random()}`)
    .slice(0, 3);

  const { theme } = useTheme();

  return (
      <div
        className={`relative flex rounded-sm ${
          theme === 'darkTheme' ? 'bg-darkTheme' : 'bg-lightTheme'
        } overflow-hidden divide-x`}
        style={{ height: 'calc(100vh - 40px)', width: 'calc(100vw - 300px)' }}
      >
        <div className="w-1/2 h-full flex flex-grow justify-center items-center">
          {/*two variants*/}
          {isLoading ? (
            <ImgPreloader />
          ) : (
            // {isLoading ? <RotatingLines width='50' strokeColor='grey'/>
            <img
              src={post?.imageUrl}
              alt="post"
              className="inset-0 w-full object-cover rounded-sm h-auto"
              loading="lazy"
            ></img>
          )}
        </div>
        <div className="flex flex-col w-1/2 divide-y min-w-[330px] max-w-[460px]">
          <div className="relative flex items-center gap-4 py-2 px-4">
            <img
              className="block rounded-full"
              src={`https://i.pravatar.cc/250?v=${Math.random()}`}
              alt={userName}
              width="32px"
              height="32px"
            />
            <a href="#" className=" mr-1.5 text-[13px] font-semibold">
              {userName}
            </a>
            <button
              type="button"
              className="absolute top-1/2 right-4 -translate-y-1/2"
              onClick={handleOpenModal}
            >
              <ThreeDotsSvg fill={theme === 'darkTheme' ? '#f5f5f5' : '#2c2c2c'} />
            </button>
          </div>
          {isLoading ? (
            <div className="w-full h-full flex justify-center items-center">
              <RotatingLines width="50" strokeColor="grey" />
            </div>
          ) : comments.length !== 0 ? (
            <div className="w-full h-full p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-black scrollbar-track-transparent">
              <ul className="flex flex-col-reverse justify-end gap-y-4">
                {comments.map((item) => (
                  <CommentsItem key={item.commentId} commentData={item} setComments={setComments} />
                ))}
              </ul>
            </div>
          ) : (
            <div className="flex flex-col h-full justify-center items-center">
              <h3 className="text-lg">There are no comments yet</h3>
              <p className="text-xs">Start a conversation</p>
            </div>
          )}

          <div className="grid grid-cols-1 gap-2 justify-items-start text-xs p-4 pb-2 bottom-20">
            <LineWithSvg postId={postId} />
            {likes.length > 0 && (
              <div className="flex items-center gap-2">
                <div className="flex w-full-content relative space-x-[-8px] overflow-hidden">
                  {likedAvatar.map((avatarUrl) => (
                    <img
                      key={avatarUrl}
                      className="block rounded-full w-8 h-8 "
                      src={avatarUrl}
                      alt={`Avatar`}
                    />
                  ))}
                </div>
                Liked by <span className="font-bold">{liked}</span>
                {likes.length > 1 && `and ${likes.length - 1} others`}
              </div>
            )}

            <p className="text-lightText">
              {isLoading ? (
                <RotatingLines width="20" strokeColor="grey" />
              ) : (
                getPostDate(post?.timestamp)
              )}
            </p>
          </div>
          <div className="flex flex-row items-start space-x-5  h-16 p-4 bottom-0">
            <Smile width="24" height="24" />
            <CommentsForm postId={postId} setComments={setComments} />
          </div>
        </div>
      </div>
  );
}

export default CommentsContainer;
