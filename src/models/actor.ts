import { LocalStorage } from 'quasar';
import { getUUID } from 'src/utils';

const LS_KEY = 'actors';

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

   static #getActorsFromLS() {
      if (LocalStorage.has(LS_KEY)) {
         const actors: Actor[] = LocalStorage.getItem(LS_KEY) as Actor[];
         return actors.map((actor) => new Actor(actor));
      }
      return [];
   }

   static #setActorsToLS(actors: Actor[]) {
      LocalStorage.set(LS_KEY, actors);
   }

   update(newData: Actor) {
      const newActor = new Actor(newData);
      newActor.id = this.id;
      newActor.joinDate = this.joinDate;

      const allActors = Actor.#getActorsFromLS();
      const idx = allActors.findIndex((actor) => actor.id === this.id);
      if (idx != -1) {
         allActors[idx] = newActor;
         Actor.#setActorsToLS(allActors);
      } else {
         console.error('Actor Not Found In LocalStorage', this);
      }
      return newActor;
   }
   remove() {
      const allActors = Actor.#getActorsFromLS();
      const idx = allActors.findIndex((actor) => actor.id === this.id);
      if (idx != -1) {
         allActors.splice(idx, 1);
         Actor.#setActorsToLS(allActors);
      } else {
         console.error('Actor Not Found In LocalStorage', this);
      }
   }

   static getActors(): Actor[] {
      return this.#getActorsFromLS();
   }

   static createActor(data: Actor) {
      const actor = new Actor({ ...data, joinDate: new Date() });

      const allActors = this.#getActorsFromLS();
      allActors.push(actor);
      this.#setActorsToLS(allActors);

      return actor;
   }

   static cleanActorsArray(actorsIds: string[]) {
      const allActors = this.#getActorsFromLS();
      return actorsIds.filter((id) =>
         allActors.some((actor) => actor.id === id)
      );
   }
}

export { Actor };
