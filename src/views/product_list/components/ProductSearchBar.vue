<template>
  <div class="v-search">
    <input type="text" placeholder="Search a product" @keyup="onSearchChanged" />
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { debounce } from 'lodash'

export default defineComponent({
  props: {
    onSearch: {
      type: Function as PropType<(searchText: string) => void>,
      required: true
    }
  },

  data() {
    return {
      keyword: ''
    }
  },

  methods: {
    onSearchChanged: debounce(function (this: any, e) {
      const keyword = e.target.value
      this.onSearch(keyword)
    }, 1000)
  }
})
</script>

<style scoped lang="scss">
.v-search {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  padding: 1rem;
  background: #111111;

  input {
    padding: 0.2rem;
    width: 100%;
  }
}
</style>
