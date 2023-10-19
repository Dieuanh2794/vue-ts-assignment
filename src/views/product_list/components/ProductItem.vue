<template>
  <div class="v-list__item">
    <img :src="productInfo.images[0]" alt="Image" />
    <h2>Product Name: {{ productInfo.title }}</h2>
    <p>Price: {{ productInfo.price }}</p>
    <p>SKU: {{ productInfo.id }}</p>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ProductItem',

  props: {
    productInfo: {
      type: Object,
      default: () => {}
    }
  }
})
</script>
<style scoped lang="scss">
.v-list {
  &__item {
    flex: 25%;
    max-width: 25%;
    padding: 1rem 2rem;
    margin-bottom: 1rem;
    border-radius: 0.5rem;
    transition: 0.2s;

    &:hover {
      background: lighten($color: #000000, $amount: 20);
    }

    img {
      max-width: 100%;
      object-fit: cover;
      aspect-ratio: 16/9;
    }
  }
}
</style>
