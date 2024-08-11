export default {
  async contactCoach(context, payload) {
    const newRequest = {
      userEmail: payload.email,
      message: payload.message,
    };

    const url = `https://vue-http-demo-86775-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`;

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(newRequest),
    });

    const data = await response.json();

    if (!response.ok) {
      const error = new Error(response.message || 'Failed to send request.');
      throw error;
    }

    newRequest.id = data.name;
    newRequest.coachId = payload.coachId;

    context.commit('addRequest', newRequest);
  },
  async fetchRequests(context) {
    const coachId = context.rootGetters.userId;
    const url = `https://vue-http-demo-86775-default-rtdb.firebaseio.com/requests/${coachId}.json`;
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      const error = new Error(response.message || 'Failed to fetch requests.');
      throw error;
    }

    const requests = [];
    for (const key in data) {
      const request = {
        id: key,
        coachId: coachId,
        userEmail: data[key].userEmail,
        message: data[key].message,
      };
      requests.push(request);
    }

    context.commit('setRequests', requests);
  },
};
