<template>
  <div
      :class="store.theme === 'moon' ? 'bg-gray-500 text-white' : 'bg-gray-300 text-gray-800'"
      class="w-full flex flex-col h-screen transition-all duration-300">
    <div class="flex p-5 flex-col w-full container m-auto h-full gap-5">
      <div class="flex items-center justify-between">
        <Filter />

        <button @click="visibleModal"
                :class="store.theme === 'moon' ? 'bg-gray-400 hover:bg-gray-400 text-white' : 'bg-gray-200 hover:bg-gray-100 text-gray-600'"
                class="cursor-pointer rounded px-2 py-1 transition-all duration-300">Add new</button>
      </div>

      <div class="flex flex-wrap w-full gap-4">
        <Task
            v-for="(task, index) in store.filteredTasks"
            :task="task"
            :key="index"
        />
      </div>
      <ModalComponent
          v-if="modalClickVisible"
          :form="form"
          @closeModal="closeModal"
          @save-tasks="saveTasks"
      />
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref } from "vue";
import Task from "@/components/Task.vue";
import { useToast } from "vue-toastification";
import Filter from "@/components/Filter.vue";
import ModalComponent from "@/components/ModalComponent.vue";
import { IForm} from "@/typeModules/module";
import { useStore } from "@/stores/store";

const store = useStore();
const toast = useToast();
const modalClickVisible = ref(false);


const form = ref<IForm>({
  id: 1,
  text: "",
  area: "",
  completed: false,
})





const saveTasks = () => {
  if(!form.value.text || !form.value.area)
    return toast.error("Iltimos maydonlarni to'liq kiriting!")
if (form.value.text && form.value.area) {
  store.tasks.push({
  id: Date.now(),
  text: form.value.text,
  area: form.value.area,
  completed: false,
});
  closeModal()
  modalClickVisible.value = false
  toast.success("Ma'lumotlar muvoffaqiyatli kiritildi!")
} else {
console.log("Formada xatolik",form.value.text);
}
};


const visibleModal = () => {
  modalClickVisible.value = true;
}
const closeModal = () => {
  modalClickVisible.value = false;
  form.value = {
    id: null,
    text: '',
    area: '',
    completed: false,
  };
}

</script>


<style scoped>

</style>