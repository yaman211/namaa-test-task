import { boot } from 'quasar/wrappers';
import { defineRule } from 'vee-validate';

defineRule('required', (value: any) => {
   if (!value || !value.length) {
      return 'This field is required';
   }
   return true;
});

defineRule('minLength', (value: string, [limit]: [number]): true | string => {
   // The field is empty so it should pass
   if (!value || !value.length) {
      return true;
   }
   if (value.length < limit) {
      return `This field must be at least ${limit} characters`;
   }
   return true;
});

defineRule('minMax', (value: number, [min, max]: [number, number]) => {
   if (!value) {
      return true;
   }
   const numericValue = Number(value);
   if (numericValue < min) {
      return `This field must be greater than ${min}`;
   }
   if (numericValue > max) {
      return `This field must be less than ${max}`;
   }
   return true;
});

defineRule('date', (value: string) => {
   if (!value) {
      return true;
   }
   const d = new Date(value);

   return !isNaN(d.getTime()) || 'Invalid Date';
});

export default boot(() => {
   return;
});
