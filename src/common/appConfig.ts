const appConfig = {
  isDev() {
    return process.env.NODE_ENV === 'development';
  }
};

export default appConfig;
