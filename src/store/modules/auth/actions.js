export default {
  async login(context, payload) {
    return context.dispatch('auth', { ...payload, mode: 'login' });
  },

  async signup(context, payload) {
    return context.dispatch('auth', { ...payload, mode: 'signup' });
  },

  async auth(context, payload) {
    const mode = payload.mode;

    const apiKey = process.env.VUE_APP_API_kEY;
    let url = `${process.env.VUE_APP_URL_LOGIN}?key=${apiKey}`;

    if (mode === 'signup') {
      url = `${process.env.VUE_APP_URL_SIGNUP}?key=${apiKey}`;
    }

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
      const error = new Error(
        responseData.message || 'Failed to authenticate. Check you login data.'
      );
      throw error;
    }

    localStorage.setItem('token', responseData.idToken);
    localStorage.setItem('userId', responseData.localId);

    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
      tokenExpiration: responseData.expiresIn,
    });
  },

  tryLogin(context) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (token && userId) {
      context.commit('setUser', { token, userId, tokenExpiration: null });
    }
  },

  logout(context) {
    context.commit('setUser', {
      token: null,
      userId: null,
      tokenExpiration: null,
    });
  },
};
