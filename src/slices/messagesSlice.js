import { createSlice } from '@reduxjs/toolkit';
import { actions as channelsActions } from './channelsSlice.js';

const initialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: (state, { payload }) => ({
      ...state,
      messages: payload,
    }),
    newMessage: (state, { payload }) => ({
      ...state,
      messages: [...state.messages, payload],
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(channelsActions.removeChannel, (state, action) => {
      const removedChannelId = action.payload;
      return {
        ...state,
        messages: state.messages.filter(({ channelId }) => channelId !== removedChannelId),
      };
    });
  },
});

export const { actions } = messagesSlice;

export default messagesSlice.reducer;
