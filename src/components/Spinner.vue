<template>
  <div class="text-center">
    <div class="spinner-border" role="status" v-show="show">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
