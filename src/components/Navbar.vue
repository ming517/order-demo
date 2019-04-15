<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link class="navbar-brand" to="/">Order</router-link>
    <button class="navbar-toggler" type="button"
      data-toggle="collapse" data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
        </li>
      </ul>
      <div class="form-inline my-2 my-lg-0">
        <div>
          Order: <span :class="orderStatusCls"> {{ orderStatus }} </span>
        </div>

        <div>
          Payment: <span :class="paymentStatusCls"> {{ paymentStatus }} </span>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    orderStatus: {
      type: String,
      default: 'OFFLINE',
    },
    paymentStatus: {
      type: String,
      default: 'OFFLINE',
    },
  },
  computed: {
    orderStatusCls() {
      return ['status', this.orderStatus.toLowerCase()];
    },
    paymentStatusCls() {
      return ['status', this.paymentStatus.toLowerCase()];
    },
  },
};
</script>

<style scoped>
.status {
  padding-left: 5px;
  padding-right: 5px;
}
.online {
  color: green;
}
.offline {
  color: red;
}
</style>
