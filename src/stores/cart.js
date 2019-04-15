import api from '@/helpers/api';

const defaultState = {
  cartItems: [],
  totalPrice: 0,
  loading: false,
};

const mutations = {
  addItem(state, { item, quantity }) {
    const itemToAdd = Object.assign({}, item);

    const exist = state.cartItems.find(cartItem => cartItem.id === itemToAdd.id);

    if (exist) {
      exist.quantity += quantity;
      exist.total_price = exist.unit_price * exist.quantity; // recalculate
    } else {
      itemToAdd.total_price = itemToAdd.unit_price * quantity;
      itemToAdd.quantity = quantity;
      state.cartItems.push(itemToAdd);
    }

    state.totalPrice = state.cartItems.reduce((total, cartItemReduce) => {
      const newTotal = total + cartItemReduce.total_price;
      return newTotal;
    }, 0);
  },
  clear(state) {
    state.cartItems = [];
    state.totalPrice = 0;
  },
  setLoading(state, isLoading) {
    state.loading = isLoading;
  },
};

const actions = {
  async checkout({ commit, state }) {
    commit('setLoading', true);
    await api.post('/orders/create', {
      items: state.cartItems,
    });
    commit('setLoading', false);
    return true;
  },
};

const getters = {
  cartItems(state) {
    return state.cartItems;
  },
  totalPrice(state) {
    return state.totalPrice;
  },
  checkingOut(state) {
    return state.loading;
  },
};

export default {
  namespaced: true,
  state: defaultState,
  getters,
  mutations,
  actions,
};
