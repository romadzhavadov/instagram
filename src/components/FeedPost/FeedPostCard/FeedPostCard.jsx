import PropTypes from 'prop-types';
import '../FeedPostCard.css';
import useTheme from '../../../hooks/useTheme';
import LineWithSvgСopy from '../../LineWithSvg/LineWithSvgСopy';
import CommentsForm from '../../../forms/CommentsForm/CommentsForm';
import { getPostDate } from '../../../utils/getPostDate';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { openModal, setContentBody } from '../../../redux/slices/modalSlice';
import { CONTENT_MODAL_NAME } from '../../../constants';
import CommentsContainer from '../../CommentsContainer/CommentsContainer';

const FeedPostCard = ({
  authorUsername,
  caption,
  comments,
  imageUrl,
  likes,
  location,
  postId,
  timestamp,
}) => {

  const { theme } = useTheme();
  const dispatch = useDispatch();
  const [likesAmount, setLikesAmount] = useState(0);
  const [commentsAmount, setCommentsAmount] = useState(0);

  const handleOpenPost = () => {
    dispatch(openModal(CONTENT_MODAL_NAME));
    dispatch(setContentBody(<CommentsContainer postId={postId} userName={authorUsername} />));
  };

  const viewCommentsBtnText = `
  View ${commentsAmount > 1 ? 'all ' : ''}${commentsAmount} comment${commentsAmount > 1 ? 's' : ''
    }`;
  const likesText = `${likesAmount} like${likesAmount > 1 ? 's' : ''}`;

  useEffect(() => {
    setLikesAmount(likes?.length);
    setCommentsAmount(comments?.length);
  }, []);

  return (
    <>
      <div
        className={`mx-auto border-b mb-5 ${theme === 'darkTheme' ? 'bg-darkTheme text-white' : 'bg-lightTheme text-black'
          }`}
      >
        <div className="flex items-center gap-2 mb-3">
          <img
            src={`https://i.pravatar.cc/250?v=${Math.random()}`}
            alt="avatar"
            className="h-10 w-10 rounded-full"
          />
          <div className="flex flex-col text-sm">
            <div className="flex gap-1">
              <span className="delimeter flex items-center">{authorUsername}</span>
              <span>{getPostDate(timestamp, true)}</span>
            </div>
            {location && <p>{location}</p>}
          </div>
          </div>
          <div className="mb-3">
            <img src={imageUrl} alt="post" width="470" className="rounded-md" />
          </div>
          {/* {likes.map((el) => (
          <p key={el.authorUsername}>{el.authorUsername}</p>
        ))} */}

          <div className="text-sm">
            <LineWithSvgСopy
              postId={postId}
              setLikesAmount={setLikesAmount}
              handleOpenPost={handleOpenPost}
            />
            <p className="my-1">{likesText}</p>
            {caption && (
              <p className="mb-1">
                <span className="font-bold mr-1">{authorUsername}</span>
                {caption}
              </p>
            )}
            {comments.length ? (
              <button className="text-left mb-1" onClick={handleOpenPost}>
                {viewCommentsBtnText}
              </button>
            ) : null}
            <CommentsForm
              postId={postId}
              shouldOpenModal={true}
              authorUsername={authorUsername}
              setCommentsAmount={setCommentsAmount}
            />
          </div> 
        </div>
      </>
      )
      }




// const postTime = new Date(timestamp);
// const nowDate = new Date();
// const timer = (nowDate - postTime) / (60 * 60 * 1000);

// const currentPostTime = () => {
        //   if(timer > 8760 ) {
      //     return `${Math.round(timer / 24 / 365)} y`
        //   }
        //   if(timer > 48 ) { * /}
        //     return `${Math.round(timer / 24)} d`
        //   }
        //   return (`${Math.round(timer)} h`)
        // }

        // const {theme} = useTheme();

        // return (
        //   <>
        //     <div className={`post-card ${theme === 'darkTheme' ? 'bg-darkTheme' : 'bg-lightTheme'}`}>
        //       <div className="postcard-header">
        //         <img
        //           src="https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg"
        //           alt="some photo"
        //         />
        //         <div className="header_1">
        //           <div className="user-info">
        //             <span>{authorUsername}</span>
        //             <span>{currentPostTime()}</span>
        //           </div>
        //           <div>
        //             <p>{location}</p>
        //           </div>
        //         </div>
        //         <button className="delete-btn">X</button>
        //       </div> 
         //       <div className="image-container">
        //         <img src={imageUrl} alt="#" width="100%" height="auto" />
        //       </div>
        //    <PostCardActive /> 
        //      <LineWithSvg postId={postId} likedUser={likes} /> 
        //       <LineWithSvgСopy postId={postId} />
        //       {likes.map((el) => <p key={el.authorUsername}>{el.authorUsername}</p>)}

        //       <CommentsForm postId={postId} />
        //     </div> 
        //   </>
        // ); 
    

      export default FeedPostCard;

            FeedPostCard.propTypes = {
              authorUsername: PropTypes.string,
            caption: PropTypes.string,
            comments: PropTypes.array,
            imageUrl: PropTypes.string,
            likes: PropTypes.array,
            location: PropTypes.string,
            postId: PropTypes.string,
            timestamp: PropTypes.number,
};
