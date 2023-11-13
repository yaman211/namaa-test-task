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

            <ActorsSelect
               v-if="!isEdit || movie.actorsIds.length"
               :initialSelected="movie.actorsIds"
               @input="onSelectActor"
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
import ActorsSelect from 'src/modules/actors/components/actors-select.vue';

export default defineComponent({
   components: {
      VForm: Form,
      VField: Field,
      ActorsSelect,
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
            actorsIds: [],
         },
      };
   },
   computed: {
      isEdit() {
         return !!this.id;
      },
      selectedActorsCount() {
         return this.movie.actorsIds.length;
      },
   },
   methods: {
      ...mapActions({
         createMovie: 'movies/createMovie',
         updateMovie: 'movies/updateMovie',
         getMovieById: 'movies/getMovieById',
      }),
      onSubmit() {
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
      onSelectActor(actors: string[]) {
         (this.movie.actorsIds as string[]) = actors;
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
