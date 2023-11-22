import { Module } from 'vuex';
import { StateInterface } from 'src/store/index';
import { Movie } from 'src/models/movie';
export interface moviesState {
   movies: Movie[];
   loading: boolean;
   filters: moviesFilters;
}

type Nullable<T> = T | undefined | null;

type moviesFilters = {
   title: Nullable<string>;
   year: Nullable<number>;
   numberOfActors: Nullable<number>;
};

const moviesStore: Module<moviesState, StateInterface> = {
   namespaced: true,
   state: (): moviesState => ({
      movies: [],
      filters: {
         title: undefined,
         year: undefined,
         numberOfActors: undefined,
      },
      loading: false,
   }),
   getters: {
      movies(state) {
         return state.movies
            .filter(
               (movie) =>
                  !state.filters.title ||
                  movie.title.includes(state.filters.title)
            )
            .filter(
               (movie) =>
                  !state.filters.year || movie.year === state.filters.year
            )
            .filter(
               (movie) =>
                  !state.filters.numberOfActors ||
                  movie.actorsCount == state.filters.numberOfActors
            );
      },
   },
   mutations: {
      setLoading(state, payload) {
         state.loading = payload;
      },
      setMovies(state, payload) {
         state.movies = payload;
      },
      addMovie(state, payload) {
         state.movies.push(payload);
      },
      updateMovie(state, { idx, data }) {
         state.movies.splice(idx, 1, data);
      },
      deleteMovie(state, idx) {
         state.movies.splice(idx, 1);
      },
      setFilters(state, filters) {
         state.filters = filters;
      },
      resetStore(state) {
         state.loading = false;
         state.movies = [];
         state.filters = {
            title: undefined,
            year: undefined,
            numberOfActors: undefined,
         };
      },
   },
   actions: {
      fetchMovies({ commit }) {
         commit('setLoading', true);
         try {
            const movies = Movie.getMovies();
            commit('setMovies', movies);
         } finally {
            commit('setLoading', false);
         }
      },
      getMovieById(_, id) {
         return Movie.getById(id);
      },
      createMovie({ commit }, data) {
         const movie = Movie.createMovie(data);
         commit('addMovie', movie);
      },
      updateMovie({ state, commit }, { id, data }) {
         const idx = state.movies.findIndex((movie) => movie.id === id);
         if (idx + 1) {
            const newMovie = state.movies[idx].update(data);
            commit('updateMovie', { idx, data: newMovie });
         }
      },
      deleteMovie({ state, commit }, id) {
         const idx = state.movies.findIndex((movie) => movie.id === id);
         if (idx + 1) {
            state.movies[idx].remove();
            commit('deleteMovie', idx);
         }
      },
      resetStore({ commit }) {
         commit('resetStore');
      },
   },
};

export default moviesStore;
