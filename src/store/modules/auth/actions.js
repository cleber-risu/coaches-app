export default {
  login() {},
  async signup(context, payload) {
    const apiKey = 'AIzaSyBa-jSf1SupHCo_g2uZDyzjSonsi7gIiUk';
    const url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + apiKey;

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.log(responseData);
      const error = new Error(
        responseData.message || 'Failed to authenticate. Check you login data.'
      );
      throw error;
    }

    console.log(responseData);

    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
      tokenExpiration: responseData.expiresIn,
    });
  },
};
