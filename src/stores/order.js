import api from '@/helpers/api';

const defaultState = {
  orders: [],
  loading: false,
  hasError: false,
};

const mutations = {
  setLoading(state, isLoading) {
    state.loading = isLoading;
  },
  setOrders(state, orders) {
    state.orders = orders;
  },
  setError(state, hasError) {
    state.hasError = hasError;
  },
  setOrder(state, order) {
    if(state.orders.length === 0) {
      state.orders.push(order);
      return;
    }

    state.orders = state.orders.map(ord => {
      if(ord.id === order.id) {
        return order;
      }

      return ord;
    });
  }
};

const getters = {
  orders(state) {
    return state.orders;
  },
  loading(state) {
    return state.loading;
  },
  hasError(state) {
    return state.hasError;
  },
};

const actions = {
  async getList({ commit }) {
    try {
      commit('setLoading', true);
      const { data } = await api.get('/orders');
      commit('setOrders', data.data);
      commit('setLoading', false);
    } catch(e) {
      commit('setLoading', false);
      // just the error to state in this demo to simplify it
      commit('setError', true);
    }
  },
  async get({ commit }, id) {
    try {
      commit('setLoading', true);
      const { data } = await api.get(`/orders/details/${id}`);
      commit('setLoading', false);
      commit('setOrder', data.data);
    } catch (e) {
      console.log(e.response);
    }
  },
  async cancel({ commit }, data) {
    commit('setLoading', true);
    const { data: result } = await api.post('/orders/cancel', data);
    commit('setLoading', false);
    return result;
  }
};

export default {
  namespaced: true,
  state: defaultState,
  mutations,
  getters,
  actions,
};
