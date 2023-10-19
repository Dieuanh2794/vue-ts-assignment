import { createRouter, createWebHistory } from 'vue-router'
import ProductList from '../views/product_list/ProductList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'product-list',
      component: ProductList
    },
  ]
})

export default router
