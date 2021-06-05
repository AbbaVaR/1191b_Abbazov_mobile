import Vue from 'nativescript-vue'
import Vuex from 'vuex';
import HomePage from './components/HomePage'

import VueDevtools from 'nativescript-vue-devtools'
import { textProperty } from '@nativescript/core/ui/text-base'

Vue.use(Vuex);

if(TNS_ENV !== 'production') {
  Vue.use(VueDevtools)
}

const store = new Vuex.Store({
  state: {
    documents: [
      {
        id: 1,
        name: 'wdasd',
        path: "jkfkjf"
      }
    ],
    url: 'http://192.168.18.90:8000'
  },
  mutations: {
    addDoc(state, document) {
      state.documents = [
        state.documents,
        document
      ]
    },
    loadDoc(state, documents){
      state.documents = [documents];
    },
    delDoc(state){
      state.documents = [];
    },
    changeUrl(state, newUrl) {
      state.url = newUrl;
    },
  }
});

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')


new Vue({
  
  render: h => h('frame', [h(HomePage)]),
  store: store

}).$start()
