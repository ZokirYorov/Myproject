<template>
  <div class="flex w-full min-h-full p-4">
   <div class="flex flex-wrap gap-5">
     <Product
         v-for="(items, index) in inventory"
         :key="index"
         :items="items"
         class="w-[450px]"
     />
   </div>
  </div>

</template>


<script setup lang="ts">

import Product from "../components/Product.vue";
import {onMounted, ref} from "vue";

const inventory = ref<[]>([]);

const fruits = async() => {
  const response = await fetch('/fruit.json');
  inventory.value = await response.json();
}

onMounted( () => {
   fruits()
})
</script>

<style scoped>

</style>