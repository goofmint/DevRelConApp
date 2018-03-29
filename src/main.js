import 'onsenui';
import Vue from 'vue';
import VueOnsen from 'vue-onsenui';
import {ncmb} from './ncmbConf';
// Onsen UI Styling and Icons
require('onsenui/css-components-src/src/onsen-css-components.css');
require('onsenui/css/onsenui.css');
import App from './App.vue';
Vue.use(VueOnsen);
new Vue({
  el: '#app',
  template: `<App :ncmb="ncmb"></App>`,
  data() {
    return {ncmb}
  },
  components: { App }
});
