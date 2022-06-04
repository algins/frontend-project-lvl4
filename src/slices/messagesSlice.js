import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages(state, { payload }) {
      state.messages = payload;
    },
    addMessage: (state, { payload }) => {
      state.messages = [payload, ...state.messages];
    },
  },
});

export const { actions } = messagesSlice;

export default messagesSlice.reducer;
