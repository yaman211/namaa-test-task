import { Module } from 'vuex';
import { StateInterface } from 'src/store/index';
import { Actor } from 'src/models/actor';
export interface actorsState {
   actors: Actor[];
   loading: boolean;
}

const actorsStore: Module<actorsState, StateInterface> = {
   namespaced: true,
   state: (): actorsState => ({
      actors: [],
      loading: false,
   }),
   mutations: {
      setLoading(state, payload) {
         state.loading = payload;
      },
      setActors(state, payload) {
         state.actors = payload;
      },
      addActor(state, payload) {
         state.actors.push(payload);
      },
      deleteActor(state, idx) {
         state.actors.splice(idx, 1);
      },
   },
   actions: {
      fetchActors({ commit }) {
         commit('setLoading', true);
         try {
            const actors = Actor.getActors();
            commit('setActors', actors);
         } finally {
            commit('setLoading', false);
         }
      },
      createActor({ commit }, data) {
         const actor = Actor.createActor(data);
         commit('addActor', actor);
      },
      updateActor({ state }, { id, data }) {
         const actor = state.actors.find((actor) => actor.id === id);
         if (actor) {
            actor.update(data);
         }
      },
      deleteActor({ state, commit }, id) {
         const idx = state.actors.findIndex((actor) => actor.id === id);
         if (idx + 1) {
            state.actors[idx].remove();
            commit('deleteActor', idx);
         }
      },
   },
};

export default actorsStore;
