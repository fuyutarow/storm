import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import firebase from './plugins/firebase'

Vue.config.productionTip = false

Vue.use(firebase);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
