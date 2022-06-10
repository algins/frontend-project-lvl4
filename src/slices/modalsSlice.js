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
    setModalInfo(state, { payload }) {
      state.modalInfo = payload;
    },
  },
});

export const { actions } = modalsSlice;

export default modalsSlice.reducer;
