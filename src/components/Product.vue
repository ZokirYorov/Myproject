<template>
  <div
      class="flex flex-col rounded  p-10 m-auto bg-white">
    <div class="flex flex-wrap gap-4">
      <div
          :class="themeStore.theme === 'moon' ? 'bg-gray-600 text-white' : 'bg-gray-200 text-gray-800'"
          class="flex flex-col item-center rounded border transition-all duration-300 border-gray-100 font-semibold  w-[400px] h-[450px]"
      >
        <h2 class="flex text-2xl p-2">{{items.name}}</h2>
        <div class="flex w-full justify-center items-center">
          <img :src="getImages(items.name)" alt="fruit" class="flex text-center w-32 h-32 object-contain" />
        </div>
        <div class="flex w-[250px] mt-10 p-4 justify-between ">
          <span>Type:</span>
          <span class="w-20">{{items.type}}</span>
        </div>
        <div class="flex w-[250px] justify-between p-4">
          <span>Price:</span>
          <span class="flex w-20 gap-2"><span>{{items.price}}</span>so'm</span>
        </div>
        <div class="flex w-[250px] gap-4 p-4 justify-between">
          <label for="bnItem">Quantity:{{}}</label>
          <input
              type="number"
              id="bnItem"
              placeholder="Input fruit"
              :class="themeStore.theme === 'moon' ? 'bg-gray-600 text-white' : 'bg-gray-200 text-gray-800'"
              class="border w-25 flex rounded px-2 py-1 transition-all duration-300"
          >
        </div>
      </div>
    </div>
  </div>
</template>



<script setup lang="ts">
import { defineProps } from "vue";
import { useStore } from "@/stores/store";

const themeStore = useStore();

interface Item {
  name: string;
  type: string;
  price: number;
}

defineProps<{
  items: Item,
}>();

const getImages = (name: string) => {
  try{
    return new URL(`../assets/images/${name}.png`, import.meta.url).href;
  }
  catch(err){
    console.log(err);
  }
}
</script>

<style scoped>

</style>