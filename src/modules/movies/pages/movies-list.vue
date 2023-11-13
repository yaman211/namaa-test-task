<template>
   <div>
      <div class="flex justify-between items-center q-pt-md q-pb-xl q-pl-md">
         <div class="text-secondary text-h4 text-weight-bold">Movies List</div>
         <q-btn
            color="secondary"
            icon="add"
            label="Add New Movie"
            to="/movies/create"
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
                        icon="preview"
                        color="secondary"
                        size="sm"
                        :to="`/movies/${props.row.id}`"
                     />
                     <q-btn
                        icon="edit"
                        color="secondary"
                        size="sm"
                        :to="`/movies/edit/${props.row.id}`"
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
   </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';

import { Movie } from 'src/models/movie';

const columns = [
   {
      name: 'title',
      label: 'Movie Name',
      field: 'title',
      align: 'center',
   },
   {
      name: 'year',
      label: 'Movie Year',
      field: 'year',
      align: 'center',
   },
   {
      name: 'actorsCount',
      label: 'Actors Count',
      field: 'actorsCount',
      align: 'center',
   },
   {
      name: 'description',
      label: 'Description',
      field: 'description',
      align: 'center',
      format: (val: any) => (val ? val : '--'),
      style: 'max-width: 350px;',
      classes: 'long-text-wrap',
   },
   {
      name: 'actions',
      label: 'Actions',
      field: '',
      align: 'center',
      style: 'width: 200px',
   },
];

export default defineComponent({
   name: 'movies-list',
   data() {
      return {
         columns,
      };
   },
   computed: {
      ...mapGetters({
         data: 'movies/movies',
      }),
   },
   methods: {
      ...mapActions({
         fetchMovies: 'movies/fetchMovies',
         deleteMovie: 'movies/deleteMovie',
         resetStore: 'movies/resetStore',
      }),
      onDeleteClicked(movie: Movie) {
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
               this.deleteMovie(movie.id);
            });
      },
   },
   mounted() {
      this.fetchMovies();
   },
});
</script>
