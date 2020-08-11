import Vue from 'vue';
import Vuex from 'vuex';

import tree from './module-tree';

import state from './state';
import * as actions from './actions';
import * as mutations from './mutations';

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    state,
    actions,
    mutations,

    modules: {
      tree,
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: false,
  });

  return Store;
}
