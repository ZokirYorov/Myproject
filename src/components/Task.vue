<template>
  <div
      :class="store.theme === 'moon' ? 'bg-gray-400 text-white' : 'bg-gray-200 text-gray-800'"
      class="flex flex-col transition-all duration-300 relative  w-1/4 items-start p-2 rounded-md gap-4 max-h-screen">
    <h2 class="text-xl w-full font-semibold break-words">{{task.text}}</h2>
    <div class="w-full break-words">{{task.area}}</div>
    <div class="flex float-right absolute bottom-0 right-5 m-2 gap-2 items-center">
      <input @change="store.toggleChecked(task.id)"
             :checked="task.completed"
             :id="'myCheck' + task.id"
             class="cursor-pointer w-4 h-4 bottom-5 right-10"
             type="checkbox">
      <label :for="'myCheck-' + task.id">{{task.completed ? "Done" : "To-Do"}}</label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore} from "@/stores/store";

const store = useStore();

defineProps({
  task: {
    type: Object,
    required: true,
  },
})

</script>



<style scoped>

</style>