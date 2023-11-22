import { getUUID } from 'src/utils';

export enum ActorRole {
   BACKGROUND = 'Background',
   CAMEO = 'Cameo',
   RECURRING = 'Recurring',
   SIDE = 'Side',
   REGULAR = 'Regular',
}

class Actor {
   id: string;
   name!: string;
   age!: number;
   joinDate!: Date;
   role!: ActorRole;

   constructor(obj: any) {
      this.id = getUUID();
      Object.keys(obj).forEach((key) => {
         this[key as keyof this] = obj[key];
      });
   }

   static createActor(data: Actor) {
      const actor = new Actor({ ...data, joinDate: new Date() });
      return actor;
   }
}

export { Actor };
