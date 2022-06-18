import { io } from 'socket.io-client';
import store from './slices/index.js';
import { actions as channelsActions } from './slices/channelsSlice.js';
import { actions as messagesActions } from './slices/messagesSlice.js';

const socket = io();

socket.on('newMessage', (payload) => {
  store.dispatch(messagesActions.newMessage(payload));
});

socket.on('newChannel', (payload) => {
  store.dispatch(channelsActions.newChannel(payload));
});

socket.on('removeChannel', (payload) => {
  store.dispatch(channelsActions.removeChannel(payload));
});

socket.on('renameChannel', (payload) => {
  store.dispatch(channelsActions.renameChannel(payload));
});

const addMessage = async (message, cb) => socket.emit('newMessage', message, cb);
const addChannel = async (channel, cb) => socket.emit('newChannel', channel, cb);
const removeChannel = async (id, cb) => socket.emit('removeChannel', { id }, cb);
const renameChannel = async (id, name, cb) => socket.emit('renameChannel', { id, name }, cb);

export default {
  addMessage,
  addChannel,
  removeChannel,
  renameChannel,
};
