<template>
  <div class="v-container">
    <ProductSearchBar :onSearch="onSearch" />
    <div v-if="isLoading"><LoadingIndicator /></div>
    <div
      v-if="!isLoading"
      class="v-list"
      v-infinite-scroll="loadMore"
      :infinite-scroll-disabled="isLoadingMore || hasReachedMax"
    >
      <ProductItem v-for="(product, i) in products" :key="i" :productInfo="product" />
      <div v-if="isLoadingMore && !hasReachedMax">
        <LoadingIndicator />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ProductItem from './components/ProductItem.vue'
import ProductSearchBar from './components/ProductSearchBar.vue'
import LoadingIndicator from '../../components/loading/LoadingIndicator.vue'
import type { Product } from '@/models/products'
import { ProductRepository } from '@/repositories/ProductRepository'

export default defineComponent({
  name: 'ProductList',

  components: {
    ProductItem,
    ProductSearchBar,
    LoadingIndicator
  },

  data() {
    return {
      isLoading: false,
      isLoadingMore: false,
      hasReachedMax: false,
      products: [] as Product[],
      skip: 0,
      limit: 10,
      totalItem: 0,
      searchText: ''
    }
  },

  created() {
    this.initData()
  },

  methods: {
    async initData(): Promise<void> {
      try {
        this.isLoading = true
        const products = await this.fetchProducts()
        this.products = products
        this.isLoading = false
      } catch (err) {
        this.isLoading = false
        console.log('initData -> err', err)
      }
    },

    async loadMore(): Promise<void> {
      try {
        if (this.isLoading || this.isLoadingMore || this.hasReachedMax) {
          return
        }
        this.isLoadingMore = true
        this.skip += this.limit

        const newProducts = await this.fetchProducts()
        this.isLoadingMore = false

        if (newProducts && newProducts.length) {
          this.products.push(...newProducts)

          if (this.products.length == this.totalItem) {
            this.hasReachedMax = true
          }
        }
      } catch (error) {
        console.error('loadMore -> err', error)
      }
    },

    async onSearch(searchText: string) {
      try {
        window.scrollTo({ top: 0 })
        this.isLoading = true
        this.hasReachedMax = false
        this.totalItem = 0
        this.searchText = searchText
        this.skip = 0
        const products = await this.fetchProducts()
        this.products = products
      } catch (err) {
        console.error('onSearch -> err', err)
      } finally {
        this.isLoading = false
      }
    },

    async fetchProducts(): Promise<Product[]> {
      if (this.searchText != '') {
        const response = await ProductRepository.searchProducts({
          skip: this.skip,
          limit: this.limit,
          q: this.searchText
        })
        this.totalItem = response.total
        return response.products || []
      }

      const response = await ProductRepository.fetchProducts({
        skip: this.skip,
        limit: this.limit,
        q: undefined
      })
      this.totalItem = response.total
      return response.products || []
    }
  },

  directives: {
    infiniteScroll: {
      mounted(el, binding) {
        const bottomThreshold = 50

        window.addEventListener('scroll', function () {
          if (window.innerHeight + window.scrollY >= document.body.offsetHeight - bottomThreshold) {
            binding.value()
          }
        })
      }
    }
  }
})
</script>

<style scoped lang="scss">
.v-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-top: 5rem;
}
</style>
