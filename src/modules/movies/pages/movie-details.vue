<template>
   <div class="flex justify-center q-mt-lg">
      <q-card v-if="movie" class="rounded-md q-pa-lg" style="width: 60vw">
         <div class="text-secondary text-h4 text-weight-medium q-mb-lg">
            Movie Details
         </div>
         <div class="flex flex-wrap q-gutter-md justify-between">
            <div
               v-for="info in mainInfo"
               :key="info.label"
               class="flex q-gutter-x-md items-center"
            >
               <q-icon
                  :name="info.icon"
                  size="lg"
                  style="border: 3px solid"
                  class="q-pa-xs rounded-md"
               />
               <div>
                  <div class="text-h6 text-weight-medium">{{ info.label }}</div>
                  <div class="text-subtitle1 text-grey-8">{{ info.value }}</div>
               </div>
            </div>
         </div>
         <div class="flex q-gutter-x-md q-my-md items-center">
            <div class="text-h6 text-weight-medium">Description:</div>
            <div class="text-subtitle1 text-grey-8">
               {{ movie.description }}
            </div>
         </div>
         <div>
            <div class="text-h6 text-weight-medium q-mb-sm">Actors:</div>
            <div class="flex q-gutter-xl">
               <div
                  v-for="actor in movie.actors"
                  :key="actor.id"
                  class="flex column items-center justify-center q-gutter-sm"
               >
                  <q-avatar text-color="white" icon="person" color="black" />
                  <div class="flex column items-center justify-center">
                     <div class="text-subtitle1 text-weight-medium">
                        {{ actor.name }}
                     </div>
                     <div class="text-subtitle2 text-grey-8">
                        {{ actor.age }} Years old
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </q-card>
   </div>
</template>

<script lang="ts">
import { Movie } from 'src/models/movie';
import { defineComponent } from 'vue';
import { mapActions } from 'vuex';

export default defineComponent({
   props: {
      id: {
         type: String,
      },
   },
   data() {
      return {
         movie: undefined,
      } as { movie: Movie | undefined };
   },
   computed: {
      mainInfo() {
         return [
            { icon: 'subtitles', label: 'Title', value: this.movie?.title },
            { icon: 'event', label: 'Year', value: this.movie?.year },
            {
               icon: 'groups',
               label: 'Actors Count',
               value: this.movie?.actorsCount,
            },
         ];
      },
   },
   methods: {
      ...mapActions({
         getMovieById: 'movies/getMovieById',
      }),
   },
   async created() {
      const movie = await this.getMovieById(this.$props.id);
      this.movie = movie;
   },
});
</script>
