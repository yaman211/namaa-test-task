export const dateTimeFormatter = (date: Date) => {
   if (!date) {
      return;
   }
   return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'long',
   }).format(typeof date == 'string' ? new Date(date) : date);
};

export const getUUID = () => {
   return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, (c: any) =>
      (
         c ^
         (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
   );
};
