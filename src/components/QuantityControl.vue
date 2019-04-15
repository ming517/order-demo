<template>
  <div class="quantity-control">
    <button class="btn" @click="minus">-</button>
    <span class="quantity-wrapper">{{ quantity }}</span>
    <button class="btn" @click="add">+</button>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      quantity: 0,
    };
  },
  created() {
    this.quantity = this.value;
  },
  methods: {
    add() {
      this.$emit('input', this.quantity + 1);
    },
    minus() {
      let newQty = this.quantity - 1;

      if (newQty < 1) {
        newQty = 1;
      }

      this.$emit('input', newQty);
    },
  },
  watch: {
    value(newVal) {
      this.quantity = newVal;
    },
  },
};
</script>
