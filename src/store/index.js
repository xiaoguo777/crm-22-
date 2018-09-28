import Vue from 'vue';
import Vuex from 'vuex';

import app from './modules/app';
import user from './modules/user';

import state from "./state";
import actions from "./actions"
import mutations from "./mutations"

Vue.use(Vuex);

const store = new Vuex.Store({
    state,
    mutations,
    actions,
    modules: {
        app,
        user
    }
});

export default store;


