import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import EntryScene from "./components/EntryScene.vue";
import TextureMagicScene from "./components/TextureMagicScene.vue";

import "./assets/main.css";

const app = createApp(App);

app.use(router);

app.mount("#app");
app.component('entry-scene', EntryScene)
app.component('texture-magic-scene', TextureMagicScene)

