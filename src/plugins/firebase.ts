
import Vue, {VueConstructor, PluginObject} from 'vue';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/analytics';

declare module 'vue/types/vue' {
  interface Vue {
    $auth: firebase.auth.Auth;
    $firestore: firebase.firestore.Firestore;
    $ga: firebase.analytics.Analytics;
  }

  interface VueConstructor {
    $auth: firebase.auth.Auth;
    $firestore: firebase.firestore.Firestore;
    $ga: firebase.analytics.Analytics;
  }
}

const firebaseConfig = {
  apiKey: "AIzaSyAgvmvIYP8b7Gb-ti_biBTrpA5_ugidpew",
  authDomain: "storm-93498.firebaseapp.com",
  databaseURL: "https://storm-93498.firebaseio.com",
  projectId: "storm-93498",
  storageBucket: "storm-93498.appspot.com",
  messagingSenderId: "322542094634",
  appId: "1:322542094634:web:212e576db887d97325f653",
  measurementId: "G-F150PPWSRM"
};

export const app = firebase.initializeApp(firebaseConfig);
const anal = firebase.analytics();

export default {
  install(vue: VueConstructor, options: any) {
    vue.prototype.$firestore = app.firestore();
    vue.prototype.$auth = app.auth();
    vue.prototype.$ga = app.analytics();
  },
} as PluginObject<Vue>;
