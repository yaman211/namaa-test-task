<template>
   <div class="flex justify-center q-mt-lg">
      <q-card class="rounded-md q-pa-md" style="width: 60vw">
         <div class="text-secondary text-h4 text-weight-medium q-mb-md">
            {{ isEdit ? 'Edit' : 'Create' }} Movie
         </div>

         <VForm @submit="onSubmit">
            <VField
               name="title"
               :model-value="movie.title"
               rules="required"
               v-slot="{ errorMessage }"
            >
               <q-input
                  v-model="movie.title"
                  label="Title"
                  outlined
                  dense
                  :error-message="errorMessage"
                  :error="!!errorMessage"
                  autofocus
               />
            </VField>
            <VField
               name="year"
               :model-value="movie.year"
               rules="required"
               v-slot="{ errorMessage }"
            >
               <q-input
                  v-model="movie.year"
                  label="Year"
                  type="number"
                  min="1900"
                  outlined
                  dense
                  :error-message="errorMessage"
                  :error="!!errorMessage"
               />
            </VField>

            <q-input
               v-model="movie.description"
               label="Movie description"
               outlined
               dense
               type="textarea"
               class="q-mb-md"
            />

            <ActorsTable
               v-if="!isEdit || movie.actors.length"
               ref="actorsTableRef"
               :initialData="movie.actors"
            />

            <div class="flex justify-end q-gutter-sm">
               <q-btn
                  label="Cancel"
                  color="grey"
                  @click="$router.back()"
                  outline
               />
               <q-btn
                  :label="isEdit ? 'Save' : 'Create'"
                  color="secondary"
                  type="submit"
               />
            </div>
         </VForm>
      </q-card>
   </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions } from 'vuex';
import { Form, Field } from 'vee-validate';

import ActorsTable from 'src/components/actors-table.vue';
import { Actor } from 'src/models/actor';

export default defineComponent({
   components: {
      VForm: Form,
      VField: Field,
      ActorsTable,
   },
   props: {
      id: {
         type: String,
      },
   },
   data() {
      return {
         movie: {
            title: '',
            description: '',
            year: '',
            actors: [],
         },
      };
   },
   computed: {
      isEdit() {
         return !!this.id;
      },
      selectedActorsCount() {
         return this.movie.actors.length;
      },
   },
   methods: {
      ...mapActions({
         createMovie: 'movies/createMovie',
         updateMovie: 'movies/updateMovie',
         getMovieById: 'movies/getMovieById',
      }),
      async onSubmit() {
         const actors = await (this.$refs['actorsTableRef'] as any).getActors();
         if (!actors || actors.length === 0) return;

         (this.movie.actors as Actor[]) = [...actors];
         if (this.isEdit) {
            this.updateMovie({
               id: this.$props.id,
               data: this.movie,
            });
            this.$router.push('/movies');
         } else {
            this.createMovie(this.movie);
            this.$router.push('/movies');
         }
      },
   },
   async created() {
      if (this.$props.id) {
         const movie = await this.getMovieById(this.$props.id);
         Object.assign(this.movie, movie);
      }
   },
});
</script>
