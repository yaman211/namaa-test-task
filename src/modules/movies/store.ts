import { Module } from 'vuex';
import { StateInterface } from 'src/store/index';
import { Movie } from 'src/models/movie';
import { Actor } from 'src/models/actor';
export interface moviesState {
   movies: Movie[];
   loading: boolean;
}

const moviesStore: Module<moviesState, StateInterface> = {
   namespaced: true,
   state: (): moviesState => ({
      movies: [],
      loading: false,
   }),
   getters: {
      movies(state) {
         return state.movies;
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
      resetStore(state) {
         state.loading = false;
         state.movies = [];
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
      getMovieActors(_, actorsIds) {
         return Actor.getActorsByIds(actorsIds);
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
      deleteActor({ state, commit }, id) {
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
