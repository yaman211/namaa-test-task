import { LocalStorage } from 'quasar';

const LS_KEY = 'actors';

export enum ActorRole {
   BACKGROUND,
   CAMEO,
   RECURRING,
   SIDE,
   REGULAR,
}

class Actor {
   id: number;
   name!: string;
   age!: number;
   joinDate!: Date | string;
   role!: ActorRole;

   constructor(obj: any) {
      this.id = Math.random();
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
      Object.assign(this, newData);
      const allActors = Actor.#getActorsFromLS();
      const idx = allActors.findIndex((actor) => actor.id === this.id);
      if (idx != -1) {
         allActors[idx] = this;
         Actor.#setActorsToLS(allActors);
      } else {
         console.error('Actor Not Found In LocalStorage', idx);
      }
   }
   remove() {
      const allActors = Actor.#getActorsFromLS();
      const idx = allActors.findIndex((actor) => actor.id === this.id);
      if (idx != -1) {
         allActors.splice(idx, 1);
         Actor.#setActorsToLS(allActors);
      } else {
         console.error('Actor Not Found In LocalStorage', idx);
      }
   }

   static getActors(): Actor[] {
      return this.#getActorsFromLS();
   }

   static createActor(data: Actor) {
      const actor = new Actor(data);

      const allActors = this.#getActorsFromLS();
      allActors.push(actor);
      this.#setActorsToLS(allActors);

      return actor;
   }
}

export { Actor };
