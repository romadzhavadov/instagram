import { createSlice } from '@reduxjs/toolkit';
import { Endpoint } from '../../constants';
import { client } from '../../services/client';

const initialState = {
  posts: [],
};

const allPostsSlice = createSlice({
  name: 'posts',
  initialState: initialState,
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload;
    },
  },
});

export const getPosts = () => async (dispatch) => {
  try {
    const response = await client.sendGet(Endpoint.FEED);
    const data = response.data;
    dispatch(setPosts(data));
  } catch (error) {
    console.log(error);
  }
};

export const { setPosts } = allPostsSlice.actions;

export default allPostsSlice.reducer;
