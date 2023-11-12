<template>
   <div>
      <div class="flex justify-between items-center">
         <div class="text-secondary text-h4 text-weight-bold q-py-lg q-pl-md">
            Actors List
         </div>
         <q-btn
            color="primary"
            icon="add"
            label="Add New Actor"
            @click="onAddNewActor"
            no-caps
            style="height: fit-content"
         />
      </div>
      <q-card class="q-pa-md rounded-md">
         <q-table :columns="columns">
            <template v-slot:no-data>
               <div
                  class="full-width column flex-center text-secondary q-gutter-sm"
               >
                  <q-icon name="subtitles_off" size="100px" />
                  <div class="text-h5">No Data Found !</div>
               </div>
            </template>
         </q-table>
      </q-card>
   </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions } from 'vuex';

const columns = [
   {
      name: 'name',
      label: 'Actor Name',
      field: 'name',
   },
   {
      name: 'age',
      label: 'Actor Age',
      field: 'age',
   },
   {
      name: 'joinDate',
      label: 'Joined At',
      field: 'joinDate',
   },
   {
      name: 'role',
      label: 'Role',
      field: 'role',
   },
   {
      name: 'actions',
      label: 'Actions',
      field: '',
   },
];

export default defineComponent({
   name: 'actors-list',
   data() {
      return {
         columns,
      };
   },
   methods: {
      ...mapActions({
         fetchActors: 'actors/fetchActors',
      }),
      onAddNewActor() {
         console.log('open dialog');
      },
   },
   mounted() {
      this.fetchActors();
   },
});
</script>
