// @ts-check

const host = '';
const prefix = 'api/v1';

export default {
  api: {
    channelsPath: () => [host, prefix, 'channels'].join('/'),
    channelPath: (id) => [host, prefix, 'channels', id].join('/'),
    channelMessagesPath: (id) => [host, prefix, 'channels', id, 'messages'].join('/'),
    loginPath: () => [host, prefix, 'login'].join('/'),
  },
  web: {
    homePath: () => [host, ''].join('/'),
    loginPath: () => [host, 'login'].join('/'),
  },
};
