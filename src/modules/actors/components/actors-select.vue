<template>
   <VField
      name="actors"
      :model-value="model.length"
      :rules="[(val: any) => !!val || 'Select at least one actor']"
      v-slot="{ errorMessage }"
   >
      <q-select
         v-model="model"
         use-input
         input-debounce="400"
         label="Actors"
         :options="filteredActors"
         @filter="filterFn"
         multiple
         option-label="name"
         option-value="id"
         outlined
         dense
         emit-value
         map-options
         :error-message="errorMessage"
         :error="!!errorMessage"
      >
         <template v-slot:selected-item="scope">
            <q-chip
               removable
               dense
               @remove="scope.removeAtIndex(scope.index)"
               :tabindex="scope.tabindex"
               color="grey-4"
               text-color="secondary"
               class="q-my-none q-pa-md"
            >
               <q-avatar color="secondary" text-color="white" icon="person" />
               {{ scope.opt.name }}
            </q-chip>
         </template>
      </q-select>
   </VField>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';

import { Actor } from 'src/models/actor';
import { Form, Field } from 'vee-validate';

export default defineComponent({
   name: 'actor-select',
   components: {
      VField: Field,
   },
   props: {
      initialSelected: {
         type: Array,
         default: () => [],
      },
   },
   data() {
      return {
         search: '',
         filteredActors: [],
         model: [],
      };
   },
   computed: {
      ...mapGetters({
         actors: 'actors/actors',
      }),
   },
   methods: {
      ...mapActions({
         fetchActors: 'actors/fetchActors',
         deleteActor: 'actors/deleteActor',
         resetStore: 'actors/resetStore',
      }),
      filterFn(val: string, update: any) {
         if (val === '') {
            update(() => {
               this.filteredActors = this.actors;
            });
            return;
         }
         update(() => {
            const needle = val.toLowerCase();
            this.filteredActors = this.actors.filter(
               (actor: Actor) =>
                  !this.model.some((id: string) => id === actor.id) &&
                  actor.name.toLowerCase().indexOf(needle) > -1
            );
         });
      },
   },
   watch: {
      model: {
         handler() {
            console.log('watch model');
            this.$emit('input', [...this.model]);
         },
         deep: true,
      },
   },
   mounted() {
      this.fetchActors();
      this.filteredActors = this.actors;
      (this.model as any[]) = [...this.$props.initialSelected];
   },
   unmounted() {
      this.resetStore();
   },
});
</script>
