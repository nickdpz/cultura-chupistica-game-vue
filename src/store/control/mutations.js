const mutations = {
  UPDATED_SIDEBAR_STATE(stateControl, payload) {
    stateControl.activeSidebar = payload;
  },
  UPDATED_LOADING_STATE(stateControl, payload) {
    stateControl.loading = payload;
  },
  UPDATED_ACTIVE_DARK_MODE(stateControl, payload) {
    stateControl.activeDark = payload;
  },
};

export default mutations;
