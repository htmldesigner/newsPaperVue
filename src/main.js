import Vue from 'vue'
import VueI18n from 'vue-i18n'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import '@/sass/main.sass'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap/js/dist/util.js'
import 'jquery'
import './plugins/vee-validate'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { faVk, faFacebook, faTelegram, faWhatsapp } from '@fortawesome/free-brands-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faVk, faFacebook, faTelegram, faWhatsapp, faPhone)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

Vue.use(VueI18n)

import ru from './locales/ru.json'
import kz from './locales/kz.json'


const messages = {
  ru,
  kz
};

const i18n = new VueI18n({
  locale: 'kz',
  messages
});





new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
