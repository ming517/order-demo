<template>
    <div>
      <spinner :show="loading" />
      <template v-if="!loading && !order">
        <h3>Order Not Found</h3>
      </template>

      <template v-if="order && !loading">
        <div>
          <div class="row">
            <div class="col-6">
              <div class="form-group">
                <label class="label">Order ID:</label>
                <span> {{ orderId }}</span>
              </div>

              <div class="form-group">
                <label class="label">Created By:</label>
                <span> {{ creatorName }}</span>
              </div>

              <div class="form-group">
                <label class="label">Created At:</label>
                <span> {{ createdDate }}</span>
              </div>
            </div>

            <div class="col-6">
              <div class="form-group">
                <label class="label">Status:</label>
                <span :class="statusCls()"> {{ status }}</span>
              </div>

              <template v-if="isCancelled">
                <div class="form-group">
                  <label class="label">Cancelled By:</label>
                  <span> {{ cancelledBy }}</span>
                </div>

                <div class="form-group">
                  <label class="label">Cancelled At:</label>
                  <span> {{ cancelledAt }}</span>
                </div>

                <div class="form-group">
                  <label class="label">Reason:</label>
                  <span> {{ cancelledReason }}</span>
                </div>
              </template>
            </div>
          </div>

          <item-table :items="order.items" />
          <div class="float-right">
            <button class="btn btn-danger"

              @click="onCancel"
            >
              Cancel Order
            </button>
          </div>
        </div>
      </template>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Swal from 'sweetalert2';
import ItemTable from '@/components/ItemTable.vue';
import Spinner from '@/components/Spinner.vue';

export default {
  data() {
    return {
      reason: '',
    };
  },
  created() {
    // in real world, the order details should get from API instead
    this.getOrder(this.$route.params.id);
  },
  methods: {
    statusCls() {
      switch (this.status.toLowerCase()) {
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
    async onCancel() {
      const { value: reason } = await Swal.fire({
        title: 'State your reason to cancel',
        input: 'text',
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        confirmButtonText: 'Cancel Order',
        cancelButtonText: 'Dismiss',
        inputValidator: (value) => {
          if (!value) {
            return 'You need to state your reason.';
          }
          return null;
        },
      });

      const { value: confirm } = await Swal.fire({
        title: 'Are you sure?',
        text: 'There is no turn back if you cancel :(',
        type: 'warning',
        showCancelButton: true,
      });

      if (!confirm) {
        return;
      }

      const result = await this.cancelOrder({
        id: this.order.id,
        reason,
      });

      if (!result.success) {
        Swal.fire('Error', result.message, 'error');
        return;
      }

      await Swal.fire('Success', 'Order cancelled', 'success');
      this.$router.replace('/');
    },
    ...mapActions({
      getOrder: 'order/get',
      cancelOrder: 'order/cancel',
    }),
  },
  components: {
    ItemTable,
    Spinner,
  },
  computed: {
    order() {
      return this.orders.find(order => order.id === this.$route.params.id);
    },
    orderId() {
      return this.order ? this.order.id : '-';
    },
    creatorName() {
      return this.order ? this.order.created_by.name : '';
    },
    createdDate() {
      return this.order ? this.order.created_at : '-';
    },
    status() {
      return this.order ? this.order.status.toUpperCase() : '-';
    },
    isCancelled() {
      return this.status === 'CANCELLED';
    },
    cancelledBy() {
      return this.order ? this.order.cancel_by.name : '-';
    },
    cancelledAt() {
      return this.order ? this.order.created_at : '-';
    },
    cancelledReason() {
      return this.order ? this.order.reason : '-';
    },
    ...mapGetters({
      orders: 'order/orders',
      loading: 'order/loading',
    }),
  },
};
</script>
