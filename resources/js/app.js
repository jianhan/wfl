
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('example-component', require('./components/ExampleComponent.vue'));
Vue.component('nearby-restaurants', require('./components/NearbyRestaurants.vue'));
Vue.component('wizard', require('./components/Wizard.vue'));

import {GOOGLE_MAP_API} from './.env'
import * as VueGoogleMaps from 'vue2-google-maps'
import store from './store'

Vue.use(VueGoogleMaps, {
  load: {
    key: GOOGLE_MAP_API,
    libraries: 'places', 
  },
  installComponents: true,
})

const app = new Vue({
    el: '#app',
    store,
});
