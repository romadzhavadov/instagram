import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_MODAL_NAME, CONTENT_MODAL_NAME } from '../../constants';

const initialValue = {
  isContentActive: false,
  isDefaultActive: false,
  confirmButton: null,
  defaultBody: '',
  contentBody: null,
  defaultTitle: '',
  contentTitle: '',
};

const modalSlice = createSlice({
  name: 'modal',
  initialState: initialValue,
  reducers: {
    openModal(state, action) {
      if (action.payload === DEFAULT_MODAL_NAME) {
        state.isDefaultActive = true;
      }
      if (action.payload === CONTENT_MODAL_NAME) {
        state.isContentActive = true;
      }
    },
    closeModal(state, action) {
      if (action.payload === DEFAULT_MODAL_NAME) {
        state.isDefaultActive = false;
        state.defaultBody = null;
        state.defaultTitle = '';
      }
      if (action.payload === CONTENT_MODAL_NAME) {
        state.isContentActive = false;
        state.contentBody = null;
        state.contentTitle = '';
      }
      state.confirmButton = null;
    },
    setConfirmButton(state, action) {
      state.confirmButton = action.payload;
    },
    setDefaultBody(state, action) {
      state.defaultBody = action.payload;
    },
    setDefaultTitle(state, action) {
      state.defaultTitle = action.payload;
    },
    setContentBody(state, action) {
      state.contentBody = action.payload;
    },
    setContentTitle(state, action) {
      state.contentTitle = action.payload;
    },
  },
});

export const {
  openModal,
  closeModal,
  setConfirmButton,
  setDefaultBody,
  setDefaultTitle,
  setContentBody,
  setContentTitle,
} = modalSlice.actions;
export default modalSlice.reducer;
