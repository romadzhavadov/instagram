import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './slices/modalSlice';
import userSlice from './slices/userSlice';
import allPostsSlice from './slices/allPostsSlise';
import likesSlice from './slices/likesSlice';

const store = configureStore({
  reducer: {
    modal: modalReducer,
    user: userSlice,
    like: likesSlice,
    posts: allPostsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
