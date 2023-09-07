import Vue from 'vue'
import Vuex from 'vuex'
import authors from './modules/authors-store.js'
import modal from './modules/modal-store.js'
import posts from './modules/posts-store.js'
import authorsAPI from './plugins/authors-api.js'
import postsAPI from './plugins/posts-api.js'



Vue.use(Vuex)

export const store = new Vuex.Store({
    modules: {
        authors,
        modal,
        posts,
    },
    plugins: [authorsAPI, postsAPI]
   
})