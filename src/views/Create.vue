<template>
  <div class="create row">
    <notify ref="notify" class="col-lg-7 fixed-top"/>
    <div class="col-7" >
      <spinner :show="fetchingItems" />
      <div class="row row-custom">
        <div class="card-wrapper col-4" v-for="item in items" :key="item.id">
          <item-card
            :item="item"
            @addToCart="addToCart" />
        </div>
      </div>
    </div>
    <div class="table-wrapper col-5">
      <item-table :items="cartItems" />
      <div class="float-right">
        <button
          class="btn btn-primary"
          type="button"
          @click="placeOrder"
          :disabled="checkingOut || cartItems.length === 0"
        >
          <span
            v-if="checkingOut"
            class="spinner-border spinner-border-sm" role="status" aria-hidden="true"/>
          <span>{{ checkingOut ? 'Checking Out...' : 'Place Order' }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import Swal from 'sweetalert2';
import Spinner from '@/components/Spinner.vue';
import ItemCard from '@/components/ItemCard.vue';
import Notify from '@/components/Notify.vue';
import ItemTable from '@/components/ItemTable.vue';

export default {
  created() {
    this.getItems();
  },
  methods: {
    addToCart(data) {
      this.addItemToCart(data);
      this.$refs.notify.show('Item added to cart', 'success');
    },
    async placeOrder() {
      if (!this.orderServiceHealthy) {
        await this.showServiceDownMsg('order');
        return;
      }

      if (!this.paymentServiceHealthy) {
        await this.showServiceDownMsg('payment');
        return;
      }

      await this.checkout();
      this.clearCart();
      await Swal.fire('Order successfully created', '', 'success');
      this.$router.replace('/');
    },
    showServiceDownMsg(type) {
      Swal.fire('Oops...', `Seems like ${type} service is down at the moment :(`, 'error');
    },
    ...mapActions({
      getItems: 'item/getList',
      checkout: 'cart/checkout',
    }),
    ...mapMutations({
      addItemToCart: 'cart/addItem',
      clearCart: 'cart/clear',
    }),
  },
  computed: {
    ...mapGetters({
      items: 'item/items',
      fetchingItems: 'item/loading',
      cartItems: 'cart/cartItems',
      grandTotal: 'cart/totalPrice',
      checkingOut: 'cart/checkingOut',
      orderServiceHealthy: 'health/orderStatus',
      paymentServiceHealthy: 'health/paymentStatus',
    }),
  },
  components: {
    Spinner,
    ItemCard,
    Notify,
    ItemTable,
  },
};
</script>

<style scoped>
.table-wrapper {
  text-align: center;
}
.card-custom {
  padding: 0px;
}
.card-wrapper {
  padding: 5px;
}
.row-custom {
  margin-left: 0px;
}
.notify {
  display: absolute;
}
</style>
