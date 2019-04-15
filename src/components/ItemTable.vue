<template>
  <table class="table table-bordered">
    <thead>
      <tr>
        <td style="width:10%">#</td>
        <td>Item</td>
        <td style="width:10%">Unit Price</td>
        <td style="width:10%">Quantity</td>
        <td style="width:20%">Total</td>
      </tr>
    </thead>
    <tbody>
      <template v-if="items.length === 0">
        <tr>
          <td colspan="5">No Items</td>
        </tr>
      </template>

      <template v-if="items.length > 0">
        <tr v-for="(item, $index) in items" :key="item.id">
          <td>{{ $index+1 }}</td>
          <td>{{ item.name }}</td>
          <td>{{ formatPrice(item.unit_price) }}</td>
          <td>{{ item.quantity }}</td>
          <td>{{ formatPrice(item.total_price) }}</td>
        </tr>

        <tr>
          <td class="text-right" colspan="4">
            <b>Grand Total</b>
          </td>
          <td>
            {{ formatPrice(grandTotal) }}
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script>
import numeral from 'numeral';

export default {
  props: {
    items: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  methods: {
    formatPrice(price) {
      return numeral(price).format('0.00');
    },
  },
  computed: {
    grandTotal() {
      return this.items.reduce((total, item) => {
        const newTotal = total + item.total_price;
        return newTotal;
      }, 0);
    },
  },
};
</script>
