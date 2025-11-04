<template>
  <div
      class="flex flex-col justify-between items-center w-full min-h-full mt-5">
    <div class="flex gap-5 mt-10">
      <counter
          :step="step"
          :count="count"
          @countClickUp="val => countClickUp(val, 'count')"
          @countClickDown="val => countClickDown(val, 'count')"
      />
      <counter
          :step="step"
          :count="count2"
          @countClickUp="val => countClickUp(val, 'count2')"
          @countClickDown="val => countClickDown(val, 'count2')"
      />
      <counter
          :step="step"
          :count="count3"
          @countClickUp="val => countClickUp(val, 'count3')"
          @countClickDown="val => countClickDown(val, 'count3')"
      />
    </div>
    <div
        :class="[themeStore.theme === 'moon' ? 'bg-gray-600 text-white' : 'bg-gray-200 text-gray-800']"
        class="border rounded-lg mt-4 mb-3 font-semibold w-40 h-25 flex items-center justify-center transition-colors duration-200">
      <h4 id="allSum">All counts sum: {{cllCountsSum}}</h4>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "@/stores/store.ts";
import counter from "@/views/counter.vue";

const themeStore = useStore();
</script>
<script>
export default {
  name: "models",
  data(){
    return {
      count: 0,
      count2: 1,
      count3: 2,
      step : 2,
    }
  },
  methods: {
    countClickUp(val, type) {
      if (type === "count") {
        this.count += val;
      } else if (type === "count2") {
        this.count2 += val;
      } else {
        this.count3 += val;
      }
    },
    countClickDown(val, type) {
      if (type === "count") {
        this.count -= val;
      } else if (type === "count2") {
        this.count2 -= val;
      } else {
        this.count3 -= val;
      }
    }
  },
  computed: {
    cllCountsSum(){
      return this.count + this.count2 + this.count3;
    }
  }
}

</script>

<style scoped>

</style>