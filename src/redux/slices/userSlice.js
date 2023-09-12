import { createSlice } from '@reduxjs/toolkit';
import { AUTH_LS_KEY, Endpoint } from '../../constants';
import { client } from '../../services/client';

const initialValue = {
  info: {
    username: '',
    firstName: '',
    lastName: '',
    posts: [],
    subscriptions: [],
    subscribers: [],
  },
  loading: true,
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialValue,
  reducers: {
    setUser(state, action) {
      state.info = action.payload;
    },
    setPosts(state, action) {
      state.info.posts = [...state.info.posts, action.payload];
    },
    deletePost(state, action) {
      state.info.posts = state.info.posts.filter((el) => el.postId !== action.payload);
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setSubscribtions(state, action) {
      const index = state.info.subscriptions.findIndex(
        (user) => user.username === action.payload.username,
      );
      if (index !== -1) {
        state.info.subscriptions.splice(index, 1);
      } else {
        state.info.subscriptions.push(action.payload);
      }
    },
  },
});

export const { setUser, setPosts, deletePost, setLoading, setSubscribtions } = userSlice.actions;

export const setUserInfo = () => async (dispatch) => {
  try {
    const { user } = JSON.parse(localStorage.getItem(AUTH_LS_KEY));
    const response = await client.sendGet(`${Endpoint.USER}?username=${user}`);
    const data = response.data;
    dispatch(setUser(data));
    dispatch(setLoading(false));
  } catch (err) {
    console.warn(err);
  }
};

export default userSlice.reducer;
