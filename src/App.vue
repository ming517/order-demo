<template>
  <div id="app" class="container-fluid">
    <Navbar :orderStatus="orderStatus" :paymentStatus="paymentStatus"/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    Navbar,
  },
  created() {
    this.checkHealth();

    // create status polling
    setInterval(() => {
      this.checkHealth();
    }, 5000); // poll every 5 second
  },
  methods: {
    checkHealth() {
      this.checkOrderHealth();
      this.checkPaymentHealth();
    },
    ...mapActions({
      checkOrderHealth: 'health/checkOrderHealth',
      checkPaymentHealth: 'health/checkPaymentHealth',
    }),
  },
  computed: {
    ...mapGetters({
      orderStatus: 'health/orderStatusText',
      paymentStatus: 'health/paymentStatusText',
    }),
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
