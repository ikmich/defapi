const config = {
  isDev() {
    return process.env.NODE_ENV === 'development';
  },
}

export default config;
