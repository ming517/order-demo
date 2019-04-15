
const FAKE_ITEMS = [
  {
    id: 1,
    name: 'Item A',
    unit_price: 10.00,
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero et esse, minus fugiat, quis dicta provident sed numquam vitae.',
  },
  {
    id: 2,
    name: 'Item B',
    unit_price: 20.00,
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero et esse, minus fugiat, quis dicta provident sed numquam vitae.',
  },
  {
    id: 3,
    name: 'Item C',
    unit_price: 30.00,
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero et esse, minus fugiat, quis dicta provident sed numquam vitae.',
  },
  {
    id: 4,
    name: 'Item D',
    unit_price: 40.00,
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero et esse, minus fugiat, quis dicta provident sed numquam vitae.',
  },
  {
    id: 5,
    name: 'Item E',
    unit_price: 50.00,
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero et esse, minus fugiat, quis dicta provident sed numquam vitae.',
  },
  {
    id: 6,
    name: 'Item F',
    unit_price: 60.00,
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero et esse, minus fugiat, quis dicta provident sed numquam vitae.',
  },
];

const defaultState = {
  items: [],
  isLoading: false,
};

const mutations = {
  setList(state, items) {
    state.items = items;
  },
  setLoading(state, isLoading) {
    state.isLoading = isLoading;
  },
  clear(state) {
    state.items = [];
  }
};

const actions = {
  getList({ commit }) {
    commit('clear');
    commit('setLoading', true);
    setTimeout(() => {
      commit('setList', FAKE_ITEMS);
      commit('setLoading', false);
    }, 2000); // mock api call to get items
  },
};

const getters = {
  items(state) {
    return state.items;
  },
  loading(state) {
    return state.isLoading;
  },
};

export default {
  namespaced: true,
  state: defaultState,
  getters,
  mutations,
  actions,
};
