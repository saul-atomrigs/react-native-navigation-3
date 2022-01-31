handleResponse = async () => {
  const { dispatch } = this.store;
  await axios.interceptors.request.use(config => {
    // Important: request interceptors **must** return the request.
    console.log("refreshToken")
    let user = firebase.auth().currentUser;
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.log("auth changed: ", user)
        user.getIdToken(true).then((token) => {
          setAccessToken(token);
          config.headers.authorization = token;
        }
        );
      } else { console.log("didn't auth change") }
    });
    console.log("req in handle response: ", JSON.stringify(config));
    return config;
  });
  axios.interceptors.response.use(config => config, (err) => {
    if (err.response) {
      const response = err.response;
      const state = this.store.getState();
      if (
        response.status === 401
        && state.auth.isAuthenticated
      ) {
        dispatch(logout());
      }
    }
    return Promise.reject(err);
  });
};