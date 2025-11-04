<template>
  <div
      :class="themeStore.theme === 'moon' ? 'bg-gray-600 text-white' : 'bg-gray-200 text-gray-800'"
      class="flex flex-col w-[400px] m-auto h-screen transition-all duration-300">
    <div class="w-full flex flex-col">
      <h2 class="w-full flex text-4xl font-semibold items-center justify-center">Cost tracking</h2>
      <Income
          :total="total"
          :income="+income"
          :expenses="+expenses"
      />
      <TransactionList
          :transactions="transactions"
          @deleteTransactionItem="transactionItemDelete"
      />
      <div class="flex flex-col w-full p-2">
        <form
            @submit.prevent="saveTransaction"
            class="w-full flex flex-col gap-3"
        >
          <h2 class="flex text-2xl font-semibold">Add new transaction</h2>
          <span class="w-full flex text-sm bg-gray-300 h-0.5"></span>
          <span>Text</span>
          <input type="text"
                 v-model="inCome"
                 :class="themeStore.theme === 'moon' ? 'bg-gray-600 border-gray-400 text-white' : 'bg-gray-200 border-gray-600 text-gray-800'"
                 class="w-full p-2 border"
                 placeholder="Enter text"
          >
          <span>Amount</span>
          <input type="number"
                 v-model="amountTotal"
                 :class="themeStore.theme === 'moon' ? 'bg-gray-600 border-gray-400 text-white' : 'bg-gray-200 border-gray-600 text-gray-800'"
                 class="w-full p-2 transition-all duration-300 border"
                 placeholder="Enter amount"
          >
          <button
              class="w-full cursor-pointer bg-[#9C88FF] hover:bg-purple-400 text-white h-10"
            type="submit"
          >Add transaction</button>
        </form>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">

import TransactionList from "../components/TransactionList.vue";
import Income from "@/components/Income.vue";
import {computed, onMounted, ref} from "vue";
import { useToast } from "vue-toastification";
import { useStore } from '@/stores/store'

const themeStore = useStore()
const inCome = ref<string>('');
const amountTotal = ref<number | null>(null);

interface Transaction {
  id: number;
  text: string;
  amount: number;
}


const toast = useToast();
const transactions= ref<Transaction[]>([]);

const saveTransaction = () => {
  if (!inCome.value || !amountTotal.value) {
    toast.error("Please enter an income and amountTotal");
    return;
  }

  transactions.value.push({
    id: 0,
    text: inCome.value,
    amount: amountTotal.value,
  });
  toast.success("Transaction saved");
  saveToLocalStorage()

  inCome.value = '';
  amountTotal.value = null;
}

const total = computed(() => {
  return transactions.value.reduce((acc, transaction) => {
    return acc + transaction['amount'];
  }, 0);
})

const income = computed(() => {
  return transactions.value.filter((transaction) => transaction["amount"] > 0)
      .reduce((acc, transaction) => {
        return acc + transaction['amount'];
      },0)
      .toFixed(2);
})

const expenses = computed(() => {
  return transactions.value.filter((transaction) => transaction["amount"] < 0)
      .reduce((acc, transaction) => {
        return acc + transaction['amount'];
      },0)
      .toFixed(2);
})

const transactionItemDelete = (id: number) => {
  const index = transactions.value.findIndex((item) => item['id'] === id);
  transactions.value.splice(index, 1);
  toast.success("Transaction successfully deleted");
  saveToLocalStorage()
}

const saveToLocalStorage = () => {
  localStorage.setItem("transactions", JSON.stringify(transactions.value));
};

onMounted(() => {
  const saved = localStorage.getItem("transactions");
  if (saved) {
    transactions.value = JSON.parse(saved);
  }
})

</script>

<style scoped>

</style>