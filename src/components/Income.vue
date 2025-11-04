<template>
  <div class="w-full flex flex-col p-5">
    <h2 class="uppercase text-lg font-semibold">Your balance</h2>
    <span class="flex font-semibold text-3xl">${{total}}</span>
    <div
        :class="themeStore.theme === 'moon' ? 'bg-gray-500 text-white' : 'bg-gray-300 text-gray-800'"
        class="w-full gap-5 flex mt-5 divide-x p-5 items-center justify-center text-lg font-semibold shadow-md rounded-sm">
      <div class="flex w-full flex-col items-center justify-center">
        <span>INCOME</span>
        <span class="flex text-xl text-green-500">$ {{income}}</span>
      </div>
      <div class="flex w-full flex-col items-center justify-center">
        <span>EXPENCE</span>
        <span class="flex text-xl text-[#C0392B]">$ {{expenses}}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore} from "@/stores/store";

const themeStore = useStore();

defineProps({
  total: Number,
  income: Number,
  expenses: Number,
})
</script>

<style scoped>

</style>