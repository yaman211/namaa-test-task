<template>
   <q-dialog v-model="isOpen">
      <q-card class="q-pa-md rounded-md" style="width: 400px">
         <div class="text-subtitle1 text-weight-bold q-mb-md">
            {{ isEdit ? 'Edit' : 'Create New' }} Actor
         </div>
         <VForm @submit="onSubmit">
            <VField
               name="name"
               :model-value="actor.name"
               rules="required"
               v-slot="{ errorMessage }"
            >
               <q-input
                  v-model="actor.name"
                  label="Name"
                  outlined
                  dense
                  :error-message="errorMessage"
                  :error="!!errorMessage"
                  autofocus
               />
            </VField>
            <VField
               name="age"
               :model-value="actor.age"
               rules="required|minMax:10,130"
               v-slot="{ errorMessage }"
            >
               <q-input
                  v-model="actor.age"
                  label="Age"
                  type="number"
                  min="10"
                  max="130"
                  outlined
                  dense
                  :error-message="errorMessage"
                  :error="!!errorMessage"
               />
            </VField>
            <VField
               name="role"
               :model-value="actor.role"
               rules="required"
               v-slot="{ errorMessage }"
            >
               <q-select
                  v-model="actor.role"
                  label="Actor Role"
                  outlined
                  dense
                  :options="roleOptions"
                  map-options
                  emit-value
                  :error-message="errorMessage"
                  :error="!!errorMessage"
               />
            </VField>

            <q-btn
               :label="isEdit ? 'Save' : 'Create'"
               color="primary"
               class="full-width"
               type="submit"
            />
         </VForm>
      </q-card>
   </q-dialog>
</template>

<script lang="ts">
import { ActorRole } from 'src/models/actor';
import { Form, Field } from 'vee-validate';
import { defineComponent } from 'vue';
import { mapActions } from 'vuex';

export default defineComponent({
   components: {
      VForm: Form,
      VField: Field,
   },
   data() {
      return {
         isOpen: false,
         isEdit: false,
         id: null,
         actor: {
            name: '',
            age: '',
            role: '',
         },
         roleOptions: [...Object.values(ActorRole)],
      };
   },
   methods: {
      ...mapActions({
         createActor: 'actors/createActor',
         updateActor: 'actors/updateActor',
      }),
      open(data?: any) {
         if (data) {
            this.isEdit = true;
            Object.assign(this.actor, data);
            this.id = data.id;
         } else {
            this.isEdit = false;
            this.actor = {
               name: '',
               age: '',
               role: '',
            };
            this.id = null;
         }
         this.isOpen = true;
      },
      onSubmit() {
         if (this.isEdit) {
            this.updateActor({ id: this.id, data: this.actor });
         } else {
            this.createActor(this.actor);
         }
         this.isOpen = false;
      },
   },
});
</script>

<style lang="scss" scoped></style>
