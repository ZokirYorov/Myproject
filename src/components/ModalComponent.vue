<template>
  <div
      @click="closeModal"
      class="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center">
    <div
        @click.stop
        :class="themeStore.theme === 'moon' ? 'bg-gray-500 text-white' : 'bg-gray-300 text-gray-800'"
        class="flex flex-col justify-around rounded p-4 w-[300px] min-h-[250px]">
      <div class="flex justify-between w-full items-center">
        <h2 class="flex text-xl mb-4 font-bold">Todo list</h2>
        <img
            @click="closeModal"
            class="flex cursor-pointer w-6 h-6"
            src="../assets/close.png" alt="">
      </div>
      <label for="myInput"
             class="flex w-full flex-col "
      >
        Inter text
        <input id="myInput"
               placeholder="Inter text"
               v-model="form.text"
               class="flex border border-gray-200 rounded p-2"
               type="text"
        >
      </label>
      <label for="myArea"
             class="flex mt-5 w-full flex-col ">
        Area text
        <textarea id="myArea"
                  v-model="form.area"
                  placeholder="Enter area"
                  class="flex border border-gray-200 rounded p-2"
                  type="text"
        />
      </label>
      <button
          @click="saveTasks"
          class="bg-purple-500 rounded cursor-pointer h-8 text-white mt-5">Save task</button>
    </div>
  </div>
</template>


<script setup lang="ts">
import { useStore } from "@/stores/store";

const themeStore = useStore();

defineProps({
  form: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['closeModal','saveTasks']);

const closeModal = () => {
  emit('closeModal');
}

const saveTasks = () => {
  emit('saveTasks', );
}

</script>


<style scoped>

</style>