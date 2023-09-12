import { FeedPostsContainer } from '../../components/FeedPost/FeedPostsContainer/FeedPostsContainer';
import Footer from '../../components/Footer/Footer';
import UserCard from '../../components/UserCard/UserCard';

const Home = () => {
  return (
    <div className="flex mx-auto justify-between" style={{ maxWidth: '939px' }}>
      <FeedPostsContainer />

      <aside className="flex flex-col" style={{ maxWidth: '319px' }}>
        <UserCard />
        <Footer />
      </aside>
    </div>
  );
};

export default Home;
