import api from '@/helpers/api';

const defaultState = {
  orderStatus: false,
  paymentStatus: false,
};

const mutations = {
  setOrderStatus(state, status) {
    state.orderStatus = status;
  },

  setPaymentStatus(state, status) {
    state.paymentStatus = status;
  },
};

const actions = {
  async checkOrderHealth({ commit }) {
    try {
      const { data } = await api.get('/health/order');
      commit('setOrderStatus', data.healthy);
    } catch (e) {
      commit('setOrderStatus', false);
    }
  },

  async checkPaymentHealth({ commit }) {
    try {
      const { data } = await api.get('/health/payment');
      commit('setPaymentStatus', data.healhty);
    } catch (e) {
      commit('setPaymentStatus', false);
    }
  },
};

const getters = {
  orderStatus(state) {
    return state.orderStatus;
  },
  paymentStatus(state) {
    return state.paymentStatus;
  },
  orderStatusText(state) {
    return state.orderStatus ? 'ONLINE' : 'OFFLINE';
  },
  paymentStatusText(state) {
    return state.paymentStatus ? 'ONLINE' : 'OFFLINE';
  },
};

export default {
  namespaced: true,
  state: defaultState,
  mutations,
  actions,
  getters,
};
