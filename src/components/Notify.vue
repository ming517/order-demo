<template>
  <div :class="alertCls" role="alert" v-show="showAlert">
    {{ message }}
  </div>
</template>

<script>
export default {
  props: {
    timeout: {
      type: Number,
      default: 3000,
    },
  },
  data() {
    return {
      showAlert: false,
      type: 'success',
      message: '',
    };
  },
  methods: {
    show(message, type = 'success') {
      this.showAlert = true;
      this.type = type;
      this.message = message;

      setTimeout(() => {
        this.showAlert = false;
      }, this.timeout);
    },
  },
  computed: {
    alertCls() {
      return `alert alert-${this.type}`;
    },
  },
};
</script>
