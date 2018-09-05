// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import { store } from './store/store'
import * as filters from './util/filters'
import VTooltip from 'v-tooltip'
import VueNumeric from 'vue-numeric'

import {
 Vuetify,
 VApp,
 VBtn,
 VCard,
 VGrid,
 VTabs,
 VToolbar,
 VIcon,
 VDialog,
 VSnackbar,
 Vform,    
 VTextField,
 VCheckbox,
 VRadioGroup,
 VDatePicker,   
 VSelect,
 VAlert,
 VNavigationDrawer
} from 'vuetify'


Vue.config.productionTip = false
Vue.use(VueResource)
Vue.use(VTooltip)
window.Vue = Vue
var mode = ''
Vue.use(Vuetify, {
 components: {
   VApp,
   VBtn,
   VCard,
   VGrid,
   VTabs,
   VSnackbar,
   Vform, 
   VToolbar,
   VIcon,
   VDialog,
   VTextField,
   VCheckbox,
   VRadioGroup,     
   VDatePicker,
   VSelect,     
   VNavigationDrawer,
   VueNumeric
 }
})

if (process.env.NODE_ENV && process.env.NODE_ENV.toString() === 'production') {
  mode = 'https://www.yatra.com'
} else {
  mode = 'http://yatra.com'
}
Vue.http.options.root = mode
Vue.config.debug = true
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
