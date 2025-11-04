<template>
  <div class="w-[200px] flex flex-column items-center gap-5 justify-center">
    <div>
      {{count}}
    </div>
    <div class="flex gap-2 justify-center h-full">
      <CButton @click="countClickDown()"
               text="Count -"
               type="button"
               variant="primary"
      />
      <CButton @click="countClickUp()"
               text="Count +"
               type="button"
               variant="primary"
      />
    </div>

  </div>
</template>


<script>
import CButton from "@/components/CButton.vue";

export default {
  name: "Counter",
  components: {CButton},
  props:{
    count: {
      type: Number,
      required: true
    },
    step: {
      type: Number,
      default: 1,
      required: false
    }
  },
  data() {
    return {

    }
  },
  methods: {
    countClickDown(){
      this.$emit("countClickDown", this.step);
    },
    countClickUp(){
      this.$emit("countClickUp", this.step);
    }
  }
}

</script>
<style scoped>

</style>