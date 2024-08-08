import { createApp } from 'vue';

import route from './route.js';

import App from './App.vue';

const app = createApp(App);

app.use(route);

app.mount('#app');
