import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../../redux/slices/allPostsSlise';
import FeedPostCard from '../FeedPostCard/FeedPostCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import ImgPreloader from '../../ImgPreloader/ImgPreloader.jsx';
import { useState } from 'react';

export const FeedPostsContainer = () => {
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const posts = useSelector((state) => state.posts.posts);

   // InfiniteScroll states
  const [isShownPosts, setIsShownPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState(0);
  const countPostFetched = 3;

  useEffect(() => {
    const showedPosts = posts.slice(0, countPostFetched);
    setIsShownPosts(showedPosts);
  }, [posts])

  // InfiniteScroll load more ...
  const fetchMorePosts = () => {
    const nextPosts = currentPost + countPostFetched;
    const endPost = nextPosts + countPostFetched;

    const nextShowPosts = posts.slice(nextPosts, endPost);

    setIsShownPosts((prev) => [...prev, ...nextShowPosts]);
    setCurrentPost(nextPosts);
  };

  return (
    <div className="w-full">
      <InfiniteScroll
        dataLength={isShownPosts.length}
        next={fetchMorePosts}
        hasMore={isShownPosts.length < posts.length}
        loader={<ImgPreloader />}
        showLoader={true}
      >
      <ul className="mx-auto" style={{ maxWidth: '470px' }}>
        {isShownPosts &&
          isShownPosts?.map((el) => (
            <li key={el.postId}>
              <FeedPostCard {...el} />
            </li>
          ))}
      </ul>
      </InfiniteScroll>
    </div>
  );
};
