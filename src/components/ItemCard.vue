<template>
  <div class="card card-custom">
    <img src="http://via.placeholder.com/200" class="card-img-top">
    <div class="card-body">
      <h5 class="card-title">{{ item.name }}</h5>
      <p class="card-text">
        {{ item.description }}
      </p>
      <quantity-control v-model="quantity" />
      <button class="btn btn-primary"
        @click="$emit('addToCart',
        {item,quantity})"
      >Add To Cart</button>
    </div>
  </div>
</template>

<script>
import QuantityControl from './QuantityControl.vue';

export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      quantity: 1,
    };
  },
  components: {
    QuantityControl,
  },
};
</script>

<style scoped>
.card-custom {
  padding: 0px;
}
.quantity-control{
  padding: 10px;
}
.quantity-control .btn {
  width: 40px;
  background-color: #dadada;
}
.quantity-wrapper {
  padding-left: 10px;
  padding-right: 10px;
}
</style>
