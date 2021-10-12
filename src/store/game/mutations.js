const mutations = {
  SET_USERS(stateUsers, payload) {
    stateUsers.users = payload;
  },
  ADD_USERS(stateUsers, payload) {
    stateUsers.users = [...stateUsers.users, ...payload];
  },
  UPDATE_USER_POINTS(stateUsers, payload) {
    const users = stateUsers.users;
    users[payload.i] = {
      ...stateUsers.users[payload.i],
      points: stateUsers.users[payload.i].points + payload.points,
    };
    stateUsers.users = users.sort((a, b) => b.id - a.id);
  },
};

export default mutations;
