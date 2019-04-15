<template>
  <div class="home">
    <!-- <button class="btn btn-primary">Create</button> -->
    <router-link to="/create" class="btn btn-primary">Create</router-link>
    <div class="table-wrapper">
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Order ID</th>
            <th scope="col">No. Items</th>
            <th scope="col">Total Price</th>
            <th scope="col">Status</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="orders.length === 0 || loading">
            <tr>
              <td colspan="5">
                <template v-if="loading">
                  <spinner :show="loading"/>
                </template>

                <template v-else>
                  <span v-if="hasError">
                    Something is not working.
                  </span>
                  <span v-else>
                    No orders
                  </span>
                </template>
              </td>
            </tr>
          </template>

          <template v-else>
            <tr v-for="order in orders" :key="order.id">
              <td>
                <router-link :to="getOrderRouteLink(order)">
                  {{ order.id }}
                </router-link>
              </td>
              <td>{{ order.items.length }}</td>
              <td>{{ formatPrice(order.total_price) }} {{ order.currency.toUpperCase() }}</td>
              <td :class="statusCls(order.status)">{{ order.status.toUpperCase() }}</td>
              <td>{{ order.created_at }}</td>
            </tr>
          </template>

        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import numeral from 'numeral';
import Spinner from '@/components/Spinner.vue';

export default {
  created() {
    this.getList();
  },
  methods: {
    formatPrice(price) {
      return numeral(price).format('0.00');
    },
    statusCls(status) {
      switch (status) {
        case 'created':
        case 'confirmed':
          return 'text-info';

        case 'delivered':
          return 'text-success';

        case 'cancelled':
          return 'text-danger';

        default:
          return '';
      }
    },
    getOrderRouteLink(order) {
      return {
        name: 'order-details',
        params: {
          id: order.id,
        },
      };
    },
    ...mapActions({
      getList: 'order/getList',
    }),
  },
  computed: {
    ...mapGetters({
      orders: 'order/orders',
      loading: 'order/loading',
      hasError: 'order/hasError',
    }),
  },
  components: {
    Spinner,
  },
};
</script>

<style>
.home {
  padding: 10px;
}

.table-wrapper {
  text-align: center;
  padding-top: 10px;
}

</style>
