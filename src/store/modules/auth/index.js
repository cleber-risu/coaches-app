import mutations from './mutatios.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
  state() {
    return {
      userId: null,
      token: null,
      didAutoLogout: false,
    };
  },
  mutations,
  actions,
  getters,
};
