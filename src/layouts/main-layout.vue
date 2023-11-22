<template>
   <q-layout view="hHh Lpr lff" style="min-height: calc(100vh - 50px)">
      <q-header elevated>
         <q-toolbar>
            <q-btn
               flat
               dense
               round
               icon="menu"
               aria-label="Menu"
               @click="toggleLeftDrawer"
            />

            <q-toolbar-title> Namaa Test Task </q-toolbar-title>
         </q-toolbar>
      </q-header>

      <q-drawer
         v-model="leftDrawerOpen"
         :mini="miniState"
         @mouseover="miniState = false"
         @mouseout="miniState = true"
         show-if-above
         mini-to-overlay
         bordered
         :width="250"
         class="overflow-hidden"
      >
         <q-img
            :src="require('assets/logo_en.png')"
            class="q-my-md q-ml-xs"
            width="130px"
         />
         <q-list padding>
            <q-item
               v-for="(item, i) in sideBarLinks"
               :key="i"
               clickable
               v-ripple
               :to="item.path"
            >
               <q-item-section avatar>
                  <q-icon :name="item.icon" />
               </q-item-section>

               <q-item-section class="text-subtitle1">
                  {{ item.title }}
               </q-item-section>
            </q-item>
         </q-list>
      </q-drawer>

      <q-page-container
         class="q-ma-md"
         style="margin-left: 5%; margin-right: 5%"
      >
         <router-view />
      </q-page-container>
   </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

const sideBarLinks = [
   {
      title: 'Movies',
      icon: 'movie',
      path: '/movies',
   },
];

export default defineComponent({
   name: 'MainLayout',

   components: {},

   data() {
      return {
         leftDrawerOpen: false,
         miniState: true,
         sideBarLinks,
      };
   },

   methods: {
      toggleLeftDrawer() {
         this.leftDrawerOpen = !this.leftDrawerOpen;
      },
   },
});
</script>
