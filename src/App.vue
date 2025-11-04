<template>
  <div
      class="flex dark flex-col dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300 text-gray-900 bg-gray-100 min-vh-100 w-full"
  >
    <Header/>
    <RouterView/>
  </div>
</template>
<script setup lang="ts">
import Header from "./components/Header.vue";
import { useStore } from "@/stores/store";
import {onMounted} from "vue";

const darkStore = useStore();

onMounted( () => {
  darkStore.setTheme(darkStore.theme);
})
</script>
<style>

</style>

