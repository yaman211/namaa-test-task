<template>
   <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
         <component :is="Component" />
      </transition>
   </router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
   name: 'DefaultLayout',
});
</script>

<style>
.fade-enter-active,
.fade-leave-active {
   transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
   opacity: 0;
}
</style>
