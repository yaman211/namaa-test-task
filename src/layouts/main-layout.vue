<template>
   <q-layout view="hHh Lpr lff">
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
      >
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

      <q-page-container class="q-ma-md">
         <router-view />
      </q-page-container>
   </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

const sideBarLinks = [
   {
      title: 'Actors',
      icon: 'groups',
      path: '/actors',
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
