import Vue from 'nativescript-vue'
import HomePage from './components/HomePage'
import VueDevtools from 'nativescript-vue-devtools'
import { textProperty } from '@nativescript/core/ui/text-base'

if(TNS_ENV !== 'production') {
  Vue.use(VueDevtools)
}


// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')

Vue.prototype.$url = 'http://192.168.1.125:8000'

new Vue({
  
  render: h => h('frame', [h(HomePage)])
  
}).$start()
