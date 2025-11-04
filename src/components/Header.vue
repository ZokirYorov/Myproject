<template>
  <div class="h-20 gap-2 dark flex items-center justify-between transition-all duration-300 px-4"
       :class="themeStore.theme === 'moon' ? 'bg-gray-600 text-white': 'bg-gray-100 text-gray-800'"
  >
    <div class="flex gap-10 items-center font-semibold shadow-lg">
      <img class="logo pulse-glow" src="../assets/vue.svg" alt="vue_logo">
      <span class="circleItem w-[50px] h-10 flex pulse-glow"></span>
    </div>
    <div class="flex gap-5 w-[600px] items-center font-semibold">
      <router-link
          v-for="link in links"
          :to="link.to"
          :key="link.to"
          :class="[themeStore.theme === 'moon' ? 'bg-gray-500 text-white hover:bg-white hover:text-gray-800' : 'bg-gray-200 text-gray-600 hover:bg-gray-300']"
          class="flex items-center justify-center px-6 py-2 transition-colors duration-200 text-decoration-none font-semibold rounded-lg uppercase"
      >
        {{link.label}}
      </router-link>
      Myproject
    </div>
    <div class="flex items-center justify-between w-10 transition-all duration-300 relative bg-gray-400 rounded-full h-4">
      <button v-if="themeStore.theme === 'moon'"
              @click="themeStore.setTheme('sun')"
              class="w-7 h-7 absolute bg-gray-300 hover:bg-gray-200 flex justify-center cursor-pointer items-center rounded-full transition-all shadow-md duration-300"
      >
        <img class="flex p-1" src="@/assets/sun.png" alt="">
      </button>
      <button v-else
              @click="themeStore.setTheme('moon')"
              class="w-7 h-7 flex absolute right-0 justify-center cursor-pointer items-center bg-gray-300 hover:bg-gray-400 shadow-md  rounded-full transition-all duration-300"
      >
        <img class="flex p-1" src="@/assets/moon.png" alt="">
      </button>
    </div>
    <router-link
        to="/hello"
        :class="themeStore.theme === 'moon' ? 'bg-gray-800 text-white': 'bg-gray-100 text-gray-800'"
        class="text-decoration-none py-2 lg:py-2 mr-4 px-3 text-center rounded-sm cursor-pointer hover:bg-gray-600 transition duration-200 border-2 border-gray-300 pulse-border-green">
      Ishni boshlash
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { useStore} from "@/stores/store";

const themeStore = useStore();


const links = [
  {
    to: "/models",
    label: "Modullar",
  },
  {
    to: "/products",
    label: "Products",
  },
  {
    to: "/transaction",
    label: "Transaction",
  },
  {
    to: "/to-do",
    label: "Todos",
  }
]

</script>
<style scoped>
.logo {
  width: 48px;
  height: 48px;
}

:root {
  --bg-color: #f5f5f5;
}
.dark {
  --bg-color: #1a202c;
}

body {
  background-color: var(--bg-color);
  transition: background-color 0.3s ease;
}
@keyframes pulse-border-green {
  0% {
    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7); /* green-500 */
  }
  70% {
    box-shadow: 0 0 0 8px rgba(34, 197, 94, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0);
  }
}

.pulse-border-green {
  animation: pulse-border-green 3s infinite;
  border-color: rgb(34, 197, 94); }

/* Effekt logoning shakliga moslashadi */
@keyframes pulse-glow {
  0% {
    filter: drop-shadow(0 0 6px rgba(34, 197, 94, 0.7));
  }
  70% {
    filter: drop-shadow(0 0 12px rgba(34, 197, 94, 0));
  }
  100% {
    filter: drop-shadow(0 0 4px rgba(34, 197, 94, 0));
  }
}

.pulse-glow {
  animation: pulse-glow 2s infinite;
}
.circleItem{
  border: 8px solid rgb(34, 197, 94);
  width: 48px;
  height: 48px;
  border-radius: 50%;
}
</style>
