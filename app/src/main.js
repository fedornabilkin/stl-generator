import {createApp} from 'vue';
// import {createPinia} from 'pinia';
import { createI18n } from "vue-i18n";
import translations from './translations/loader';

import App from './App.vue';

import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';

const i18n = createI18n({
  locale: "ru",
  fallbackLocale: "ru",
  messages: translations,
})

const app = createApp(App)

app
  // .use(createPinia())
  .use(i18n)

app.mount('#app')
