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
    documents: [{
      id: Math.random(),
      name : 'test',
      path : '/test'
      }
    ],
    url: 'http://192.168.1.125:8000'
  },
  mutations: {
    addDoc(state, document) {
      state.documents.push(document)
    },
    changeUrl(state, newUrl) {
      state.url = newUrl;
    }
  }
});

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')


new Vue({
  
  render: h => h('frame', [h(HomePage)]),
  store: store

}).$start()
