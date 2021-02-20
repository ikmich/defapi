const _config = {
  isDev() {
    return process.env.NODE_ENV === 'development';
  }
};

export default _config;
