export const dateTimeFormatter = (date: Date) => {
   if (!date) {
      return;
   }
   return new Intl.DateTimeFormat('en-US', {
      timeStyle: 'medium',
      dateStyle: 'short',
   }).format(typeof date == 'string' ? new Date(date) : date);
};
