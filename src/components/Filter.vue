<template>
  <div
      class="flex gap-4 items-center">
    <span
        @click="store.setFilter('todo')"
        class="cursor-pointer rounded px-2 py-1 transition-all duration-300"
        :class="[{ selected : store.changeFilter === 'todo'},
        store.theme === 'moon' ? 'bg-gray-400 text-white' : 'bg-gray-200 text-gray-800'

        ]"
    >
      To-do
    </span>
    <span
        @click="store.setFilter( 'done')"
        class="cursor-pointer rounded px-2 py-1 transition-all duration-300"
        :class="[{ selected : store.changeFilter === 'done'},
        store.theme === 'moon' ? 'bg-gray-400 text-white' : 'bg-gray-200 text-gray-800'
        ]"
    >Done
    </span>
    <div
        :class="store.theme === 'moon' ? 'bg-gray-400 hover:bg-gray-400 text-white' : 'bg-gray-200 hover:bg-gray-100 text-gray-800'"
        class="flex cursor-pointer gap-2 rounded px-2 py-1 transition-all duration-300"
        @click="store.setFilter( '')"
    >x Clear</div>
  </div>
</template>


<script setup lang="ts">

import { useStore} from "@/stores/store";

const store = useStore();
</script>

<style scoped>

.selected{
  display: flex;
  color: white;
  background-color: red;
}
</style>