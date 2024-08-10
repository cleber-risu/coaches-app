export default {
  async registerCoach({ commit, rootGetters }, data) {
    const userId = rootGetters.userId;
    const coachData = {
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas,
    };

    const url = `https://vue-http-demo-86775-default-rtdb.firebaseio.com/${userId}.json`;

    const response = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify(coachData),
    });

    // const responseData = await response.json();

    if (!response.ok) {
      // error
    }

    commit('registerCoach', {
      ...coachData,
      id: userId,
    });
  },
};
