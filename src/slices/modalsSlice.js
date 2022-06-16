import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modalInfo: {
    type: null,
    data: null,
  },
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    showModal: (state, { payload }) => ({
      ...state,
      modalInfo: payload,
    }),
    hideModal: (state) => ({
      ...state,
      modalInfo: {
        type: null,
        data: null,
      },
    }),
  },
});

export const { actions } = modalsSlice;

export default modalsSlice.reducer;
