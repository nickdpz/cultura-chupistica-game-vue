const mutations = {
  SET_USERS(stateUsers, payload) {
    stateUsers.users = payload;
  },
  ADD_USERS(stateUsers, payload) {
    stateUsers.users = [...stateUsers.users, ...payload];
  },
  GET_USER(stateUsers, payload) {
    stateUsers.product = stateUsers.users.find(item => item === payload);
  },
};

export default mutations;
