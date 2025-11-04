<template>
  <div
      :class="themeStore.theme === 'moon' ? 'bg-gray-600 text-white' : 'bg-gray-200 text-gray-800'"
      class="w-full flex gap-2 flex-col p-5 transition-all duration-300">
    <h2 class="flex text-2xl font-semibold">History</h2>
    <span class="w-full bg-gray-300 h-0.5"></span>
    <div class="flex gap-2 flex-col w-full">
      <div
          v-for="(transaction, index) in transactions"
          :key="index"
          :class="[transaction.amount > 0 ? 'border-r-[#2ecc71]' : 'border-r-red-700',
          themeStore.theme === 'moon' ? 'bg-gray-500 text-white' : 'bg-gray-300 text-gray-800'
          ]"
          class="flex transactionItem transition-all duration-300 relative items-center text-lg border-r-5 justify-between p-2 shadow-md w-full border-right"
      >
        <button
            @click="deleteTransactionItem(transaction.id)"
            class="bg-red-600 btnItem cursor-pointer text-white absolute opacity-0 hover:opacity-100 left-[-20px] w-5"
        >x</button>
        <span>{{transaction.text}}</span>
        <span>{{transaction.amount}}</span>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { defineProps } from "vue";
import { useStore } from "@/stores/store";

const themeStore = useStore();

defineProps({
  transactions: Object,
})

const emit = defineEmits(["deleteTransactionItem"]);

const deleteTransactionItem = (id: number) => {
  emit("deleteTransactionItem", id);
}

</script>

<style scoped lang="scss">

.transactionItem:hover .btnItem {
  opacity: 1;
}
</style>