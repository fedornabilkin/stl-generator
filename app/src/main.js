import {createApp} from 'vue';
// import {createPinia} from 'pinia';
import {router} from './router';
import { createI18n } from "vue-i18n";
import translations from './translations/loader';
import { initYandexMetrika } from 'yandex-metrika-vue3';

import App from './App.vue';

import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';

const i18n = createI18n({
  locale: "ru",
  fallbackLocale: "ru",
  messages: translations,
})

const ymId = import.meta.env.VITE_YM_ID
const nodeEnv = import.meta.env.VITE_NODE_ENV

const app = createApp(App)
// app.use(initYandexMetrika, {
//   id: ymId,
//   router: router,
//   env: nodeEnv
//   // other options
// })

  // .use(createPinia())
  .use(router)
  .use(i18n)

app.mount('#app')
