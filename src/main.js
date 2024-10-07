import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import XBoxScene from "./components/XBoxScene.vue";

import "./assets/main.css";


const app = createApp(App);

app.use(router);

app.mount("#app");
app.component('x-box-scene', XBoxScene)

