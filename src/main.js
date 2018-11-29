import 'onsenui';
import Vue from 'vue';
import VueOnsen from 'vue-onsenui';

// Onsen UI Styling and Icons
require('onsenui/css-components-src/src/onsen-css-components.css');
require('onsenui/css/onsenui.css');
import App from './App.vue';
Vue.use(VueOnsen);
import store from './store';

new Vue({
  el: '#app',
  store,
  template: `<App :ncmb="ncmb"></App>`,
  data() {
    return {}
  },
  components: { App }
});
