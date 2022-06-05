// @ts-check

const host = '';
const prefix = 'api/v1';

export default {
  api: {
    dataPath: () => [host, prefix, 'data'].join('/'),
    loginPath: () => [host, prefix, 'login'].join('/'),
  },
  web: {
    homePath: () => [host, ''].join('/'),
    loginPath: () => [host, 'login'].join('/'),
    signupPath: () => [host, 'signup'].join('/'),
  },
};
