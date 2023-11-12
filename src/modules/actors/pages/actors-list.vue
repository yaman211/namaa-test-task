<template>
   <div>
      <div class="flex justify-between items-center q-pt-md q-pb-xl q-pl-md">
         <div class="text-secondary text-h4 text-weight-bold">Actors List</div>
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
         <q-table :columns="columns" :rows="data">
            <template v-slot:body-cell-actions="props">
               <q-td :props="props">
                  <div class="flex justify-evenly">
                     <q-btn
                        icon="edit"
                        color="secondary"
                        size="sm"
                        @click="onEditClicked(props.row)"
                     />
                     <q-btn
                        icon="delete"
                        color="secondary"
                        size="sm"
                        @click="onDeleteClicked(props.row)"
                     />
                  </div>
               </q-td>
            </template>
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
      <ActorDialog ref="actorDialogRef" />
   </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';

import ActorDialog from '../components/actor-dialog.vue';
import { dateTimeFormatter } from 'src/utils/index';
import { Actor } from 'src/models/actor';

const columns = [
   {
      name: 'name',
      label: 'Actor Name',
      field: 'name',
      align: 'center',
   },
   {
      name: 'age',
      label: 'Actor Age',
      field: 'age',
      align: 'center',
   },
   {
      name: 'joinDate',
      label: 'Joined At',
      field: 'joinDate',
      format: dateTimeFormatter,
      align: 'center',
   },
   {
      name: 'role',
      label: 'Role',
      field: 'role',
      align: 'center',
   },
   {
      name: 'actions',
      label: 'Actions',
      field: '',
      align: 'center',
      style: 'width: 180px',
   },
];

export default defineComponent({
   name: 'actors-list',
   components: {
      ActorDialog,
   },
   data() {
      return {
         columns,
      };
   },
   computed: {
      ...mapGetters({
         data: 'actors/actors',
      }),
   },
   methods: {
      ...mapActions({
         fetchActors: 'actors/fetchActors',
         deleteActor: 'actors/deleteActor',
         resetStore: 'actors/resetStore',
      }),
      onAddNewActor() {
         (this.$refs['actorDialogRef'] as any).open();
      },
      onEditClicked(actor: Actor) {
         (this.$refs['actorDialogRef'] as any).open(actor);
      },
      onDeleteClicked(actor: Actor) {
         this.$q
            .dialog({
               title: 'Confirm Delete',
               message: 'Are you sure that you want to delete it ?.',
               cancel: true,
               color: 'negative',
               transitionShow: 'flip-down',
               transitionHide: 'flip-up',
            })
            .onOk(() => {
               this.deleteActor(actor.id);
            });
      },
   },
   mounted() {
      this.fetchActors();
   },
   unmounted() {
      this.resetStore();
   },
});
</script>
