import Vue from 'vue'
import './style.scss'
import App from './App.vue'

import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import "leaflet/dist/leaflet.css";
import "leaflet/dist/images/marker-shadow.png";


new Vue({
    render: (h) => h(App),
}).$mount("#app");