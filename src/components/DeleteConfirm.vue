

<template>
  <div v-if="props.show" class="p-4">
    <p class="text-lg font-semibold mb-4">{{props.title}}</p>
    <div class="flex justify-center gap-4">
      <button
          @click="handleConfirm"
          class="bg-red-600 hover:bg-red-700 !rounded-md cursor-pointer text-white px-4 py-2 font-medium">
        Ha, o'chirish
      </button>
      <button
          @click="emit('update:show', false)"
          class="bg-gray-300 hover:bg-gray-400 !rounded-md cursor-pointer text-gray-800 px-4 py-2 font-medium"
      >
        Bekor qilish
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">

const props = defineProps<{
  title: string
  show: boolean
}>()

const emit = defineEmits<{
  (e: 'confirm'): void
  (e: 'update:show', value: boolean): void
}>()

const handleConfirm = () => {
  emit('confirm')
  emit('update:show', false)
}
</script>

<style scoped>

</style>
