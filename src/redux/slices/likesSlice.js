import { createSlice } from '@reduxjs/toolkit';

const initialValue = {
    likes: [],
};

const likesSlice = createSlice({
    name: 'likes',
    initialState: initialValue,
    reducers: {
        setLikes(state, action) {
            state.likes = action.payload;
        },
        addLike(state, action) {
            state.likes.push(action.payload);
        },
        removeLike(state, action) {
            state.likes = state.likes.filter((el) => el.authorUsername !== action.payload);
        },
    },
});

export const { addLike, removeLike, setLikes } = likesSlice.actions;

export default likesSlice.reducer;
