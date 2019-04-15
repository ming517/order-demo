import Vue from 'vue';
import Vuex from 'vuex';
import health from './stores/health';
import order from './stores/order';
import item from './stores/item';
import cart from './stores/cart';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    health,
    order,
    item,
    cart,
  },
});
