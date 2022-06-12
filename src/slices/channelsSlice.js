import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  currentChannelId: null,
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels: (state, { payload }) => ({
      ...state,
      channels: payload,
    }),
    setCurrentChannelId: (state, { payload }) => ({
      ...state,
      currentChannelId: payload,
    }),
    newChannel: (state, { payload }) => ({
      ...state,
      channels: [...state.channels, payload],
      currentChannelId: payload.id,
    }),
    renameChannel: (state, { payload }) => {
      const channel = state.channels.find(({ id }) => id === payload.id);
      channel.name = payload.name;
      return {
        ...state,
        channels: state.channels,
      };
    },
    removeChannel: (state, { payload }) => ({
      ...state,
      channels: state.channels.filter(({ id }) => id !== payload.id),
      currentChannelId: state.channels[0].id,
    }),
  },
});

export const { actions } = channelsSlice;

export default channelsSlice.reducer;
