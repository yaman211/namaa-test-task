<template>
   <div class="flex q-gutter-md">
      <q-input
         v-model="filters.title"
         debounce="700"
         outlined
         placeholder="Title"
         dense
      >
         <template v-slot:append>
            <q-icon name="search" />
         </template>
      </q-input>
      <q-input
         v-model="filters.year"
         debounce="700"
         outlined
         placeholder="Year"
         dense
         type="number"
      >
         <template v-slot:append>
            <q-icon name="event" />
         </template>
      </q-input>
      <q-input
         v-model="filters.numberOfActors"
         debounce="700"
         outlined
         placeholder="Number Of Actors"
         dense
         type="number"
      >
         <template v-slot:append>
            <q-icon name="groups" />
         </template>
      </q-input>
   </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapMutations } from 'vuex';
export default defineComponent({
   data() {
      return {
         filters: {
            title: '',
            year: '',
            numberOfActors: '',
         },
      };
   },
   methods: {
      ...mapMutations({
         setFilters: 'movies/setFilters',
      }),
   },
   watch: {
      filters: {
         handler() {
            this.setFilters({ ...this.filters });
         },
         deep: true,
      },
   },
});
</script>

<style lang="scss" scoped></style>
