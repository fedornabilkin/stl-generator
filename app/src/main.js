// import Vue from 'vue';
import {createApp} from 'vue';
// import VueI18n from 'vue-i18n';
import { createI18n } from "vue-i18n";
import VueMarkdown from 'vue-markdown';
import translations from './translations/loader';

import App from './App.vue';

import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';

// Vue.config.productionTip = false;


// const i18n = new VueI18n({
//   locale: window.localStorage.getItem('locale') || 'en',
//   fallbackLocale: 'en',
//   messages: translations,
// });

const i18n = createI18n({
  locale: "ru",
  fallbackLocale: "ru",
  messages: translations,
});



// export const bus = new Vue();

// new Vue({
//   i18n,
//   render: (h) => h(App),
// }).$mount('#app');



const app = createApp(App);

app
  .use(VueMarkdown)
  // .use(VueI18n)
  .use(i18n)

app.mount('#app');
