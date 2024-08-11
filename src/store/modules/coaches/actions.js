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

    const url = `https://vue-http-demo-86775-default-rtdb.firebaseio.com/coaches/${userId}.json`;

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

  async loadCoaches(context) {
    const url = `https://vue-http-demo-86775-default-rtdb.firebaseio.com/coaches.json`;
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      const error = new Error(data.message || 'Failed to fetch!');
      throw error;
    }

    const coaches = [];

    for (const key in data) {
      const coach = {
        id: key,
        firstName: data[key].firstName,
        lastName: data[key].lastName,
        description: data[key].description,
        hourlyRate: data[key].hourlyRate,
        areas: data[key].areas,
      };
      coaches.push(coach);
    }

    context.commit('setCoaches', coaches);
  },
};
