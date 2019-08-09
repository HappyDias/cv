export default {
  namespaced: true,
  state() {
    return {
      dark: false,
      language: "gb",
      show: false
    };
  },
  mutations: {
    set(state, { key, value }) {
      state[key] = value;
    }
  },
  actions: {
    set(context, payload) {
      context.commit("set", payload);
    }
  }
};
