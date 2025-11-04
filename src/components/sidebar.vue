<template>
  <div class="">
    <h2>
      Sidebar
    </h2>
    <button @click="$emit('click-router', item.link)">Button</button>
  </div>
</template>

<script setup>

</script>
<script>
export default {
  name: 'sidebar',
  data(){
    return {

    }
  },
  methods:{

  }
}
</script>

<style scoped>
</style>