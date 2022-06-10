import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  currentChannelId: null,
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels(state, { payload }) {
      state.channels = payload;
    },
    setCurrentChannelId(state, { payload }) {
      state.currentChannelId = payload;
    },
    newChannel: (state, { payload }) => {
      state.channels = [...state.channels, payload];
      state.currentChannelId = payload.id;
    },
    renameChannel: (state, { payload }) => {
      const channel = state.channels.find(({ id }) => id === payload.id);
      channel.name = payload.name;
    },
    removeChannel: (state, { payload }) => {
      state.channels = state.channels.filter(({ id }) => id !== payload.id);
      state.currentChannelId = state.channels[0].id;
    },
  },
});

export const { actions } = channelsSlice;

export default channelsSlice.reducer;
