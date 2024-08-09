export default {
  registerCoach({ commit, rootGetters }, data) {
    const coachData = {
      id: rootGetters.userId,
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas,
    };
    commit('registerCoach', coachData);
  },
};
