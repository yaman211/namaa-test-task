<template>
   <div class="flex justify-center q-mt-lg">
      <q-card v-if="movie" class="rounded-md q-pa-md" style="width: 60vw">
         <div class="text-secondary text-h4 text-weight-medium q-mb-lg">
            Movie Details
         </div>
         <div class="flex column q-gutter-y-md">
            <div class="flex q-gutter-x-md items-center">
               <div class="text-h6 text-weight-medium">Title:</div>
               <div class="text-subtitle1 text-grey-8">{{ movie.title }}</div>
            </div>
            <div class="flex q-gutter-x-md items-center">
               <div class="text-h6 text-weight-medium">Year:</div>
               <div class="text-subtitle1 text-grey-8">{{ movie.year }}</div>
            </div>
            <div class="flex q-gutter-x-md items-center">
               <div class="text-h6 text-weight-medium">Description:</div>
               <div class="text-subtitle1 text-grey-8">
                  {{ movie.description }}
               </div>
            </div>
            <div class="flex q-gutter-x-md items-center">
               <div class="text-h6 text-weight-medium">Actors Count:</div>
               <div class="text-subtitle1 text-grey-8">
                  {{ movie.actorsCount }}
               </div>
            </div>
            <div>
               <div class="text-h6 text-weight-medium q-mb-sm">Actors:</div>
               <div class="flex q-gutter-md">
                  <div
                     v-for="actor in actors"
                     :key="actor.id"
                     class="flex column items-center justify-center q-gutter-sm"
                  >
                     <q-avatar
                        text-color="white"
                        icon="person"
                        color="secondary"
                     />
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
         </div>
      </q-card>
   </div>
</template>

<script lang="ts">
import { Movie } from 'src/models/movie';
import { Actor } from 'src/models/actor';
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
         actors: [],
      } as { movie: Movie | undefined; actors: Actor[] };
   },
   computed: {},
   methods: {
      ...mapActions({
         getMovieById: 'movies/getMovieById',
         getMovieActors: 'movies/getMovieActors',
      }),
   },
   async created() {
      const movie = await this.getMovieById(this.$props.id);
      this.actors = await this.getMovieActors(movie.actorsIds);
      this.movie = movie;
   },
});
</script>
