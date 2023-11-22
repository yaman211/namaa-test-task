import { LocalStorage } from 'quasar';
import { Actor } from './actor';
import { getUUID } from 'src/utils';

const LS_KEY = 'movies';

class Movie {
   id: string;
   title!: string;
   description?: string;
   year!: number;
   actors!: Actor[];

   constructor(obj: any) {
      this.id = getUUID();
      Object.keys(obj).forEach((key) => {
         this[key as keyof this] = obj[key];
      });
      this.actors = this.actors.map((actorObject) => {
         return new Actor(actorObject);
      });
   }

   public get actorsCount(): number {
      return this.actors.length;
   }

   static #getMoviesFromLS() {
      if (LocalStorage.has(LS_KEY)) {
         const movies: Movie[] = LocalStorage.getItem(LS_KEY) as Movie[];
         return movies.map((movie) => new Movie(movie));
      }
      return [];
   }

   static #setMoviesToLS(movies: Movie[]) {
      LocalStorage.set(LS_KEY, movies);
   }

   update(newData: Movie) {
      const newMovie = new Movie(newData);
      newMovie.id = this.id;

      const allMovies = Movie.#getMoviesFromLS();
      const idx = allMovies.findIndex((movie) => movie.id === this.id);
      if (idx != -1) {
         allMovies[idx] = newMovie;
         Movie.#setMoviesToLS(allMovies);
      } else {
         console.error('Movie Not Found In LocalStorage', this);
      }
      return newMovie;
   }
   remove() {
      const allMovies = Movie.#getMoviesFromLS();
      const idx = allMovies.findIndex((movie) => movie.id === this.id);
      if (idx != -1) {
         allMovies.splice(idx, 1);
         Movie.#setMoviesToLS(allMovies);
      } else {
         console.error('Movie Not Found In LocalStorage', this);
      }
   }

   static getMovies(): Movie[] {
      return this.#getMoviesFromLS();
   }

   static getById(id: string) {
      const allMovies = Movie.#getMoviesFromLS();
      return allMovies.find((movie) => movie.id === id);
   }

   static createMovie(data: Movie) {
      const movie = new Movie(data);

      const allMovies = this.#getMoviesFromLS();
      allMovies.push(movie);
      this.#setMoviesToLS(allMovies);

      return movie;
   }
}

export { Movie };
