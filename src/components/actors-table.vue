<template>
   <div class="q-my-md">
      <q-markup-table>
         <thead>
            <tr>
               <th v-for="col in columns" :key="col.name" class="text-center">
                  {{ col.label }}
               </th>
            </tr>
         </thead>
         <tbody>
            <!-- <FieldArray name="actors" v-slot="{ fields }"> -->
            <tr v-for="(row, idx) in data" :key="row.id">
               <td>
                  <VField
                     :name="`name-${row.id}`"
                     :model-value="row.name"
                     rules="required"
                     v-slot="{ errorMessage }"
                  >
                     <q-input
                        label="Name"
                        v-model="row.name"
                        outlined
                        dense
                        autofocus
                        :error-message="errorMessage"
                        :error="!!errorMessage"
                     />
                  </VField>
               </td>
               <td>
                  <VField
                     :name="`age-${row.id}`"
                     :model-value="row.age"
                     rules="required"
                     v-slot="{ errorMessage }"
                  >
                     <q-input
                        label="Age"
                        type="number"
                        v-model="row.age"
                        outlined
                        dense
                        :error-message="errorMessage"
                        :error="!!errorMessage"
                     />
                  </VField>
               </td>
               <td>
                  <VField
                     :name="`date-${row.id}`"
                     :model-value="row.joinDate"
                     rules="required|minLength:8|date"
                     v-slot="{ errorMessage }"
                  >
                     <q-input
                        label="Join Date"
                        v-model="row.joinDate"
                        dense
                        outlined
                        mask="date"
                        hint="YYYY/MM/DD"
                        :error-message="errorMessage"
                        :error="!!errorMessage"
                     />
                  </VField>
               </td>
               <td>
                  <VField
                     :name="`role-${row.id}`"
                     :model-value="row.role"
                     rules="required"
                     v-slot="{ errorMessage }"
                  >
                     <q-select
                        v-model="row.role"
                        label="Role"
                        outlined
                        dense
                        :options="roleOptions"
                        style="min-width: 150px"
                        :error-message="errorMessage"
                        :error="!!errorMessage"
                     />
                  </VField>
               </td>
               <td>
                  <div class="flex justify-evenly">
                     <q-btn
                        icon="delete"
                        color="secondary"
                        size="sm"
                        @click="onDeleteClicked(idx)"
                     />
                  </div>
               </td>
            </tr>
         </tbody>
      </q-markup-table>

      <q-btn
         label="Add Actor"
         icon="add"
         color="primary"
         no-caps
         class="q-mt-md"
         @click="onAddNewActor"
      />
   </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { dateTimeFormatter, getUUID } from 'src/utils/index';
import { ActorRole } from 'src/models/actor';
import { Field } from 'vee-validate';

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
   name: 'actors-table',
   components: {
      VField: Field,
   },
   props: {
      initialData: {
         type: Array,
         default: () => [],
      },
   },
   data() {
      return {
         columns,
         data: [],
         initial: { actors: [] },
         roleOptions: [...Object.values(ActorRole)],
      };
   },
   computed: {},
   methods: {
      onAddNewActor() {
         (this.data as any).push({
            id: getUUID(),
            name: '',
            age: '',
            joinDate: '',
            role: '',
         });
      },
      onDeleteClicked(rowIndex: number) {
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
               this.data.splice(rowIndex, 1);
            });
      },
      async getActors() {
         if (this.data.length === 0) {
            this.$q.notify({
               message: 'Add At Least One Actor',
               type: 'negative',
            });
            return;
         }
         return this.data;
      },
      dateTimeFormatter,
   },
   mounted() {
      (this.data as any) = [...this.initialData];
      (this.initial as any) = { actors: [...this.initialData] };
   },
});
</script>
<style lang="scss" scoped></style>
